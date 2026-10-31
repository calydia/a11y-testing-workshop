import { test, expect } from './helpers/test.js';
import AxeBuilder from '@axe-core/playwright';

/** @typedef {Window & { validationEvents: string[] }} ValidationWindow */

const route = '/demos/accessible-forms-basics/';
const email = (page) => page.locator('[data-form-host] #forms-email');
const password = (page) => page.locator('[data-form-host] #forms-password');
const submit = (page) => page.getByRole('button', { name: 'Try creating an account' });
const feedback = (page) => page.locator('[data-form-host] #forms-feedback');
const selectStage = (page, stage) => page.locator(`[data-demo-navigation] [data-stage-link="${stage}"]`).click();

test.beforeEach(async ({ page }) => { await page.goto(route); });

test('stage navigation works by keyboard, preserves values, clears state and retains focus', async ({ page }) => {
  await email(page).fill('learner@example.com');
  await password(page).fill('made-up');
  await submit(page).click();
  await expect(feedback(page)).toHaveText('Invalid input.');
  const stageLink = page.locator('[data-demo-navigation] [data-stage-link="2"]');
  await stageLink.focus();
  await page.keyboard.press('Enter');
  await expect(stageLink).toHaveAttribute('aria-current', 'step');
  await expect(stageLink).toBeFocused();
  await expect(email(page)).toHaveValue('learner@example.com');
  await expect(password(page)).toHaveValue('made-up');
  await expect(feedback(page)).toBeHidden();
  await page.locator('[data-form-host] label[for="forms-email"]').click();
  await expect(email(page)).toBeFocused();
  await page.keyboard.press('Tab');
  await expect(password(page)).toBeFocused();
  await expect(password(page)).toHaveCSS('outline-style', 'solid');
  await selectStage(page, 6);
  await submit(page).click();
  await expect(password(page)).toHaveAttribute('aria-invalid', 'true');
  await selectStage(page, 4);
  await expect(password(page)).not.toHaveAttribute('aria-invalid');
  await expect(password(page)).toHaveAccessibleDescription('Use at least 12 characters.');
  await page.getByRole('button', { name: 'Reset form', exact: true }).click();
  await expect(email(page)).toHaveValue('');
  await expect(password(page)).toHaveValue('');
  await selectStage(page, 1);
  await expect(password(page)).toHaveValue('');
});

test('stages expose the intended differences and native validation', async ({ page }) => {
  // Placeholder fallback names may pass axe; these are intentionally NOT labels.
  await expect(page.locator('[data-form-host] label')).toHaveCount(0);
  await expect(email(page)).toHaveAttribute('placeholder', 'Email address');
  await expect(email(page)).not.toHaveAttribute('required');
  await expect(password(page)).toHaveAttribute('type', 'password');
  await submit(page).click();
  await expect(feedback(page)).toHaveText('Invalid input.');
  await expect(submit(page)).toBeFocused();
  await expect(email(page)).not.toHaveAttribute('aria-describedby');
  await selectStage(page, 2);
  await expect(email(page)).toHaveAccessibleName('Email address');
  await selectStage(page, 3);
  await expect(email(page)).toHaveAccessibleName('Email address (required)');
  await expect(email(page)).toHaveAttribute('required', '');
  await submit(page).click();
  await expect(email(page)).toBeFocused();
  await expect(feedback(page)).toBeHidden();
  await selectStage(page, 4);
  await expect(password(page)).toHaveAccessibleDescription('Use at least 12 characters.');
  await selectStage(page, 5);
  await expect(email(page)).toHaveAttribute('type', 'email');
  await expect(email(page)).toHaveAttribute('autocomplete', 'email');
  await expect(password(page)).toHaveAttribute('type', 'password');
  await expect(password(page)).toHaveAttribute('autocomplete', 'new-password');
  await email(page).fill('not-an-email');
  await password(page).fill('short');
  await submit(page).click();
  await expect(email(page)).toBeFocused();
  await expect(feedback(page)).toBeHidden();
  await email(page).fill('learner@example.com');
  await submit(page).click();
  await expect(feedback(page)).toHaveText('Invalid input.');
});

