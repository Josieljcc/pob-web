## Context / goal

Implements **Phase 0** of the PoB TypeScript Web plan: monorepo foundation (Nx, React 19, Rspack, Vitest, Playwright), `domain` / `application` / `infrastructure` packages, shadcn + Tailwind + TanStack Query, ADR-001 through ADR-007, GitHub Actions CI, Husky, and contribution docs.

Plan reference (local): `.cursor/plans/pob_typescript_web_f047ad22.plan.md`.

## What changed

- **Apps:** `apps/web` (SPA), `apps/web-e2e` (Playwright smoke).
- **Packages:** `@pob-web/domain`, `@pob-web/application`, `@pob-web/infrastructure` with tags and ESLint boundaries.
- **Quality:** ESLint flat config, Prettier, Husky (pre-commit / pre-push), `ci.yml` workflow.
- **Docs:** glossary, onboarding, ADRs under `docs/adr/`, `CONTRIBUTING.md`, PR template.

## How to validate

```bash
npm install
npm run format:check
npx nx run-many -t lint test typecheck --all
npx nx run @pob-web/web-e2e:e2e
```

## Tests

- Vitest on all library projects and the web app.
- Playwright: page title and smoke button (`example.spec.ts`, `smoke.spec.ts`).

## Risks / follow-ups

- `gh` / GitHub account required to create the remote and open the PR (local authentication).
- E2E needs port **4200** free when running `preview`.

## Screenshots / recordings

N/A (technical foundation).
