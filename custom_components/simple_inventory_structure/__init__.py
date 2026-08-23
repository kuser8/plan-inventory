"""Simple Inventory: Структура мест — standalone companion integration.

Stores a three-level location hierarchy (Room -> Furniture -> Shelf) for
use by the inventory-structure-suite Lovelace cards, independent of the
upstream Simple Inventory integration (see structure.py's module docstring
and README.md for the full rationale). This integration owns no entities
or platforms — it exists purely to register its WebSocket API for as long
as its single config entry is loaded.
"""

from __future__ import annotations

from homeassistant.config_entries import ConfigEntry
from homeassistant.core import HomeAssistant

from .structure import async_register_structure_websocket_commands

PLATFORMS: list[str] = []


async def async_setup_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    """Set up Simple Inventory: Структура мест from a config entry."""
    async_register_structure_websocket_commands(hass)
    return True


async def async_unload_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    """Unload a config entry.

    WebSocket commands stay registered for the lifetime of the HA process
    (matching upstream Simple Inventory's own behavior for its commands);
    there's nothing per-entry to tear down since this integration has no
    entities/platforms and only one instance is ever allowed.
    """
    return True
