import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const journeyPath = '/journeys/reviewing-a-course-registration-before-launch/';
const conferenceJourneyPath = '/journeys/reviewing-a-community-conference-programme/';

const methods = [
  ['Testing with automated tools', '/methods/testing-with-automated-tools/'],
  ['Testing keyboard accessibility', '/methods/testing-keyboard-accessibility/'],
  ['Testing visual accessibility', '/methods/testing-visual-accessibility/'],
  ['Testing text spacing and user overrides', '/methods/testing-text-spacing-and-user-overrides/'],
  ['Testing zoom and reflow', '/methods/testing-zoom-and-reflow/'],
  ['Testing forms and validation', '/methods/testing-forms-and-validation/'],
];

const stages = [
  'Define the review scope',
  'Establish an automated baseline',
  'Test core manual access',
  'Test responsive conditions',
  'Test the complete form journey',
  'Consolidate and recommend',
];

const conferenceMethods = [
  ['Testing page structure and links with a screen reader', '/methods/screen-reader-page-structure-and-links/'],
  ['Testing data tables with a screen reader', '/methods/testing-data-tables-with-a-screen-reader/'],
  ['Testing controls with a screen reader', '/methods/testing-controls-with-a-screen-reader/'],
  ['Testing image alternative text', '/methods/testing-image-alternative-text/'],
  ['Testing icons and SVGs with a screen reader', '/methods/screen-reader-icons-and-svg/'],
  ['Testing language changes with a screen reader', '/methods/screen-reader-language-changes/'],
  ['Testing modal dialogs', '/methods/testing-modal-dialogs/'],
];

const conferenceStages = [
  'Define the review conditions',
  'Find your way through the programme',
  'Choose a session using its complete content',
  'Review multilingual session information',
  'Inspect session details and return to the programme',
  'Consolidate and recommend',
];

test('Testing journeys listing publishes the first journey', async ({ page }) => {
  await page.goto('/journeys/');
  await expect(page.getByText('No published content is available in this section yet.')).toHaveCount(0);
  await expect(page.locator('main article h2 > a')).toHaveText([
    'Reviewing a course registration before launch',
    'Reviewing a community conference programme',
  ]);
  await expect(page.getByRole('link', { name: 'Reviewing a course registration before launch' })).toHaveAttribute('href', journeyPath);
  await expect(page.getByRole('link', { name: 'Reviewing a community conference programme' })).toHaveAttribute('href', conferenceJourneyPath);
});

test('journey renders metadata, scenario, role, objectives, and navigation', async ({ page }) => {
  const response = await page.goto(journeyPath);
  expect(response?.ok()).toBe(true);
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Reviewing a course registration before launch');
  const meta = page.locator('[data-journey-meta]');
  await expect(meta).toContainText('Difficulty: beginner');
  await expect(meta).toContainText('Estimated time: 105 minutes');
  await expect(meta.locator('dl')).toHaveCSS('font-size', '16px');
  await expect(page.locator('[data-journey-scenario]')).toContainText('pre-release accessibility review');
  await expect(page.locator('[data-journey-role]')).toContainText('Accessibility tester supporting a pre-release review');
  await expect(page.locator('[data-journey-objectives] li')).toHaveCount(5);

  await expect(page.getByRole('navigation', { name: 'Breadcrumbs' }).getByRole('listitem')).toHaveText([
    'Home/', 'Testing journeys/', 'Reviewing a course registration before launch',
  ]);
  await expect(page.getByRole('navigation', { name: 'Testing journeys' }).getByRole('link', { name: 'Reviewing a course registration before launch' })).toHaveAttribute('aria-current', 'page');
});

test('journey lists six methods in authored order', async ({ page }) => {
  await page.goto(journeyPath);
  const methodItems = page.locator('[data-journey-methods] > li');
  await expect(methodItems).toHaveCount(6);
  for (const [index, [title, href]] of methods.entries()) {
    const link = methodItems.nth(index).getByRole('link', { name: title });
    await expect(link).toHaveAttribute('href', href);
    await expect(methodItems.nth(index).locator('[data-method-summary]')).not.toBeEmpty();
  }
});

