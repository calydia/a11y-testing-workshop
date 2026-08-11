import { test, expect } from '@playwright/test';

const keyboardMethod = {
  path: '/methods/testing-keyboard-accessibility/',
  title: 'Testing keyboard accessibility',
};

const visualMethod = {
  path: '/methods/testing-visual-accessibility/',
  title: 'Testing visual accessibility',
};

const zoomMethod = {
  path: '/methods/testing-zoom-and-reflow/',
  title: 'Testing zoom and reflow',
};

const automatedMethod = {
  path: '/methods/testing-with-automated-tools/',
  title: 'Testing with automated tools',
};

const imageAlternativeMethod = {
  path: '/methods/testing-image-alternative-text/',
  title: 'Testing image alternative text',
};

const screenReaderMethods = [
  {
    path: '/methods/screen-reader-page-structure-and-links/',
    title: 'Testing page structure and links with a screen reader',
  },
  {
    path: '/methods/screen-reader-icons-and-svg/',
    title: 'Testing icons and SVGs with a screen reader',
  },
  {
    path: '/methods/screen-reader-language-changes/',
    title: 'Testing language changes with a screen reader',
  },
  {
    path: '/methods/testing-modal-dialogs/',
    title: 'Testing modal dialogs',
  },
];

const methods = [
  keyboardMethod,
  visualMethod,
  zoomMethod,
  automatedMethod,
  screenReaderMethods[0],
  imageAlternativeMethod,
  ...screenReaderMethods.slice(1),
];

test('method detail pages provide collection-driven section navigation', async ({ page }) => {
  await page.goto(methods[1].path);

  const navigation = page.getByRole('navigation', { name: 'Testing methods' });
  await expect(navigation).toHaveCount(1);
  await expect(navigation.getByRole('heading', { name: 'Testing methods' })).toBeVisible();

  const links = navigation.getByRole('link');
  await expect(links).toHaveCount(methods.length + 1);
  await expect(links).toHaveText(['All testing methods', ...methods.map((method) => method.title)]);
  await expect(links.first()).toHaveAttribute('href', '/methods/');

  for (const [index, method] of methods.entries()) {
    await expect(links.nth(index + 1)).toHaveAttribute('href', method.path);
  }

  await expect(navigation.getByRole('link', { name: methods[1].title })).toHaveAttribute('aria-current', 'page');
  await expect(navigation.getByRole('link', { name: 'All testing methods' })).not.toHaveAttribute('aria-current');
  await expect(navigation.getByRole('link', { name: methods[0].title })).not.toHaveAttribute('aria-current');
});

test('section navigation reflows from inline content to a sticky sidebar', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(methods[0].path);

  const navigation = page.locator('[data-section-navigation]');
  const heading = page.locator('[data-content-heading]');
  const body = page.locator('[data-content-body]');
  const container = page.locator('[data-section-navigation-container]');

  await expect(navigation).toHaveCount(1);
  expect(await heading.evaluate((element, navigationElement) => Boolean(element.compareDocumentPosition(navigationElement) & Node.DOCUMENT_POSITION_FOLLOWING), await navigation.elementHandle())).toBe(true);
  expect(await navigation.evaluate((element, bodyElement) => Boolean(element.compareDocumentPosition(bodyElement) & Node.DOCUMENT_POSITION_FOLLOWING), await body.elementHandle())).toBe(true);
  await expect(container).toHaveCSS('position', 'static');
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(390);

  await page.setViewportSize({ width: 1280, height: 900 });
  await expect(navigation).toHaveCount(1);
  await expect(container).toHaveCSS('position', 'sticky');
  const [bodyBox, navigationBox] = await Promise.all([body.boundingBox(), container.boundingBox()]);
  expect(navigationBox.x).toBeGreaterThan(bodyBox.x + bodyBox.width);
});

test('desktop section layout has balanced outer margins and compact first-heading spacing', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(methods[0].path);

  const firstBodyHeading = page.locator('[data-content-body] > h2').first();
  await expect(firstBodyHeading).toHaveCSS('margin-top', '48px');

  await page.setViewportSize({ width: 1280, height: 900 });
  const article = page.locator('[data-content-heading]');
  const navigation = page.locator('[data-section-navigation-container]');
  const [articleBox, navigationBox] = await Promise.all([article.boundingBox(), navigation.boundingBox()]);
  const leftMargin = articleBox.x;
  const rightMargin = 1280 - (navigationBox.x + navigationBox.width);

  expect(Math.abs(leftMargin - rightMargin)).toBeLessThanOrEqual(2);
  await expect(firstBodyHeading).toHaveCSS('margin-top', '0px');
});

test('every section navigation link has a visible keyboard focus indicator', async ({ page }) => {
  await page.goto(methods[0].path);
  const links = page.getByRole('navigation', { name: 'Testing methods' }).getByRole('link');

  for (let index = 0; index < await links.count(); index += 1) {
    const link = links.nth(index);
    await link.focus();
    await expect(link).toBeFocused();
    await expect(link).toHaveCSS('outline-style', 'solid');
  }
});

