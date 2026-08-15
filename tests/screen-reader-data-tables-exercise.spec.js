import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const methodPath = '/methods/testing-data-tables-with-a-screen-reader/';
const exercisePath = '/exercises/testing-a-community-course-timetable-with-a-screen-reader/';
const fixturePath = '/exercise-fixtures/community-course-timetable/';

test('method and Exercise expose the approved relationship and metadata', async ({ page }) => {
  await page.goto(methodPath);
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Testing data tables with a screen reader');
  await expect(page.getByRole('link', { name: 'Testing a community-course timetable with a screen reader' })).toHaveAttribute('href', exercisePath);
  await expect(page.locator('[data-content-body]')).toContainText('interactive grids');

  await page.goto(exercisePath);
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Testing a community-course timetable with a screen reader');
  await expect(page.getByText('Difficulty: beginner')).toBeVisible();
  await expect(page.getByText('Estimated time: 25 minutes')).toBeVisible();
  await expect(page.getByRole('link', { name: 'Testing data tables with a screen reader' })).toHaveAttribute('href', methodPath);
  await expect(page.getByRole('link', { name: 'Start exercise' })).toHaveAttribute('href', fixturePath);
});

test('Exercise provides three progressive hints and exactly five closed solution findings', async ({ page }) => {
  await page.goto(exercisePath);
  const hints = page.locator('details').filter({ hasText: 'Hints' });
  const solution = page.locator('details').filter({ hasText: 'Solution' });
  await expect(hints.locator('li')).toHaveCount(3);
  await expect(solution).not.toHaveAttribute('open');
  await solution.locator('summary').click();
  await expect(solution.locator('section')).toHaveCount(5);
  await expect(solution).toContainText('venue table provides a passing comparison');
});

test('fixture contains the five intentional timetable relationships and a passing venue table', async ({ page }) => {
  await page.goto(fixturePath);
  await expect(page).toHaveTitle('Community course timetable screen-reader exercise');
  await expect(page.getByRole('link', { name: 'Return to the exercise' })).toHaveAttribute('href', exercisePath);

  const tables = page.locator('table');
  await expect(tables).toHaveCount(2);
  const timetable = tables.nth(0);
  await expect(timetable.locator('caption')).toHaveCount(0);
  await expect(timetable.locator('thead td')).toHaveText(['Monday', 'Wednesday', 'Saturday']);
  await expect(timetable.locator('tbody tr > td:first-child')).toHaveText(['09:00–10:30', '13:00–14:30', '18:00–19:30']);
  await expect(timetable.locator('thead th', { hasText: 'Time' })).toHaveAttribute('scope', 'row');
  await expect(timetable.locator('tbody td:empty')).toHaveCount(3);

  const venue = page.getByRole('table', { name: 'Course rooms and arrival information' });
  await expect(venue.getByRole('columnheader')).toHaveText(['Room', 'Floor', 'Step-free route']);
  await expect(venue.getByRole('rowheader')).toHaveText(['Studio', 'Workshop room']);
});

test('fixture preserves theme, focus, mobile fit, and the expected automated boundary', async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem('darkMode', 'enabled'));
  await page.goto(fixturePath);
  await expect(page.locator('html')).toHaveClass(/dark/);
  await expect(page.locator('body')).toHaveCSS('background-color', 'rgb(1, 0, 23)');
  const returnLink = page.getByRole('link', { name: 'Return to the exercise' });
  await returnLink.focus();
  await expect(returnLink).toHaveCSS('outline-style', 'solid');
  const scan = await new AxeBuilder({ page }).analyze();
  expect(scan.violations).toEqual([]);
  await page.setViewportSize({ width: 390, height: 844 });
  await page.reload();
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(390);
});

test('fixture markup does not reveal teaching answers', async ({ page }) => {
  await page.goto(fixturePath);
  const html = await page.locator('html').innerHTML();
  expect(html).not.toMatch(/intentional.finding|missing.table.name|incorrect.time.header|model.answer/i);
});
