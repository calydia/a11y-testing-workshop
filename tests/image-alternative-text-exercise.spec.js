import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { expectStandaloneExercise } from './helpers/standalone-exercise.js';

const exercisePath = '/exercises/evaluating-image-alternative-text-in-context/';
const fixturePath = '/exercise-fixtures/image-alternative-text/';

test('image alternative-text Exercise renders its learning structure and fixture', async ({ page, request }) => {
  const response = await page.goto(exercisePath);
  expect(response?.ok()).toBe(true);
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Evaluating image alternative text in context');
  await expect(page.getByText('Difficulty: beginner')).toBeVisible();
  await expect(page.getByText('Estimated time: 20 minutes')).toBeVisible();
  await expect(page.getByRole('link', { name: 'Testing image alternative text' })).toHaveAttribute('href', '/methods/testing-image-alternative-text/');
  await expectStandaloneExercise(page, request, { exercisePath, fixturePath, fixtureTitle: 'Community volunteering image alternative text exercise' });
});

test('fixture exposes four findings and three valid comparisons', async ({ page }) => {
  await page.goto(fixturePath);
  await expect(page.locator('[data-image-finding]')).toHaveCount(4);
  await expect(page.locator('[data-image-comparison]')).toHaveCount(3);
});

test('four finding targets expose their intended alternative-text problems', async ({ page }) => {
  await page.goto(fixturePath);
  await expect(page.locator('[data-image-finding="vague-meaningful"]')).toHaveAttribute('alt', 'Water');
  await expect(page.getByRole('img', { name: 'Decorative blue wave flourish' })).toHaveCount(1);

  const logoLink = page.getByRole('link', { name: 'Logo', exact: true });
  await expect(logoLink).toHaveAttribute('href', '/');
  await expect(logoLink.locator('img')).toHaveAttribute('alt', 'Logo');

  const missing = page.locator('[data-image-finding="missing-alt"]');
  await expect(missing).not.toHaveAttribute('alt');
});

test('valid comparisons preserve useful, empty, and broken-image alternatives', async ({ page }) => {
  await page.goto(fixturePath);
  await expect(page.getByRole('img', { name: 'Volunteer coordinating donations at a computer in the community office' })).toHaveCount(1);

  const decorative = page.locator('[data-image-comparison="empty-decorative"]');
  await expect(decorative).toHaveAttribute('alt', '');

  const broken = page.locator('[data-image-comparison="useful-broken"]');
  await expect(broken).toHaveAttribute('alt', 'Volunteers preparing reusable water bottles for the cleanup');
  await expect.poll(() => broken.evaluate((image) => image.complete && image.naturalWidth === 0)).toBe(true);
  await expect(page.getByRole('img', { name: 'Volunteers preparing reusable water bottles for the cleanup' })).toHaveCount(1);
});

for (const theme of ['light', 'dark']) {
  test(`axe reports only the missing alternative in the ${theme} theme`, async ({ page }) => {
    await page.goto(fixturePath);
    await page.evaluate((selectedTheme) => {
      document.documentElement.classList.remove('light', 'dark');
      document.documentElement.classList.add(selectedTheme);
    }, theme);
    const results = await new AxeBuilder({ page }).analyze();
    expect(results.violations.map((violation) => violation.id)).toEqual(['image-alt']);
    expect(results.violations[0].nodes).toHaveLength(1);
    expect(results.violations[0].nodes[0].html).toContain('data-image-finding="missing-alt"');
  });
}

test('outer shell passes axe, standalone theme applies, and fixture fits a narrow viewport', async ({ page }) => {
  await page.goto(exercisePath);
  expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
  await page.evaluate(() => localStorage.setItem('darkMode', 'enabled'));
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(fixturePath);
  await expect(page.locator('html')).toHaveClass(/dark/);
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(390);
});

test('hints remain progressive and solution lists four findings', async ({ page }) => {
  await page.goto(exercisePath);
  const hints = page.locator('details').filter({ hasText: 'Hints' });
  const solution = page.locator('details').filter({ hasText: 'Solution' });
  await expect(hints.locator('li')).toHaveCount(3);
  await expect(solution.locator('section')).toHaveCount(4);
  await expect(solution).not.toHaveAttribute('open');
});