test('Stage 6 provides actionable errors, focus navigation, correction and confirmation', async ({ page }) => {
  await selectStage(page, 6);
  await expect(email(page)).not.toHaveAttribute('aria-invalid');
  await expect(password(page)).not.toHaveAttribute('aria-invalid');
  await submit(page).click();
  await expect(feedback(page)).toBeFocused();
  await expect(feedback(page)).toContainText('correct 2 errors');
  await expect(email(page)).toHaveAccessibleDescription('Enter your email address.');
  await expect(password(page)).toHaveAccessibleDescription('Use at least 12 characters. Enter a password with at least 12 characters.');
  await expect(email(page)).toHaveAttribute('aria-invalid', 'true');
  await page.keyboard.press('Tab');
  await expect(page.getByRole('link', { name: 'Enter your email address.', exact: true })).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(email(page)).toBeFocused();
  await email(page).fill('bad-address');
  await password(page).fill('short');
  await submit(page).click();
  await expect(email(page)).toHaveAccessibleDescription('Enter an email address such as learner@example.com.');
  await expect(password(page)).toHaveAccessibleDescription('Use at least 12 characters. Use at least 12 characters for your password.');
  await expect(password(page)).toHaveValue('short');
  await email(page).fill('learner@example.com');
  await password(page).fill('fictional-password');
  await submit(page).click();
  await expect(feedback(page)).toBeFocused();
  await expect(feedback(page)).toContainText('Demo complete.');
  await expect(email(page)).not.toHaveAttribute('aria-invalid');
  await expect(password(page)).toHaveAccessibleDescription('Use at least 12 characters.');
  await page.getByRole('button', { name: 'Reset form', exact: true }).click();
  await expect(feedback(page)).toBeHidden();
  await expect(password(page)).toHaveValue('');
});

test('HTML matches live initial markup and copies without including entered values', async ({ page, context }) => {
  await context.grantPermissions(['clipboard-read', 'clipboard-write']);
  for (let stage = 1; stage <= 6; stage++) {
    await selectStage(page, stage);
    expect(await page.locator('[data-html-code]').textContent()).toBe(await page.locator('[data-form-host]').innerHTML());
  }
  await password(page).fill('private-fictional-password');
  await page.getByText('HTML for this stage', { exact: true }).click();
  await page.getByRole('button', { name: 'Copy HTML', exact: true }).click();
  await expect(page.locator('[data-copy-status="html"]')).toHaveText('HTML copied.');
  const copied = await page.evaluate(() => navigator.clipboard.readText());
  expect(copied).toContain('novalidate');
  expect(copied).not.toContain('private-fictional-password');
  await page.getByText('JavaScript for the working form', { exact: true }).click();
  await page.getByRole('button', { name: 'Copy JavaScript' }).click();
  await expect(page.locator('[data-copy-status="js"]')).toHaveText('JavaScript copied.');
  expect(await page.evaluate(() => navigator.clipboard.readText())).toContain('export function connectForm');
});

test('copy failure explains a manual alternative', async ({ page }) => {
  await page.evaluate(() => Object.defineProperty(navigator, 'clipboard', { value: { writeText: () => Promise.reject(new Error('Unavailable')) } }));
  await page.getByText('HTML for this stage', { exact: true }).click();
  await page.getByRole('button', { name: 'Copy HTML', exact: true }).click();
  await expect(page.locator('[data-copy-status="html"]')).toContainText('Select the code and copy');
});

test('submissions and switches neither send nor persist form values', async ({ page }) => {
  const requests = [];
  const logs = [];
  page.on('request', (request) => requests.push(request.url()));
  page.on('console', (message) => logs.push(message.text()));
  const before = await page.evaluate(() => ({ local: { ...localStorage }, session: { ...sessionStorage } }));
  for (let stage = 1; stage <= 6; stage++) {
    await selectStage(page, stage);
    await email(page).fill('fictional@example.com');
    await password(page).fill('fictional-private-password');
    await submit(page).click();
    await expect(feedback(page)).toContainText('Demo complete.');
  }
  expect(requests).toEqual([]);
  expect(logs.join(' ')).not.toContain('fictional');
  expect(await page.evaluate(() => ({ local: { ...localStorage }, session: { ...sessionStorage } }))).toEqual(before);
  await page.reload();
  await expect(email(page)).toHaveValue('');
  await expect(password(page)).toHaveValue('');
});

