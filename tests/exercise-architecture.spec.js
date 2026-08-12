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

test('exercise listing contains published exercises in collection order', async ({ page }) => {
  await page.goto('/exercises/');

  await expect(page.getByText('No published content is available in this section yet.')).toHaveCount(0);
  const links = page.locator('main article h2 > a');
  await expect(links).toHaveText([
    'Keyboard testing a preferences form',
    'Finding visual problems in an account dashboard',
    'Testing an appointment booking at high zoom',
    'Comparing automated and manual findings',
    'Evaluating image alternative text in context',
    'Testing a community-course registration form',
  ]);
  await expect(links.nth(0)).toHaveAttribute('href', '/exercises/keyboard-testing-a-preferences-form/');
  await expect(links.nth(1)).toHaveAttribute('href', '/exercises/finding-visual-problems-in-an-account-dashboard/');
  await expect(links.nth(2)).toHaveAttribute('href', '/exercises/testing-an-appointment-booking-at-high-zoom/');
  await expect(links.nth(3)).toHaveAttribute('href', '/exercises/comparing-automated-and-manual-findings/');
  await expect(links.nth(4)).toHaveAttribute('href', '/exercises/evaluating-image-alternative-text-in-context/');
  await expect(links.nth(5)).toHaveAttribute('href', '/exercises/testing-a-community-course-registration-form/');
});
