# Onboarding

1. **Node 20+** e **npm 10+**.
2. `git clone` e `cd` para a raiz do repositório.
3. `npm install` — instala dependências e executa `husky` (`prepare`).
4. `npx nx run @pob-web/web:serve` — abre a app em `http://localhost:4200`.
5. Ler [CONTRIBUTING.md](../CONTRIBUTING.md) e os [ADRs](./adr/).

Se os git hooks não correrem (clone sem `.git` ou ambiente especial), o CI em GitHub Actions continua a validar lint, testes e E2E.
