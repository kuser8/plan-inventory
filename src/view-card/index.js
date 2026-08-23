// inventory-view-card — обзорный просмотр всех предметов с двумя
// проекциями одних и тех же данных: дерево "Места" (Комната -> Мебель ->
// Полка) и плоская группировка "Категории".
//
// YAML config (all optional):
//   type: custom:inventory-view-card
//   default_tab: 'places' | 'categories'   — какая вкладка открыта изначально
//                                             (по умолчанию 'places').
//   show_empty_locations: boolean          — по умолчанию true: показывать
//                                             в дереве "Места" узлы структуры
//                                             без единого предмета (пустые
//                                             комнаты/мебель/полки), чтобы
//                                             дерево отражало всю
//                                             спланированную структуру, а не
//                                             только занятые места. Когда
//                                             false — такие узлы скрываются.
//                                             Пока активен поиск/фильтр,
//                                             пустые после фильтрации группы
//                                             всегда скрыты независимо от
//                                             этой настройки.
//   collapsed_by_default: boolean          — по умолчанию false: начальное
//                                             состояние сворачивания для
//                                             каждой группы на обеих
//                                             вкладках.
import { LitElement, html, css } from 'lit';
import { sharedStyles } from '@shared/styles.js';
import { COMMON } from '@shared/i18n.js';
import { registerCard } from '@shared/registerCard.js';
import { LEVEL_LABELS_RU } from '@shared/constants.js';
import { structureToTree } from '@shared/structureTree.js';
import {
  fetchAllItems,
  loadStructure,
  subscribeItemsGlobal,
  subscribeStructure,
  callIncrementItem,
  callDecrementItem,
} from '@shared/api.js';
import '@shared/itemRow.js';
import { STR } from './strings.js';
import { filterItems, bucketItemsByNode, annotateTree, buildCategoryGroups, countStats } from './grouping.js';

const DEFAULT_CONFIG = {
  default_tab: 'places',
  show_empty_locations: true,
  collapsed_by_default: false,
};

class InventoryViewCard extends LitElement {
  static properties = {
    _items: { state: true },
    _structure: { state: true },
    _tab: { state: true },
    _search: { state: true },
    _lowOnly: { state: true },
    _expiringOnly: { state: true },
    _collapseOverrides: { state: true },
    _pending: { state: true },
  };

  static styles = [
    sharedStyles,
    css`
      .tabs {
        margin-bottom: 8px;
      }
      .filters {
        margin-bottom: 8px;
      }
      .filters input[type='text'] {
        flex: 1;
        min-width: 120px;
      }
      .tree {
        display: flex;
        flex-direction: column;
        gap: 2px;
      }
      .group-header {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 6px 4px;
        cursor: pointer;
        border-radius: 6px;
      }
      .group-header:hover {
        background: var(--secondary-background-color, #f0f0f0);
      }
      .chevron {
        width: 14px;
        flex: none;
        text-align: center;
        color: var(--secondary-text-color);
      }
      .group-name {
        font-weight: 500;
        flex: 1;
        min-width: 0;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .group-level {
        flex: none;
      }
      .group-body {
        display: flex;
        flex-direction: column;
      }
      .indent {
        margin-left: 20px;
      }
      .row-wrap.in-flight {
        opacity: 0.55;
        pointer-events: none;
      }
    `,
  ];

  constructor() {
    super();
    this._items = undefined;
    this._structure = undefined;
    this._tab = 'places';
    this._search = '';
    this._lowOnly = false;
    this._expiringOnly = false;
    this._collapseOverrides = new Set();
    this._pending = new Set();
    this._config = { ...DEFAULT_CONFIG };
    this._hass = null;
    this._unsubItemsPromise = null;
    this._unsubStructurePromise = null;
  }

