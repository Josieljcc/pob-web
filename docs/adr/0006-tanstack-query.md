# ADR-006: TanStack Query (React Query)

## Status

Aceite

## Contexto

A app precisa de pedidos HTTP, cache, estados de loading/erro e revalidação sem misturar isso com o motor de cálculo do domínio.

## Decisão

Usar **@tanstack/react-query** com `QueryClient` e `QueryClientProvider` na raiz (`apps/web/src/main.tsx`).

- **Query** trata **estado de servidor / async** (fetch, cache, `queryKey` estáveis por recurso).
- **Domínio** (`packages/domain`) e **casos de uso** (`packages/application`) permanecem **puros** e testáveis com Vitest sem React.
- O motor PoB (fases futuras) **não** é substituído pelo Query; apenas dados remotos ou carregamento de artefactos.

## Alternativas consideradas

| Opção         | Nota                                                                                        |
| ------------- | ------------------------------------------------------------------------------------------- |
| **SWR**       | API semelhante; menos integração com tooling de mutations em alguns cenários.               |
| **RTK Query** | Excelente no ecossistema Redux; adicionaria camada global desnecessária para este projecto. |

## Consequências

- Novos endpoints: definir `queryKey` em função ou constante partilhada; documentar convenções quando existirem múltiplos recursos.

## Recursos para aprender

- [TanStack Query](https://tanstack.com/query/latest)
- [Overview (conceitos)](https://tanstack.com/query/latest/docs/framework/react/overview)
