// Card-specific Russian strings for inventory-list-card. Anything already
// covered by @shared/i18n.js's COMMON dict (search, save, cancel, lowStock,
// expiringSoon, ...) is reused from there instead of being duplicated here —
// see the spec's localization requirement.
import { COMMON } from '@shared/i18n.js';

export const STR = {
  defaultTitle: 'Инвентарь',
  what: 'Что',
  where: 'Где',
  manualBarcodePlaceholder: 'Штрихкод…',
  notFound: 'Не найдено',
  scanPanelTitle: 'Сканирование штрихкода',
  cameraPermissionDenied: 'Нет доступа к камере',
  cameraNotAvailable: 'Камера недоступна',
  scanAgain: 'Сканировать снова',
  detected: 'Обнаружен штрихкод',
  action: 'Действие',
  apply: 'Применить',
  actionIncrement: 'Увеличить',
  actionDecrement: 'Уменьшить',
  actionLookup: 'Только найти',
  matchedItems: 'Найденные предметы',
  searching: 'Поиск…',
  shown: 'показано',
};

export { COMMON };
