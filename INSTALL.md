# Установка и настройка

Как и у большинства аддонов для Home Assistant, установка состоит из двух частей: **интеграция**
(backend) и **карточки для дашборда** (frontend). Обе можно поставить через HACS одним и тем же
репозиторием — просто добавьте его дважды, под разными категориями (см. ниже), либо вручную.

Сначала должна быть установлена сама интеграция
[Simple Inventory](https://github.com/blaineventurine/simple_inventory) (например, через HACS) и
настроен хотя бы один инвентарь — эта надстройка добавляет к ней справочник мест и карточки, но не
заменяет её.

## 1. Через HACS (рекомендуется)

[HACS](https://hacs.xyz/) не входит в список репозиториев по умолчанию — репозиторий добавляется
как **пользовательский (custom repository)**.

### 1.1 Добавить репозиторий в HACS

HACS → меню (⋮) в правом верхнем углу → **Пользовательские репозитории** → вставьте:

```
https://github.com/kuser8/plan-inventory
```

и по очереди добавьте его **дважды** — один раз с категорией **Integration**, второй раз с
категорией **Plugin** (frontend-карточки распространяются как Plugin, backend-интеграция — как
Integration; HACS покажет их как два отдельных элемента).

Быстрые ссылки (если открываете со смартфона/ПК с настроенным Home Assistant):

[![Открыть репозиторий в HACS (Integration)](https://my.home-assistant.io/badges/hacs_repository.svg)](https://my.home-assistant.io/redirect/hacs_repository/?owner=kuser8&repository=plan-inventory&category=integration)
[![Открыть репозиторий в HACS (Plugin)](https://my.home-assistant.io/badges/hacs_repository.svg)](https://my.home-assistant.io/redirect/hacs_repository/?owner=kuser8&repository=plan-inventory&category=plugin)

### 1.2 Установить обе части

В HACS откройте «Simple Inventory: Структура мест» (категория Integrations) → **Скачать** →
перезапустите Home Assistant.

Затем откройте «Inventory Structure Suite» (категория Frontend/Plugins) → **Скачать**. HACS
скачает файлы карточек в `www/community/plan-inventory/` и автоматически добавит один ресурс
дашборда (`inventory-list-card.js`). Оставшиеся три ресурса нужно добавить вручную один раз (HACS
регистрирует ресурсы только для одного основного файла на плагин) — см. шаг 2.4.

### 1.3 Добавить интеграцию

После перезапуска: **Настройки → Устройства и службы → Добавить интеграцию** → найдите
«Simple Inventory: Структура мест» → **Отправить** (настраивать нечего, это создаёт единственную
нужную запись).

[![Добавить интеграцию](https://my.home-assistant.io/badges/config_flow_start.svg)](https://my.home-assistant.io/redirect/config_flow_start/?domain=simple_inventory_structure)

### 1.4 Добавить оставшиеся ресурсы карточек

**Настройки → Панели управления → ⋮ → Ресурсы** → «+ Добавить ресурс» → тип **JavaScript-модуль**,
добавьте оставшиеся три (первый, `inventory-list-card.js`, HACS уже добавил):

```
/hacsfiles/plan-inventory/inventory-add-card.js
/hacsfiles/plan-inventory/inventory-view-card.js
/hacsfiles/plan-inventory/inventory-structure-card.js
```

Готово — переходите к разделу «3. Настройка».

## 2. Вручную (без HACS)

### 2.1 Backend

Скопируйте папку `custom_components/simple_inventory_structure/` из этого репозитория целиком в
`<config>/custom_components/simple_inventory_structure/`. Ничего в уже установленной интеграции
Simple Inventory менять не нужно — это полностью отдельная интеграция со своим доменом.

Перезапустите Home Assistant, затем **Настройки → Устройства и службы → Добавить интеграцию** →
«Simple Inventory: Структура мест» → **Отправить**.

### 2.2 Frontend

Соберите бандлы (или возьмите готовые из `dist/` в этом репозитории):

```bash
npm ci
npm run build
```

Скопируйте все четыре файла из `dist/` в `<config>/www/inventory-suite/`:

- `inventory-list-card.js`
- `inventory-add-card.js`
- `inventory-view-card.js`
- `inventory-structure-card.js`

**Настройки → Панели управления → ⋮ → Ресурсы** → добавьте каждый файл как ресурс типа
**JavaScript-модуль**:

```
/local/inventory-suite/inventory-list-card.js
/local/inventory-suite/inventory-add-card.js
/local/inventory-suite/inventory-view-card.js
/local/inventory-suite/inventory-structure-card.js
```

Жёстко обновите страницу в браузере (Ctrl/Cmd+Shift+R), чтобы сбросить кэш ресурсов.

### Проверка backend

После добавления интеграции откройте карточку D (редактор структуры) на любом дашборде, либо в
консоли разработчика браузера на странице Home Assistant выполните:

```js
const conn = await window.hassConnection;
await conn.conn.sendMessagePromise({ type: 'simple_inventory_structure/get_structure' });
// ожидаемый ответ на пустой структуре: { structure: { version: 1, nodes: [] } }
```

Если команда возвращает `Unknown command` — интеграция не добавлена или HA не был перезапущен после
установки файлов.

## 3. Настройка

1. Добавьте карточку D (`custom:inventory-structure-card`) на служебную страницу и создайте
   структуру — сначала комнаты, затем мебель внутри них, затем полки/ящики внутри мебели.
2. Добавьте карточку B (`custom:inventory-add-card`) и наполните инвентарь товарами — место
   выбирается каскадно из уже созданной структуры.
3. Вынесите карточку A (`custom:inventory-list-card`) в боковую панель (Settings → Dashboards → +
   Add Dashboard → тип «Panel», либо `panel: true` в YAML-конфигурации дашборда) как основной
   быстрый список.
4. Добавьте карточку C (`custom:inventory-view-card`) на обзорную страницу для просмотра по местам
   и категориям.

Все четыре карточки видны в стандартном UI-редакторе дашборда (кнопка «+ Добавить карточку» →
поиск по названию «Inventory») — визуальных YAML-редакторов у них нет, конфигурация — через
текстовый режим карточки. Минимальные YAML-примеры для каждой — см. раздел «Карточки» в
[`README.md`](./README.md).

## Обновления

- **Backend/Frontend через HACS**: HACS сам предложит обновление при выходе нового релиза в этом
  репозитории (см. `.github/workflows/release.yml` — релизы собираются автоматически по тегу
  `vX.Y.Z`).
- **Вручную**: подтяните новую версию репозитория и повторите шаги 2.1/2.2.
