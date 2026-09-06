import { test, expect } from '@playwright/test';
import { readFileSync } from 'node:fs';
import { legacyRedirects } from '../src/config/legacy-redirects.js';

const config = readFileSync(new URL('../netlify.toml', import.meta.url), 'utf8');

function redirectBlocks(source) {
  return [...source.matchAll(/\[\[redirects\]\]([\s\S]*?)(?=\n\[\[|$)/g)].map(([, block]) => ({
    from: block.match(/^\s*from\s*=\s*"([^"]+)"/m)?.[1],
    to: block.match(/^\s*to\s*=\s*"([^"]+)"/m)?.[1],
    status: Number(block.match(/^\s*status\s*=\s*(\d+)/m)?.[1]),
    force: block.match(/^\s*force\s*=\s*(true|false)/m)?.[1] === 'true',
  }));
}

const expectedHostRedirects = [
  {
    from: 'https://a11y-workshop.sanna.ninja/*',
    to: 'https://testing.a11y.ing/',
    status: 301,
    force: true,
  },
  {
    from: 'http://a11y-workshop.sanna.ninja/*',
    to: 'https://testing.a11y.ing/',
    status: 301,
    force: true,
  },
];

test('Netlify uses the repository build contract', () => {
  expect(config).toMatch(/\[build\][\s\S]*command\s*=\s*"npm run build"/);
  expect(config).toMatch(/\[build\][\s\S]*publish\s*=\s*"dist"/);
});

test('Netlify redirects both old-domain schemes to the canonical site', () => {
  const redirects = redirectBlocks(config);
  const hostRedirects = redirects.filter(({ from }) => from?.startsWith('http'));

  expect(hostRedirects).toEqual(expectedHostRedirects);
  expect(redirects).toHaveLength(expectedHostRedirects.length + Object.keys(legacyRedirects).length);
});

test('Netlify path redirects match Astro legacy redirects exactly', () => {
  const redirects = redirectBlocks(config);
  const pathRedirects = redirects.filter(({ from }) => from?.startsWith('/'));
  const expected = Object.entries(legacyRedirects).map(([from, to]) => ({
    from,
    to,
    status: 301,
    force: true,
  }));

  expect(pathRedirects).toEqual(expected);
});

test('Netlify sends the approved baseline security headers', () => {
  expect(config).toContain('for = "/*"');
  expect(config).toContain('X-Content-Type-Options = "nosniff"');
  expect(config).toContain('Referrer-Policy = "strict-origin-when-cross-origin"');
  expect(config).toContain('Permissions-Policy = "camera=(), microphone=(), geolocation=()"');
  expect(config).toContain('X-Frame-Options = "DENY"');
});