test('journey renders six ordered stages with relevant method links', async ({ page }) => {
  await page.goto(journeyPath);
  const stageItems = page.locator('[data-journey-stages] > li');
  await expect(stageItems).toHaveCount(6);
  await expect(stageItems.getByRole('heading', { level: 3 })).toHaveText(stages);
  for (const item of await stageItems.all()) await expect(item.locator('[data-stage-task]')).not.toBeEmpty();
  await expect(stageItems.nth(0).locator('[data-stage-methods]')).toHaveCount(0);
  await expect(stageItems.nth(1).getByRole('link')).toHaveText(['Testing with automated tools']);
  await expect(stageItems.nth(2).getByRole('link')).toHaveText(['Testing keyboard accessibility', 'Testing visual accessibility']);
  await expect(stageItems.nth(3).getByRole('link')).toHaveText(['Testing text spacing and user overrides', 'Testing zoom and reflow']);
  await expect(stageItems.nth(4).getByRole('link')).toHaveText(['Testing forms and validation', 'Testing keyboard accessibility']);
  await expect(stageItems.nth(5).getByRole('link')).toHaveText(methods.map(([title]) => title));
});

test('optional preparation and workspace reuse existing routes without solution leakage', async ({ page }) => {
  await page.goto(journeyPath);
  const preparation = page.locator('[data-journey-preparation]');
  await expect(preparation.getByRole('link', { name: 'Testing a community-course registration form' })).toHaveAttribute('href', '/exercises/testing-a-community-course-registration-form/');
  await expect(preparation.locator('[data-preparation-type="learning-path"]')).toHaveCount(1);
  await expect(preparation.getByRole('link', { name: 'Your first accessibility review' })).toHaveAttribute('href', '/learn/your-first-accessibility-review/');
  await expect(preparation).toContainText('Level: beginner');
  await expect(preparation).toContainText('Estimated time: 420 minutes');
  await expect(preparation).toContainText('25 minutes');
  await expect(preparation).toContainText(/before consulting the Exercise solution/i);
  await expect(page.getByRole('link', { name: 'Open the Testing journey workspace for course registration' })).toHaveAttribute('href', '/exercise-fixtures/course-registration/');
  await expect(page.getByText('The full-name label is not associated with its input')).toHaveCount(0);
  const workspace = page.getByRole('link', { name: 'Open the Testing journey workspace for course registration' });
  const stages = page.locator('[data-journey-stages]');
  expect(await workspace.evaluate((element, stagesElement) => Boolean(element.compareDocumentPosition(stagesElement) & Node.DOCUMENT_POSITION_FOLLOWING), await stages.elementHandle())).toBe(true);
});

test('journey renders five static deliverables without progress or grading controls', async ({ page }) => {
  await page.goto(journeyPath);
  await expect(page.locator('[data-journey-deliverables] li')).toHaveCount(5);
  await expect(page.getByRole('checkbox')).toHaveCount(0);
  await expect(page.getByRole('progressbar')).toHaveCount(0);
  await expect(page.locator('[data-progress], [data-complete], form')).toHaveCount(0);
  await expect(page.getByText(/required finding count|score|grade/i)).toHaveCount(0);
});

test('journey passes axe, exposes focus, and fits a narrow viewport', async ({ page }) => {
  await page.goto(journeyPath);
  expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
  const workspace = page.getByRole('link', { name: 'Open the Testing journey workspace for course registration' });
  await workspace.focus();
  await expect(workspace).toHaveCSS('outline-style', 'solid');

  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(journeyPath);
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(390);
});

