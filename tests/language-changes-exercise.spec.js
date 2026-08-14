import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { expectStandaloneExercise } from './helpers/standalone-exercise.js';

const exercisePath = '/exercises/testing-language-changes-on-a-community-library-noticeboard/';
const fixturePath = '/exercise-fixtures/community-library-noticeboard/';

const inheritedLanguage = (locator) => locator.evaluate((element) => {
  let current = element;
  while (current) {
    const language = current.getAttribute('lang');
    if (language) return language;
    current = current.parentElement;
  }
  return '';
});

test('language changes Exercise renders its learning structure and fixture', async ({ page, request }) => {
  const response = await page.goto(exercisePath);
  expect(response?.ok()).toBe(true);
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Testing language changes on a community library noticeboard');
  await expect(page.getByText('Difficulty: beginner')).toBeVisible();
  await expect(page.getByText('Estimated time: 20 minutes')).toBeVisible();
  await expect(page.getByRole('link', { name: 'Testing language changes with a screen reader' })).toHaveAttribute('href', '/methods/screen-reader-language-changes/');
  await expectStandaloneExercise(page, request, {
    exercisePath,
    fixturePath,
    fixtureTitle: 'Community library language changes exercise',
  });
});

test('fixture exposes the five approved language markup patterns', async ({ page }) => {
  await page.goto(fixturePath);
  const unmarkedFinnish = page.locator('[data-language-case="finnish-unmarked"]');
  await expect(unmarkedFinnish).not.toHaveAttribute('lang');
  expect(await inheritedLanguage(unmarkedFinnish)).toBe('en');

  await expect(page.locator('[data-language-case="swedish-as-finnish"]')).toHaveAttribute('lang', 'fi');
  const overriddenLink = page.locator('[data-language-case="swedish-link-override"] a');
  await expect(overriddenLink).toHaveAttribute('lang', 'en');
  expect(await inheritedLanguage(overriddenLink)).toBe('en');

  const englishInsideFinnish = page.locator('[data-language-content="english-inside-finnish"]');
  expect(await inheritedLanguage(englishInsideFinnish)).toBe('fi');
  await expect(page.locator('[data-language-case="invalid-swedish-value"]')).toHaveAttribute('lang', 'swedish');
});

test('fixture preserves the four valid declaration and inheritance comparisons', async ({ page }) => {
  await page.goto(fixturePath);
  await expect(page.locator('[data-language-comparison]')).toHaveCount(4);
  await expect(page.locator('[data-language-comparison="finnish"]')).toHaveAttribute('lang', 'fi');
  await expect(page.locator('[data-language-comparison="swedish"]')).toHaveAttribute('lang', 'sv');

  const inheritedLink = page.locator('[data-language-comparison="inherited-link"]');
  await expect(inheritedLink).not.toHaveAttribute('lang');
  expect(await inheritedLanguage(inheritedLink)).toBe('sv');
  await expect(page.locator('[data-language-comparison="nested-english"] span')).toHaveAttribute('lang', 'en');
});

test('noticeboard links work and expose visible keyboard focus', async ({ page }) => {
  await page.goto(fixturePath);
  const link = page.getByRole('link', { name: 'View family reading details' });
  await link.focus();
  await expect(link).toBeFocused();
  await expect(link).toHaveCSS('outline-style', 'solid');
  await link.click();
  await expect(page).toHaveURL(`${fixturePath}#family-reading-details`);
});

test('axe reports only the intentionally invalid language value', async ({ page }) => {
  await page.goto(fixturePath);
  const results = await new AxeBuilder({ page }).analyze();
  expect(results.violations.map(({ id }) => id)).toEqual(['valid-lang']);
  expect(results.violations[0].nodes).toHaveLength(1);
  expect(results.violations[0].nodes[0].html).toContain('data-language-case="invalid-swedish-value"');
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

test('fixture markup does not expose its teaching answers', async ({ page }) => {
  await page.goto(fixturePath);
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
