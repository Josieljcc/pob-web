/**
 * PoB build aggregate — Phase 1 subset aligned with {@link https://github.com/PathOfBuildingCommunity/PathOfBuilding/blob/master/src/Modules/Build.lua Build.lua}
 * `Load` / `Save` for the `<Build>` element attributes (no child nodes in this subset).
 */
export type Build = Readonly<{
  targetVersion: string;
  level: number;
  viewMode: string | undefined;
  className: string | undefined;
  ascendClassName: string | undefined;
  bandit: string;
  pantheonMajorGod: string;
  pantheonMinorGod: string;
  mainSocketGroup: number;
  characterLevelAutoMode: boolean;
}>;

export function createDefaultBuild(overrides?: Partial<Build>): Build {
  return {
    targetVersion: '3_25',
    level: 1,
    viewMode: 'IMPORT',
    className: 'Witch',
    ascendClassName: 'Elementalist',
    bandit: 'None',
    pantheonMajorGod: 'None',
    pantheonMinorGod: 'None',
    mainSocketGroup: 1,
    characterLevelAutoMode: false,
    ...overrides
  };
}

export function buildsEqual(a: Build, b: Build): boolean {
  return (
    a.targetVersion === b.targetVersion &&
    a.level === b.level &&
    a.viewMode === b.viewMode &&
    a.className === b.className &&
    a.ascendClassName === b.ascendClassName &&
    a.bandit === b.bandit &&
    a.pantheonMajorGod === b.pantheonMajorGod &&
    a.pantheonMinorGod === b.pantheonMinorGod &&
    a.mainSocketGroup === b.mainSocketGroup &&
    a.characterLevelAutoMode === b.characterLevelAutoMode
  );
}
