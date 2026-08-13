# Section landing card typography refinement design

## Goal

Make the entry cards on the four primary section landing pages feel less visually oversized while preserving the established card layout and hierarchy.

## Scope

Apply the refinement consistently to cards on:

- `/learn/`;
- `/methods/`;
- `/exercises/`;
- `/journeys/`.

For these section-landing cards:

- set card headings to `1.25rem` (20px at the default root size);
- set card summaries to `1.125rem` (18px);
- preserve the existing heading level, link behavior, weights, line heights, margins, borders, padding, grid layout, and light/dark colors.

The typography applies at desktop and mobile widths, matching the recently refined Learning path step-card scale.

## Architecture

`ContentCard` and `ContentListing` are also used by related-content panels inside individual pages. The section landing refinement must therefore be explicit rather than changing the default shared-card typography globally.

Add a named presentation variant to the shared listing/card path and select it from `SectionLanding`. This keeps the card markup reusable while limiting the new typography to the four agreed landing pages. The default variant remains unchanged for related-content panels.

Prefer a semantic variant name that describes its context, such as `sectionLanding`, rather than a visual name such as `small`, so future typography adjustments do not make the API misleading.

## Validation

Add focused browser coverage to assert that:

- section-landing card headings render at 20px;
- section-landing card summaries render at 18px;
- all four primary landing pages use the shared presentation;
- related-content cards retain their current typography;
- card links remain keyboard accessible and preserve visible focus styles;
- narrow viewports do not introduce horizontal overflow.

Run Astro diagnostics, the production build, focused section architecture tests, the full Playwright suite, and `git diff --check`.

## Out of scope

- card padding, borders, colors, spacing, or grid layout;
- typography inside individual Learning path, Testing method, Exercise, or Testing journey pages;
- related-content card typography;
- page introductions and headings outside the cards.
