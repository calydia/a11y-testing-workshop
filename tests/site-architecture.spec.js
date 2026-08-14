import { test, expect } from '@playwright/test';

const routes = [
  { path: '/', heading: 'Accessibility Testing Lab' },
  { path: '/learn/', heading: 'Learning paths' },
  { path: '/methods/', heading: 'Testing methods' },
  { path: '/exercises/', heading: 'Exercises' },
  { path: '/journeys/', heading: 'Testing journeys' },
  { path: '/about/', heading: 'About this Lab' },
];

const navigationItems = [
  { name: 'Learning paths', href: '/learn/' },
  { name: 'Testing methods', href: '/methods/' },
  { name: 'Exercises', href: '/exercises/' },
  { name: 'Testing journeys', href: '/journeys/' },
];

test.describe('Site routes', () => {
  for (const route of routes) {
    test(`${route.path} renders its page heading`, async ({ page }) => {
      const response = await page.goto(route.path);

      expect(response?.ok()).toBe(true);
      await expect(page.getByRole('heading', { level: 1 })).toHaveText(route.heading);
      await expect(page.getByRole('heading', { level: 1 })).toHaveCount(1);
    });
  }
});

for (const route of routes.filter(({ path }) => ['/learn/', '/methods/', '/exercises/', '/journeys/'].includes(path))) {
  test(`${route.path} uses compact section card typography`, async ({ page }) => {
    await page.goto(route.path);
    const firstCard = page.locator('main article').first();

    await expect(firstCard.getByRole('heading', { level: 2 })).toHaveCSS('font-size', '20px');
    await expect(firstCard.locator('p').last()).toHaveCSS('font-size', '18px');

    const firstCardLink = firstCard.getByRole('link').first();
    await firstCardLink.focus();
    await expect(firstCardLink).toHaveCSS('outline-style', 'solid');

    await page.setViewportSize({ width: 390, height: 844 });
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(390);
  });
}

test('primary navigation matches the new information architecture', async ({ page }) => {
  await page.goto('/');
  const navigation = page.getByRole('navigation', { name: 'Main' });
  const links = navigation.getByRole('link');

  await expect(links).toHaveCount(navigationItems.length);

  for (const [index, item] of navigationItems.entries()) {
    await expect(links.nth(index)).toHaveText(item.name);
    await expect(links.nth(index)).toHaveAttribute('href', item.href);
  }

  await expect(navigation.getByRole('link', { name: 'Home' })).toHaveCount(0);
  await expect(navigation.getByRole('link', { name: 'About this Lab' })).toHaveCount(0);
});

test('brand links home and About this Lab is in the footer', async ({ page }) => {
  await page.goto('/methods/');

  await expect(page.getByRole('banner').getByRole('link', { name: /Accessibility Testing Lab/ })).toHaveAttribute('href', '/');
  await expect(page.getByRole('contentinfo').getByRole('link', { name: 'About this Lab' })).toHaveAttribute('href', '/about/');
});

test('Home gives beginners a direct starting point while preserving all four content areas', async ({ page }) => {
  await page.goto('/');
  const start = page.getByRole('heading', { level: 2, name: 'New to accessibility testing?' });
  await expect(start).toBeVisible();
  const startLink = page.getByRole('link', { name: 'Start your first accessibility review' });
  await expect(startLink).toHaveAttribute('href', '/learn/your-first-accessibility-review/');
  await startLink.focus();
  await expect(startLink).toHaveCSS('outline-style', 'solid');
  for (const item of navigationItems) {
    await expect(page.locator('main').getByRole('link', { name: item.name })).toHaveAttribute('href', item.href);
  }
});

for (const item of navigationItems) {
  test(`${item.name} identifies its exact section page`, async ({ page }) => {
    await page.goto(item.href);
    const link = page.getByRole('navigation', { name: 'Main' }).getByRole('link', { name: item.name });

    await expect(link).toHaveAttribute('aria-current', 'page');
  });
}
