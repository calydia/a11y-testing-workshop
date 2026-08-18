import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const pathUrl = '/learn/your-first-accessibility-review/';
const screenReaderPathUrl = '/learn/practical-screen-reader-testing/';

const expectedSteps = [
  ['Testing method', 'Testing with automated tools', '/methods/testing-with-automated-tools/'],
  ['Exercise', 'Comparing automated and manual findings', '/exercises/comparing-automated-and-manual-findings/'],
  ['Testing method', 'Testing keyboard accessibility', '/methods/testing-keyboard-accessibility/'],
  ['Exercise', 'Keyboard testing a preferences form', '/exercises/keyboard-testing-a-preferences-form/'],
  ['Testing method', 'Testing visual accessibility', '/methods/testing-visual-accessibility/'],
  ['Exercise', 'Finding visual problems in an account dashboard', '/exercises/finding-visual-problems-in-an-account-dashboard/'],
  ['Testing method', 'Testing text spacing and user overrides', '/methods/testing-text-spacing-and-user-overrides/'],
  ['Exercise', 'Testing text spacing on a community-services page', '/exercises/testing-text-spacing-on-a-community-services-page/'],
  ['Testing method', 'Testing forced colors and high contrast', '/methods/testing-forced-colors-and-high-contrast/'],
  ['Exercise', 'Testing forced colors in a journey planner', '/exercises/testing-forced-colors-in-a-journey-planner/'],
  ['Testing method', 'Testing motion, animation, and flashing', '/methods/testing-motion-animation-and-flashing/'],
  ['Exercise', 'Testing motion preferences on a parcel-tracking dashboard', '/exercises/testing-motion-preferences-on-a-parcel-tracking-dashboard/'],
  ['Testing method', 'Testing mobile touch and orientation', '/methods/testing-mobile-touch-and-orientation/'],
  ['Exercise', 'Testing touch interaction on a community-festival map', '/exercises/testing-touch-interaction-on-a-community-festival-map/'],
  ['Testing method', 'Testing media accessibility', '/methods/testing-media-accessibility/'],
  ['Exercise', 'Testing a community announcement video', '/exercises/testing-a-community-announcement-video/'],
  ['Testing method', 'Testing zoom and reflow', '/methods/testing-zoom-and-reflow/'],
  ['Exercise', 'Testing an appointment booking at high zoom', '/exercises/testing-an-appointment-booking-at-high-zoom/'],
  ['Path checkpoint', 'Prepare for screen-reader checks', '#prepare-for-screen-reader-checks'],
  ['Testing method', 'Testing forms and validation', '/methods/testing-forms-and-validation/'],
  ['Exercise', 'Testing a community-course registration form', '/exercises/testing-a-community-course-registration-form/'],
  ['Testing method', 'Testing time limits and interruptions', '/methods/testing-time-limits-and-interruptions/'],
  ['Exercise', 'Testing session timeout in a community-support application', '/exercises/testing-session-timeout-in-a-community-support-application/'],
];

