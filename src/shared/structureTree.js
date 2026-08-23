import { PATH_SEP } from './constants.js';

/**
 * @typedef {{ id: string, level: 0|1|2, name: string, parent: string|null }} StructureNode
 * @typedef {{ version: number, nodes: StructureNode[] }} Structure
 */

/** @param {StructureNode[]} nodes @param {string} id */
export function nodeById(nodes, id) {
  return nodes.find((n) => n.id === id) || null;
}

/**
 * Direct children of a node (or of the root, when parentId is null) at a
 * given level, sorted by name for stable cascade rendering.
 * @param {StructureNode[]} nodes
 * @param {0|1|2} level
 * @param {string|null} parentId
 */
export function childrenOf(nodes, level, parentId) {
  return nodes
    .filter((n) => n.level === level && n.parent === (parentId ?? null))
    .sort((a, b) => a.name.localeCompare(b.name, 'ru'));
}

/** Rooms (level 0), sorted by name. @param {StructureNode[]} nodes */
export function rootsOf(nodes) {
  return childrenOf(nodes, 0, null);
}

/**
 * Full display path of a node, walking up through `parent`, e.g.
 * "Кухня / Шкаф навесной / Верхняя полка". Returns '' if the id isn't found.
 * @param {StructureNode[]} nodes
 * @param {string} id
 */
export function pathOfNode(nodes, id) {
  const segments = [];
  let current = nodeById(nodes, id);
  const seen = new Set();
  while (current && !seen.has(current.id)) {
    segments.unshift(current.name);
    seen.add(current.id);
    current = current.parent ? nodeById(nodes, current.parent) : null;
  }
  return segments.join(PATH_SEP);
}

/**
 * All descendant ids of a node (children, grandchildren, ...), used to warn
 * about cascade deletes before committing them.
 * @param {StructureNode[]} nodes
 * @param {string} id
 * @returns {string[]}
 */
export function descendantIds(nodes, id) {
  const result = [];
  const stack = [id];
  while (stack.length) {
    const current = stack.pop();
    for (const child of nodes.filter((n) => n.parent === current)) {
      result.push(child.id);
      stack.push(child.id);
    }
  }
  return result;
}

/**
 * Build a nested tree (rooms -> furniture -> shelves) for rendering
 * cascades / the structure-card tree view.
 * @param {StructureNode[]} nodes
 * @returns {Array<StructureNode & { children: any[] }>}
 */
export function structureToTree(nodes) {
  const build = (level, parentId) =>
    childrenOf(nodes, level, parentId).map((node) => ({
      ...node,
      children: level < 2 ? build(level + 1, node.id) : [],
    }));
  return build(0, null);
}

/**
 * Given a location string as stored on an item, resolve it against the
 * structure to find the matching node ids at each level, if any. Used by
 * cascade filters so a free-text (or stale/renamed) location string can
 * still be matched where possible; segments that don't match any node are
 * simply left as `null` at that level (display still falls back to the
 * raw text).
 * @param {StructureNode[]} nodes
 * @param {string} location
 * @param {(location: string) => string[]} parsePathFn
 */
export function matchLocationToNodes(nodes, location, parsePathFn) {
  const segments = parsePathFn(location);
  const ids = [null, null, null];
  let parentId = null;
  for (let level = 0; level < segments.length; level++) {
    const match = childrenOf(nodes, /** @type {0|1|2} */ (level), parentId).find(
      (n) => n.name === segments[level]
    );
    if (!match) break;
    ids[level] = match.id;
    parentId = match.id;
  }
  return ids;
}
