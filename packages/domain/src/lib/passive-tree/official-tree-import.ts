/**
 * Extracts the JSON object assigned to `var passiveSkillTreeData = ...` on the official PoE page.
 * String-aware `{`/`}` tracking so braces inside JSON strings do not break depth.
 */
export function extractPassiveSkillTreeDataFromHtml(
  html: string
): string | null {
  const marker = 'var passiveSkillTreeData = ';
  const idx = html.indexOf(marker);
  if (idx === -1) {
    return null;
  }
  let i = idx + marker.length;
  while (i < html.length) {
    const ch = html[i];
    if (ch === undefined || !/\s/.test(ch)) break;
    i++;
  }
  return extractJsonObjectAt(html, i);
}

function extractJsonObjectAt(html: string, start: number): string | null {
  if (html[start] !== '{') {
    return null;
  }
  let depth = 0;
  let inString = false;
  let escape = false;
  const from = start;
  for (let i = start; i < html.length; i++) {
    const c = html[i];
    if (c === undefined) break;
    if (inString) {
      if (escape) {
        escape = false;
        continue;
      }
      if (c === '\\') {
        escape = true;
        continue;
      }
      if (c === '"') {
        inString = false;
      }
      continue;
    }
    if (c === '"') {
      inString = true;
      continue;
    }
    if (c === '{') {
      depth++;
    } else if (c === '}') {
      depth--;
      if (depth === 0) {
        return html.slice(from, i + 1);
      }
    }
  }
  return null;
}
