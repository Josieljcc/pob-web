import { test, expect } from '@playwright/test';

test('smoke button is visible', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('button', { name: 'Smoke UI' })).toBeVisible();
});
