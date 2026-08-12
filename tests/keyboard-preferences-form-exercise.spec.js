import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { expectStandaloneExercise } from './helpers/standalone-exercise.js';

const exercisePath = '/exercises/keyboard-testing-a-preferences-form/';
const fixturePath = '/exercise-fixtures/keyboard-preferences-form/';

test('keyboard preferences Exercise renders its learning structure', async ({ page }) => {
  const response = await page.goto(exercisePath);
  expect(response?.ok()).toBe(true);

  await expect(page.getByRole('heading', { level: 1, name: 'Keyboard testing a preferences form' })).toBeVisible();
  await expect(page.getByText('Difficulty: beginner')).toBeVisible();
  await expect(page.getByText('Estimated time: 15 minutes')).toBeVisible();
  for (const heading of ['Objectives', 'Instructions', 'Exercise workspace']) {
    await expect(page.getByRole('heading', { level: 2, name: heading })).toBeVisible();
  }
  await expect(page.getByText('Hints', { exact: true })).toBeVisible();
  await expect(page.getByText('Solution', { exact: true })).toBeVisible();

  const breadcrumb = page.getByRole('navigation', { name: 'Breadcrumbs' }).getByRole('listitem');
  await expect(breadcrumb).toHaveText(['Home/', 'Exercises/', 'Keyboard testing a preferences form']);
  await expect(breadcrumb.last()).toHaveAttribute('aria-current', 'page');

  const sectionNavigation = page.getByRole('navigation', { name: 'Exercises' });
  await expect(sectionNavigation.getByRole('link', { name: 'Keyboard testing a preferences form' })).toHaveAttribute('aria-current', 'page');
});

test('document fixture uses the standalone-first workflow', async ({ page, request }) => {
  await expectStandaloneExercise(page, request, { exercisePath, fixturePath, fixtureTitle: 'Communication preferences form exercise' });
  await expect(page).toHaveTitle('Communication preferences form exercise');
  await expect(page.getByRole('heading', { level: 1, name: 'Communication preferences' })).toBeVisible();
});

test('Start exercise has visible hover and keyboard-focus treatments', async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem('darkMode', 'disabled'));
  await page.goto(exercisePath);
  const start = page.getByRole('link', { name: 'Start exercise' });

  const defaultBackground = await start.evaluate((element) => getComputedStyle(element).backgroundColor);
  await start.hover();
  await expect.poll(() => start.evaluate((element) => getComputedStyle(element).backgroundColor)).not.toBe(defaultBackground);

  await start.focus();
  await expect(start).toBeFocused();
  await expect(start).toHaveCSS('outline-style', 'solid');
  await expect(start).toHaveCSS('outline-width', '2px');
});

test('fixture preserves the seeded focus order and skipped click-only control', async ({ page }) => {
  await page.goto(fixturePath);

  await page.keyboard.press('Tab');
  await expect(page.locator('#save-preferences')).toBeFocused();
  await page.keyboard.press('Tab');
  await expect(page.locator('#email')).toBeFocused();

  const focusedIds = [];
  for (let index = 0; index < 12; index += 1) {
    focusedIds.push(await page.evaluate(() => document.activeElement?.id));
    await page.keyboard.press('Tab');
  }
  expect(focusedIds).not.toContain('preview-preferences');
});

test('custom control supports pointer activation but not keyboard activation', async ({ page }) => {
  await page.goto(fixturePath);
  const control = page.locator('#delivery-frequency');

  await control.focus();
  await page.keyboard.press('Enter');
  await expect(control).toHaveAttribute('aria-pressed', 'false');
  await page.keyboard.press('Space');
  await expect(control).toHaveAttribute('aria-pressed', 'false');

  await control.click();
  await expect(control).toHaveAttribute('aria-pressed', 'true');
});

test('one operable control intentionally has no visible focus indicator', async ({ page }) => {
  await page.goto(fixturePath);
  const control = page.locator('#show-delivery-help');

  await control.focus();
  await expect(control).toBeFocused();
  await expect(control).toHaveCSS('outline-style', 'none');
  await expect(control).toHaveCSS('box-shadow', 'none');

  await page.keyboard.press('Enter');
  await expect(control).toHaveAttribute('aria-expanded', 'true');
});

test('hints stay progressive and the solution contains four findings', async ({ page }) => {
  await page.goto(exercisePath);

  const hints = page.locator('details').filter({ hasText: 'Hints' });
  await expect(hints.locator('li')).toHaveCount(3);
  const solution = page.locator('details').filter({ hasText: 'Solution' });
  await expect(solution.locator('h3')).toHaveCount(4);
});

test('Exercise shell passes axe while fixture defects stay narrowly documented', async ({ page }) => {
  await page.goto(exercisePath);
  const shellResults = await new AxeBuilder({ page }).analyze();
  expect(shellResults.violations).toEqual([]);

  await page.goto(fixturePath);
  const fixtureResults = await new AxeBuilder({ page }).analyze();
  expect(fixtureResults.violations.map((violation) => violation.id)).toEqual(['tabindex']);
  expect(fixtureResults.violations[0].nodes).toHaveLength(2);
});

test('fixture and Exercise remain usable at a narrow viewport', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(exercisePath);
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(390);

  await page.goto(fixturePath);
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(390);
});

test('standalone fixture uses the selected Lab theme', async ({ page }) => {
  await page.goto(exercisePath);
  await page.evaluate(() => localStorage.setItem('darkMode', 'enabled'));
  await page.goto(fixturePath);
  await expect(page.locator('html')).toHaveClass(/dark/);
  await expect(page.locator('body')).toHaveCSS('background-color', 'rgb(1, 0, 23)');
  await page.evaluate(() => localStorage.setItem('darkMode', 'disabled'));
  await page.goto(fixturePath);
  await expect(page.locator('html')).toHaveClass(/light/);
  await expect(page.locator('body')).toHaveCSS('background-color', 'rgb(250, 250, 250)');
});

for (const label of ['Hints', 'Solution']) {
  test(`${label} disclosure has full-row hover and focus interactions`, async ({ page }) => {
    await page.addInitScript(() => localStorage.setItem('darkMode', 'disabled'));
    await page.goto(exercisePath);

    const summary = page.locator('summary', { hasText: label });
    const disclosure = summary.locator('xpath=..');
    const [summaryBox, disclosureBox] = await Promise.all([summary.boundingBox(), disclosure.boundingBox()]);
    expect(Math.abs(summaryBox.x - disclosureBox.x)).toBeLessThanOrEqual(2);
    expect(Math.abs((summaryBox.x + summaryBox.width) - (disclosureBox.x + disclosureBox.width))).toBeLessThanOrEqual(2);

    const defaultBackground = await summary.evaluate((element) => getComputedStyle(element).backgroundColor);
    await summary.hover();
    await expect.poll(() => summary.evaluate((element) => getComputedStyle(element).backgroundColor)).not.toBe(defaultBackground);

    await summary.focus();
    await expect(summary).toBeFocused();
    await expect(summary).toHaveCSS('outline-style', 'solid');
    await expect(summary).toHaveCSS('outline-width', '2px');
    expect(await summary.evaluate((element) => getComputedStyle(element, '::marker').display)).not.toBe('none');

    await page.keyboard.press('Enter');
    await expect(disclosure).toHaveAttribute('open', '');
  });
}

test('Exercise disclosure hover treatment follows the dark theme', async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem('darkMode', 'enabled'));
  await page.goto(exercisePath);
  const summary = page.locator('summary', { hasText: 'Hints' });

  await summary.hover();
  await expect(summary).toHaveCSS('background-color', 'rgb(7, 0, 56)');
});
