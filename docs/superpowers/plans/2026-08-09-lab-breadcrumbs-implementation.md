# Accessibility Testing Lab breadcrumbs implementation plan

## Goal

Add accessible, blog-inspired breadcrumbs to the new Lab section landing, collection detail, and About routes. Keep hierarchy labels explicit, render the component consistently through the shared shell, and leave Home and all legacy routes unchanged.

## Task 1: Add failing breadcrumb behavior tests

### Files

- Add: `tests/breadcrumbs.spec.js`

### Work

1. Assert `/` has no navigation landmark named `Breadcrumbs`.
2. Assert each new section landing page and `/about/` has the approved two-level trail.
3. Assert a Testing method detail page has `Home / Testing methods / Current title` in order.
4. Assert ancestor items are links with the correct URLs.
5. Assert the final item is plain text, not a link, and its list item has `aria-current="page"`.
6. Assert exactly one current item exists in each breadcrumb.
7. Assert the breadcrumb appears before the page `h1` in document order.
8. Assert representative retained legacy routes have no breadcrumb.
9. Run the focused tests and confirm they fail because the component has not been implemented.

### Verification

```sh
npx playwright test tests/breadcrumbs.spec.js --workers 1
```

## Task 2: Build the presentational Breadcrumbs component

### Files

- Add: `src/components/navigation/Breadcrumbs.astro`
- Modify: `tests/breadcrumbs.spec.js`

### Work

1. Define and export a shallow `BreadcrumbItem` type with `label` and optional `href`.
2. Accept an ordered `items` array without importing route or content APIs.
3. Render a `nav` named `Breadcrumbs` containing a semantic list.
4. Render items with an `href` as links and the final item as plain text.
5. Put `aria-current="page"` on the final list item only.
6. Render slash separators between items and hide them from assistive technology.
7. Guard the authoring contract so an empty list renders nothing and intermediate non-link items are not silently treated as ancestors.

### Verification

```sh
npm run astro -- check
npx playwright test tests/breadcrumbs.spec.js --grep "detail|current|ancestor" --workers 1
```

## Task 3: Add the optional shared-shell breadcrumb slot and styling

### Files

- Modify: `src/layouts/BaseLayout.astro`
- Modify: `src/components/navigation/Breadcrumbs.astro`
- Modify: `tests/breadcrumbs.spec.js`

### Work

1. Add an optional `breadcrumb` slot as the first content inside `<main>`.
2. Preserve identical markup and spacing for pages that do not supply the slot.
3. Style the breadcrumb to match the approved blog pattern using Lab tokens:
   - base-size muted text;
   - inline wrapping trail;
   - underlined Lab-colored links;
   - compact slash spacing;
   - responsive horizontal padding;
   - modest spacing before page content.
4. Align the breadcrumb to the shared Lab main-content width rather than to one collection's article column.
5. Preserve existing global hover, focus, and dark-theme link behavior.
6. Ensure long labels wrap and do not cause horizontal scrolling.

### Verification

```sh
npm run astro -- check
npx playwright test tests/breadcrumbs.spec.js --grep "placement|focus|overflow" --workers 1
```

## Task 4: Wire section landing and About routes

### Files

- Modify: `src/pages/learn/index.astro`
- Modify: `src/pages/methods/index.astro`
- Modify: `src/pages/exercises/index.astro`
- Modify: `src/pages/journeys/index.astro`
- Modify: `src/pages/about/index.astro`

### Work

1. Import the shared Breadcrumbs component into each page.
2. Supply it through `BaseLayout`'s `breadcrumb` slot.
3. Use the approved labels and routes:
   - `Home / Learning paths`
   - `Home / Testing methods`
   - `Home / Exercises`
   - `Home / Testing journeys`
   - `Home / About this Lab`
4. Keep page headings, metadata, listings, empty states, and route behavior unchanged.

### Verification

```sh
npm run astro -- check
npx playwright test tests/breadcrumbs.spec.js --grep "landing|About" --workers 1
```

## Task 5: Forward breadcrumbs through collection detail layouts

### Files

- Modify: `src/layouts/ContentLayout.astro`
- Modify: `src/layouts/LearningPathLayout.astro`
- Modify: `src/layouts/MethodLayout.astro`
- Modify: `src/layouts/ExerciseLayout.astro`
- Modify: `src/layouts/JourneyLayout.astro`

### Work

1. Forward a named `breadcrumb` slot from each collection-specific layout into `ContentLayout`.
2. Forward that slot from `ContentLayout` into `BaseLayout`.
3. Keep breadcrumb positioning owned by `BaseLayout`; do not insert it into article prose or the section-navigation grid.
4. Preserve layouts without breadcrumb content and retain the recently approved desktop section-navigation geometry.

### Verification

```sh
npm run astro -- check
npm run build
```

## Task 6: Wire all four dynamic collection routes

### Files

- Modify: `src/pages/learn/[...id].astro`
- Modify: `src/pages/methods/[...id].astro`
- Modify: `src/pages/exercises/[...id].astro`
- Modify: `src/pages/journeys/[...id].astro`
- Modify: `tests/content-architecture.spec.js`

### Work

1. Render Breadcrumbs into each collection layout's `breadcrumb` slot.
2. Use the current entry's authored `title` for the final item.
3. Use the explicit section landing label and URL for the middle item.
4. Keep the breadcrumb data independent of the section-navigation items.
5. Preserve static path generation, visibility filtering, and collection content props.
6. Extend shared-contract coverage to confirm all four detail route templates supply breadcrumbs even while three collections are empty.

### Verification

```sh
npm run astro -- check
npm run build
npx playwright test tests/breadcrumbs.spec.js tests/content-architecture.spec.js --workers 1
```

## Task 7: Verify responsive and accessibility behavior

### Files

- Modify: `tests/breadcrumbs.spec.js`
- Modify: `tests/axe-core.spec.js`

### Work

1. Confirm every ancestor link shows a visible keyboard-focus outline.
2. Confirm a long method title wraps at a narrow viewport without page-level horizontal overflow.
3. Confirm slash separators are `aria-hidden="true"` and absent from the accessible trail names.
4. Confirm breadcrumb colors remain legible in light and dark themes using the existing axe scans.
5. Include breadcrumbs in the existing scans without excluding their landmark or links.
6. Confirm the breadcrumb does not alter primary navigation or section-navigation current states.

### Verification

```sh
npx playwright test tests/breadcrumbs.spec.js tests/axe-core.spec.js --workers 1
```

## Task 8: Final verification and review

### Work

1. Run Astro type and content validation.
2. Build the production site.
3. Run the complete Playwright suite.
4. Confirm Home and legacy routes have no breadcrumb.
5. Confirm every in-scope route uses one shared breadcrumb component and no labels are inferred from URL slugs.
6. Review the diff for accidental content changes, duplicate landmarks, redundant current-page links, or section-navigation regressions.

### Verification

```sh
npm run astro -- check
npm run build
npx playwright test --workers 1
rg -n "Breadcrumbs|slot=\"breadcrumb\"" src
git diff --check
git status --short
```

## Completion criteria

- All new Lab routes except Home display the approved breadcrumb hierarchy.
- Home and retained legacy routes display no breadcrumb.
- Ancestors are links; the final item is plain text with exactly one `aria-current="page"`.
- The breadcrumb visually follows the referenced blog pattern using Lab tokens.
- The trail appears below the site header and before the page heading.
- Long titles wrap without horizontal overflow and links retain visible focus states.
- Breadcrumbs remain independent of primary and section navigation.
- Astro validation, production build, axe checks, and the complete Playwright suite pass.
