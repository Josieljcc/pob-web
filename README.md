# PoB TypeScript Web

Monorepo **Nx** com app **React 19** (`apps/web`), pacotes em `packages/*`, testes **Vitest**, E2E **Playwright**, build **Rspack**, UI **shadcn/ui** + **Tailwind**, dados assíncronos com **TanStack Query**.

## Requisitos

- Node.js 20+
- npm 10+

## Comandos

| Comando                              | Descrição                                          |
| ------------------------------------ | -------------------------------------------------- |
| `npm install`                        | Instala dependências e configura Husky (`prepare`) |
| `npx nx run @pob-web/web:serve`      | Dev server (http://localhost:4200)                 |
| `npx nx run @pob-web/web:build`      | Build de produção                                  |
| `npx nx run-many -t test --all`      | Testes unitários / integração (Vitest)             |
| `npx nx run-many -t lint --all`      | ESLint                                             |
| `npx nx run-many -t typecheck --all` | TypeScript                                         |
| `npx nx run @pob-web/web-e2e:e2e`    | E2E (Playwright, usa preview da app)               |
| `npm run format`                     | Prettier (write)                                   |
| `npm run format:check`               | Prettier (check)                                   |

## Estrutura

- `apps/web` — SPA (camada fina; domínio em `packages/*`)
- `apps/web-e2e` — Playwright
- `packages/domain` — regras puras (sem React/fetch)
- `packages/application` — casos de uso
- `packages/infrastructure` — adaptadores (HTTP, storage, etc.)
- `docs/adr` — decisões arquiteturais (ADRs)

Fronteiras de módulo: **ESLint** `@nx/enforce-module-boundaries` com tags `scope:*` (ver ADR-001).

## Documentação

- [CONTRIBUTING.md](./CONTRIBUTING.md) — branches, PRs, hooks
- [docs/glossary.md](./docs/glossary.md) — glossário de domínio (PoB)
- Plano detalhado: [`.cursor/plans/pob_typescript_web_f047ad22.plan.md`](./.cursor/plans/pob_typescript_web_f047ad22.plan.md)

## Licença

MIT (alinhado ao `package.json`).
