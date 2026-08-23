"""Constants for the Simple Inventory: Структура мест integration."""

from typing import Final

# Own domain — deliberately separate from upstream Simple Inventory's
# "simple_inventory" domain, so this ships as an independent HACS
# integration with its own custom_components/<domain> folder, manifest,
# and config entry, instead of patching files inside someone else's
# installed integration. See ANALYSIS.md / README.md for the rationale.
DOMAIN: Final = "simple_inventory_structure"