const expectedScreenReaderSteps = [
  ['Path checkpoint', 'Prepare your screen reader', '#prepare-your-screen-reader'],
  ['Testing method', 'Testing page structure and links with a screen reader', '/methods/screen-reader-page-structure-and-links/'],
  ['Exercise', 'Reviewing structure and links in a community resources directory', '/exercises/reviewing-structure-and-links-in-a-community-resources-directory/'],
  ['Testing method', 'Testing data tables with a screen reader', '/methods/testing-data-tables-with-a-screen-reader/'],
  ['Exercise', 'Testing a community-course timetable with a screen reader', '/exercises/testing-a-community-course-timetable-with-a-screen-reader/'],
  ['Testing method', 'Testing controls with a screen reader', '/methods/testing-controls-with-a-screen-reader/'],
  ['Exercise', 'Testing controls in a community events finder', '/exercises/testing-controls-in-a-community-events-finder/'],
  ['Testing method', 'Testing image alternative text', '/methods/testing-image-alternative-text/'],
  ['Exercise', 'Evaluating image alternative text in context', '/exercises/evaluating-image-alternative-text-in-context/'],
  ['Testing method', 'Testing icons and SVGs with a screen reader', '/methods/screen-reader-icons-and-svg/'],
  ['Exercise', 'Reviewing icons and SVGs in a community events dashboard', '/exercises/reviewing-icons-and-svgs-in-a-community-events-dashboard/'],
  ['Testing method', 'Testing language changes with a screen reader', '/methods/screen-reader-language-changes/'],
  ['Exercise', 'Testing language changes on a community library noticeboard', '/exercises/testing-language-changes-on-a-community-library-noticeboard/'],
  ['Testing method', 'Testing modal dialogs', '/methods/testing-modal-dialogs/'],
  ['Exercise', 'Testing modal dialogs in account settings', '/exercises/testing-modal-dialogs-in-account-settings/'],
];

test('Learning paths listing publishes the first path', async ({ page }) => {
  await page.goto('/learn/');
  await expect(page.getByText('No published content is available in this section yet.')).toHaveCount(0);
  await expect(page.locator('main article h2 > a')).toHaveText([
    'Your first accessibility review',
    'Practical screen-reader testing',
  ]);
  await expect(page.getByRole('link', { name: 'Your first accessibility review' })).toHaveAttribute('href', pathUrl);
  await expect(page.getByRole('link', { name: 'Practical screen-reader testing' })).toHaveAttribute('href', screenReaderPathUrl);
  await expect(page.getByText('recommended broad starting point', { exact: false })).toBeVisible();
  await expect(page.getByText('independently or after the first path', { exact: false })).toBeVisible();
  await expect(page.getByText('data tables, controls, images, graphics, language changes, and modal dialogs', { exact: false })).toBeVisible();
});

test('each Learning path explains what its total estimate includes', async ({ page }) => {
  for (const url of [pathUrl, screenReaderPathUrl]) {
    await page.goto(url);
    const note = page.locator('[data-learning-path-time-note]');
    await expect(note).toContainText('setup, note-taking, reviewing results, and repetition');
    await expect(note).toContainText('Individual step times cover the work in that Testing method or Exercise');
    await expect(note).toHaveCSS('font-size', '16px');
  }
});

test('each Learning path links to its matching journey and optional companion path', async ({ page }) => {
  await page.goto(pathUrl);
  await expect(page.getByRole('link', { name: 'Reviewing a course registration before launch' })).toHaveAttribute(
    'href',
    '/journeys/reviewing-a-course-registration-before-launch/',
  );
  await expect(page.locator('[data-content-body]').getByRole('link', { name: 'Practical screen-reader testing' })).toHaveAttribute('href', screenReaderPathUrl);
  await expect(page.locator('main a[href="/methods/screen-reader-icons-and-svg/"]')).toHaveCount(0);

  await page.goto(screenReaderPathUrl);
  await expect(page.getByRole('link', { name: 'Reviewing a community conference programme' })).toHaveAttribute(
    'href',
    '/journeys/reviewing-a-community-conference-programme/',
  );
  const whereNext = page.locator('[data-content-body] h2', { hasText: 'Where to go next' }).locator('~ p');
  await expect(whereNext.getByRole('link', { name: 'Your first accessibility review' })).toHaveAttribute('href', pathUrl);
});

