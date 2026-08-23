// inventory-list-card — flat, aggregated list of items across ALL
// inventories, meant for the HA sidebar/panel. See task spec ("Card A").
//
// YAML config:
//   type: custom:inventory-list-card
//   title: string                     — optional card header text (default: "Инвентарь")
//   default_filters:                  — optional, applied once on load
//     category: string
//     low_stock: boolean
//     expiring_soon: boolean
//   show_scanner: boolean             — default true; hides the scan button
//                                       and manual barcode search when false
//
// Data flow: fetchAllItems() for the initial load, then re-fetch on every
// subscribeItemsGlobal() ping (the backend only sends a bare "something
// changed" event, no diff — see @shared/api.js). Structure nodes (for the
// "Где" cascade filter) come from loadStructure()/subscribeStructure().

import { LitElement, html, css } from 'lit';
import { ref, createRef } from 'lit/directives/ref.js';
import { sharedStyles } from '@shared/styles.js';
import {
  fetchAllItems,
  subscribeItemsGlobal,
  loadStructure,
  subscribeStructure,
  callIncrementItem,
  callDecrementItem,
  callLookupByBarcode,
  callScanBarcode,
} from '@shared/api.js';
import { isLowStock, isExpiringSoon } from '@shared/itemStatus.js';
import { parsePath } from '@shared/path.js';
import { nodeById } from '@shared/structureTree.js';
import { registerCard } from '@shared/registerCard.js';
import {
  startScanner,
  stopScanner,
  isLiveScanAvailable,
  isScannerActive,
} from '@shared/barcodeScanner.js';
import '@shared/itemRow.js';
import '@shared/locationCascade.js';
import { STR, COMMON } from './strings.js';

class InventoryListCard extends LitElement {
  static properties = {
    _items: { state: true },
    _structure: { state: true },
    _filtered: { state: true },
    _categories: { state: true },
    _search: { state: true },
    _categoryFilter: { state: true },
    _locationValue: { state: true },
    _lowStockOnly: { state: true },
    _expiringOnly: { state: true },
    _loading: { state: true },
    _scanOpen: { state: true },
    _scanStatus: { state: true },
    _scanDetectedBarcode: { state: true },
    _scanMatches: { state: true },
    _scanAction: { state: true },
    _scanAmount: { state: true },
    _scanInventoryId: { state: true },
    _manualBarcode: { state: true },
    _manualStatus: { state: true },
    _highlightKey: { state: true },
  };

  static styles = [
    sharedStyles,
    css`
      .filters-row {
        margin-bottom: 8px;
      }
      .count {
        font-size: 0.6em;
        font-weight: 400;
      }
      .scan-panel {
        margin-top: 12px;
        padding: 12px;
        border: 1px solid var(--divider-color, #e0e0e0);
        border-radius: 8px;
      }
      .scan-target {
        width: 100%;
        max-width: 480px;
        min-height: 200px;
        margin: 8px 0;
        background: #000;
        border-radius: 8px;
        overflow: hidden;
      }
      .scan-target video,
      .scan-target canvas {
        width: 100%;
        height: auto;
        display: block;
      }
      .list {
        max-height: 60vh;
        overflow-y: auto;
      }
      .row-wrap {
        border-radius: 8px;
        transition: background 0.3s ease-out;
      }
      .row-wrap.highlight {
        background: color-mix(in srgb, var(--primary-color, #03a9f4) 25%, transparent);
      }
    `,
  ];

  constructor() {
    super();
    this._items = [];
    this._structure = { version: 1, nodes: [] };
    this._filtered = [];
    this._categories = [];
    this._search = '';
    this._categoryFilter = '';
    this._locationValue = [null, null, null];
    this._lowStockOnly = false;
    this._expiringOnly = false;
    this._loading = true;
    this._scanOpen = false;
    this._scanStatus = 'idle'; // idle | permission_denied | not_available | detected
    this._scanDetectedBarcode = '';
    this._scanMatches = [];
    this._scanAction = 'increment';
    this._scanAmount = 1;
    this._scanInventoryId = null;
    this._manualBarcode = '';
    this._manualStatus = 'idle'; // idle | searching | found | not_found
    this._highlightKey = null;

    this._scanTargetRef = createRef();
    this._pendingKeys = new Set();
    this._highlightTimer = null;
    this._unsubItems = null;
    this._unsubStructure = null;
  }

  setConfig(config) {
    this._config = config || {};
  }

  set hass(hass) {
    const first = !this._hass;
    this._hass = hass;
    if (first) this._init();
  }

  get hass() {
    return this._hass;
  }

