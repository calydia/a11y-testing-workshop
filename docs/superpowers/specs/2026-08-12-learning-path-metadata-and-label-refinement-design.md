# Learning path metadata and label refinement design

## Goal

Refine the first Learning path so its metadata matches Exercise pages and its step-type labels use easier-to-read sentence case.

## Metadata

Replace the custom Learning path metadata markup with the shared `ContentMeta` component used by Exercises.

Render the metadata through `ContentLayout`'s `meta` slot so it appears directly below the introductory summary in the page header. Preserve the Learning path terminology and formatted duration:

- `Level: beginner`
- `Estimated time: About 4 hours 10 minutes`

This gives the metadata the same smaller `text-base` size, inline label/value presentation, wrapping, and bottom spacing as Exercise metadata.

Keep `LearningPathMeta.astro` as a focused adapter that formats the duration and supplies items to `ContentMeta`. Do not duplicate the shared metadata markup or alter Exercise pages.

## Step-type labels

Keep the visible labels `Testing method`, `Exercise`, `Path checkpoint`, and the schema-supported `Testing journey` variant.

Remove `text-transform: uppercase` and the uppercase-oriented letter spacing from the step label style. Render labels in their authored sentence case. Retain a slightly smaller size and bold weight so the label remains visually distinct without reducing readability.

Do not use color or icons as the only content-type distinction.

## Testing

Update focused Learning path tests to verify:

- metadata remains present with the approved values;
- metadata uses the shared `ContentMeta` presentation and appears inside the content header below the summary;
- metadata uses the smaller base font size;
- each step-type label retains its expected sentence-case text;
- step-type labels do not use uppercase text transformation or added letter spacing;
- existing accessibility, focus, responsive, theme, ordering, and no-progress assertions continue to pass.

Run the focused Learning path tests, full Playwright suite, Astro diagnostics, production build, visual review, and `git diff --check`.

## Out of scope

- Changing Learning path content or step order
- Changing Exercise metadata
- Adding progress tracking
- Redesigning step cards
- Changing iframe behavior