test('first Learning path renders metadata, outcomes, and navigation', async ({ page }) => {
  const response = await page.goto(pathUrl);
  expect(response?.ok()).toBe(true);
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Your first accessibility review');
  const metadata = page.locator('[data-learning-path-meta]');
  await expect(metadata).toContainText('Level: beginner');
  await expect(metadata).toContainText('Estimated time: About 8 hours 50 minutes');
  await expect(metadata.locator('dl')).toHaveCSS('font-size', '16px');
  await expect(page.locator('[data-content-heading] [data-learning-path-meta]')).toHaveCount(1);
  const summary = page.locator('[data-content-heading] .introduction');
  expect(await summary.evaluate((element, metadataElement) => Boolean(element.compareDocumentPosition(metadataElement) & Node.DOCUMENT_POSITION_FOLLOWING), await metadata.elementHandle())).toBe(true);
  await expect(page.getByRole('heading', { level: 2, name: 'What you will learn' })).toBeVisible();
  await expect(page.locator('[data-learning-outcomes] li')).toHaveCount(7);

  const breadcrumb = page.getByRole('navigation', { name: 'Breadcrumbs' }).getByRole('listitem');
  await expect(breadcrumb).toHaveText(['Home/', 'Learning paths/', 'Your first accessibility review']);
  await expect(page.getByRole('navigation', { name: 'Learning paths' }).getByRole('link', { name: 'Your first accessibility review' })).toHaveAttribute('aria-current', 'page');
});

test('path renders the exact interleaved twenty-three-step sequence', async ({ page }) => {
  await page.goto(pathUrl);
  const steps = page.locator('[data-learning-path-steps] > li');
  await expect(steps).toHaveCount(expectedSteps.length);

  for (const [index, [type, title, href]] of expectedSteps.entries()) {
    const step = steps.nth(index);
    await expect(step.locator('[data-step-type]')).toHaveText(type);
    await expect(step.locator('[data-step-type]')).toHaveCSS('text-transform', 'none');
    await expect(step.locator('[data-step-type]')).toHaveCSS('letter-spacing', 'normal');
    await expect(step.getByRole('link', { name: title, exact: true })).toHaveAttribute('href', href);
  }
});

test('referenced steps include summaries and item durations', async ({ page }) => {
  await page.goto(pathUrl);
  const referencedSteps = page.locator('[data-learning-path-steps] > li:not([data-content-step])');
  await expect(referencedSteps).toHaveCount(22);
  for (const step of await referencedSteps.all()) {
    await expect(step.getByRole('heading', { level: 3 })).toHaveCSS('font-size', '20px');
    await expect(step.locator('[data-step-summary]')).not.toBeEmpty();
    await expect(step.locator('[data-step-summary]')).toHaveCSS('font-size', '18px');
    await expect(step.locator('[data-step-time]')).toContainText(/\d+ minutes/);
    await expect(step.locator('[data-step-time]')).toHaveCSS('font-size', '18px');
  }
});

test('checkpoint links to its matching instructional section', async ({ page }) => {
  await page.goto(pathUrl);
  const checkpoint = page.locator('[data-content-step]');
  await expect(checkpoint).toHaveCount(1);
  await checkpoint.getByRole('link', { name: 'Prepare for screen-reader checks' }).click();
  await expect(page).toHaveURL(`${pathUrl}#prepare-for-screen-reader-checks`);
  await expect(page.getByRole('heading', { level: 2, name: 'Prepare for screen-reader checks' })).toBeVisible();
});

test('path has no progress tracking and passes axe', async ({ page }) => {
  await page.goto(pathUrl);
  await expect(page.getByRole('checkbox')).toHaveCount(0);
  await expect(page.getByRole('progressbar')).toHaveCount(0);
  await expect(page.locator('[data-progress], [data-complete]')).toHaveCount(0);
  expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
});

test('path links have focus indicators and fit a narrow viewport', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(pathUrl);
  const firstStepLink = page.locator('[data-learning-path-steps] a').first();
  await firstStepLink.focus();
  await expect(firstStepLink).toHaveCSS('outline-style', 'solid');
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(390);
});

