import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { expectStandaloneExercise } from './helpers/standalone-exercise.js';

const exercisePath = '/exercises/reviewing-icons-and-svgs-in-a-community-events-dashboard/';
const fixturePath = '/exercise-fixtures/community-events-dashboard/';

test('icons and SVGs Exercise renders its learning structure and fixture', async ({ page, request }) => {
  const response = await page.goto(exercisePath);
  expect(response?.ok()).toBe(true);
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Reviewing icons and SVGs in a community events dashboard');
  await expect(page.getByText('Difficulty: beginner')).toBeVisible();
  await expect(page.getByText('Estimated time: 20 minutes')).toBeVisible();
  await expect(page.getByRole('link', { name: 'Testing icons and SVGs with a screen reader' })).toHaveAttribute('href', '/methods/screen-reader-icons-and-svg/');
  await expectStandaloneExercise(page, request, {
    exercisePath,
    fixturePath,
    fixtureTitle: 'Community events dashboard icons and SVGs exercise',
  });
});

test('fixture exposes the five approved icon and SVG patterns', async ({ page }) => {
  await page.goto(fixturePath);
  await expect(page.locator('[data-event-graphic="availability"]')).toHaveAccessibleName('');
  await expect(page.locator('[data-event-graphic="online"]')).toHaveAccessibleName('Icon');
  await expect(page.locator('[data-event-action="save"]')).toHaveAccessibleName('Star Save event');
  await expect(page.locator('[data-event-action="remove"]')).toHaveAccessibleName('');
  await expect(page.locator('[data-event-action="download"]')).toHaveAccessibleName('Download Download schedule');
});

test('fixture preserves four valid comparisons', async ({ page }) => {
  await page.goto(fixturePath);
  await expect(page.locator('[data-summary-graphic]')).toHaveAccessibleName('Three saved events');
  await expect(page.locator('[data-calendar-icon]')).toHaveAttribute('aria-hidden', 'true');
  await expect(page.locator('[data-event-action="add"]')).toHaveAccessibleName('Add neighbourhood gardening workshop to saved events');
  await expect(page.getByRole('link', { name: 'View event details', exact: true })).toHaveAttribute('href', '#repair-cafe-details');
});

test('native controls work with keyboard input and expose visible focus', async ({ page }) => {
  await page.goto(fixturePath);
  const addButton = page.locator('[data-event-action="add"]');
  await addButton.focus();
  await expect(addButton).toBeFocused();
  await expect(addButton).toHaveCSS('outline-style', 'solid');
  await page.keyboard.press('Enter');
  await expect(page.getByRole('status')).toHaveText('Gardening workshop added to this practice dashboard.');
});

test('axe reports only the unnamed graphic and unnamed button', async ({ page }) => {
  await page.goto(fixturePath);
  const results = await new AxeBuilder({ page }).analyze();
  expect(results.violations.map(({ id }) => id).sort()).toEqual(['button-name', 'svg-img-alt']);
  expect(results.violations.find(({ id }) => id === 'button-name').nodes).toHaveLength(1);
  expect(results.violations.find(({ id }) => id === 'svg-img-alt').nodes).toHaveLength(1);
});

test('outer shell passes axe, fixture follows theme, and both pages fit a narrow viewport', async ({ page }) => {
  await page.goto(exercisePath);
  expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
  await page.evaluate(() => localStorage.setItem('darkMode', 'enabled'));
  await page.setViewportSize({ width: 390, height: 844 });
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(390);
  await page.goto(fixturePath);
  await expect(page.locator('html')).toHaveClass(/dark/);
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(390);
});

test('fixture markup uses inline SVGs without exposing answer labels', async ({ page }) => {
  await page.goto(fixturePath);
  await expect(page.locator('svg')).toHaveCount(10);
  await expect(page.locator('img')).toHaveCount(0);
  const html = await page.locator('html').innerHTML();
  expect(html).not.toMatch(/intentional.finding|finding.count|model.answer|diagnostic/i);
});

test('hints remain progressive and solution lists five findings', async ({ page }) => {
  await page.goto(exercisePath);
  const hints = page.locator('details').filter({ hasText: 'Hints' });
  const solution = page.locator('details').filter({ hasText: 'Solution' });
  await expect(hints.locator('li')).toHaveCount(3);
  await expect(solution.locator('section')).toHaveCount(5);
  await expect(solution).not.toHaveAttribute('open');
});
