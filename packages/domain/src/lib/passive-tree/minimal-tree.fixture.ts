/** Tiny line + branch: `1—2—3` and `2—4` (matches `minimal-tree.json`). */
export const minimalPassiveTreeJson = `{
  "nodes": {
    "1": { "out": [2] },
    "2": { "out": [1, 3, 4] },
    "3": { "out": [2] },
    "4": { "out": [2] }
  }
}` as const;
