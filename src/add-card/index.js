// inventory-add-card — форма добавления нового предмета в Simple Inventory,
// с каскадным выбором места хранения (Комната → Мебель → Полка/ящик) из
// справочника структуры (см. @shared/structureTree.js, @shared/api.js).
//
// YAML-конфигурация (все ключи необязательны):
//   type: custom:inventory-add-card
//   title: 'Добавить предмет'          # необязательный заголовок карточки
//   default_inventory_id: 'abc123'     # предвыбранный инвентарь (select)
//   default_location: 'Кухня / Шкаф'   # предвыбранное место, ' / '-путь,
//                                      # резолвится в id узлов структуры по
//                                      # именам на момент загрузки карточки
//   fields:                            # если задано — показываются только
//     - quantity                       # перечисленные необязательные поля
//     - unit                           # (name и выбор инвентаря всегда
//     - category                       # отображаются). Если не задано —
//     - barcode                        # показываются все поля.
//     - price
//     - expiry_date
//     - expiry_alert_days
//     - description
//     - location
//
// Реализовано согласно паттерну проекта: `hass` — обычный get/set (НЕ
// реактивное свойство Lit), чтобы избежать конфликта аксессоров; всё
// остальное состояние — реактивные `state` свойства.

import { LitElement, html, css } from 'lit';
import { ref, createRef } from 'lit/directives/ref.js';
import {
  loadStructure,
  subscribeStructure,
  listInventories,
  fetchAllItems,
  callAddItem,
} from '@shared/api.js';
import { buildPath, parsePath } from '@shared/path.js';
import { nodeById, matchLocationToNodes } from '@shared/structureTree.js';
import { sharedStyles } from '@shared/styles.js';
import { COMMON } from '@shared/i18n.js';
import { registerCard } from '@shared/registerCard.js';
import { startScanner, stopScanner, isLiveScanAvailable } from '@shared/barcodeScanner.js';
import '@shared/locationCascade.js';
import { STR } from './strings.js';

const ALL_FIELDS = [
  'quantity',
  'unit',
  'category',
  'barcode',
  'price',
  'expiry_date',
  'expiry_alert_days',
  'description',
  'location',
];

function emptyForm() {
  return {
    name: '',
    inventory_id: '',
    quantity: '',
    unit: '',
    category: '',
    barcode: '',
    price: '',
    expiry_date: '',
    expiry_alert_days: '',
    description: '',
  };
}

class InventoryAddCard extends LitElement {
  static properties = {
    _structure: { state: true },
    _inventories: { state: true },
    _categories: { state: true },
    _form: { state: true },
    _locationValue: { state: true },
    _saving: { state: true },
    _error: { state: true },
    _success: { state: true },
    _scanning: { state: true },
    _scanError: { state: true },
  };

  static styles = [
    sharedStyles,
    css`
      .fields {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
        gap: 10px;
      }
      .field-full {
        grid-column: 1 / -1;
      }
      .location-block {
        margin-top: 4px;
      }
      .location-preview {
        margin-top: 4px;
      }
      .scanner-target {
        width: 100%;
        max-width: 320px;
        min-height: 160px;
        background: #000;
        border-radius: 6px;
        overflow: hidden;
        margin-top: 6px;
      }
      .scanner-target video,
      .scanner-target canvas {
        width: 100%;
        display: block;
      }
      .barcode-row {
        display: flex;
        gap: 8px;
        align-items: flex-end;
      }
      .barcode-row > div:first-child {
        flex: 1;
      }
      .success-text {
        color: var(--success-color, #4caf50);
        font-size: 0.9em;
      }
      .actions {
        margin-top: 14px;
      }
    `,
  ];

