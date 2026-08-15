import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { expectStandaloneExercise } from './helpers/standalone-exercise.js';

const methodPath = '/methods/testing-controls-with-a-screen-reader/';
const exercisePath = '/exercises/testing-controls-in-a-community-events-finder/';
const fixturePath = '/exercise-fixtures/community-events-finder/';

test('controls method and Exercise render their paired learning contract', async ({ page, request }) => {
  await page.goto(methodPath);
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Testing controls with a screen reader');
  await expect(page.getByText('Estimated time: 25 minutes')).toBeVisible();
  await expect(page.getByRole('link', { name: 'Testing controls in a community events finder' })).toHaveAttribute('href', exercisePath);

  await page.goto(exercisePath);
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Testing controls in a community events finder');
  await expect(page.getByRole('link', { name: 'Testing controls with a screen reader' })).toHaveAttribute('href', methodPath);
  await expectStandaloneExercise(page, request, { exercisePath, fixturePath, fixtureTitle: 'Community events finder controls exercise' });
});

test('fixture exposes the five approved findings and passing comparisons', async ({ page }) => {
  await page.goto(fixturePath);
  const disclosure = page.locator('#filter-toggle');
  await disclosure.click();
  await expect(page.locator('#event-filters')).toBeVisible();
  await expect(disclosure).toHaveAttribute('aria-expanded', 'false');

  await expect(page.locator('#repair-details')).toHaveRole('button');
  await expect(page.getByRole('link', { name: 'View event details' })).toHaveAttribute('href', '#garden-details');

  const saveSwitch = page.locator('#repair-save');
  await expect(saveSwitch).toHaveRole('switch');
  await saveSwitch.focus();
  await page.keyboard.press('Space');
  await expect(saveSwitch).toHaveText('Repair café saved');
  await expect(saveSwitch).toHaveAttribute('aria-checked', 'false');
  await expect(page.locator('#garden-save')).toHaveAccessibleName('Bookmark item');

  const learning = page.getByRole('checkbox', { name: 'Learning' });
  await learning.check();
  await expect(learning).toBeChecked();
  await expect(page.locator('#result-count')).toHaveText('1 event found');
  await expect(page.locator('#result-count')).not.toHaveAttribute('role');
  await expect(page.locator('#result-count')).not.toHaveAttribute('aria-live');

  const compact = page.getByRole('radio', { name: 'Compact' });
  await compact.check();
  await expect(compact).toBeChecked();
});

test('fixture remains usable, themed, responsive, and free of unrelated axe findings', async ({ page }) => {
  await page.goto(fixturePath);
  expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
  await page.evaluate(() => localStorage.setItem('darkMode', 'enabled'));
  await page.setViewportSize({ width: 390, height: 844 });
  await page.reload();
  await expect(page.locator('html')).toHaveClass(/dark/);
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(390);
  const button = page.locator('#filter-toggle');
  await button.focus();
  await expect(button).toHaveCSS('outline-style', 'solid');
});

test('fixture does not expose answers and Exercise keeps progressive disclosure', async ({ page }) => {
  await page.goto(fixturePath);
  const html = await page.locator('body').innerHTML();
  expect(html).not.toMatch(/intentional.finding|finding.count|model.answer|diagnostic|solution/i);

  await page.goto(exercisePath);
  const hints = page.locator('details').filter({ hasText: 'Hints' });
  const solution = page.locator('details').filter({ hasText: 'Solution' });
  await expect(hints.locator('li')).toHaveCount(3);
  await expect(solution.locator('section')).toHaveCount(5);
  await expect(solution).not.toHaveAttribute('open');
});
