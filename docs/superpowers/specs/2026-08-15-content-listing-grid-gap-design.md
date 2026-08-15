# Content listing grid gap design

## Goal

Make the horizontal and vertical gaps between section-landing cards visually equal on desktop while preserving the current card design and mobile layout.

## Cause

`ContentListing.astro` already uses one `1.5rem` grid gap in both directions. A global `ul li` rule adds `1rem` block margins to every list item. Those margins increase only the visible space between grid rows, so the vertical separation is larger than the column gap.

## Design

- Scope the correction to the list items rendered by `ContentListing`.
- Set their margins to zero with a selector specific enough to override the global list-item rule.
- Keep the existing `gap-6` grid spacing, producing a `1.5rem` row gap and a `1.5rem` column gap.
- Do not change card padding, typography, borders, colors, widths, or responsive column behavior.
- Do not change the global spacing used by ordinary lists elsewhere on the site.

This applies to the shared listings for Learning paths, Testing methods, Exercises, and Testing journeys.

## Verification

- Add a shared section-landing regression test that checks zero block margins on grid items.
- Check that the computed desktop row and column gaps are equal.
- Preserve the existing narrow-viewport overflow and card typography assertions.
- Run the relevant site-architecture tests and a production build.

## Out of scope

- Changing spacing inside cards.
- Changing the section width or outer margins.
- Changing ordinary list spacing.
- Changing the single-column mobile layout.
