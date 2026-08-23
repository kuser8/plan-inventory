// Card-specific Russian strings for inventory-structure-card. Anything
// already covered by @shared/i18n.js's COMMON dict (add/delete/rename/save/
// cancel/confirm/room/furniture/shelf/...) is reused from there instead of
// being duplicated here.
export const STR = {
  level: 'Уровень',
  parent: 'Родитель',
  name: 'Название',
  selectParent: '— выберите —',
  emptyTree: 'Структура пуста. Добавьте первую комнату.',
  noParentsAvailable: (parentLevelLabel) =>
    `Сначала добавьте узел уровня «${parentLevelLabel}»`,

  // Required desync warning (shown before committing a rename or delete):
  // structure node edits do not retroactively change the `location` string
  // already stored on existing items (backend has no linkage between item
  // locations and structure node ids).
  desyncWarning:
    'Существующие товары в этом месте сохранят старый путь; при необходимости обновите их вручную.',

  confirmDeleteTitle: (name) => `Удалить «${name}»?`,
  cascadeWarning: (n) => `Будет удалено ${n} узлов вместе с этим.`,

  siblingExists: (name) => `Узел с названием «${name}» уже существует на этом уровне`,
  parentRequired: 'Выберите родителя',

  // Optional migration feature (rename-triggered): offered right after a
  // successful rename, since that's the one moment the client concretely
  // knows both the old and the new full path without needing extra
  // bookkeeping (structure nodes don't keep rename history).
  migrateItems: 'Мигрировать товары',
  migrationOfferText: (oldPath, newPath) =>
    `Путь изменился: «${oldPath}» → «${newPath}». Обновить места товаров, сохранённых по старому пути?`,
  migrationSearching: 'Поиск товаров…',
  migrationFound: (n) =>
    n === 0 ? 'Подходящих товаров не найдено.' : `Найдено товаров для обновления: ${n}.`,
  migrationApplying: 'Обновление товаров…',
  migrationDone: (updated, total) => `Обновлено ${updated} из ${total} товаров.`,
  migrationPartialFail: (failed) => ` Не удалось обновить: ${failed}.`,
};
