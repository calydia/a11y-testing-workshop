# Listing card typography refinement design

## Goal

Restore a clearer hierarchy in section-listing cards after the addition of level and duration metadata.

## Design

Apply the following type sizes to cards rendered with the existing `sectionLanding` variant:

- Card heading: retain `20px`
- Level and duration metadata: reduce from `16px` to `14px`
- Card summary: reduce from `18px` to `16px`

The heading remains the strongest element. Metadata becomes the smallest supporting information, while the summary remains readable but no longer competes with the title.

The change applies consistently to Learning paths, Testing methods, Exercises, and Testing journeys. It does not affect detail-page metadata, related-content cards, fixture cards, headings, or ordinary body text.

Give the summary paragraph a `1rem` bottom margin so wrapped or short summaries retain comfortable space at the bottom of each card. Keep the eyebrow and metadata margins unchanged.

Existing colors, other spacing, borders, grid behavior, heading levels, focus styles, responsive behavior, and the screen-reader-hidden visual metadata separator remain unchanged.

## Verification

- Assert the computed heading, metadata, and summary sizes on all four listing types.
- Assert the summary paragraph's computed bottom margin is `16px`.
- Preserve grouped and flat listing heading levels.
- Confirm metadata and summaries wrap without horizontal overflow at a narrow viewport.
- Confirm light- and dark-theme contrast and existing focus styles remain unchanged.
- Run Astro diagnostics, the production build, focused architecture tests, and the complete Playwright suite.

## Out of scope

- Changing card padding, non-summary margins, gaps, width, borders, or colors
- Changing title size or heading hierarchy
- Changing detail-page or related-content typography
- Rewriting listing copy or metadata
