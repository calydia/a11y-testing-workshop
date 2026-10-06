import { test, expect } from './helpers/test.js';
import AxeBuilder from '@axe-core/playwright';

const workspacePath = '/journey-workspaces/community-services-appointment-change/';
const journeyPath = '/journeys/reviewing-a-community-services-appointment-change/';

async function beginChange(page) {
  await page.goto(workspacePath);
  await page.getByRole('button', { name: 'Change this appointment' }).click();
}

async function reachPreferences(page) {
  await beginChange(page);
  await page.getByRole('button', { name: 'Continue to preferences' }).click();
}

async function reachReview(page) {
  await reachPreferences(page);
  await page.getByRole('radio', { name: 'Email' }).check();
  await page.getByRole('checkbox', { name: 'Quiet waiting area' }).check();
  await page.getByLabel('Optional fictional support note').fill('Please include the fictional quiet-room directions.');
  await page.getByRole('button', { name: 'Review changes' }).click();
}

async function completeSignIn(page) {
  await page.locator('[data-sign-in-email]').fill('alex@example.test');
  await page.getByLabel('Password').fill('River-Example-24');
  await page.getByRole('button', { name: 'Continue to verification' }).click();
}

async function enterCode(page, code) {
  const inputs = page.locator('[data-code-digit]');
  for (const [index, character] of [...code].entries()) await inputs.nth(index).fill(character);
}

test('workspace exposes fictional data, privacy boundaries, noindex, and a return route', async ({ page }) => {
  await page.goto(workspacePath);

  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'noindex');
  await expect(page).toHaveTitle('Community-services appointment change workspace');
  await expect(page.getByRole('link', { name: 'Return to the Testing journey' })).toHaveAttribute('href', journeyPath);
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Manage your advice appointment');
  await expect(page.getByRole('heading', { name: 'Fictional practice service' })).toBeVisible();
  await expect(page.getByText('Nothing is submitted, sent, stored, or retained.', { exact: false })).toBeVisible();
  await expect(page.getByText('Alex Example', { exact: true })).toBeVisible();
  await expect(page.getByText('RCS-2048', { exact: true })).toBeVisible();
  await expect(page.getByText('Tuesday at 10:30', { exact: true })).toBeVisible();
  await expect(page.locator('[data-booking-workspace]')).toHaveAttribute('data-step', 'summary');
});

test('appointment dates update visible availability while time cards retain the controlled semantics defect', async ({ page }) => {
  await beginChange(page);
  const date = page.getByLabel('Appointment date');
  await date.selectOption('wednesday');

  await expect(page.locator('[data-availability-summary]')).toHaveText('2 appointments available for Wednesday 16 September.');
  await expect(page.locator('[data-availability-summary]')).not.toHaveAttribute('role');
  await expect(page.locator('[data-availability-summary]')).not.toHaveAttribute('aria-live');

  const slots = page.locator('[data-time-slot]');
  await expect(slots).toHaveCount(2);
  await expect(slots).toHaveText(['11:00', '15:00']);
  await expect(slots.first()).not.toHaveAttribute('role');
  await expect(slots.first()).not.toHaveAttribute('tabindex');
  await expect(slots.first()).not.toHaveAttribute('aria-selected');
  await expect(slots.first()).toHaveAttribute('data-selected', 'true');

  await date.focus();
  await page.keyboard.press('Tab');
  await expect(page.getByRole('button', { name: 'Continue to preferences' })).toBeFocused();

  await slots.nth(1).click();
  await expect(slots.nth(1)).toHaveAttribute('data-selected', 'true');
  await page.getByRole('button', { name: 'Continue to preferences' }).click();
  await expect(page.locator('[data-booking-workspace]')).toHaveAttribute('data-step', 'preferences');
});

test('preferences expose one controlled error relationship and retain corrected draft values', async ({ page }) => {
  await reachPreferences(page);
  await page.getByRole('checkbox', { name: 'Step-free arrival information' }).check();
  await page.getByLabel('Optional fictional support note').fill('Fictional arrival note');
  await page.getByRole('button', { name: 'Review changes' }).click();

  const error = page.locator('[data-preferences-error]');
  const group = page.locator('[data-confirmation-group]');
  await expect(error).toBeVisible();
  await expect(group).not.toHaveAttribute('aria-describedby');
  await expect(group).not.toHaveAttribute('aria-invalid');
  await expect(page.getByLabel('Optional fictional support note')).toHaveValue('Fictional arrival note');

  await page.getByRole('radio', { name: 'Text message' }).check();
  await page.getByRole('button', { name: 'Review changes' }).click();
  await expect(page.getByRole('heading', { name: 'Review your changes' })).toBeVisible();
  await expect(page.locator('[data-review-confirmation]')).toHaveText('Text message');
  await expect(page.locator('[data-review-support]')).toContainText('Step-free arrival information');
  await expect(page.locator('[data-review-note]')).toHaveText('Fictional arrival note');

  await page.getByRole('button', { name: 'Edit preferences' }).click();
  await expect(page.getByRole('radio', { name: 'Text message' })).toBeChecked();
  await expect(page.getByRole('checkbox', { name: 'Step-free arrival information' })).toBeChecked();
  await expect(page.getByLabel('Optional fictional support note')).toHaveValue('Fictional arrival note');
});

