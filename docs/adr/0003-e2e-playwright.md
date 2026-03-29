# ADR-003: Testes E2E com Playwright

## Status

Aceite

## Contexto

São necessários testes de fluxo no browser (carregar app, interacções críticas) integrados com Nx e CI.

## Decisão

Usar **Playwright** com `@nx/playwright`, projecto `apps/web-e2e`, alvo **`e2e`** para smoke em CI, browser **Chromium** por omissão (Firefox/WebKit comentados para reduzir tempo; reactivar quando fizer sentido). O alvo atomizado `e2e-ci` fica para equipas com **Nx Cloud**.

## Alternativas consideradas e rejeitadas

| Ferramenta      | Motivo da rejeição neste repo                                                                                                                              |
| --------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Cypress**     | Execução no browser e DX visual fortes, mas integração Nx menos directa e paralelismo/CI alinhados ao nosso stack (Nx + Vitest + TS) favorecem Playwright. |
| **WebdriverIO** | Flexível via WebDriver, porém mais configuração e tipicamente mais lento para o mesmo nível de smoke.                                                      |

Ferramentas como TestCafe ou Puppeteer puro não são necessárias enquanto Playwright cobrir CDP + multi-browser + Nx.

## Consequências

- CI instala `chromium` com `playwright install --with-deps chromium`.
- Testes dependem do **preview** da app (`nx run @pob-web/web:preview`).

## Recursos para aprender

- [Playwright](https://playwright.dev/)
- [Nx: Playwright](https://nx.dev/nx-api/playwright/documents/overview)
