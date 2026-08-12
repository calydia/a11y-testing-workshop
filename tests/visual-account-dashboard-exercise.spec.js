import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { expectStandaloneExercise } from './helpers/standalone-exercise.js';

const exercisePath = '/exercises/finding-visual-problems-in-an-account-dashboard/';
const fixturePath = '/exercise-fixtures/visual-account-dashboard/';

const contrastRatio = (foreground, background) => {
  const channels = (value) => value.match(/[\d.]+/g).slice(0, 3).map(Number);
  const luminance = (value) => {
    const linear = channels(value).map((channel) => {
      const normalized = channel / 255;
      return normalized <= 0.04045 ? normalized / 12.92 : ((normalized + 0.055) / 1.055) ** 2.4;
    });
    return (0.2126 * linear[0]) + (0.7152 * linear[1]) + (0.0722 * linear[2]);
  };
  const values = [luminance(foreground), luminance(background)].sort((a, b) => b - a);
  return (values[0] + 0.05) / (values[1] + 0.05);
};

test('visual dashboard Exercise renders the approved learning structure', async ({ page }) => {
  const response = await page.goto(exercisePath);
  expect(response?.ok()).toBe(true);
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Finding visual problems in an account dashboard');
  await expect(page.getByText('Difficulty: beginner')).toBeVisible();
  await expect(page.getByText('Estimated time: 15 minutes')).toBeVisible();
  for (const heading of ['Objectives', 'Instructions', 'Exercise workspace']) {
    await expect(page.getByRole('heading', { level: 2, name: heading })).toBeVisible();
  }
  await expect(page.locator('details').filter({ hasText: 'Hints' })).toHaveCount(1);
  await expect(page.locator('details').filter({ hasText: 'Solution' })).toHaveCount(1);
  await expect(page.getByRole('link', { name: 'Testing visual accessibility' })).toHaveAttribute('href', '/methods/testing-visual-accessibility/');
});

test('dashboard fixture uses the standalone-first workflow', async ({ page, request }) => {
  await expectStandaloneExercise(page, request, { exercisePath, fixturePath, fixtureTitle: 'Account dashboard visual accessibility exercise' });
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Account overview');
});

test('fixture contains exactly the documented visual review targets', async ({ page }) => {
  await page.goto(fixturePath);
  await expect(page.locator('[data-visual-finding]')).toHaveCount(4);
  await expect(page.locator('[data-visual-finding="low-contrast-text"]')).toHaveCount(1);
  await expect(page.locator('[data-visual-finding="color-only-status"]')).toHaveCount(1);
  await expect(page.locator('[data-visual-finding="cramped-text"]')).toHaveCount(1);
  await expect(page.locator('[data-visual-finding="weak-interaction-state"]')).toHaveCount(1);

  const statuses = page.locator('[data-visual-finding="color-only-status"] [data-status]');
  await expect(statuses).toHaveCount(3);
  await expect(statuses).toHaveText(['Website', 'Mobile app', 'Email service']);

  const denseText = page.locator('[data-visual-finding="cramped-text"]');
  expect(Number.parseFloat(await denseText.evaluate((element) => getComputedStyle(element).lineHeight)))
    .toBeLessThan(Number.parseFloat(await denseText.evaluate((element) => getComputedStyle(element).fontSize)) * 1.2);
});

test('ordinary account note text fails 4.5 to 1 contrast in both themes', async ({ page }) => {
  await page.goto(fixturePath);
  const target = page.locator('[data-visual-finding="low-contrast-text"]');

  for (const theme of ['light', 'dark']) {
    await page.evaluate((selectedTheme) => {
      document.documentElement.classList.remove('light', 'dark');
      document.documentElement.classList.add(selectedTheme);
    }, theme);
    const colors = await target.evaluate((element) => ({
      foreground: getComputedStyle(element).color,
      background: getComputedStyle(document.body).backgroundColor,
    }));
    const ratio = contrastRatio(colors.foreground, colors.background);
    expect(ratio, theme).toBeGreaterThanOrEqual(1.9);
    expect(ratio, theme).toBeLessThanOrEqual(2.15);
  }
});

test('weak-state control remains operable while its visual states stay unchanged', async ({ page }) => {
  await page.goto(fixturePath);
  const control = page.locator('[data-visual-finding="weak-interaction-state"]');
  const status = page.getByRole('status');
  const defaultStyle = await control.evaluate((element) => ({
    background: getComputedStyle(element).backgroundColor,
    border: getComputedStyle(element).borderColor,
    outline: getComputedStyle(element).outlineStyle,
  }));

  await control.hover();
  await expect.poll(() => control.evaluate((element) => getComputedStyle(element).backgroundColor)).toBe(defaultStyle.background);
  await control.focus();
  await expect(control).toBeFocused();
  await expect(control).toHaveCSS('outline-style', defaultStyle.outline);
  await control.press('Enter');
  await expect(status).toHaveText('Report downloaded.');
});

test('standalone fixture follows the selected Lab theme', async ({ page }) => {
  await page.goto(exercisePath);
  await page.evaluate(() => localStorage.setItem('darkMode', 'enabled'));
  await page.goto(fixturePath);
  await expect(page.locator('html')).toHaveClass(/dark/);
  await expect(page.locator('body')).toHaveCSS('font-family', /Atkinson Hyperlegible/);
});

test('Exercise shell passes axe and fixture remains responsive', async ({ page }) => {
  await page.goto(exercisePath);
  const results = await new AxeBuilder({ page }).analyze();
  expect(results.violations).toEqual([]);

  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(exercisePath);
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(390);

  await page.goto(fixturePath);
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(390);
});

test('fixture axe results are limited to the intentional low-contrast text', async ({ page }) => {
  await page.goto(fixturePath);
  const results = await new AxeBuilder({ page }).analyze();

  expect(results.violations.map((violation) => violation.id)).toEqual(['color-contrast']);
  expect(results.violations[0].nodes).toHaveLength(1);
  expect(results.violations[0].nodes[0].target).toEqual(['.account-note']);
});

test('hints are progressive and solution contains four findings', async ({ page }) => {
  await page.goto(exercisePath);
  const hints = page.locator('details').filter({ hasText: 'Hints' });
  const solution = page.locator('details').filter({ hasText: 'Solution' });
  await expect(hints.locator('li')).toHaveCount(3);
  await expect(solution.locator('section')).toHaveCount(4);
  await expect(solution).not.toHaveAttribute('open');
});
