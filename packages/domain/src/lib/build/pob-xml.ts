import { XMLBuilder, XMLParser } from 'fast-xml-parser';
import { z } from 'zod';

import type { Build } from './build.js';

const ATTRIBUTE_PREFIX = '@_';

/** Raw `<Build>` attributes as produced by fast-xml-parser (attributeNamePrefix). */
const buildAttributesSchema = z.object({
  [ATTRIBUTE_PREFIX + 'targetVersion']: z.string(),
  [ATTRIBUTE_PREFIX + 'viewMode']: z.string().optional(),
  [ATTRIBUTE_PREFIX + 'level']: z.string(),
  [ATTRIBUTE_PREFIX + 'className']: z.string().optional(),
  [ATTRIBUTE_PREFIX + 'ascendClassName']: z.string().optional(),
  [ATTRIBUTE_PREFIX + 'bandit']: z.string(),
  [ATTRIBUTE_PREFIX + 'pantheonMajorGod']: z.string(),
  [ATTRIBUTE_PREFIX + 'pantheonMinorGod']: z.string(),
  [ATTRIBUTE_PREFIX + 'mainSocketGroup']: z.string(),
  [ATTRIBUTE_PREFIX + 'characterLevelAutoMode']: z
    .enum(['true', 'false'])
    .optional()
});

const pathOfBuildingWrapperSchema = z
  .object({
    PathOfBuilding: z
      .object({
        Build: z.union([buildAttributesSchema, z.array(buildAttributesSchema)])
      })
      .passthrough()
  })
  .passthrough();

function parseIntStrict(s: string, field: string): number {
  const n = Number.parseInt(s, 10);
  if (Number.isNaN(n)) {
    throw new Error(`Invalid integer for ${field}: ${s}`);
  }
  return n;
}

function emptyToUndefined(s: string | undefined): string | undefined {
  if (s === undefined || s === '') {
    return undefined;
  }
  return s;
}

function reqStr(
  attrs: Record<string, unknown>,
  key: string,
  field: string
): string {
  const v = attrs[key];
  if (typeof v !== 'string') {
    throw new Error(`Invalid or missing XML attribute ${field}`);
  }
  return v;
}

function buildFromAttributes(
  attrs: z.infer<typeof buildAttributesSchema>
): Build {
  const raw = attrs as Record<string, unknown>;
  const auto = raw[ATTRIBUTE_PREFIX + 'characterLevelAutoMode'];
  return {
    targetVersion: reqStr(
      raw,
      ATTRIBUTE_PREFIX + 'targetVersion',
      'targetVersion'
    ),
    viewMode: emptyToUndefined(attrs[ATTRIBUTE_PREFIX + 'viewMode']),
    level: parseIntStrict(
      reqStr(raw, ATTRIBUTE_PREFIX + 'level', 'level'),
      'level'
    ),
    className: emptyToUndefined(attrs[ATTRIBUTE_PREFIX + 'className']),
    ascendClassName: emptyToUndefined(
      attrs[ATTRIBUTE_PREFIX + 'ascendClassName']
    ),
    bandit: reqStr(raw, ATTRIBUTE_PREFIX + 'bandit', 'bandit'),
    pantheonMajorGod: reqStr(
      raw,
      ATTRIBUTE_PREFIX + 'pantheonMajorGod',
      'pantheonMajorGod'
    ),
    pantheonMinorGod: reqStr(
      raw,
      ATTRIBUTE_PREFIX + 'pantheonMinorGod',
      'pantheonMinorGod'
    ),
    mainSocketGroup: parseIntStrict(
      reqStr(raw, ATTRIBUTE_PREFIX + 'mainSocketGroup', 'mainSocketGroup'),
      'mainSocketGroup'
    ),
    characterLevelAutoMode: auto === 'true'
  };
}

const xmlParser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: ATTRIBUTE_PREFIX,
  parseAttributeValue: false,
  trimValues: true
});

const xmlBuilder = new XMLBuilder({
  ignoreAttributes: false,
  attributeNamePrefix: ATTRIBUTE_PREFIX,
  format: true,
  suppressEmptyNode: true
});

/**
 * Parse PoB-style XML containing `<PathOfBuilding><Build .../></PathOfBuilding>`.
 * Phase 1: only the `<Build>` attribute subset is validated and mapped; other nodes are ignored by the parser shape.
 */
export function parseBuildFromPobXml(xml: string): Build {
  const parsed = xmlParser.parse(xml);
  const wrapped = pathOfBuildingWrapperSchema.safeParse(parsed);
  if (!wrapped.success) {
    const detail = wrapped.error.issues
      .map((i) => `${i.path.join('.')}: ${i.message}`)
      .join('; ');
    throw new Error(`Invalid PoB build XML: ${detail}`);
  }
  const buildNode = wrapped.data.PathOfBuilding.Build;
  const attrs = Array.isArray(buildNode) ? buildNode[0] : buildNode;
  return buildFromAttributes(attrs);
}

function buildToAttributes(build: Build): Record<string, string> {
  return {
    [ATTRIBUTE_PREFIX + 'targetVersion']: build.targetVersion,
    [ATTRIBUTE_PREFIX + 'viewMode']: build.viewMode ?? '',
    [ATTRIBUTE_PREFIX + 'level']: String(build.level),
    [ATTRIBUTE_PREFIX + 'className']: build.className ?? '',
    [ATTRIBUTE_PREFIX + 'ascendClassName']: build.ascendClassName ?? '',
    [ATTRIBUTE_PREFIX + 'bandit']: build.bandit,
    [ATTRIBUTE_PREFIX + 'pantheonMajorGod']: build.pantheonMajorGod,
    [ATTRIBUTE_PREFIX + 'pantheonMinorGod']: build.pantheonMinorGod,
    [ATTRIBUTE_PREFIX + 'mainSocketGroup']: String(build.mainSocketGroup),
    [ATTRIBUTE_PREFIX + 'characterLevelAutoMode']: build.characterLevelAutoMode
      ? 'true'
      : 'false'
  };
}

/**
 * Serialize a {@link Build} to a minimal PoB-compatible XML document (Build attributes only).
 */
export function serializeBuildToPobXml(build: Build): string {
  const obj = {
    PathOfBuilding: {
      Build: {
        ...buildToAttributes(build)
      }
    }
  };
  const xml = xmlBuilder.build(obj);
  return typeof xml === 'string' ? xml : String(xml);
}
