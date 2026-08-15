import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { expectStandaloneExercise } from './helpers/standalone-exercise.js';

const methodPath = '/methods/testing-text-spacing-and-user-overrides/';
const exercisePath = '/exercises/testing-text-spacing-on-a-community-services-page/';
const fixturePath = '/exercise-fixtures/community-services-text-spacing/';

test('text-spacing method and Exercise render their paired learning contract', async ({ page, request }) => {
  await page.goto(methodPath);
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Testing text spacing and user overrides');
  const content = page.locator('[data-content-body]');
  await expect(content).toContainText('line height of at least 1.5');
  await expect(content).toContainText('spacing after paragraphs of at least 2');
  await expect(content).toContainText('letter spacing of at least 0.12');
  await expect(content).toContainText('word spacing of at least 0.16');
  await expect(page.getByRole('link', { name: 'Testing text spacing on a community-services page' })).toHaveAttribute('href', exercisePath);

  await page.goto(exercisePath);
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Testing text spacing on a community-services page');
  await expect(page.getByText('Difficulty: beginner')).toBeVisible();
  await expect(page.getByText('Estimated time: 20 minutes')).toBeVisible();
  await expect(page.getByRole('link', { name: 'Testing text spacing and user overrides' })).toHaveAttribute('href', methodPath);
  await expectStandaloneExercise(page, request, { exercisePath, fixturePath, fixtureTitle: 'Community services text-spacing exercise' });
});

test('assisted control applies all four values once and resets deterministically', async ({ page }) => {
  await page.goto(fixturePath);
  const toggle = page.locator('#spacing-toggle');
  await expect(toggle).toHaveAttribute('aria-pressed', 'false');
  await toggle.focus();
  await expect(toggle).toHaveCSS('outline-style', 'solid');
  await page.keyboard.press('Enter');
  await expect(toggle).toHaveAccessibleName('Reset text spacing');
  await expect(toggle).toHaveAttribute('aria-pressed', 'true');
  await expect(page.locator('#text-spacing-test-styles')).toHaveCount(1);
  await expect(page.locator('body')).toHaveCSS('line-height', '27px');
  await expect(page.locator('body')).toHaveCSS('letter-spacing', '2.16px');
  await expect(page.locator('body')).toHaveCSS('word-spacing', '2.88px');
  await expect(page.locator('.opening-information p')).toHaveCSS('margin-bottom', '36px');

  await toggle.click();
  await expect(toggle).toHaveAccessibleName('Apply test text spacing');
  await expect(toggle).toHaveAttribute('aria-pressed', 'false');
  await expect(page.locator('#text-spacing-test-styles')).toHaveCount(0);
  await toggle.click();
  await expect(page.locator('#text-spacing-test-styles')).toHaveCount(1);
});

test('urgent-support text resists all four override values while nearby text changes', async ({ page }) => {
  await page.goto(fixturePath);
  const readSpacing = () => page.evaluate(() => {
    const values = (selector) => {
      const styles = getComputedStyle(document.querySelector(selector));
      return {
        lineHeight: styles.lineHeight,
        marginBottom: styles.marginBottom,
        letterSpacing: styles.letterSpacing,
        wordSpacing: styles.wordSpacing,
      };
    };
    return {
      resistant: values('.resistant-spacing'),
      comparison: values('.opening-information p'),
    };
  });

  const before = await readSpacing();
  await page.getByRole('button', { name: 'Apply test text spacing' }).click();
  const after = await readSpacing();

  expect(after.resistant).toEqual(before.resistant);
  expect(after.comparison).not.toEqual(before.comparison);
  expect(after.comparison).toEqual({
    lineHeight: '27px',
    marginBottom: '36px',
    letterSpacing: '2.16px',
    wordSpacing: '2.88px',
  });
});

test('the five layout targets lose content only after the override', async ({ page }) => {
  const geometry = () => page.evaluate(() => {
    const intro = document.querySelector('.intro-panel');
    const nav = document.querySelector('.fixed-navigation-link');
    const notice = document.querySelector('.important-notice p');
    const button = document.querySelector('.fixed-contact-button');
    const heading = document.querySelector('.fixed-service-card h3');
    const description = document.querySelector('.fixed-service-card p');
    const headingBox = heading.getBoundingClientRect();
    const descriptionBox = description.getBoundingClientRect();
    const unclampedNotice = notice.cloneNode(true);
    Object.assign(unclampedNotice.style, {
      display: 'block',
      position: 'absolute',
      visibility: 'hidden',
      width: `${notice.clientWidth}px`,
      WebkitLineClamp: 'unset',
    });
    document.body.append(unclampedNotice);
    const noticeNaturalHeight = unclampedNotice.getBoundingClientRect().height;
    const noticeVisibleHeight = notice.getBoundingClientRect().height;
    unclampedNotice.remove();
    return {
      introClipped: intro.scrollHeight > intro.clientHeight,
      navClipped: nav.scrollWidth > nav.clientWidth,
      noticeClipped: noticeNaturalHeight > noticeVisibleHeight + 1,
      buttonClipped: button.scrollWidth > button.clientWidth || button.scrollHeight > button.clientHeight,
      cardOverlap: headingBox.bottom > descriptionBox.top,
    };
  });

  for (const viewport of [{ width: 1280, height: 900 }, { width: 390, height: 844 }]) {
    await page.setViewportSize(viewport);
    await page.goto(fixturePath);
    expect(await geometry()).toEqual({ introClipped: false, navClipped: false, noticeClipped: false, buttonClipped: false, cardOverlap: false });
    await page.getByRole('button', { name: 'Apply test text spacing' }).click();
    expect(await geometry()).toEqual({ introClipped: true, navClipped: true, noticeClipped: true, buttonClipped: true, cardOverlap: true });
  }
});

test('passing comparisons remain complete under the override', async ({ page }) => {
  await page.goto(fixturePath);
  await page.getByRole('button', { name: 'Apply test text spacing' }).click();
  const result = await page.evaluate(() => {
    const card = document.querySelector('.flexible-service-card');
    const link = document.querySelector('.service-navigation li:nth-child(2) a');
    const button = document.querySelector('.button-row button:last-child');
    return {
      cardComplete: card.scrollHeight <= card.clientHeight,
      linkComplete: link.scrollWidth <= link.clientWidth && link.scrollHeight <= link.clientHeight,
      buttonComplete: button.scrollWidth <= button.clientWidth && button.scrollHeight <= button.clientHeight,
    };
  });
  expect(result).toEqual({ cardComplete: true, linkComplete: true, buttonComplete: true });
});

test('fixture and Exercise preserve disclosure, theme, axe, and narrow-width behavior', async ({ page }) => {
  await page.goto(exercisePath);
  const hints = page.locator('details').filter({ hasText: 'Hints' });
  const solution = page.locator('details').filter({ hasText: 'Solution' });
  await expect(hints.locator('li')).toHaveCount(3);
  await expect(solution.locator('section')).toHaveCount(6);
  await expect(solution).not.toHaveAttribute('open');

  await page.addInitScript(() => localStorage.setItem('darkMode', 'enabled'));
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(fixturePath);
  await expect(page.locator('html')).toHaveClass(/dark/);
  await expect(page.locator('body')).toHaveCSS('background-color', 'rgb(1, 0, 23)');
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(390);
  expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
  await page.getByRole('button', { name: 'Apply test text spacing' }).click();
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(390);
  expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);

  const html = await page.locator('body').innerHTML();
  expect(html).not.toMatch(/intentional.finding|finding.count|model.answer|diagnostic|solution/i);
});