  constructor() {
    super();
    this._config = {};
    this._structure = [];
    this._inventories = [];
    this._categories = [];
    this._form = emptyForm();
    this._locationValue = [null, null, null];
    this._saving = false;
    this._error = null;
    this._success = null;
    this._scanning = false;
    this._scanError = null;
    this._unsubStructure = null;
    this._scannerTargetRef = createRef();
    this._nameInputRef = createRef();
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
    try {
      const structure = await loadStructure(this._hass);
      this._structure = (structure && structure.nodes) || [];
    } catch (err) {
      this._structure = [];
    }

    try {
      this._unsubStructure = await subscribeStructure(this._hass, (structure) => {
        this._structure = (structure && structure.nodes) || [];
      });
    } catch (err) {
      // Live updates unavailable; the initial snapshot above still stands.
    }

    this._inventories = listInventories(this._hass);

    const defaultInventoryId = this._config.default_inventory_id;
    let inventoryId = '';
    if (defaultInventoryId && this._inventories.some((inv) => inv.inventory_id === defaultInventoryId)) {
      inventoryId = defaultInventoryId;
    } else if (this._inventories.length === 1) {
      inventoryId = this._inventories[0].inventory_id;
    }
    this._form = { ...this._form, inventory_id: inventoryId };

    if (this._config.default_location) {
      this._locationValue = matchLocationToNodes(this._structure, this._config.default_location, parsePath);
    }

    try {
      const items = await fetchAllItems(this._hass);
      const cats = new Set();
      for (const item of items) {
        if (item.category) cats.add(item.category);
      }
      this._categories = Array.from(cats).sort((a, b) => a.localeCompare(b, 'ru'));
    } catch (err) {
      this._categories = [];
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    if (this._unsubStructure) {
      this._unsubStructure();
      this._unsubStructure = null;
    }
    if (this._scanning) {
      stopScanner();
      this._scanning = false;
    }
  }

  getCardSize() {
    return 6;
  }

  static getStubConfig() {
    return {};
  }

  _isFieldVisible(key) {
    const fields = this._config.fields;
    if (!Array.isArray(fields) || fields.length === 0) return true;
    return fields.includes(key);
  }

  _updateField(key, value) {
    this._form = { ...this._form, [key]: value };
  }

  _onLocationChange(e) {
    this._locationValue = e.detail.value;
  }

  _locationNames() {
    return this._locationValue.map((id) => (id ? (nodeById(this._structure, id)?.name ?? '') : ''));
  }

  async _toggleScanner() {
    if (this._scanning) {
      stopScanner();
      this._scanning = false;
      return;
    }
    this._scanError = null;
    this._scanning = true;
    await this.updateComplete;
    const target = this._scannerTargetRef.value;
    if (!target) {
      this._scanning = false;
      return;
    }
    const result = await startScanner(target, (code) => {
      this._updateField('barcode', String(code));
      stopScanner();
      this._scanning = false;
    });
    if (result === 'permission_denied') {
      this._scanError = STR.scanPermissionDenied;
      this._scanning = false;
    } else if (result === 'not_available') {
      this._scanError = STR.scanNotAvailable;
      this._scanning = false;
    }
  }

  _focusNameField() {
    const input = this._nameInputRef.value;
    if (input) input.focus();
  }

  async _onSubmit(e) {
    e.preventDefault();
    this._error = null;
    this._success = null;

    const name = (this._form.name || '').trim();
    if (!name) {
      this._error = STR.nameRequired;
      return;
    }

    const inventoryId = this._form.inventory_id;
    if (!inventoryId) {
      this._error = STR.inventoryRequired;
      return;
    }

    let quantity;
    if (this._form.quantity !== '' && this._form.quantity != null) {
      quantity = Number(this._form.quantity);
      if (Number.isNaN(quantity) || quantity < 0) {
        this._error = STR.quantityInvalid;
        return;
      }
    }

    let price;
    if (this._form.price !== '' && this._form.price != null) {
      price = Number(this._form.price);
      if (Number.isNaN(price) || price < 0) {
        this._error = STR.quantityInvalid;
        return;
      }
    }

    let expiryAlertDays;
    if (this._form.expiry_alert_days !== '' && this._form.expiry_alert_days != null) {
      expiryAlertDays = Number(this._form.expiry_alert_days);
      if (Number.isNaN(expiryAlertDays) || expiryAlertDays < 0) {
        this._error = STR.quantityInvalid;
        return;
      }
    }

    const location = buildPath(this._locationNames());

    const data = {
      inventory_id: inventoryId,
      name,
      quantity,
      unit: this._form.unit || undefined,
      category: this._form.category || undefined,
      // barcode stays an opaque string end-to-end — never Number(...) it,
      // or leading zeros would be silently dropped.
      barcode: this._form.barcode || undefined,
      location: location || undefined,
      price,
      expiry_date: this._form.expiry_date || undefined,
      expiry_alert_days: expiryAlertDays,
      description: this._form.description || undefined,
    };

    this._saving = true;
    try {
      await callAddItem(this._hass, data);
      this._success = `${STR.addedPrefix} ${name}`;
      if (data.category && !this._categories.includes(data.category)) {
        this._categories = [...this._categories, data.category].sort((a, b) => a.localeCompare(b, 'ru'));
      }
      // Clear everything except the selected place + inventory, per spec,
      // so a series of items can be added into the same spot quickly.
      this._form = { ...emptyForm(), inventory_id: inventoryId };
      await this.updateComplete;
      this._focusNameField();
    } catch (err) {
      this._error = (err && err.message) || COMMON.errorGeneric;
    } finally {
      this._saving = false;
    }
  }

  _renderCategoryField() {
    if (!this._isFieldVisible('category')) return '';
    return html`
      <div>
        <label>${COMMON.category}</label>
        <input
          type="text"
          list="add-card-category-list"
          .value=${this._form.category}
          placeholder=${STR.categoryPlaceholder}
          @input=${(e) => this._updateField('category', e.target.value)}
        />
        <datalist id="add-card-category-list">
          ${this._categories.map((c) => html`<option value=${c}></option>`)}
        </datalist>
      </div>
    `;
  }

  _renderBarcodeField() {
    if (!this._isFieldVisible('barcode')) return '';
    const canScan = isLiveScanAvailable();
    return html`
      <div class="field-full">
        <label>${COMMON.barcode}</label>
        <div class="barcode-row">
          <div>
            <input
              type="text"
              .value=${this._form.barcode}
              @input=${(e) => this._updateField('barcode', e.target.value)}
            />
          </div>
          ${canScan
            ? html`
                <button type="button" class="btn" @click=${this._toggleScanner}>
                  ${this._scanning ? STR.scanStop : STR.scanStart}
                </button>
              `
            : ''}
        </div>
        ${this._scanError ? html`<div class="error-text">${this._scanError}</div>` : ''}
        ${this._scanning ? html`<div class="scanner-target" ${ref(this._scannerTargetRef)}></div>` : ''}
      </div>
    `;
  }

  _renderLocationField() {
    if (!this._isFieldVisible('location')) return '';
    const preview = buildPath(this._locationNames());
    return html`
      <div class="field-full location-block">
        <label>${STR.location}</label>
        <inventory-location-cascade
          .nodes=${this._structure}
          .value=${this._locationValue}
          @value-changed=${this._onLocationChange}
        ></inventory-location-cascade>
        <div class="muted location-preview">
          ${STR.location}: ${preview || STR.locationNotSet}
        </div>
      </div>
    `;
  }

  render() {
    const title = this._config.title ?? STR.cardTitleDefault;
    return html`
      <ha-card>
        ${title ? html`<div class="card-header">${title}</div>` : ''}
        <form @submit=${this._onSubmit}>
          <div class="fields">
            <div class="field-full">
              <label>${STR.name} *</label>
              <input
                type="text"
                required
                ${ref(this._nameInputRef)}
                .value=${this._form.name}
                placeholder=${STR.namePlaceholder}
                @input=${(e) => this._updateField('name', e.target.value)}
              />
            </div>

            <div class="field-full">
              <label>${COMMON.inventory} *</label>
              <select
                required
                .value=${this._form.inventory_id}
                @change=${(e) => this._updateField('inventory_id', e.target.value)}
              >
                <option value="">${STR.inventoryPlaceholder}</option>
                ${this._inventories.map(
                  (inv) => html`<option value=${inv.inventory_id}>${inv.name}</option>`
                )}
              </select>
              ${this._inventories.length === 0 ? html`<div class="muted">${STR.noInventories}</div>` : ''}
            </div>

            ${this._isFieldVisible('quantity')
              ? html`
                  <div>
                    <label>${COMMON.quantity}</label>
                    <input
                      type="number"
                      min="0"
                      step="any"
                      .value=${this._form.quantity}
                      @input=${(e) => this._updateField('quantity', e.target.value)}
                    />
                  </div>
                `
              : ''}
            ${this._isFieldVisible('unit')
              ? html`
                  <div>
                    <label>${COMMON.unit}</label>
                    <input
                      type="text"
                      .value=${this._form.unit}
                      @input=${(e) => this._updateField('unit', e.target.value)}
                    />
                  </div>
                `
              : ''}
            ${this._renderCategoryField()}
            ${this._isFieldVisible('price')
              ? html`
                  <div>
                    <label>${COMMON.price}</label>
                    <input
                      type="number"
                      min="0"
                      step="any"
                      .value=${this._form.price}
                      @input=${(e) => this._updateField('price', e.target.value)}
                    />
                  </div>
                `
              : ''}
            ${this._isFieldVisible('expiry_date')
              ? html`
                  <div>
                    <label>${COMMON.expiryDate}</label>
                    <input
                      type="date"
                      .value=${this._form.expiry_date}
                      @input=${(e) => this._updateField('expiry_date', e.target.value)}
                    />
                  </div>
                `
              : ''}
            ${this._isFieldVisible('expiry_alert_days')
              ? html`
                  <div>
                    <label>${STR.expiryAlertDays}</label>
                    <input
                      type="number"
                      min="0"
                      max="365"
                      step="1"
                      .value=${this._form.expiry_alert_days}
                      @input=${(e) => this._updateField('expiry_alert_days', e.target.value)}
                    />
                  </div>
                `
              : ''}
            ${this._renderBarcodeField()}
            ${this._isFieldVisible('description')
              ? html`
                  <div class="field-full">
                    <label>${COMMON.description}</label>
                    <textarea
                      rows="2"
                      .value=${this._form.description}
                      @input=${(e) => this._updateField('description', e.target.value)}
                    ></textarea>
                  </div>
                `
              : ''}
            ${this._renderLocationField()}
          </div>

          ${this._error ? html`<div class="error-text">${this._error}</div>` : ''}
          ${this._success ? html`<div class="success-text">${this._success}</div>` : ''}

          <div class="row actions">
            <button type="submit" class="btn btn-primary" ?disabled=${this._saving}>
              ${this._saving ? STR.saving : COMMON.add}
            </button>
          </div>
        </form>
      </ha-card>
    `;
  }
}

registerCard({
  tag: 'inventory-add-card',
  elementClass: InventoryAddCard,
  cardConfig: {
    type: 'inventory-add-card',
    name: 'Inventory: Добавление товара',
    description: 'Форма добавления предмета с каскадным выбором места (Комната → Мебель → Полка)',
    preview: true,
  },
});
