# ADR-005: shadcn/ui, Tailwind e React 19

## Status

Aceite

## Contexto

A camada de UI deve ser acessível, consistente e tipada; o domínio e o motor de cálculo não devem viver em componentes.

## Decisão

- **React 19** como runtime da app.
- **Tailwind CSS** + **tailwindcss-animate**; tokens via variáveis CSS em `styles.css` (tema new-york / neutral).
- **shadcn/ui** (Radix + `class-variance-authority` + `tailwind-merge`): `components.json` em `apps/web`, componentes em `apps/web/src/components/ui`, util `cn` em `src/lib/utils.ts`, alias **`@/*`** → `src/*` (Rspack + Vite).

A UI é **só apresentação**: consome DTOs / hooks da camada de aplicação ou TanStack Query; não contém regras de negócio do PoB.

## Consequências

- Novos componentes seguem padrão shadcn (variantes com `cva`).
- Tema claro/escuro preparado via classe `.dark` (activação futura).

## Recursos para aprender

- [shadcn/ui](https://ui.shadcn.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [React 19](https://react.dev/)