  async _init() {
    this._loading = true;
    const [items, structure] = await Promise.all([
      fetchAllItems(this._hass).catch(() => []),
      loadStructure(this._hass).catch(() => ({ version: 1, nodes: [] })),
    ]);
    this._items = items;
    this._structure = structure;
    this._loading = false;
    this._applyDefaultFilters();
    this._computeCategories();
    this._computeFiltered();

    this._unsubItems = await subscribeItemsGlobal(this._hass, () => this._onItemsChanged());
    this._unsubStructure = await subscribeStructure(this._hass, (structure) => {
      this._structure = structure;
      this._computeFiltered();
    });
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    if (this._unsubItems) this._unsubItems();
    if (this._unsubStructure) this._unsubStructure();
    if (isScannerActive()) stopScanner();
    if (this._highlightTimer) clearTimeout(this._highlightTimer);
  }

  getCardSize() {
    return 8;
  }

  static getStubConfig() {
    return {};
  }

  _applyDefaultFilters() {
    const df = (this._config && this._config.default_filters) || {};
    this._categoryFilter = df.category || '';
    this._lowStockOnly = !!df.low_stock;
    this._expiringOnly = !!df.expiring_soon;
  }

  async _onItemsChanged() {
    try {
      this._items = await fetchAllItems(this._hass);
    } catch (e) {
      return;
    }
    this._computeCategories();
    this._computeFiltered();
  }

  _computeCategories() {
    const set = new Set();
    for (const item of this._items || []) {
      if (item.category) set.add(item.category);
    }
    this._categories = Array.from(set).sort((a, b) => a.localeCompare(b, 'ru'));
  }

  // Recomputes the filtered list from current filter state. Called from
  // event handlers / after data loads only — render() just maps over the
  // stored result, per the perf note in the spec.
  _computeFiltered() {
    const q = (this._search || '').trim().toLowerCase();
    const cat = this._categoryFilter || '';
    const loc = this._locationValue || [null, null, null];
    const nodes = (this._structure && this._structure.nodes) || [];

    const requiredSegments = [];
    for (let level = 0; level < 3; level++) {
      const id = loc[level];
      if (!id) break;
      const node = nodeById(nodes, id);
      if (!node) break;
      requiredSegments.push(node.name);
    }

    this._filtered = (this._items || []).filter((item) => {
      if (q && !String(item.name || '').toLowerCase().includes(q)) return false;
      if (cat && item.category !== cat) return false;
      if (this._lowStockOnly && !isLowStock(item)) return false;
      if (this._expiringOnly && !isExpiringSoon(item)) return false;
      if (requiredSegments.length) {
        const segs = parsePath(item.location);
        for (let i = 0; i < requiredSegments.length; i++) {
          if (segs[i] !== requiredSegments[i]) return false;
        }
      }
      return true;
    });
  }

  _onSearchInput(e) {
    this._search = e.target.value;
    this._computeFiltered();
  }

  _onCategoryChange(e) {
    this._categoryFilter = e.target.value;
    this._computeFiltered();
  }

  _onLocationChanged(e) {
    this._locationValue = e.detail.value;
    this._computeFiltered();
  }

  _toggleLowStock() {
    this._lowStockOnly = !this._lowStockOnly;
    this._computeFiltered();
  }

  _toggleExpiring() {
    this._expiringOnly = !this._expiringOnly;
    this._computeFiltered();
  }

  // --- +/- quantity adjustments -----------------------------------------

  _onIncrement(e) {
    this._adjustQuantity(e.detail.item, 1);
  }

  _onDecrement(e) {
    this._adjustQuantity(e.detail.item, -1);
  }

  async _adjustQuantity(item, direction) {
    if (!item) return;
    // inventory-item-row has no built-in "disabled" prop, so we guard
    // against double-clicks ourselves by de-duping in-flight calls per
    // (inventory, item name) rather than visually disabling the button.
    const key = `${item.inventory_id}::${item.name}`;
    if (this._pendingKeys.has(key)) return;
    this._pendingKeys.add(key);
    try {
      const data = { inventory_id: item.inventory_id, name: item.name, amount: 1 };
      if (direction > 0) {
        await callIncrementItem(this._hass, data);
      } else {
        await callDecrementItem(this._hass, data);
      }
    } finally {
      this._pendingKeys.delete(key);
    }
  }

  // --- Barcode: manual search ---------------------------------------------

  _onManualBarcodeInput(e) {
    this._manualBarcode = e.target.value;
  }

