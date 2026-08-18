import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { expectStandaloneExercise } from './helpers/standalone-exercise.js';

const methodPath = '/methods/testing-time-limits-and-interruptions/';
const exercisePath = '/exercises/testing-session-timeout-in-a-community-support-application/';
const fixturePath = '/exercise-fixtures/community-support-session-timeout/';
const privacyPromise = 'This is a fictional practice application. Nothing you enter is submitted, stored, or retained. Reloading or resetting the workspace removes all entered information.';

test('time-limit method and Exercise render their paired learning contract', async ({ page, request }) => {
  await page.goto(methodPath);
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Testing time limits and interruptions');
  const content = page.locator('[data-content-body]');
  await expect(content).toContainText('inactivity, reading, interaction, authentication, and completion');
  await expect(content).toContainText('A timer is not automatically an accessibility failure');
  await expect(content).toContainText('Accelerated Exercise timing demonstrates states and transitions');
  await expect(page.getByRole('link', { name: 'Testing session timeout in a community-support application' })).toHaveAttribute('href', exercisePath);

  await page.goto(exercisePath);
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Testing session timeout in a community-support application');
  await expect(page.getByText('Difficulty: beginner')).toBeVisible();
  await expect(page.getByText('Estimated time: 30 minutes')).toBeVisible();
  await expect(page.locator('[data-content-body]')).toContainText(privacyPromise);
  await expect(page.getByRole('link', { name: 'Testing time limits and interruptions' })).toHaveAttribute('href', methodPath);
  await expectStandaloneExercise(page, request, { exercisePath, fixturePath, fixtureTitle: 'Community support session-timeout exercise' });
});

test('Exercise provides progressive hints and exactly six closed findings', async ({ page }) => {
  await page.goto(exercisePath);
  const hints = page.locator('details').filter({ hasText: 'Hints' });
  const solution = page.locator('details').filter({ hasText: 'Solution' });
  await expect(hints.locator('li')).toHaveCount(3);
  await expect(solution.locator('section')).toHaveCount(6);
  await expect(solution).not.toHaveAttribute('open');
});

test('workspace states its privacy boundary and requests only low-risk sample information', async ({ page }) => {
  const requests = [];
  page.on('request', (request) => requests.push(request.url()));
  await page.addInitScript(() => {
    window.__applicationStorageWrites = [];
    const original = Storage.prototype.setItem;
    Storage.prototype.setItem = function (key, value) {
      window.__applicationStorageWrites.push([key, value]);
      return original.call(this, key, value);
    };
  });
  await page.goto(fixturePath);
  await expect(page.getByText(privacyPromise, { exact: true })).toBeVisible();
  await expect(page.locator('input[type="password"], input[type="email"], input[type="tel"]')).toHaveCount(0);
  await expect(page.getByText(/full name|email address|home address|health information|bank|password/i)).toHaveCount(0);
  await page.locator('#support-category').selectOption('digital');
  await page.locator('#sample-note').fill('Fictional sample note');
  await page.getByRole('button', { name: 'Continue to appointment preferences' }).click();
  await page.getByRole('radio', { name: 'Morning' }).check();
  expect(await page.evaluate(() => window.__applicationStorageWrites)).toEqual([]);
  expect(requests.filter((url) => !url.startsWith('http://127.0.0.1:4321/'))).toEqual([]);
});

test('automatic demonstration opens a late five-second warning and expires once', async ({ page }) => {
  await page.goto(fixturePath);
  await page.getByRole('button', { name: 'Start short automatic demonstration' }).click();
  await expect(page.locator('[data-warning]')).toHaveAttribute('open', '', { timeout: 5500 });
  await expect(page.locator('[data-visible-countdown]')).toHaveText('5 seconds remaining');
  await expect(page.locator('[data-expired]')).toBeVisible({ timeout: 6500 });
  await expect(page.locator('[data-test-status]')).toHaveText('The practice session has expired.');
  await page.waitForTimeout(1200);
  await expect(page.locator('[data-expired]')).toHaveCount(1);
});

test('countdown announces every second and stops after reset', async ({ page }) => {
  await page.goto(fixturePath);
  await page.getByRole('button', { name: 'Show session warning' }).click();
  const announcement = page.locator('[data-countdown-announcement]');
  await expect(announcement).toHaveText('5 seconds remaining');
  await expect(announcement).toHaveText('4 seconds remaining', { timeout: 1500 });
  await expect(announcement).toHaveText('3 seconds remaining', { timeout: 1500 });
  await page.locator('[data-warning]').press('Escape');
  await expect(announcement).toHaveText('');
  await page.waitForTimeout(1200);
  await expect(announcement).toHaveText('');
  await page.getByRole('button', { name: 'Reset application' }).click();
  await expect(page.locator('[data-test-status]')).toContainText('Nothing was retained');
});

