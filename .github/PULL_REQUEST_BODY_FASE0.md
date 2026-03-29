## Contexto / objetivo

Implementa a **Fase 0** do plano PoB TypeScript Web: fundação do monorepo (Nx, React 19, Rspack, Vitest, Playwright), pacotes `domain` / `application` / `infrastructure`, shadcn + Tailwind + TanStack Query, ADR-001 a ADR-007, CI GitHub Actions, Husky e documentação de contribuição.

Ligação ao plano: `.cursor/plans/pob_typescript_web_f047ad22.plan.md`.

## O que mudou

- **Apps:** `apps/web` (SPA), `apps/web-e2e` (Playwright smoke).
- **Pacotes:** `@pob-web/domain`, `@pob-web/application`, `@pob-web/infrastructure` com tags e fronteiras ESLint.
- **Qualidade:** ESLint flat, Prettier, Husky (pre-commit / pre-push), workflow `ci.yml`.
- **Docs:** glossário, onboarding, ADRs em `docs/adr/`, `CONTRIBUTING.md`, template de PR.

## Como validar

```bash
npm install
npm run format:check
npx nx run-many -t lint test typecheck --all
npx nx run @pob-web/web-e2e:e2e
```

## Testes

- Vitest em todos os projetos de biblioteca e na app web.
- Playwright: título da página e botão de smoke (`example.spec.ts`, `smoke.spec.ts`).

## Riscos / follow-ups

- `gh`/conta GitHub necessários para criar o remoto e abrir o PR (autenticação local).
- E2E depende do porto 4200 livre ao correr `preview`.

## Screenshots / gravações

N/A (fundação técnica).