  async _onManualSearch() {
    const code = (this._manualBarcode || '').trim();
    if (!code) return;
    this._manualStatus = 'searching';
    try {
      const matches = await callLookupByBarcode(this._hass, code);
      this._manualStatus = matches.length ? 'found' : 'not_found';
      if (matches.length) {
        await this._highlightItem(matches[0]);
      }
    } catch (e) {
      this._manualStatus = 'not_found';
    }
  }

  async _highlightItem(item) {
    const key = `${item.inventory_id}::${item.id}`;
    this._highlightKey = key;
    await this.updateComplete;
    const el = this.shadowRoot.getElementById(`row-${key}`);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    if (this._highlightTimer) clearTimeout(this._highlightTimer);
    this._highlightTimer = setTimeout(() => {
      this._highlightKey = null;
      this.requestUpdate();
    }, 3000);
    this.requestUpdate();
  }

  // --- Barcode: live camera scan ------------------------------------------

  async _openScanPanel() {
    this._scanOpen = true;
    this._scanStatus = 'scanning';
    this._scanDetectedBarcode = '';
    this._scanMatches = [];
    this._scanInventoryId = null;
    await this.updateComplete;
    const target = this._scanTargetRef.value;
    if (!target) return;
    const error = await startScanner(target, (code) => this._onBarcodeDetected(code));
    if (error) {
      this._scanStatus = error; // 'permission_denied' | 'not_available'
    }
  }

  _closeScanPanel() {
    stopScanner();
    this._scanOpen = false;
    this._scanStatus = 'idle';
  }

  async _onBarcodeDetected(code) {
    if (this._scanDetectedBarcode === code) return;
    this._scanDetectedBarcode = code;
    // Pause after the first accepted detection so the user can act on it
    // instead of the camera continuing to fire onDetected every frame.
    stopScanner();
    this._scanStatus = 'detected';
    try {
      const matches = await callLookupByBarcode(this._hass, code);
      this._scanMatches = matches;
      this._scanInventoryId = matches.length ? matches[0].inventory_id : null;
      if (matches.length) {
        await this._highlightItem(matches[0]);
      }
    } catch (e) {
      this._scanMatches = [];
    }
  }

  _onScanInventoryChange(e) {
    this._scanInventoryId = e.target.value;
  }

  _onScanActionChange(e) {
    this._scanAction = e.target.value;
  }

  _onScanAmountInput(e) {
    this._scanAmount = e.target.value;
  }

  async _applyScan() {
    if (!this._scanDetectedBarcode) return;
    const data = {
      barcode: this._scanDetectedBarcode,
      action: this._scanAction,
      amount: Number(this._scanAmount) || 1,
    };
    if (this._scanInventoryId) data.inventory_id = this._scanInventoryId;
    try {
      await callScanBarcode(this._hass, data);
    } catch (e) {
      // best-effort; item list will simply not reflect a failed call
    }
  }

  // --- Render --------------------------------------------------------------

  render() {
    const cfg = this._config || {};
    const title = cfg.title || STR.defaultTitle;
    const showScanner = cfg.show_scanner !== false;

    return html`
      <ha-card>
        <div class="card-header">
          <span>${title}</span>
          <span class="count muted">${this._filtered.length} / ${this._items.length}</span>
        </div>

        <div class="row wrap">
          <input
            type="text"
            placeholder=${COMMON.searchByName}
            .value=${this._search}
            @input=${this._onSearchInput}
          />
          ${showScanner
            ? html`
                <button class="btn" @click=${this._openScanPanel}>${COMMON.scanBarcode}</button>
                <input
                  type="text"
                  placeholder=${STR.manualBarcodePlaceholder}
                  .value=${this._manualBarcode}
                  @input=${this._onManualBarcodeInput}
                  @keydown=${(e) => e.key === 'Enter' && this._onManualSearch()}
                />
                <button class="btn" @click=${this._onManualSearch}>${COMMON.find}</button>
              `
            : ''}
        </div>
        ${showScanner && this._manualStatus === 'not_found'
          ? html`<div class="error-text">${STR.notFound}</div>`
          : ''}
        ${showScanner && this._manualStatus === 'searching'
          ? html`<div class="muted">${STR.searching}</div>`
          : ''}

        <div class="row wrap filters-row">
          <div>
            <label>${STR.what}</label>
            <select @change=${this._onCategoryChange} .value=${this._categoryFilter}>
              <option value="">${COMMON.all}</option>
              ${this._categories.map(
                (c) => html`<option value=${c} ?selected=${c === this._categoryFilter}>${c}</option>`
              )}
            </select>
          </div>
          <span class="chip ${this._lowStockOnly ? 'active' : ''}" @click=${this._toggleLowStock}
            >${COMMON.lowStock}</span
          >
          <span class="chip ${this._expiringOnly ? 'active' : ''}" @click=${this._toggleExpiring}
            >${COMMON.expiringSoon}</span
          >
        </div>

        <div class="filters-row">
          <label>${STR.where}</label>
          <inventory-location-cascade
            .nodes=${this._structure.nodes}
            .value=${this._locationValue}
            all-option-label=${COMMON.all}
            @value-changed=${this._onLocationChanged}
          ></inventory-location-cascade>
        </div>

        <hr class="divider" />

        ${this._loading ? html`<div class="empty-state">${COMMON.loading}</div>` : this._renderList()}
        ${showScanner && this._scanOpen ? this._renderScanPanel() : ''}
      </ha-card>
    `;
  }

