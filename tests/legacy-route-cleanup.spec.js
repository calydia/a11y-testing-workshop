import { test, expect } from '@playwright/test';
import { readdir, readFile } from 'node:fs/promises';
import { legacyRedirects } from '../src/config/legacy-redirects.js';

const approvedRedirects = {
  '/testing-automated-tools/': '/methods/testing-with-automated-tools/',
  '/testing-keyboard-accessibility/': '/methods/testing-keyboard-accessibility/',
  '/testing-visuals/': '/methods/testing-visual-accessibility/',
  '/testing-zooming/': '/methods/testing-zoom-and-reflow/',
  '/testing-screen-readers/': '/learn/practical-screen-reader-testing/',
  '/examples/': '/methods/',
  '/examples/screen-reader/': '/learn/practical-screen-reader-testing/',
  '/examples/screen-reader/links/': '/methods/screen-reader-page-structure-and-links/',
  '/examples/screen-reader/icons/': '/methods/screen-reader-icons-and-svg/',
  '/examples/screen-reader/lang/': '/methods/screen-reader-language-changes/',
  '/examples/screen-reader/modals/': '/methods/testing-modal-dialogs/',
};

const removedWithoutRedirects = ['/answers/', '/aria-tests/', '/resources/'];

async function sourceFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = await Promise.all(entries.map((entry) => {
    const path = `${directory}/${entry.name}`;
    return entry.isDirectory() ? sourceFiles(path) : path;
  }));
  return files.flat().filter((path) => /\.(astro|md|ts|js|jsx)$/.test(path));
}

test('Astro config contains the complete approved legacy redirect map', () => {
  expect(legacyRedirects).toEqual(approvedRedirects);
});

test('generated redirects are noindex documents with canonical destinations and fallback links', async () => {
  for (const [source, destination] of Object.entries(approvedRedirects)) {
    const redirectDocument = await readFile(
      new URL(`../dist${source}index.html`, import.meta.url),
      'utf8',
    );

    expect(redirectDocument, source).toContain(`content="0;url=${destination}"`);
    expect(redirectDocument, source).toContain('content="noindex"');
    expect(redirectDocument, source).toContain(`href="https://testing.a11y.ing${destination}"`);
    expect(redirectDocument, source).toContain(`<a href="${destination}">`);
  }
});

test('sitemap excludes legacy routes', async () => {
  const sitemap = await readFile(new URL('../dist/sitemap-0.xml', import.meta.url), 'utf8');

  for (const path of [...Object.keys(approvedRedirects), ...removedWithoutRedirects]) {
    expect(sitemap, path).not.toContain(`<loc>https://testing.a11y.ing${path}</loc>`);
  }
});

for (const [source, destination] of Object.entries(approvedRedirects)) {
  test(`${source} redirects to ${destination}`, async ({ page }) => {
    await page.goto(source);
    await page.waitForURL(new URL(destination, 'http://127.0.0.1:4321').toString());
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('body')).not.toContainText('Accessibility testing workshop');
  });
}

for (const path of removedWithoutRedirects) {
  test(`${path} uses the normal 404 response`, async ({ request }) => {
    const response = await request.get(path);
    expect(response.status()).toBe(404);
  });
}

test('current Lab source does not link to legacy routes', async () => {
  const files = await sourceFiles(new URL('../src', import.meta.url).pathname);
  const oldPaths = [...Object.keys(approvedRedirects), ...removedWithoutRedirects];

  for (const file of files) {
    const source = await readFile(file, 'utf8');
    for (const oldPath of oldPaths) {
      expect(source, `${file} links to ${oldPath}`).not.toContain(`href="${oldPath}`);
      expect(source, `${file} links to ${oldPath}`).not.toContain(`href='${oldPath}`);
    }
  }
});
