"""Location hierarchy (Room -> Furniture -> Shelf) storage and WebSocket API.

This module is an *addition* alongside the upstream Simple Inventory
integration (github.com/blaineventurine/simple_inventory) — it does not
modify any existing item/inventory logic. It stores a flat, parent-
referencing list of "structure nodes" (rooms, furniture, shelves) via
``homeassistant.helpers.storage.Store``, independent of upstream's SQLite
item storage (see ANALYSIS.md), and exposes it over a small set of
``simple_inventory/*`` WebSocket commands that follow the same
registration pattern used by upstream's own ``websocket_api.py``
(``@websocket_api.websocket_command`` + ``@websocket_api.async_response``/
``@callback``, one ``async_register_*`` entry point called from
``__init__.py``).

Install: drop this file into
``custom_components/simple_inventory/structure.py`` alongside the existing
integration files, then apply the two-line patch described in
``INSTALL.md`` to ``__init__.py`` so ``async_register_structure_websocket_
commands(hass)`` is called once, next to upstream's own
``async_register_websocket_commands(hass)`` call.
"""

from __future__ import annotations

import asyncio
import logging
from typing import Any, Final

import voluptuous as vol
from homeassistant.components import websocket_api
from homeassistant.core import HomeAssistant, callback
from homeassistant.helpers import storage

from .const import DOMAIN

_LOGGER = logging.getLogger(__name__)

# Distinct from upstream's own (now legacy/vestigial) STORAGE_KEY =
# "simple_inventory.storage" (const.py) — that key is still referenced by
# their one-shot SQLite migration loader, so we must not reuse it.
STRUCTURE_STORAGE_KEY: Final = "simple_inventory_structure"
STRUCTURE_STORAGE_VERSION: Final = 1
STRUCTURE_UPDATED_EVENT: Final = f"{DOMAIN}_structure_updated"

LEVEL_ROOM: Final = 0
LEVEL_FURNITURE: Final = 1
LEVEL_SHELF: Final = 2
VALID_LEVELS: Final = (LEVEL_ROOM, LEVEL_FURNITURE, LEVEL_SHELF)

_EMPTY_STRUCTURE: Final[dict[str, Any]] = {"version": 1, "nodes": []}

# hass.data[DOMAIN] keys owned by this module (kept distinct from upstream's
# "coordinators" / "repository" / "services_registered" / etc. keys so we
# never collide with their layout).
_DATA_STORE: Final = "structure_store"
_DATA_LOCK: Final = "structure_lock"


class StructureValidationError(Exception):
    """Raised when a structure payload fails validation."""


def _validate_node_name(name: Any) -> str:
    """Validate a single node's name, returning it unchanged if valid."""
    if not isinstance(name, str):
        raise StructureValidationError("Node name must be a string")
    if name != name.strip():
        raise StructureValidationError(
            f"Node name {name!r} must not have leading/trailing whitespace"
        )
    if not name:
        raise StructureValidationError("Node name must not be empty")
    if "/" in name:
        raise StructureValidationError(
            f"Node name {name!r} must not contain '/' (used as the path separator)"
        )
    return name


def validate_structure(data: Any) -> dict[str, Any]:
    """Validate a structure payload, returning a normalized copy.

    Enforces: dict shape, unique non-empty string node ids, level in
    {0, 1, 2}, name rules (non-empty, no surrounding whitespace, no '/'),
    room nodes (level 0) have no parent, non-room nodes have a parent id
    that resolves to an existing node exactly one level up, and sibling
    names (same parent + level) are unique.

    Raises StructureValidationError on any problem.
    """
    if not isinstance(data, dict):
        raise StructureValidationError("Structure must be an object")

    nodes = data.get("nodes")
    if not isinstance(nodes, list):
        raise StructureValidationError("Structure.nodes must be a list")

    by_id: dict[str, dict[str, Any]] = {}
    normalized: list[dict[str, Any]] = []
    siblings: dict[tuple[str | None, int], set[str]] = {}

    for raw in nodes:
        if not isinstance(raw, dict):
            raise StructureValidationError("Each node must be an object")

        node_id = raw.get("id")
        if not isinstance(node_id, str) or not node_id:
            raise StructureValidationError("Each node needs a non-empty string 'id'")
        if node_id in by_id:
            raise StructureValidationError(f"Duplicate node id: {node_id!r}")

        level = raw.get("level")
        if level not in VALID_LEVELS:
            raise StructureValidationError(
                f"Node {node_id!r} has invalid level {level!r} (must be 0, 1, or 2)"
            )

        name = _validate_node_name(raw.get("name"))

        parent = raw.get("parent")
        if level == LEVEL_ROOM:
            if parent is not None:
                raise StructureValidationError(f"Room node {node_id!r} must not have a parent")
        else:
            if not isinstance(parent, str) or not parent:
                raise StructureValidationError(
                    f"Node {node_id!r} at level {level} requires a parent id"
                )

        node = {"id": node_id, "level": level, "name": name, "parent": parent}
        by_id[node_id] = node
        normalized.append(node)

        sib_key = (parent, level)
        sib_names = siblings.setdefault(sib_key, set())
        if name in sib_names:
            raise StructureValidationError(
                f"Duplicate name {name!r} among siblings under parent {parent!r}"
            )
        sib_names.add(name)

    # Second pass: parent references must point to an existing node exactly
    # one level up (deferred until every node is known, so order in the
    # incoming list doesn't matter).
    for node in normalized:
        parent = node["parent"]
        if parent is None:
            continue
        parent_node = by_id.get(parent)
        if parent_node is None:
            raise StructureValidationError(
                f"Node {node['id']!r} references unknown parent {parent!r}"
            )
        if parent_node["level"] != node["level"] - 1:
            raise StructureValidationError(
                f"Node {node['id']!r} (level {node['level']}) has parent {parent!r} "
                f"at level {parent_node['level']}, expected {node['level'] - 1}"
            )

    return {"version": 1, "nodes": normalized}


