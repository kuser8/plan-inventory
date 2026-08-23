# ANALYSIS: simple_inventory + simple-inventory-card upstream research

Source: shallow clones of `blaineventurine/simple_inventory` (commit at clone time, manifest
version `0.6.0`) and `blaineventurine/simple-inventory-card` (package.json version `0.6.0`),
cloned into `/tmp/si_analysis/`. All facts below are read directly from code, not from READMEs,
unless explicitly marked as a README quote. File paths are relative to each repo root unless
stated otherwise. Copies of the most load-bearing files are under
`/home/konsta/plan-inventory/reference/backend/` and `/home/konsta/plan-inventory/reference/frontend/`.

**Component path**: the actual integration lives at
`simple_inventory/custom_components/simple_inventory/` (not the repo root).

---

## Backend: структура файлов

```
custom_components/simple_inventory/
├── __init__.py                 # async_setup_entry / async_unload_entry, service+WS registration
├── config_flow.py               # ConfigFlow + OptionsFlow (one entry = one "inventory")
├── const.py                     # DOMAIN, service names, FIELD_* keys, event names
├── coordinator/
│   ├── __init__.py              # re-exports SimpleInventoryCoordinator
│   ├── _core.py                 # SimpleInventoryCoordinator (facade over repository + HA events)
│   ├── _analytics.py            # _AnalyticsMixin (consumption rates)
│   ├── _import_export.py        # _ImportExportMixin (JSON/CSV import/export)
│   ├── _protocol.py             # typing Protocol for mixins
│   └── _statistics.py           # _StatisticsMixin (get_inventory_statistics)
├── data/custom_sentences/en/simple_inventory.yaml   # voice sentence templates
├── intents.py                   # HA intent handlers (voice/LLM add/remove/query)
├── llm.py                       # exposes intents as LLM tools
├── manifest.json
├── providers/                   # barcode product-lookup providers (OpenFoodFacts, UPCItemDB, ...)
│   ├── __init__.py, base.py, lookup.py, registry.py
│   ├── open_beauty_facts.py, open_pet_food_facts.py, openfoodfacts.py, upcitemdb.py
├── schemas/
│   ├── __init__.py
│   └── service_schemas.py       # voluptuous schemas for every hass.services.async_register call
├── sensor.py                    # platform entry point, creates sensors per config entry
├── sensors/
│   ├── __init__.py
│   ├── inventory_sensor.py      # sensor.<name>_inventory
│   ├── expiry_sensor.py         # sensor.<name>_items_expiring_soon
│   ├── expired_items_sensor.py  # sensor.<name>_expired_items
│   ├── global_expiry_sensor.py  # sensor.all_items_expiring_soon
│   └── global_expired_items_sensor.py  # sensor.all_expired_items
├── services.yaml                # HA services UI metadata (descriptions/selectors)
├── services/
│   ├── __init__.py              # ServiceHandler facade, dispatches to Inventory/Quantity services
│   ├── base_service.py          # BaseServiceHandler (shared helpers)
│   ├── domain_data.py           # typed accessors into hass.data[DOMAIN]
│   ├── inventory_service.py     # add/remove/update/get_items/get_items_from_all_inventories
│   ├── quantity_service.py      # increment/decrement/scan_barcode
│   └── resolvers.py             # inventory_id/name resolution, item-name/alias resolution
├── setup.py                     # (present but not central to lifecycle; see __init__.py)
├── storage/
│   ├── __init__.py
│   └── repository.py            # InventoryRepository — SQLite (aiosqlite) backing store
├── todo_manager.py              # auto-add-to-todo-list integration
├── translations/{en,es,fr,sl}.json
├── types.py                     # TypedDicts incl. SimpleInventoryDomainData
├── voice_sentences.py           # installs the custom_sentences file into HA config
└── websocket_api.py             # all `simple_inventory/*` WS commands
```

Tests: `tests/` mirrors this structure (see "Backend: тесты — стиль" below).

---

## Backend: паттерн регистрации WebSocket-команд

Single module `websocket_api.py`. Pattern: one `@websocket_api.websocket_command({...vol.Schema...})`
+ `@websocket_api.async_response` (or `@callback` for the sync `subscribe` command) decorated
function per command, each delegating to a private `_handle_*` coroutine. All commands are
registered in one function called once from `__init__.py`:

```python
# websocket_api.py:37-53
def async_register_websocket_commands(hass: HomeAssistant) -> None:
    """Register WebSocket commands."""
    websocket_api.async_register_command(hass, ws_list_items)
    websocket_api.async_register_command(hass, ws_get_item)
    websocket_api.async_register_command(hass, ws_subscribe)
    websocket_api.async_register_command(hass, ws_get_history)
    websocket_api.async_register_command(hass, ws_export)
    websocket_api.async_register_command(hass, ws_import)
    websocket_api.async_register_command(hass, ws_get_item_consumption_rates)
    websocket_api.async_register_command(hass, ws_get_inventory_consumption_rates)
    websocket_api.async_register_command(hass, ws_get_inventory_statistics)
    websocket_api.async_register_command(hass, ws_lookup_by_barcode)
    websocket_api.async_register_command(hass, ws_lookup_barcode_product)
    websocket_api.async_register_command(hass, ws_get_barcode_provider_config)
    websocket_api.async_register_command(hass, ws_set_barcode_provider_config)
    websocket_api.async_register_command(hass, ws_scan_barcode)
```

Called from `__init__.py:163` — `async_register_websocket_commands(hass)` — inside
`async_setup_entry`, gated by `if not domain_data.get("services_registered"):` (so it only runs
once, on the first config entry, not once per inventory).

Two full example command implementations, verbatim:

```python
# websocket_api.py:216-229  (list_items)
@websocket_api.websocket_command(
    {
        vol.Required("type"): f"{DOMAIN}/list_items",
        vol.Required("inventory_id"): str,
    }
)
@websocket_api.async_response
async def ws_list_items(
    hass: HomeAssistant,
    connection: websocket_api.ActiveConnection,
    msg: dict[str, Any],
) -> None:
    """WS command: list items."""
    await _handle_list_items(hass, connection, msg)
```

```python
# websocket_api.py:397-410  (subscribe — the only sync/@callback command, no async_response)
@websocket_api.websocket_command(
    {
        vol.Required("type"): f"{DOMAIN}/subscribe",
        vol.Optional("inventory_id"): str,
    }
)
@callback
def ws_subscribe(
    hass: HomeAssistant,
    connection: websocket_api.ActiveConnection,
    msg: dict[str, Any],
) -> None:
    """WS command: subscribe."""
    _handle_subscribe(hass, connection, msg)
```

`_get_coordinator` helper (websocket_api.py:20-34) is the standard "resolve inventory or send
`inventory_not_found` error" pattern used by every per-inventory command:

```python
def _get_coordinator(
    hass: HomeAssistant,
    connection: websocket_api.ActiveConnection,
    msg: dict[str, Any],
    inventory_id: str,
) -> Any:
    coordinator = get_coordinators(hass).get(inventory_id)
    if coordinator is None:
        connection.send_error(
            msg["id"], "inventory_not_found", f"Inventory '{inventory_id}' not found"
        )
    return coordinator
```

**Recommendation for our add-on**: register our `get_structure`/`set_structure` commands via our
own `async_register_websocket_commands(hass)`-style function, called once from our own
`async_setup_entry` (in *our* integration, not by patching theirs). We do not need
`_get_coordinator` since structure storage is independent of their per-inventory coordinators —
but we should follow the same `vol.Schema` + `websocket_command`/`async_response` decorator
pattern and the same `send_result`/`send_error` error-code convention for consistency, since the
companion frontend cards will be written against both APIs.

---

## Backend: существующие WS-команды

All commands are prefixed `simple_inventory/`. Schemas quoted verbatim from `websocket_api.py`.

| Command | Schema (required unless marked Optional) | Handler | Response |
|---|---|---|---|
| `list_items` | `inventory_id: str` | `_handle_list_items` | `{"items": [...]}` |
| `get_item` | `inventory_id: str`, `name: str` | `_handle_get_item` | `{"item": {...}}` or error `item_not_found` |
| `subscribe` | `inventory_id: Optional[str]` | `_handle_subscribe` (sync, `@callback`) | see dedicated section below |
| `get_history` | `inventory_id: str`, Optional `item_name`, `event_type`, `start_date`, `end_date` (all `str`), `limit: int=100`, `offset: int=0` | `_handle_get_history` | `{"events": [...]}` |
| `export` | `inventory_id: str`, Optional `format: vol.In(["json","csv"])=json` | `_handle_export` | `{"data": ..., "format": ...}` |
| `import` | `inventory_id: str`, `data: vol.Any(str, dict, list)`, Optional `format="json"`, `merge_strategy: vol.In(["skip","overwrite","merge_quantities"])="skip"` | `_handle_import` | `{"added", "updated", "skipped", "errors"}` |
| `get_item_consumption_rates` | `inventory_id: str`, `item_name: str`, Optional `window_days: int>=1 or None` | `_handle_get_item_consumption_rates` | rates dict, or error `item_not_found` |
| `get_inventory_consumption_rates` | `inventory_id: str`, Optional `window_days: int>=1 or None` | `_handle_get_inventory_consumption_rates` | rates dict |
| `get_inventory_statistics` | `inventory_id: str` | `_handle_get_inventory_statistics` | stats dict (see `compute_inventory_stats` in repository.py) |
| `lookup_by_barcode` | `barcode: str` | `_handle_lookup_by_barcode` | `{"items": [...]}` (cross-inventory; error `no_inventories` if none configured) |
| `lookup_barcode_product` | `barcode: str` | `_handle_lookup_barcode_product` | `{"barcode": ..., "results": [{"provider": ..., "found": bool, "product": {...}}]}` — checks internal inventory match first (`provider: "inventory"`), then falls back to `async_lookup_barcode_all_providers` (external product DBs) |
| `get_barcode_provider_config` | (no fields) | `_handle_get_barcode_provider_config` | provider config dict (or `{}`) |
| `set_barcode_provider_config` | `provider: str` | `_handle_set_barcode_provider_config` | `{"provider": ...}` |
| `scan_barcode` | `barcode: str`, `action: vol.In(["increment","decrement","lookup"])`, Optional `amount: float=1.0`, `inventory_id: Optional[str]`, `price: Optional[float]` | `_handle_scan_barcode` | result dict from `quantity_service.async_scan_barcode` |

Note: there is **no** WS command that enumerates all inventories (e.g. no `list_inventories`).
The frontend discovers inventories purely via `hass.states` pattern matching on
`sensor.*` entities that have an `inventory_id` attribute (see Frontend section). The only
in-code list of inventories is `InventoryRepository.list_inventories()` (storage/repository.py),
used internally by `get_items_from_all_inventories` — it is not exposed over WS.

---

## Backend: хранилище (Store vs SQLite vs hass.data)

**This is SQLite, not `homeassistant.helpers.storage.Store`.** `storage/repository.py` docstring:
`"""SQLite-backed storage for Simple Inventory."""` (line 50), using `aiosqlite` (declared as a
hard dependency in `manifest.json`: `"requirements": ["aiosqlite==0.22.1"]`).

- DB file: `Path(hass.config.path(db_filename))` with `db_filename: str = "simple_inventory.db"`
  (repository.py:54-56) — i.e. `<config>/simple_inventory.db`, one file shared by *all* inventories.
- Schema version constant: `SCHEMA_VERSION = 3` (repository.py:45), tracked in a `metadata` table
  row `key='schema_version'`, with `_migrate_to_v2` / `_migrate_to_v3` migration functions run on
  first init or version bump (repository.py:327-402).
- `Store` is still imported and used, but **only** as a one-time legacy-migration source:
  `store = Store[dict[str, Any]](self._hass, STORAGE_VERSION, STORAGE_KEY)` in
  `_maybe_migrate_legacy_store_locked` (repository.py:98), where `STORAGE_KEY = f"{DOMAIN}.storage"`
  and `STORAGE_VERSION = 1` (const.py:4-5). This proves the integration *used to* be Store-backed
  (pre-0.6.0) and was migrated to SQLite; the legacy loader is kept only to pull forward
  pre-migration installs, guarded by a `metadata` flag `legacy_migrated`.
- Tables (repository.py `_ensure_schema`, lines 212-322): `metadata`, `inventories`, `items`,
  `locations`, `item_locations`, `categories`, `item_categories`, `item_barcodes`, `item_aliases`,
  plus `consumption_history` (added in `_migrate_to_v2`). Foreign keys with `ON DELETE CASCADE`
  throughout; PRAGMAs set on connect: `foreign_keys=ON`, `journal_mode=WAL`, `synchronous=NORMAL`,
  `busy_timeout=5000` (repository.py:67-70).
- **`hass.data[DOMAIN]` layout** — initialized once in `__init__.py:74-84`:
  ```python
  domain_data = hass.data.setdefault(
      DOMAIN,
      {
          "coordinators": {},          # dict[entry_id -> SimpleInventoryCoordinator]
          "services_registered": False,
          "repository": None,          # single shared InventoryRepository instance
          "repository_task": None,     # in-flight async_initialize() Task (init race guard)
          "todo_manager": None,
          "service_handler": None,
      },
  )
  ```
  Plus, per config entry, `domain_data[entry.entry_id] = {"config": entry.data}` (line 179) —
  i.e. entry-id keys coexist directly inside the same top-level dict as the fixed keys above (not
  namespaced under a nested key). `types.py:113-119` types this as `SimpleInventoryDomainData`
  (a `TypedDict`), though the per-entry `{"config": ...}` sub-dicts aren't captured in that type.
  Typed accessors live in `services/domain_data.py` (`get_domain_data`, `get_coordinators`,
  `get_repository`, `get_todo_manager`, `get_service_handler`).
- The repository is a **singleton shared across all config entries** (all inventories), created
  once (`if repository is None: repository = InventoryRepository(hass)`, `__init__.py:89-93`) and
  closed only when the *last* entry unloads (`__init__.py:250-252`) or on `async_remove_entry`.
  Each config entry gets its own `SimpleInventoryCoordinator` (a thin per-entry facade) but they
  all read/write the same SQLite file/connection.

**Recommendation for our structure storage**: Since the task requires our new location-hierarchy
module to use `homeassistant.helpers.storage.Store` (per our own spec), this is a deliberate
departure from upstream's current SQLite approach — not a mismatch to "fix," just something to be
aware of: our module will be the *only* Store-based storage running alongside their SQLite
storage, so pick our own distinct `STORAGE_KEY`/`STORAGE_VERSION` (e.g.
`"our_domain.structure"`, version 1) and do not reuse `simple_inventory.storage` (already taken,
and now vestigial/legacy-only in upstream). Hook our `Store` load/init into our own
`async_setup_entry`/`async_setup` the same way upstream does for its repository — lazily created
once and shared via our own `hass.data[OUR_DOMAIN]`, independent of their `hass.data[DOMAIN]`.
Since we are a separate integration/domain, we get our own `hass.data` namespace; we should read
their `hass.data["simple_inventory"]["coordinators"]` / `get_repository`-style accessors only if
we need to cross-reference inventories, but for pure structure storage we don't need to touch
their `hass.data` at all.

---

## Backend: сервисы

Registered in `__init__.py:106-163`, in a loop over a tuple of
`(service_name, handler, schema, supports_response)`, all under domain `simple_inventory`:

```python
# __init__.py:110-161 (excerpt of the registration table)
_OPT = SupportsResponse.OPTIONAL
_NONE = SupportsResponse.NONE
for svc_name, handler, schema, response_type in (
    (SERVICE_ADD_ITEM, service_handler.async_add_item, ADD_ITEM_SCHEMA, _NONE),
    (SERVICE_REMOVE_ITEM, service_handler.async_remove_item, REMOVE_ITEM_SCHEMA, _NONE),
    (SERVICE_UPDATE_ITEM, service_handler.async_update_item, UPDATE_ITEM_SCHEMA, _NONE),
    (SERVICE_INCREMENT_ITEM, service_handler.async_increment_item, QUANTITY_UPDATE_SCHEMA, _NONE),
    (SERVICE_DECREMENT_ITEM, service_handler.async_decrement_item, QUANTITY_UPDATE_SCHEMA, _NONE),
    (SERVICE_GET_ITEMS, service_handler.async_get_items, GET_ITEMS_SCHEMA, _OPT),
    (SERVICE_GET_ALL_ITEMS, service_handler.async_get_items_from_all_inventories, GET_ALL_ITEMS_SCHEMA, _OPT),
    (SERVICE_GET_INVENTORY_CONSUMPTION_RATES, ..., GET_INVENTORY_CONSUMPTION_RATES_SCHEMA, _OPT),
    (SERVICE_GET_ITEM_CONSUMPTION_RATES, ..., GET_ITEM_CONSUMPTION_RATES_SCHEMA, _OPT),
    (SERVICE_LOOKUP_BY_BARCODE, ..., LOOKUP_BY_BARCODE_SCHEMA, _OPT),
    (SERVICE_LOOKUP_BARCODE_PRODUCT, ..., LOOKUP_BARCODE_PRODUCT_SCHEMA, _OPT),
    (SERVICE_SCAN_BARCODE, service_handler.async_scan_barcode, SCAN_BARCODE_SCHEMA, _OPT),
):
    _register_service(hass, svc_name, handler, schema, supports_response=response_type)
```

`_register_service` (line 190) is a thin wrapper over
`hass.services.async_register(DOMAIN, name, handler, schema=schema, supports_response=...)`.
Schemas live in `schemas/service_schemas.py`; handlers are methods on `ServiceHandler`
(`services/__init__.py`), which itself dispatches to `InventoryService` (add/remove/update/get)
and `QuantityService` (increment/decrement/scan_barcode).

Field-by-field, exactly as coded (`schemas/service_schemas.py:33-167`; shared `ITEM_SCHEMA` dict
used by both add/update):

- **`add_item`** (`ADD_ITEM_SCHEMA` = `ITEM_SCHEMA` + inventory selector, validated by
  `_require_inventory_id_or_name`):
  - Exactly one of `inventory_id` (str) or `inventory_name` (str) — **required** (custom
    validator raises if both or neither given).
  - `name: cv.string` — **required**.
  - Optional: `auto_add_enabled: cv.boolean`, `auto_add_id_to_description_enabled: cv.boolean`,
    `auto_add_to_list_quantity: float>=0`, `aliases: cv.string`, `barcode: cv.string`,
    `category: cv.string`, `description: cv.string`, `desired_quantity: float>=0`,
    `expiry_alert_days: int in [0,365]`, `expiry_date: cv.string`, `location: cv.string`,
    `quantity: float>=0`, `todo_list: cv.string`,
    `todo_quantity_placement: vol.In(["name","description","none"])`, `unit: cv.string`,
    `price: float>=0`.
- **`update_item`** (`UPDATE_ITEM_SCHEMA`): same as add_item plus **required** `old_name: cv.string`
  (identifies the item to update; `name` becomes the new name). Same inventory_id/inventory_name
  XOR requirement.
- **`remove_item`** (`REMOVE_ITEM_SCHEMA`): inventory_id/inventory_name XOR (required); at least
  one of `name` or `barcode` (both Optional individually, enforced by `_require_name_or_barcode`).
- **`increment_item` / `decrement_item`** (both use `QUANTITY_UPDATE_SCHEMA`): inventory_id/name
  XOR; at least one of `name`/`barcode`; Optional `amount: float, min=0 exclusive, default=1`;
  Optional `price: float>=0`.
- **`get_items`** (`GET_ITEMS_SCHEMA`): Optional `inventory_id`, Optional `inventory_name` — XOR
  required by `_require_inventory_id_or_name`.
- **`get_items_from_all_inventories`** (`GET_ALL_ITEMS_SCHEMA`): `vol.Schema({})` — **no fields
  at all**.
- **`get_inventory_consumption_rates`**: **required** `inventory_id: cv.string`; Optional
  `window_days: int>=1`.
- **`get_item_consumption_rates`**: **required** `inventory_id`, **required** `name`; Optional
  `window_days: int>=1`.
- **`lookup_by_barcode`**: **required** `barcode: cv.string`. (Note: no `lookup_barcode_product`
  service schema is registered as a *service* even though it exists as `LOOKUP_BARCODE_PRODUCT_SCHEMA`
  in the schemas module and is registered via `SERVICE_LOOKUP_BARCODE_PRODUCT` in `__init__.py` —
  it is both a service and a WS command.)
- **`scan_barcode`** (`SCAN_BARCODE_SCHEMA`): **required** `barcode`, **required**
  `action: vol.In(["increment","decrement","lookup"])`; Optional `amount: float>0, default=1`;
  Optional `inventory_id`; Optional `price: float>=0`.

All service handlers live in `services/inventory_service.py` and `services/quantity_service.py`,
registered from `__init__.py`. `get_items`, `get_items_from_all_inventories`, and the consumption
rate / barcode services support `response_variable` (via `SupportsResponse.OPTIONAL`), i.e. they
return data directly to the calling automation, in addition to being independently exposed over
WebSocket.

---

## Backend: формат item dict

Two different "shapes" exist depending on the call path — **this matters a lot for our card
design**:

1. **`list_items_with_details` / WS `list_items` / WS `get_item`** (repository.py:661-797,
   `list_items_with_details`) — full-fidelity, includes both scalar *and* array fields:
   ```python
   items[item_id] = {
       "id": item_id,
       "inventory_id": inventory_id,
       "name": row[1], "description": row[2], "quantity": row[3], "unit": row[4],
       "expiry_date": row[5], "expiry_alert_days": row[6],
       "auto_add_enabled": bool(row[7]), "auto_add_id_to_description_enabled": bool(row[8]),
       "auto_add_to_list_quantity": row[9], "desired_quantity": row[10],
       "todo_list": row[11], "todo_quantity_placement": row[12], "price": row[13],
       "created_at": row[14], "updated_at": row[15],
       "category": "", "location": "",     # singular — filled with FIRST associated value below
       "locations": [], "categories": [],  # plural — ALL associated values
       "barcodes": [], "aliases": [],
   }
   ```
   Then (lines 725-795) it left-joins `item_locations`/`locations`, `item_categories`/`categories`,
   `item_barcodes`, `item_aliases` and appends to the plural arrays, additionally setting the
   singular `location`/`category` field to the *first* value seen:
   ```python
   items[item_id]["locations"].append(location_name)
   if not items[item_id][FIELD_LOCATION]:
       items[item_id][FIELD_LOCATION] = location_name
   ```
   Note: **no scalar `barcode`/`aliases` field** at this layer — only the plural `barcodes`/`aliases`
   arrays. (The README's example response shows a synthesized singular `"barcode"` field, but that
   is *not* what `list_items_with_details` produces — see discrepancies section.)

2. **`get_item_by_name` / `get_item_by_barcode` / `get_item_by_barcode_global`**
   (repository.py:799-838, 939-1026) — a *flatter* shape, **no** `location`/`category`/`locations`/
   `categories`/`barcodes`/`aliases` keys at all (join tables are not queried here); only the base
   `items` table columns (`id`, `inventory_id`, `name`, `description`, `quantity`, `unit`,
   `expiry_date`, `expiry_alert_days`, `auto_add_enabled`, `auto_add_id_to_description_enabled`,
   `auto_add_to_list_quantity`, `desired_quantity`, `todo_list`, `todo_quantity_placement`,
   `price`, `created_at`, `updated_at`), plus `inventory_name` on the `_global` variant.

Consequence: `simple_inventory/get_item` WS command returns shape (1) via
`coordinator.async_get_item` → `repository.get_item_by_name`, which is actually shape (2) (the
flat one, missing `location`/`category`/arrays) — **not** the enriched shape from `list_items`.
This is an internal inconsistency in upstream, not something we're introducing.

Our new `location` field convention (joined `"Room / Furniture / Shelf"` string) will be written
through the *existing* `location` field exactly as upstream already treats it: a free-text,
comma-splittable string (`_apply_location_updates` in `coordinator/_core.py:651-670` splits on
`,` to support multi-location items — our `/`-joined single path is just one opaque string value
to them, so no conflict, but be aware a location name containing a literal comma would be split
by their multi-location logic; a `/`-joined hierarchy path does not contain commas so it's safe).

---

## Backend: сенсоры и inventory_id

Confirmed entity naming and attribute, `sensors/inventory_sensor.py`:

```python
# sensors/inventory_sensor.py:32-40
self._attr_name = f"{inventory_name} Inventory"
self._attr_unique_id = f"inventory_{entry_id}"
...
self._attr_device_info = {"identifiers": {(DOMAIN, entry_id)}, "name": inventory_name}
```
and the state attributes set in `_async_update_state` (lines 75-82):
```python
self._attr_extra_state_attributes = {
    "inventory_id": self._entry_id,   # <-- confirmed: readable attribute
    "description": description,
    "total_items": stats["total_items"],
    "total_quantity": stats["total_quantity"],
    "below_threshold": stats["below_threshold"],
    "expiring_soon": len(stats["expiring_items"]),
}
```
Entity ID itself is HA's standard slugification of `_attr_name`, i.e.
`sensor.<slug(name)>_inventory` (matches README's documented `sensor.<name>_inventory` pattern).

**How the frontend enumerates all inventories**: not via any WS/service call — purely by scanning
`hass.states` for sensor entities whose id contains `"inventory"` and whose `attributes.inventory_id`
is defined (`src/utils/inventoryResolver.ts:58-71`, `findInventoryEntities`). There is no backend
command that lists inventories over WS (only `InventoryRepository.list_inventories()` internally,
used by the `get_items_from_all_inventories` service, not exposed over WS — see WS table above).
Our new panel/cards should follow the same convention (state-pattern enumeration) rather than
inventing a new mechanism, for consistency with the existing card.

---

## Backend: subscribe — точное поведение

`_handle_subscribe` (websocket_api.py:186-213):

```python
def _handle_subscribe(hass, connection, msg) -> None:
    inventory_id = msg.get("inventory_id")
    event_type = f"{DOMAIN}_updated_{inventory_id}" if inventory_id else f"{DOMAIN}_updated"

    async def _forward_event(event) -> None:
        coordinator = get_coordinators(hass).get(inventory_id or "")
        if inventory_id and coordinator:
            items = await coordinator.async_list_items(inventory_id)
            connection.send_event(msg["id"], {"items": items})
        else:
            connection.send_event(msg["id"], {"event": "updated"})

    unsub = hass.bus.async_listen(event_type, _forward_event)
    connection.subscriptions[msg["id"]] = unsub
    connection.send_result(msg["id"])
```

- **With `inventory_id`**: listens on HA event bus for `simple_inventory_updated_<entry_id>`;
  on each fire, re-fetches the *full* item list for that inventory via
  `coordinator.async_list_items` and pushes `{"items": [...]}` (i.e. shape (1) from the item-dict
  section above, full array-enriched items — a full refetch, not a diff).
  Events are fired by the coordinator (`coordinator/_core.py:730-737`, `_fire_update_events`) on
  every add/remove/update/increment/decrement, and by `config_flow.py:169-172` on rename.
- **Without `inventory_id`**: listens on the domain-wide `simple_inventory_updated` event (which
  is *also* fired alongside the per-entry event on every change — see `_fire_update_events`:
  `if inventory_id: fire(f"{DOMAIN}_updated_{inventory_id}"); fire(f"{DOMAIN}_updated")` — the
  global event always fires too) and pushes only `{"event": "updated"}` (a bare ping, caller must
  refetch manually).
- Registration for cleanup goes through HA's standard `connection.subscriptions[msg["id"]] = unsub`
  mechanism; `ws_subscribe` itself is synchronous (`@callback`, not `@websocket_api.async_response`)
  since it just registers a listener rather than doing I/O.

**Important finding**: the companion card does **not** actually call `subscribe`/
`hass.connection.subscribeMessage` at all (confirmed by `grep -rn "subscribeMessage" src/` →
no matches in `simple-inventory-card/src/`). Instead, the Lit component's `set hass()` setter
compares `hass.states[entity]` snapshots on every HA state-bus tick (`State.hasRealEntityChange`
in `src/services/state.ts`, comparing `last_changed`, `attributes.total_items`,
`attributes.total_quantity`) and re-fetches via the `list_items` WS command when the sensor's
state/attributes actually changed. This is relevant if we plan our own cards to use `subscribe`
directly for snappier updates — we would be doing something the existing card does not do, so
there's no existing convention to match, but the WS command itself is real and tested.

---

## Backend: тесты — стиль

- Dev/test dependencies (`requirements-dev.txt`): `pytest`, `pytest-cov`,
  `pytest-homeassistant-custom-component`, `hassil`, plus `black`/`isort`/`flake8`/`mypy`.
- `pyproject.toml` `[tool.pytest.ini_options]`: `testpaths = ["tests"]`,
  `addopts = ["-v", "--tb=short", "--cov=custom_components.simple_inventory", ...]`.
- Directory mirrors source: `tests/services/`, `tests/sensors/`, `tests/schemas/`,
  `tests/storage/`, `tests/providers/`, plus top-level `tests/test_websocket_api.py`,
  `tests/test_coordinator.py`, `tests/test_config_flow.py`, `tests/test_init_module.py`,
  `tests/test_sensor_platform.py`, `tests/test_todo_manager.py`, `tests/test_intents.py`,
  `tests/test_llm.py`, `tests/test_voice_sentences.py`, `tests/test_custom_sentences_recognition.py`.
- File naming: `test_<module>.py`, one file per source module, `__init__.py` in every subpackage.
- Fixtures in `tests/conftest.py`: heavy use of `unittest.mock.MagicMock`/`AsyncMock` for `hass`,
  coordinators, repository, todo_manager — e.g. `hass_mock` fixture builds a full fake
  `hass.data["simple_inventory"] = {"coordinators": {}, "repository": MagicMock()}`, fake
  `hass.services`, `hass.bus`, `hass.config_entries`, `hass.states`. Real `pytest-homeassistant-
  custom-component`'s `hass` fixture is also used directly in some fixtures (e.g.
  `inventory_service(hass: HomeAssistant, ...)`), i.e. tests mix a real (test-harness) `hass`
  instance with hand-rolled `MagicMock`s depending on what's under test.
- `websocket_api.py` tests (`tests/test_websocket_api.py`) import the private `_handle_*`
  coroutines directly (not the public `ws_*` wrappers) and drive them with a `mock_connection`
  fixture exposing `send_result`/`send_error`/`send_event`/`subscriptions` as `MagicMock`s, and a
  `mock_coordinator_ws` fixture with `AsyncMock`-based coordinator methods returning realistic
  sample payloads.
- **For our new tests**: match this exactly — `tests/` mirroring `custom_components/<our_domain>/`
  structure, `pytest-homeassistant-custom-component` as the harness, test the private `_handle_*`
  handlers directly with a `mock_connection` fixture shaped like theirs (`send_result`,
  `send_error`, `subscriptions` dict), and mock `Store.async_load`/`async_save` rather than hitting
  real disk.

---

## Frontend: сборка

- Tool: **Vite** (`vite build --config vite.config.ts`), library mode.
- `package.json` scripts (`scripts/`): `"build": "vite build --config vite.config.ts"`,
  `"dev": "vite"`, `"test": "vitest"`, `"test:run": "vitest run"`, `"test:coverage"`,
  `"test:mutation": "stryker run"`, `"type-check": "tsc --noEmit"`, `"lint": "eslint ..."`.
- `vite.config.ts` build config:
  ```ts
  build: {
    lib: {
      entry: resolve(__dirname, 'src/main.ts'),
      name: 'SimpleInventoryCard',
      fileName: 'simple-inventory-card',
      formats: ['es'],
    },
    rollupOptions: {
      output: { globals: { lit: 'Lit' }, entryFileNames: 'simple-inventory-card.js' },
    },
    minify: 'terser',
    sourcemap: false,
    copyPublicDir: false,
  },
  ```
  Output: **`dist/simple-inventory-card.js`**, single ES-module bundle (`formats: ['es']`),
  `lit` is bundled in (not externalized — the `external: ['lit']` line is commented out), minified
  with terser. `package.json` `"main": "dist/simple-inventory-card.js"`.
- Also uses `vite-plugin-static-copy` to copy `src/translations/*.json` → `dist/translations/*.json`
  at build time (not bundled into the JS — fetched at runtime, see Localization section).
- Path alias: `@` → `src/` (`resolve.alias` in vite.config.ts), used throughout via
  `import { X } from '@/types/...'`.
- Test runner: **Vitest** with `jsdom` environment, coverage via `@vitest/coverage-v8`, coverage
  thresholds set to 80% branches/functions/lines/statements (`vite.config.ts` `test.coverage.thresholds`).
- Mutation testing via Stryker (`stryker.config.mjs`, `pnpm test:mutation` / CI workflow on label).

**Recommendation**: mirror this Vite-library-mode setup for our four new cards — either one
combined bundle (simplest, matches upstream's single-file distribution model for HACS) or four
separate `lib.entry` configs if we want independent card files; given upstream ships one file for
one card, and HACS/Lovelace resource registration is simplest with fewer files, prefer a single
bundle unless card size becomes a problem.

---

## Frontend: регистрация карточки и customCards

`src/components/simpleInventoryCard.ts:230-251`:

```ts
if (!customElements.get('simple-inventory-card')) {
  customElements.define('simple-inventory-card', SimpleInventoryCard);
}

if (!customElements.get('simple-inventory-config-editor')) {
  // IMPORTANT: This name must match what's returned by getConfigElement()
  customElements.define('simple-inventory-config-editor', ConfigEditor);
}

window.customCards = window.customCards || [];
const cardConfig = {
  type: 'simple-inventory-card',
  name: 'Simple Inventory Card',
  description: cardDescription,   // mutated later once translations load, see loadCardDescription()
  preview: true,
  documentationURL: 'https://github.com/blaineventurine/simple-inventory-card',
};

const existingCard = window.customCards.find((card) => card.type === 'simple-inventory-card');
if (!existingCard) {
  window.customCards.push(cardConfig);
}
```

Note the idempotency guards (`customElements.get(...)` check, `window.customCards.find(...)`
check) — necessary because Lovelace resources can be re-evaluated/re-imported. Also note a
`setTimeout(..., 2000)` that dispatches a `custom_card_update` DOM event afterward
(`main.ts` bottom) — used to notify the HA frontend's card picker to re-scan `customCards` after
the async description translation resolves.

Fields used: `type`, `name`, `description`, `preview`, `documentationURL`. No `icon` or `iconUrl`
in this repo's card config.

---

## Frontend: паттерны setConfig/getCardSize/getConfigElement

`src/components/simpleInventoryCard.ts:32-37, 186-196`:

```ts
setConfig(config: InventoryConfig): void {
  if (!config.entity) {
    throw new Error('Entity is required');
  }
  this._config = config;
}

getCardSize(): number {
  return 4;
}

static getConfigElement(): HTMLElement {
  return document.createElement('simple-inventory-config-editor');
}

static getStubConfig(): InventoryConfig | object {
  return {};
}
```

`getCardSize` is a fixed constant (`4`), not computed from item count. `getStubConfig` returns an
empty object rather than a populated example — actual entity auto-selection happens later, inside
the config editor's `updated()` lifecycle hook (`configEditor.ts:79-100`), which finds the first
matching inventory sensor via `InventoryResolver.findInventoryEntities(hass)` and dispatches a
`config-changed` custom event once `hass` and an empty `_config.entity` are both present.

The config editor (`components/configEditor.ts`) is itself a `LitElement` registered as
`simple-inventory-config-editor`; note the comment about `declare` fields to avoid shadowing Lit's
reactive property accessors (lines 15-19) — a subtlety worth copying if our cards' config editors
also mix `static get properties()` with class fields.

---

## Frontend: вызовы сервисов и WS

All service/WS access is centralized in `src/services/services.ts` (class `Services`, constructed
with `hass`). Representative service call (`addItem`, lines 33-88, abbreviated):

```ts
await this.hass.callService(DOMAIN, SERVICES.ADD_ITEM, serviceData);
```
where `serviceData` is built as `{ [PARAMS.AUTO_ADD_ENABLED]: ..., [PARAMS.NAME]: ...,
[PARAMS.INVENTORY_ID]: sanitizedInventoryId, ... }` from `PARAMS`/`SERVICES` constants in
`src/utils/constants.ts` that intentionally mirror backend field/service names 1:1 (comment:
`// Services (must match backend const.py)`).

Representative WS call (`getItems`, services.ts:263-269):
```ts
async getItems(inventoryId: string): Promise<InventoryItem[]> {
  const result = await this.hass.callWS<{ items: InventoryItem[] }>({
    type: WS_COMMANDS.LIST_ITEMS,     // 'simple_inventory/list_items'
    inventory_id: inventoryId,
  });
  return result.items;
}
```

`WS_COMMANDS` in `constants.ts` only declares `EXPORT`, `GET_HISTORY`,
`GET_ITEM_CONSUMPTION_RATES`, `GET_ITEM`, `IMPORT`, `LIST_ITEMS`, `LOOKUP_BARCODE_PRODUCT`,
`LOOKUP_BY_BARCODE`, `SUBSCRIBE` — note `SUBSCRIBE` is declared but, as established above, never
actually used anywhere in `src/` (`grep` for `subscribeMessage`/`WS_COMMANDS.SUBSCRIBE` found zero
call sites outside the constant declaration itself). Also missing from `WS_COMMANDS`:
`get_inventory_statistics`, `get_inventory_consumption_rates`, `get_barcode_provider_config`,
`set_barcode_provider_config`, `scan_barcode` (the card calls `scan_barcode` as a **service**, not
WS — see `Services.scanBarcode`, services.ts:218-239, `hass.callService(DOMAIN,
SERVICES.SCAN_BARCODE, {...})`).

`SERVICES` constant also lists `UPDATE_ITEM_SETTINGS: 'update_item_settings'`
(`constants.ts:16`) — **this service does not exist anywhere in the backend** (`const.py` has no
`SERVICE_UPDATE_ITEM_SETTINGS`, `__init__.py`'s registration tuple doesn't register it). Dead/
leftover constant in the frontend — flagged in discrepancies section.

---

## Frontend: сканер баркодов

Library: **`@ericblade/quagga2`** (`package.json` dependency `"@ericblade/quagga2": "^1.12.1"`),
i.e. Quagga2, not a native `BarcodeDetector`-only or ZXing implementation — though the file *does*
also opportunistically use the native `BarcodeDetector` API when available, falling back to Quagga.

`src/services/barcodeScanner.ts`:
- **Live camera scan** (`startScanner`, lines 9-81): calls `Quagga.init({ inputStream: { type:
  'LiveStream', target: targetElement, constraints: { facingMode: 'environment' } }, decoder: {
  readers: ['ean_reader', 'ean_8_reader', 'upc_reader', 'upc_e_reader', 'code_128_reader'] },
  locate: true, frequency: 10 }, callback)`. On init success, registers `Quagga.onDetected(result
  => ...)`, filters low-confidence detections (average `decodedCodes[].error >= 0.2` rejected),
  then calls the caller-supplied `onDetected(code)` callback, and starts the live stream with
  `Quagga.start()`. A module-level `active` boolean flag guards against double-init; explicitly
  calls `Quagga.stop()` + `Quagga.offDetected()` before re-initializing (comment: prevents
  Firefox/iOS camera-release bugs). Permission errors are distinguished from generic
  unavailability by inspecting the error message text (`'Permission'`/`'NotAllowedError'` → returns
  `'permission_denied'` string; otherwise `'not_available'`).
- **File/photo-based scan** (`decodeFromFile`, lines 125-206): tries the native
  `window.BarcodeDetector` API first (`formats: ['ean_13','ean_8','upc_a','upc_e','code_128']`,
  via `createImageBitmap`), falling back to `Quagga.decodeSingle` on a resized data URL (max 1280px
  longest edge) if `BarcodeDetector` is unavailable or throws.
- Camera-availability check: `isLiveScanAvailable()` just checks
  `navigator.mediaDevices?.getUserMedia` exists — no permission probe.
- The scanner module itself has no UI; the panel open/close and result wiring live in
  `src/services/scanHandler.ts` (`showScanPanel`/`hideScanPanel`/`handleScanGo`) and
  `src/templates/scanPanel.ts`, orchestrated by `EventHandler` (`HEADER_SCAN_BTN` → `showScanPanel`,
  `SCAN_CLOSE`/`SCAN_CANCEL_BTN` → `hideScanPanel`, `SCAN_GO_BTN` → `handleScanGo`). The decoded
  code flows into `Services.scanBarcode(inventoryId, barcode, action, amount)` →
  `hass.callService(DOMAIN, 'scan_barcode', {...})`.

**Recommendation**: reuse `@ericblade/quagga2` for any barcode-driven UI in our shelf/location
cards for consistency and to avoid a second scanning dependency; the existing scanner module isn't
exported as a reusable package (it's an internal `src/services/*` file, not published), so we'd
copy/adapt the same approach rather than importing it directly.

---

## Frontend: темизация

Extensive use of standard Home Assistant CSS custom properties across `src/styles/*.ts`
(`grep -roh 'var(--[a-z-]*' src/styles/*.ts | sort -u`):

```
var(--blue-color             var(--primary-background-color
var(--card-background-color  var(--primary-color
var(--disabled-color         var(--primary-text-color
var(--divider-color          var(--purple-color
var(--error-color            var(--red-color
var(--green-color             var(--rgb-primary-color
var(--orange-color           var(--secondary-background-color
                              var(--secondary-text-color
                              var(--success-color
                              var(--text-primary-color
                              var(--warning-color
```
Styles are TypeScript modules exporting Lit `css` template literals (e.g.
`src/styles/buttons.ts`, `cardHeader.ts`, `cardLayout.ts`, `controls.ts`, `forms.ts`,
`itemRows.ts`, `modals.ts`, `responsive.ts`), composed together in `styles/styles.ts`. No
hardcoded hex colors for primary UI chrome — semantic colors (success/error/warning) use both HA
theme vars (`--success-color`, `--error-color`, `--warning-color`) and a few bespoke named-color
vars (`--blue-color`, `--green-color`, `--orange-color`, `--purple-color`, `--red-color`) that
aren't standard HA theme tokens — worth checking whether those bespoke vars are defined by the
card itself as fallbacks or assumed present from the user's theme (not confirmed from this pass;
recommend `var(--red-color, #f44336)`-style fallbacks in our own cards for safety since standard
HA themes don't universally define every one of these).

**Recommendation**: use the same HA CSS custom property set for our four new cards
(`--primary-color`, `--primary-text-color`, `--secondary-text-color`, `--card-background-color`,
`--divider-color`, `--error-color`, `--warning-color`, `--success-color`) to visually match the
existing card family.

---

## Frontend: локализация

Real translation files, **not** hardcoded English-only strings. `src/translations/{en,es,fr,it,sl}.json`.
Loaded at runtime (not bundled) via `TranslationManager.loadTranslations` (`src/services/
translationManager.ts:31-58`):

```ts
private static async _loadTranslationsInternal(language: string): Promise<TranslationData> {
  const urls = [
    `/local/community/${this._cardName}/translations/${language}.json`,
    `/hacsfiles/${this._cardName}/translations/${language}.json`,
    `/local/community/${this._cardName}/${language}.json`,
    `/hacsfiles/${this._cardName}/${language}.json`,
  ];
  for (const url of urls) {
    try {
      const response = await fetch(url);
      if (response.ok) return await response.json();
    } catch { /* try next */ }
  }
  if (language !== 'en') return this.loadTranslations('en');
  return {};
}
```
Tries four HACS/manual-install path conventions in order, falls back to English, then to `{}`.
Results are cached per `(cardName, language)` in a static `Map`, with in-flight de-duplication via
a `_loadingPromises` map. `localize(translations, key, params, fallback)` does dotted-path lookup
(`key.split('.')`) plus `{param}`-style interpolation via regex replace. A separate build step
(`vite-plugin-static-copy`) copies `src/translations/*.json` → `dist/translations/*.json` so the
fetched URLs resolve against the installed HACS/manual path. There's also a
`scripts/checkTranslations.js` CI script (`npm run check-translations`) presumably validating key
parity across locale files.

**Recommendation**: replicate this exact runtime-fetch + cache + fallback-chain approach (and the
`checkTranslations.js`-style parity check) for our four new cards so all cards behave consistently
and can share the same install-path conventions; card name in the fetch URLs must match each
card's own `dist` folder name under `hacsfiles`/`local/community`.

---

## Расхождения с README апстрима

The upstream README (`simple_inventory/README.md`) is, on the whole, unusually accurate and
detailed — most sections match the code exactly. Confirmed discrepancies / omissions found:

1. **Storage mechanism is entirely undocumented in the README.** The README never mentions SQLite,
   `aiosqlite`, or a database file at all — it's silent on the storage layer. Not technically a
   "false claim," but worth flagging since anyone assuming Store-based JSON storage (a reasonable
   assumption for a small HA custom component, and the assumption baked into our own project's
   background brief) would be wrong: it's SQLite (`<config>/simple_inventory.db`), with `Store`
   surviving only as a one-shot legacy-migration path (see storage section above).

2. **`get_items` example response in the README (lines 372-398) shows a synthesized singular
   `"barcode": "012345678901"` field** on the item object. The actual code path
   (`InventoryRepository.list_items_with_details`, which backs both the `get_items` service and
   the `list_items`/`get_item` WS commands) **never sets a singular `barcode` key** — only the
   plural `"barcodes": [...]` array. Same is true for `"aliases"` — the README example shows it,
   and the code does produce that one correctly (plural only, no singular alias field, which
   matches — aliases were never claimed to have a singular form). So specifically: the README's
   `"barcode": "012345678901"` line in the example JSON is not something the code emits.

3. **The two-tier item-shape inconsistency (see "формат item dict" above) is undocumented.**
   `get_item` (WS) returns the flat `get_item_by_name` shape (no `location`/`category`/
   `locations`/`categories`/`barcodes`/`aliases` keys at all), while `list_items` returns the
   enriched shape with all of those keys. The README documents `get_item`'s *request* format but
   never shows its *response* shape, so a card author would reasonably but wrongly assume it
   matches `list_items`'s enriched shape.

4. **No WS command lists inventories, and the README doesn't mention this gap.** The README's
   "Developer Tools → States" instructions for finding an `inventory_id` are the *documented*
   workaround, implicitly acknowledging there's no API for it, but it's never stated outright that
   no such WS/service command exists (confirmed absent from both `websocket_api.py` and the
   service registration table).

5. **`simple_inventory/lookup_barcode_product` is a WS-only-looking command in the README's
   WebSocket API section, but it is also registered as a full HA service** (`SERVICE_LOOKUP_
   BARCODE_PRODUCT`, `__init__.py` registration table) — the README's Service Calls section never
   documents `simple_inventory.lookup_barcode_product` as a service, only as a WS command, even
   though the code registers and supports it as both (with `response_variable` support, same as
   the other query services).

6. **`get_barcode_provider_config` / `set_barcode_provider_config` WS commands are entirely
   undocumented** in the README's WebSocket API section (not listed at all), despite being fully
   implemented and registered.

7. **The frontend's `SUBSCRIBE` WS command is dead code from the card's perspective.** Not a
   README issue (the backend README correctly documents `subscribe`'s behavior), but a
   card/backend-alignment discrepancy: the companion card ships a `WS_COMMANDS.SUBSCRIBE` constant
   and the backend fully implements and tests `simple_inventory/subscribe`, yet the shipped card
   never calls it — it polls via state-change diffing instead. Anyone assuming "the companion card
   demonstrates the intended way to consume `subscribe`" would be misled; there is no reference
   implementation of a `subscribe` consumer in this codebase.

8. **Frontend `SERVICES.UPDATE_ITEM_SETTINGS: 'update_item_settings'` constant references a
   service that does not exist in the backend at all** (not in `const.py`, not registered in
   `__init__.py`). Confirmed dead/vestigial code in `simple-inventory-card/src/utils/constants.ts`,
   unrelated to any README claim but worth flagging so we don't copy this stale constant into our
   own cards' shared-constants file if we mirror their `constants.ts` structure.

9. **README says "each inventory becomes a device with three sensors"** (Configuration section) —
   confirmed accurate by code (`inventory_sensor.py`, `expiry_sensor.py`, `expired_items_sensor.py`,
   all sharing `device_info` keyed by `entry_id`), no discrepancy found here — noted for
   completeness since it's directly relevant to how our own new cards should locate a device's
   sensors.

No discrepancies were found in the documented service field lists, the `scan_barcode`/
`lookup_by_barcode` response shapes, the sensor attribute lists, or the events table — those all
matched the code exactly on inspection.
