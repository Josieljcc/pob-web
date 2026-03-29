# PoB TypeScript Web

**Nx** monorepo with a **React 19** app (`apps/web`), packages under `packages/*`, **Vitest** tests, **Playwright** E2E, **Rspack** builds, **shadcn/ui** + **Tailwind** UI, and async data via **TanStack Query**.

## Requirements

- Node.js 20+
- npm 10+

## Commands

| Command                              | Description                                    |
| ------------------------------------ | ---------------------------------------------- |
| `npm install`                        | Install dependencies and run Husky (`prepare`) |
| `npx nx run @pob-web/web:serve`      | Dev server (http://localhost:4200)             |
| `npx nx run @pob-web/web:build`      | Production build                               |
| `npx nx run-many -t test --all`      | Unit / integration tests (Vitest)              |
| `npx nx run-many -t lint --all`      | ESLint                                         |
| `npx nx run-many -t typecheck --all` | TypeScript                                     |
| `npx nx run @pob-web/web-e2e:e2e`    | E2E (Playwright; uses app preview)             |
| `npm run format`                     | Prettier (write)                               |
| `npm run format:check`               | Prettier (check)                               |

## Layout

- `apps/web` — SPA (thin layer; domain lives in `packages/*`)
- `apps/web-e2e` — Playwright
- `packages/domain` — pure rules (no React / fetch)
- `packages/application` — use cases
- `packages/infrastructure` — adapters (HTTP, storage, etc.)
- `docs/adr` — architecture decision records (ADRs)

Module boundaries: **ESLint** `@nx/enforce-module-boundaries` with `scope:*` tags (see ADR-001).

## Publishing to GitHub (first remote and PR)

1. Install and sign in to [GitHub CLI](https://cli.github.com/): `gh auth login`.
2. From the repo root: `.\scripts\publish-pr-phase0.ps1` (public repo by default) or `.\scripts\publish-pr-phase0.ps1 -Private`.

This creates the repository (if `origin` is missing), pushes `main` and branch `feat/phase-0-foundation`, and opens a PR to `main` using [`.github/PULL_REQUEST_BODY_PHASE0.md`](./.github/PULL_REQUEST_BODY_PHASE0.md).

## Documentation

- [CONTRIBUTING.md](./CONTRIBUTING.md) — branches, PRs, hooks
- [docs/glossary.md](./docs/glossary.md) — PoB domain glossary
- ADRs: [docs/adr](./docs/adr/)
- Local Cursor plans (not versioned): `.cursor/plans/` — see also ADRs and glossary in the repo

## License

MIT (see `package.json`).
