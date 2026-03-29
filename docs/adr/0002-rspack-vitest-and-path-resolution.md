# ADR-002: Rspack, Vitest, and path resolution

## Status

Accepted

## Context

The web app needs a fast bundler compatible with the webpack ecosystem, fast tests on the same TypeScript stack, and consistent aliases (`@/` for shadcn, `@pob-web/*` packages).

## Decision

- **App production / dev:** **Rspack** via `@nx/rspack` (`rspack.config.js`).
- **App tests:** **Vitest** with `@vitejs/plugin-react` (`vite.config.mts`); alias `@` → `apps/web/src`.
- **TS packages:** `tsc` with **nodenext** `module` / `moduleResolution` and `.js` extensions on relative imports where required (`verbatimModuleSyntax` in the base config).

## Consequences

- Alias changes must be updated in **Rspack** and **Vite** (tests).
- Library builds use a separate `tsconfig.lib.json` from the app.

## Learning resources

- [Rspack](https://rspack.dev/)
- [Vitest](https://vitest.dev/)
- [TypeScript: package.json exports](https://www.typescriptlang.org/docs/handbook/modules/reference.html#package-json-exports)
