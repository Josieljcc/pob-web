import {
  parsePassiveTreeJson,
  passiveTreeJsonAssetPath,
  type PassiveTreeData
} from '@pob-web/domain';

export type FetchPassiveTreeOptions = {
  /** Base URL for the app (default: `window.location.origin` in browser). */
  origin?: string;
  /** Inject for tests. */
  fetchFn?: typeof fetch;
};

/**
 * Load passive tree JSON from the versioned static asset path (see `passiveTreeJsonAssetPath`).
 * Place files under `apps/web/public/tree-data/<version>/tree.json`.
 */
export async function fetchPassiveTreeDataForVersion(
  version: string,
  options?: FetchPassiveTreeOptions
): Promise<PassiveTreeData> {
  const fetchImpl = options?.fetchFn ?? fetch;
  let origin = options?.origin;
  if (!origin) {
    const g = globalThis as typeof globalThis & {
      location?: { origin?: string };
    };
    origin =
      typeof g.location?.origin === 'string'
        ? g.location.origin
        : 'http://localhost';
  }
  const path = passiveTreeJsonAssetPath(version);
  const url = new URL(path, origin).href;
  const res = await fetchImpl(url);
  if (!res.ok) {
    throw new Error(`Passive tree JSON failed: HTTP ${res.status} ${url}`);
  }
  const text = await res.text();
  return parsePassiveTreeJson(text);
}
