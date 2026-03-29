# Contribuir

## Fluxo Git

- Branch de integração: **`main`**.
- Trabalho novo: branch `feat/<area>-<slug>`, `fix/<slug>` ou `chore/<slug>` a partir de `main`.
- Integração via **Pull Request** para `main` (mesmo em modo solo: histórico e checklist).
- Evita push directo de trabalho em curso para `main`; usa PR como registo.

## Pull requests

Usa o [template](./.github/pull_request_template.md). Inclui sempre: contexto, o que mudou, como validar (comandos `nx`), testes, riscos/follow-ups.

## Qualidade local

| Momento      | Ferramenta                                                 |
| ------------ | ---------------------------------------------------------- |
| `git commit` | **lint-staged**: ESLint + Prettier nos ficheiros staged    |
| `git push`   | `nx affected -t lint test typecheck` entre `main` e `HEAD` |

### Saltar hooks (emergência)

```bash
set HUSKY=0
git push
```

Ou `git push --no-verify`. Usa só quando necessário; o **CI** continua a ser a fonte de verdade.

## Comandos úteis antes de abrir PR

```bash
npm run format:check
npx nx run-many -t lint test typecheck --all
npx nx run @pob-web/web-e2e:e2e
```

## Revisão

Com uma só pessoa no repositório: **auto-revisão** com o checklist do PR e CI verde. Com mais contribuidores: aprovação de revisor humano.
