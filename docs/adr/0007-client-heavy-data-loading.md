# ADR-007: Carregamento de dados pesados no cliente (stub)

## Status

Proposta (revisão obrigatória na Fase 2 — árvore passiva)

## Contexto

Artefactos como **árvore passiva** e **base de mods** são grandes; carregar tudo de uma vez pode degradar memória e primeira pintura.

## Decisão (Fase 0)

Documentar estratégia inicial; implementação mínima na Fase 0:

- Preferir **JSON versionado** por liga/versão de árvore (contratos com Zod/JSON Schema em fases posteriores).
- Explorar **lazy loading** + **cache em memória** via TanStack Query onde fizer sentido.
- Avaliar **IndexedDB** ou **Web Worker** quando houver medições reais.

## Revisão (Fase 2)

Ao integrar a árvore real, medir: tamanho de payload, tempo até primeira interacção, uso de memória; actualizar este ADR com números e decisão concreta.

## Consequências

- Até à revisão, evitar optimizações prematuras que complique o pipeline de dados.

## Recursos para aprender

- [MDN: IndexedDB](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API)
- [TanStack Query: prefetching](https://tanstack.com/query/latest/docs/framework/react/guides/prefetching)
