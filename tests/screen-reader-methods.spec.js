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

const formsValidationMethod = {
  path: '/methods/testing-forms-and-validation/',
  title: 'Testing forms and validation',
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
  formsValidationMethod,
  ...screenReaderMethods.slice(1),
];

const methodExercises = new Map([
  [keyboardMethod.path, ['Keyboard testing a preferences form', '/exercises/keyboard-testing-a-preferences-form/', '15 minutes']],
  [visualMethod.path, ['Finding visual problems in an account dashboard', '/exercises/finding-visual-problems-in-an-account-dashboard/', '15 minutes']],
  [zoomMethod.path, ['Testing an appointment booking at high zoom', '/exercises/testing-an-appointment-booking-at-high-zoom/', '20 minutes']],
  [automatedMethod.path, ['Comparing automated and manual findings', '/exercises/comparing-automated-and-manual-findings/', '20 minutes']],
  [screenReaderMethods[0].path, ['Reviewing structure and links in a community resources directory', '/exercises/reviewing-structure-and-links-in-a-community-resources-directory/', '20 minutes']],
  [imageAlternativeMethod.path, ['Evaluating image alternative text in context', '/exercises/evaluating-image-alternative-text-in-context/', '20 minutes']],
  [formsValidationMethod.path, ['Testing a community-course registration form', '/exercises/testing-a-community-course-registration-form/', '25 minutes']],
  [screenReaderMethods[1].path, ['Reviewing icons and SVGs in a community events dashboard', '/exercises/reviewing-icons-and-svgs-in-a-community-events-dashboard/', '20 minutes']],
  [screenReaderMethods[2].path, ['Testing language changes on a community library noticeboard', '/exercises/testing-language-changes-on-a-community-library-noticeboard/', '20 minutes']],
  [screenReaderMethods[3].path, ['Testing modal dialogs in account settings', '/exercises/testing-modal-dialogs-in-account-settings/', '25 minutes']],
]);

test('method detail pages provide collection-driven section navigation', async ({ page }) => {
  await page.goto(methods[1].path);

  const navigation = page.getByRole('navigation', { name: 'Testing methods' });
  await expect(navigation).toHaveCount(1);
  await expect(navigation.getByRole('heading', { name: 'Testing methods' })).toBeVisible();

  const links = navigation.getByRole('link');
  await expect(links).toHaveCount(methods.length + 1);
  await expect(links).toHaveText(['All Testing methods', ...methods.map((method) => method.title)]);
  await expect(links.first()).toHaveAttribute('href', '/methods/');

  for (const [index, method] of methods.entries()) {
    await expect(links.nth(index + 1)).toHaveAttribute('href', method.path);
  }

  await expect(navigation.getByRole('link', { name: methods[1].title })).toHaveAttribute('aria-current', 'page');
  await expect(navigation.getByRole('link', { name: 'All Testing methods' })).not.toHaveAttribute('aria-current');
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

  for (const width of [1024, 1100, 1168, 1200]) {
    await page.setViewportSize({ width, height: 900 });
    const intermediateArticle = page.locator('[data-content-heading]');
    const intermediateNavigation = page.locator('[data-section-navigation-container]');
    const [intermediateArticleBox, intermediateNavigationBox] = await Promise.all([
      intermediateArticle.boundingBox(),
      intermediateNavigation.boundingBox(),
    ]);
    const leftMargin = intermediateArticleBox.x;
    const rightMargin = width - (intermediateNavigationBox.x + intermediateNavigationBox.width);

    expect(leftMargin).toBeGreaterThanOrEqual(16);
    expect(rightMargin).toBeGreaterThanOrEqual(16);
    expect(Math.abs(leftMargin - rightMargin)).toBeLessThanOrEqual(2);
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width);
  }

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

for (const method of methods) {
  test(`${method.title} renders its shared related Exercise`, async ({ page }) => {
    const [exerciseTitle, exerciseHref, estimatedTime] = methodExercises.get(method.path);
    await page.goto(method.path);
    const practice = page.locator('[data-related-exercises]');
    await expect(practice).toHaveCount(1);
    await expect(practice.getByRole('heading', { level: 2, name: 'Practise this method' })).toHaveCount(1);
    await expect(practice.getByRole('listitem')).toHaveCount(1);
    await expect(practice.getByRole('link', { name: exerciseTitle })).toHaveAttribute('href', exerciseHref);
    await expect(practice.locator('[data-related-exercise-summary]')).not.toBeEmpty();
    await expect(practice.locator('[data-related-exercise-time]')).toContainText(estimatedTime);
    await practice.getByRole('link', { name: exerciseTitle }).focus();
    await expect(practice.getByRole('link', { name: exerciseTitle })).toHaveCSS('outline-style', 'solid');
  });
}

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

test('page structure and links method points to its focused Exercise', async ({ page }) => {
  await page.goto(screenReaderMethods[0].path);
  await expect(page.getByRole('link', { name: 'Reviewing structure and links in a community resources directory' })).toHaveAttribute(
    'href',
    '/exercises/reviewing-structure-and-links-in-a-community-resources-directory/',
  );
});

test('page structure and links method explicitly teaches title and landmark checks', async ({ page }) => {
  await page.goto(screenReaderMethods[0].path);
  const content = page.locator('[data-content-body]');
  await expect(content).toContainText('document title usefully identifies the page');
  await expect(content).toContainText('find the main content using landmark navigation');
  await expect(content).toContainText('useful, restrained set of landmarks');
  await expect(content).toContainText('passing evidence');
});

test('icons and SVGs method points to its focused Exercise', async ({ page }) => {
  await page.goto(screenReaderMethods[1].path);
  await expect(page.getByRole('link', { name: 'Reviewing icons and SVGs in a community events dashboard' })).toHaveAttribute(
    'href',
    '/exercises/reviewing-icons-and-svgs-in-a-community-events-dashboard/',
  );
});

test('language changes method points to its focused Exercise', async ({ page }) => {
  await page.goto(screenReaderMethods[2].path);
  await expect(page.getByRole('link', { name: 'Testing language changes on a community library noticeboard' })).toHaveAttribute(
    'href',
    '/exercises/testing-language-changes-on-a-community-library-noticeboard/',
  );
});

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

test('Testing forms and validation renders a method without a demonstration', async ({ page }) => {
  const response = await page.goto(formsValidationMethod.path);
  expect(response?.ok()).toBe(true);
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(formsValidationMethod.title);
  for (const heading of ['What this method tests', 'What you need', 'Before you start', 'How to perform the test', 'What to observe', 'Interpreting the results', 'Limitations']) {
    await expect(page.getByRole('heading', { level: 2, name: heading })).toBeVisible();
  }
  await expect(page.getByRole('heading', { level: 2, name: 'Demonstration' })).toHaveCount(0);
  await expect(page.locator('[data-content-body]').getByRole('link', { name: 'Testing keyboard accessibility' })).toHaveAttribute('href', '/methods/testing-keyboard-accessibility/');
  await expect(page.locator('[data-content-body]').getByRole('link', { name: 'Testing with automated tools' })).toHaveAttribute('href', '/methods/testing-with-automated-tools/');
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

test('modal dialog method links to its independent Exercise', async ({ page }) => {
  await page.goto('/methods/testing-modal-dialogs/');
  await expect(page.getByRole('link', { name: 'Testing modal dialogs in account settings' })).toHaveAttribute(
    'href',
    '/exercises/testing-modal-dialogs-in-account-settings/',
  );
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
