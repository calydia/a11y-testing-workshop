import { test as base, expect } from '@playwright/test';

const siteOrigin = 'http://127.0.0.1:4321';

export const test = base.extend({
  page: async ({ page }, use) => {
    const failedNavigations = [];
    let sameOriginNavigationCount = 0;

    const recordNavigation = (response) => {
      if (response.request().resourceType() !== 'document' || response.frame() !== page.mainFrame()) return;
      if (new URL(response.url()).origin !== siteOrigin) return;

      sameOriginNavigationCount += 1;
      if (response.status() >= 400) failedNavigations.push(`${response.status()} ${response.url()}`);
    };

    page.on('response', recordNavigation);
    await use(page);
    page.off('response', recordNavigation);

    expect(failedNavigations, 'same-origin page navigations should resolve').toEqual([]);
    if (sameOriginNavigationCount > 0) {
      await expect(page.locator('html')).toHaveAttribute('lang', 'en');
    }
  },
});

export { expect };
