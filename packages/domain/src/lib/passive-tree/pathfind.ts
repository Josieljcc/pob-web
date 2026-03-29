import type { PassiveTreeGraph } from './passive-tree-graph.js';

/** Unweighted shortest path (fewest edges). Returns `null` if disconnected or missing endpoints. */
export function shortestPath(
  graph: PassiveTreeGraph,
  from: number,
  to: number
): number[] | null {
  if (from === to) {
    return [from];
  }
  if (!graph.hasNode(from) || !graph.hasNode(to)) {
    return null;
  }
  const prev = new Map<number, number | undefined>();
  const q: number[] = [from];
  prev.set(from, undefined);
  let qi = 0;
  while (qi < q.length) {
    const cur = q[qi];
    if (cur === undefined) break;
    qi++;
    if (cur === to) break;
    for (const n of graph.neighbors(cur)) {
      if (prev.has(n)) continue;
      prev.set(n, cur);
      q.push(n);
    }
  }
  if (!prev.has(to)) {
    return null;
  }
  const out: number[] = [];
  let x: number | undefined = to;
  while (x !== undefined) {
    out.push(x);
    x = prev.get(x);
  }
  out.reverse();
  return out;
}
