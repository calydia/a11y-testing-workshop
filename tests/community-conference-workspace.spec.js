import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const workspacePath = '/journey-workspaces/community-conference-programme/';
const journeyPath = '/journeys/reviewing-a-community-conference-programme/';

test('conference workspace has the expected document boundary and return route', async ({ page }) => {
  const response = await page.goto(workspacePath);
  expect(response?.ok()).toBe(true);
  await expect(page).toHaveTitle('Community conference programme workspace');
  await expect(page.getByRole('heading', { level: 1, name: 'Ideas for a more inclusive city' })).toBeVisible();
  const returnLink = page.getByRole('link', { name: 'Return to the Testing journey' });
  await expect(returnLink).toHaveCount(1);
  await expect(returnLink).toHaveAttribute('href', journeyPath);
  await expect(returnLink).not.toHaveAttribute('target');
});

test('workspace contains the intended structural, graphical, and language cases', async ({ page }) => {
  await page.goto(workspacePath);
  await expect(page.getByRole('link', { name: 'Session details' })).toHaveCount(3);
  await expect(page.locator('h5')).toHaveCount(2);
  await expect(page.getByRole('img', { name: 'Speaker at the conference' })).toHaveCount(1);
  await expect(page.getByRole('img', { name: "Harbor Hall's waterside entrance beside the tram stop" })).toHaveCount(1);
  await expect(page.getByRole('img', { name: 'Purple wave decoration' })).toHaveCount(1);
  await expect(page.locator('main svg[aria-hidden="true"]')).toHaveCount(4);
  await expect(page.locator('p[lang="sv"]')).toContainText('Sessionen innehåller');
  await expect(page.getByText('Tervetuloa rakentamaan')).not.toHaveAttribute('lang');
  await expect(page.locator('button.schedule-button')).toHaveAccessibleName('');
  await expect(page.getByRole('link', { name: 'Harbor Hall venue and arrival information' })).toBeVisible();
});

test('workspace adds a named schedule table without replacing session cards', async ({ page }) => {
  await page.goto(workspacePath);
  const table = page.getByRole('table', { name: 'Conference schedule at a glance' });
  await expect(table).toHaveCount(1);
  await expect(table.getByRole('columnheader')).toHaveText(['Time', 'Friday', 'Saturday', 'Room']);
  await expect(table.getByRole('rowheader')).toHaveText(['09:30', '10:00', '11:15']);
  await expect(table.getByRole('cell', { name: 'No session' })).toHaveCount(3);
  await expect(page.locator('.session-card')).toHaveCount(3);
});

test('workspace automated findings stay within the approved boundary', async ({ page }) => {
  await page.goto(workspacePath);
  const initial = await new AxeBuilder({ page }).analyze();
  expect(initial.violations.map(({ id }) => id).sort()).toEqual(['button-name', 'heading-order']);

  await page.getByRole('link', { name: 'Session details' }).first().click();
  await expect(page.locator('dialog')).toHaveAccessibleName('');
  const open = await new AxeBuilder({ page }).analyze();
  expect(open.violations).toEqual([]);
});

test('session links populate the native modal for the selected session', async ({ page }) => {
  await page.goto(workspacePath);
  const dialog = page.locator('dialog');
  await page.locator('[data-session="keynote"]').click();
  await expect(dialog).toHaveAttribute('open', '');
  await expect(dialog.getByRole('heading', { level: 2 })).toHaveText('Designing public spaces with communities');
  await dialog.getByRole('button', { name: 'Close session details' }).click();

  await page.locator('[data-session="culture"]').click();
  await expect(dialog.getByRole('heading', { level: 2 })).toHaveText('Accessible culture in everyday places');
  await expect(dialog).toContainText('Community room');
});

test('native modal contains focus, makes the background inert, and closes with Escape', async ({ page }) => {
  await page.goto(workspacePath);
  const trigger = page.locator('[data-session="keynote"]');
  await trigger.focus();
  await trigger.click();
  const dialog = page.locator('dialog');
  await expect(dialog.getByRole('button', { name: 'Close session details' })).toBeFocused();
  await page.keyboard.press('Tab');
  await expect(dialog.getByRole('button', { name: 'Close session details' })).toBeFocused();
  expect(await page.evaluate(() => document.querySelector('dialog')?.matches(':modal'))).toBe(true);
  await page.keyboard.press('Escape');
  await expect(dialog).not.toHaveAttribute('open', '');
  await expect(trigger).not.toBeFocused();
  await expect(page.locator('#programme-heading')).toBeFocused();
});

test('workspace follows saved theme and fits a narrow viewport', async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem('darkMode', 'enabled'));
  await page.goto(workspacePath);
  await expect(page.locator('html')).toHaveClass(/dark/);
  await expect(page.locator('body')).toHaveCSS('background-color', 'rgb(1, 0, 23)');
  await page.setViewportSize({ width: 390, height: 844 });
  await page.reload();
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(390);
});

test('workspace markup does not reveal its teaching answers', async ({ page }) => {
  await page.goto(workspacePath);
  const html = await page.locator('html').innerHTML();
  expect(html).not.toMatch(/intentional.finding|finding.count|diagnostic|model.answer/i);
});
