import type { PassiveTreeData } from './passive-tree-data.js';

/**
 * Undirected adjacency graph built from `PassiveTreeData` (`out` lists are treated as edges).
 */
export class PassiveTreeGraph {
  private readonly adj = new Map<number, Set<number>>();

  private constructor(readonly nodeIds: readonly number[]) {}

  static fromPassiveTreeData(data: PassiveTreeData): PassiveTreeGraph {
    const ids = Object.keys(data.nodes)
      .map((k) => Number(k))
      .filter((n) => !Number.isNaN(n));
    const graph = new PassiveTreeGraph(
      Object.freeze([...ids].sort((a, b) => a - b))
    );
    const keys = new Set(Object.keys(data.nodes));
    for (const id of ids) {
      graph.ensureNode(id);
    }
    for (const [key, node] of Object.entries(data.nodes)) {
      const a = Number(key);
      if (Number.isNaN(a)) continue;
      for (const b of node.out ?? []) {
        if (!keys.has(String(b))) {
          continue;
        }
        graph.addEdge(a, b);
      }
    }
    return graph;
  }

  private ensureNode(n: number): void {
    if (!this.adj.has(n)) {
      this.adj.set(n, new Set());
    }
  }

  hasNode(nodeId: number): boolean {
    return this.adj.has(nodeId);
  }

  neighbors(nodeId: number): readonly number[] {
    const s = this.adj.get(nodeId);
    return s ? [...s] : [];
  }

  private addEdge(a: number, b: number): void {
    if (a === b) return;
    this.ensureNode(a);
    this.ensureNode(b);
    const sa = this.adj.get(a);
    const sb = this.adj.get(b);
    if (!sa || !sb) return;
    sa.add(b);
    sb.add(a);
  }
}
