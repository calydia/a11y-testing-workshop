// @ts-check
import { test, expect } from './helpers/test.js';

test('has title', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/Accessibility Testing Lab/);
});
