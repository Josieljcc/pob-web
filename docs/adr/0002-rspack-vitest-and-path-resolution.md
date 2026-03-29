# ADR-002: Rspack, Vitest e resolução de caminhos

## Status

Aceite

## Contexto

A app web precisa de bundler rápido compatível com o ecossistema webpack, testes rápidos no mesmo stack TypeScript, e alias consistentes (`@/` para componentes shadcn, pacotes `@pob-web/*`).

## Decisão

- **Produção / dev da app:** **Rspack** via `@nx/rspack` (`rspack.config.js`).
- **Testes da app:** **Vitest** com `@vitejs/plugin-react` (`vite.config.mts`); alias `@` → `apps/web/src`.
- **Pacotes TS:** `tsc` com `module`/`moduleResolution` **nodenext** e extensões `.js` nos imports relativos onde aplicável (`verbatimModuleSyntax` na base).

## Consequências

- Alterações em alias exigem actualização em **Rspack** e **Vite** (testes).
- Builds de libs usam `tsconfig.lib.json` separado da app.

## Recursos para aprender

- [Rspack](https://rspack.dev/)
- [Vitest](https://vitest.dev/)
- [TypeScript: package.json exports](https://www.typescriptlang.org/docs/handbook/modules/reference.html#package-json-exports)
