import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import {
  canAllocate,
  createInitialAllocation,
  passiveAllocationFromJson,
  passiveAllocationToJson,
  tryAllocate
} from './allocation.js';
import { minimalPassiveTreeJson } from './minimal-tree.fixture.js';
import { extractPassiveSkillTreeDataFromHtml } from './official-tree-import.js';
import { shortestPath } from './pathfind.js';
import {
  parsePassiveTreeJson,
  validatePassiveTreeReferentialIntegrity
} from './passive-tree-data.js';
import { PassiveTreeGraph } from './passive-tree-graph.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

describe('passive tree data', () => {
  it('parses minimal fixture file and passes referential integrity', () => {
    const raw = readFileSync(
      join(__dirname, '__fixtures__/minimal-tree.json'),
      'utf8'
    );
    const data = parsePassiveTreeJson(raw);
    expect(validatePassiveTreeReferentialIntegrity(data)).toEqual([]);
  });
});

describe('PassiveTreeGraph', () => {
  it('builds adjacency from fixture', () => {
    const data = parsePassiveTreeJson(minimalPassiveTreeJson);
    const g = PassiveTreeGraph.fromPassiveTreeData(data);
    expect([...g.neighbors(1)].sort((a, b) => a - b)).toEqual([2]);
    expect([...g.neighbors(2)].sort((a, b) => a - b)).toEqual([1, 3, 4]);
  });
});

describe('shortestPath', () => {
  it('finds shortest path on minimal tree', () => {
    const data = parsePassiveTreeJson(minimalPassiveTreeJson);
    const g = PassiveTreeGraph.fromPassiveTreeData(data);
    expect(shortestPath(g, 1, 4)).toEqual([1, 2, 4]);
    expect(shortestPath(g, 3, 4)).toEqual([3, 2, 4]);
  });
});

describe('allocation', () => {
  it('allocates only along edges from allocated region', () => {
    const data = parsePassiveTreeJson(minimalPassiveTreeJson);
    const g = PassiveTreeGraph.fromPassiveTreeData(data);
    let a = createInitialAllocation(1);
    expect(canAllocate(g, a, 2)).toBe(true);
    expect(canAllocate(g, a, 3)).toBe(false);
    const r1 = tryAllocate(g, a, 2);
    expect(r1.ok).toBe(true);
    if (r1.ok) a = r1.allocation;
    expect(canAllocate(g, a, 3)).toBe(true);
    expect(canAllocate(g, a, 4)).toBe(true);
  });

  it('round-trips JSON', () => {
    const data = parsePassiveTreeJson(minimalPassiveTreeJson);
    const g = PassiveTreeGraph.fromPassiveTreeData(data);
    let a = createInitialAllocation(1);
    const r = tryAllocate(g, a, 2);
    if (!r.ok) throw new Error('allocate');
    a = r.allocation;
    const json = passiveAllocationToJson(a);
    const back = passiveAllocationFromJson(JSON.parse(json));
    expect(back).not.toBeNull();
    if (!back) throw new Error('expected allocation');
    expect([...back.allocated].sort((x, y) => x - y)).toEqual([1, 2]);
  });
});

describe('official HTML extract', () => {
  it('extracts JSON after marker (string-safe braces)', () => {
    const html = `<html><script>
    var passiveSkillTreeData = {"nodes":{"1":{"out":[2]}}};
    </script></html>`;
    const json = extractPassiveSkillTreeDataFromHtml(html);
    expect(json).toBe('{"nodes":{"1":{"out":[2]}}}');
    if (json === null) throw new Error('expected json');
    const data = parsePassiveTreeJson(json);
    expect(data.nodes['1']).toBeDefined();
  });
});
