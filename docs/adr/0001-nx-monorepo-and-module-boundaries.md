# ADR-001: Monorepo Nx e fronteiras de módulo

## Status

Aceite

## Contexto

O projecto precisa de várias camadas (UI, aplicação, domínio, infra) com builds e testes independentes, cache de tarefas e regras que impeçam dependências inversas (por exemplo, domínio a importar React).

## Decisão

Usar **Nx** em modo integrado com `apps/*` e `packages/*`, **tags** `scope:domain`, `scope:application`, `scope:infrastructure`, `scope:web`, `scope:web-e2e`, e a regra **ESLint** `@nx/enforce-module-boundaries` em `eslint.config.mjs` para restringir dependências entre tags.

## Consequências

- Novos pacotes devem declarar tags no `package.json` (`nx.tags`) coerentes com a sua camada.
- Violações aparecem no `nx lint` e no IDE.

## Recursos para aprender

- [Nx: Module boundary rules](https://nx.dev/features/enforce-module-boundaries)
- [Nx: Integrated monorepo](https://nx.dev/concepts/integrated-vs-package-based)
