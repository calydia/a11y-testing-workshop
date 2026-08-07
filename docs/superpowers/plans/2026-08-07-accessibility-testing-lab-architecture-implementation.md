# Accessibility Testing Lab architecture implementation plan

## Goal

Establish the approved Accessibility Testing Lab shell, routes, and empty content-collection architecture without migrating, rewriting, or deleting existing workshop content.

## Constraints

- Keep all existing workshop pages and content files during this phase.
- Do not add a Workshops route, collection, navigation item, or compatibility layer.
- Do not create placeholder learning content.
- Primary navigation contains only Learning paths, Testing methods, Exercises, and Testing journeys.
- The site brand links to Home; About this Lab appears in the footer.
- Use `https://testing.a11y.ing/` as the canonical site origin.
- Preserve accessible keyboard and screen-reader behavior throughout the shared shell.

## Task 1: Add route and navigation regression tests

### Files

- Modify: `tests/smoketest.spec.js`
- Modify: `tests/axe-core.spec.js`
- Add: `tests/site-architecture.spec.js`

### Work

1. Update the homepage title expectation to Accessibility Testing Lab.
2. Add tests that request `/`, `/learn/`, `/methods/`, `/exercises/`, `/journeys/`, and `/about/` and require successful responses and one visible `h1` per page.
3. Assert the exact primary-navigation labels, order, and destinations.
4. Assert that Home is absent from primary navigation, the brand points to `/`, and About this Lab is present in footer navigation but absent from primary navigation.
5. Assert exact-page `aria-current="page"` behavior on each available section route. Parent-section highlighting on future detail pages remains covered by the navigation helper's unit-level logic until real entries exist.
6. Retain the homepage axe scan and add scans for the five new landing pages.

### Verification

Run the targeted tests before implementation and confirm they fail for the missing routes and old navigation:

```sh
npx playwright test tests/smoketest.spec.js tests/site-architecture.spec.js tests/axe-core.spec.js
```

## Task 2: Update canonical project metadata

### Files

- Modify: `astro.config.mjs`
- Modify: `package.json`
- Modify: `package-lock.json`
- Modify: `README.md`
- Modify: `public/manifest.json`

### Work

1. Change Astro's `site` to `https://testing.a11y.ing/`.
2. Remove the unimplemented sitemap locale mapping while retaining sitemap generation.
3. Rename the package from its workshop name to an Accessibility Testing Lab-compatible package name and synchronize the lockfile root metadata.
4. Rewrite the README's project identification only; retain useful command documentation.
5. Update manifest name, short name, and related public metadata to Accessibility Testing Lab.

### Verification

```sh
npm run astro -- check
npm run build
```

## Task 3: Separate shared shell concerns

### Files

- Add: `src/components/site/DocumentHead.astro`
- Add: `src/components/site/SiteHeader.astro`
- Add: `src/components/site/BrandLink.astro`
- Add: `src/components/site/SiteFooter.astro`
- Add: `src/components/navigation/MainNavigation.astro`
- Move or adapt: `src/components/SkipLink.astro`
- Move or adapt: `src/components/ThemeToggle.astro`
- Add: `src/layouts/BaseLayout.astro`
- Modify: `src/layouts/Layout.astro`

### Work

1. Extract document metadata into `DocumentHead`, including canonical URL and Accessibility Testing Lab Open Graph and structured metadata.
2. Extract the linked logo/title and tagline into `BrandLink`; ensure the link has a clear accessible name.
3. Build `SiteHeader` from the skip link, brand, theme control, and primary navigation.
4. Replace hard-coded workshop navigation with the four approved section links.
5. Derive current-path behavior from `Astro.url.pathname`. Use `aria-current="page"` only for exact matches; use a CSS class or data attribute for visual parent-section highlighting.
6. Build `SiteFooter` with About this Lab and the existing related-site links in separately labelled navigation regions.
7. Make `BaseLayout` own `id="main-content"` on the main landmark and point the skip link at it.
8. Keep the existing `Layout.astro` as a temporary compatibility wrapper for old workshop pages. It should delegate to `BaseLayout` so old content remains available without controlling the new architecture.
9. Correct the theme-toggle text typo and guard its client-side element lookup.
10. Preserve the existing visual design initially; do not perform unrelated visual redesign.

