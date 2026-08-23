# Inventory Structure Suite

[![HACS Custom][hacs-shield]][hacs-url]
[![HACS Validation][hacs-action-shield]][hacs-action-url]
[![Hassfest][hassfest-shield]][hassfest-url]
[![Релиз][release-shield]][release-url]

Надстройка над [Simple Inventory](https://github.com/blaineventurine/simple_inventory) (backend-интеграция
Home Assistant) и [simple-inventory-card](https://github.com/blaineventurine/simple-inventory-card)
(родная Lovelace-карточка) — оба проекта авторства [Blaine Venturine](https://github.com/blaineventurine),
распространяются по лицензии MIT. Эта надстройка **не форкает и не изменяет их логику учёта товаров** —
она добавляет:

1. Отдельную (standalone) интеграцию Home Assistant **«Simple Inventory: Структура мест»**
   (`custom_components/simple_inventory_structure/`, свой домен, своя запись конфигурации через
   обычный UI-мастер «Добавить интеграцию»), которая хранит трёхуровневый справочник мест
   **Комната → Мебель → Полка/ящик** и отдаёт его по WebSocket. Она ничего не патчит и не меняет в
   уже установленной Simple Inventory — устанавливается и удаляется полностью независимо.
2. Четыре независимые Lovelace-карточки, которые используют существующие сервисы/WebSocket-команды
   Simple Inventory (`add_item`, `list_items`, `scan_barcode` и т.д.) и WebSocket-команды нашей
   новой интеграции структуры.

Ставится через HACS как два обычных дополнения (Integration + Plugin) — см. [`INSTALL.md`](./INSTALL.md).

Из уважения к оригинальному проекту: если вам не нужна трёхуровневая структура мест — просто используйте
[simple-inventory-card](https://github.com/blaineventurine/simple-inventory-card) как есть, она полнее
покрывает остальной функционал (история, статистика, авто-добавление в списки покупок и т.д.). Эта
надстройка сфокусирована только на задаче "спроектировать места заранее и удобно раскладывать товары
по ним".

Подробный разбор устройства обоих upstream-проектов (реальные сигнатуры сервисов, формат данных,
паттерн WebSocket-команд, сборка карточки, сканер штрихкодов) — см. [`ANALYSIS.md`](./ANALYSIS.md).
Установка — см. [`INSTALL.md`](./INSTALL.md).

## Схема данных структуры

Справочник мест хранится **не** в `input_text` (у него жёсткий лимит 255 символов — недостаточно для
дерева из нескольких комнат), а в собственном файле `.storage/simple_inventory_structure` через
`homeassistant.helpers.storage.Store`, независимо от SQLite-хранилища самой интеграции Simple Inventory.

Формат — плоский список узлов с родительскими ссылками:

```json
{
  "version": 1,
  "nodes": [
    { "id": "r1", "level": 0, "name": "Кухня",         "parent": null },
    { "id": "f1", "level": 1, "name": "Шкаф навесной", "parent": "r1" },
    { "id": "s1", "level": 2, "name": "Верхняя полка",  "parent": "f1" },
    { "id": "s2", "level": 2, "name": "Нижняя полка",   "parent": "f1" }
  ]
}
```

- `level`: `0` — Комната, `1` — Мебель, `2` — Полка/ящик.
- `parent`: id родителя уровнем выше; у комнат — `null`.
- Название узла: непустое, без ведущих/замыкающих пробелов, без символа `/`, уникально среди узлов
  с тем же родителем (сиблингов).

### Кодирование пути в поле `location`

У товара в Simple Inventory уже есть свободно-текстовое поле `location`. Мы кодируем в него путь по
структуре, соединяя названия узлов через `" / "` (пробел-слэш-пробел):

```
Кухня / Шкаф навесной / Верхняя полка
```

- При добавлении/редактировании товара карточка B собирает эту строку из каскадных `<select>` и
  передаёт как `location` в сервис `add_item`/`update_item`.
- При отображении карточки A/C берут `location` (или первый элемент `locations`, если есть несколько)
  и разбирают его обратно на 1–3 сегмента.
- Путь может быть **частичным**: `"Кухня"` (без мебели и полки) или `"Кухня / Холодильник"` (без
  полки) — оба валидны, разбор корректно обрабатывает 1–3 сегмента.
- Именно поэтому символ `/` запрещён в названиях узлов структуры — иначе разбор пути сломается.

Ключевой момент: **структура узлов и `location` товаров — не связаны по ссылке**, только по строке
пути. Переименование/удаление узла в карточке D не меняет `location` уже добавленных товаров — см.
раздел «Ограничения».

## Карточки

Все четыре карточки — независимые кастомные элементы, каждая в своём файле `dist/*.js`, чтобы их можно
было по отдельности размещать на разных дашбордах и в боковой панели.

### A. `inventory-list-card` — общий список

Плоский агрегированный список товаров из всех инвентарей. Предназначена для боковой панели: поиск по
названию, сканер штрихкодов (камера + ручной ввод), фильтры «Что» (категория) и «Где» (каскад
Комната→Мебель→Полка), быстрые тумблеры «Мало»/«Истекает», кнопки `+`/`-` у каждой строки.

```yaml
type: custom:inventory-list-card
title: Все товары
show_scanner: true
default_filters:
  low_stock: false
  expiring_soon: false
```

### B. `inventory-add-card` — добавление товара

Форма добавления с каскадным выбором места из справочника структуры (частичный выбор допустим),
автоподсказками категорий, сканером штрихкода для заполнения поля.

```yaml
type: custom:inventory-add-card
default_inventory_id: ""
default_location: "Кухня / Холодильник"
fields:
  - quantity
  - unit
  - category
  - barcode
  - expiry_date
```

### C. `inventory-view-card` — просмотр по вкладкам

Вкладка «Места» — дерево Комната→Мебель→Полка (сворачиваемое, со счётчиками, включая пустые места из
справочника) и вкладка «Категории» — плоская группировка. Общий поиск и фильтры «Мало»/«Истекает».

```yaml
type: custom:inventory-view-card
default_tab: places
show_empty_locations: true
collapsed_by_default: false
```

### D. `inventory-structure-card` — редактор структуры

Единственное место, где создаётся/переименовывается/удаляется справочник мест. Пишет через WS-команду
`simple_inventory_structure/set_structure`.

```yaml
type: custom:inventory-structure-card
title: Структура мест
```

## Ограничения

- **Рассинхронизация при переименовании/удалении узла структуры.** `location` уже добавленных товаров
  — это независимая строка, а не ссылка на id узла. Переименование/удаление узла в карточке D **не**
  обновляет автоматически товары, у которых этот путь уже сохранён (карточка показывает
  предупреждение об этом перед подтверждением действия). При необходимости используйте опциональную
  функцию «Мигрировать товары» в карточке D — она находит товары по старому префиксу пути и обновляет
  их `location` через `update_item` явным подтверждаемым действием.
- **`/` в названиях узлов запрещён** — используется как разделитель уровней пути. Ведущие/замыкающие
  пробелы в названиях тоже запрещены.
- Названия узлов должны быть уникальны только среди узлов **с одним и тем же родителем** — например,
  «Верхняя полка» может существовать в двух разных шкафах одновременно.
- Нет отдельного визуального YAML-редактора карточек (`getConfigElement`) — конфигурация только через
  YAML/UI-редактор карточки в текстовом режиме.


## Лицензия

Код этого репозитория передан в общественное достояние по [The Unlicense](./LICENSE). Оба
upstream-проекта, на которые опирается эта надстройка (Simple Inventory и simple-inventory-card),
распространяются по лицензии MIT авторства [Blaine Venturine](https://github.com/blaineventurine) —
их код в этот репозиторий не включён, поэтому их лицензия и авторство сохраняются отдельно за ними.

[hacs-shield]: https://img.shields.io/badge/HACS-Custom-41BDF5.svg
[hacs-url]: https://github.com/hacs/integration
[hacs-action-shield]: https://github.com/kuser8/plan-inventory/actions/workflows/hacs.yml/badge.svg
[hacs-action-url]: https://github.com/kuser8/plan-inventory/actions/workflows/hacs.yml
[hassfest-shield]: https://github.com/kuser8/plan-inventory/actions/workflows/hassfest.yml/badge.svg
[hassfest-url]: https://github.com/kuser8/plan-inventory/actions/workflows/hassfest.yml
[release-shield]: https://img.shields.io/github/v/release/kuser8/plan-inventory
[release-url]: https://github.com/kuser8/plan-inventory/releases