test('testing methods listing contains all methods in collection order', async ({ page }) => {
  await page.goto('/methods/');

  const methodLinks = page.locator('main article h2 > a');
  await expect(methodLinks).toHaveText(methods.map((method) => method.title));

  for (const [index, method] of methods.entries()) {
    await expect(methodLinks.nth(index)).toHaveAttribute('href', method.path);
  }
});

for (const method of screenReaderMethods) {
  test(`${method.title} renders as a testing method`, async ({ page }) => {
    const response = await page.goto(method.path);

    expect(response?.ok()).toBe(true);
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(method.title);
    await expect(page.getByRole('heading', { level: 2, name: 'Demonstration' })).toBeVisible();
    await expect(page.getByRole('heading', { level: 2, name: 'Interpreting the results' })).toBeVisible();
    await expect(page.getByRole('heading', { level: 2, name: 'Limitations' })).toBeVisible();
    await expect(page.getByRole('navigation', { name: 'Main' }).getByRole('link', { name: 'Testing methods' })).not.toHaveAttribute('aria-current', 'page');
  });
}

test('Testing keyboard accessibility renders a method without a demonstration', async ({ page }) => {
  const response = await page.goto(keyboardMethod.path);

  expect(response?.ok()).toBe(true);
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(keyboardMethod.title);
  for (const heading of ['What this method tests', 'What you need', 'Before you start', 'How to perform the test', 'What to observe', 'Interpreting the results', 'Limitations']) {
    await expect(page.getByRole('heading', { level: 2, name: heading })).toBeVisible();
  }
  await expect(page.getByRole('heading', { level: 2, name: 'Demonstration' })).toHaveCount(0);
  await expect(page.locator('[data-content-body]').getByRole('link', { name: 'Testing modal dialogs' })).toHaveAttribute('href', '/methods/testing-modal-dialogs/');

  const sectionNavigation = page.getByRole('navigation', { name: 'Testing methods' });
  await expect(sectionNavigation.getByRole('link', { name: keyboardMethod.title })).toHaveAttribute('aria-current', 'page');
  await expect(sectionNavigation.getByRole('link', { name: methods[1].title })).not.toHaveAttribute('aria-current');

  const breadcrumb = page.getByRole('navigation', { name: 'Breadcrumbs' }).getByRole('listitem');
  await expect(breadcrumb).toHaveText(['Home/', 'Testing methods/', keyboardMethod.title]);
  await expect(breadcrumb.last()).toHaveAttribute('aria-current', 'page');
});

test('Testing visual accessibility renders a method without a demonstration', async ({ page }) => {
  const response = await page.goto(visualMethod.path);

  expect(response?.ok()).toBe(true);
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(visualMethod.title);
  for (const heading of ['What this method tests', 'What you need', 'Before you start', 'How to perform the test', 'What to observe', 'Interpreting the results', 'Limitations']) {
    await expect(page.getByRole('heading', { level: 2, name: heading })).toBeVisible();
  }
  await expect(page.getByRole('heading', { level: 2, name: 'Demonstration' })).toHaveCount(0);

  const navigation = page.getByRole('navigation', { name: 'Testing methods' });
  await expect(navigation.getByRole('link', { name: visualMethod.title })).toHaveAttribute('aria-current', 'page');

  const breadcrumb = page.getByRole('navigation', { name: 'Breadcrumbs' }).getByRole('listitem');
  await expect(breadcrumb).toHaveText(['Home/', 'Testing methods/', visualMethod.title]);
});

test('Testing zoom and reflow renders a method without a demonstration', async ({ page }) => {
  const response = await page.goto(zoomMethod.path);
  expect(response?.ok()).toBe(true);
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(zoomMethod.title);
  for (const heading of ['What this method tests', 'What you need', 'Before you start', 'How to perform the test', 'What to observe', 'Interpreting the results', 'Limitations']) {
    await expect(page.getByRole('heading', { level: 2, name: heading })).toBeVisible();
  }
  await expect(page.getByRole('heading', { level: 2, name: 'Demonstration' })).toHaveCount(0);
});

test('Testing with automated tools renders a method without a demonstration', async ({ page }) => {
  const response = await page.goto(automatedMethod.path);
  expect(response?.ok()).toBe(true);
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(automatedMethod.title);
  for (const heading of ['What this method tests', 'What you need', 'Before you start', 'How to perform the test', 'What to observe', 'Interpreting the results', 'Limitations']) {
    await expect(page.getByRole('heading', { level: 2, name: heading })).toBeVisible();
  }
  await expect(page.getByRole('heading', { level: 2, name: 'Demonstration' })).toHaveCount(0);
});

