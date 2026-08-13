# Content layout intermediate-width gutter implementation plan

## Goal

Keep a minimum 16px horizontal gutter around shared two-column content pages throughout the intermediate desktop-width range.

## Task 1: Pin the affected widths

- Extend the shared section-layout browser test across 1024px, 1100px, 1168px, and 1200px.
- Assert minimum and balanced outer spacing plus absence of horizontal overflow.
- Preserve the existing mobile stacking and 1280px layout assertions.

## Task 2: Add the persistent gutter

- Replace breakpoint-dependent outer margins in `ContentLayout` with automatic centering and persistent 16px horizontal padding.
- Leave grid columns, gap, breakpoint, sticky behavior, and vertical spacing unchanged.

## Task 3: Verify

- Run focused screen-reader-method layout tests.
- Run Astro diagnostics and the production build.
- Run the complete Playwright suite.
- Run `git diff --check`.