test('Practical screen-reader testing renders independent metadata, outcomes, and navigation', async ({ page }) => {
  const response = await page.goto(screenReaderPathUrl);
  expect(response?.ok()).toBe(true);
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Practical screen-reader testing');
  await expect(page.locator('[data-learning-path-meta]')).toContainText('Level: beginner');
  await expect(page.locator('[data-learning-path-meta]')).toContainText('Estimated time: About 5 hours 20 minutes');
  await expect(page.locator('[data-learning-outcomes] li')).toHaveCount(8);

  const breadcrumb = page.getByRole('navigation', { name: 'Breadcrumbs' }).getByRole('listitem');
  await expect(breadcrumb).toHaveText(['Home/', 'Learning paths/', 'Practical screen-reader testing']);
  const navigation = page.getByRole('navigation', { name: 'Learning paths' });
  await expect(navigation.getByRole('link')).toHaveText([
    'All Learning paths',
    'Your first accessibility review',
    'Practical screen-reader testing',
  ]);
  await expect(navigation.getByRole('link', { name: 'Practical screen-reader testing' })).toHaveAttribute('aria-current', 'page');
});

test('screen-reader path renders its exact interleaved progression', async ({ page }) => {
  await page.goto(screenReaderPathUrl);
  const steps = page.locator('[data-learning-path-steps] > li');
  await expect(steps).toHaveCount(expectedScreenReaderSteps.length);

  for (const [index, [type, title, href]] of expectedScreenReaderSteps.entries()) {
    const step = steps.nth(index);
    await expect(step.locator('[data-step-type]')).toHaveText(type);
    await expect(step.locator('[data-step-type]')).toHaveCSS('text-transform', 'none');
    await expect(step.getByRole('link', { name: title, exact: true })).toHaveAttribute('href', href);
    await expect(step.locator('[data-step-summary]')).not.toBeEmpty();
    if (type !== 'Path checkpoint') await expect(step.locator('[data-step-time]')).toContainText(/\d+ minutes/);
  }
});

test('screen-reader setup checkpoint links to its matching guidance', async ({ page }) => {
  await page.goto(screenReaderPathUrl);
  await page.getByRole('link', { name: 'Prepare your screen reader', exact: true }).click();
  await expect(page).toHaveURL(`${screenReaderPathUrl}#prepare-your-screen-reader`);
  await expect(page.getByRole('heading', { level: 2, name: 'Prepare your screen reader' })).toBeVisible();
});

test('each Learning path explains its own practice model', async ({ page }) => {
  await page.goto(pathUrl);
  await expect(page.getByText('The Exercises use different small interfaces.', { exact: false })).toBeVisible();

  await page.goto(screenReaderPathUrl);
  await expect(page.getByText('The demonstrations provide guided practice', { exact: false })).toBeVisible();
  await expect(page.getByText('Each Testing method is followed by an Exercise so you can apply its procedure independently before moving to a broader Testing journey.', { exact: true })).toBeVisible();
  await expect(page.getByRole('checkbox')).toHaveCount(0);
  await expect(page.getByRole('progressbar')).toHaveCount(0);
  await expect(page.locator('[data-progress], [data-complete], [data-grade]')).toHaveCount(0);
});

test('each Learning path ends with contextual scope guidance', async ({ page }) => {
  for (const url of [pathUrl, screenReaderPathUrl]) {
    await page.goto(url);
    const content = page.locator('[data-content-body]');
    const heading = content.getByRole('heading', { level: 2, name: 'Keep the scope in mind' });
    await expect(heading).toBeVisible();
    await expect(heading.locator('~ p').getByRole('link', { name: /full scope and limitations of the Lab/i })).toHaveAttribute(
      'href',
      '/about/',
    );

    const authoredHeadings = content.getByRole('heading', { level: 2 });
    await expect(authoredHeadings.last()).toHaveText('Keep the scope in mind');
  }
});

test('screen-reader path has visible focus and no narrow-viewport overflow', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(screenReaderPathUrl);
  const firstStepLink = page.locator('[data-learning-path-steps] a').first();
  await firstStepLink.focus();
  await expect(firstStepLink).toHaveCSS('outline-style', 'solid');
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(390);
});