test('Testing image alternative text renders a method without a demonstration', async ({ page }) => {
  const response = await page.goto(imageAlternativeMethod.path);
  expect(response?.ok()).toBe(true);
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(imageAlternativeMethod.title);
  for (const heading of ['What this method tests', 'What you need', 'Before you start', 'How to perform the test', 'What to observe', 'Interpreting the results', 'Limitations']) {
    await expect(page.getByRole('heading', { level: 2, name: heading })).toBeVisible();
  }
  await expect(page.getByRole('heading', { level: 2, name: 'Demonstration' })).toHaveCount(0);
  await expect(page.locator('[data-content-body]').getByRole('link', { name: 'Testing icons and SVGs with a screen reader' })).toHaveAttribute('href', '/methods/screen-reader-icons-and-svg/');
});

test('legacy screen-reader example routes remain available', async ({ request }) => {
  for (const path of [
    '/examples/screen-reader/links/',
    '/examples/screen-reader/icons/',
    '/examples/screen-reader/lang/',
    '/examples/screen-reader/modals/',
  ]) {
    const response = await request.get(path);
    expect(response.ok(), path).toBe(true);
  }
});

test('legacy keyboard workshop route remains available', async ({ request }) => {
  const response = await request.get('/testing-keyboard-accessibility/');
  expect(response.ok()).toBe(true);
});

test('primary navigation does not introduce an Examples section', async ({ page }) => {
  await page.goto('/methods/');
  await expect(page.getByRole('navigation', { name: 'Main' }).getByRole('link', { name: 'Examples' })).toHaveCount(0);
});

test('language demonstration preserves inheritance and redundant markup examples', async ({ page }) => {
  await page.goto('/methods/screen-reader-language-changes/');
  const examples = page.locator('.lang-example p');

  await expect(examples).toHaveCount(2);
  await expect(examples.nth(0)).toHaveAttribute('lang', 'fr');
  await expect(examples.nth(0).getByRole('link')).not.toHaveAttribute('lang');
  await expect(examples.nth(1).getByRole('link')).toHaveAttribute('lang', 'fr');
});

test('icon demonstration exposes meaningful names and keeps a decorative icon silent', async ({ page }) => {
  await page.goto('/methods/screen-reader-icons-and-svg/');

  await expect(page.getByRole('img', { name: 'Search' })).toHaveCount(2);
  await expect(page.getByRole('button', { name: 'Continue', exact: true })).toHaveCount(1);
  await expect(page.getByRole('button', { name: /Arrow Continue/ })).toHaveCount(1);
});

test('ARIA modal contains focus, closes with Escape, and restores focus', async ({ page }) => {
  await page.goto('/methods/testing-modal-dialogs/');
  const opener = page.getByRole('button', { name: 'Open ARIA modal' });
  await opener.click();

  const dialog = page.getByRole('dialog', { name: 'ARIA modal example' });
  await expect(dialog).toBeVisible();
  await expect(dialog.locator('input')).toBeFocused();
  await expect(page.locator('main')).toHaveAttribute('inert', '');

  await page.keyboard.press('Escape');
  await expect(dialog).toBeHidden();
  await expect(opener).toBeFocused();
  await expect(page.locator('main')).not.toHaveAttribute('inert');
});

test('native dialog closes with Escape and restores focus', async ({ page }) => {
  await page.goto('/methods/testing-modal-dialogs/');
  const opener = page.getByRole('button', { name: 'Open dialog element modal' });
  await opener.click();

  const dialog = page.getByRole('dialog', { name: 'HTML dialog example' });
  await expect(dialog).toBeVisible();
  await expect(dialog.locator('input')).toBeFocused();

  await page.keyboard.press('Escape');
  await expect(dialog).toBeHidden();
  await expect(opener).toBeFocused();
});

test('modal demonstration buttons retain visible hover and keyboard focus states', async ({ page }) => {
  await page.goto('/methods/testing-modal-dialogs/');
  const button = page.getByRole('button', { name: 'Open ARIA modal' });
  const defaultBackground = await button.evaluate((element) => getComputedStyle(element).backgroundColor);

  await button.hover();
  await expect.poll(() => button.evaluate((element) => getComputedStyle(element).backgroundColor)).not.toBe(defaultBackground);

  await button.focus();
  await expect.poll(() => button.evaluate((element) => getComputedStyle(element).outlineStyle)).toBe('solid');
  await expect.poll(() => button.evaluate((element) => getComputedStyle(element).outlineWidth)).toBe('2px');
  await expect.poll(() => button.evaluate((element) => getComputedStyle(element).outlineOffset)).toBe('4px');
});

for (const method of methods) {
  test(`${method.title} has unique element IDs`, async ({ page }) => {
    await page.goto(method.path);
    const ids = await page.locator('main [id]').evaluateAll((elements) => elements.map((element) => element.id));
    expect(new Set(ids).size).toBe(ids.length);
  });
}
