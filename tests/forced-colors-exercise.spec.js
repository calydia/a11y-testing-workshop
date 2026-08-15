import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { expectStandaloneExercise } from './helpers/standalone-exercise.js';

const methodPath = '/methods/testing-forced-colors-and-high-contrast/';
const exercisePath = '/exercises/testing-forced-colors-in-a-journey-planner/';
const fixturePath = '/exercise-fixtures/public-transport-journey-planner/';

async function readOutcomes(page) {
  await page.locator('.route-details-action').focus();
  return page.evaluate(() => {
    const style = (selector) => getComputedStyle(document.querySelector(selector));
    return {
      mode: {
        problemBackground: style('.mode-option-primary').backgroundColor,
        problemBorder: style('.mode-option-primary').borderColor,
        comparisonBorder: style('.mode-option-comparison').borderColor,
      },
      interchangeBackground: style('.interchange-background').backgroundImage,
      customField: {
        borderStyle: style('.custom-field').borderStyle,
        boxShadow: style('.custom-field').boxShadow,
      },
      problemFocus: {
        outlineStyle: style('.route-details-action').outlineStyle,
        boxShadow: style('.route-details-action').boxShadow,
      },
      routeColors: [style('.route-line-14').backgroundColor, style('.route-line-22').backgroundColor],
    };
  });
}

function expectChangedOutcomes(result) {
  expect(result.mode.problemBackground).toBe(result.mode.problemBorder);
  expect(result.mode.comparisonBorder).not.toBe(result.mode.problemBorder);
  expect(result.interchangeBackground).toBe('none');
  expect(result.customField).toEqual({ borderStyle: 'none', boxShadow: 'none' });
  expect(result.problemFocus).toEqual({ outlineStyle: 'none', boxShadow: 'none' });
  expect(result.routeColors[0]).toBe(result.routeColors[1]);
}

test('forced-colors method and Exercise render their learning contract', async ({ page, request }) => {
  await page.goto(methodPath);
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Testing forced colors and high contrast');
  await expect(page.getByText('Estimated time: 20 minutes')).toBeVisible();
  const content = page.locator('[data-content-body]');
  await expect(content).toContainText('forced-colors: active');
  await expect(content).toContainText('forced-color-adjust: none');
  await expect(content).toContainText('learning aid');
  await expect(page.getByRole('link', { name: 'Testing forced colors in a journey planner' })).toHaveAttribute('href', exercisePath);

  await page.goto(exercisePath);
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Testing forced colors in a journey planner');
  await expect(page.getByText('Difficulty: beginner')).toBeVisible();
  await expect(page.getByText('Estimated time: 20 minutes')).toBeVisible();
  await expect(page.getByRole('link', { name: 'Testing forced colors and high contrast' })).toHaveAttribute('href', methodPath);
  await expectStandaloneExercise(page, request, {
    exercisePath,
    fixturePath,
    fixtureTitle: 'Public transport journey planner forced-colors exercise',
  });
});

test('initial planner exposes complete visual cues and the documented compound state defect', async ({ page }) => {
  await page.goto(fixturePath);
  const initial = await readOutcomes(page);
  expect(initial.mode.problemBackground).not.toBe(initial.mode.comparisonBorder);
  expect(initial.interchangeBackground).not.toBe('none');
  expect(initial.customField.boxShadow).not.toBe('none');
  expect(initial.problemFocus.boxShadow).not.toBe('none');
  expect(initial.routeColors[0]).not.toBe(initial.routeColors[1]);
  await expect(page.locator('.mode-option-primary')).not.toHaveAttribute('aria-pressed');
  await expect(page.locator('.mode-option-comparison')).toHaveAttribute('aria-pressed', 'true');
});

test('assisted simulation exposes five outcomes and resets deterministically', async ({ page }) => {
  await page.goto(fixturePath);
  const toggle = page.locator('.simulation-toggle');
  await expect(toggle).toHaveAttribute('aria-pressed', 'false');
  await toggle.focus();
  await expect(toggle).toHaveCSS('outline-style', 'solid');
  await page.keyboard.press('Enter');
  await expect(toggle).toHaveAttribute('aria-pressed', 'true');
  await expect(toggle).toHaveAccessibleName('Reset forced-colors simulation');
  expectChangedOutcomes(await readOutcomes(page));

  await toggle.click();
  await expect(toggle).toHaveAttribute('aria-pressed', 'false');
  await expect(page.locator('#journey-planner')).not.toHaveClass(/simulate-forced-colors/);
  await toggle.click();
  await expect(page.locator('#journey-planner')).toHaveClass(/simulate-forced-colors/);
});

test('real forced-colors media exposes the same five outcomes', async ({ page }) => {
  await page.emulateMedia({ forcedColors: 'active' });
  await page.goto(fixturePath);
  expectChangedOutcomes(await readOutcomes(page));
});

test('passing comparisons remain available in simulated and real forced colors', async ({ browser }) => {
  for (const condition of ['simulation', 'real']) {
    const context = await browser.newContext({ forcedColors: condition === 'real' ? 'active' : 'none' });
    const page = await context.newPage();
    await page.goto(fixturePath);
    if (condition === 'simulation') await page.locator('.simulation-toggle').click();
    await page.locator('.focus-comparison').focus();
    await expect(page.locator('.focus-comparison')).toHaveCSS('outline-style', 'solid');
    await expect(page.locator('#destination')).toHaveCSS('border-style', 'solid');
    await expect(page.locator('.interchange-comparison')).toContainText('One interchange at Market Square');
    await expect(page.locator('.route-comparison')).toContainText('Route 14 continues to Market Square');
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(await page.evaluate(() => innerWidth));
    await context.close();
  }
});

test('Exercise disclosures, themes, responsive fit, and axe boundary remain intact', async ({ page }) => {
  await page.goto(exercisePath);
  const hints = page.locator('details').filter({ hasText: 'Hints' });
  const solution = page.locator('details').filter({ hasText: 'Solution' });
  await expect(hints.locator('li')).toHaveCount(3);
  await expect(solution.locator('section')).toHaveCount(5);
  await expect(solution).not.toHaveAttribute('open');

  await page.addInitScript(() => localStorage.setItem('darkMode', 'enabled'));
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(fixturePath);
  await expect(page.locator('html')).toHaveClass(/dark/);
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(390);
  expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
  await page.locator('.simulation-toggle').click();
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(390);
  expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);

  const html = await page.locator('body').innerHTML();
  expect(html).not.toMatch(/intentional.finding|finding.count|model.answer|diagnostic|solution/i);
});
