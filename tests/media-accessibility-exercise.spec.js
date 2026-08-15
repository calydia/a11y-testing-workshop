import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { expectStandaloneExercise } from './helpers/standalone-exercise.js';

const methodPath = '/methods/testing-media-accessibility/';
const exercisePath = '/exercises/testing-a-community-announcement-video/';
const fixturePath = '/exercise-fixtures/community-announcement-media/';
const captionPath = '/media/community-centre-open-day.en.vtt';

test('media method and Exercise render their paired learning contract', async ({ page, request }) => {
  await page.goto(methodPath);
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Testing media accessibility');
  const content = page.locator('[data-content-body]');
  await expect(content).toContainText('A transcript does not generally replace synchronized captions');
  await expect(content).toContainText('Native media controls');
  await expect(content).toContainText('Live captions');
  await expect(page.getByRole('link', { name: 'Testing a community announcement video' })).toHaveAttribute('href', exercisePath);

  await page.goto(exercisePath);
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Testing a community announcement video');
  await expect(page.getByText('Difficulty: beginner')).toBeVisible();
  await expect(page.getByText('Estimated time: 30 minutes')).toBeVisible();
  await expect(page.getByRole('link', { name: 'Testing media accessibility' })).toHaveAttribute('href', methodPath);
  await expectStandaloneExercise(page, request, {
    exercisePath,
    fixturePath,
    fixtureTitle: 'Community announcement media exercise',
  });
});

test('fixture exposes one local native video, caption track, and incomplete transcript', async ({ page }) => {
  await page.goto(fixturePath);
  const video = page.locator('video');
  await expect(video).toHaveCount(1);
  await expect(video).toHaveAttribute('controls', '');
  await expect(video).toHaveAttribute('preload', 'metadata');
  await expect(video).toHaveAttribute('poster', '/media/community-centre-open-day-poster.svg');
  await expect(video).not.toHaveAttribute('autoplay', '');
  await expect(video.locator('source')).toHaveAttribute('src', '/media/community-centre-open-day.webm');
  const track = video.locator('track');
  await expect(track).toHaveCount(1);
  await expect(track).toHaveAttribute('kind', 'captions');
  await expect(track).toHaveAttribute('srclang', 'en');
  await expect(track).toHaveAttribute('default', '');
  await expect(track).toHaveAttribute('src', captionPath);

  const transcript = page.locator('.transcript');
  await expect(transcript).toContainText('Workshops are free, and you do not need to book.');
  await expect(transcript).toContainText('[Bell rings]');
  await expect(transcript).not.toContainText('Doors open at ten');
  await expect(transcript).not.toContainText('Quiet hour');
  await expect(transcript).not.toContainText('Step-free entrance');
});

test('caption file has the approved completeness, identification, and timing boundaries', async ({ request }) => {
  const response = await request.get(captionPath);
  expect(response.ok()).toBe(true);
  const captions = await response.text();
  expect(captions.startsWith('WEBVTT')).toBe(true);
  expect(captions).toContain('Doors open at ten in the morning.');
  expect(captions).not.toContain('Workshops are free');
  expect(captions).not.toMatch(/bell|music|sound|\[|speaker:/i);
  expect(captions).toContain('This is Alex from the community team.');

  const cueLines = captions.split('\n');
  const welcomeDeskIndex = cueLines.indexOf('Visit the welcome desk if you need help during the day.');
  expect(welcomeDeskIndex).toBeGreaterThan(0);
  const [start] = cueLines[welcomeDeskIndex - 1].split(' --> ');
  const alexIndex = cueLines.indexOf('This is Alex from the community team.');
  const [, alexEnd] = cueLines[alexIndex - 1].split(' --> ');
  const seconds = (timestamp) => timestamp.split(':').reduce((total, value) => total * 60 + Number(value), 0);
  expect(seconds(start) - seconds(alexEnd)).toBeGreaterThan(2);
});

test('video metadata, playback, seeking, volume, and captions are available', async ({ page }) => {
  await page.goto(fixturePath);
  const video = page.locator('video');
  await video.evaluate((element) => new Promise((resolve, reject) => {
    const media = /** @type {HTMLVideoElement} */ (element);
    if (media.readyState >= 1) return resolve();
    media.addEventListener('loadedmetadata', resolve, { once: true });
    media.addEventListener('error', () => reject(media.error), { once: true });
  }));
  await expect.poll(() => video.evaluate((element) => element.duration)).toBeLessThanOrEqual(40);
  const metadata = await video.evaluate((element) => ({
    duration: element.duration,
    paused: element.paused,
    currentTime: element.currentTime,
    width: element.videoWidth,
    height: element.videoHeight,
    tracks: element.textTracks.length,
  }));
  expect(metadata.duration).toBeGreaterThanOrEqual(30);
  expect(metadata.duration).toBeLessThanOrEqual(40);
  expect(metadata).toMatchObject({ paused: true, currentTime: 0, width: 960, height: 540, tracks: 1 });

  await video.evaluate(async (element) => { await element.play(); });
  await expect.poll(() => video.evaluate((element) => element.currentTime)).toBeGreaterThan(0);
  await video.evaluate((element) => {
    const media = /** @type {HTMLVideoElement} */ (element);
    media.pause();
    media.currentTime = 8;
    media.volume = 0.4;
    media.textTracks[0].mode = 'showing';
  });
  await expect.poll(() => video.evaluate((element) => element.paused)).toBe(true);
  expect(await video.evaluate((element) => element.currentTime)).toBeCloseTo(8, 0);
  expect(await video.evaluate((element) => element.volume)).toBeCloseTo(0.4, 2);
  expect(await video.evaluate((element) => element.textTracks[0].mode)).toBe('showing');
});

test('Exercise disclosures, themes, responsive fit, and axe boundary remain intact', async ({ page }) => {
  await page.goto(exercisePath);
  await expect(page.locator('details').filter({ hasText: 'Hints' }).locator('li')).toHaveCount(3);
  await expect(page.locator('details').filter({ hasText: 'Solution' }).locator('section')).toHaveCount(5);
  await expect(page.locator('details').filter({ hasText: 'Solution' })).not.toHaveAttribute('open');

  await page.addInitScript(() => localStorage.setItem('darkMode', 'enabled'));
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(fixturePath);
  await expect(page.locator('html')).toHaveClass(/dark/);
  await page.locator('.return-link').focus();
  await expect(page.locator('.return-link')).toHaveCSS('outline-style', 'solid');
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(390);
  expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
  expect(await page.locator('main').innerHTML()).not.toMatch(/intentional.finding|finding.count|model.answer|diagnostic|solution/i);
});