  setConfig(config) {
    this._config = { ...DEFAULT_CONFIG, ...(config || {}) };
    this._tab = this._config.default_tab === 'categories' ? 'categories' : 'places';
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
      const [items, structure] = await Promise.all([
        fetchAllItems(this._hass),
        loadStructure(this._hass),
      ]);
      this._items = items;
      this._structure = structure;
    } catch (err) {
      console.error('inventory-view-card: init failed', err);
      this._items = [];
      this._structure = { version: 1, nodes: [] };
    }
    this._unsubItemsPromise = subscribeItemsGlobal(this._hass, () => this._refetchItems());
    this._unsubStructurePromise = subscribeStructure(this._hass, (structure) => {
      this._structure = structure;
    });
  }

  async _refetchItems() {
    if (!this._hass) return;
    try {
      this._items = await fetchAllItems(this._hass);
    } catch (err) {
      console.error('inventory-view-card: refetch failed', err);
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    if (this._unsubItemsPromise) {
      this._unsubItemsPromise.then((unsub) => unsub && unsub()).catch(() => {});
    }
    if (this._unsubStructurePromise) {
      this._unsubStructurePromise.then((unsub) => unsub && unsub()).catch(() => {});
    }
  }

  getCardSize() {
    return 10;
  }

  static getStubConfig() {
    return {};
  }

  _setTab(tab) {
    this._tab = tab;
  }

  _onSearchInput(e) {
    this._search = e.target.value;
  }

  _toggleLow() {
    this._lowOnly = !this._lowOnly;
  }

  _toggleExpiring() {
    this._expiringOnly = !this._expiringOnly;
  }

  _filterState() {
    return { search: this._search, lowOnly: this._lowOnly, expiringOnly: this._expiringOnly };
  }

  _hasActiveFilter() {
    return !!(this._search && this._search.trim()) || this._lowOnly || this._expiringOnly;
  }

  _isCollapsed(key) {
    const def = !!this._config.collapsed_by_default;
    return this._collapseOverrides.has(key) ? !def : def;
  }

  _toggleCollapse(key) {
    const next = new Set(this._collapseOverrides);
    if (next.has(key)) next.delete(key);
    else next.add(key);
    this._collapseOverrides = next;
  }

  _keyFor(item) {
    return `${item.inventory_id}::${item.name}`;
  }

  async _onIncrement(e) {
    e.stopPropagation();
    await this._callQuantity(e.detail.item, callIncrementItem);
  }

  async _onDecrement(e) {
    e.stopPropagation();
    await this._callQuantity(e.detail.item, callDecrementItem);
  }

  async _callQuantity(item, fn) {
    if (!item || !this._hass) return;
    const key = this._keyFor(item);
    if (this._pending.has(key)) return;
    const next = new Set(this._pending);
    next.add(key);
    this._pending = next;
    try {
      await fn(this._hass, { inventory_id: item.inventory_id, name: item.name, amount: 1 });
    } catch (err) {
      console.error('inventory-view-card: quantity update failed', err);
    } finally {
      const done = new Set(this._pending);
      done.delete(key);
      this._pending = done;
    }
  }

  _renderCounters(stats) {
    return html`
      <span class="badge">${stats.total}</span>
      ${stats.low ? html`<span class="badge badge-warning">${stats.low} ${COMMON.lowStock}</span>` : ''}
      ${stats.expiring
        ? html`<span class="badge badge-error">${stats.expiring} ${COMMON.expiringSoon}</span>`
        : ''}
    `;
  }

  _renderGroupHeader(key, name, level, stats) {
    const collapsed = this._isCollapsed(key);
    return html`
      <div class="group-header" @click=${() => this._toggleCollapse(key)}>
        <span class="chevron">${collapsed ? '▸' : '▾'}</span>
        <span class="group-name">${name}</span>
        ${level !== undefined ? html`<span class="muted group-level">${level}</span>` : ''}
        ${this._renderCounters(stats)}
      </div>
    `;
  }

  _renderItemRow(item, showLocation) {
    const inFlight = this._pending.has(this._keyFor(item));
    return html`
      <div class="row-wrap ${inFlight ? 'in-flight' : ''}">
        <inventory-item-row .item=${item} .showLocation=${showLocation}></inventory-item-row>
      </div>
    `;
  }

  _renderPlaceNode(node, depth) {
    const key = `struct:${node.id}`;
    const collapsed = this._isCollapsed(key);
    const visibleChildren = node.children.filter((c) => c.visible);
    return html`
      <div class="group ${depth > 0 ? 'indent' : ''}">
        ${this._renderGroupHeader(key, node.name, LEVEL_LABELS_RU[node.level], node)}
        ${!collapsed
          ? html`
              <div class="group-body">
                ${node.ownItems.map((item) => this._renderItemRow(item, false))}
                ${visibleChildren.map((c) => this._renderPlaceNode(c, depth + 1))}
              </div>
            `
          : ''}
      </div>
    `;
  }

  _renderPlacesTab() {
    const filtered = filterItems(this._items, this._filterState());
    const { byNode, noLocation } = bucketItemsByNode(filtered, this._structure.nodes || []);
    const hasActiveFilter = this._hasActiveFilter();
    const tree = structureToTree(this._structure.nodes || []);
    const annotated = annotateTree(tree, byNode, {
      showEmpty: this._config.show_empty_locations,
      hasActiveFilter,
    });
    const visibleRoots = annotated.filter((n) => n.visible);
    const hasNoLocation = noLocation.length > 0;

    if (visibleRoots.length === 0 && !hasNoLocation) {
      return html`<div class="empty-state">${COMMON.noItems}</div>`;
    }

    const noLocKey = 'no-location';
    const noLocCollapsed = this._isCollapsed(noLocKey);
    const noLocStats = countStats(noLocation);

    return html`
      <div class="tree">
        ${visibleRoots.map((n) => this._renderPlaceNode(n, 0))}
        ${hasNoLocation
          ? html`
              <div class="group">
                ${this._renderGroupHeader(noLocKey, STR.noLocation, undefined, noLocStats)}
                ${!noLocCollapsed
                  ? html`<div class="group-body">
                      ${noLocation.map((item) => this._renderItemRow(item, true))}
                    </div>`
                  : ''}
              </div>
            `
          : ''}
      </div>
    `;
  }

  _renderCategoriesTab() {
    const filtered = filterItems(this._items, this._filterState());
    const groups = buildCategoryGroups(filtered);
    if (groups.length === 0) {
      return html`<div class="empty-state">${COMMON.noItems}</div>`;
    }
    return html`
      <div class="tree">
        ${groups.map((group) => {
          const key = `cat:${group.key}`;
          const collapsed = this._isCollapsed(key);
          return html`
            <div class="group">
              ${this._renderGroupHeader(key, group.label, undefined, group)}
              ${!collapsed
                ? html`<div class="group-body">
                    ${group.items.map((item) => this._renderItemRow(item, true))}
                  </div>`
                : ''}
            </div>
          `;
        })}
      </div>
    `;
  }

  render() {
    if (!this._hass) return html``;
    const loading = this._items === undefined || this._structure === undefined;

    return html`
      <ha-card @increment=${this._onIncrement} @decrement=${this._onDecrement}>
        <div class="card-header">${STR.cardTitle}</div>
        <div class="row wrap tabs">
          <span class="chip ${this._tab === 'places' ? 'active' : ''}" @click=${() => this._setTab('places')}
            >${STR.tabPlaces}</span
          >
          <span
            class="chip ${this._tab === 'categories' ? 'active' : ''}"
            @click=${() => this._setTab('categories')}
            >${STR.tabCategories}</span
          >
        </div>
        <div class="row wrap filters">
          <input
            type="text"
            placeholder=${COMMON.searchByName}
            .value=${this._search}
            @input=${this._onSearchInput}
          />
          <span class="chip ${this._lowOnly ? 'active' : ''}" @click=${() => this._toggleLow()}
            >${COMMON.lowStock}</span
          >
          <span class="chip ${this._expiringOnly ? 'active' : ''}" @click=${() => this._toggleExpiring()}
            >${COMMON.expiringSoon}</span
          >
        </div>
        <hr class="divider" />
        ${loading
          ? html`<div class="empty-state">${COMMON.loading}</div>`
          : this._tab === 'places'
            ? this._renderPlacesTab()
            : this._renderCategoriesTab()}
      </ha-card>
    `;
  }
}

registerCard({
  tag: 'inventory-view-card',
  elementClass: InventoryViewCard,
  cardConfig: {
    type: 'inventory-view-card',
    name: 'Inventory: Просмотр по местам и категориям',
    description: 'Дерево Комната → Мебель → Полка и группировка по категориям, со счётчиками и сворачиванием',
    preview: true,
  },
});
