import { LitElement, html, css } from 'lit';
import { childrenOf } from './structureTree.js';
import { sharedStyles } from './styles.js';
import { COMMON } from './i18n.js';

/**
 * Reusable three-level cascading <select> (Комната → Мебель → Полка) used
 * by both the add-card (target location) and the list-card ("Где" filter).
 * Selecting a room resets/repopulates the furniture select, etc. Partial
 * selection is always allowed (e.g. room only, or room+furniture only).
 *
 * Properties:
 *  - nodes: StructureNode[] (flat list from get_structure)
 *  - value: [roomId|null, furnitureId|null, shelfId|null]
 *  - allOptionLabel: string|null — when set, each select gets a leading
 *    option with this label mapping to null (used for filter UIs); when
 *    null, the leading option is a plain "— не выбрано —" placeholder
 *    (used for the add-card, where an unset level just means "don't set
 *    this level of the path").
 *
 * Fires `value-changed` with `detail.value` = the new 3-element array.
 */
export class InventoryLocationCascade extends LitElement {
  static properties = {
    nodes: { type: Array },
    value: { type: Array },
    allOptionLabel: { type: String, attribute: 'all-option-label' },
  };

  static styles = [
    sharedStyles,
    css`
      :host {
        display: block;
      }
      .cascade {
        display: grid;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        gap: 8px;
      }
      select {
        width: 100%;
      }
    `,
  ];

  constructor() {
    super();
    /** @type {any[]} */
    this.nodes = [];
    /** @type {(string|null)[]} */
    this.value = [null, null, null];
    this.allOptionLabel = null;
  }

  _placeholderFor(level) {
    if (this.allOptionLabel !== null && this.allOptionLabel !== undefined) {
      return this.allOptionLabel;
    }
    return level === 0 ? '— не выбрано —' : '— любая —';
  }

  _onChange(level, event) {
    const id = event.target.value || null;
    const next = [...this.value];
    next[level] = id;
    // Changing a level clears everything below it.
    for (let l = level + 1; l < 3; l++) next[l] = null;
    this.value = next;
    this.dispatchEvent(new CustomEvent('value-changed', { detail: { value: next } }));
  }

  render() {
    const roomId = this.value[0] || null;
    const furnitureId = this.value[1] || null;
    const shelfId = this.value[2] || null;

    const rooms = childrenOf(this.nodes, 0, null);
    const furniture = roomId ? childrenOf(this.nodes, 1, roomId) : [];
    const shelves = furnitureId ? childrenOf(this.nodes, 2, furnitureId) : [];

    return html`
      <div class="cascade">
        <div>
          <label>${COMMON.room}</label>
          <select .value=${roomId || ''} @change=${(e) => this._onChange(0, e)}>
            <option value="">${this._placeholderFor(0)}</option>
            ${rooms.map((n) => html`<option value=${n.id}>${n.name}</option>`)}
          </select>
        </div>
        <div>
          <label>${COMMON.furniture}</label>
          <select
            .value=${furnitureId || ''}
            @change=${(e) => this._onChange(1, e)}
            ?disabled=${!roomId || furniture.length === 0}
          >
            <option value="">${this._placeholderFor(1)}</option>
            ${furniture.map((n) => html`<option value=${n.id}>${n.name}</option>`)}
          </select>
        </div>
        <div>
          <label>${COMMON.shelf}</label>
          <select
            .value=${shelfId || ''}
            @change=${(e) => this._onChange(2, e)}
            ?disabled=${!furnitureId || shelves.length === 0}
          >
            <option value="">${this._placeholderFor(2)}</option>
            ${shelves.map((n) => html`<option value=${n.id}>${n.name}</option>`)}
          </select>
        </div>
      </div>
    `;
  }
}

if (!customElements.get('inventory-location-cascade')) {
  customElements.define('inventory-location-cascade', InventoryLocationCascade);
}
