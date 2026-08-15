# Release-readiness implementation plan

## Goal

Complete the repository-owned work needed for a reproducible Netlify release while leaving production-domain activation and production-only verification deferred.

## Task 1: Pin and document the Node.js runtime

### Files

- Create: `.nvmrc`
- Modify: `package.json`

### Work

1. Add `.nvmrc` with Node major version `24`.
2. Add `engines.node` as `>=24 <25` in `package.json`.
3. Run dependency installation under Node 24 if the lockfile records an engine-sensitive change; do not rewrite the lockfile unnecessarily.
4. Confirm Astro and the current dependencies install and build on Node 24.

## Task 2: Add Netlify configuration and protect redirect parity

### Files

- Create: `netlify.toml`
- Create: `tests/netlify-configuration.spec.js`
- Reference: `src/config/legacy-redirects.js`

### Work

1. Write failing tests that read the repository configuration and assert:
   - the build command is `npm run build`;
   - the publish directory is `dist`;
   - every Astro legacy redirect has one matching Netlify `301` rule;
   - Netlify has no extra legacy redirect rules that could drift independently;
   - the approved site-wide response headers are present.
2. Add `netlify.toml` with the approved build and publish settings.
3. Copy every legacy redirect into an explicit, ordered Netlify `301` rule, preserving trailing-slash behavior.
4. Add site-wide `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`, and `X-Frame-Options` headers.
5. Keep Astro redirects unchanged and make the parity test the guard against future drift.
6. Run the focused configuration tests.

## Task 3: Add page-specific indexing metadata

### Files

- Modify: `src/components/site/DocumentHead.astro`
- Modify: `src/layouts/BaseLayout.astro`
- Modify: `tests/site-architecture.spec.js`

### Work

1. Add tests proving a page can request `noindex` while ordinary pages remain indexable by default.
2. Add an optional `noindex?: boolean` prop to `DocumentHead` and `BaseLayout`, defaulting to `false`.
3. Emit `<meta name="robots" content="noindex" />` only when `noindex` is true.
4. Pass the value through `BaseLayout` without changing existing page calls.
5. Run the focused architecture tests.

## Task 4: Create the branded not-found page

### Files

- Create: `src/pages/404.astro`
- Modify: `tests/site-architecture.spec.js`
- Modify: `tests/axe-core.spec.js`

### Work

1. Add failing tests for `404.html`, its heading, `noindex` metadata, absence of breadcrumbs, Home link, and links to all four primary content areas.
2. Build the page with `BaseLayout`, `noindex`, and the existing content-width and typography patterns.
3. Use concise guidance explaining that the address may be incorrect or the page may have moved.
4. Use the established link and focus styling rather than introducing a new visual component.
5. Add the page to automated accessibility coverage.
6. Verify mobile and desktop layouts in both themes.

## Task 5: Add the accessibility statement

### Files

- Create: `src/pages/accessibility/index.astro`
- Modify: `src/components/site/SiteFooter.astro`
- Modify: `tests/site-architecture.spec.js`
- Modify: `tests/axe-core.spec.js`

### Work

1. Add failing tests for the `/accessibility/` route and footer link.
2. Assert the page identifies:
   - WCAG 2.2 Level AA as the aim;
   - self-assessment as the assessment method;
   - the statement review date;
   - ongoing monitoring and correction;
   - deliberately inaccessible Exercise and Testing journey workspaces as isolated learning material;
   - the anonymous Google Forms feedback link.
3. Implement the page with `BaseLayout`, breadcrumbs, and the same narrow reading width as About this Lab.
4. Add `Accessibility statement` to the footer informational navigation without adding it to primary navigation.
5. Ensure the external feedback link follows the site's established external-link treatment and does not force a new tab.
6. Add the page to automated accessibility coverage.

## Task 6: Complete favicon and manifest metadata

### Files

- Modify: `src/components/site/DocumentHead.astro`
- Modify: `public/manifest.json`
- Modify: `tests/site-architecture.spec.js`

### Work

1. Add failing assertions for the SVG favicon, PNG favicon, Apple touch icon, ICO fallback, manifest, and theme color.
2. Add explicit head declarations using existing files in `public/favicons/`.
3. Use the existing manifest theme color for the head theme-color value.
4. Remove only the `orientation` property from `manifest.json`.
5. Preserve all other manifest properties and icon entries.

## Task 7: Expand deployment documentation

### Files

- Modify: `README.md`

### Work

1. Document Node.js 24 and the local setup commands.
2. Document the repository-owned Netlify build command and publish directory.
3. Record `https://testing.a11y.ing/` as the intended production URL, not as an already completed domain migration.
4. Add a repository release checklist covering install, Astro diagnostics, build, Playwright, generated-link checks, and worktree review.
5. Add a clearly deferred production checklist covering domain attachment, DNS, TLS, primary-domain behavior, canonical/sitemap/robots output, HTTP redirects, 404 handling, response headers, and manual accessibility smoke testing.
6. Record the coordinated personal-site/blog migration and WordPress Accessibility Day promotion as external/deferred work rather than Lab release blockers.

## Task 8: Complete release-readiness verification

### Work

1. Switch to Node.js 24 and confirm `node --version` is within the supported range.
2. Run `npm install` only if needed to validate dependency installation and preserve a clean lockfile.
3. Run Astro diagnostics.
4. Run the production build and confirm these outputs exist:
   - `dist/404.html`;
   - `dist/accessibility/index.html`;
   - `dist/sitemap-index.xml`;
   - `dist/robots.txt`;
   - `dist/manifest.json`;
   - all declared favicon assets.
5. Run the focused Netlify, architecture, footer, and axe tests.
6. Run the complete Playwright suite using its default port 4321.
7. Crawl generated internal links, excluding only links deliberately broken within exercise fixtures.
8. Inspect the 404 and accessibility pages at mobile and desktop widths in light and dark themes.
9. Keyboard-test both new pages and verify the feedback link, footer link, primary navigation, theme control, skip link, and Back to top behavior.
10. Run `git diff --check`, inspect the final diff, and report any checks that remain production-only.

## Out of scope

- Connecting or activating `testing.a11y.ing` in Netlify or DNS.
- Changing TLS or primary-domain settings.
- Claiming that production checks have passed before the public domain is active.
- Promoting the WordPress Accessibility Day talk before permission is received.
- Moving the personal blog under `sanna.a11y.ing`.
- Adding a strict Content Security Policy, custom cache policy, or social-sharing artwork.
- Creating additional Learning paths, Testing methods, Exercises, or Testing journeys in this milestone.
