"""Tests for the structure (Room -> Furniture -> Shelf) storage and WS API.

Mirrors the style of upstream's own tests/test_websocket_api.py: a
MagicMock-based `hass`/`connection`, and driving the private `_handle_*`
coroutines directly rather than the public `ws_*` wrappers. Storage is
exercised against the real `validate_structure`/`async_get_structure`/
`async_set_structure` functions with `homeassistant.helpers.storage.Store`
patched out (round-tripped in-memory) so no real disk I/O happens.
"""

from __future__ import annotations

from typing import Any
from unittest.mock import AsyncMock, MagicMock, patch

import pytest

from custom_components.simple_inventory import structure
from custom_components.simple_inventory.structure import (
    StructureValidationError,
    validate_structure,
)


VALID_STRUCTURE: dict[str, Any] = {
    "version": 1,
    "nodes": [
        {"id": "r1", "level": 0, "name": "Кухня", "parent": None},
        {"id": "f1", "level": 1, "name": "Шкаф навесной", "parent": "r1"},
        {"id": "s1", "level": 2, "name": "Верхняя полка", "parent": "f1"},
        {"id": "s2", "level": 2, "name": "Нижняя полка", "parent": "f1"},
    ],
}

PARTIAL_STRUCTURE: dict[str, Any] = {
    "nodes": [
        {"id": "r1", "level": 0, "name": "Кухня", "parent": None},
        {"id": "f1", "level": 1, "name": "Холодильник", "parent": "r1"},
    ]
}


# ---------------------------------------------------------------------------
# validate_structure
# ---------------------------------------------------------------------------


def test_validate_structure_accepts_valid_tree() -> None:
    result = validate_structure(VALID_STRUCTURE)
    assert result == {"version": 1, "nodes": VALID_STRUCTURE["nodes"]}


def test_validate_structure_accepts_partial_paths() -> None:
    """Room-only, or room+furniture without a shelf, must both be valid."""
    validate_structure({"nodes": [{"id": "r1", "level": 0, "name": "Кухня", "parent": None}]})
    validate_structure(PARTIAL_STRUCTURE)


@pytest.mark.parametrize(
    "bad_structure",
    [
        {"nodes": "not-a-list"},
        "not-a-dict",
        {"nodes": ["not-a-dict"]},
    ],
)
def test_validate_structure_rejects_malformed_payload(bad_structure: Any) -> None:
    with pytest.raises(StructureValidationError):
        validate_structure(bad_structure)


def test_validate_structure_rejects_slash_in_name() -> None:
    with pytest.raises(StructureValidationError, match="/"):
        validate_structure(
            {"nodes": [{"id": "r1", "level": 0, "name": "Кухня/Гостиная", "parent": None}]}
        )


@pytest.mark.parametrize("name", [" Кухня", "Кухня ", " Кухня ", ""])
def test_validate_structure_rejects_bad_whitespace_or_empty_name(name: str) -> None:
    with pytest.raises(StructureValidationError):
        validate_structure({"nodes": [{"id": "r1", "level": 0, "name": name, "parent": None}]})


def test_validate_structure_rejects_duplicate_id() -> None:
    with pytest.raises(StructureValidationError, match="Duplicate node id"):
        validate_structure(
            {
                "nodes": [
                    {"id": "r1", "level": 0, "name": "Кухня", "parent": None},
                    {"id": "r1", "level": 0, "name": "Другая", "parent": None},
                ]
            }
        )


def test_validate_structure_rejects_duplicate_sibling_name() -> None:
    with pytest.raises(StructureValidationError, match="Duplicate name"):
        validate_structure(
            {
                "nodes": [
                    {"id": "r1", "level": 0, "name": "Кухня", "parent": None},
                    {"id": "r2", "level": 0, "name": "Кухня", "parent": None},
                ]
            }
        )


def test_validate_structure_allows_same_name_under_different_parents() -> None:
    """'Верхняя полка' under two different furniture nodes is fine."""
    validate_structure(
        {
            "nodes": [
                {"id": "r1", "level": 0, "name": "Кухня", "parent": None},
                {"id": "f1", "level": 1, "name": "Шкаф 1", "parent": "r1"},
                {"id": "f2", "level": 1, "name": "Шкаф 2", "parent": "r1"},
                {"id": "s1", "level": 2, "name": "Верхняя полка", "parent": "f1"},
                {"id": "s2", "level": 2, "name": "Верхняя полка", "parent": "f2"},
            ]
        }
    )


def test_validate_structure_rejects_non_room_without_parent() -> None:
    with pytest.raises(StructureValidationError, match="requires a parent"):
        validate_structure({"nodes": [{"id": "f1", "level": 1, "name": "Шкаф", "parent": None}]})


def test_validate_structure_rejects_room_with_parent() -> None:
    with pytest.raises(StructureValidationError, match="must not have a parent"):
        validate_structure({"nodes": [{"id": "r1", "level": 0, "name": "Кухня", "parent": "x"}]})


def test_validate_structure_rejects_unknown_parent() -> None:
    with pytest.raises(StructureValidationError, match="unknown parent"):
        validate_structure(
            {"nodes": [{"id": "f1", "level": 1, "name": "Шкаф", "parent": "missing"}]}
        )


def test_validate_structure_rejects_parent_at_wrong_level() -> None:
    """A shelf's parent must be furniture (level 1), not a room (level 0)."""
    with pytest.raises(StructureValidationError, match="expected 1"):
        validate_structure(
            {
                "nodes": [
                    {"id": "r1", "level": 0, "name": "Кухня", "parent": None},
                    {"id": "s1", "level": 2, "name": "Полка", "parent": "r1"},
                ]
            }
        )


