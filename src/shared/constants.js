// Shared constants for all four inventory-structure-suite cards.
// Service/WS names here intentionally mirror the backend exactly (see
// ANALYSIS.md) so a rename on either side is easy to spot.

// Upstream Simple Inventory's own domain — owns items/inventories/
// add_item/list_items/etc. We never touch its files or hass.data.
export const DOMAIN = 'simple_inventory';

// Our own standalone companion integration (custom_components/
// simple_inventory_structure/) — owns the Room/Furniture/Shelf structure
// storage and its WS commands, under its own domain prefix so there's no
// ambiguity about which integration a given WS command type belongs to.
export const STRUCTURE_DOMAIN = 'simple_inventory_structure';

// Joins/splits a structure path (Room / Furniture / Shelf) into the single
// `location` string field the backend already supports. Spaces around the
// slash are required so a name containing "/" is rejected instead of being
// silently swallowed into a deeper path (see structure.py validation).
export const PATH_SEP = ' / ';

export const SERVICES = {
  ADD_ITEM: 'add_item',
  UPDATE_ITEM: 'update_item',
  INCREMENT_ITEM: 'increment_item',
  DECREMENT_ITEM: 'decrement_item',
  REMOVE_ITEM: 'remove_item',
  SCAN_BARCODE: 'scan_barcode',
};

export const WS_COMMANDS = {
  LIST_ITEMS: `${DOMAIN}/list_items`,
  SUBSCRIBE: `${DOMAIN}/subscribe`,
  LOOKUP_BY_BARCODE: `${DOMAIN}/lookup_by_barcode`,
  GET_STRUCTURE: `${STRUCTURE_DOMAIN}/get_structure`,
  SET_STRUCTURE: `${STRUCTURE_DOMAIN}/set_structure`,
  SUBSCRIBE_STRUCTURE: `${STRUCTURE_DOMAIN}/subscribe_structure`,
};

export const LEVEL = {
  ROOM: 0,
  FURNITURE: 1,
  SHELF: 2,
};

export const LEVEL_LABELS_RU = {
  [LEVEL.ROOM]: 'Комната',
  [LEVEL.FURNITURE]: 'Мебель',
  [LEVEL.SHELF]: 'Полка/ящик',
};