### Verification

```sh
npm run astro -- check
npx playwright test tests/site-architecture.spec.js tests/axe-core.spec.js
```

Manually verify keyboard operation at mobile and desktop widths: skip link, menu toggle, Escape behavior, theme toggle, brand link, footer link, and back-to-top control.

## Task 4: Isolate global styles from workshop fixture styles

### Files

- Add: `src/styles/global.css`
- Add: `src/styles/workshop-compatibility.css`
- Modify: `src/layouts/BaseLayout.astro`
- Modify: `src/layouts/Layout.astro`

### Work

1. Move shared tokens, typography, link, focus, navigation, button, theme, and layout styles from the old layout into `global.css`.
2. Move `.color-contrast`, `.bad-practice`, CSS-content examples, form-demo rules, demo-menu rules, and other intentional workshop styles into `workshop-compatibility.css`.
3. Load only global styles from `BaseLayout`.
4. Load compatibility styles through the legacy `Layout.astro` wrapper so new routes cannot inherit intentional accessibility defects accidentally.
5. Remove the unused `blogs` slot from the new base layout while leaving legacy behavior intact if an old page still depends on it.

### Verification

```sh
npm run astro -- check
npm run build
npx playwright test tests/site-architecture.spec.js tests/axe-core.spec.js
```

Check representative old pages to ensure the compatibility wrapper has not made existing demonstrations unusable.

## Task 5: Create the six landing pages

### Files

- Modify: `src/pages/index.astro`
- Add: `src/pages/learn/index.astro`
- Add: `src/pages/methods/index.astro`
- Add: `src/pages/exercises/index.astro`
- Add: `src/pages/journeys/index.astro`
- Add: `src/pages/about/index.astro`
- Add: `src/components/content/SectionIntroduction.astro`
- Add: `src/components/content/EmptyCollectionState.astro`

### Work

1. Replace the workshop homepage with a concise Lab introduction and links to the four content areas.
2. Give each section landing page a unique title, metadata description, and short explanation matching the approved distinction between learning, reference, practice, and application.
3. Use a truthful empty state where a collection has no published entries. Do not invent example articles.
4. Add the About this Lab page with project-purpose and scope copy only.
5. Render all pages through `BaseLayout` and the shared content-width primitives.

### Verification

```sh
npm run astro -- check
npx playwright test tests/smoketest.spec.js tests/site-architecture.spec.js tests/axe-core.spec.js
```

## Task 6: Define the four content collections

### Files

- Add: `src/content.config.ts`
- Add: `src/content/learning-paths/.gitkeep`
- Add: `src/content/testing-methods/.gitkeep`
- Add: `src/content/exercises/.gitkeep`
- Add: `src/content/testing-journeys/.gitkeep`
- Add: `src/lib/content.ts`
- Add: `tests/content-architecture.spec.js`

### Work

1. Implement the four approved collection schemas with shared schema fields and Astro collection references.
2. Use Astro's current content-layer loaders for the installed Astro version.
3. Add typed helpers to retrieve published entries, sort by `order` then title, and construct canonical section URLs.
4. Ensure drafts are excluded in production but remain available for local author preview when directly supported by a route.
5. Keep all four content directories empty; `.gitkeep` files establish structure without creating content entries.
6. Add a build-level test or check that imports all four collections and proves the empty state is valid.

### Verification

```sh
npm run astro -- check
npm run build
npx playwright test tests/content-architecture.spec.js
```

## Task 7: Add reusable collection presentation components

### Files

- Add: `src/components/content/ContentCard.astro`
- Add: `src/components/content/ContentListing.astro`
- Add: `src/components/content/ContentMeta.astro`
- Add: `src/components/content/RelatedContent.astro`
- Add: `src/layouts/ContentLayout.astro`
- Add: `src/layouts/LearningPathLayout.astro`
- Add: `src/layouts/MethodLayout.astro`
- Add: `src/layouts/JourneyLayout.astro`

### Work