test('extension works with a pointer but not a keyboard and restores focus incorrectly', async ({ page }) => {
  await page.goto(fixturePath);
  await page.getByRole('button', { name: 'Show session warning' }).click();
  const dialog = page.locator('[data-warning]');
  const extend = page.locator('[data-extend]');
  await expect(dialog).toHaveAccessibleName('Your session is about to expire');
  expect(await page.evaluate(() => document.querySelector('[data-warning]')?.matches(':modal'))).toBe(true);
  await expect(extend).toHaveAttribute('tabindex', '-1');
  await extend.focus();
  await page.keyboard.press('Enter');
  await expect(dialog).toHaveAttribute('open', '');
  await page.keyboard.press('Space');
  await expect(dialog).toHaveAttribute('open', '');
  await extend.click();
  await expect(dialog).not.toHaveAttribute('open', '');
  await expect(page.locator('#testing-controls-heading')).toBeFocused();
  await expect(page.locator('[data-test-status]')).toHaveText('The session was extended.');
});

test('expiry discards entered information and simulated sign-in returns to step one', async ({ page }) => {
  await page.goto(fixturePath);
  await page.locator('#support-category').selectOption('digital');
  await page.locator('#sample-note').fill('Fictional sample note');
  await page.getByRole('button', { name: 'Continue to appointment preferences' }).click();
  await page.getByRole('radio', { name: 'Afternoon' }).check();
  await expect(page.locator('[data-step="2"]')).toBeVisible();
  await page.getByRole('button', { name: 'Expire session' }).click();
  await expect(page.locator('[data-expired]')).toBeVisible();
  await page.getByRole('button', { name: 'Continue after simulated sign-in' }).click();
  await expect(page.locator('[data-step="1"]')).toBeVisible();
  await expect(page.locator('[data-step="2"]')).toBeHidden();
  await expect(page.locator('#support-category')).toHaveValue('');
  await expect(page.locator('#sample-note')).toHaveValue('');
  await expect(page.locator('input[type="radio"]:checked')).toHaveCount(0);
});

test('save-later is keyboard operable and explicitly saves nothing', async ({ page }) => {
  await page.goto(fixturePath);
  await page.getByRole('button', { name: 'Continue to appointment preferences' }).click();
  const save = page.locator('[data-step="2"]').getByRole('button', { name: 'Save and finish later' });
  await save.focus();
  await expect(save).toHaveCSS('outline-style', 'solid');
  await page.keyboard.press('Enter');
  const confirmation = page.locator('[data-saved]');
  await expect(confirmation).toBeVisible();
  await expect(confirmation).toContainText('This is a simulation. Nothing was saved.');
  await expect(confirmation).toContainText('does not submit, store, or retain');
});

test('reset is deterministic from warning, expired, and saved states', async ({ page }) => {
  await page.goto(fixturePath);
  const reset = page.getByRole('button', { name: 'Reset application' });
  for (const enterState of [
    async () => page.getByRole('button', { name: 'Show session warning' }).click(),
    async () => page.getByRole('button', { name: 'Expire session' }).click(),
    async () => {
      await page.getByRole('button', { name: 'Continue to appointment preferences' }).click();
      await page.locator('[data-step="2"]').getByRole('button', { name: 'Save and finish later' }).click();
    },
  ]) {
    await enterState();
    if (await page.locator('[data-warning]').getAttribute('open') !== null) {
      await page.getByRole('button', { name: 'Reset practice application' }).click();
    } else {
      await reset.click();
    }
    await expect(page.locator('[data-application]')).toBeVisible();
    await expect(page.locator('[data-step="1"]')).toBeVisible();
    await expect(page.locator('[data-step="2"]')).toBeHidden();
    await expect(page.locator('[data-warning]')).not.toHaveAttribute('open', '');
    await expect(page.locator('[data-expired]')).toBeHidden();
    await expect(page.locator('[data-saved]')).toBeHidden();
  }
});

test('outer page and fixture preserve accessibility, theme, responsive fit, and answer boundary', async ({ page }) => {
  await page.goto(exercisePath);
  expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
  await page.addInitScript(() => localStorage.setItem('darkMode', 'enabled'));
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(fixturePath);
  await expect(page.locator('html')).toHaveClass(/dark/);
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(390);
  expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
  await page.getByRole('button', { name: 'Show session warning' }).click();
  expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
  const html = await page.locator('html').innerHTML();
  expect(html).not.toMatch(/intentional.finding|finding.count|model.answer|diagnostic|late-warning|pointer-only-extension/i);
});
