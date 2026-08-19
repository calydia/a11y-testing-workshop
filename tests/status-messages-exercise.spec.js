import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { expectStandaloneExercise } from './helpers/standalone-exercise.js';

const methodPath = '/methods/testing-status-messages-and-live-updates/';
const exercisePath = '/exercises/testing-status-messages-in-a-community-activities-search/';
const fixturePath = '/exercise-fixtures/community-activities-status-messages/';

test('status-message method and Exercise render their intermediate learning contract', async ({ page, request }) => {
  await page.goto('/methods/');
  const methodCard = page.locator('article').filter({ has: page.getByRole('link', { name: 'Testing status messages and live updates' }) });
  await expect(methodCard.locator('[data-content-card-level]')).toHaveText('Intermediate');
  await expect(methodCard.locator('[data-content-card-duration]')).toHaveText('About 30 minutes');

  await page.goto(methodPath);
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Testing status messages and live updates');
  const methodContent = page.locator('[data-content-body]');
  await expect(methodContent).toContainText(/timing, priority, repetition, and focus behavior/i);
  await expect(methodContent).toContainText(/one browser and screen-reader result/i);
  await expect(page.getByRole('link', { name: 'Testing status messages in a community activities search' })).toHaveAttribute('href', exercisePath);

  await page.goto(exercisePath);
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Testing status messages in a community activities search');
  await expect(page.getByText('Difficulty: intermediate')).toBeVisible();
  await expect(page.getByText('Estimated time: 30 minutes')).toBeVisible();
  await expect(page.locator('[data-content-body]')).toContainText('nothing you do is submitted, stored, or retained');
  await expect(page.getByRole('link', { name: 'Testing status messages and live updates' })).toHaveAttribute('href', methodPath);
  await expectStandaloneExercise(page, request, { exercisePath, fixturePath, fixtureTitle: 'Community activities status-messages exercise' });
});

test('Exercise provides progressive hints and exactly six closed findings', async ({ page }) => {
  await page.goto(exercisePath);
  const hints = page.locator('details').filter({ hasText: 'Hints' });
  const solution = page.locator('details').filter({ hasText: 'Solution' });
  await expect(hints.locator('li')).toHaveCount(3);
  await expect(solution.locator('section')).toHaveCount(6);
  await expect(solution).not.toHaveAttribute('open');
});

test('result and routine loading updates expose the two approved defects', async ({ page }) => {
  await page.goto(fixturePath);
  const summary = page.locator('#results-summary');
  await expect(summary).toHaveText('4 activities found');
  await expect(summary).not.toHaveAttribute('role');
  await expect(summary).not.toHaveAttribute('aria-live');

  await page.locator('#activity-keyword').fill('garden');
  await expect(summary).toHaveText('1 activity found');
  await expect(page.locator('#loading-message')).toHaveAttribute('role', 'alert');
  await expect(page.locator('#loading-message')).toContainText('Loading activities');
  await expect(page.locator('#activity-keyword')).toBeFocused();
});

test('each keyword input event immediately replaces the assertive loading message', async ({ page }) => {
  await page.goto(fixturePath);
  const messages = await page.locator('#loading-message').evaluate(async (element) => {
    const input = document.querySelector('#activity-keyword');
    const values = [];
    const observer = new MutationObserver(() => values.push(element.textContent));
    observer.observe(element, { childList: true, subtree: true, characterData: true });
    for (const value of ['g', 'ga', 'gar']) {
      input.value = value;
      input.dispatchEvent(new Event('input', { bubbles: true }));
      await new Promise((resolve) => setTimeout(resolve, 5));
    }
    observer.disconnect();
    return values;
  });
  expect(messages.length).toBeGreaterThanOrEqual(3);
});

