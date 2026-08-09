import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const routes = [
  '/',
  '/learn/',
  '/methods/',
  '/methods/testing-keyboard-accessibility/',
  '/methods/testing-visual-accessibility/',
  '/methods/screen-reader-page-structure-and-links/',
  '/methods/screen-reader-icons-and-svg/',
  '/methods/screen-reader-language-changes/',
  '/methods/testing-modal-dialogs/',
  '/exercises/',
  '/exercises/finding-visual-problems-in-an-account-dashboard/',
  '/journeys/',
  '/about/',
];

test.describe('Landing page accessibility', () => {
  for (const route of routes) {
    test(`${route} has no automatically detectable accessibility issues`, async ({ page }) => {
      await page.goto(route, { waitUntil: 'networkidle' });

      const builder = new AxeBuilder({ page });
      if (route === '/exercises/finding-visual-problems-in-an-account-dashboard/') builder.exclude('iframe');
      const accessibilityScanResults = await builder.analyze();

      expect(accessibilityScanResults.violations).toEqual([]);
    });
  }
});
