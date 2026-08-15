import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { expectStandaloneExercise } from './helpers/standalone-exercise.js';

const methodPath = '/methods/testing-motion-animation-and-flashing/';
const exercisePath = '/exercises/testing-motion-preferences-on-a-parcel-tracking-dashboard/';
const fixturePath = '/exercise-fixtures/parcel-tracking-motion/';

async function activateInteractions(page) {
  const details = page.locator('.details-toggle');
  if (await details.getAttribute('aria-expanded') !== 'true') await details.click();
  await page.locator('.confirm-delivery').click();
}

async function readMotion(page) {
  return page.evaluate(() => {
    const style = (selector) => getComputedStyle(document.querySelector(selector));
    return {
      route: style('.route-marker').animationName,
      updates: style('.updates-track').animationName,
      details: {
        animation: style('.details-panel').animationName,
        transition: style('.details-panel').transitionDuration,
      },
      celebration: style('.celebration').animationName,
      vehicle: style('.controlled-vehicle').animationName,
      statusTransition: style('.status-chip').transitionDuration,
      pending: style('.pending-indicator').animationName,
    };
  });
}

function expectReducedComparison(result) {
  expect(result.route).toBe('routeTravel');
  expect(result.updates).toBe('updatesTravel');
  expect(result.details).toEqual({ animation: 'detailsArrival', transition: '0.7s' });
  expect(result.celebration).toBe('celebrationBurst');
  expect(result.vehicle).toBe('none');
  expect(result.statusTransition).toBe('0s');
  expect(result.pending).toBe('none');
}

test('motion method and Exercise render their paired learning contract', async ({ page, request }) => {
  await page.goto(methodPath);
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Testing motion, animation, and flashing');
  await expect(page.getByText('Estimated time: 20 minutes')).toBeVisible();
  const content = page.locator('[data-content-body]');
  await expect(content).toContainText('prefers-reduced-motion: reduce');
  await expect(content).toContainText('more than three times in any one-second period');
  await expect(content).toContainText('Do not watch a suspected sequence repeatedly');
  await expect(page.getByRole('link', { name: 'Testing motion preferences on a parcel-tracking dashboard' })).toHaveAttribute('href', exercisePath);

  await page.goto(exercisePath);
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Testing motion preferences on a parcel-tracking dashboard');
  await expect(page.getByText('Difficulty: beginner')).toBeVisible();
  await expect(page.getByText('Estimated time: 20 minutes')).toBeVisible();
  await expect(page.getByRole('link', { name: 'Testing motion, animation, and flashing' })).toHaveAttribute('href', methodPath);
  await expectStandaloneExercise(page, request, {
    exercisePath,
    fixturePath,
    fixtureTitle: 'Parcel tracking motion preferences exercise',
  });
});

test('initial fixture exposes the approved non-flashing motion and valid control', async ({ page }) => {
  await page.goto(fixturePath);
  const motion = await readMotion(page);
  expect(motion.route).toBe('routeTravel');
  expect(motion.updates).toBe('updatesTravel');
  expect(motion.vehicle).toBe('vehicleTravel');
  await expect(page.locator('.simulation-toggle')).toHaveAttribute('aria-pressed', 'false');
  await expect(page.locator('.vehicle-toggle')).toHaveAttribute('aria-pressed', 'false');
  await expect(page.locator('.details-toggle')).toHaveAttribute('aria-expanded', 'false');
  await expect(page.locator('.safety-note')).toContainText('does not display hazardous flashing');
});

test('real reduced motion preserves five findings and improves passing comparisons', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto(fixturePath);
  await activateInteractions(page);
  expectReducedComparison(await readMotion(page));

  const before = await page.locator('.parcel-scene').evaluate((element) => getComputedStyle(element).transform);
  await page.evaluate(() => scrollTo(0, document.body.scrollHeight));
  await page.waitForFunction((value) => getComputedStyle(document.querySelector('.parcel-scene')).transform !== value, before);
});

test('assisted simulation matches reduced comparison and resets deterministically', async ({ page }) => {
  await page.goto(fixturePath);
  const toggle = page.locator('.simulation-toggle');
  await toggle.focus();
  await expect(toggle).toHaveCSS('outline-style', 'solid');
  await page.keyboard.press('Enter');
  await expect(toggle).toHaveAttribute('aria-pressed', 'true');
  await expect(toggle).toHaveAccessibleName('Reset reduced-motion simulation');
  await activateInteractions(page);
  expectReducedComparison(await readMotion(page));

  await toggle.click();
  await expect(toggle).toHaveAttribute('aria-pressed', 'false');
  await expect(page.locator('#parcel-tracker')).not.toHaveClass(/simulate-reduced-motion/);
  await toggle.click();
  await expect(page.locator('#parcel-tracker')).toHaveClass(/simulate-reduced-motion/);
});

