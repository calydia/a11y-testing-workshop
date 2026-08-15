import { test, expect } from '@playwright/test';

const landingPages = [
  { path: '/learn/', label: 'Learning paths' },
  { path: '/methods/', label: 'Testing methods' },
  { path: '/exercises/', label: 'Exercises' },
  { path: '/journeys/', label: 'Testing journeys' },
  { path: '/about/', label: 'About this Lab' },
];

test('Home does not have Lab breadcrumbs', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('navigation', { name: 'Breadcrumbs' })).toHaveCount(0);
});

for (const landing of landingPages) {
  test(`${landing.label} has a two-level breadcrumb before its heading`, async ({ page }) => {
    await page.goto(landing.path);
    const breadcrumb = page.getByRole('navigation', { name: 'Breadcrumbs' });
    const items = breadcrumb.getByRole('listitem');

    await expect(items).toHaveCount(2);
    await expect(items.nth(0).getByRole('link', { name: 'Home' })).toHaveAttribute('href', '/');
    await expect(items.nth(1)).toHaveText(landing.label);
    await expect(items.nth(1)).toHaveAttribute('aria-current', 'page');
    await expect(items.nth(1).getByRole('link')).toHaveCount(0);
    await expect(breadcrumb.locator('[aria-current="page"]')).toHaveCount(1);
    const pageHeading = page.getByRole('heading', { level: 1, name: landing.label, exact: true });
    expect(await breadcrumb.evaluate((element, heading) => Boolean(element.compareDocumentPosition(heading) & Node.DOCUMENT_POSITION_FOLLOWING), await pageHeading.elementHandle())).toBe(true);
  });
}

test('method detail breadcrumb uses the explicit three-level hierarchy', async ({ page }) => {
  await page.goto('/methods/testing-modal-dialogs/');
  const breadcrumb = page.getByRole('navigation', { name: 'Breadcrumbs' });
  const items = breadcrumb.getByRole('listitem');

  await expect(items).toHaveCount(3);
  await expect(items.nth(0).getByRole('link', { name: 'Home' })).toHaveAttribute('href', '/');
  await expect(items.nth(1).getByRole('link', { name: 'Testing methods' })).toHaveAttribute('href', '/methods/');
  await expect(items.nth(2)).toHaveText('Testing modal dialogs');
  await expect(items.nth(2)).toHaveAttribute('aria-current', 'page');
  await expect(items.nth(2).getByRole('link')).toHaveCount(0);
  await expect(breadcrumb.locator('[aria-current="page"]')).toHaveCount(1);
});

test('breadcrumb links have focus styles and long titles do not overflow', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/methods/screen-reader-page-structure-and-links/');
  const breadcrumb = page.getByRole('navigation', { name: 'Breadcrumbs' });

  for (const link of await breadcrumb.getByRole('link').all()) {
    await link.focus();
    await expect(link).toBeFocused();
    await expect(link).toHaveCSS('outline-style', 'solid');
  }

  await expect(breadcrumb.locator('[data-breadcrumb-separator]')).toHaveCount(2);
  for (const separator of await breadcrumb.locator('[data-breadcrumb-separator]').all()) {
    await expect(separator).toHaveAttribute('aria-hidden', 'true');
  }
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(390);
});
