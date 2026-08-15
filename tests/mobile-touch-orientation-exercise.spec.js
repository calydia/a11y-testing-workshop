import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { expectStandaloneExercise } from './helpers/standalone-exercise.js';

const methodPath = '/methods/testing-mobile-touch-and-orientation/';
const exercisePath = '/exercises/testing-touch-interaction-on-a-community-festival-map/';
const fixturePath = '/exercise-fixtures/community-festival-touch/';

const pointer = (page, selector, type, options) => page.locator(selector).dispatchEvent(type, {
  bubbles: true,
  pointerType: 'touch',
  ...options,
});

test('mobile touch method and Exercise render their paired learning contract', async ({ page, request }) => {
  await page.goto(methodPath);
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Testing mobile touch and orientation');
  await expect(page.getByText('Estimated time: 25 minutes')).toBeVisible();
  const content = page.locator('[data-content-body]');
  await expect(content).toContainText('24 by 24 CSS pixels');
  await expect(content).toContainText('real touchscreen phone or tablet');
  await expect(content).toContainText('up event');
  await expect(page.getByRole('link', { name: 'Testing touch interaction on a community-festival map' })).toHaveAttribute('href', exercisePath);

  await page.goto(exercisePath);
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Testing touch interaction on a community-festival map');
  await expect(page.getByText('Difficulty: beginner')).toBeVisible();
  await expect(page.getByText('Estimated time: 25 minutes')).toBeVisible();
  await expect(page.getByRole('link', { name: 'Testing mobile touch and orientation' })).toHaveAttribute('href', methodPath);
  await expectStandaloneExercise(page, request, {
    exercisePath,
    fixturePath,
    fixtureTitle: 'Community festival mobile touch exercise',
  });
});

test('map controls expose failing and passing target geometry', async ({ page }) => {
  await page.goto(fixturePath);
  const small = await page.locator('.map-toolbar button').evaluateAll((buttons) => buttons.map((button) => {
    const box = button.getBoundingClientRect();
    return { width: box.width, height: box.height, center: box.x + box.width / 2 };
  }));
  expect(small).toHaveLength(3);
  expect(small.every(({ width, height }) => width === 20 && height === 20)).toBe(true);
  expect(small[1].center - small[0].center).toBeLessThan(24);

  const comparison = await page.locator('.comparison-toolbar button').evaluateAll((buttons) => buttons.map((button) => {
    const box = button.getBoundingClientRect();
    return { width: box.width, height: box.height };
  }));
  expect(comparison.every(({ width, height }) => width >= 44 && height >= 44)).toBe(true);
});

test('real and assisted orientation states expose the intended boundary', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(fixturePath);
  await expect(page.locator('.orientation-blocker')).toBeHidden();
  await expect(page.locator('.festival-content')).toBeVisible();

  await page.setViewportSize({ width: 844, height: 390 });
  await expect(page.locator('.orientation-blocker')).toBeVisible();
  await expect(page.locator('.festival-content')).toBeHidden();

  await page.setViewportSize({ width: 1280, height: 900 });
  await expect(page.locator('.orientation-blocker')).toBeHidden();
  const toggle = page.locator('.simulation-toggle');
  await toggle.click();
  await expect(toggle).toHaveAttribute('aria-pressed', 'true');
  await expect(page.locator('.orientation-blocker')).toBeVisible();
  await page.locator('.simulation-reset').click();
  await expect(toggle).toBeFocused();
  await expect(page.locator('.festival-content')).toBeVisible();
});

test('pinch and swipe require paths while comparison actions use simple controls', async ({ page }) => {
  await page.goto(fixturePath);
  await pointer(page, '.festival-map', 'pointerdown', { pointerId: 1, clientX: 100, clientY: 100 });
  await pointer(page, '.festival-map', 'pointerdown', { pointerId: 2, clientX: 150, clientY: 100 });
  await pointer(page, '.festival-map', 'pointermove', { pointerId: 2, clientX: 190, clientY: 100 });
  await expect(page.locator('.map-scale')).toHaveText('Map zoom: 125%');
  await expect(page.locator('.festival-panel').first().getByRole('button', { name: /zoom/i })).toHaveCount(0);
  await page.locator('.center-map').click();
  await expect(page.locator('.map-action-status')).toHaveText('Map centered on Main stage.');

  await pointer(page, '.featured-schedule', 'pointerdown', { pointerId: 3, clientX: 200, clientY: 100 });
  await pointer(page, '.featured-schedule', 'pointerup', { pointerId: 3, clientX: 100, clientY: 100 });
  await expect(page.locator('.featured-title')).toHaveText('Accessible crafts');
  await expect(page.locator('.featured-schedule').locator('button')).toHaveCount(0);
  await page.locator('.next-session').click();
  await expect(page.locator('.comparison-title')).toHaveText('Repair café');
  await page.locator('.previous-session').click();
  await expect(page.locator('.comparison-title')).toHaveText('Community gardening');
});

test('removal contrasts down-event completion with cancellable release', async ({ page }) => {
  await page.goto(fixturePath);
  await pointer(page, '.remove-primary', 'pointerdown', { pointerId: 4 });
  await expect(page.locator('.saved-session-primary')).toHaveCount(0);

  await pointer(page, '.remove-comparison', 'pointerdown', { pointerId: 5 });
  await pointer(page, '.remove-comparison', 'pointercancel', { pointerId: 5 });
  await expect(page.locator('.saved-session-comparison')).toHaveCount(1);
  await pointer(page, '.remove-comparison', 'pointerdown', { pointerId: 6 });
  await pointer(page, '.remove-comparison', 'pointerup', { pointerId: 6 });
  await expect(page.locator('.saved-session-comparison')).toHaveCount(0);
  await expect(page.locator('.removal-status')).toHaveText('Community lunch removed from saved sessions.');
});

test('keyboard activation, disclosures, themes, narrow fit, and axe remain intact', async ({ page }) => {
  await page.goto(fixturePath);
  await page.locator('.remove-primary').focus();
  await page.keyboard.press('Enter');
  await expect(page.locator('.saved-session-primary')).toHaveCount(0);

  await page.goto(exercisePath);
  await expect(page.locator('details').filter({ hasText: 'Hints' }).locator('li')).toHaveCount(3);
  await expect(page.locator('details').filter({ hasText: 'Solution' }).locator('section')).toHaveCount(5);

  await page.addInitScript(() => localStorage.setItem('darkMode', 'enabled'));
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(fixturePath);
  await expect(page.locator('html')).toHaveClass(/dark/);
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(390);
  expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
  expect(await page.locator('main').innerHTML()).not.toMatch(/intentional.finding|finding.count|model.answer|diagnostic|solution/i);
});
