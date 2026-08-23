// inventory-structure-card — the only place the Room -> Furniture -> Shelf
// structure hierarchy is created, renamed, or deleted. All other cards only
// *read* the structure (via @shared/api.js loadStructure/subscribeStructure)
// to build location pickers/filters.
//
// YAML config:
//   type: custom:inventory-structure-card
//   title: <string, optional>   # card header text; omit for no header
//
// No visual config editor is provided (per spec) — `title` is the only
// supported key, applied directly from setConfig().

import { LitElement, html, css } from 'lit';
import { sharedStyles } from '@shared/styles.js';
import { COMMON } from '@shared/i18n.js';
import { LEVEL, LEVEL_LABELS_RU } from '@shared/constants.js';
import { validateNodeName, parsePath, buildPath } from '@shared/path.js';
import { nodeById, pathOfNode, descendantIds, structureToTree } from '@shared/structureTree.js';
import { loadStructure, saveStructure, subscribeStructure, fetchAllItems, callUpdateItem } from '@shared/api.js';
import { registerCard } from '@shared/registerCard.js';
import { STR } from './strings.js';

const EMPTY_STRUCTURE = { version: 1, nodes: [] };

function makeNodeId(level) {
  return `${level}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
}

function errMessage(err) {
  if (!err) return COMMON.errorGeneric;
  if (typeof err === 'string') return err;
  if (err.message) return err.message;
  return COMMON.errorGeneric;
}

/** Same sibling-uniqueness rule the backend enforces (same parent + level). */
function siblingNameTaken(nodes, level, parentId, name, excludeId) {
  return nodes.some(
    (n) => n.level === level && n.parent === (parentId ?? null) && n.name === name && n.id !== excludeId
  );
}

/** Replace a matching old-path segment prefix with the new path's segments, preserving any deeper segments. */
function migrateLocationString(locationStr, oldSegments, newSegments) {
  const segs = parsePath(locationStr);
  if (segs.length < oldSegments.length) return locationStr;
  for (let i = 0; i < oldSegments.length; i++) {
    if (segs[i] !== oldSegments[i]) return locationStr;
  }
  const remainder = segs.slice(oldSegments.length);
  return buildPath([...newSegments, ...remainder]);
}

class InventoryStructureCard extends LitElement {
  static properties = {
    _structure: { state: true },
    _error: { state: true },
    _addLevel: { state: true },
    _addParentId: { state: true },
    _addName: { state: true },
    _addBusy: { state: true },
    _editingId: { state: true },
    _editName: { state: true },
    _editError: { state: true },
    _editBusy: { state: true },
    _deletingId: { state: true },
    _deleteError: { state: true },
    _deleteBusy: { state: true },
    _migrationOffer: { state: true },
    _migration: { state: true },
  };

  static styles = [
    sharedStyles,
    css`
      .node-row {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 6px 0;
        border-bottom: 1px solid var(--divider-color, #e0e0e0);
        flex-wrap: wrap;
      }
      .node-name {
        font-weight: 500;
      }
      .node-actions {
        display: flex;
        gap: 4px;
        margin-left: auto;
      }
      .confirm-box {
        flex-basis: 100%;
        display: flex;
        flex-direction: column;
        gap: 6px;
        padding: 8px;
        margin: 4px 0 4px 0;
        border-radius: 6px;
        background: var(--secondary-background-color, #f0f0f0);
      }
      .banner {
        display: flex;
        align-items: center;
        gap: 8px;
        flex-wrap: wrap;
        padding: 8px;
        margin-bottom: 10px;
        border-radius: 6px;
        background: var(--secondary-background-color, #f0f0f0);
      }
    `,
  ];

  constructor() {
    super();
    this._structure = null;
    this._error = null;

    this._addLevel = LEVEL.ROOM;
    this._addParentId = null;
    this._addName = '';
    this._addBusy = false;

    this._editingId = null;
    this._editName = '';
    this._editError = null;
    this._editBusy = false;

    this._deletingId = null;
    this._deleteError = null;
    this._deleteBusy = false;

    this._migrationOffer = null; // { nodeId, oldPath, newPath, dismissed }
    this._migration = null; // { nodeId, oldPath, newPath, busy, matches, error, updated, total, done }

    this._unsub = null;
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
      this._structure = await loadStructure(this._hass);
    } catch (err) {
      this._error = errMessage(err);
      this._structure = { ...EMPTY_STRUCTURE };
    }

    try {
      this._unsub = await subscribeStructure(this._hass, (structure) => {
        this._structure = structure;
        if (this._editingId && !nodeById(structure.nodes, this._editingId)) {
          this._editingId = null;
          this._editName = '';
          this._editError = null;
        }
        if (this._deletingId && !nodeById(structure.nodes, this._deletingId)) {
          this._deletingId = null;
          this._deleteError = null;
        }
        if (this._migrationOffer && !nodeById(structure.nodes, this._migrationOffer.nodeId)) {
          this._migrationOffer = null;
        }
      });
    } catch (err) {
      // Not fatal — the structure was already loaded once above; live sync
      // just won't be available.
      console.warn('inventory-structure-card: subscribe_structure failed', err);
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    if (this._unsub) {
      this._unsub();
      this._unsub = null;
    }
  }

  getCardSize() {
    return 6;
  }

  static getStubConfig() {
    return {};
  }

  // --- Add form ----------------------------------------------------------

  _onLevelChange(e) {
    this._addLevel = Number(e.target.value);
    this._addParentId = null;
    this._error = null;
  }

  async _onAddSubmit() {
    this._error = null;
    const level = this._addLevel;
    const name = this._addName;

    const nameCheck = validateNodeName(name);
    if (!nameCheck.valid) {
      this._error = nameCheck.error;
      return;
    }

    let parentId = null;
    if (level !== LEVEL.ROOM) {
      parentId = this._addParentId;
      if (!parentId) {
        this._error = STR.parentRequired;
        return;
      }
    }

    if (siblingNameTaken(this._structure.nodes, level, parentId, name)) {
      this._error = STR.siblingExists(name);
      return;
    }

    const newNode = { id: makeNodeId(level), level, name, parent: parentId };
    const newStructure = { version: 1, nodes: [...this._structure.nodes, newNode] };

    this._addBusy = true;
    try {
      const saved = await saveStructure(this._hass, newStructure);
      this._structure = saved;
      this._addName = '';
    } catch (err) {
      this._error = errMessage(err);
    } finally {
      this._addBusy = false;
    }
  }

  _renderAddForm() {
    const level = this._addLevel;
    const parentLevel = level - 1;
    const parentCandidates =
      level === LEVEL.ROOM ? [] : this._structure.nodes.filter((n) => n.level === parentLevel);
    const sortedParents = [...parentCandidates].sort((a, b) =>
      pathOfNode(this._structure.nodes, a.id).localeCompare(pathOfNode(this._structure.nodes, b.id), 'ru')
    );
    const blockedByNoParents = level !== LEVEL.ROOM && sortedParents.length === 0;

    return html`
      <div class="row wrap">
        <div>
          <label>${STR.level}</label>
          <select .value=${String(level)} @change=${(e) => this._onLevelChange(e)}>
            ${[LEVEL.ROOM, LEVEL.FURNITURE, LEVEL.SHELF].map(
              (l) => html`<option value=${l}>${LEVEL_LABELS_RU[l]}</option>`
            )}
          </select>
        </div>
        ${level !== LEVEL.ROOM
          ? html`
              <div>
                <label>${STR.parent}</label>
                <select
                  .value=${this._addParentId || ''}
                  @change=${(e) => {
                    this._addParentId = e.target.value || null;
                  }}
                >
                  <option value="">${STR.selectParent}</option>
                  ${sortedParents.map(
                    (n) => html`<option value=${n.id}>${pathOfNode(this._structure.nodes, n.id)}</option>`
                  )}
                </select>
              </div>
            `
          : ''}
        <div>
          <label>${STR.name}</label>
          <input
            type="text"
            .value=${this._addName}
            @input=${(e) => {
              this._addName = e.target.value;
            }}
          />
        </div>
        <button
          class="btn btn-primary"
          ?disabled=${this._addBusy || blockedByNoParents || !this._addName}
          @click=${() => this._onAddSubmit()}
        >
          ${COMMON.add}
        </button>
      </div>
      ${blockedByNoParents
        ? html`<div class="muted">${STR.noParentsAvailable(LEVEL_LABELS_RU[parentLevel])}</div>`
        : ''}
      ${this._error ? html`<div class="error-text">${this._error}</div>` : ''}
    `;
  }

  // --- Rename --------------------------------------------------------------

  _startRename(node) {
    this._deletingId = null;
    this._editingId = node.id;
    this._editName = node.name;
    this._editError = null;
  }

  _cancelRename() {
    this._editingId = null;
    this._editName = '';
    this._editError = null;
  }

  async _saveRename(node) {
    this._editError = null;
    const nameCheck = validateNodeName(this._editName);
    if (!nameCheck.valid) {
      this._editError = nameCheck.error;
      return;
    }

    if (
      this._editName !== node.name &&
      siblingNameTaken(this._structure.nodes, node.level, node.parent, this._editName, node.id)
    ) {
      this._editError = STR.siblingExists(this._editName);
      return;
    }

    if (this._editName === node.name) {
      // No-op rename, just close the form.
      this._cancelRename();
      return;
    }

    const oldPath = pathOfNode(this._structure.nodes, node.id);
    const newNodes = this._structure.nodes.map((n) => (n.id === node.id ? { ...n, name: this._editName } : n));
    const newStructure = { version: 1, nodes: newNodes };

    this._editBusy = true;
    try {
      const saved = await saveStructure(this._hass, newStructure);
      this._structure = saved;
      const newPath = pathOfNode(saved.nodes, node.id);
      this._editingId = null;
      this._editName = '';
      if (newPath !== oldPath) {
        this._migrationOffer = { nodeId: node.id, oldPath, newPath, dismissed: false };
      }
    } catch (err) {
      this._editError = errMessage(err);
    } finally {
      this._editBusy = false;
    }
  }

  // --- Delete ----------------------------------------------------------

  _startDelete(node) {
    this._editingId = null;
    this._deletingId = node.id;
    this._deleteError = null;
  }

  _cancelDelete() {
    this._deletingId = null;
    this._deleteError = null;
  }

  async _confirmDelete(node) {
    this._deleteError = null;
    const descendants = descendantIds(this._structure.nodes, node.id);
    const idsToRemove = new Set([node.id, ...descendants]);
    const newNodes = this._structure.nodes.filter((n) => !idsToRemove.has(n.id));
    const newStructure = { version: 1, nodes: newNodes };

    this._deleteBusy = true;
    try {
      const saved = await saveStructure(this._hass, newStructure);
      this._structure = saved;
      this._deletingId = null;
      if (this._migrationOffer && idsToRemove.has(this._migrationOffer.nodeId)) {
        this._migrationOffer = null;
      }
      if (this._migration && idsToRemove.has(this._migration.nodeId)) {
        this._migration = null;
      }
    } catch (err) {
      this._deleteError = errMessage(err);
    } finally {
      this._deleteBusy = false;
    }
  }

  // --- Optional migration (offered right after a successful rename) ------

  async _startMigrationPreview() {
    const offer = this._migrationOffer;
    if (!offer) return;
    this._migration = { ...offer, busy: true, matches: null, error: null, done: false };

    try {
      const items = await fetchAllItems(this._hass);
      const oldSegments = parsePath(offer.oldPath);
      const newSegments = parsePath(offer.newPath);
      const matches = [];
      for (const item of items) {
        const locs = Array.isArray(item.locations) && item.locations.length
          ? item.locations
          : item.location
          ? [item.location]
          : [];
        if (!locs.length) continue;
        const migrated = locs.map((l) => migrateLocationString(l, oldSegments, newSegments));
        const changed = migrated.some((l, i) => l !== locs[i]);
        if (changed) {
          matches.push({ item, newLocation: migrated.join(', ') });
        }
      }
      this._migration = { ...this._migration, busy: false, matches };
    } catch (err) {
      this._migration = { ...this._migration, busy: false, error: errMessage(err) };
    }
  }

  async _confirmMigration() {
    const m = this._migration;
    if (!m || !m.matches) return;
    this._migration = { ...m, busy: true };
    let updated = 0;
    for (const { item, newLocation } of m.matches) {
      try {
        await callUpdateItem(this._hass, {
          inventory_id: item.inventory_id,
          old_name: item.name,
          name: item.name,
          location: newLocation,
        });
        updated++;
      } catch (err) {
        console.warn('inventory-structure-card: item migration failed', item, err);
      }
    }
    this._migration = { ...m, busy: false, done: true, updated, total: m.matches.length };
    this._migrationOffer = null;
  }

  _dismissMigrationOffer() {
    this._migrationOffer = { ...this._migrationOffer, dismissed: true };
  }

  _closeMigrationPanel() {
    this._migration = null;
  }

  _renderMigrationOffer() {
    const offer = this._migrationOffer;
    if (!offer || offer.dismissed) return '';
    return html`
      <div class="banner">
        <span>${STR.migrationOfferText(offer.oldPath, offer.newPath)}</span>
        <button class="btn btn-primary" @click=${() => this._startMigrationPreview()}>${STR.migrateItems}</button>
        <button class="btn" @click=${() => this._dismissMigrationOffer()}>${COMMON.cancel}</button>
      </div>
    `;
  }

  _renderMigrationPanel() {
    const m = this._migration;
    if (!m) return '';

    if (m.busy && !m.matches && !m.done) {
      return html`<div class="banner muted">${STR.migrationSearching}</div>`;
    }
    if (m.error) {
      return html`
        <div class="banner">
          <span class="error-text">${m.error}</span>
          <button class="btn" @click=${() => this._closeMigrationPanel()}>${COMMON.close}</button>
        </div>
      `;
    }
    if (m.done) {
      const failed = m.total - m.updated;
      return html`
        <div class="banner">
          <span>${STR.migrationDone(m.updated, m.total)}${failed > 0 ? STR.migrationPartialFail(failed) : ''}</span>
          <button class="btn" @click=${() => this._closeMigrationPanel()}>${COMMON.close}</button>
        </div>
      `;
    }
    if (m.matches) {
      return html`
        <div class="banner">
          <span>${STR.migrationFound(m.matches.length)}</span>
          ${m.matches.length > 0
            ? html`<button class="btn btn-primary" ?disabled=${m.busy} @click=${() => this._confirmMigration()}>
                ${COMMON.confirm}
              </button>`
            : ''}
          <button class="btn" @click=${() => this._closeMigrationPanel()}>${COMMON.cancel}</button>
        </div>
      `;
    }
    return '';
  }

  // --- Tree ----------------------------------------------------------------

  _renderNodeRow(node, depth) {
    const isEditing = this._editingId === node.id;
    const isDeleting = this._deletingId === node.id;

    return html`
      <div class="node-row" style="padding-left:${depth * 20}px">
        ${isEditing
          ? html`
              <input
                type="text"
                .value=${this._editName}
                @input=${(e) => {
                  this._editName = e.target.value;
                }}
              />
              <button class="btn btn-primary" ?disabled=${this._editBusy} @click=${() => this._saveRename(node)}>
                ${COMMON.save}
              </button>
              <button class="btn" @click=${() => this._cancelRename()}>${COMMON.cancel}</button>
            `
          : html`
              <span class="node-name">${node.name}</span>
              <span class="muted">${LEVEL_LABELS_RU[node.level]}</span>
              <div class="node-actions">
                <button class="btn" @click=${() => this._startRename(node)}>${COMMON.rename}</button>
                <button class="btn" @click=${() => this._startDelete(node)}>${COMMON.delete}</button>
              </div>
            `}
        ${isEditing
          ? html`<div class="confirm-box">
              <span class="muted">${STR.desyncWarning}</span>
              ${this._editError ? html`<span class="error-text">${this._editError}</span>` : ''}
            </div>`
          : ''}
        ${isDeleting ? this._renderDeleteConfirm(node) : ''}
      </div>
      ${node.children && node.children.length ? node.children.map((child) => this._renderNodeRow(child, depth + 1)) : ''}
    `;
  }

  _renderDeleteConfirm(node) {
    const descendants = descendantIds(this._structure.nodes, node.id);
    return html`
      <div class="confirm-box">
        <span>${STR.confirmDeleteTitle(node.name)}</span>
        ${descendants.length > 0 ? html`<span class="error-text">${STR.cascadeWarning(descendants.length)}</span>` : ''}
        <span class="muted">${STR.desyncWarning}</span>
        ${this._deleteError ? html`<span class="error-text">${this._deleteError}</span>` : ''}
        <div class="row">
          <button class="btn btn-primary" ?disabled=${this._deleteBusy} @click=${() => this._confirmDelete(node)}>
            ${COMMON.confirm}
          </button>
          <button class="btn" @click=${() => this._cancelDelete()}>${COMMON.cancel}</button>
        </div>
      </div>
    `;
  }

  render() {
    if (!this._structure) {
      return html`
        <ha-card>
          ${this._config?.title ? html`<div class="card-header">${this._config.title}</div>` : ''}
          <div class="muted">${COMMON.loading}</div>
        </ha-card>
      `;
    }

    const tree = structureToTree(this._structure.nodes);

    return html`
      <ha-card>
        ${this._config?.title ? html`<div class="card-header">${this._config.title}</div>` : ''}
        ${this._renderAddForm()}
        <hr class="divider" />
        ${this._renderMigrationOffer()}
        ${this._renderMigrationPanel()}
        <div class="tree">
          ${tree.length ? tree.map((node) => this._renderNodeRow(node, 0)) : html`<div class="empty-state">${STR.emptyTree}</div>`}
        </div>
      </ha-card>
    `;
  }
}

registerCard({
  tag: 'inventory-structure-card',
  elementClass: InventoryStructureCard,
  cardConfig: {
    type: 'inventory-structure-card',
    name: 'Inventory: Редактор структуры',
    description: 'Создание, переименование и удаление комнат, мебели и полок',
    preview: true,
  },
});