  _renderList() {
    if (!this._filtered.length) {
      return html`<div class="empty-state">${COMMON.noItems}</div>`;
    }
    return html`
      <div class="list" @increment=${this._onIncrement} @decrement=${this._onDecrement}>
        ${this._filtered.map((item) => {
          const key = `${item.inventory_id}::${item.id}`;
          const highlighted = this._highlightKey === key;
          return html`
            <div id="row-${key}" class="row-wrap ${highlighted ? 'highlight' : ''}">
              <inventory-item-row .item=${item}></inventory-item-row>
            </div>
          `;
        })}
      </div>
    `;
  }

  _renderScanPanel() {
    const liveAvailable = isLiveScanAvailable();
    return html`
      <div class="scan-panel">
        <div class="row" style="justify-content: space-between;">
          <strong>${STR.scanPanelTitle}</strong>
          <button class="btn-icon" @click=${this._closeScanPanel} aria-label=${COMMON.close}>×</button>
        </div>

        ${!liveAvailable ? html`<div class="error-text">${STR.cameraNotAvailable}</div>` : ''}
        ${this._scanStatus === 'permission_denied'
          ? html`<div class="error-text">${STR.cameraPermissionDenied}</div>`
          : ''}
        ${this._scanStatus === 'not_available'
          ? html`<div class="error-text">${STR.cameraNotAvailable}</div>`
          : ''}

        <div class="scan-target" ${ref(this._scanTargetRef)}></div>

        ${this._scanDetectedBarcode
          ? html`
              <div class="muted">${STR.detected}: ${this._scanDetectedBarcode}</div>
              ${this._scanMatches.length
                ? html`
                    <div class="muted">${STR.matchedItems}:</div>
                    <ul>
                      ${this._scanMatches.map(
                        (m) => html`<li>${m.name} — ${m.inventory_name}</li>`
                      )}
                    </ul>
                    ${this._scanMatches.length > 1
                      ? html`
                          <label>${COMMON.inventory}</label>
                          <select @change=${this._onScanInventoryChange}>
                            ${this._scanMatches.map(
                              (m) => html`
                                <option
                                  value=${m.inventory_id}
                                  ?selected=${m.inventory_id === this._scanInventoryId}
                                >
                                  ${m.inventory_name} — ${m.name}
                                </option>
                              `
                            )}
                          </select>
                        `
                      : ''}
                    <div class="row wrap">
                      <div>
                        <label>${STR.action}</label>
                        <select @change=${this._onScanActionChange}>
                          <option value="increment" ?selected=${this._scanAction === 'increment'}>
                            ${STR.actionIncrement}
                          </option>
                          <option value="decrement" ?selected=${this._scanAction === 'decrement'}>
                            ${STR.actionDecrement}
                          </option>
                          <option value="lookup" ?selected=${this._scanAction === 'lookup'}>
                            ${STR.actionLookup}
                          </option>
                        </select>
                      </div>
                      <div>
                        <label>${COMMON.quantity}</label>
                        <input
                          type="number"
                          min="0"
                          step="1"
                          .value=${String(this._scanAmount)}
                          @input=${this._onScanAmountInput}
                        />
                      </div>
                      <button class="btn btn-primary" @click=${this._applyScan}>${STR.apply}</button>
                    </div>
                  `
                : html`<div class="error-text">${STR.notFound}</div>`}
              <button class="btn" @click=${this._openScanPanel}>${STR.scanAgain}</button>
            `
          : ''}
      </div>
    `;
  }
}

registerCard({
  tag: 'inventory-list-card',
  elementClass: InventoryListCard,
  cardConfig: {
    type: 'inventory-list-card',
    name: 'Inventory: Общий список',
    description: 'Плоский список всех предметов по всем инвентарям с фильтрами и сканером штрихкодов',
    preview: true,
  },
});