for (const theme of ['light', 'dark']) {
  test(`all stages and failed states pass axe in ${theme}; deliberate usability defects are asserted separately`, async ({ page }) => {
    await page.evaluate((theme) => {
      document.documentElement.classList.remove('light', 'dark');
      document.documentElement.classList.add(theme);
    }, theme);
    for (let stage = 1; stage <= 6; stage++) {
      await selectStage(page, stage);
      // No exclusions: placeholders provide fallback names to axe, but are still
      // intentionally inadequate visible labels. No automated rule proves usability.
      expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
      await email(page).fill('learner@example.com');
      await password(page).fill('short');
      await submit(page).click();
      expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
      await page.getByRole('button', { name: 'Reset form', exact: true }).click();
    }
  });
}

test('demo reflows at mobile, intermediate and desktop widths, enlarged text and forced colors', async ({ page }, testInfo) => {
  for (const theme of ['light', 'dark']) {
    await page.evaluate((theme) => {
      document.documentElement.classList.remove('light', 'dark');
      document.documentElement.classList.add(theme);
    }, theme);
    for (const width of [320, 768, 1280]) {
      await page.setViewportSize({ width, height: 900 });
      await selectStage(page, 6);
      await submit(page).click();
      await page.getByText('JavaScript for the working form', { exact: true }).click();
      expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width);
      await page.locator('[data-form-host]').screenshot({ path: testInfo.outputPath(`form-${theme}-${width}.png`) });
      await page.getByText('JavaScript for the working form', { exact: true }).click();
    }
  }
  await page.setViewportSize({ width: 390, height: 844 });
  await page.evaluate(() => { document.documentElement.style.fontSize = '200%'; });
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(390);
  await page.emulateMedia({ forcedColors: 'active', reducedMotion: 'reduce' });
  await email(page).focus();
  await expect(email(page)).toHaveCSS('outline-style', 'solid');
  await expect(email(page)).toBeVisible();
});

test.describe('without JavaScript', () => {
  test.use({ javaScriptEnabled: false });
  test('explains the fallback without exposing a form that could navigate', async ({ page }) => {
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Accessible Forms: The Basics Developers Should Get Right');
    await expect(page.getByText('Enable JavaScript to try the interactive stages.', { exact: false })).toBeVisible();
    await expect(page.locator('[data-form-host] form')).toHaveCount(0);
    await expect(page.locator('[data-demo-interface]')).toBeHidden();
  });
});

test('stage URLs, history and listing keep the demo independent from methods', async ({ page }) => {
  await page.goto('/demos/');
  await page.getByRole('link', { name: 'Accessible Forms: The Basics Developers Should Get Right', exact: true }).click();
  await expect(page.getByRole('navigation', { name: 'Implementation stages' }).getByRole('link', { name: /^\d\./ })).toHaveCount(6);
  await expect(page.locator('select')).toHaveCount(0);
  await selectStage(page, 4);
  await expect(page).toHaveURL(/\?stage=4$/);
  await expect(page.getByRole('heading', { level: 2, name: '4. Connect password instructions' })).toBeVisible();
  await password(page).fill('fictional');
  await selectStage(page, 6);
  await password(page).focus();
  await page.goBack();
  await expect(page.locator('[data-demo-navigation] [data-stage-link="4"]')).toHaveAttribute('aria-current', 'step');
  await expect(password(page)).toBeFocused();
  await expect(password(page)).toHaveValue('fictional');
  await page.goForward();
  await expect(page.locator('[data-demo-navigation] [data-stage-link="6"]')).toHaveAttribute('aria-current', 'step');
  await page.reload();
  await expect(page.locator('[data-demo-navigation] [data-stage-link="6"]')).toHaveAttribute('aria-current', 'step');
  await expect(password(page)).toHaveValue('');
  await page.goto(route + '?stage=invalid');
  await expect(page.locator('[data-demo-navigation] [data-stage-link="1"]')).toHaveAttribute('aria-current', 'step');
  const breadcrumbs = page.getByRole('navigation', { name: 'Breadcrumbs' });
  await expect(breadcrumbs.getByRole('link', { name: 'Demos' })).toHaveAttribute('href', '/demos/');
  await expect(page.getByRole('navigation', { name: 'Main' }).getByRole('link', { name: 'Demos' })).toHaveAttribute('data-current-section', 'true');
  await expect(page.getByText('End of demo.', { exact: true })).toBeVisible();
});

