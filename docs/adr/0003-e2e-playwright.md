# ADR-003: E2E tests with Playwright

## Status

Accepted

## Context

We need browser flow tests (load app, critical interactions) integrated with Nx and CI.

## Decision

Use **Playwright** with `@nx/playwright`, project `apps/web-e2e`, target **`e2e`** for CI smoke, **Chromium** by default (Firefox/WebKit commented out to save time; re-enable when useful). The atomized `e2e-ci` target is for teams using **Nx Cloud**.

## Alternatives considered and rejected

| Tool            | Reason to reject in this repo                                                                                                   |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| **Cypress**     | Strong in-browser DX, but Nx integration is less direct and our stack (Nx + Vitest + TS) favours Playwright for CI parallelism. |
| **WebdriverIO** | Flexible via WebDriver, but more setup and typically slower for the same smoke level.                                           |

Tools like TestCafe or raw Puppeteer are unnecessary while Playwright covers CDP, multi-browser, and Nx.

## Consequences

- CI installs Chromium with `playwright install --with-deps chromium`.
- Tests depend on app **preview** (`nx run @pob-web/web:preview`).

## Learning resources

- [Playwright](https://playwright.dev/)
- [Nx: Playwright](https://nx.dev/nx-api/playwright/documents/overview)
