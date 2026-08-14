import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { expectStandaloneExercise } from './helpers/standalone-exercise.js';

const exercisePath = '/exercises/reviewing-structure-and-links-in-a-community-resources-directory/';
const fixturePath = '/exercise-fixtures/community-resources-directory/';

test('structure and links Exercise renders its learning structure and fixture', async ({ page, request }) => {
  const response = await page.goto(exercisePath);
  expect(response?.ok()).toBe(true);
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Reviewing structure and links in a community resources directory');
  await expect(page.getByText('Difficulty: beginner')).toBeVisible();
  await expect(page.getByText('Estimated time: 20 minutes')).toBeVisible();
  await expect(page.getByRole('link', { name: 'Testing page structure and links with a screen reader' })).toHaveAttribute(
    'href',
    '/methods/screen-reader-page-structure-and-links/',
  );
  await expectStandaloneExercise(page, request, {
    exercisePath,
    fixturePath,
    fixtureTitle: 'Community resources directory structure and links exercise',
  });
});

test('fixture exposes the approved heading patterns and valid comparison', async ({ page }) => {
  await page.goto(fixturePath);
  await expect(page).toHaveTitle('Community resources directory structure and links exercise');
  await expect(page.getByRole('main')).toHaveCount(1);
  await expect(page.getByRole('heading', { level: 1, name: 'Community resource directory' })).toHaveCount(1);
  await expect(page.locator('[data-resource-title="food"]')).toHaveJSProperty('tagName', 'H4');
  await expect(page.locator('[data-resource-title="housing"]')).toHaveJSProperty('tagName', 'P');
  await expect(page.locator('[data-resource-title="digital"]')).toHaveJSProperty('tagName', 'H3');
  await expect(page.getByRole('heading', { name: 'Housing advice' })).toHaveCount(0);
});

test('Exercise teaches title and landmark checks as passing evidence', async ({ page }) => {
  await page.goto(exercisePath);
  const content = page.locator('[data-content-body]');
  await expect(content).toContainText('document title');
  await expect(content).toContainText(/navigate by landmarks/i);
  await expect(content).toContainText('main content');
  await expect(content).toContainText('passing checks');

  const solution = page.locator('details').filter({ hasText: 'Solution' });
  await expect(solution).toContainText('useful document title');
  await expect(solution).toContainText('main region');
  await expect(solution.locator('section')).toHaveCount(5);
});

test('fixture exposes the three approved link-purpose patterns and descriptive comparisons', async ({ page }) => {
  await page.goto(fixturePath);
  await expect(page.locator('[data-card-link]').filter({ hasText: 'Read more' })).toHaveCount(2);
  await expect(page.getByRole('link', { name: 'Click here', exact: true })).toHaveCount(1);
  await expect(page.locator('[data-service-link]').filter({ hasText: 'Service details' })).toHaveCount(2);
  await expect(page.getByRole('link', { name: 'Explore digital skills sessions' })).toHaveAttribute('href', '#digital-skills-information');
  await expect(page.getByRole('link', { name: 'Contact the community support team' })).toHaveAttribute('href', '#contact-team');
});

test('links remain operable and show visible keyboard focus', async ({ page }) => {
  await page.goto(fixturePath);
  const descriptiveLink = page.getByRole('link', { name: 'Explore digital skills sessions' });
  await descriptiveLink.focus();
  await expect(descriptiveLink).toBeFocused();
  await expect(descriptiveLink).toHaveCSS('outline-style', 'solid');
  await descriptiveLink.click();
  await expect(page).toHaveURL(`${fixturePath}#digital-skills-information`);
});

test('axe reports only the intentional skipped heading level', async ({ page }) => {
  await page.goto(fixturePath);
  const results = await new AxeBuilder({ page }).analyze();
  expect(results.violations.map(({ id }) => id)).toEqual(['heading-order']);
  expect(results.violations[0].nodes).toHaveLength(1);
  expect(results.violations[0].nodes[0].html).toContain('data-resource-title="food"');
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

test('hints remain progressive and solution lists five findings', async ({ page }) => {
  await page.goto(exercisePath);
  const hints = page.locator('details').filter({ hasText: 'Hints' });
  const solution = page.locator('details').filter({ hasText: 'Solution' });
  await expect(hints.locator('li')).toHaveCount(3);
  await expect(solution.locator('section')).toHaveCount(5);
  await expect(solution).not.toHaveAttribute('open');
});