test('sidebar stays available on desktop and precedes the form on mobile', async ({ page }, testInfo) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await selectStage(page, 6);
  const navigation = page.getByRole('navigation', { name: 'Implementation stages' });
  const position = await navigation.boundingBox();
  const formPosition = await page.locator('[data-form-host]').boundingBox();
  expect(position.x).toBeGreaterThan(formPosition.x + formPosition.width);
  await page.getByText('JavaScript for the working form', { exact: true }).click();
  await page.locator('[data-js-code]').scrollIntoViewIfNeeded();
  const stickyPosition = await navigation.boundingBox();
  expect(stickyPosition.y).toBeGreaterThanOrEqual(0);
  expect(stickyPosition.y + stickyPosition.height).toBeLessThan(1000);
  await selectStage(page, 2);
  await expect(page.locator('[data-demo-navigation] [data-stage-link="2"]')).toBeFocused();
  const stagePosition = await page.locator('#forms-stage-content').boundingBox();
  expect(stagePosition.y).toBeGreaterThanOrEqual(0);
  expect(stagePosition.y).toBeLessThan(600);
  await page.getByText('JavaScript for the working form', { exact: true }).click();
  await page.screenshot({ path: testInfo.outputPath('demo-desktop.png'), fullPage: true });
  await page.setViewportSize({ width: 390, height: 844 });
  const mobileNav = await navigation.boundingBox();
  const mobileForm = await page.locator('[data-form-host]').boundingBox();
  expect(mobileNav.y + mobileNav.height).toBeLessThan(mobileForm.y);
  await page.getByRole('link', { name: 'Change stage', exact: true }).click();
  await expect(navigation).toBeFocused();
  await page.screenshot({ path: testInfo.outputPath('demo-mobile.png'), fullPage: true });
});

for (const theme of ['light', 'dark']) {
  test(`buttons use the existing brand styles in ${theme}, including hover and focus`, async ({ page }) => {
    await page.evaluate((theme) => {
      document.documentElement.classList.remove('light', 'dark');
      document.documentElement.classList.add(theme);
    }, theme);
    await expect(submit(page)).toHaveClass('button');
    await expect(submit(page)).toHaveCSS('background-color', theme === 'light' ? 'rgb(3, 53, 115)' : 'rgb(173, 229, 248)');
    await submit(page).hover();
    await expect(submit(page)).toHaveCSS('background-color', 'rgba(0, 0, 0, 0)');
    await submit(page).focus();
    await expect(submit(page)).toHaveCSS('outline-style', 'solid');
  });
}

test('end-of-stage links guide progression, preserve values and focus the new stage', async ({ page }) => {
  const progression = page.getByRole('navigation', { name: 'Stage progression' });
  const previous = progression.locator('[data-stage-direction="previous"]');
  const next = progression.locator('[data-stage-direction="next"]');
  await expect(previous).toBeHidden();
  await expect(next).toHaveText('Next: Add visible labels');
  await expect(next).toHaveAttribute('href', '?stage=2');
  await email(page).fill('learner@example.com');
  await password(page).fill('fictional');
  await submit(page).click();
  await expect(feedback(page)).toBeVisible();
  await next.focus();
  await page.keyboard.press('Enter');
  await expect(page).toHaveURL(/\?stage=2$/);
  await expect(page.getByRole('heading', { level: 2, name: '2. Add visible labels' })).toBeFocused();
  await expect(email(page)).toHaveValue('learner@example.com');
  await expect(password(page)).toHaveValue('fictional');
  await expect(feedback(page)).toBeHidden();
  await expect(page.locator('[data-demo-navigation] [aria-current="step"]')).toHaveText('2. Add visible labels');
  await expect(page.locator('[data-stage-status]')).toHaveText('');
  await expect(previous).toHaveText('Previous: Start with the problems');
  await expect(next).toHaveText('Next: Identify required fields');
  await previous.click();
  await expect(page.getByRole('heading', { level: 2, name: '1. Start with the problems' })).toBeFocused();
  for (let stage = 2; stage <= 6; stage++) {
    await next.click();
    await expect(page).toHaveURL(new RegExp(`\\?stage=${stage}$`));
    await expect(page.locator(`section[data-stage-details="${stage}"] h2`)).toBeFocused();
  }
  await expect(next).toBeHidden();
  await expect(previous).toHaveText('Previous: Add email type and autocomplete');
  await expect(progression).toContainText('You’ve reached the final stage.');
  await page.goBack();
  await expect(previous).toHaveText('Previous: Connect password instructions');
  await expect(next).toHaveText('Next: Help people correct errors');
});

