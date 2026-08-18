import { test, expect } from '@playwright/test';

const routes = [
  { path: '/', heading: 'Accessibility Testing Lab' },
  { path: '/learn/', heading: 'Learning paths' },
  { path: '/methods/', heading: 'Testing methods' },
  { path: '/exercises/', heading: 'Exercises' },
  { path: '/journeys/', heading: 'Testing journeys' },
  { path: '/about/', heading: 'About this Lab' },
  { path: '/accessibility/', heading: 'Accessibility statement' },
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
    const listing = page.locator('[data-content-listing]').first();
    const firstItem = listing.getByRole('listitem').first();

    const spacing = await listing.evaluate((element) => {
      const styles = getComputedStyle(element);
      return { rowGap: styles.rowGap, columnGap: styles.columnGap };
    });
    expect(spacing.rowGap).toBe(spacing.columnGap);
    await expect(firstItem).toHaveCSS('margin-top', '0px');
    await expect(firstItem).toHaveCSS('margin-bottom', '0px');

    const groupedListing = ['/methods/', '/exercises/'].includes(route.path);
    await expect(firstCard.getByRole('heading', { level: groupedListing ? 3 : 2 })).toHaveCSS('font-size', '20px');
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

test('brand links home and informational pages are in the footer', async ({ page }) => {
  await page.goto('/methods/');

  await expect(page.getByRole('banner').getByRole('link', { name: /Accessibility Testing Lab/ })).toHaveAttribute('href', '/');
  await expect(page.getByRole('contentinfo').getByRole('link', { name: 'About this Lab' })).toHaveAttribute('href', '/about/');
  await expect(page.getByRole('contentinfo').getByRole('link', { name: 'Accessibility statement' })).toHaveAttribute('href', '/accessibility/');
});

test('the accessibility statement documents the aim, assessment, exception, and feedback route', async ({ page }) => {
  await page.goto('/accessibility/');
  const main = page.locator('main');

  for (const statement of [
    'WCAG) 2.2 at Level AA',
    'self-assessment',
    '15 August 2026',
    'review the accessibility of this site regularly',
    'deliberate accessibility problems',
    'isolated practice material',
  ]) {
    await expect(main).toContainText(statement);
  }

  await expect(main.getByRole('link', { name: /send feedback anonymously/ })).toHaveAttribute(
    'href',
    'https://docs.google.com/forms/d/e/1FAIpQLSf0zWrTLbzRQGZ7nyFPHHqe6ht2y-QEa5xygZn-bNZlV7LgxA/viewform?usp=sf_link',
  );
});

test('the 404 page is unindexed and provides routes back into the Lab', async ({ page }) => {
  await page.goto('/404.html');

  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'noindex');
  await expect(page.getByRole('navigation', { name: 'Breadcrumb' })).toHaveCount(0);
  await expect(page.getByRole('link', { name: /home page/ })).toHaveAttribute('href', '/');
  for (const item of navigationItems) {
    await expect(page.locator('main').getByRole('link', { name: item.name })).toHaveAttribute('href', item.href);
  }
});

test('ordinary pages remain indexable and expose complete site metadata', async ({ page }) => {
  await page.goto('/');

  await expect(page.locator('meta[name="robots"]')).toHaveCount(0);
  await expect(page.locator('link[rel="icon"][type="image/svg+xml"]')).toHaveAttribute('href', '/favicons/favicon.svg');
  await expect(page.locator('link[rel="icon"][type="image/png"]')).toHaveAttribute('href', '/favicons/favicon-96x96.png');
  await expect(page.locator('link[rel="apple-touch-icon"]')).toHaveAttribute('href', '/favicons/apple-touch-icon.png');
  await expect(page.locator('link[rel="manifest"]')).toHaveAttribute('href', '/manifest.json');
  await expect(page.locator('meta[name="theme-color"]')).toHaveAttribute('content', '#BBC9F7');
});

test('About sets the scope and limitations of the Lab', async ({ page }) => {
  await page.goto('/about/');
  const scope = page.locator('main').getByRole('heading', {
    level: 2,
    name: 'What this Lab can and cannot establish',
  });

  await expect(scope).toBeVisible();
  const guidance = scope.locator('..');
  for (const statement of [
    'selected practical accessibility-testing techniques',
    'not a WCAG conformance assessment',
    'involving disabled people',
    'scope and exclusions',
    'deliberate accessibility problems',
  ]) {
    await expect(guidance).toContainText(statement);
  }
});

test('public overview copy uses the Lab content-type labels', async ({ page }) => {
  await page.goto('/about/');
  await expect(page.locator('main')).toContainText('Learning paths for progressive learning, Testing methods for reusable references, Exercises for focused practice, and Testing journeys for realistic scenarios');

  await page.goto('/journeys/');
  await expect(page.locator('main')).toContainText('Learning paths teach skills; Testing journeys apply them.');
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
