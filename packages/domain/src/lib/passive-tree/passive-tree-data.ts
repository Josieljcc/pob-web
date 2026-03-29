import { z } from 'zod';

/**
 * Minimal shape of PoE / PoB passive tree JSON: `nodes[id].out` lists connected node ids.
 * Full official payloads include groups, sprites, etc.; we `.passthrough()` to preserve them.
 */
export const passiveNodeSchema = z
  .object({
    out: z.array(z.number()).optional()
  })
  .passthrough();

export const passiveTreeDataSchema = z
  .object({
    nodes: z.record(z.string(), passiveNodeSchema)
  })
  .passthrough();

export type PassiveTreeData = z.infer<typeof passiveTreeDataSchema>;
export type PassiveNode = z.infer<typeof passiveNodeSchema>;

export function parsePassiveTreeJson(json: string): PassiveTreeData {
  return passiveTreeDataSchema.parse(JSON.parse(json));
}

/** Returns human-readable issues when `out` references a missing node id. */
export function validatePassiveTreeReferentialIntegrity(
  data: PassiveTreeData
): string[] {
  const errors: string[] = [];
  const nodeKeys = new Set(Object.keys(data.nodes));
  for (const [k, node] of Object.entries(data.nodes)) {
    for (const t of node.out ?? []) {
      if (!nodeKeys.has(String(t))) {
        errors.push(`Node ${k} has out edge to missing node ${t}`);
      }
    }
  }
  return errors;
}