test('progression links reflow and follow the code and guidance in both themes', async ({ page }, testInfo) => {
  await selectStage(page, 3);
  const progression = page.getByRole('navigation', { name: 'Stage progression' });
  expect(await progression.evaluate((element) => Boolean(document.querySelector('[data-js-code]').compareDocumentPosition(element) & Node.DOCUMENT_POSITION_FOLLOWING))).toBe(true);
  expect(await progression.evaluate((element) => Boolean(element.compareDocumentPosition(document.querySelector('.demo-end')) & Node.DOCUMENT_POSITION_FOLLOWING))).toBe(true);
  for (const theme of ['light', 'dark']) {
    await page.evaluate((theme) => {
      document.documentElement.classList.remove('light', 'dark');
      document.documentElement.classList.add(theme);
    }, theme);
    for (const width of [320, 768, 1280]) {
      await page.setViewportSize({ width, height: 900 });
      expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width);
      await progression.screenshot({ path: testInfo.outputPath(`progression-${theme}-${width}.png`) });
    }
  }
  await page.setViewportSize({ width: 390, height: 844 });
  await progression.getByRole('link', { name: 'Next: Connect password instructions' }).click();
  await expect(page.getByRole('heading', { level: 2, name: '4. Connect password instructions' })).toBeFocused();
  const headingBox = await page.getByRole('heading', { level: 2, name: '4. Connect password instructions' }).boundingBox();
  expect(headingBox.y).toBeGreaterThanOrEqual(0);
  expect(headingBox.y).toBeLessThan(844);
});

test('every stage masks passwords and its HTML excerpt comes from the actual initial markup', async ({ page }) => {
  for (let stage = 1; stage <= 6; stage++) {
    await selectStage(page, stage);
    await expect(password(page)).toHaveAttribute('type', 'password');
    const markup = await page.locator('[data-html-code]').textContent();
    const snippet = await page.locator(`[data-change-code="${stage}"]`).textContent();
    expect(markup).toContain('type="password"');
    for (const line of snippet.split('\n').filter((line) => !line.includes('<!--'))) {
      // Browsers serialize boolean attributes as empty strings.
      expect(markup).toContain(line.trim().replace(/\b(required|novalidate|hidden)(?=[ >])/g, '$1=""'));
    }
    await expect(password(page)).not.toHaveAttribute('minlength');
    if (stage < 5) await expect(password(page)).not.toHaveAttribute('autocomplete');
    else await expect(password(page)).toHaveAttribute('autocomplete', 'new-password');
  }
});

for (const stage of [3, 4, 5]) {
  test(`Stage ${stage} distinguishes native blocking from intentionally generic custom errors`, async ({ page }) => {
    await selectStage(page, stage);
    await page.evaluate(() => {
      /** @type {ValidationWindow} */ (window).validationEvents = [];
      const form = document.querySelector('[data-form-host] form');
      form.addEventListener('invalid', () => /** @type {ValidationWindow} */ (window).validationEvents.push('native-invalid'), true);
      form.addEventListener('submit', () => /** @type {ValidationWindow} */ (window).validationEvents.push('submit'));
    });
    await submit(page).click();
    expect(await page.evaluate(() => /** @type {ValidationWindow} */ (window).validationEvents)).toEqual(['native-invalid', 'native-invalid']);
    await expect(feedback(page)).toBeHidden();
    await expect(email(page)).toBeFocused();
    await email(page).fill('not-an-email');
    await password(page).fill('fictional-password');
    await page.evaluate(() => { /** @type {ValidationWindow} */ (window).validationEvents = []; });
    await submit(page).click();
    expect(await page.evaluate(() => /** @type {ValidationWindow} */ (window).validationEvents)).toEqual(stage === 5 ? ['native-invalid'] : ['submit']);
    if (stage === 5) await expect(feedback(page)).toBeHidden();
    else await expect(feedback(page)).toHaveText('Invalid input.');
    await email(page).fill('learner@example.com');
    await password(page).fill('short');
    await page.evaluate(() => { /** @type {ValidationWindow} */ (window).validationEvents = []; });
    await submit(page).click();
    expect(await page.evaluate(() => /** @type {ValidationWindow} */ (window).validationEvents)).toEqual(['submit']);
    await expect(feedback(page)).toHaveText('Invalid input.');
    await expect(password(page)).not.toHaveAttribute('aria-invalid');
    await expect(page.locator('[data-validation-explanation]:visible')).toContainText('browser');
  });
}