test('conference journey renders intermediate metadata, scenario, and navigation', async ({ page }) => {
  const response = await page.goto(conferenceJourneyPath);
  expect(response?.ok()).toBe(true);
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Reviewing a community conference programme');
  const meta = page.locator('[data-journey-meta]');
  await expect(meta).toContainText('Difficulty: intermediate');
  await expect(meta).toContainText('Estimated time: 105 minutes');
  await expect(page.locator('[data-journey-scenario]')).toContainText('preparing to publish its programme');
  await expect(page.locator('[data-journey-role]')).toContainText('Accessibility tester reviewing a conference programme before publication');
  await expect(page.locator('[data-journey-objectives] li')).toHaveCount(8);
  await expect(page.getByRole('navigation', { name: 'Breadcrumbs' }).getByRole('listitem')).toHaveText([
    'Home/', 'Testing journeys/', 'Reviewing a community conference programme',
  ]);
  const navigation = page.getByRole('navigation', { name: 'Testing journeys' });
  await expect(navigation.getByRole('link')).toHaveText([
    'All Testing journeys',
    'Reviewing a course registration before launch',
    'Reviewing a community conference programme',
  ]);
  await expect(navigation.getByRole('link', { name: 'Reviewing a community conference programme' })).toHaveAttribute('aria-current', 'page');
});

test('conference journey lists seven screen-reader methods and its recommended path', async ({ page }) => {
  await page.goto(conferenceJourneyPath);
  const methodItems = page.locator('[data-journey-methods] > li');
  await expect(methodItems).toHaveCount(7);
  for (const [index, [title, href]] of conferenceMethods.entries()) {
    await expect(methodItems.nth(index).getByRole('link', { name: title })).toHaveAttribute('href', href);
  }
  const preparation = page.locator('[data-journey-preparation]');
  await expect(preparation.locator('[data-preparation-type="learning-path"]')).toHaveCount(1);
  await expect(preparation.locator('[data-preparation-type="exercise"]')).toHaveCount(0);
  await expect(preparation.getByRole('link', { name: 'Practical screen-reader testing' })).toHaveAttribute('href', '/learn/practical-screen-reader-testing/');
  await expect(preparation).toContainText('Level: beginner');
  await expect(preparation).toContainText('Estimated time: 320 minutes');
  await expect(preparation).not.toContainText('Exercise solution');
});

test('conference journey renders six task-led stages and five deliverables', async ({ page }) => {
  await page.goto(conferenceJourneyPath);
  const stageItems = page.locator('[data-journey-stages] > li');
  await expect(stageItems).toHaveCount(6);
  await expect(stageItems.getByRole('heading', { level: 3 })).toHaveText(conferenceStages);
  await expect(stageItems.nth(0).locator('[data-stage-methods]')).toHaveCount(0);
  await expect(stageItems.nth(1).getByRole('link')).toHaveText([conferenceMethods[0][0], conferenceMethods[1][0]]);
  await expect(stageItems.nth(2).getByRole('link')).toHaveText([conferenceMethods[2][0], conferenceMethods[3][0], conferenceMethods[4][0], conferenceMethods[0][0]]);
  await expect(stageItems.nth(3).getByRole('link')).toHaveText([conferenceMethods[5][0]]);
  await expect(stageItems.nth(4).getByRole('link')).toHaveText([conferenceMethods[2][0], conferenceMethods[6][0], conferenceMethods[0][0], conferenceMethods[4][0]]);
  await expect(stageItems.nth(5).getByRole('link')).toHaveText(conferenceMethods.map(([title]) => title));
  await expect(page.locator('[data-journey-deliverables] li')).toHaveCount(5);
});

test('conference journey links to the workspace without exposing answers or progress UI', async ({ page }) => {
  await page.goto(conferenceJourneyPath);
  const workspace = page.getByRole('link', { name: 'Open the Testing journey workspace for the community conference programme' });
  await expect(workspace).toHaveAttribute('href', '/journey-workspaces/community-conference-programme/');
  await expect(workspace).not.toHaveAttribute('target');
  await expect(page.getByRole('checkbox')).toHaveCount(0);
  await expect(page.getByRole('progressbar')).toHaveCount(0);
  await expect(page.locator('[data-progress], [data-complete], [data-grade], form')).toHaveCount(0);
  await expect(page.getByText(/eight findings|required finding count|model answer|solution/i)).toHaveCount(0);
});

test('conference journey passes axe, exposes focus, and fits a narrow viewport', async ({ page }) => {
  await page.goto(conferenceJourneyPath);
  expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
  const workspace = page.getByRole('link', { name: 'Open the Testing journey workspace for the community conference programme' });
  await workspace.focus();
  await expect(workspace).toHaveCSS('outline-style', 'solid');
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(conferenceJourneyPath);
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(390);
});
