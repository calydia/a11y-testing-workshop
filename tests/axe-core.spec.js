import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const routes = [
  '/',
  '/learn/',
  '/learn/your-first-accessibility-review/',
  '/methods/',
  '/methods/testing-keyboard-accessibility/',
  '/methods/testing-visual-accessibility/',
  '/methods/testing-zoom-and-reflow/',
  '/methods/testing-with-automated-tools/',
  '/methods/testing-image-alternative-text/',
  '/methods/testing-forms-and-validation/',
  '/methods/screen-reader-page-structure-and-links/',
  '/methods/screen-reader-icons-and-svg/',
  '/methods/screen-reader-language-changes/',
  '/methods/testing-modal-dialogs/',
  '/exercises/',
  '/exercises/finding-visual-problems-in-an-account-dashboard/',
  '/exercises/testing-an-appointment-booking-at-high-zoom/',
  '/exercises/comparing-automated-and-manual-findings/',
  '/exercises/evaluating-image-alternative-text-in-context/',
  '/exercises/testing-a-community-course-registration-form/',
  '/journeys/',
  '/about/',
];

test.describe('Landing page accessibility', () => {
  for (const route of routes) {
    test(`${route} has no automatically detectable accessibility issues`, async ({ page }) => {
      await page.goto(route, { waitUntil: 'networkidle' });

      const builder = new AxeBuilder({ page });
      if (route.startsWith('/exercises/') && route !== '/exercises/') builder.exclude('iframe');
      const accessibilityScanResults = await builder.analyze();

      expect(accessibilityScanResults.violations).toEqual([]);
    });
  }
});
