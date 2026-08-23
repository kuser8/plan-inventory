"""Tests for the Simple Inventory: Структура мест config flow.

Standard pytest-homeassistant-custom-component pattern (real `hass` test
fixture, `MockConfigEntry` for the "already configured" case), matching
upstream Simple Inventory's own `tests/test_config_flow.py` style.
"""

from __future__ import annotations

from homeassistant import config_entries
from homeassistant.core import HomeAssistant
from homeassistant.data_entry_flow import FlowResultType
from pytest_homeassistant_custom_component.common import MockConfigEntry

from custom_components.simple_inventory_structure.const import DOMAIN


async def test_user_flow_creates_single_entry(hass: HomeAssistant) -> None:
    """The flow has one no-input step that immediately creates an entry."""
    result = await hass.config_entries.flow.async_init(
        DOMAIN, context={"source": config_entries.SOURCE_USER}
    )
    assert result["type"] == FlowResultType.FORM
    assert result["step_id"] == "user"

    result2 = await hass.config_entries.flow.async_configure(result["flow_id"], {})
    assert result2["type"] == FlowResultType.CREATE_ENTRY
    assert result2["title"] == "Структура мест"
    assert result2["data"] == {}


async def test_user_flow_aborts_if_already_configured(hass: HomeAssistant) -> None:
    """Only one instance of this integration is ever allowed."""
    MockConfigEntry(domain=DOMAIN, unique_id=DOMAIN).add_to_hass(hass)

    result = await hass.config_entries.flow.async_init(
        DOMAIN, context={"source": config_entries.SOURCE_USER}
    )
    assert result["type"] == FlowResultType.ABORT
    assert result["reason"] == "already_configured"
