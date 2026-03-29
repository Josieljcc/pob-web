import { render, screen } from '@testing-library/react';

import { passiveAllocationToJson } from '@pob-web/domain';

import { PassiveTreePage } from './passive-tree-page';
import { PASSIVE_ALLOCATION_STORAGE_KEY } from './passive-tree-storage';

describe('PassiveTreePage', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  /**
   * Regression: a “load” effect after initial render + “save” effect on mount
   * could write the default allocation before hydration, wiping localStorage.
   * State must be initialised synchronously from storage so the first paint matches persisted data.
   */
  it('shows persisted allocated count on first render when localStorage already has data', () => {
    localStorage.setItem(
      PASSIVE_ALLOCATION_STORAGE_KEY,
      passiveAllocationToJson({
        startNodeId: 1,
        allocated: new Set([1, 2])
      })
    );
    render(<PassiveTreePage />);
    expect(screen.getByTestId('allocated-count').textContent).toBe('2');
  });
});