def test_validate_structure_rejects_invalid_level() -> None:
    with pytest.raises(StructureValidationError, match="level"):
        validate_structure({"nodes": [{"id": "r1", "level": 3, "name": "Кухня", "parent": None}]})


# ---------------------------------------------------------------------------
# Store round-trip (async_get_structure / async_set_structure)
# ---------------------------------------------------------------------------


@pytest.fixture
def hass_mock() -> MagicMock:
    hass = MagicMock()
    hass.data = {}
    hass.bus = MagicMock()
    hass.bus.async_fire = MagicMock()
    hass.bus.async_listen = MagicMock(return_value=lambda: None)
    return hass


@pytest.fixture
def fake_store() -> MagicMock:
    """A fake Store that round-trips in memory instead of touching disk."""
    store = MagicMock()
    store._data = None

    async def _load() -> Any:
        return store._data

    async def _save(data: Any) -> None:
        store._data = data

    store.async_load = AsyncMock(side_effect=_load)
    store.async_save = AsyncMock(side_effect=_save)
    return store


@pytest.mark.asyncio
async def test_get_structure_defaults_to_empty(hass_mock: MagicMock, fake_store: MagicMock) -> None:
    with patch.object(structure, "_get_store", return_value=fake_store):
        result = await structure.async_get_structure(hass_mock)
    assert result == {"version": 1, "nodes": []}


@pytest.mark.asyncio
async def test_set_then_get_structure_round_trips(
    hass_mock: MagicMock, fake_store: MagicMock
) -> None:
    with patch.object(structure, "_get_store", return_value=fake_store):
        saved = await structure.async_set_structure(hass_mock, VALID_STRUCTURE)
        assert saved["nodes"] == VALID_STRUCTURE["nodes"]

        loaded = await structure.async_get_structure(hass_mock)
        assert loaded["nodes"] == VALID_STRUCTURE["nodes"]

    hass_mock.bus.async_fire.assert_called_once_with(structure.STRUCTURE_UPDATED_EVENT)


@pytest.mark.asyncio
async def test_set_structure_rejects_invalid_and_does_not_persist(
    hass_mock: MagicMock, fake_store: MagicMock
) -> None:
    with patch.object(structure, "_get_store", return_value=fake_store):
        with pytest.raises(StructureValidationError):
            await structure.async_set_structure(
                hass_mock, {"nodes": [{"id": "x", "level": 0, "name": "a/b", "parent": None}]}
            )

    fake_store.async_save.assert_not_called()
    hass_mock.bus.async_fire.assert_not_called()


# ---------------------------------------------------------------------------
# WebSocket handlers
# ---------------------------------------------------------------------------


@pytest.fixture
def mock_connection() -> MagicMock:
    conn = MagicMock()
    conn.send_result = MagicMock()
    conn.send_error = MagicMock()
    conn.send_event = MagicMock()
    conn.subscriptions = {}
    return conn


@pytest.mark.asyncio
async def test_handle_get_structure_sends_result(
    hass_mock: MagicMock, mock_connection: MagicMock
) -> None:
    with patch.object(structure, "async_get_structure", AsyncMock(return_value=VALID_STRUCTURE)):
        await structure._handle_get_structure(hass_mock, mock_connection, {"id": 1})

    mock_connection.send_result.assert_called_once_with(1, {"structure": VALID_STRUCTURE})
    mock_connection.send_error.assert_not_called()


@pytest.mark.asyncio
async def test_handle_set_structure_success(
    hass_mock: MagicMock, mock_connection: MagicMock
) -> None:
    with patch.object(structure, "async_set_structure", AsyncMock(return_value=VALID_STRUCTURE)):
        await structure._handle_set_structure(
            hass_mock, mock_connection, {"id": 2, "structure": VALID_STRUCTURE}
        )

    mock_connection.send_result.assert_called_once_with(
        2, {"success": True, "structure": VALID_STRUCTURE}
    )


@pytest.mark.asyncio
async def test_handle_set_structure_reports_validation_error(
    hass_mock: MagicMock, mock_connection: MagicMock
) -> None:
    bad_payload = {"nodes": [{"id": "x", "level": 0, "name": "a/b", "parent": None}]}
    with patch.object(
        structure,
        "async_set_structure",
        AsyncMock(side_effect=StructureValidationError("bad name")),
    ):
        await structure._handle_set_structure(
            hass_mock, mock_connection, {"id": 3, "structure": bad_payload}
        )

    mock_connection.send_error.assert_called_once_with(3, "invalid_structure", "bad name")
    mock_connection.send_result.assert_not_called()


def test_handle_subscribe_structure_registers_listener(
    hass_mock: MagicMock, mock_connection: MagicMock
) -> None:
    structure._handle_subscribe_structure(hass_mock, mock_connection, {"id": 4})

    hass_mock.bus.async_listen.assert_called_once()
    args, _ = hass_mock.bus.async_listen.call_args
    assert args[0] == structure.STRUCTURE_UPDATED_EVENT
    assert 4 in mock_connection.subscriptions
    mock_connection.send_result.assert_called_once_with(4)


def test_async_register_structure_websocket_commands_registers_three_commands() -> None:
    hass = MagicMock()
    with patch(
        "custom_components.simple_inventory.structure.websocket_api.async_register_command"
    ) as mock_register:
        structure.async_register_structure_websocket_commands(hass)

    assert mock_register.call_count == 3
    registered = {call.args[1] for call in mock_register.call_args_list}
    assert registered == {
        structure.ws_get_structure,
        structure.ws_set_structure,
        structure.ws_subscribe_structure,
    }
