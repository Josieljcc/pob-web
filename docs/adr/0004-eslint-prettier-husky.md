# ADR-004: ESLint, Prettier, and Husky

## Status

Accepted

## Context

Style and static rules should be consistent from the first commit; fast local feedback before CI.

## Decision

- **ESLint 9** with **flat** config (`eslint.config.mjs`), **eslint-config-prettier** last in the chain to avoid duplicating formatting.
- **Prettier** with `.prettierrc` and `.prettierignore`; `npm run format` / `format:check`.
- **Husky:** `.husky/pre-commit` → `lint-staged` (ESLint on `*.{ts,tsx,js,...}`; Prettier on listed files).
- **Husky:** `.husky/pre-push` → `nx affected -t lint test typecheck --base=main --head=HEAD`.

### Slow push or fresh clone

If `main` is missing or history is shallow, `affected` may fail: use `git branch -M main` after the first commit, or temporarily `HUSKY=0` / `git push --no-verify`. **CI** (`nx run-many`) remains required on the PR.

## Consequences

- Generated output (`dist`, `out-tsc`, caches) is listed in ESLint/Prettier ignores.

## Learning resources

- [ESLint flat config](https://eslint.org/docs/latest/use/configure/configuration-files)
- [Prettier](https://prettier.io/)
- [Husky](https://typicode.github.io/husky/)
