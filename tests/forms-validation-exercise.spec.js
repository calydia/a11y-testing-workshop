import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const exercisePath = '/exercises/testing-a-community-course-registration-form/';
const fixturePath = '/exercise-fixtures/course-registration/';
const iframeTitle = 'Community course registration form exercise';

test('forms Exercise renders its learning structure and fixture', async ({ page, request }) => {
  const response = await page.goto(exercisePath);
  expect(response?.ok()).toBe(true);
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Testing a community-course registration form');
  await expect(page.getByText('Difficulty: beginner')).toBeVisible();
  await expect(page.getByText('Estimated time: 25 minutes')).toBeVisible();
  await expect(page.getByRole('link', { name: 'Testing forms and validation' })).toHaveAttribute('href', '/methods/testing-forms-and-validation/');
  await expect(page.locator(`iframe[title="${iframeTitle}"]`)).toHaveAttribute('src', fixturePath);
  await expect(page.getByRole('link', { name: 'Open exercise in a new page' })).toHaveAttribute('href', fixturePath);
  expect((await request.get(fixturePath)).ok()).toBe(true);
});

test('fixture exposes exactly six intentional findings', async ({ page }) => {
  await page.goto(fixturePath);
  await expect(page.locator('[data-form-finding]')).toHaveCount(6);
});

test('initial form exposes the intended naming, description, and grouping defects', async ({ page }) => {
  await page.goto(fixturePath);
  await expect(page.locator('label[for="participant-name"]')).toContainText('Full name');
  await expect(page.locator('#registrant-name')).toHaveAccessibleName('');
  await expect(page.locator('#email-format')).toBeVisible();
  await expect(page.locator('#email')).toHaveAccessibleDescription('');
  await expect(page.locator('[data-form-finding="unnamed-format-group"]')).toHaveAccessibleName('');
  await expect(page.getByRole('radio', { name: 'In person' })).toBeVisible();
  await expect(page.getByRole('radio', { name: 'Online' })).toBeVisible();
});

test('invalid submission shows errors, retains values, and leaves focus on submit', async ({ page }) => {
  await page.goto(fixturePath);
  await page.locator('#email').fill('learner@example.com');
  const submit = page.getByRole('button', { name: 'Register for course' });
  await submit.click();

  await expect(page.locator('#error-summary')).toBeVisible();
  await expect(page.locator('[data-form-finding="unassociated-inline-errors"] .field-error')).toHaveCount(3);
  await expect(page.locator('#email')).toHaveValue('learner@example.com');
  await expect(submit).toBeFocused();
  await expect(page.locator('#registrant-name')).not.toHaveAttribute('aria-describedby');
  await expect(page.locator('#registrant-name')).not.toHaveAttribute('aria-errormessage');
});

test('corrected submission shows an unannounced and unfocused confirmation', async ({ page }) => {
  await page.goto(fixturePath);
  await page.locator('#registrant-name').fill('Ada Learner');
  await page.locator('#email').fill('ada@example.com');
  await page.getByRole('radio', { name: 'Online' }).check();
  await page.getByRole('checkbox', { name: /registration details/i }).check();
  await page.getByRole('button', { name: 'Register for course' }).click();

  const confirmation = page.locator('#registration-confirmation');
  await expect(confirmation).toBeVisible();
  await expect(confirmation).toContainText('Registration received');
  await expect(confirmation).not.toBeFocused();
  await expect(confirmation).not.toHaveAttribute('role');
  await expect(confirmation).not.toHaveAttribute('aria-live');
  await expect(confirmation).not.toHaveAttribute('tabindex');
});

test('unaffected controls work with a keyboard and show visible focus', async ({ page }) => {
  await page.goto(fixturePath);
  const email = page.locator('#email');
  await email.focus();
  await expect(email).toHaveCSS('outline-style', 'solid');
  await page.getByRole('radio', { name: 'In person' }).focus();
  await page.keyboard.press('ArrowRight');
  await expect(page.getByRole('radio', { name: 'Online' })).toBeChecked();
});

for (const theme of ['light', 'dark']) {
  test(`axe reports only the disconnected full-name label in the ${theme} fixture`, async ({ page }) => {
    await page.goto(fixturePath);
    await page.evaluate((selectedTheme) => {
      document.documentElement.classList.remove('light', 'dark');
      document.documentElement.classList.add(selectedTheme);
    }, theme);

    const initial = await new AxeBuilder({ page }).analyze();
    expect(initial.violations.map((violation) => violation.id)).toEqual(['label']);
    expect(initial.violations[0].nodes).toHaveLength(1);
    expect(initial.violations[0].nodes[0].target).toEqual(['#registrant-name']);

    await page.locator('#email').fill('learner@example.com');
    await page.getByRole('button', { name: 'Register for course' }).click();
    const invalid = await new AxeBuilder({ page }).analyze();
    expect(invalid.violations.map((violation) => violation.id)).toEqual(['label']);
    expect(invalid.violations[0].nodes[0].target).toEqual(['#registrant-name']);
  });
}

test('outer shell passes axe, themes synchronize, and fixture fits a narrow viewport', async ({ page }) => {
  await page.goto(exercisePath);
  expect((await new AxeBuilder({ page }).exclude('iframe').analyze()).violations).toEqual([]);
  await page.evaluate(() => localStorage.setItem('darkMode', 'enabled'));
  await page.reload();
  const frame = page.frameLocator(`iframe[title="${iframeTitle}"]`);
  await expect(frame.locator('html')).toHaveClass(/dark/);
  await page.locator('#theme-toggle-button').click();
  await expect(frame.locator('html')).toHaveClass(/light/);

  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(fixturePath);
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(390);
});

test('hints remain progressive and solution lists six findings', async ({ page }) => {
  await page.goto(exercisePath);
  const hints = page.locator('details').filter({ hasText: 'Hints' });
  const solution = page.locator('details').filter({ hasText: 'Solution' });
  await expect(hints.locator('li')).toHaveCount(3);
  await expect(solution.locator('section')).toHaveCount(6);
  await expect(solution).not.toHaveAttribute('open');
});
