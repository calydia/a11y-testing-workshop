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
  const links = page.locator('main article h3 > a');
  await expect(links).toHaveText([
    'Keyboard testing a preferences form',
    'Finding visual problems in an account dashboard',
    'Comparing automated and manual findings',
    'Testing text spacing on a community-services page',
    'Testing forced colors in a journey planner',
    'Testing motion preferences on a parcel-tracking dashboard',
    'Testing touch interaction on a community-festival map',
    'Testing an appointment booking at high zoom',
    'Testing a community announcement video',
    'Reviewing structure and links in a community resources directory',
    'Testing a community-course timetable with a screen reader',
    'Evaluating image alternative text in context',
    'Reviewing icons and SVGs in a community events dashboard',
    'Testing language changes on a community library noticeboard',
    'Testing controls in a community events finder',
    'Testing modal dialogs in account settings',
    'Testing a community-course registration form',
    'Testing status messages in a community activities search',
    'Testing session timeout in a community-support application',
    'Testing authentication for a community-services booking',
  ]);
  await expect(links.nth(0)).toHaveAttribute('href', '/exercises/keyboard-testing-a-preferences-form/');
  await expect(links.nth(1)).toHaveAttribute('href', '/exercises/finding-visual-problems-in-an-account-dashboard/');
  await expect(links.nth(2)).toHaveAttribute('href', '/exercises/comparing-automated-and-manual-findings/');
  await expect(links.nth(3)).toHaveAttribute('href', '/exercises/testing-text-spacing-on-a-community-services-page/');
  await expect(links.nth(4)).toHaveAttribute('href', '/exercises/testing-forced-colors-in-a-journey-planner/');
  await expect(links.nth(5)).toHaveAttribute('href', '/exercises/testing-motion-preferences-on-a-parcel-tracking-dashboard/');
  await expect(links.nth(6)).toHaveAttribute('href', '/exercises/testing-touch-interaction-on-a-community-festival-map/');
  await expect(links.nth(7)).toHaveAttribute('href', '/exercises/testing-an-appointment-booking-at-high-zoom/');
  await expect(links.nth(8)).toHaveAttribute('href', '/exercises/testing-a-community-announcement-video/');
  await expect(links.nth(9)).toHaveAttribute('href', '/exercises/reviewing-structure-and-links-in-a-community-resources-directory/');
  await expect(links.nth(10)).toHaveAttribute('href', '/exercises/testing-a-community-course-timetable-with-a-screen-reader/');
  await expect(links.nth(11)).toHaveAttribute('href', '/exercises/evaluating-image-alternative-text-in-context/');
  await expect(links.nth(12)).toHaveAttribute('href', '/exercises/reviewing-icons-and-svgs-in-a-community-events-dashboard/');
  await expect(links.nth(13)).toHaveAttribute('href', '/exercises/testing-language-changes-on-a-community-library-noticeboard/');
  await expect(links.nth(14)).toHaveAttribute('href', '/exercises/testing-controls-in-a-community-events-finder/');
  await expect(links.nth(15)).toHaveAttribute('href', '/exercises/testing-modal-dialogs-in-account-settings/');
  await expect(links.nth(16)).toHaveAttribute('href', '/exercises/testing-a-community-course-registration-form/');
  await expect(links.nth(17)).toHaveAttribute('href', '/exercises/testing-status-messages-in-a-community-activities-search/');
  await expect(links.nth(18)).toHaveAttribute('href', '/exercises/testing-session-timeout-in-a-community-support-application/');
  await expect(links.nth(19)).toHaveAttribute('href', '/exercises/testing-authentication-for-a-community-services-booking/');
});

test('exercise detail navigation shows its current area and links to other areas', async ({ page }) => {
  await page.goto('/exercises/testing-modal-dialogs-in-account-settings/');
  const navigation = page.getByRole('navigation', { name: 'Exercises' });

  await expect(navigation.getByRole('heading', { level: 3, name: 'Interaction and tasks' })).toBeVisible();
  await expect(navigation.getByRole('link', { name: 'Testing modal dialogs in account settings' })).toHaveAttribute('aria-current', 'page');
  await expect(navigation.getByRole('link', { name: 'Keyboard testing a preferences form' })).toHaveCount(0);
  await expect(navigation.getByRole('link', { name: 'Foundations' })).toHaveAttribute('href', '/exercises/#foundations');
  await expect(navigation.getByRole('link', { name: 'Foundations' })).not.toHaveAttribute('aria-current');
});
