import { parsePassiveTreeFromOfficialPageHtml } from './passive-tree-official.js';

describe('parsePassiveTreeFromOfficialPageHtml', () => {
  it('parses embedded blob like the live PoE page', () => {
    const html = `<!doctype html><script>var passiveSkillTreeData = {"nodes":{"1":{"out":[2]},"2":{"out":[1]}}};</script>`;
    const data = parsePassiveTreeFromOfficialPageHtml(html);
    expect(Object.keys(data.nodes).length).toBe(2);
  });
});
