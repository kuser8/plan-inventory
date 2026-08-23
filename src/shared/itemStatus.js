// Status helpers matching the backend's own definitions exactly, so the
// "Мало"/"Истекает" badges/filters agree with values a user could also see
// from simple_inventory's own sensors/statistics WS command (see
// InventoryRepository.compute_inventory_stats in ANALYSIS.md).

/**
 * @typedef {object} InventoryItem
 * @property {string} name
 * @property {number} quantity
 * @property {number} [auto_add_to_list_quantity]
 * @property {number} [desired_quantity]
 * @property {string} [expiry_date] YYYY-MM-DD
 * @property {number} [expiry_alert_days]
 * @property {string} [location]
 * @property {string[]} [locations]
 * @property {string} [category]
 * @property {string[]} [categories]
 * @property {string[]} [barcodes]
 * @property {string} inventory_id
 */

/**
 * Low stock exactly as `compute_inventory_stats` defines it: a threshold
 * ("auto_add_to_list_quantity") must be set (> 0), and current quantity is
 * at or below it.
 * @param {InventoryItem} item
 */
export function isLowStock(item) {
  const threshold = Number(item.auto_add_to_list_quantity || 0);
  const quantity = Number(item.quantity || 0);
  return threshold > 0 && quantity <= threshold;
}

/**
 * Whole (possibly negative, meaning already expired) days between today and
 * the item's expiry_date. Returns null if no expiry_date is set.
 * @param {InventoryItem} item
 * @returns {number | null}
 */
export function daysUntilExpiry(item) {
  if (!item.expiry_date) return null;
  const expiry = new Date(`${item.expiry_date}T00:00:00`);
  if (Number.isNaN(expiry.getTime())) return null;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const msPerDay = 24 * 60 * 60 * 1000;
  return Math.round((expiry.getTime() - today.getTime()) / msPerDay);
}

/**
 * True if the item has an expiry date within its own `expiry_alert_days`
 * window (or already passed). Items with quantity 0 are excluded, matching
 * `list_items_expiring_before`'s `items.quantity > 0` filter.
 * @param {InventoryItem} item
 */
export function isExpiringSoon(item) {
  if (Number(item.quantity || 0) <= 0) return false;
  const days = daysUntilExpiry(item);
  if (days === null) return false;
  const alertDays = Number(item.expiry_alert_days || 0);
  return days <= alertDays;
}
