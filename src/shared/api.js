import { DOMAIN, SERVICES, WS_COMMANDS } from './constants.js';

/**
 * Drop undefined/null/empty-string keys so optional voluptuous fields on
 * the backend aren't sent at all rather than sent as "" (add_item/
 * update_item schemas are permissive either way, but omitting keeps
 * payloads small and avoids e.g. writing an empty category over one that
 * was never meant to change during a partial update).
 * @param {Record<string, any>} obj
 */
function cleanServiceData(obj) {
  const out = {};
  for (const [key, value] of Object.entries(obj)) {
    if (value === undefined || value === null || value === '') continue;
    out[key] = value;
  }
  return out;
}

// --- Inventories -----------------------------------------------------------

/**
 * Enumerate configured inventories purely by scanning hass.states for
 * `sensor.*` entities that carry an `inventory_id` attribute — there is no
 * backend WS/service command that lists inventories (confirmed in
 * ANALYSIS.md), so this mirrors the upstream card's own approach
 * (`findInventoryEntities`).
 * @param {any} hass
 * @returns {{ inventory_id: string, name: string, entity_id: string }[]}
 */
export function listInventories(hass) {
  if (!hass || !hass.states) return [];
  const seen = new Map();
  for (const [entityId, state] of Object.entries(hass.states)) {
    if (!entityId.startsWith('sensor.') || !entityId.includes('inventory')) continue;
    const inventoryId = state.attributes && state.attributes.inventory_id;
    if (!inventoryId || seen.has(inventoryId)) continue;
    const friendlyName = (state.attributes && state.attributes.friendly_name) || inventoryId;
    seen.set(inventoryId, {
      inventory_id: inventoryId,
      name: friendlyName.replace(/\s+Inventory$/i, ''),
      entity_id: entityId,
    });
  }
  return Array.from(seen.values()).sort((a, b) => a.name.localeCompare(b.name, 'ru'));
}

// --- Items -------------------------------------------------------------

/**
 * Fetch and flatten items across every configured inventory, via one
 * `simple_inventory/list_items` WS call per inventory (there is no
 * single "all inventories" WS command). Each item already carries its own
 * `inventory_id`; `inventory_name` is added for display.
 * @param {any} hass
 */
export async function fetchAllItems(hass) {
  const inventories = listInventories(hass);
  const perInventory = await Promise.all(
    inventories.map(async (inv) => {
      const result = await hass.callWS({
        type: WS_COMMANDS.LIST_ITEMS,
        inventory_id: inv.inventory_id,
      });
      return (result.items || []).map((item) => ({
        ...item,
        inventory_id: inv.inventory_id,
        inventory_name: inv.name,
      }));
    })
  );
  return perInventory.flat();
}

/** @param {any} hass @param {Record<string, any>} data */
export async function callAddItem(hass, data) {
  return hass.callService(DOMAIN, SERVICES.ADD_ITEM, cleanServiceData(data));
}

/** @param {any} hass @param {Record<string, any>} data */
export async function callUpdateItem(hass, data) {
  return hass.callService(DOMAIN, SERVICES.UPDATE_ITEM, cleanServiceData(data));
}

/** @param {any} hass @param {Record<string, any>} data */
export async function callIncrementItem(hass, data) {
  return hass.callService(DOMAIN, SERVICES.INCREMENT_ITEM, cleanServiceData(data));
}

/** @param {any} hass @param {Record<string, any>} data */
export async function callDecrementItem(hass, data) {
  return hass.callService(DOMAIN, SERVICES.DECREMENT_ITEM, cleanServiceData(data));
}

/** @param {any} hass @param {Record<string, any>} data */
export async function callRemoveItem(hass, data) {
  return hass.callService(DOMAIN, SERVICES.REMOVE_ITEM, cleanServiceData(data));
}

/** @param {any} hass @param {Record<string, any>} data */
export async function callScanBarcode(hass, data) {
  return hass.callService(DOMAIN, SERVICES.SCAN_BARCODE, cleanServiceData(data));
}

/**
 * @param {any} hass
 * @param {string} barcode
 * @returns {Promise<any[]>} matching items across all inventories
 */
export async function callLookupByBarcode(hass, barcode) {
  const result = await hass.callWS({ type: WS_COMMANDS.LOOKUP_BY_BARCODE, barcode });
  return result.items || [];
}

/**
 * Subscribe to the domain-wide (no inventory_id) update ping. The backend
 * pushes a bare `{event: "updated"}` on *any* change to *any* inventory
 * (see ANALYSIS.md "subscribe — точное поведение"), so the callback takes
 * no payload — callers should re-fetch (e.g. via fetchAllItems) on each
 * invocation.
 * @param {any} hass
 * @param {() => void} callback
 * @returns {Promise<() => void>} unsubscribe function
 */
export function subscribeItemsGlobal(hass, callback) {
  return hass.connection.subscribeMessage(() => callback(), { type: WS_COMMANDS.SUBSCRIBE });
}

// --- Structure (Room -> Furniture -> Shelf) ---------------------------

/**
 * @param {any} hass
 * @returns {Promise<{version: number, nodes: any[]}>}
 */
export async function loadStructure(hass) {
  const result = await hass.callWS({ type: WS_COMMANDS.GET_STRUCTURE });
  return result.structure;
}

/**
 * @param {any} hass
 * @param {{version: number, nodes: any[]}} structure
 * @returns {Promise<{version: number, nodes: any[]}>} the normalized, saved structure
 */
export async function saveStructure(hass, structure) {
  const result = await hass.callWS({ type: WS_COMMANDS.SET_STRUCTURE, structure });
  return result.structure;
}

/**
 * @param {any} hass
 * @param {(structure: {version: number, nodes: any[]}) => void} callback
 * @returns {Promise<() => void>} unsubscribe function
 */
export function subscribeStructure(hass, callback) {
  return hass.connection.subscribeMessage((message) => callback(message.structure), {
    type: WS_COMMANDS.SUBSCRIBE_STRUCTURE,
  });
}
