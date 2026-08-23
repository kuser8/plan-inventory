# Установка

## 1. Backend

Сначала должна быть установлена сама интеграция
[Simple Inventory](https://github.com/blaineventurine/simple_inventory) (например, через HACS) и
настроен хотя бы один инвентарь.

У вас два варианта, как подключить наш модуль структуры — выберите один.

### Вариант А (рекомендуется): точечный патч поверх установленной интеграции

1. Скопируйте файл `backend/custom_components/simple_inventory/structure.py` из этого репозитория в
   `<config>/custom_components/simple_inventory/structure.py` (то есть рядом с уже установленными
   файлами интеграции — `__init__.py`, `websocket_api.py`, `const.py` и т.д.). Это единственный новый
   файл, никакие существующие файлы интеграции не перезаписываются.

2. Откройте `<config>/custom_components/simple_inventory/__init__.py` и внесите две строки:

   **а) добавьте импорт** — рядом со строкой
   ```python
   from .websocket_api import async_register_websocket_commands
   ```
   добавьте сразу после неё:
   ```python
   from .structure import async_register_structure_websocket_commands
   ```

   **б) зарегистрируйте новые WS-команды** — найдите строку
   ```python
   async_register_websocket_commands(hass)
   ```
   (она находится внутри `async_setup_entry`, в блоке `if not domain_data.get("services_registered"):`,
   непосредственно перед `async_register_intents(hass)`) и добавьте сразу под ней:
   ```python
   async_register_structure_websocket_commands(hass)
   ```

   После патча этот фрагмент `async_setup_entry` должен выглядеть так:
   ```python
       async_register_websocket_commands(hass)
       async_register_structure_websocket_commands(hass)  # <-- добавлено
       async_register_intents(hass)
   ```

3. Перезапустите Home Assistant.

Патч затрагивает только 2 строки в `__init__.py` и не изменяет поведение существующих сервисов/команд
— `structure.py` использует свой собственный ключ хранилища (`simple_inventory_structure`, через
`homeassistant.helpers.storage.Store`) и свои собственные ключи в `hass.data["simple_inventory"]`
(`structure_store`, `structure_lock`), не пересекающиеся с ключами, которые использует сама
интеграция (`coordinators`, `repository`, `services_registered` и т.д. — см. `ANALYSIS.md`).

При обновлении Simple Inventory через HACS до новой версии этот патч, скорее всего, придётся повторно
применить вручную (HACS перезапишет `__init__.py` целиком). `structure.py` при этом обновлении
трогать не должно — просто убедитесь, что импорт и строка регистрации всё ещё на месте после
обновления.

### Вариант Б: отдельный форк интеграции

Если не хотите вручную патчить файлы при каждом обновлении — сделайте форк
`blaineventurine/simple_inventory`, примените тот же патч (см. Вариант А) прямо в форкнутом
`__init__.py`, и устанавливайте интеграцию из своего форка вместо оригинала. Компромисс: вы больше не
получаете обновления оригинала автоматически через HACS и должны будете время от времени вручную
подтягивать апстрим и переприменять патч.

### Проверка

После перезапуска HA откройте карточку D (редактор структуры) на любом дашборде, либо в консоли
разработчика браузера на странице Home Assistant выполните:

```js
const conn = await window.hassConnection;
await conn.conn.sendMessagePromise({ type: 'simple_inventory/get_structure' });
// ожидаемый ответ: { structure: { version: 1, nodes: [] } } на пустой структуре
```

Если команда возвращает `Unknown command` — патч не применился (проверьте отступы/расположение
добавленных строк) или HA не был перезапущен.

## 2. Frontend

1. Соберите бандлы (см. «Сборка» ниже) или возьмите готовые файлы из `dist/`.
2. Скопируйте все четыре файла из `dist/` в `<config>/www/inventory-suite/`:
   - `inventory-list-card.js`
   - `inventory-add-card.js`
   - `inventory-view-card.js`
   - `inventory-structure-card.js`
3. Настройки → Панели управления → Ресурсы → «+ Добавить ресурс» (или в YAML-режиме дашборда) —
   добавьте каждый файл как ресурс типа **JavaScript-модуль**:
   ```
   /local/inventory-suite/inventory-list-card.js
   /local/inventory-suite/inventory-add-card.js
   /local/inventory-suite/inventory-view-card.js
   /local/inventory-suite/inventory-structure-card.js
   ```
4. Жёстко обновите страницу в браузере (Ctrl/Cmd+Shift+R), чтобы сбросить кэш ресурсов.

### Сборка из исходников

```bash
npm ci
npm run build
```

Соберёт по отдельности все четыре бандла в `dist/`:
`inventory-list-card.js`, `inventory-add-card.js`, `inventory-view-card.js`,
`inventory-structure-card.js` (каждый — самодостаточный ES-модуль, `lit` и зависимости уже включены
внутрь, второй ресурс подключать не нужно).

## 3. Использование

1. Добавьте карточку D (`custom:inventory-structure-card`) на служебную страницу и создайте структуру
   — сначала комнаты, затем мебель внутри них, затем полки/ящики внутри мебели.
2. Добавьте карточку B (`custom:inventory-add-card`) и наполните инвентарь товарами — место выбирается
   каскадно из уже созданной структуры.
3. Вынесите карточку A (`custom:inventory-list-card`) в боковую панель (Settings → Dashboards → +
   Add Dashboard → тип «Panel», либо через `panel: true` в YAML конфигурации дашборда) как основной
   быстрый список.
4. Добавьте карточку C (`custom:inventory-view-card`) на обзорную страницу для просмотра по местам и
   категориям.

Минимальные YAML-примеры для каждой карточки — см. раздел «Карточки» в [`README.md`](./README.md).
