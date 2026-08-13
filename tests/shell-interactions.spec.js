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
    const initialState = await toggle.getAttribute('aria-pressed');

    await toggle.focus();
    await page.keyboard.press('Enter');

    await expect(toggle).toHaveAttribute('aria-pressed', initialState === 'true' ? 'false' : 'true');
  });

  test('back-to-top returns focus to the page header', async ({ page }) => {
    await page.goto('/');
    const button = page.getByRole('button', { name: 'Back to top' });

    await button.focus();
    await page.keyboard.press('Enter');

    await expect(page.locator('#page-top')).toBeFocused();
    await expect(page.locator('#page-top')).toHaveAttribute('tabindex', '-1');
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
});
