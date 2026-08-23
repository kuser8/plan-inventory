// Pure data-shaping helpers for inventory-view-card: turning a flat item
// list + the structure tree into (a) an annotated Room -> Furniture -> Shelf
// tree with per-node item buckets/counters/visibility for the "Места" tab,
// and (b) a flat, sorted category grouping for the "Категории" tab. Kept
// separate from index.js so the grouping logic is easy to reason about /
// unit-test in isolation from Lit rendering.
import { matchLocationToNodes } from '@shared/structureTree.js';
import { parsePath } from '@shared/path.js';
import { isLowStock, isExpiringSoon } from '@shared/itemStatus.js';
import { STR } from './strings.js';

/**
 * The location string to resolve an item against the structure: prefer the
 * singular `location` field (first-associated value), fall back to the
 * first entry of `locations` if `location` is empty.
 * @param {any} item
 */
export function resolveItemLocation(item) {
  if (item.location) return item.location;
  if (Array.isArray(item.locations) && item.locations.length) return item.locations[0];
  return '';
}

/**
 * Text-search + Мало/Истекает filtering, shared by both tabs.
 * @param {any[]} items
 * @param {{search?: string, lowOnly?: boolean, expiringOnly?: boolean}} opts
 */
export function filterItems(items, { search, lowOnly, expiringOnly } = {}) {
  const q = (search || '').trim().toLowerCase();
  return (items || []).filter((item) => {
    if (q && !String(item.name || '').toLowerCase().includes(q)) return false;
    if (lowOnly && !isLowStock(item)) return false;
    if (expiringOnly && !isExpiringSoon(item)) return false;
    return true;
  });
}

/**
 * Bucket items under the deepest structure node their location resolves to
 * (shelf > furniture > room). Items that don't resolve to any node at all
 * (stale/free-text location, or no location) are returned separately.
 * @param {any[]} items
 * @param {any[]} nodes
 */
export function bucketItemsByNode(items, nodes) {
  const byNode = new Map();
  const noLocation = [];
  for (const item of items) {
    const locStr = resolveItemLocation(item);
    const [roomId, furnitureId, shelfId] = matchLocationToNodes(nodes, locStr, parsePath);
    const deepest = shelfId || furnitureId || roomId || null;
    if (deepest) {
      if (!byNode.has(deepest)) byNode.set(deepest, []);
      byNode.get(deepest).push(item);
    } else {
      noLocation.push(item);
    }
  }
  return { byNode, noLocation };
}

/** @param {any[]} items */
export function countStats(items) {
  let low = 0;
  let expiring = 0;
  for (const item of items) {
    if (isLowStock(item)) low++;
    if (isExpiringSoon(item)) expiring++;
  }
  return { total: items.length, low, expiring };
}

/**
 * Annotate a structureToTree() result with each node's own items (bucketed
 * exactly at that node), recursively-summed subtree counters, and whether
 * the node should be rendered at all given the current empty/filter policy.
 * @param {any[]} tree
 * @param {Map<string, any[]>} byNode
 * @param {{showEmpty: boolean, hasActiveFilter: boolean}} opts
 */
export function annotateTree(tree, byNode, { showEmpty, hasActiveFilter }) {
  return (tree || []).map((node) => annotateNode(node, byNode, { showEmpty, hasActiveFilter }));
}

function annotateNode(node, byNode, opts) {
  const ownItems = byNode.get(node.id) || [];
  const children = (node.children || []).map((child) => annotateNode(child, byNode, opts));
  const subtreeItems = ownItems.concat(...children.map((c) => c.subtreeItems));
  const stats = countStats(subtreeItems);
  // Structurally-empty nodes are shown only when the user isn't actively
  // searching/filtering and show_empty_locations is on; once a filter is
  // active, an empty group is just noise and gets hidden regardless.
  const visible = stats.total > 0 || (!opts.hasActiveFilter && !!opts.showEmpty);
  return { ...node, ownItems, children, subtreeItems, ...stats, visible };
}

/**
 * Flat category grouping (real categories sorted by name, "Без категории"
 * last), each group carrying the same total/low/expiring counters as the
 * places tree.
 * @param {any[]} items
 */
export function buildCategoryGroups(items) {
  const map = new Map();
  for (const item of items) {
    const cat = item.category && item.category.trim() ? item.category.trim() : null;
    const key = cat || '__none__';
    if (!map.has(key)) {
      map.set(key, { key, label: cat || STR.noCategory, items: [] });
    }
    map.get(key).items.push(item);
  }
  const groups = Array.from(map.values());
  groups.sort((a, b) => {
    if (a.key === '__none__') return 1;
    if (b.key === '__none__') return -1;
    return a.label.localeCompare(b.label, 'ru');
  });
  return groups.map((group) => ({ ...group, ...countStats(group.items) }));
}
