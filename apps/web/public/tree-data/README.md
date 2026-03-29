# Passive tree JSON (versioned)

Place one `tree.json` per PoB-style version under `tree-data/<version>/` (e.g. `3_25/tree.json`).

The repository ships a **minimal** graph for development and tests. A full league tree is multi‑MB; generate or download it via your data pipeline and add it here without committing secrets.

The app loads `GET /tree-data/<version>/tree.json` (see `passiveTreeJsonAssetPath` in `@pob-web/domain`).
