import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { buildsEqual, createDefaultBuild } from './build.js';
import { parseBuildFromPobXml, serializeBuildToPobXml } from './pob-xml.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

describe('PoB XML (Build subset)', () => {
  it('round-trips createDefaultBuild', () => {
    const build = createDefaultBuild();
    const xml = serializeBuildToPobXml(build);
    const again = parseBuildFromPobXml(xml);
    expect(buildsEqual(build, again)).toBe(true);
  });

  it('round-trips minimal fixture file', () => {
    const xml = readFileSync(
      join(__dirname, '__fixtures__/minimal-build.xml'),
      'utf8'
    );
    const build = parseBuildFromPobXml(xml);
    const out = serializeBuildToPobXml(build);
    const again = parseBuildFromPobXml(out);
    expect(buildsEqual(build, again)).toBe(true);
  });

  it('parses fixture to expected values', () => {
    const xml = readFileSync(
      join(__dirname, '__fixtures__/minimal-build.xml'),
      'utf8'
    );
    const build = parseBuildFromPobXml(xml);
    expect(build.targetVersion).toBe('3_25');
    expect(build.level).toBe(92);
    expect(build.className).toBe('Witch');
    expect(build.ascendClassName).toBe('Elementalist');
    expect(build.characterLevelAutoMode).toBe(false);
  });
});
