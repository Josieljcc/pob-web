import { minimalPassiveTreeJson } from '@pob-web/domain';

import { fetchPassiveTreeDataForVersion } from './passive-tree-versioned-asset.js';

describe('fetchPassiveTreeDataForVersion', () => {
  it('parses JSON from a mocked 200 response', async () => {
    const fetchFn = async (url: string | URL | Request) => {
      expect(String(url)).toContain('/tree-data/3_25/tree.json');
      return new Response(minimalPassiveTreeJson, {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    };
    const data = await fetchPassiveTreeDataForVersion('3_25', {
      origin: 'http://localhost:4200',
      fetchFn: fetchFn as typeof fetch
    });
    expect(Object.keys(data.nodes).length).toBe(4);
  });

  it('throws on non-OK response', async () => {
    const fetchFn = async () => new Response('no', { status: 404 });
    await expect(
      fetchPassiveTreeDataForVersion('3_25', {
        origin: 'http://localhost:4200',
        fetchFn: fetchFn as typeof fetch
      })
    ).rejects.toThrow(/HTTP 404/);
  });
});
