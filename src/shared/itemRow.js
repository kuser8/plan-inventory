import { LitElement, html, css } from 'lit';
import { sharedStyles } from './styles.js';
import { isLowStock, isExpiringSoon, daysUntilExpiry } from './itemStatus.js';
import { COMMON } from './i18n.js';

function formatQuantity(item) {
  const qty = Number(item.quantity || 0);
  const rounded = Math.round(qty * 100) / 100;
  const unit = item.unit ? ` ${item.unit}` : '';
  return `${rounded}${unit}`;
}

function locationText(item) {
  if (item.location) return item.location;
  if (Array.isArray(item.locations) && item.locations.length) return item.locations[0];
  return '';
}

/**
 * One row for an inventory item: name, quantity+unit, status badges,
 * location, and quick +/- buttons. Shared by the list-card and view-card so
 * the two carry identical behavior/visuals.
 *
 * Fires `increment` / `decrement`, each with `detail = { item }`.
 */
export class InventoryItemRow extends LitElement {
  static properties = {
    item: { type: Object },
    showLocation: { type: Boolean, attribute: 'show-location' },
  };

  static styles = [
    sharedStyles,
    css`
      :host {
        display: block;
      }
      .item-row {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 8px 4px;
        border-bottom: 1px solid var(--divider-color, #e0e0e0);
      }
      .item-main {
        flex: 1;
        min-width: 0;
      }
      .item-name {
        font-weight: 500;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .item-meta {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 6px;
        margin-top: 2px;
        color: var(--secondary-text-color);
        font-size: 0.85em;
      }
      .quantity {
        min-width: 64px;
        text-align: right;
        font-variant-numeric: tabular-nums;
      }
    `,
  ];

  _emit(type) {
    this.dispatchEvent(new CustomEvent(type, { detail: { item: this.item }, bubbles: true, composed: true }));
  }

  render() {
    const item = this.item;
    if (!item) return html``;

    const low = isLowStock(item);
    const expiring = isExpiringSoon(item);
    const days = daysUntilExpiry(item);
    const loc = locationText(item);

    return html`
      <div class="item-row">
        <div class="item-main">
          <div class="item-name">${item.name}</div>
          <div class="item-meta">
            ${item.category ? html`<span>${item.category}</span>` : ''}
            ${this.showLocation !== false && loc ? html`<span>${loc}</span>` : ''}
            ${low ? html`<span class="badge badge-warning">${COMMON.lowStock}</span>` : ''}
            ${expiring
              ? html`<span class="badge badge-error"
                  >${COMMON.expiringSoon}${days !== null ? html` (${days} дн.)` : ''}</span
                >`
              : ''}
          </div>
        </div>
        <div class="quantity">${formatQuantity(item)}</div>
        <div class="row">
          <button class="btn-icon" @click=${() => this._emit('decrement')} title="−" aria-label="Уменьшить">−</button>
          <button class="btn-icon" @click=${() => this._emit('increment')} title="+" aria-label="Увеличить">+</button>
        </div>
      </div>
    `;
  }
}

if (!customElements.get('inventory-item-row')) {
  customElements.define('inventory-item-row', InventoryItemRow);
}
