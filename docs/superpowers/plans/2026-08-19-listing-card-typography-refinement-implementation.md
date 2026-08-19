# Listing card typography refinement implementation plan

## Goal

Reduce section-listing card summary and metadata sizes while retaining the current heading size and all other card behavior.

## Task 1: Update the typography contract

### Files

- Modify: `tests/site-architecture.spec.js`

### Work

1. Retain the `20px` card-heading assertion across all four section listings.
2. Change the section-listing summary expectation from `18px` to `16px`.
3. Add a `14px` expectation for the level and duration metadata line.
4. Preserve grouped and flat heading-level assertions, focus checks, equal grid gaps, and narrow-viewport overflow checks.

## Task 2: Refine the shared section-listing card type

### Files

- Modify: `src/components/content/ContentCard.astro`

### Work

1. Keep the `sectionLanding` heading at `1.25rem` (`20px`).
2. Reduce the `sectionLanding` summary to `1rem` (`16px`).
3. Give section-listing metadata a dedicated `0.875rem` (`14px`) size.
4. Keep default card typography unchanged.
5. Preserve metadata order, hidden visual separator, colors, margins, padding, borders, and interaction styles.

## Task 3: Verify

1. Run the focused site-architecture tests on port `4321`.
2. Run Astro diagnostics and the production build.
3. Run the complete Playwright suite.
4. Check all four listing pages at desktop and mobile widths in light and dark themes.
5. Run `git diff --check` and inspect the scoped diff.

## Out of scope

- Card dimensions, spacing, colors, borders, or grid layout
- Detail-page and related-content typography
- Heading size or hierarchy
- Listing copy or metadata values
