import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const routes = [
  '/',
  '/learn/',
  '/learn/your-first-accessibility-review/',
  '/learn/practical-screen-reader-testing/',
  '/methods/',
  '/methods/testing-keyboard-accessibility/',
  '/methods/testing-visual-accessibility/',
  '/methods/testing-text-spacing-and-user-overrides/',
  '/methods/testing-forced-colors-and-high-contrast/',
  '/methods/testing-motion-animation-and-flashing/',
  '/methods/testing-mobile-touch-and-orientation/',
  '/methods/testing-media-accessibility/',
  '/methods/testing-zoom-and-reflow/',
  '/methods/testing-with-automated-tools/',
  '/methods/testing-image-alternative-text/',
  '/methods/testing-forms-and-validation/',
  '/methods/screen-reader-page-structure-and-links/',
  '/methods/testing-data-tables-with-a-screen-reader/',
  '/methods/testing-controls-with-a-screen-reader/',
  '/methods/screen-reader-icons-and-svg/',
  '/methods/screen-reader-language-changes/',
  '/methods/testing-modal-dialogs/',
  '/exercises/',
  '/exercises/finding-visual-problems-in-an-account-dashboard/',
  '/exercises/testing-text-spacing-on-a-community-services-page/',
  '/exercises/testing-forced-colors-in-a-journey-planner/',
  '/exercises/testing-motion-preferences-on-a-parcel-tracking-dashboard/',
  '/exercises/testing-touch-interaction-on-a-community-festival-map/',
  '/exercises/testing-a-community-announcement-video/',
  '/exercises/testing-an-appointment-booking-at-high-zoom/',
  '/exercises/comparing-automated-and-manual-findings/',
  '/exercises/reviewing-structure-and-links-in-a-community-resources-directory/',
  '/exercises/testing-a-community-course-timetable-with-a-screen-reader/',
  '/exercises/testing-controls-in-a-community-events-finder/',
  '/exercises/evaluating-image-alternative-text-in-context/',
  '/exercises/reviewing-icons-and-svgs-in-a-community-events-dashboard/',
  '/exercises/testing-language-changes-on-a-community-library-noticeboard/',
  '/exercises/testing-modal-dialogs-in-account-settings/',
  '/exercises/testing-a-community-course-registration-form/',
  '/journeys/',
  '/journeys/reviewing-a-course-registration-before-launch/',
  '/journeys/reviewing-a-community-conference-programme/',
  '/about/',
  '/accessibility/',
  '/404.html',
];

test.describe('Landing page accessibility', () => {
  for (const route of routes) {
    test(`${route} has no automatically detectable accessibility issues`, async ({ page }) => {
      await page.goto(route, { waitUntil: 'networkidle' });

      const accessibilityScanResults = await new AxeBuilder({ page }).analyze();

      expect(accessibilityScanResults.violations).toEqual([]);
    });
  }
});
