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
    'Testing text spacing on a community-services page',
    'Testing an appointment booking at high zoom',
    'Comparing automated and manual findings',
    'Reviewing structure and links in a community resources directory',
    'Testing a community-course timetable with a screen reader',
    'Testing controls in a community events finder',
    'Evaluating image alternative text in context',
    'Reviewing icons and SVGs in a community events dashboard',
    'Testing language changes on a community library noticeboard',
    'Testing modal dialogs in account settings',
    'Testing a community-course registration form',
  ]);
  await expect(links.nth(0)).toHaveAttribute('href', '/exercises/keyboard-testing-a-preferences-form/');
  await expect(links.nth(1)).toHaveAttribute('href', '/exercises/finding-visual-problems-in-an-account-dashboard/');
  await expect(links.nth(2)).toHaveAttribute('href', '/exercises/testing-text-spacing-on-a-community-services-page/');
  await expect(links.nth(3)).toHaveAttribute('href', '/exercises/testing-an-appointment-booking-at-high-zoom/');
  await expect(links.nth(4)).toHaveAttribute('href', '/exercises/comparing-automated-and-manual-findings/');
  await expect(links.nth(5)).toHaveAttribute('href', '/exercises/reviewing-structure-and-links-in-a-community-resources-directory/');
  await expect(links.nth(6)).toHaveAttribute('href', '/exercises/testing-a-community-course-timetable-with-a-screen-reader/');
  await expect(links.nth(7)).toHaveAttribute('href', '/exercises/testing-controls-in-a-community-events-finder/');
  await expect(links.nth(8)).toHaveAttribute('href', '/exercises/evaluating-image-alternative-text-in-context/');
  await expect(links.nth(9)).toHaveAttribute('href', '/exercises/reviewing-icons-and-svgs-in-a-community-events-dashboard/');
  await expect(links.nth(10)).toHaveAttribute('href', '/exercises/testing-language-changes-on-a-community-library-noticeboard/');
  await expect(links.nth(11)).toHaveAttribute('href', '/exercises/testing-modal-dialogs-in-account-settings/');
  await expect(links.nth(12)).toHaveAttribute('href', '/exercises/testing-a-community-course-registration-form/');
});
