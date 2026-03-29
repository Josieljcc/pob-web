import { test, expect } from '@playwright/test';

test.describe('passive tree demo', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/passive-tree');
    await page.evaluate(() =>
      localStorage.removeItem('pob-web-passive-allocation-v1')
    );
    await page.reload();
  });

  test('allocate node and persist after reload', async ({ page }) => {
    await expect(page.getByTestId('allocated-count')).toHaveText('1');
    await page.getByRole('button', { name: 'Allocate node 2' }).click();
    await expect(page.getByTestId('allocated-count')).toHaveText('2');

    const key = 'pob-web-passive-allocation-v1';
    const afterClick = await page.evaluate((k) => localStorage.getItem(k), key);
    expect(afterClick).toBeTruthy();
    if (!afterClick) {
      throw new Error('expected localStorage after allocate');
    }
    const afterClickAlloc = JSON.parse(afterClick).allocated as number[];
    expect([...afterClickAlloc].sort((a, b) => a - b)).toEqual([1, 2]);

    await page.reload();

    const afterReload = await page.evaluate(
      (k) => localStorage.getItem(k),
      key
    );
    expect(afterReload).toBeTruthy();
    if (!afterReload) {
      throw new Error('expected localStorage after reload');
    }
    const afterReloadAlloc = JSON.parse(afterReload).allocated as number[];
    expect([...afterReloadAlloc].sort((a, b) => a - b)).toEqual([1, 2]);

    await expect(page.getByTestId('allocated-count')).toHaveText('2');
  });
});
