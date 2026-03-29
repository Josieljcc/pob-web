# ADR-005: shadcn/ui, Tailwind, and React 19

## Status

Accepted

## Context

The UI layer should be accessible, consistent, and typed; domain and calculation engine logic must not live in components.

## Decision

- **React 19** as the app runtime.
- **Tailwind CSS** + **tailwindcss-animate**; tokens via CSS variables in `styles.css` (new-york / neutral theme).
- **shadcn/ui** (Radix + `class-variance-authority` + `tailwind-merge`): `components.json` in `apps/web`, components under `apps/web/src/components/ui`, `cn` helper in `src/lib/utils.ts`, alias **`@/*`** → `src/*` (Rspack + Vite).

UI is **presentation only**: consumes DTOs / hooks from the application layer or TanStack Query; no PoB business rules.

## Consequences

- New components follow the shadcn pattern (variants with `cva`).
- Light/dark theme prepared via `.dark` class (activation later).

## Learning resources

- [shadcn/ui](https://ui.shadcn.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [React 19](https://react.dev/)
