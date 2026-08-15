import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { expectStandaloneExercise } from './helpers/standalone-exercise.js';

const exercisePath = '/exercises/testing-modal-dialogs-in-account-settings/';
const fixturePath = '/exercise-fixtures/account-settings-dialogs/';

test('modal dialog Exercise renders its learning structure and fixture', async ({ page, request }) => {
  const response = await page.goto(exercisePath);
  expect(response?.ok()).toBe(true);
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Testing modal dialogs in account settings');
  await expect(page.getByText('Difficulty: beginner')).toBeVisible();
  await expect(page.getByText('Estimated time: 25 minutes')).toBeVisible();
  await expect(page.getByRole('link', { name: 'Testing modal dialogs', exact: true })).toHaveAttribute('href', '/methods/testing-modal-dialogs/');
  await expectStandaloneExercise(page, request, {
    exercisePath,
    fixturePath,
    fixtureTitle: 'Account settings modal dialogs exercise',
  });
});

test('custom dialog exposes all six approved interaction findings', async ({ page }) => {
  await page.goto(fixturePath);
  const opener = page.getByRole('button', { name: 'Edit contact preferences' });
  await opener.focus();
  await opener.press('Enter');

  const dialog = page.locator('[data-dialog-example="contact-preferences"]');
  await expect(dialog).toBeVisible();
  await expect(dialog).toHaveAttribute('role', 'dialog');
  await expect(dialog).toHaveAttribute('aria-modal', 'true');
  await expect(dialog).toHaveAccessibleName('');
  await expect(opener).toBeFocused();

  await page.keyboard.press('Tab');
  const backgroundButton = page.getByRole('button', { name: 'Save account details' });
  await expect(backgroundButton).toBeFocused();
  await backgroundButton.press('Enter');
  await expect(page.locator('#account-status')).toHaveText('Account details saved.');
  await expect(dialog).toBeVisible();

  await page.keyboard.press('Escape');
  await expect(dialog).toBeVisible();

  const close = dialog.getByRole('button', { name: 'Close contact preferences' });
  await close.click();
  await expect(dialog).toBeHidden();
  await expect(opener).not.toBeFocused();
});

test('native dialog preserves platform modal and focus behavior', async ({ page }) => {
  await page.goto(fixturePath);
  const opener = page.getByRole('button', { name: 'Review appointment reminder' });
  const dialog = page.locator('dialog[data-dialog-example="appointment-reminder"]');
  const initialControl = dialog.locator('input[type="checkbox"]').first();
  const close = dialog.getByRole('button', { name: 'Keep current reminder' });

  await opener.click();
  await expect(dialog).toBeVisible();
  await expect(dialog).toHaveAccessibleName('Appointment reminder');
  expect(await dialog.evaluate((element) => element.matches(':modal'))).toBe(true);
  await expect(initialControl).toBeFocused();

  await close.focus();
  await page.keyboard.press('Tab');
  const backgroundButton = page.locator('#save-account');
  await expect(backgroundButton).not.toBeFocused();
  await backgroundButton.evaluate((element) => element.focus());
  await expect(backgroundButton).not.toBeFocused();

  await page.keyboard.press('Escape');
  await expect(dialog).toBeHidden();
  await expect(opener).toBeFocused();

  await opener.click();
  await close.click();
  await expect(dialog).toBeHidden();
  await expect(opener).toBeFocused();
});

test('fixture controls retain hover and whole-control focus styling', async ({ page }) => {
  await page.goto(fixturePath);
  const button = page.getByRole('button', { name: 'Edit contact preferences' });
  const defaultBackground = await button.evaluate((element) => getComputedStyle(element).backgroundColor);
  await button.hover();
  await expect.poll(() => button.evaluate((element) => getComputedStyle(element).backgroundColor)).not.toBe(defaultBackground);
  await button.focus();
  await expect(button).toHaveCSS('outline-style', 'solid');
  await expect(button).toHaveCSS('outline-width', '2px');
  await expect(button).toHaveCSS('outline-offset', '4px');
});

test('fixture axe result is limited to the intentionally unnamed custom dialog', async ({ page }) => {
  await page.goto(fixturePath);
  await page.getByRole('button', { name: 'Edit contact preferences' }).click();
  const results = await new AxeBuilder({ page }).analyze();
  expect(results.violations.map(({ id }) => id)).toEqual(['aria-dialog-name']);
  expect(results.violations[0].nodes).toHaveLength(1);
  expect(results.violations[0].nodes[0].html).toContain('data-dialog-example="contact-preferences"');
});

test('outer shell passes axe, fixture follows theme, and both pages fit a narrow viewport', async ({ page }) => {
  await page.goto(exercisePath);
  expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
  await page.evaluate(() => localStorage.setItem('darkMode', 'enabled'));
  await page.setViewportSize({ width: 390, height: 844 });
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(390);
  await page.goto(fixturePath);
  await expect(page.locator('html')).toHaveClass(/dark/);
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(390);
});

test('fixture markup does not expose its teaching answers', async ({ page }) => {
  await page.goto(fixturePath);
  const html = await page.locator('main').innerHTML();
  expect(html).not.toMatch(/intentional.finding|finding.count|model.answer|diagnostic|broken|problem|solution/i);
});

test('hints remain progressive and solution lists six findings', async ({ page }) => {
  await page.goto(exercisePath);
  const hints = page.locator('details').filter({ hasText: 'Hints' });
  const solution = page.locator('details').filter({ hasText: 'Solution' });
  await expect(hints.locator('li')).toHaveCount(3);
  await expect(solution.locator('section')).toHaveCount(6);
  await expect(solution).not.toHaveAttribute('open');
});
