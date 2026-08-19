# Top-level section-navigation landmark design

## Goal

Make the shared section-navigation `aside` a top-level complementary landmark while preserving the site's current desktop and mobile layouts.

## Current structure

`ContentLayout.astro` currently renders the section-navigation `aside` inside the page `article`, which is itself inside the shared `main` landmark from `BaseLayout.astro`. Axe DevTools therefore reports the complementary landmark as nested inside another landmark.

## Design

Move the shared section-navigation `aside` out of `main` and render it as a sibling of `main` inside a neutral layout wrapper provided by `BaseLayout.astro`.

For pages with section navigation, the neutral wrapper will own the existing responsive layout:

- On mobile, render the main content first and the section navigation after it, matching the current reading and visual order.
- At the existing large-screen breakpoint, render the main content and section navigation in the same two-column arrangement used today.
- Retain the existing content-column width, navigation-column bounds, column gap, centering, horizontal gutters, sticky positioning, and vertical spacing.
- Keep the breadcrumb, page heading, metadata, and body inside `main`.
- Keep the section navigation's existing `aside` and nested labelled `nav` semantics.

Pages without section navigation will retain their current single-column main-content layout.

## Component responsibilities

### `BaseLayout.astro`

- Detect whether a top-level complementary slot is present.
- Wrap `main` and that slot in a non-landmark layout container.
- Apply the shared page-level grid only when the complementary slot exists.
- Continue rendering the header and footer outside that wrapper.

### `ContentLayout.astro`

- Keep the article responsible for the heading and body layout.
- Pass the section-navigation `aside` into the new top-level complementary slot.
- Remove the navigation column from the article's internal grid without changing the visible result.

## Scope

This change applies only to the shared section-navigation aside used by learning paths, testing methods, exercises, and testing journeys. Contextual `aside` elements inside demonstrations and exercise fixtures are unchanged and can be evaluated separately.

No routes, navigation labels, link order, content, colors, typography, breakpoints, or interactive behavior will change.

## Verification

- Assert that section-navigation pages expose the shared `aside` as a sibling of `main`, not a descendant.
- Assert that the complementary landmark retains its labelled section-navigation `nav`.
- Assert that pages without section navigation do not gain an empty complementary landmark or wrapper behavior.
- Run Axe checks on representative method, exercise, learning-path, and journey pages.
- Compare computed desktop grid dimensions and navigation sticky positioning with the current contract.
- Confirm mobile source order remains main content followed by section navigation and that no horizontal overflow appears.
- Run Astro diagnostics, a production build, focused layout tests, and the complete Playwright suite.

## Out of scope

- Changing contextual asides inside exercise fixtures or demonstrations
- Redesigning the section navigation
- Changing site information architecture or URLs
- Changing content widths, gaps, spacing, or responsive breakpoints
