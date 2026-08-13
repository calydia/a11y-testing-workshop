# Section landing card typography refinement implementation plan

## Goal

Reduce entry-card typography consistently across the four primary section landing pages without changing related-content cards or other page typography.

## Task 1: Pin the scoped presentation

- Add browser assertions for 20px card headings and 18px summaries on `/learn/`, `/methods/`, `/exercises/`, and `/journeys/`.
- Assert that a related-content listing retains the current default card typography.
- Preserve existing route, navigation, link, and accessibility assertions.

## Task 2: Add the section-landing variant

- Add an explicit `sectionLanding` presentation variant to `ContentListing` and `ContentCard`.
- Select that variant from `SectionLanding`.
- Keep the default variant unchanged for `RelatedContent` and any future general listings.
- Preserve markup semantics, card spacing, borders, colors, and responsive grid behavior.

## Task 3: Verify

- Run focused site-architecture and related-content tests.
- Run Astro diagnostics and the production build.
- Run the complete Playwright suite.
- Check the four indexes at desktop and narrow mobile widths.
- Run `git diff --check`.
