import {
  DEFAULT_PASSIVE_TREE_VERSION,
  passiveTreeJsonAssetPath
} from './passive-tree-version.js';

describe('passiveTreeJsonAssetPath', () => {
  it('builds static path for default version', () => {
    expect(passiveTreeJsonAssetPath(DEFAULT_PASSIVE_TREE_VERSION)).toBe(
      '/tree-data/3_25/tree.json'
    );
  });

  it('encodes version segments', () => {
    expect(passiveTreeJsonAssetPath('3_25/x')).toBe(
      '/tree-data/3_25%2Fx/tree.json'
    );
  });
});
