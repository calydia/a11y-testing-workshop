# Legacy content cleanup implementation plan

## Goal

Remove the remaining accessibility-workshop pages, code, assets, and React dependency while preserving useful saved URLs through the 11 approved Astro redirects. Keep the renewed Accessibility Testing Lab hierarchy and its supporting workspaces unchanged.

## Task 1: Pin the legacy routing contract

### Files

- Create: `tests/legacy-route-cleanup.spec.js`
- Modify: `tests/screen-reader-methods.spec.js`
- Modify: `tests/breadcrumbs.spec.js`

### Work

1. Add one explicit source-to-destination table covering all 11 approved redirects.
2. Test the redirect configuration as a complete contract so a missing, extra, or mistyped mapping fails clearly.
3. In the production-build test environment, verify each old entry point resolves to its exact renewed destination and does not expose the old workshop document.
4. Verify `/answers/`, `/aria-tests/`, and `/resources/` return the normal 404 response.
5. Replace the two `screen-reader-methods` tests that currently require legacy pages to render.
6. Update the Home/breadcrumb test so it no longer treats a legacy route as a retained content page; keep the assertion that Home has no breadcrumb.
7. Add a source/rendered-link scan asserting that current Lab navigation and content do not link to any old URL.

The tests must account for this static Astro build producing HTML/meta-refresh redirects rather than assuming an HTTP 301 response from the preview server.

## Task 2: Configure redirects and remove legacy page sources

### Files

- Modify: `astro.config.mjs`
- Delete: `src/pages/answers.astro`
- Delete: `src/pages/aria-tests.astro`
- Delete: `src/pages/resources.astro`
- Delete: `src/pages/testing-automated-tools.astro`
- Delete: `src/pages/testing-keyboard-accessibility.astro`
- Delete: `src/pages/testing-screen-readers.astro`
- Delete: `src/pages/testing-visuals.astro`
- Delete: `src/pages/testing-zooming.astro`
- Delete: `src/pages/examples/index.astro`
- Delete: `src/pages/examples/screen-reader/index.astro`
- Delete: `src/pages/examples/screen-reader/links.astro`
- Delete: `src/pages/examples/screen-reader/icons.astro`
- Delete: `src/pages/examples/screen-reader/lang.astro`
- Delete: `src/pages/examples/screen-reader/modals.astro`

### Work

1. Add the approved redirects to `defineConfig` without changing the canonical `site` URL or current integrations yet.
2. Delete every old page source after the redirect tests are in place; physical pages must not shadow redirect output.
3. Leave the three unmatched routes unconfigured so Astro's normal 404 behavior applies.
4. Build and inspect `dist` to confirm all 11 redirect artifacts exist and the unmatched pages do not.
5. Confirm redirects do not appear as primary pages in navigation, breadcrumbs, or sitemap content inventories.

## Task 3: Move Home off the workshop compatibility layout

### Files

- Modify: `src/pages/index.astro`
- Delete: `src/layouts/Layout.astro`
- Delete: `src/components/site/WorkshopCompatibilityStyles.astro`

### Work

1. Replace Home's `Layout` import and wrapper with `BaseLayout` using the same title and meta description.
2. Preserve Home content, links, semantic structure, width, spacing, theme behavior, skip link, header, and footer.
3. Compare the rendered Home before and after the migration at representative desktop and mobile viewports in both themes.
4. Delete the compatibility wrapper and workshop-only styles once no source imports them.
5. Run the Home metadata, navigation, axe, and responsive checks before continuing.

## Task 4: Delete workshop-only components

### Files

- Delete: `src/components/ScreenReaderExamplesNav.astro`
- Delete: `src/components/FormWithErrors.astro`
- Delete: `src/components/CardOk.astro`
- Delete: `src/components/CardNotOk.astro`
- Delete: `src/components/MenuComponent.jsx`
- Delete: `src/components/MenuComponentFixed.jsx`

### Work

1. Run a reference scan after page removal and confirm each component has no remaining importer.
2. Delete the components rather than migrating their workshop demonstrations into current pages.
3. Confirm current modal, forms, page-structure, icon/SVG, and language-change demonstrations still render through their renewed implementations.
4. Confirm no `.jsx` source remains and no current Lab interaction depended on the deleted React components.

## Task 5: Delete newly orphaned image assets

### Files

- Delete: `src/images/cat.jpg`
- Delete: `src/images/firefox-zoom.png`
- Delete: `src/images/logo-example.png`
- Delete: `src/images/water2.jpg`

### Work

1. Confirm each proposed deletion is unreferenced after Tasks 2–4.
2. Delete only the four approved orphaned images.
3. Explicitly verify that `src/images/water.jpg`, `src/images/man-working.jpg`, the conference SVG, favicons, theme icons, and footer scripts remain referenced or intentionally retained.
4. Inspect build output to ensure obsolete image assets are no longer bundled.

## Task 6: Remove the unused React integration

### Files

- Modify: `astro.config.mjs`
- Modify: `package.json`
- Modify: `package-lock.json`

### Work

1. Remove the `@astrojs/react` import and `react()` integration after the JSX components are gone.
2. Remove `@astrojs/react`, `react`, `react-dom`, `@types/react`, and `@types/react-dom` using npm so the manifest and lockfile stay synchronized.
3. Do not add a replacement client framework.
4. Search source, configuration, and dependency files for remaining React or JSX references.
5. Run Astro diagnostics and a production build to catch integration or lockfile regressions.

## Task 7: Validate the renewed information architecture

### Files

- Modify only existing architecture tests where their expected inventory still names deleted routes.

### Work

1. Verify the published hierarchy remains Home, Learning paths, Testing methods, Exercises, Testing journeys, and footer-linked About this Lab.
2. Verify all current collection detail routes, exercise fixtures, and journey workspaces still build.
3. Verify primary and section navigation, breadcrumbs, relationship links, and footer behavior on current routes.
4. Verify the generated sitemap exposes current canonical content and does not expose `/answers/`, `/aria-tests/`, or `/resources/` as content pages.
5. Search all current source and content for links to the legacy route set.
6. Search the repository for references to every deleted component, layout, asset, and React package.

## Task 8: Full verification and review

1. Run the focused legacy routing and Home migration tests.
2. Run affected method, Exercise, Learning-path, journey, breadcrumb, navigation, and architecture tests.
3. Run Astro diagnostics and `npm run build`.
4. Run the complete Playwright suite on its default port 4321.
5. Run axe checks and representative responsive/light/dark visual checks on Home and one page from each primary content area.
6. Inspect generated redirect HTML for correct destination URLs and usable fallback links.
7. Inspect the production output for removed unmatched pages and orphaned assets.
8. Run `git diff --check`, review the complete diff, and confirm that only the approved legacy surface was removed.

## Out of scope

- New curriculum content or a new Resources section.
- Rewriting renewed content from workshop pages.
- Redirecting `/answers/`, `/aria-tests/`, or `/resources/` to approximate destinations.
- Changing current content URLs, navigation labels, or the four-area information architecture.
- Removing exercise fixtures or Testing journey workspaces.
- Selecting a production host, installing an adapter, or configuring host-level permanent redirects.
- Refactoring unrelated current components, styles, content schemas, or tests.
