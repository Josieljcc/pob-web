# ADR-004: ESLint, Prettier e Husky

## Status

Aceite

## Contexto

Estilo e regras estáticas devem ser consistentes desde o primeiro commit; feedback local antes do CI.

## Decisão

- **ESLint 9** com config **flat** (`eslint.config.mjs`), **eslint-config-prettier** no fim da cadeia para não duplicar formatação.
- **Prettier** com `.prettierrc` e `.prettierignore`; `npm run format` / `format:check`.
- **Husky:** `.husky/pre-commit` → `lint-staged` (ESLint em `*.{ts,tsx,js,...}`; Prettier em ficheiros listados).
- **Husky:** `.husky/pre-push` → `nx affected -t lint test typecheck --base=main --head=HEAD`.

### Push lento ou primeiro clone

Se não existir `main` ou histórico suficiente, o `affected` pode falhar: usar `git branch -M main` após o primeiro commit, ou temporariamente `HUSKY=0` / `git push --no-verify`. O **CI** (`nx run-many`) permanece obrigatório no PR.

## Consequências

- Ficheiros gerados (`dist`, `out-tsc`, caches) estão em `ignore` do ESLint/Prettier.

## Recursos para aprender

- [ESLint flat config](https://eslint.org/docs/latest/use/configure/configuration-files)
- [Prettier](https://prettier.io/)
- [Husky](https://typicode.github.io/husky/)
