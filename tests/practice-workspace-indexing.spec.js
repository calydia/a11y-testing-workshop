import { test, expect } from './helpers/test.js';
import { readFile } from 'node:fs/promises';

const standaloneRoutes = [
  '/exercise-fixtures/keyboard-preferences-form/',
  '/journey-workspaces/community-conference-programme/',
  '/journey-workspaces/community-centre-open-day/',
  '/journey-workspaces/community-services-appointment-change/',
];

const ordinaryRoutes = [
  '/exercises/keyboard-testing-a-preferences-form/',
  '/journeys/reviewing-a-community-conference-programme/',
  '/learn/testing-display-preferences-touch-and-media/',
  '/learn/testing-dynamic-and-authenticated-tasks/',
  '/journeys/reviewing-a-community-services-appointment-change/',
];

test('standalone practice routes remain reachable and emit noindex', async ({ page }) => {
  for (const route of standaloneRoutes) {
    const response = await page.goto(route);

    expect(response?.ok(), route).toBe(true);
    await expect(page.locator('meta[name="robots"]'), route).toHaveAttribute('content', 'noindex');
  }
});

test('ordinary teaching pages remain indexable', async ({ page }) => {
  for (const route of ordinaryRoutes) {
    const response = await page.goto(route);

    expect(response?.ok(), route).toBe(true);
    await expect(page.locator('meta[name="robots"]'), route).toHaveCount(0);
  }
});

test('sitemap excludes standalone practice routes and retains teaching pages', async () => {
  const sitemap = await readFile(new URL('../dist/sitemap-0.xml', import.meta.url), 'utf8');

  expect(sitemap).not.toContain('https://testing.a11y.ing/exercise-fixtures/');
  expect(sitemap).not.toContain('https://testing.a11y.ing/journey-workspaces/');
  for (const route of ordinaryRoutes) {
    expect(sitemap, route).toContain(`<loc>https://testing.a11y.ing${route}</loc>`);
  }
});

test('robots.txt allows crawlers to read workspace noindex directives', async () => {
  const robots = await readFile(new URL('../public/robots.txt', import.meta.url), 'utf8');

  expect(robots).not.toMatch(/Disallow:\s*\/exercise-fixtures\//i);
  expect(robots).not.toMatch(/Disallow:\s*\/journey-workspaces\//i);
});