1. Define a small card view model containing URL, title, summary, content type, and relevant display metadata.
2. Keep collection lookup and reference resolution outside presentation components.
3. Make listings render a semantic list and a suitable empty state.
4. Make related-content components render shallow cards only; never recursively expand references.
5. Add content-specific layouts for metadata and body structure without assuming actual entries exist.
6. Connect the four landing pages to their corresponding empty collection listings.

### Verification

```sh
npm run astro -- check
npm run build
npx playwright test tests/content-architecture.spec.js tests/axe-core.spec.js
```

## Task 8: Add dynamic detail-route templates

### Files

- Add: `src/pages/learn/[...id].astro`
- Add: `src/pages/methods/[...id].astro`
- Add: `src/pages/exercises/[...id].astro`
- Add: `src/pages/journeys/[...id].astro`

### Work

1. Add `getStaticPaths()` implementations for each collection using the shared published-entry helper.
2. Preserve nested collection IDs when producing route parameters.
3. Render each entry through its collection-specific layout.
4. Resolve only references required for the current page.
5. Confirm empty collections produce no detail pages and do not fail the build.
6. Ensure unknown detail URLs return Astro's normal 404 response.

### Verification

```sh
npm run astro -- check
npm run build
npx playwright test tests/content-architecture.spec.js
```

## Task 9: Establish the exercise fixture boundary

### Files

- Add: `src/layouts/ExerciseLayout.astro`
- Add: `src/components/exercise/ExerciseMeta.astro`
- Add: `src/components/exercise/ExerciseObjectives.astro`
- Add: `src/components/exercise/ExerciseInstructions.astro`
- Add: `src/components/exercise/ExerciseWorkspace.astro`
- Add: `src/components/exercise/ExerciseFixture.astro`
- Add: `src/components/exercise/ExerciseHints.astro`
- Add: `src/components/exercise/ExerciseSolution.astro`
- Add: `src/components/exercise/RelatedMethods.astro`
- Add: `src/exercises/fixture-registry.ts`
- Add: `src/pages/exercise-fixtures/[...id].astro`
- Add: `tests/exercise-architecture.spec.js`

### Work

1. Implement the approved exercise page composition with semantic sections and headings.
2. Define a typed fixture registry that maps stable fixture keys to inline components or document-level fixture descriptors.
3. Produce a visible development/build error for unknown fixture keys.
4. Use inline workspaces for component-level exercises and iframe-backed routes for document-level exercises.
5. Give iframe fixtures a descriptive title and preserve a clear boundary between Lab interface and intentionally flawed content.
6. Make hints and solutions keyboard-operable using native disclosure elements where possible.
7. Define fixture metadata for intentional violations so later content work can make axe expectations explicit.
8. Do not add any actual exercise fixtures during this phase.

### Verification

```sh
npm run astro -- check
npm run build
npx playwright test tests/exercise-architecture.spec.js tests/axe-core.spec.js
```

## Task 10: Final architecture verification

### Work

1. Run formatting or linting tools already configured by the repository; do not introduce a formatter solely for this work.
2. Run Astro type/content validation.
3. Build the production site and inspect generated routes and sitemap output.
4. Run the complete Playwright suite.
5. Review the final diff to confirm no workshop content was deleted or migrated and no Workshops concept was introduced.
6. Check for stale canonical workshop URLs in the new shell and configuration. Old content may still contain historical wording until its separately reviewed migration phase.

### Verification

```sh
npm run astro -- check
npm run build
npm test
rg -n "a11y-workshop|Workshops|/workshops/" src astro.config.mjs public package.json README.md
git diff --check
git status --short
```

## Completion criteria

- All six requested routes render with the new shared shell.
- Primary and footer navigation match the approved information architecture.
- Canonical project metadata points to `testing.a11y.ing`.
- Four empty, validated content collections and their detail-route templates exist.
- Reusable content and exercise architecture exists without migrated or placeholder entries.
- Intentional exercise defects are structurally isolated from the Lab interface.
- Existing workshop content remains present and accessible through its legacy routes during this phase.
- Astro checks, production build, and the complete Playwright suite pass.
