import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { expectStandaloneExercise } from './helpers/standalone-exercise.js';

const exercisePath = '/exercises/comparing-automated-and-manual-findings/';
const fixturePath = '/exercise-fixtures/automated-event-registration/';

test('automated testing Exercise renders its learning structure and fixture', async ({ page, request }) => {
  const response = await page.goto(exercisePath);
  expect(response?.ok()).toBe(true);
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Comparing automated and manual findings');
  await expect(page.getByText('Difficulty: beginner')).toBeVisible();
  await expect(page.getByText('Estimated time: 20 minutes')).toBeVisible();
  await expect(page.getByRole('link', { name: 'Testing with automated tools' })).toHaveAttribute('href', '/methods/testing-with-automated-tools/');
  await expectStandaloneExercise(page, request, { exercisePath, fixturePath, fixtureTitle: 'Event registration automated testing exercise' });
});

test('fixture exposes exactly five documented targets', async ({ page }) => {
  await page.goto(fixturePath);
  await expect(page.locator('[data-automated-finding]')).toHaveCount(5);
  for (const finding of ['unlabelled-email', 'unnamed-button', 'low-contrast-helper', 'pointer-only-session', 'ambiguous-links']) {
    await expect(page.locator(`[data-automated-finding="${finding}"]`)).toHaveCount(1);
  }
});

for (const theme of ['light', 'dark']) {
  test(`axe reports only the three intended automated findings in the ${theme} theme`, async ({ page }) => {
    await page.goto(fixturePath);
    await page.evaluate((selectedTheme) => {
      document.documentElement.classList.remove('light', 'dark');
      document.documentElement.classList.add(selectedTheme);
    }, theme);
    const results = await new AxeBuilder({ page }).analyze();
    expect(results.violations.map((violation) => violation.id).sort()).toEqual(['button-name', 'color-contrast', 'label']);

    const targets = Object.fromEntries(results.violations.map((violation) => [violation.id, violation.nodes.flatMap((node) => node.target)]));
    expect(targets['button-name']).toEqual(['#remove-saved-session']);
    expect(targets['color-contrast']).toEqual(['.registration-helper']);
    expect(targets.label).toEqual(['#registration-email']);
  });
}

test('custom session control works with a pointer but is skipped by keyboard navigation', async ({ page }) => {
  await page.goto(fixturePath);
  const customControl = page.locator('[data-automated-finding="pointer-only-session"]');
  await expect(customControl).toHaveText('Choose this session');
  await customControl.click();
  await expect(customControl).toHaveText('Session chosen');

  await page.reload();
  const focusedIds = [];
  for (let index = 0; index < 12; index += 1) {
    await page.keyboard.press('Tab');
    focusedIds.push(await page.evaluate(() => document.activeElement?.id || ''));
  }
  expect(focusedIds).not.toContain('choose-session');
});

test('repeated links have indistinguishable names but different destinations', async ({ page }) => {
  await page.goto(fixturePath);
  const links = page.locator('[data-automated-finding="ambiguous-links"] a');
  await expect(links).toHaveCount(2);
  await expect(links).toHaveText(['Read more', 'Read more']);
  await expect(links.nth(0)).toHaveAttribute('href', '#inclusive-design-session');
  await expect(links.nth(1)).toHaveAttribute('href', '#accessible-content-session');
});

test('unaffected controls remain operable and standalone theme is retained', async ({ page }) => {
  await page.goto(exercisePath);
  await page.evaluate(() => localStorage.setItem('darkMode', 'enabled'));
  await page.goto(fixturePath);
  await expect(page.locator('html')).toHaveClass(/dark/);
  const submit = page.getByRole('button', { name: 'Register for event' });
  await submit.focus();
  await expect(submit).toHaveCSS('outline-style', 'solid');
  await submit.press('Enter');
  await expect(page.getByRole('status')).toHaveText('Registration submitted.');
});

test('outer Exercise shell passes axe and fixture remains usable at a narrow width', async ({ page }) => {
  await page.goto(exercisePath);
  expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
  await page.setViewportSize({ width: 390, height: 844 });
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(390);
  await page.goto(fixturePath);
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(390);
});

test('hints remain progressive and solution lists five findings', async ({ page }) => {
  await page.goto(exercisePath);
  const hints = page.locator('details').filter({ hasText: 'Hints' });
  const solution = page.locator('details').filter({ hasText: 'Solution' });
  await expect(hints.locator('li')).toHaveCount(3);
  await expect(solution.locator('section')).toHaveCount(5);
  await expect(solution).not.toHaveAttribute('open');
});