test('saving is visual only while removal uses the passing polite status', async ({ page }) => {
  await page.goto(fixturePath);
  await page.getByRole('button', { name: 'Save activity' }).first().click();
  const saveConfirmation = page.locator('#save-confirmation');
  await expect(saveConfirmation).toContainText('Creative writing circle saved.');
  await expect(saveConfirmation).not.toHaveAttribute('role');
  await expect(saveConfirmation).not.toHaveAttribute('aria-live');

  const removalStatus = page.locator('#removal-status');
  await expect(removalStatus).toHaveAttribute('role', 'status');
  await expect(removalStatus).toHaveAttribute('aria-live', 'polite');
  await page.getByRole('button', { name: 'Remove Creative writing circle' }).click();
  await expect(removalStatus).toHaveText('Creative writing circle removed from saved activities.');
});

test('inserted and late-semantic messages preserve their timing defects', async ({ page }) => {
  await page.goto(fixturePath);
  await expect(page.locator('#inserted-message')).toBeEmpty();
  await page.getByRole('button', { name: 'Clear search and filters' }).click();
  const inserted = page.locator('#inserted-message [role="status"]');
  await expect(inserted).toHaveText('Search and filters cleared.');
  await expect(inserted).toHaveAttribute('aria-live', 'polite');

  const mutationOrder = await page.locator('#no-results').evaluate(async (element) => {
    const input = document.querySelector('#activity-keyword');
    const events = [];
    const observer = new MutationObserver((records) => {
      for (const record of records) events.push(record.type === 'attributes' ? `attribute:${record.attributeName}` : 'content');
    });
    observer.observe(element, { attributes: true, childList: true, subtree: true, characterData: true });
    input.value = 'no matching activity';
    input.dispatchEvent(new Event('input', { bubbles: true }));
    await new Promise((resolve) => setTimeout(resolve, 0));
    observer.disconnect();
    return events;
  });
  expect(mutationOrder.indexOf('content')).toBeGreaterThanOrEqual(0);
  expect(mutationOrder.indexOf('attribute:aria-live')).toBeGreaterThan(mutationOrder.indexOf('content'));
  await expect(page.locator('#no-results')).toHaveText('No activities match this search.');
});

test('urgent error, reset, focus, privacy, theme, and automated boundary remain intact', async ({ page }) => {
  const externalRequests = [];
  page.on('request', (request) => {
    if (!request.url().startsWith('http://127.0.0.1:4321/')) externalRequests.push(request.url());
  });
  await page.addInitScript(() => {
    window.__statusExerciseWrites = [];
    const original = Storage.prototype.setItem;
    Storage.prototype.setItem = function (key, value) {
      window.__statusExerciseWrites.push([key, value]);
      return original.call(this, key, value);
    };
  });
  await page.goto(fixturePath);
  await expect(page.getByText(/Nothing is submitted, stored, or retained/)).toBeVisible();
  const error = page.locator('#urgent-error');
  await expect(error).toHaveAttribute('role', 'alert');
  await page.getByRole('button', { name: 'Show urgent service error' }).click();
  await expect(error).toHaveText('The activity service is unavailable. Try again later.');

  const keyword = page.locator('#activity-keyword');
  await keyword.focus();
  await expect(keyword).toHaveCSS('outline-style', 'solid');
  await keyword.fill('history');
  await page.getByRole('button', { name: 'Save activity' }).click();
  await page.getByRole('button', { name: 'Reset activity search' }).click();
  await expect(keyword).toHaveValue('');
  await expect(page.locator('#results-summary')).toHaveText('4 activities found');
  await expect(page.locator('#saved-list li')).toHaveCount(0);
  await expect(page.locator('#urgent-error')).toBeEmpty();
  expect(await page.evaluate(() => window.__statusExerciseWrites)).toEqual([]);
  expect(externalRequests).toEqual([]);

  const axe = await new AxeBuilder({ page }).analyze();
  expect(axe.violations).toEqual([]);
  await page.setViewportSize({ width: 390, height: 844 });
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(390);
});
