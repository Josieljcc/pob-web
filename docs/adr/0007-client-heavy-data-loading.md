# ADR-007: Heavy client-side data loading

## Status

Accepted (Phase 2 review — reduced fixture; full-tree numbers TBD when shipping live data)

## Context

Artifacts such as the **passive tree** and **mod database** are large; loading everything at once can hurt memory and first paint.

## Decision (Phase 0)

Document the initial strategy; minimal implementation in Phase 0:

- Prefer **versioned JSON** per league/tree version (Zod / JSON Schema contracts in later phases).
- Explore **lazy loading** + **in-memory cache** via TanStack Query where appropriate.
- Consider **IndexedDB** or **Web Workers** when real measurements exist.

## Review (Phase 2)

**Reduced fixture** (`packages/domain/src/lib/passive-tree/__fixtures__/minimal-tree.json`): JSON on the order of **~200 bytes**; `JSON.parse` + Zod validation in Vitest is effectively **sub-millisecond** on dev hardware — safe to bundle for tests and the `/passive-tree` demo.

**Official payload** (`https://www.pathofexile.com/passive-skill-tree`): the embedded `passiveSkillTreeData` object is **large (order of a few MB uncompressed)**. Do **not** load it eagerly on first paint for the MVP UI; use **lazy fetch**, **TanStack Query** with a stable `queryKey` (e.g. tree version), and revisit **code-splitting / IndexedDB / workers** when the full renderer ships.

**Action:** when integrating the full in-app tree, record **payload size (network + parsed)**, **time to first interaction**, and **heap after load** on a mid-tier laptop; append rows to this ADR.

## Consequences

- Until the review, avoid premature optimizations that complicate the data pipeline.

## Learning resources

- [MDN: IndexedDB](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API)
- [TanStack Query: prefetching](https://tanstack.com/query/latest/docs/framework/react/guides/prefetching)