test('current HTML reflects generated relationships and clears them without exposing entered values', async ({ page, context }) => {
  await context.grantPermissions(['clipboard-read', 'clipboard-write']);
  const current = page.locator('[data-rendered-html-code]');
  await selectStage(page, 6);
  await expect(current).not.toContainText('aria-invalid');
  await email(page).fill('private-invalid-value');
  await password(page).fill('secret');
  await submit(page).click();
  await expect(current).toContainText('aria-invalid="true"');
  await expect(current).toContainText('aria-describedby="forms-email-error"');
  await expect(current).toContainText('aria-describedby="forms-password-hint forms-password-error"');
  await expect(current).toContainText('Enter an email address such as learner@example.com.');
  await expect(current).toContainText('Use at least 12 characters for your password.');
  await expect(current).not.toContainText('private-invalid-value');
  await expect(current).not.toContainText('secret');
  // The full snapshot includes the summary, error text and relationships, not a
  // fabricated validation example. Input values are properties, not attributes.
  expect(await current.textContent()).toBe(await page.locator('[data-form-host] form').evaluate((form) => form.outerHTML));
  await page.getByText('HTML for this stage', { exact: true }).click();
  await page.getByText('Current form HTML (entered values omitted)', { exact: true }).click();
  await page.getByRole('button', { name: 'Copy current HTML', exact: true }).click();
  await expect(page.locator('[data-copy-status="rendered"]')).toHaveText('Current HTML copied.');
  const copied = await page.evaluate(() => navigator.clipboard.readText());
  expect(copied).toContain('forms-password-hint forms-password-error');
  expect(copied).not.toContain('secret');
  expect(copied).not.toContain('private-invalid-value');
  await email(page).fill('learner@example.com');
  await password(page).fill('fictional-password');
  await submit(page).click();
  await expect(current).not.toContainText('aria-invalid');
  await expect(current).toContainText('aria-describedby="forms-password-hint"');
  await expect(current).toContainText('Demo complete.');
  await page.getByRole('button', { name: 'Reset form', exact: true }).click();
  await expect(current).not.toContainText('Demo complete.');
  await selectStage(page, 4);
  await expect(current).not.toContainText('novalidate');
  await expect(current).not.toContainText('forms-password-error');
});

test('expanded change snippets and current HTML fit both themes and narrow screens', async ({ page }, testInfo) => {
  await selectStage(page, 6);
  await submit(page).click();
  await page.getByText('HTML change to focus on', { exact: true }).click();
  await page.getByText('HTML for this stage', { exact: true }).click();
  await page.getByText('Current form HTML (entered values omitted)', { exact: true }).click();
  for (const theme of ['light', 'dark']) {
    await page.evaluate((theme) => {
      document.documentElement.classList.remove('light', 'dark');
      document.documentElement.classList.add(theme);
    }, theme);
    for (const width of [320, 768, 1280]) {
      await page.setViewportSize({ width, height: 900 });
      expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width);
    }
    // Scan the final theme, after existing site-shell color transitions finish.
    await page.evaluate(() => Promise.all(document.getAnimations().filter((animation) => animation instanceof CSSTransition).map((animation) => animation.finished.catch(() => {}))));
    expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
    await page.locator('[data-change-details]').screenshot({ path: testInfo.outputPath(`html-change-${theme}.png`) });
  }
});