test('session warning is modal, avoids repetitive live countdowns, and restores focus after extension', async ({ page }) => {
  await beginChange(page);
  const warningControl = page.getByRole('button', { name: 'Show session warning' });
  await warningControl.click();

  const dialog = page.getByRole('dialog', { name: 'Your session is about to expire' });
  await expect(dialog).toBeVisible();
  await expect(page.locator('[data-warning-countdown]')).toHaveText('5 seconds');
  await expect(page.locator('[data-warning-countdown]')).not.toHaveAttribute('aria-live');
  await expect(page.locator('[data-booking-workspace]')).toHaveAttribute('data-session-phase', 'warning');

  await page.getByRole('button', { name: 'Extend session' }).click();
  await expect(dialog).not.toBeVisible();
  await expect(warningControl).toBeFocused();
  await expect(page.locator('[data-control-status]')).toContainText('draft and task position were preserved');
  await expect(page.locator('[data-booking-workspace]')).toHaveAttribute('data-session-phase', 'idle');
});

test('accelerated timer opens its intentionally late warning with one active interval', async ({ page }) => {
  await page.clock.install();
  await beginChange(page);
  await page.getByRole('button', { name: 'Start accelerated timer' }).click();
  await expect(page.locator('[data-booking-workspace]')).toHaveAttribute('data-timer-active', 'true');
  await expect(page.locator('[data-timer-display]')).toContainText('30 seconds remaining');

  await page.clock.runFor(25_000);
  await expect(page.getByRole('dialog', { name: 'Your session is about to expire' })).toBeVisible();
  await expect(page.locator('[data-warning-countdown]')).toHaveText('5 seconds');
  await expect(page.locator('[data-booking-workspace]')).toHaveAttribute('data-session-phase', 'warning');
});

test('expiry, fictional authentication, verification, and recovery preserve the interrupted preferences step', async ({ page }) => {
  await reachPreferences(page);
  await page.getByRole('radio', { name: 'Phone call' }).check();
  await page.getByRole('checkbox', { name: 'Communication support' }).check();
  await page.getByLabel('Optional fictional support note').fill('Keep this fictional draft');
  await page.getByRole('button', { name: 'Expire session' }).click();

  await expect(page.getByRole('heading', { name: 'Sign in again to continue' })).toBeFocused();
  await expect(page.locator('[data-booking-workspace]')).toHaveAttribute('data-session-phase', 'expired');
  await expect(page.locator('[data-sign-in-email]')).toHaveAttribute('autocomplete', 'username');
  await expect(page.getByLabel('Password')).toHaveAttribute('autocomplete', 'current-password');
  expect(await page.getByLabel('Password').evaluate((input) => input.dispatchEvent(new Event('paste', { bubbles: true, cancelable: true })))).toBe(true);

  await page.locator('[data-sign-in-email]').fill('wrong@example.test');
  await page.getByLabel('Password').fill('wrong');
  await page.getByRole('button', { name: 'Continue to verification' }).click();
  await expect(page.locator('[data-sign-in-error]')).toBeVisible();

  const reveal = page.getByRole('button', { name: 'Show password' });
  await page.getByLabel('Password').fill('River-Example-24');
  await reveal.click();
  await expect(page.getByLabel('Password')).toHaveAttribute('type', 'text');
  await expect(reveal).toHaveAttribute('aria-pressed', 'false');
  await expect(reveal).toHaveText('Show password');

  await completeSignIn(page);
  await expect(page.getByRole('heading', { name: 'Enter the verification code' })).toBeFocused();
  await expect(page.locator('[data-code-digit]')).toHaveCount(6);
  expect(await page.locator('[data-code-digit]').first().evaluate((input) => input.dispatchEvent(new Event('paste', { bubbles: true, cancelable: true })))).toBe(false);

  await enterCode(page, '000000');
  await page.getByRole('button', { name: 'Verify and return to booking' }).click();
  await expect(page.locator('[data-verification-error]')).toBeVisible();

  await enterCode(page, '482615');
  await page.getByRole('button', { name: 'Verify and return to booking' }).click();
  await expect(page.getByRole('heading', { name: 'Update your preferences' })).toBeFocused();
  await expect(page.getByRole('radio', { name: 'Phone call' })).toBeChecked();
  await expect(page.getByRole('checkbox', { name: 'Communication support' })).toBeChecked();
  await expect(page.getByLabel('Optional fictional support note')).toHaveValue('Keep this fictional draft');
});

