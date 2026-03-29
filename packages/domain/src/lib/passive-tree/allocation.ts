import type { PassiveTreeGraph } from './passive-tree-graph.js';

export type PassiveAllocation = Readonly<{
  /** Includes {@link startNodeId} and every manually allocated passive. */
  allocated: ReadonlySet<number>;
  startNodeId: number;
}>;

export function createInitialAllocation(
  startNodeId: number
): PassiveAllocation {
  return {
    startNodeId,
    allocated: new Set([startNodeId])
  };
}

export function passiveAllocationFromJson(
  parsed: unknown
): PassiveAllocation | null {
  if (
    typeof parsed !== 'object' ||
    parsed === null ||
    !('startNodeId' in parsed) ||
    !('allocated' in parsed)
  ) {
    return null;
  }
  const p = parsed as { startNodeId: unknown; allocated: unknown };
  if (typeof p.startNodeId !== 'number' || !Array.isArray(p.allocated)) {
    return null;
  }
  const ids = p.allocated.filter((x): x is number => typeof x === 'number');
  return {
    startNodeId: p.startNodeId,
    allocated: new Set(ids)
  };
}

export function passiveAllocationToJson(allocation: PassiveAllocation): string {
  return JSON.stringify({
    startNodeId: allocation.startNodeId,
    allocated: [...allocation.allocated]
  });
}

export function canAllocate(
  graph: PassiveTreeGraph,
  allocation: PassiveAllocation,
  nodeId: number
): boolean {
  if (allocation.allocated.has(nodeId)) {
    return false;
  }
  if (!graph.hasNode(nodeId)) {
    return false;
  }
  for (const n of graph.neighbors(nodeId)) {
    if (allocation.allocated.has(n)) {
      return true;
    }
  }
  return false;
}

export type AllocateResult =
  | { ok: true; allocation: PassiveAllocation }
  | { ok: false; reason: string };

export function tryAllocate(
  graph: PassiveTreeGraph,
  allocation: PassiveAllocation,
  nodeId: number
): AllocateResult {
  if (allocation.allocated.has(nodeId)) {
    return { ok: false, reason: 'already_allocated' };
  }
  if (!graph.hasNode(nodeId)) {
    return { ok: false, reason: 'unknown_node' };
  }
  if (!canAllocate(graph, allocation, nodeId)) {
    return { ok: false, reason: 'not_adjacent_to_allocated' };
  }
  const next = new Set(allocation.allocated);
  next.add(nodeId);
  return {
    ok: true,
    allocation: {
      startNodeId: allocation.startNodeId,
      allocated: next
    }
  };
}
