import {
  createInitialAllocation,
  passiveAllocationFromJson,
  passiveAllocationToJson,
  type PassiveAllocation
} from '@pob-web/domain';

export const PASSIVE_ALLOCATION_STORAGE_KEY = 'pob-web-passive-allocation-v1';

const DEFAULT_START_NODE = 1;

/**
 * Read allocation synchronously (for `useState` initialiser).
 * Must not be paired with a separate “load” effect that runs after a “save” effect on the same tick — that can overwrite storage with the default allocation.
 */
export function readPassiveAllocationFromStorage(
  storage: Pick<Storage, 'getItem'>
): PassiveAllocation {
  try {
    const raw = storage.getItem(PASSIVE_ALLOCATION_STORAGE_KEY);
    if (!raw) {
      return createInitialAllocation(DEFAULT_START_NODE);
    }
    const parsed = passiveAllocationFromJson(JSON.parse(raw));
    return parsed ?? createInitialAllocation(DEFAULT_START_NODE);
  } catch {
    return createInitialAllocation(DEFAULT_START_NODE);
  }
}

export function writePassiveAllocationToStorage(
  storage: Pick<Storage, 'setItem'>,
  allocation: PassiveAllocation
): void {
  storage.setItem(
    PASSIVE_ALLOCATION_STORAGE_KEY,
    passiveAllocationToJson(allocation)
  );
}
