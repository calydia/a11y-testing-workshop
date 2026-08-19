import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { expectStandaloneExercise } from './helpers/standalone-exercise.js';

const methodPath = '/methods/testing-authentication-and-verification/';
const exercisePath = '/exercises/testing-authentication-for-a-community-services-booking/';
const fixturePath = '/exercise-fixtures/community-services-authentication/';

test('authentication method and Exercise render their intermediate learning contract', async ({ page, request }) => {
  await page.goto('/methods/');
  const methodCard = page.locator('article').filter({ has: page.getByRole('link', { name: 'Testing authentication and verification' }) });
  await expect(methodCard.locator('[data-content-card-level]')).toHaveText('Intermediate');
  await expect(methodCard.locator('[data-content-card-duration]')).toHaveText('About 30 minutes');

  await page.goto(methodPath);
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Testing authentication and verification');
  const methodContent = page.locator('[data-content-body]');
  await expect(methodContent).toContainText('Map the complete authentication path');
  await expect(methodContent).toContainText('The autocomplete value off does not reliably prove');
  await expect(methodContent).toContainText('does not assess whether authentication is secure enough');
  await expect(page.getByRole('link', { name: 'Testing authentication for a community-services booking' })).toHaveAttribute('href', exercisePath);

  await page.goto(exercisePath);
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Testing authentication for a community-services booking');
  await expect(page.getByText('Difficulty: intermediate')).toBeVisible();
  await expect(page.getByText('Estimated time: 35 minutes')).toBeVisible();
  await expect(page.locator('[data-content-body]')).toContainText('Nothing you enter is submitted, stored, or retained');
  await expect(page.locator('[data-content-body]')).toContainText('Do not enter a real email address, password');
  await expect(page.getByRole('link', { name: 'Testing authentication and verification' })).toHaveAttribute('href', methodPath);
  await expectStandaloneExercise(page, request, { exercisePath, fixturePath, fixtureTitle: 'Community services authentication exercise' });
});

test('Exercise provides progressive support and exactly five closed findings', async ({ page }) => {
  await page.goto(exercisePath);
  const hints = page.locator('details').filter({ hasText: 'Hints' });
  const solution = page.locator('details').filter({ hasText: 'Solution' });
  await expect(hints.locator('li')).toHaveCount(3);
  await expect(solution.locator('section')).toHaveCount(5);
  await expect(solution).not.toHaveAttribute('open');
});

test('workspace is fictional, local, non-submitting, and non-persistent', async ({ page }) => {
  const externalRequests = [];
  page.on('request', (request) => {
    if (!request.url().startsWith('http://127.0.0.1:4321/')) externalRequests.push(request.url());
  });
  await page.addInitScript(() => {
    window.__authenticationStorageWrites = [];
    const original = Storage.prototype.setItem;
    Storage.prototype.setItem = function (key, value) {
      window.__authenticationStorageWrites.push([key, value]);
      return original.call(this, key, value);
    };
  });
  await page.goto(fixturePath);
  await expect(page.getByText(/Nothing you enter is submitted, stored, or retained/)).toBeVisible();
  await expect(page.getByText(/Do not enter a real email address, password/)).toBeVisible();
  await expect(page.locator('form')).not.toHaveAttribute('action');
  await page.locator('[data-email]').fill('alex@example.test');
  await page.locator('[data-password]').fill('fictional password');
  await page.getByRole('button', { name: 'Continue to verification' }).click();
  expect(await page.evaluate(() => window.__authenticationStorageWrites)).toEqual([]);
  expect(externalRequests).toEqual([]);
});

test('credential purposes and the two blocked paste paths remain deterministic', async ({ page }) => {
  await page.goto(fixturePath);
  const email = page.locator('[data-email]');
  const password = page.locator('[data-password]');
  await expect(email).not.toHaveAttribute('autocomplete');
  await expect(password).toHaveAttribute('autocomplete', 'new-password');

  const pasteWasCancelled = async (locator, value) => locator.evaluate((element, pastedValue) => {
    const data = new DataTransfer();
    data.setData('text/plain', pastedValue);
    return !element.dispatchEvent(new ClipboardEvent('paste', { bubbles: true, cancelable: true, clipboardData: data }));
  }, value);

  expect(await pasteWasCancelled(email, 'alex@example.test')).toBe(false);
  expect(await pasteWasCancelled(password, 'fictional password')).toBe(true);

  await email.fill('alex@example.test');
  await password.fill('fictional password');
  await page.getByRole('button', { name: 'Continue to verification' }).click();
  expect(await pasteWasCancelled(page.locator('[data-reference-input]'), 'RIVER-204')).toBe(false);
  expect(await pasteWasCancelled(page.locator('[data-code-input]'), '482951')).toBe(true);
});

