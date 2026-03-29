# ADR-001: Nx monorepo and module boundaries

## Status

Accepted

## Context

The project needs multiple layers (UI, application, domain, infra) with independent builds and tests, task caching, and rules that block inverted dependencies (e.g. domain importing React).

## Decision

Use **Nx** in integrated mode with `apps/*` and `packages/*`, **tags** `scope:domain`, `scope:application`, `scope:infrastructure`, `scope:web`, `scope:web-e2e`, and the **ESLint** rule `@nx/enforce-module-boundaries` in `eslint.config.mjs` to restrict dependencies between tags.

## Consequences

- New packages must declare `nx.tags` in `package.json` consistent with their layer.
- Violations surface in `nx lint` and in the IDE.

## Learning resources

- [Nx: Module boundary rules](https://nx.dev/features/enforce-module-boundaries)
- [Nx: Integrated monorepo](https://nx.dev/concepts/integrated-vs-package-based)
