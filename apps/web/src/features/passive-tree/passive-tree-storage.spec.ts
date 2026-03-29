import {
  PassiveTreeGraph,
  createInitialAllocation,
  minimalPassiveTreeJson,
  parsePassiveTreeJson,
  passiveAllocationToJson,
  tryAllocate
} from '@pob-web/domain';

import {
  PASSIVE_ALLOCATION_STORAGE_KEY,
  readPassiveAllocationFromStorage,
  writePassiveAllocationToStorage
} from './passive-tree-storage';

function memoryStorage(): Pick<Storage, 'getItem' | 'setItem'> & {
  removeItem: (k: string) => void;
} {
  const map = new Map<string, string>();
  return {
    getItem: (k: string) => map.get(k) ?? null,
    setItem: (k: string, v: string) => {
      map.set(k, v);
    },
    removeItem: (k: string) => {
      map.delete(k);
    }
  };
}

describe('readPassiveAllocationFromStorage', () => {
  it('returns default when empty', () => {
    const s = memoryStorage();
    const a = readPassiveAllocationFromStorage(s);
    expect(a.startNodeId).toBe(1);
    expect([...a.allocated].sort((x, y) => x - y)).toEqual([1]);
  });

  it('returns stored allocation written by writePassiveAllocationToStorage', () => {
    const s = memoryStorage();
    const data = parsePassiveTreeJson(minimalPassiveTreeJson);
    const g = PassiveTreeGraph.fromPassiveTreeData(data);
    let a = createInitialAllocation(1);
    const r = tryAllocate(g, a, 2);
    if (!r.ok) throw new Error('allocate');
    a = r.allocation;
    writePassiveAllocationToStorage(s, a);
    const again = readPassiveAllocationFromStorage(s);
    expect([...again.allocated].sort((x, y) => x - y)).toEqual([1, 2]);
  });

  it('reads the same key shape as saved JSON', () => {
    const s = memoryStorage();
    s.setItem(
      PASSIVE_ALLOCATION_STORAGE_KEY,
      passiveAllocationToJson({
        startNodeId: 1,
        allocated: new Set([1, 2])
      })
    );
    expect(readPassiveAllocationFromStorage(s).allocated.size).toBe(2);
  });
});
