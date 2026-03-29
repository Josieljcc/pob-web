# ADR-007: Heavy client-side data loading (stub)

## Status

Proposed (mandatory review in Phase 2 — passive tree)

## Context

Artifacts such as the **passive tree** and **mod database** are large; loading everything at once can hurt memory and first paint.

## Decision (Phase 0)

Document the initial strategy; minimal implementation in Phase 0:

- Prefer **versioned JSON** per league/tree version (Zod / JSON Schema contracts in later phases).
- Explore **lazy loading** + **in-memory cache** via TanStack Query where appropriate.
- Consider **IndexedDB** or **Web Workers** when real measurements exist.

## Review (Phase 2)

When integrating the real tree, measure payload size, time to first interaction, and memory; update this ADR with numbers and a concrete decision.

## Consequences

- Until the review, avoid premature optimizations that complicate the data pipeline.

## Learning resources

- [MDN: IndexedDB](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API)
- [TanStack Query: prefetching](https://tanstack.com/query/latest/docs/framework/react/guides/prefetching)
