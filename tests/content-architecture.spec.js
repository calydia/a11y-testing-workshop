import { test, expect } from '@playwright/test';
import { readFile } from 'node:fs/promises';

test('unknown nested content IDs use the normal 404 response', async ({ request }) => {
  for (const path of ['/learn/not-an-entry/', '/methods/nested/not-an-entry/', '/exercises/not-an-entry/', '/journeys/not-an-entry/']) {
    const response = await request.get(path);
    expect(response.status(), path).toBe(404);
  }
});

test('site metadata describes Accessibility Testing Lab', async ({ page }) => {
  await page.goto('/');

  await expect(page.locator('meta[property="og:site_name"]')).toHaveAttribute('content', 'Accessibility Testing Lab');
  const structuredData = JSON.parse(await page.locator('script[type="application/ld+json"]').textContent());
  expect(structuredData).toMatchObject({
    '@type': 'WebSite',
    name: 'Accessibility Testing Lab',
    url: 'https://testing.a11y.ing/',
  });
});

test('all dynamic content routes use the shared section navigation contract', async () => {
  for (const route of ['learn', 'methods', 'exercises', 'journeys']) {
    const source = await readFile(new URL(`../src/pages/${route}/[...id].astro`, import.meta.url), 'utf8');
    expect(source, route).toContain('SectionNavigation');
    expect(source, route).toContain('slot="navigation"');
    expect(source, route).toContain('createSectionNavigationItems');
    expect(source, route).toContain('Breadcrumbs');
    expect(source, route).toContain('slot="breadcrumb"');
  }
});
