import { test, expect } from '@playwright/test';

test('exercise section explains the practice model without exposing fixture routes', async ({ page, request }) => {
  await page.goto('/exercises/');

  await expect(page.getByRole('heading', { level: 1, name: 'Exercises' })).toBeVisible();
  await expect(page.getByText(/deliberately created examples/i)).toBeVisible();

  const unknownFixture = await request.get('/exercise-fixtures/not-a-fixture/');
  expect(unknownFixture.status()).toBe(404);
});

test('section state is separate from exact-page current state', async ({ page }) => {
  await page.goto('/exercises/');
  const link = page.getByRole('navigation', { name: 'Main' }).getByRole('link', { name: 'Exercises' });

  await expect(link).toHaveAttribute('aria-current', 'page');
  await expect(link).toHaveAttribute('data-current-section', 'true');
});

test('exercise listing contains the keyboard preferences form exercise', async ({ page }) => {
  await page.goto('/exercises/');

  await expect(page.getByText('No published content is available in this section yet.')).toHaveCount(0);
  await expect(page.getByRole('link', { name: 'Keyboard testing a preferences form' })).toHaveAttribute('href', '/exercises/keyboard-testing-a-preferences-form/');
});
