import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen, waitFor } from '@testing-library/react';

import {
  minimalPassiveTreeJson,
  passiveAllocationToJson
} from '@pob-web/domain';

import { PassiveTreePage } from './passive-tree-page';
import { PASSIVE_ALLOCATION_STORAGE_KEY } from './passive-tree-storage';

function createTestQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        retry: false
      }
    }
  });
}

describe('PassiveTreePage', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.stubGlobal(
      'fetch',
      vi.fn(async (input: RequestInfo | URL) => {
        const u = String(input);
        if (u.includes('/tree-data/') && u.includes('tree.json')) {
          return new Response(minimalPassiveTreeJson, {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
          });
        }
        return new Response('not found', { status: 404 });
      })
    );
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  /**
   * Regression: a “load” effect after initial render + “save” effect on mount
   * could write the default allocation before hydration, wiping localStorage.
   * State must be initialised synchronously from storage so the first paint matches persisted data.
   */
  it('shows persisted allocated count after tree loads when localStorage already has data', async () => {
    localStorage.setItem(
      PASSIVE_ALLOCATION_STORAGE_KEY,
      passiveAllocationToJson({
        startNodeId: 1,
        allocated: new Set([1, 2])
      })
    );
    const client = createTestQueryClient();
    render(
      <QueryClientProvider client={client}>
        <PassiveTreePage />
      </QueryClientProvider>
    );
    await waitFor(() => {
      expect(screen.getByTestId('allocated-count').textContent).toBe('2');
    });
  });
});