def _get_store(hass: HomeAssistant) -> storage.Store:
    domain_data = hass.data.setdefault(DOMAIN, {})
    store: storage.Store | None = domain_data.get(_DATA_STORE)
    if store is None:
        store = storage.Store(hass, STRUCTURE_STORAGE_VERSION, STRUCTURE_STORAGE_KEY)
        domain_data[_DATA_STORE] = store
    return store


def _get_lock(hass: HomeAssistant) -> asyncio.Lock:
    domain_data = hass.data.setdefault(DOMAIN, {})
    lock: asyncio.Lock | None = domain_data.get(_DATA_LOCK)
    if lock is None:
        lock = asyncio.Lock()
        domain_data[_DATA_LOCK] = lock
    return lock


async def async_get_structure(hass: HomeAssistant) -> dict[str, Any]:
    """Load the persisted structure, defaulting to an empty one."""
    store = _get_store(hass)
    data = await store.async_load()
    if data is None:
        return dict(_EMPTY_STRUCTURE)
    return data


async def async_set_structure(hass: HomeAssistant, structure: Any) -> dict[str, Any]:
    """Validate and persist a new structure, firing the update event.

    Raises StructureValidationError if the payload is invalid; nothing is
    written to storage in that case.
    """
    normalized = validate_structure(structure)
    lock = _get_lock(hass)
    async with lock:
        store = _get_store(hass)
        await store.async_save(normalized)
    hass.bus.async_fire(STRUCTURE_UPDATED_EVENT)
    return normalized


def async_register_structure_websocket_commands(hass: HomeAssistant) -> None:
    """Register the structure WebSocket commands."""
    websocket_api.async_register_command(hass, ws_get_structure)
    websocket_api.async_register_command(hass, ws_set_structure)
    websocket_api.async_register_command(hass, ws_subscribe_structure)


async def _handle_get_structure(
    hass: HomeAssistant,
    connection: websocket_api.ActiveConnection,
    msg: dict[str, Any],
) -> None:
    """Return the persisted structure."""
    try:
        structure = await async_get_structure(hass)
    except Exception as exc:  # noqa: BLE001 - mirrors upstream's broad catch+report style
        connection.send_error(msg["id"], "get_structure_failed", str(exc))
        return

    connection.send_result(msg["id"], {"structure": structure})


async def _handle_set_structure(
    hass: HomeAssistant,
    connection: websocket_api.ActiveConnection,
    msg: dict[str, Any],
) -> None:
    """Validate and persist a new structure."""
    try:
        structure = await async_set_structure(hass, msg["structure"])
    except StructureValidationError as exc:
        connection.send_error(msg["id"], "invalid_structure", str(exc))
        return
    except Exception as exc:  # noqa: BLE001
        connection.send_error(msg["id"], "set_structure_failed", str(exc))
        return

    connection.send_result(msg["id"], {"success": True, "structure": structure})


def _handle_subscribe_structure(
    hass: HomeAssistant,
    connection: websocket_api.ActiveConnection,
    msg: dict[str, Any],
) -> None:
    """Subscribe to structure update events (mirrors upstream's ws_subscribe)."""

    async def _forward_event(event: Any) -> None:
        try:
            structure = await async_get_structure(hass)
            connection.send_event(msg["id"], {"structure": structure})
        except Exception as exc:  # noqa: BLE001
            _LOGGER.error("Error forwarding structure update event: %s", exc)

    unsub = hass.bus.async_listen(STRUCTURE_UPDATED_EVENT, _forward_event)
    connection.subscriptions[msg["id"]] = unsub
    connection.send_result(msg["id"])


@websocket_api.websocket_command({vol.Required("type"): f"{DOMAIN}/get_structure"})
@websocket_api.async_response
async def ws_get_structure(
    hass: HomeAssistant,
    connection: websocket_api.ActiveConnection,
    msg: dict[str, Any],
) -> None:
    """WS command: get_structure."""
    await _handle_get_structure(hass, connection, msg)


@websocket_api.websocket_command(
    {
        vol.Required("type"): f"{DOMAIN}/set_structure",
        vol.Required("structure"): dict,
    }
)
@websocket_api.async_response
async def ws_set_structure(
    hass: HomeAssistant,
    connection: websocket_api.ActiveConnection,
    msg: dict[str, Any],
) -> None:
    """WS command: set_structure."""
    await _handle_set_structure(hass, connection, msg)


@websocket_api.websocket_command({vol.Required("type"): f"{DOMAIN}/subscribe_structure"})
@callback
def ws_subscribe_structure(
    hass: HomeAssistant,
    connection: websocket_api.ActiveConnection,
    msg: dict[str, Any],
) -> None:
    """WS command: subscribe_structure."""
    _handle_subscribe_structure(hass, connection, msg)
