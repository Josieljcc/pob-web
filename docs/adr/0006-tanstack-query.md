# ADR-006: TanStack Query (React Query)

## Status

Accepted

## Context

The app needs HTTP requests, cache, loading/error states, and revalidation without mixing that into the domain calculation engine.

## Decision

Use **@tanstack/react-query** with `QueryClient` and `QueryClientProvider` at the root (`apps/web/src/main.tsx`).

- **Query** handles **server / async state** (fetch, cache, stable `queryKey` per resource).
- **Domain** (`packages/domain`) and **use cases** (`packages/application`) stay **pure** and testable with Vitest without React.
- The PoB engine (future phases) is **not** replaced by Query; only remote data or artifact loading.

## Alternatives considered

| Option        | Note                                                                    |
| ------------- | ----------------------------------------------------------------------- |
| **SWR**       | Similar API; less mutation tooling integration in some flows.           |
| **RTK Query** | Great in Redux; would add an unnecessary global layer for this project. |

## Consequences

- New endpoints: define `queryKey` in a function or shared constant; document conventions when multiple resources exist.

## Learning resources

- [TanStack Query](https://tanstack.com/query/latest)
- [Overview (concepts)](https://tanstack.com/query/latest/docs/framework/react/overview)
