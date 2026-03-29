# ADR-008: PoB-compatible XML for `<Build>` (subset), Zod, and fast-xml-parser

## Status

Accepted

## Context

Path of Building stores builds as XML under a `PathOfBuilding` root. The web client needs a **stable domain model** and **read/write** that stay compatible with PoB exports without reimplementing the full Lua stack in Phase 1.

Parsing untyped XML at the UI boundary is fragile; we want **explicit contracts** and **regression tests** (round-trip on small fixtures).

## Decision

1. **Scope (Phase 1)**  
   Model and persist only the **`<Build>` element attributes** that PoB’s `Build.lua` load/save cares about for a minimal build (e.g. `targetVersion`, `level`, `viewMode`, `className`, `ascendClassName`, `bandit`, `pantheonMajorGod`, `pantheonMinorGod`, `mainSocketGroup`, `characterLevelAutoMode`). **Child nodes** under `<Build>` (and the rest of the document) are **out of scope** for this phase; they may appear in real `.xml` files.

2. **Parsing and serialization**  
   Use **`fast-xml-parser`** (`XMLParser` / `XMLBuilder`) with a fixed **`attributeNamePrefix`** so attribute maps match PoB-style elements. Serialize a minimal document: `<PathOfBuilding><Build …/></PathOfBuilding>`.

3. **Validation**  
   After XML → JS object, validate the wrapper and `<Build>` attribute bag with **Zod**. The wrapper uses **`.passthrough()`** on `PathOfBuilding` so documents that also contain `Tree`, `Items`, etc. still parse as long as `<Build>` is present and attributes match the subset schema.

4. **Tests**  
   Keep **round-trip** tests: domain `Build` → XML → `Build`, plus **fixture files** under the domain package for stable snapshots.

5. **Location**  
   Implement the aggregate and XML helpers in **`@pob-web/domain`** so UI and application layers depend on typed contracts, not raw XML strings.

## Consequences

- Full PoB files are **not** losslessly represented until child nodes and sibling sections are modeled; importing a real build may require **later phases** to preserve or ignore extra data explicitly.
- Changes to PoB’s attribute names or semantics require updating Zod schemas, fixtures, and any migration notes.
- Alternative stacks (e.g. only Zod + manual XML, or DOMParser in the browser) were not chosen to avoid duplicating serialization rules; **`fast-xml-parser`** is shared for parse and build.

## Learning resources

- [Path of Building Community: `Build.lua` (load/save)](https://github.com/PathOfBuildingCommunity/PathOfBuilding/blob/master/src/Modules/Build.lua)
- [fast-xml-parser](https://github.com/NaturalIntelligence/fast-xml-parser)
- [Zod](https://zod.dev/)
