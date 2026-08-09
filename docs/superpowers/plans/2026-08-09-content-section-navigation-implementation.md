# Content section navigation implementation plan

## Goal

Add one reusable, collection-driven section navigation to detail pages for Learning paths, Testing methods, Exercises, and Testing journeys. Show it inline before the body on smaller viewports and as a sticky right-hand sidebar on larger viewports, without duplicating markup or manually maintaining entry lists.

## Task 1: Add failing behavior tests for Testing methods navigation

### Files

- Modify: `tests/screen-reader-methods.spec.js`

### Work

1. Add a shared list of the four expected method links in collection order.
2. Assert a method detail page has a `navigation` landmark named `Testing methods` with a visible heading.
3. Assert the navigation contains `/methods/` labelled `All testing methods` followed by all four method links in order.
4. Assert only the exact current method link has `aria-current="page"`.
5. Assert the landing link and sibling method links do not have `aria-current`.
6. Assert only one section-navigation landmark exists on the page.
7. Run the focused tests and confirm they fail because the shared navigation has not been implemented.

### Verification

```sh
npx playwright test tests/screen-reader-methods.spec.js --grep "section navigation" --workers 1
```

## Task 2: Add a shallow collection-navigation helper

### Files

- Modify: `src/lib/content.ts`
- Modify: `tests/screen-reader-methods.spec.js`

### Work

1. Export a `SectionNavigationItem` type containing only `href` and `label`.
2. Add a helper that accepts a collection key and route section, calls the existing `getVisibleEntries`, and maps the sorted result to shallow navigation items.
3. Reuse `contentUrl` to construct canonical trailing-slash URLs.
4. Preserve the existing visibility rule and `order`, then title sorting in one place rather than recreating it in route templates.
5. Cover URL construction and ordering through the rendered method-navigation assertions, keeping the project on its existing Playwright test runner.

### Verification

```sh
npm run astro -- check
npm run build
```

## Task 3: Build the presentational SectionNavigation component

### Files

- Add: `src/components/navigation/SectionNavigation.astro`
- Modify: `tests/screen-reader-methods.spec.js`

### Work

1. Implement the approved props: `title`, `landingHref`, `landingLabel`, `items`, and `currentPath`.
2. Render one labelled `nav`, one visible heading, the landing link, and the ordered entry links.
3. Normalize trailing slashes before comparing each link with `currentPath`.
4. Apply `aria-current="page"` only on an exact normalized match.
5. Style the component with the Lab's existing color, border, link, active-state, dark-mode, hover, and focus conventions.
6. Ensure the active state is identifiable by more than color and long labels wrap without horizontal overflow.
7. Keep the component presentational; do not import `astro:content` or collection names.

### Verification

```sh
npm run astro -- check
npx playwright test tests/screen-reader-methods.spec.js --grep "section navigation" --workers 1
```

## Task 4: Add the optional navigation slot and responsive layout

### Files

- Modify: `src/layouts/ContentLayout.astro`
- Modify: `src/layouts/LearningPathLayout.astro`
- Modify: `src/layouts/MethodLayout.astro`
- Modify: `src/layouts/ExerciseLayout.astro`
- Modify: `src/layouts/JourneyLayout.astro`
- Modify: `tests/screen-reader-methods.spec.js`

### Work

1. Detect whether `ContentLayout` received a `navigation` slot.
2. Preserve the current centered single-column layout when the slot is absent.
3. When present, render the slot once after the title, summary, and metadata in source order and before the main body content.
4. Use CSS Grid at the large breakpoint to place that same navigation instance in a right-hand column.
5. Make the navigation container sticky at large widths while leaving it in normal flow at smaller widths.
6. Forward the named slot through each collection-specific layout without making those layouts aware of navigation data.
7. Add viewport assertions that the navigation precedes body content on mobile, occupies the sidebar column on desktop, and remains a single DOM instance at both sizes.

### Verification

```sh
npm run astro -- check
npx playwright test tests/screen-reader-methods.spec.js --grep "section navigation|mobile|desktop" --workers 1
```

## Task 5: Wire all four dynamic collection routes

### Files

- Modify: `src/pages/learn/[...id].astro`
- Modify: `src/pages/methods/[...id].astro`
- Modify: `src/pages/exercises/[...id].astro`
- Modify: `src/pages/journeys/[...id].astro`
- Modify: `tests/content-architecture.spec.js`

### Work

1. Load shallow navigation items alongside visible entries in each route's `getStaticPaths` work, avoiding repeated collection reads per rendered entry where practical.
2. Supply the relevant section configuration from each route:
   - Learning paths: `/learn/`, `All learning paths`
   - Testing methods: `/methods/`, `All testing methods`
   - Exercises: `/exercises/`, `All exercises`
   - Testing journeys: `/journeys/`, `All testing journeys`
3. Pass `Astro.url.pathname` as the current path.
4. Render `SectionNavigation` into the forwarded `navigation` slot.
5. Keep draft filtering, static paths, rendering, and existing entry props unchanged.
6. Add source-level or build-backed coverage proving all four route templates use the shared component even though three collections currently have no detail pages.

### Verification

```sh
npm run astro -- check
npm run build
npx playwright test tests/content-architecture.spec.js tests/screen-reader-methods.spec.js --workers 1
```

## Task 6: Verify interaction, reflow, and accessibility

### Files

- Modify: `tests/screen-reader-methods.spec.js`
- Modify: `tests/axe-core.spec.js`

### Work

1. Tab through every section-navigation link and assert each receives a visible focus indicator.
2. Test a narrow viewport and a zoom-equivalent reduced CSS viewport to confirm long titles wrap without component-caused horizontal scrolling.
3. Confirm the navigation is still usable when method content contains interactive demonstrations.
4. Include the new landmark in method-page axe scans without excluding it.
5. Confirm the primary navigation's current-page behavior is unchanged and does not conflict with the section navigation.

### Verification

```sh
npx playwright test tests/screen-reader-methods.spec.js tests/axe-core.spec.js --workers 1
```

## Task 7: Final verification and review

### Work

1. Run Astro type and content validation.
2. Build the production site and confirm all four method detail routes are generated.
3. Run the complete Playwright suite.
4. Confirm there is exactly one reusable section-navigation component and no duplicated method URL list in application code.
5. Confirm legacy `/examples/screen-reader/` navigation remains unchanged during this work.
6. Review the diff for accidental content edits, workshop-navigation changes, draft exposure, or schema additions.

### Verification

```sh
npm run astro -- check
npm run build
npx playwright test --workers 1
rg -n "All testing methods|screen-reader-page-structure-and-links" src --glob '!content/**'
git diff --check
git status --short
```

## Completion criteria

- Every published detail page can receive section navigation from its collection without a manually maintained link list.
- The four current Testing methods appear in collection order with the exact current page identified by `aria-current="page"`.
- One navigation instance appears inline before body content on small screens and in a sticky right sidebar on large screens.
- The component has a clear landmark name, visible heading, wrapping labels, and visible hover and focus states.
- All four dynamic collection routes use the same navigation contract.
- Empty collections remain truthful and do not require placeholder detail pages.
- Legacy example routes and their submenu are not removed by this change.
- Astro validation, production build, accessibility checks, and the complete Playwright suite pass.