test('password reveal is stateful, keyboard operable, focus preserving, and resettable', async ({ page }) => {
  await page.goto(fixturePath);
  const password = page.locator('[data-password]');
  const reveal = page.locator('[data-reveal-password]');
  await password.fill('fictional password');
  await expect(password).toHaveAttribute('type', 'password');
  await expect(reveal).toHaveAttribute('aria-pressed', 'false');
  await reveal.focus();
  await page.keyboard.press('Enter');
  await expect(reveal).toBeFocused();
  await expect(reveal).toHaveText('Hide password');
  await expect(reveal).toHaveAttribute('aria-pressed', 'true');
  await expect(password).toHaveAttribute('type', 'text');
  await page.getByRole('button', { name: 'Reset practice sign-in' }).click();
  await expect(password).toHaveAttribute('type', 'password');
  await expect(password).toHaveValue('');
  await expect(reveal).toHaveText('Show password');
  await expect(reveal).toHaveAttribute('aria-pressed', 'false');
});

test('verification hides the reference and requires unsupported recall', async ({ page }) => {
  await page.goto(fixturePath);
  const reference = page.locator('[data-booking-reference]');
  await expect(reference).toHaveText('RIVER-204');
  const copyCancelled = await reference.evaluate((element) => {
    const data = new DataTransfer();
    return !element.dispatchEvent(new ClipboardEvent('copy', { bubbles: true, cancelable: true, clipboardData: data }));
  });
  expect(copyCancelled).toBe(true);
  await page.locator('[data-email]').fill('alex@example.test');
  await page.locator('[data-password]').fill('fictional password');
  await page.getByRole('button', { name: 'Continue to verification' }).click();
  await expect(page.locator('[data-booking-summary]')).toBeHidden();
  await expect(page.locator('#verification-heading')).toBeFocused();
  await expect(page.locator('[data-reference-input]')).toBeVisible();
  await expect(page.getByRole('link', { name: /alternative|another method|help/i })).toHaveCount(0);
});

test('failed verification clears progress and gives weak recovery guidance', async ({ page }) => {
  await page.goto(fixturePath);
  await page.locator('[data-email]').fill('alex@example.test');
  await page.locator('[data-password]').fill('fictional password');
  await page.getByRole('button', { name: 'Continue to verification' }).click();
  await page.locator('[data-reference-input]').fill('WRONG-100');
  await page.locator('[data-code-input]').fill('111111');
  await page.getByRole('button', { name: 'Verify and continue' }).click();
  await expect(page.locator('[data-authentication-step="sign-in"]')).toBeVisible();
  await expect(page.locator('[data-authentication-step="verification"]')).toBeHidden();
  await expect(page.locator('[data-email]')).toHaveValue('');
  await expect(page.locator('[data-password]')).toHaveValue('');
  await expect(page.locator('[data-workflow-message]')).toHaveText('Verification failed. Try again.');
  await expect(page.locator('#authentication-heading')).toBeFocused();
});

test('successful fictional verification and reset return stable states', async ({ page }) => {
  await page.goto(fixturePath);
  await page.locator('[data-email]').fill('alex@example.test');
  await page.locator('[data-password]').fill('fictional password');
  await page.getByRole('button', { name: 'Continue to verification' }).click();
  await page.locator('[data-reference-input]').fill('RIVER-204');
  await page.locator('[data-code-input]').fill('482951');
  await page.getByRole('button', { name: 'Verify and continue' }).click();
  await expect(page.locator('[data-authentication-success]')).toBeVisible();
  await expect(page.locator('#success-heading')).toBeFocused();
  await expect(page.locator('[data-authentication-success]')).toContainText('no information was submitted, stored, or retained');
  await page.getByRole('button', { name: 'Reset practice sign-in' }).click();
  await expect(page.locator('[data-authentication]')).toBeVisible();
  await expect(page.locator('[data-booking-summary]')).toBeVisible();
  await expect(page.locator('[data-authentication-step="sign-in"]')).toBeVisible();
  await expect(page.locator('[data-authentication-step="verification"]')).toBeHidden();
  await expect(page.locator('[data-authentication-success]')).toBeHidden();
});

test('fixture preserves focus styling, responsive themes, automated accessibility, and answer boundaries', async ({ page }) => {
  await page.goto(exercisePath);
  expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
  await page.addInitScript(() => localStorage.setItem('darkMode', 'enabled'));
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(fixturePath);
  await expect(page.locator('html')).toHaveClass(/dark/);
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(390);
  const email = page.locator('[data-email]');
  await email.focus();
  await expect(email).toHaveCSS('outline-style', 'solid');
  expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
  const html = await page.locator('html').innerHTML();
  expect(html).not.toMatch(/intentional.finding|finding.count|model.answer|incorrect-credential-input-purposes|blocked-password-paste|unsupported-memory-task/i);
});
