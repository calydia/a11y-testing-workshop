# Top-level section-navigation landmark implementation plan

## Goal

Render the shared section-navigation `aside` as a sibling of `main` while preserving the current responsive layout and navigation behavior.

## Task 1: Define the landmark and layout regression contract

### Files

- Modify: `tests/screen-reader-methods.spec.js`
- Modify: `tests/axe-core.spec.js`

### Work

1. Assert that a representative content page renders the shared section-navigation `aside` outside `main`.
2. Assert that the aside retains its labelled section-navigation `nav`.
3. Assert the source order is `main` followed by the complementary landmark.
4. Preserve existing desktop centering, column sizing, sticky navigation, compact first-heading spacing, and mobile overflow checks.
5. Include representative section-navigation pages in Axe coverage.

## Task 2: Add a top-level complementary slot to the site shell

### Files

- Modify: `src/layouts/BaseLayout.astro`

### Work

1. Detect whether the layout receives a complementary slot.
2. Wrap `main` and the complementary slot in a neutral container.
3. Apply the existing bounded two-column desktop geometry only when the slot exists.
4. Keep ordinary pages on their current single-column layout.
5. Preserve header, footer, breadcrumb, theme, and skip-link behavior.

## Task 3: Move shared section navigation out of main

### Files

- Modify: `src/layouts/ContentLayout.astro`

### Work

1. Keep the article, heading, metadata, and content body inside `main`.
2. Pass the existing section-navigation `aside` to the new top-level complementary slot.
3. Transfer the current desktop column and sticky behavior to the new wrapper/aside relationship.
4. Preserve mobile ordering and spacing.
5. Leave contextual fixture and demonstration asides unchanged.

## Task 4: Verify

1. Run focused content-layout and Axe tests.
2. Run Astro diagnostics and the production build.
3. Run the complete Playwright suite.
4. Run `git diff --check` and inspect the scoped changes.

## Out of scope

- Contextual asides inside exercises or demonstrations
- Navigation content, ordering, labels, or interaction
- Routes and content architecture
- Visual redesign or spacing changes
