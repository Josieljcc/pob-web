import { useCallback, useEffect, useMemo, useState } from 'react';

import {
  DEFAULT_PASSIVE_TREE_VERSION,
  PassiveTreeGraph,
  canAllocate,
  createInitialAllocation,
  tryAllocate,
  type PassiveAllocation
} from '@pob-web/domain';

import {
  readPassiveAllocationFromStorage,
  writePassiveAllocationToStorage
} from './passive-tree-storage';
import { usePassiveTreeData } from './use-passive-tree-data';

export function PassiveTreePage() {
  const {
    data: treeData,
    isLoading,
    isError,
    error
  } = usePassiveTreeData(DEFAULT_PASSIVE_TREE_VERSION);

  const graph = useMemo(() => {
    if (!treeData) {
      return null;
    }
    return PassiveTreeGraph.fromPassiveTreeData(treeData);
  }, [treeData]);

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
      if (!graph) {
        return;
      }
      setAllocation((prev) => {
        const r = tryAllocate(graph, prev, nodeId);
        return r.ok ? r.allocation : prev;
      });
    },
    [graph]
  );

  const candidates = graph
    ? [2, 3, 4].filter(
        (n) => canAllocate(graph, allocation, n) && !allocation.allocated.has(n)
      )
    : [];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background p-8">
        <p data-testid="tree-loading">Loading passive tree…</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-background p-8">
        <p data-testid="tree-error" className="text-destructive">
          {error instanceof Error ? error.message : String(error)}
        </p>
      </div>
    );
  }

  if (!graph) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background p-8">
      <header className="mb-8">
        <h1 className="text-2xl font-semibold">Passive tree (demo)</h1>
        <p className="mt-2 text-muted-foreground">
          Tree JSON from{' '}
          <span className="font-mono text-xs">
            /tree-data/{DEFAULT_PASSIVE_TREE_VERSION}/tree.json
          </span>
          ; allocation in{' '}
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