test('confirmation changes visually without a reliable announcement or focus transition', async ({ page }) => {
  await reachReview(page);
  await page.getByRole('button', { name: 'Confirm appointment change' }).click();

  const confirmation = page.locator('[data-view="confirmation"]');
  await expect(confirmation).toBeVisible();
  await expect(confirmation).not.toHaveAttribute('role');
  await expect(confirmation).not.toHaveAttribute('aria-live');
  await expect(page.getByRole('heading', { name: 'Appointment change confirmed' })).not.toBeFocused();
  expect(await confirmation.evaluate((element) => element.contains(document.activeElement))).toBe(false);
  await expect(page.locator('[data-confirmed-date]')).toHaveText('Monday 14 September');
  await expect(page.locator('[data-confirmed-time]')).toHaveText('09:00');

  await page.getByRole('button', { name: 'Return to the original booking' }).click();
  await expect(page.getByRole('heading', { name: 'Review the current booking' })).toBeFocused();
  await expect(page.locator('[data-booking-workspace]')).toHaveAttribute('data-step', 'summary');
});

test('reset works from warning and authentication without retaining task data', async ({ page }) => {
  await reachPreferences(page);
  await page.getByRole('radio', { name: 'Email' }).check();
  await page.getByLabel('Optional fictional support note').fill('Temporary fictional note');
  await page.getByRole('button', { name: 'Show session warning' }).click();
  await page.getByRole('dialog').getByRole('button', { name: 'Reset workspace' }).click();
  await expect(page.getByRole('dialog')).not.toBeVisible();
  await expect(page.getByRole('heading', { name: 'Review the current booking' })).toBeFocused();

  await page.getByRole('button', { name: 'Change this appointment' }).click();
  await page.getByRole('button', { name: 'Expire session' }).click();
  await page.locator('[data-sign-in-email]').fill('alex@example.test');
  await page.getByRole('button', { name: 'Reset workspace' }).click();
  await expect(page.getByRole('heading', { name: 'Review the current booking' })).toBeFocused();
  await expect(page.locator('[data-booking-workspace]')).toHaveAttribute('data-session-phase', 'idle');
  await expect(page.locator('[data-booking-workspace]')).toHaveAttribute('data-timer-active', 'false');

  const storage = await page.evaluate(() => ({
    localKeys: Object.keys(localStorage).filter((key) => key !== 'darkMode'),
    sessionKeys: Object.keys(sessionStorage),
  }));
  expect(storage).toEqual({ localKeys: [], sessionKeys: [] });
});

test('the complete task makes no submission or other non-GET request', async ({ page }) => {
  const nonGetRequests = [];
  page.on('request', (request) => {
    if (request.method() !== 'GET') nonGetRequests.push(`${request.method()} ${request.url()}`);
  });

  await reachReview(page);
  await page.getByRole('button', { name: 'Confirm appointment change' }).click();
  expect(nonGetRequests).toEqual([]);
});

test('workspace has no unrelated axe violations, duplicate IDs, or responsive theme failures', async ({ page }) => {
  await page.goto(workspacePath);
  const conditions = [
    ['light', 1280, 800],
    ['light', 768, 900],
    ['light', 320, 800],
    ['dark', 1280, 800],
    ['dark', 768, 900],
    ['dark', 320, 800],
  ];
  for (const [theme, width, height] of conditions) {
    await page.setViewportSize({ width, height });
    await page.evaluate((selectedTheme) => {
      localStorage.setItem('darkMode', selectedTheme === 'dark' ? 'enabled' : 'disabled');
    }, theme);
    await page.reload();
    await expect(page.locator('html')).toHaveClass(new RegExp(theme));
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width);
  }

  expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
  expect(await page.evaluate(() => {
    const ids = [...document.querySelectorAll('[id]')].map((element) => element.id);
    return ids.filter((id, index) => ids.indexOf(id) !== index);
  })).toEqual([]);

  await page.getByRole('button', { name: 'Change this appointment' }).focus();
  await expect(page.getByRole('button', { name: 'Change this appointment' })).toHaveCSS('outline-style', 'solid');
});
