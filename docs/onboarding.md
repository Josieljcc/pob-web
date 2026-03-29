# Onboarding

1. **Node 20+** and **npm 10+**.
2. `git clone` and `cd` into the repository root.
3. `npm install` — installs dependencies and runs Husky (`prepare`).
4. `npx nx run @pob-web/web:serve` — opens the app at `http://localhost:4200`.
5. Read [CONTRIBUTING.md](../CONTRIBUTING.md) and [ADRs](./adr/).

If git hooks do not run (incomplete clone or special environment), GitHub Actions CI still validates lint, tests, and E2E.
