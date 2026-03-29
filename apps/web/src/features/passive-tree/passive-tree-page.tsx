import { useCallback, useEffect, useMemo, useState } from 'react';

import {
  PassiveTreeGraph,
  canAllocate,
  createInitialAllocation,
  minimalPassiveTreeJson,
  parsePassiveTreeJson,
  tryAllocate,
  type PassiveAllocation
} from '@pob-web/domain';

import {
  readPassiveAllocationFromStorage,
  writePassiveAllocationToStorage
} from './passive-tree-storage';

export function PassiveTreePage() {
  const graph = useMemo(() => {
    const data = parsePassiveTreeJson(minimalPassiveTreeJson);
    return PassiveTreeGraph.fromPassiveTreeData(data);
  }, []);

  const [allocation, setAllocation] = useState<PassiveAllocation>(() =>
    typeof window === 'undefined'
      ? createInitialAllocation(1)
      : readPassiveAllocationFromStorage(window.localStorage)
  );

  useEffect(() => {
    writePassiveAllocationToStorage(window.localStorage, allocation);
  }, [allocation]);

  const tryAlloc = useCallback(
    (nodeId: number) => {
      setAllocation((prev) => {
        const r = tryAllocate(graph, prev, nodeId);
        return r.ok ? r.allocation : prev;
      });
    },
    [graph]
  );

  const candidates = [2, 3, 4].filter(
    (n) => canAllocate(graph, allocation, n) && !allocation.allocated.has(n)
  );

  return (
    <div className="min-h-screen bg-background p-8">
      <header className="mb-8">
        <h1 className="text-2xl font-semibold">Passive tree (demo)</h1>
        <p className="mt-2 text-muted-foreground">
          Phase 2 — minimal fixture graph; allocation persists in{' '}
          <span className="font-mono text-xs">localStorage</span>.
        </p>
      </header>
      <p className="mb-4 text-sm">
        Allocated nodes:{' '}
        <span data-testid="allocated-count">{allocation.allocated.size}</span>
        <span className="ml-2 font-mono text-xs text-muted-foreground">
          [{[...allocation.allocated].sort((a, b) => a - b).join(', ')}]
        </span>
      </p>
      <div className="flex flex-wrap gap-2">
        {candidates.map((n) => (
          <button
            key={n}
            type="button"
            className="rounded-md border border-input bg-background px-3 py-1.5 text-sm font-medium shadow-sm hover:bg-accent"
            onClick={() => tryAlloc(n)}
          >
            Allocate node {n}
          </button>
        ))}
        {candidates.length === 0 ? (
          <span className="text-sm text-muted-foreground">
            No adjacent empty nodes (or graph complete).
          </span>
        ) : null}
      </div>
    </div>
  );
}