test('valid pause control changes only its identified animation', async ({ page }) => {
  await page.goto(fixturePath);
  const vehicle = page.locator('.controlled-vehicle');
  const route = page.locator('.route-marker');
  const control = page.locator('.vehicle-toggle');
  await control.click();
  await expect(control).toHaveAttribute('aria-pressed', 'true');
  await expect(control).toHaveAccessibleName('Resume delivery vehicle animation');
  await expect(vehicle).toHaveCSS('animation-play-state', 'paused');
  await expect(route).toHaveCSS('animation-play-state', 'running');
  await control.click();
  await expect(vehicle).toHaveCSS('animation-play-state', 'running');
});

test('details, pending operation, and repeated confirmation remain deterministic', async ({ page }) => {
  await page.goto(fixturePath);
  const details = page.locator('.details-toggle');
  await details.click();
  await expect(details).toHaveAttribute('aria-expanded', 'true');
  await expect(page.locator('#tracking-details')).toBeVisible();
  await details.click();
  await expect(details).toHaveAttribute('aria-expanded', 'false');
  await expect(page.locator('#tracking-details')).toBeHidden();

  await page.locator('.update-preferences').click();
  await expect(page.locator('.pending-indicator')).toBeVisible();
  await expect(page.locator('.pending-indicator')).toBeHidden({ timeout: 1500 });
  await expect(page.locator('.preference-status')).toHaveText('Delivery preferences updated.');

  const confirmation = page.locator('.confirm-delivery');
  await page.evaluate(() => {
    window.celebrationStarts = 0;
    document.querySelector('.celebration').addEventListener('animationstart', () => { window.celebrationStarts += 1; });
  });
  await confirmation.click();
  await expect.poll(() => page.evaluate(() => window.celebrationStarts)).toBe(1);
  await confirmation.click();
  await expect.poll(() => page.evaluate(() => window.celebrationStarts)).toBe(2);
  await expect(page.locator('.confirmation-status')).toHaveText('Delivery confirmed. Thank you.');
  await expect(page.locator('.celebration')).toHaveCount(1);
});

test('fixture animation definitions stay outside the prohibited flashing pattern', async ({ page }) => {
  await page.goto(fixturePath);
  const animations = await page.evaluate(() => [...document.querySelectorAll('*')].flatMap((element) => {
    const styles = getComputedStyle(element);
    return styles.animationName.split(',').map((name, index) => ({
      name: name.trim(),
      duration: Number.parseFloat(styles.animationDuration.split(',')[index] ?? styles.animationDuration),
      iterations: styles.animationIterationCount.split(',')[index]?.trim() ?? styles.animationIterationCount,
      property: styles.transitionProperty,
    })).filter(({ name }) => name !== 'none');
  }));
  expect(animations.length).toBeGreaterThan(0);
  expect(animations.every(({ name }) => !/blink|flash|flicker/i.test(name))).toBe(true);
  expect(animations.filter(({ iterations }) => iterations === 'infinite').every(({ duration }) => duration >= 1)).toBe(true);
  expect(animations.every(({ property }) => !/background|color|opacity/.test(property))).toBe(true);
});

test('disclosures, theme, responsive fit, axe, and answer boundary remain intact', async ({ page }) => {
  await page.goto(exercisePath);
  const hints = page.locator('details').filter({ hasText: 'Hints' });
  const solution = page.locator('details').filter({ hasText: 'Solution' });
  await expect(hints.locator('li')).toHaveCount(3);
  await expect(solution.locator('section')).toHaveCount(5);
  await expect(solution).not.toHaveAttribute('open');

  await page.addInitScript(() => localStorage.setItem('darkMode', 'enabled'));
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(fixturePath);
  await expect(page.locator('html')).toHaveClass(/dark/);
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(390);
  expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
  await page.locator('.simulation-toggle').click();
  expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);

  const html = await page.locator('main').innerHTML();
  expect(html).not.toMatch(/intentional.finding|finding.count|model.answer|diagnostic|broken|problem|solution/i);
});
