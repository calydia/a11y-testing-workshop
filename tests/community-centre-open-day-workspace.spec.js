import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const workspacePath = '/journey-workspaces/community-centre-open-day/';

test('open-day workspace has a standalone boundary and return route', async ({ page }) => {
  const response = await page.goto(workspacePath);
  expect(response?.ok()).toBe(true);
  await expect(page).toHaveTitle('Community centre open-day workspace');
  await expect(page.getByRole('heading', { level: 1, name: 'Open day for everyone' })).toBeVisible();
  const returnLink = page.getByRole('link', { name: 'Return to the Testing journey' });
  await expect(returnLink).toHaveAttribute('href', '/journeys/reviewing-a-community-centre-open-day-before-launch/');
  await expect(returnLink).not.toHaveAttribute('target');
});

test('pointer-only save behavior stays isolated from otherwise keyboard-accessible controls', async ({ page }) => {
  await page.goto(workspacePath);
  const save = page.locator('[data-save]');
  await save.click();
  await expect(save).toContainText('Activity saved');
  await expect(page.locator('[data-save-status]')).toContainText('Added to your saved activities');
  await save.focus();
  await page.keyboard.press('Enter');
  await expect(save).toContainText('Activity saved');
  await expect(save).toHaveAttribute('tabindex', '-1');
  const returnLink = page.getByRole('link', { name: 'Return to the Testing journey' });
  await returnLink.focus();
  await expect(returnLink).toHaveCSS('outline-style', 'solid');
});

test('schedule filters expose state and filter deterministic cards', async ({ page }) => {
  await page.goto(workspacePath);
  const creative = page.getByRole('button', { name: 'Creative' });
  await creative.click();
  await expect(creative).toHaveAttribute('aria-pressed', 'true');
  await expect(page.getByRole('button', { name: 'All activities' })).toHaveAttribute('aria-pressed', 'false');
  await expect(page.locator('[data-category="creative"]')).toHaveCount(2);
  await expect(page.locator('[data-category="movement"]')).toBeHidden();
  await page.reload();
  await expect(page.getByRole('button', { name: 'All activities' })).toHaveAttribute('aria-pressed', 'true');
});

test('featured activities move automatically even with reduced motion', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto(workspacePath);
  await expect(page.locator('[data-feature-title]')).toHaveText('Community garden tour');
  await expect(page.locator('[data-feature-title]')).toHaveText('Open ceramics studio', { timeout: 5000 });
  await expect(page.getByRole('button', { name: /pause|stop|hide/i })).toHaveCount(0);
});

test('map controls are undersized while primary actions provide a passing comparison', async ({ page }) => {
  await page.goto(workspacePath);
  const mapBoxes = await page.locator('.map-controls button').evaluateAll((buttons) => buttons.map((button) => {
    const box = button.getBoundingClientRect();
    return { width: box.width, height: box.height };
  }));
  expect(mapBoxes.every(({ width, height }) => width < 24 && height < 24)).toBe(true);
  const primary = await page.getByRole('link', { name: 'Contact the community centre' }).boundingBox();
  expect(primary?.height).toBeGreaterThanOrEqual(44);
});

test('forced colors removes the authored filter cue and map color distinctions', async ({ page }) => {
  await page.emulateMedia({ forcedColors: 'active' });
  await page.goto(workspacePath);
  const selected = page.getByRole('button', { name: 'All activities' });
  await expect(selected).toHaveAttribute('aria-pressed', 'true');
  await expect(selected).toHaveCSS('box-shadow', 'none');
  const fills = await page.locator('.map-room').evaluateAll((rooms) => rooms.map((room) => getComputedStyle(room).fill));
  expect(new Set(fills).size).toBe(1);
});

test('fixed booking bar obscures trailing content only at the narrow reflow condition', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.goto(workspacePath);
  const contact = page.locator('.contact');
  const bar = page.locator('.fixed-booking-bar');
  await contact.scrollIntoViewIfNeeded();
  const desktopContact = await contact.boundingBox();
  const desktopBar = await bar.boundingBox();
  expect(desktopContact.y + desktopContact.height).toBeLessThanOrEqual(desktopBar.y);

  await page.setViewportSize({ width: 320, height: 800 });
  await page.reload();
  await page.locator('.contact').scrollIntoViewIfNeeded();
  const narrowContact = await page.locator('.contact').boundingBox();
  const narrowBar = await page.locator('.fixed-booking-bar').boundingBox();
  expect(narrowContact.y + narrowContact.height).toBeGreaterThan(narrowBar.y);
});

test('phone landscape is restricted while portrait and desktop landscape stay available', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(workspacePath);
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  await page.setViewportSize({ width: 844, height: 390 });
  await expect(page.getByText('Please rotate your phone to portrait')).toBeVisible();
  await page.setViewportSize({ width: 1280, height: 720 });
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
});

test('travel media keeps the two content comparison cases', async ({ page }) => {
  await page.goto(workspacePath);
  const video = page.locator('video');
  await expect(video).toHaveAttribute('controls', '');
  await expect(video).not.toHaveAttribute('autoplay');
  await expect(video.locator('source')).toHaveAttribute('src', '/media/open-day-travel-information.webm');
  await expect(video.locator('track')).toHaveAttribute('src', '/media/open-day-travel-information.en.vtt');
  await expect(video.locator('track')).toHaveAttribute('default', '');
  const captions = await (await page.request.get('/media/open-day-travel-information.en.vtt')).text();
  expect(captions).toContain('tram 4');
  expect(captions).not.toContain('Shuttle cancelled');
  const transcript = page.locator('.transcript');
  await expect(transcript).toContainText('tram 7');
  await expect(transcript).not.toContainText('Shuttle cancelled');
  await expect(video).toHaveAttribute('poster', '/media/open-day-travel-information-poster.svg');
  await video.evaluate((element) => new Promise((resolve) => {
    if (element.readyState >= HTMLMediaElement.HAVE_METADATA) resolve();
    else element.addEventListener('loadedmetadata', resolve, { once: true });
  }));
  await expect.poll(() => video.evaluate((element) => element.duration)).toBeLessThan(30);
  expect(await video.evaluate((element) => element.duration)).toBeGreaterThan(0);
  await video.evaluate(async (element) => { await element.play(); });
  await expect.poll(() => video.evaluate((element) => element.currentTime)).toBeGreaterThan(0);
  await video.evaluate((element) => {
    const media = /** @type {HTMLVideoElement} */ (element);
    media.pause();
    media.currentTime = 3;
    media.volume = 0.4;
    media.textTracks[0].mode = 'showing';
  });
  await expect.poll(() => video.evaluate((element) => element.paused)).toBe(true);
  expect(await video.evaluate((element) => element.currentTime)).toBeCloseTo(3, 0);
  expect(await video.evaluate((element) => element.volume)).toBeCloseTo(0.4, 2);
  expect(await video.evaluate((element) => element.textTracks[0].mode)).toBe('showing');
});

test('workspace has the expected automated boundary, saved theme, and no answer leakage', async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem('darkMode', 'enabled'));
  await page.goto(workspacePath);
  await expect(page.locator('html')).toHaveClass(/dark/);
  expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
  const html = await page.locator('html').innerHTML();
  expect(html).not.toMatch(/intentional.finding|finding.count|diagnostic|model.answer|nine findings/i);
  await page.setViewportSize({ width: 390, height: 844 });
  await page.reload();
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(390);
});
