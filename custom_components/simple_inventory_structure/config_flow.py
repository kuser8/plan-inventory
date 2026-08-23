"""Config flow for Simple Inventory: Структура мест.

Single-instance, zero-input flow — there is nothing to configure (no host,
no credentials); adding the integration just creates the one config entry
that structure.py's storage/WS commands are registered against.
"""

from __future__ import annotations

from typing import Any

from homeassistant import config_entries
from homeassistant.data_entry_flow import FlowResult

from .const import DOMAIN


class SimpleInventoryStructureConfigFlow(config_entries.ConfigFlow, domain=DOMAIN):
    """Handle a config flow for Simple Inventory: Структура мест."""

    VERSION = 1

    async def async_step_user(self, user_input: dict[str, Any] | None = None) -> FlowResult:
        """Handle the single setup step."""
        await self.async_set_unique_id(DOMAIN)
        self._abort_if_unique_id_configured()

        if user_input is not None:
            return self.async_create_entry(title="Структура мест", data={})

        return self.async_show_form(step_id="user")
