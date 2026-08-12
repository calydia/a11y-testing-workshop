import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { expectStandaloneExercise } from './helpers/standalone-exercise.js';

const exercisePath = '/exercises/testing-an-appointment-booking-at-high-zoom/';
const fixturePath = '/exercise-fixtures/zoom-appointment-booking/';

test('zoom Exercise renders its learning structure and fixture', async ({ page, request }) => {
  const response = await page.goto(exercisePath);
  expect(response?.ok()).toBe(true);
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Testing an appointment booking at high zoom');
  await expect(page.getByText('Difficulty: beginner')).toBeVisible();
  await expect(page.getByText('Estimated time: 20 minutes')).toBeVisible();
  await expect(page.getByRole('link', { name: 'Testing zoom and reflow' })).toHaveAttribute('href', '/methods/testing-zoom-and-reflow/');
  await expectStandaloneExercise(page, request, { exercisePath, fixturePath, fixtureTitle: 'Appointment booking zoom and reflow exercise' });
});

test('fixture exposes exactly four intentional targets', async ({ page }) => {
  await page.goto(fixturePath);
  await expect(page.locator('[data-zoom-finding]')).toHaveCount(4);
  for (const finding of ['fixed-panel', 'unbreakable-reference', 'fixed-height-card', 'fixed-action-bar']) {
    await expect(page.locator(`[data-zoom-finding="${finding}"]`)).toHaveCount(1);
  }
});

test('320 CSS pixel condition produces the intended overflow and overlap', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 640 });
  await page.goto(fixturePath);
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeGreaterThan(320);

  const reference = page.locator('[data-zoom-finding="unbreakable-reference"]');
  expect(await reference.evaluate((element) => element.scrollWidth)).toBeGreaterThan(await reference.evaluate((element) => element.clientWidth));

  const obscuredTarget = page.locator('[data-obscured-target]');
  await obscuredTarget.evaluate((element) => element.scrollIntoView({ block: 'end' }));
  const bar = await page.locator('[data-zoom-finding="fixed-action-bar"]').boundingBox();
  const obscured = await obscuredTarget.boundingBox();
  expect(bar.y).toBeLessThan(obscured.y + obscured.height);
  expect(bar.y + bar.height).toBeGreaterThan(obscured.y);
});

test('200 percent text resize clips the fixed-height appointment card', async ({ page }) => {
  await page.goto(fixturePath);
  const card = page.locator('[data-zoom-finding="fixed-height-card"]');
  expect(await card.evaluate((element) => element.scrollHeight)).toBeLessThanOrEqual(await card.evaluate((element) => element.clientHeight));
  await page.addStyleTag({ content: 'html { font-size: 200% !important; }' });
  expect(await card.evaluate((element) => element.scrollHeight)).toBeGreaterThan(await card.evaluate((element) => element.clientHeight));
});

test('fixed action bar does not obscure content at the normal desktop condition', async ({ page }) => {
  await page.setViewportSize({ width: 900, height: 900 });
  await page.goto(fixturePath);
  await expect(page.locator('[data-zoom-finding="fixed-action-bar"]')).toHaveCSS('position', 'static');
});

test('unaffected controls remain operable and standalone fixture uses saved theme', async ({ page }) => {
  await page.goto(exercisePath);
  await page.evaluate(() => localStorage.setItem('darkMode', 'enabled'));
  await page.goto(fixturePath);
  await expect(page.locator('html')).toHaveClass(/dark/);
  const button = page.getByRole('button', { name: 'Confirm appointment' });
  await button.focus();
  await expect(button).toHaveCSS('outline-style', 'solid');
  await button.press('Enter');
  await expect(page.getByRole('status')).toHaveText('Appointment confirmed.');
});

test('shell and standalone fixture have no unrelated axe violations', async ({ page }) => {
  await page.goto(exercisePath);
  expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
  await page.goto(fixturePath);
  expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
});

test('hints remain progressive and solution lists four findings', async ({ page }) => {
  await page.goto(exercisePath);
  const hints = page.locator('details').filter({ hasText: 'Hints' });
  const solution = page.locator('details').filter({ hasText: 'Solution' });
  await expect(hints.locator('li')).toHaveCount(3);
  await expect(solution.locator('section')).toHaveCount(4);
  await expect(solution).not.toHaveAttribute('open');
});
