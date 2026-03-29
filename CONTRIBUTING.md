# Contributing

## Git workflow

- Integration branch: **`main`**.
- New work: branch `feat/<area>-<slug>`, `fix/<slug>`, or `chore/<slug>` from `main`.
- Integrate via **Pull Request** to `main` (even when solo: history and checklist).
- Avoid pushing in-progress work straight to `main`; use PRs as the record.

## Pull requests

Use the [template](./.github/pull_request_template.md). Always include: context, what changed, how to validate (`nx` commands), tests, risks / follow-ups.

## TDD

For **new behavior** and **bug fixes**, follow **red → green → refactor**: add a failing test (or contract) first, then implement the minimal fix. Details and rationale are in [`.cursor/rules/pob-tdd.mdc`](./.cursor/rules/pob-tdd.mdc).

## Local quality gates

| When         | Tool                                                           |
| ------------ | -------------------------------------------------------------- |
| `git commit` | **lint-staged**: ESLint + Prettier on staged files             |
| `git push`   | `nx affected -t lint test typecheck` between `main` and `HEAD` |

### Skipping hooks (emergency)

```bash
set HUSKY=0
git push
```

Or `git push --no-verify`. Use only when necessary; **CI** remains the source of truth.

## Useful commands before opening a PR

```bash
npm run format:check
npx nx run-many -t lint test typecheck --all
npx nx run @pob-web/web-e2e:e2e
```

## Review

With a single maintainer: **self-review** using the PR checklist and green CI. With more contributors: require a human reviewer’s approval.
