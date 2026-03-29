import {
  extractPassiveSkillTreeDataFromHtml,
  parsePassiveTreeJson,
  type PassiveTreeData
} from '@pob-web/domain';

/** Official PoE passive tree page (embedded `passiveSkillTreeData` JSON). */
export const OFFICIAL_POE_PASSIVE_TREE_URL =
  'https://www.pathofexile.com/passive-skill-tree';

export async function fetchOfficialPassiveTreePage(): Promise<string> {
  const res = await fetch(OFFICIAL_POE_PASSIVE_TREE_URL, {
    headers: { Accept: 'text/html' }
  });
  if (!res.ok) {
    throw new Error(`fetch passive tree page failed: HTTP ${res.status}`);
  }
  return res.text();
}

export function parsePassiveTreeFromOfficialPageHtml(
  html: string
): PassiveTreeData {
  const json = extractPassiveSkillTreeDataFromHtml(html);
  if (!json) {
    throw new Error('passiveSkillTreeData not found in HTML');
  }
  return parsePassiveTreeJson(json);
}
