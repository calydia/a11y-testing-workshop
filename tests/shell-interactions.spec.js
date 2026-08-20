import { test, expect } from '@playwright/test';

test.describe('shared shell keyboard interactions', () => {
  test('skip link moves keyboard navigation to main content', async ({ page }) => {
    await page.goto('/');
    await page.keyboard.press('Tab');

    const skipLink = page.getByRole('link', { name: 'Skip to content' });
    await expect(skipLink).toBeFocused();
    await expect(skipLink).toBeVisible();
    await page.keyboard.press('Enter');

    await expect(page.locator('#skip-target')).toBeFocused();
    await expect(page.locator('#skip-target')).toHaveAttribute('tabindex', '-1');
  });

  test('mobile navigation opens and closes with the keyboard', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/');

    const navigation = page.getByRole('navigation', { name: 'Main' });
    const toggle = navigation.getByRole('button', { name: 'Menu' });
    await expect(toggle.locator('svg[aria-hidden="true"]')).toHaveCount(2);
    await toggle.focus();
    await page.keyboard.press('Space');
    await expect(toggle).toHaveAttribute('aria-expanded', 'true');

    const firstLink = navigation.getByRole('link').first();
    await expect(firstLink).toHaveCSS('font-size', '16px');
    await expect(firstLink).toHaveCSS('padding-top', '12px');
    await expect(firstLink).toHaveCSS('padding-bottom', '12px');
    await firstLink.focus();
    await page.keyboard.press('Escape');

    await expect(toggle).toHaveAttribute('aria-expanded', 'false');
    await expect(toggle).toBeFocused();
  });

  test('theme toggle exposes and changes its pressed state', async ({ page }) => {
    await page.goto('/');
    const toggle = page.getByRole('button', { name: /Switch to (dark|light) version/ });
    await expect(toggle.locator('svg[aria-hidden="true"]')).toHaveCount(2);
    const initialState = await toggle.getAttribute('aria-pressed');

    await toggle.focus();
    await page.keyboard.press('Enter');

    await expect(toggle).toHaveAttribute('aria-pressed', initialState === 'true' ? 'false' : 'true');
  });

  test('back-to-top returns focus to the page header', async ({ page }) => {
    await page.goto('/');
    const button = page.getByRole('button', { name: 'Back to top' });
    await expect(button.locator('svg[aria-hidden="true"]')).toHaveCount(1);

    await button.focus();
    await page.keyboard.press('Enter');

    await expect(page.locator('#page-top')).toBeFocused();
    await expect(page.locator('#page-top')).toHaveAttribute('tabindex', '-1');
  });

  test('footer links to the related A11ying sites', async ({ page }) => {
    await page.goto('/');
    const relatedSites = page.getByRole('contentinfo').getByRole('navigation', { name: 'A11ying sites' });

    await expect(relatedSites.getByRole('link')).toHaveCount(3);
    await expect(relatedSites.getByRole('link', { name: 'I would if I could' })).toHaveAttribute('href', 'https://a11y.ing');
    await expect(relatedSites.getByRole('link', { name: 'Almost, but not quite' })).toHaveAttribute('href', 'https://wcag.a11y.ing');
    const blogLink = relatedSites.getByRole('link', { name: 'Accessibility blog' });
    const blogListItem = blogLink.locator('..');
    await expect(blogLink).toHaveAttribute('href', 'https://sanna.a11y.ing/blog/accessibility/');
    await expect(blogListItem).toHaveCSS('margin-top', '0px');
    await expect(blogListItem).toHaveCSS('margin-bottom', '0px');
    await expect(blogLink).toHaveCSS('padding-top', '8px');
    await expect(blogLink).toHaveCSS('padding-bottom', '8px');
  });

  test('desktop navigation is visible without the menu toggle', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto('/');

    const navigation = page.getByRole('navigation', { name: 'Main' });
    await expect(navigation.getByRole('button', { name: 'Menu' })).toBeHidden();
    await expect(navigation.getByRole('link')).toHaveCount(4);
    const firstLink = navigation.getByRole('link').first();
    await expect(firstLink).toHaveCSS('font-size', '18px');
    await expect(firstLink).toHaveCSS('padding-top', '4px');
    await expect(firstLink).toHaveCSS('padding-bottom', '4px');
    const firstItem = navigation.locator('#main-menu > li').first();
    await expect(firstItem).toHaveCSS('margin-top', '8px');
    await expect(firstItem).toHaveCSS('margin-bottom', '8px');
    const navigationBox = await navigation.boundingBox();
    expect(navigationBox?.height).toBeGreaterThanOrEqual(88);
    expect(navigationBox?.height).toBeLessThanOrEqual(90);
  });

  test('brand link keeps decorative inline logos and an accessible Home name', async ({ page }) => {
    await page.goto('/');
    const brandLink = page.getByRole('banner').getByRole('link', { name: 'Accessibility Testing Lab home' });

    await expect(brandLink.locator('svg[aria-hidden="true"]')).toHaveCount(2);
    await expect(brandLink).toHaveAttribute('href', '/');
  });

  test('shell SVGs retain their intentional responsive sizes', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 812 });
    await page.goto('/');

    const headerLogo = page.getByRole('banner').getByRole('link', { name: 'Accessibility Testing Lab home' }).locator('svg:visible');
    const footerLogo = page.getByRole('contentinfo').locator('.logo-dark:visible, .logo-light:visible');
    const menuIcon = page.getByRole('navigation', { name: 'Main' }).getByRole('button', { name: 'Menu' }).locator('svg:visible');
    const themeIcon = page.getByRole('button', { name: /Switch to (dark|light) version/ }).locator('svg:visible');
    const backToTopIcon = page.getByRole('button', { name: 'Back to top' }).locator('svg:visible');

    await expect(headerLogo).toHaveCSS('width', '96px');
    await expect(footerLogo).toHaveCSS('width', '96px');
    await expect(headerLogo).toHaveAttribute('viewBox', '0 0 348 173');
    await expect(footerLogo).toHaveAttribute('viewBox', '0 0 348 173');
    await expect(menuIcon).toHaveCSS('width', '32px');
    await expect(menuIcon).toHaveCSS('height', '32px');
    await expect(themeIcon).toHaveCSS('width', '32px');
    await expect(themeIcon).toHaveCSS('height', '32px');
    await expect(backToTopIcon).toHaveCSS('width', '48px');
    await expect(backToTopIcon).toHaveCSS('height', '48px');

    await page.setViewportSize({ width: 1280, height: 800 });
    await expect(headerLogo).toHaveCSS('width', '128px');
    await expect(footerLogo).toHaveCSS('width', '112px');
    await expect(themeIcon).toHaveCSS('width', '32px');
    await expect(backToTopIcon).toHaveCSS('width', '48px');
  });
});
