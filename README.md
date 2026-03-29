# PoB TypeScript Web

**Nx** monorepo with a **React 19** app (`apps/web`), packages under `packages/*`, **Vitest** tests, **Playwright** E2E, **Rspack** builds, **shadcn/ui** + **Tailwind** UI, and async data via **TanStack Query**.

## Requirements

- Node.js 20+
- npm 10+

## Commands

| Command                            | Description                                    |
| ---------------------------------- | ---------------------------------------------- |
| `npm install`                      | Install dependencies and run Husky (`prepare`) |
| `npm run dev` (alias: `npm start`) | Dev server (http://localhost:4200)             |
| `npm run build`                    | Production build                               |
| `npm run preview`                  | Serve production build (Rspack preview)        |
| `npm run test`                     | Unit / integration tests (Vitest)              |
| `npm run lint`                     | ESLint                                         |
| `npm run typecheck`                | TypeScript                                     |
| `npm run e2e`                      | E2E (Playwright; uses app preview)             |
| `npm run format`                   | Prettier (write)                               |
| `npm run format:check`             | Prettier (check)                               |

Same targets are available via `npx nx ...` if you prefer Nx directly.

## Layout

- `apps/web` — SPA (thin layer; domain lives in `packages/*`); static passive tree JSON under `apps/web/public/tree-data/<version>/tree.json` (see ADR-007)
- `apps/web-e2e` — Playwright
- `packages/domain` — pure rules (no React / fetch)
- `packages/application` — use cases
- `packages/infrastructure` — adapters (HTTP, storage, etc.)
- `docs/adr` — architecture decision records (ADRs)

Module boundaries: **ESLint** `@nx/enforce-module-boundaries` with `scope:*` tags (see ADR-001).

**Default branch:** `main` — do work in `feat/<area>-<slug>` (or `fix/` / `chore/`), open a PR to `main`, and merge when CI is green (see [CONTRIBUTING.md](./CONTRIBUTING.md)).

## Publishing to GitHub (bootstrap or PR helper)

1. Install and sign in to [GitHub CLI](https://cli.github.com/): `gh auth login`.
2. **New repo:** from the repo root, `.\scripts\publish-pr-phase0.ps1` (add `-Private` for a private repo). This creates `origin` and pushes `main`.
3. **Open a PR:** `.\scripts\publish-pr-phase0.ps1 -FeatureBranch feat/your-branch` (optional `-PrTitle "..."`). Uses [`.github/PULL_REQUEST_BODY_PHASE0.md`](./.github/PULL_REQUEST_BODY_PHASE0.md) as the body unless you change the script.

You can always use `gh pr create --base main --head <branch>` instead.

## Documentation

- [CONTRIBUTING.md](./CONTRIBUTING.md) — branches, PRs, hooks
- [docs/glossary.md](./docs/glossary.md) — PoB domain glossary
- ADRs: [docs/adr](./docs/adr/)
- Local Cursor plans (not versioned): `.cursor/plans/` — see also ADRs and glossary in the repo

## License

MIT (see `package.json`).
