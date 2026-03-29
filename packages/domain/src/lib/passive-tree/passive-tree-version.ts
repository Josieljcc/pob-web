/**
 * PoB-style tree version id (e.g. `3_25`), aligned with `TreeData/<version>/` in PoB.
 * Full payloads are not committed; the app loads JSON from a versioned static path.
 */
export const DEFAULT_PASSIVE_TREE_VERSION = '3_25' as const;

export type PassiveTreeVersionId = string;

/**
 * Path under the web app origin for static tree JSON: `/tree-data/<version>/tree.json`.
 * Use with `new URL(path, window.location.origin)` or fetch in the SPA.
 */
export function passiveTreeJsonAssetPath(version: string): string {
  const safe = encodeURIComponent(version);
  return `/tree-data/${safe}/tree.json`;
}
