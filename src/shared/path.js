import { PATH_SEP } from './constants.js';

/**
 * Split a `location` string ("Кухня / Шкаф / Верхняя полка") into 1-3
 * trimmed, non-empty segments. Tolerant of extra whitespace around the
 * separator and of a bare single-level path with no separator at all.
 * @param {string | null | undefined} location
 * @returns {string[]}
 */
export function parsePath(location) {
  if (!location || typeof location !== 'string') return [];
  return location
    .split('/')
    .map((segment) => segment.trim())
    .filter((segment) => segment.length > 0)
    .slice(0, 3);
}

/**
 * Join 1-3 segments back into a single `location` string.
 * @param {(string | null | undefined)[]} segments
 * @returns {string}
 */
export function buildPath(segments) {
  return (segments || [])
    .map((segment) => (segment == null ? '' : String(segment).trim()))
    .filter((segment) => segment.length > 0)
    .join(PATH_SEP);
}

/**
 * Validate a single structure node name against the same rules enforced
 * server-side by structure.py's validate_structure: non-empty, no
 * leading/trailing whitespace, no '/' (the path separator).
 * @param {string} name
 * @returns {{ valid: boolean, error?: string }}
 */
export function validateNodeName(name) {
  if (typeof name !== 'string') return { valid: false, error: 'Название обязательно' };
  if (name !== name.trim()) {
    return { valid: false, error: 'Название не должно начинаться/заканчиваться пробелом' };
  }
  if (!name) return { valid: false, error: 'Название не должно быть пустым' };
  if (name.includes('/')) {
    return { valid: false, error: "Символ '/' в названии запрещён (используется как разделитель пути)" };
  }
  return { valid: true };
}
