# Content listing grid gap implementation plan

## Goal

Make the visible row and column gaps in shared section listings equal without changing global list spacing or card styling.

## Task 1: Add the spacing regression contract

### Files

- Modify: `tests/site-architecture.spec.js`

### Work

1. On a desktop section landing, locate the shared content-listing grid and its items.
2. Assert the computed `row-gap` and `column-gap` are equal.
3. Assert listing items have zero top and bottom margins.
4. Preserve the existing typography, focus, and narrow-viewport checks.

## Task 2: Neutralize inherited list-item margins locally

### Files

- Modify: `src/components/content/ContentListing.astro`

### Work

1. Give the shared listing a stable local selector.
2. Add a scoped direct-child rule that sets listing-item margins to zero with enough specificity to override the global `ul li` spacing.
3. Keep `gap-6`, the two-column desktop layout, and all card styles unchanged.
4. Do not modify the global ordinary-list rules in `BaseLayout.astro`.

## Task 3: Verify

1. Run the focused site-architecture tests.
2. Check Learning paths, Testing methods, Exercises, and Testing journeys use the corrected shared listing.
3. Run Astro diagnostics and the production build.
4. Run `git diff --check` and review the scoped diff.

## Out of scope

- Card padding, typography, borders, colors, or widths.
- Outer section spacing and margins.
- Ordinary list spacing.
- Mobile column behavior.
