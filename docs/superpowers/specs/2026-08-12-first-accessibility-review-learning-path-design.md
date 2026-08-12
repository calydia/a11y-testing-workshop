# Your first accessibility review Learning path design

## Goal

Publish the first Learning path, `Your first accessibility review`, as a structured beginner sequence that interleaves foundational Testing methods with their matching Exercises. Add reusable Learning path presentation for metadata, outcomes, and collection-driven steps without introducing progress tracking.

The path teaches individual skills progressively. It does not pretend that its separate Exercise fixtures form one continuous product review. Combining techniques within a single realistic scenario remains the purpose of a future Testing journey.

## Route and collection placement

Publish the path at:

`/learn/your-first-accessibility-review/`

Use order `10` so it appears first on `/learn/` and in the Learning paths section navigation. Publishing the entry replaces the current truthful empty state on `/learn/`. The empty state for Testing journeys remains unchanged.

Use the existing Learning path collection schema and dynamic route. Do not add schema fields or navigation sections.

## Audience and scope

The path is for beginners conducting a first broad accessibility review. It assumes basic comfort using a web browser but does not assume prior accessibility-testing experience.

The path covers:

- automated checks;
- keyboard testing;
- visual inspection;
- zoom and reflow;
- basic screen-reader preparation;
- forms and validation.

It deliberately omits the full set of specialized screen-reader methods and image alternative-text practice from the required sequence. Those become recommended next steps after learners complete the core review path.

## Path metadata

Use:

- title: `Your first accessibility review`;
- level: `beginner`;
- estimated time: `250` minutes;
- status: `published`;
- order: `10`.

Present the total as `About 4 hours 10 minutes`. Explain near the beginning that learners should split the path across multiple sessions and may revisit reference methods while completing Exercises.

### Outcomes

After completing the path, learners should be able to:

1. Define and run a scoped automated accessibility check without treating it as complete coverage.
2. Perform baseline keyboard, visual, and zoom/reflow reviews.
3. Prepare a screen reader for limited form-oriented verification.
4. Test form labels, instructions, groups, validation errors, focus handling, and success communication.
5. Record reproducible findings and distinguish automated evidence from required human judgment.

## Authoritative step sequence

The Learning path frontmatter `steps` array is the authoritative progression order. It contains exactly eleven steps:

1. Method: `testing-with-automated-tools`
2. Exercise: `comparing-automated-and-manual-findings`
3. Method: `testing-keyboard-accessibility`
4. Exercise: `keyboard-testing-a-preferences-form`
5. Method: `testing-visual-accessibility`
6. Exercise: `finding-visual-problems-in-an-account-dashboard`
7. Method: `testing-zoom-and-reflow`
8. Exercise: `testing-an-appointment-booking-at-high-zoom`
9. Content checkpoint: `Prepare for screen-reader checks`, anchored at `prepare-for-screen-reader-checks`
10. Method: `testing-forms-and-validation`
11. Exercise: `testing-a-community-course-registration-form`

Every step renders exactly once. Method and Exercise references resolve through Astro content references at build time. A missing reference must fail content validation or the build rather than silently dropping a step.

## Instructional progression

Each method is immediately followed by its matching Exercise so learners practise a technique while it is fresh.

The sequence starts with automation to establish scope, reproducibility, and the limits of automated coverage. Keyboard and visual testing follow as foundational manual techniques. Zoom and reflow extends the review to responsive and magnified conditions. A short screen-reader preparation checkpoint then supplies only the skills needed for forms verification before the final method-and-Exercise pair.

The introduction must state that the Exercises use different small interfaces. The path builds transferable techniques rather than simulating one end-to-end product review.

## Screen-reader preparation checkpoint

The checkpoint is inline Learning path content, not a separate route or Testing method. It prepares learners for the limited screen-reader checks in the forms method and Exercise.

Cover:

1. Choose one screen reader that works with the learner's platform and browser.
2. Learn how to start, pause or silence, and stop it.
3. Navigate through native form controls.
4. Listen for each control's name, role, state, value, description, and group context where applicable.
5. Record the actual announcement and interaction behavior rather than assuming one exact phrase across products.
6. Keep the forms Exercise's visual and keyboard observations separate from screen-reader observations.

Do not attempt to teach every screen-reader command, browsing mode, landmarks, heading navigation, link lists, image navigation, language changes, SVG behavior, or dialog interaction. Link to the specialized screen-reader methods as optional follow-up content.

## Reusable Learning path presentation

### Metadata

Display near the page title:

- `Level: beginner`;
- `Estimated time: About 4 hours 10 minutes`.

Add a reusable Learning path metadata component or an equivalent focused extension to `LearningPathLayout`. Keep it separate from Exercise metadata because the labels and duration presentation differ.

### Outcomes

Render the frontmatter outcomes in a clearly labelled `What you will learn` section before the ordered sequence. Outcomes must come from collection data rather than being duplicated manually in Markdown.

### Ordered steps

Add a reusable `LearningPathSteps` component that accepts the validated step array and resolves its referenced entries. It renders one semantic ordered list.

Each method and Exercise step displays:

- its sequence number supplied by the ordered list;
- a visible content-type label: `Testing method` or `Exercise`;
- linked title;
- summary;
- estimated time when present.

The content checkpoint displays:

- the visible label `Path checkpoint`;
- a linked title targeting the body anchor on the same page;
- a concise explanation that it prepares the learner for the next method.

Do not show completion checkboxes, progress percentages, completed styling, accounts, browser storage, or claims that the site knows what a learner has finished.

### Markdown body responsibilities

The Markdown body supplies:

1. introduction and pacing advice;
2. an explanation of the separate-Exercise model;
3. the inline `Prepare for screen-reader checks` section with the exact matching anchor;
4. a closing `Where to go next` section.

The body must not duplicate the complete ordered step list or frontmatter outcomes.

### Closing guidance

`Where to go next` should recommend:

- Testing image alternative text and its Exercise;
- page structure and links with a screen reader;
- icons and SVGs with a screen reader;
- language changes with a screen reader;
- modal-dialog testing.

Frame these as optional next skills, not hidden requirements for completing the beginner path.

## Component and route architecture

Update the Learning path detail route to pass `level`, `estimatedMinutes`, `outcomes`, and `steps` to `LearningPathLayout`.

`LearningPathLayout` remains a thin specialization of `ContentLayout`. It composes focused metadata, outcomes, and ordered-step components around the rendered Markdown body. Content reference resolution belongs in the route or a dedicated content helper, not in client-side JavaScript.

All presentation is static HTML generated at build time. No hydration, client state, API, authentication, or persistence is required.

Maintain the existing breadcrumb and collection-driven Learning paths submenu. The first and only path appears in both `/learn/` and the submenu.

## Error handling and content integrity

Astro content references enforce that method and Exercise IDs exist. The rendering layer must also treat every validated step type exhaustively. An unsupported step variant should fail during development/build rather than render an empty card.

The content checkpoint anchor in frontmatter must exactly match the Markdown heading ID. Add a regression assertion for the link target and heading. Do not implement runtime anchor discovery or fallback text.

If a referenced method lacks an optional estimated time, omit only that line while preserving the step. All Exercises in this path have required estimates.

## Accessibility and responsive behavior

Use a semantic ordered list for progression. Step type, title, and time remain text rather than relying on color or icons. Linked step titles and the checkpoint link receive the site's existing visible focus treatment.

The page must work in light and dark themes, at desktop and narrow mobile widths, and with long titles wrapping without page-level horizontal overflow. The step layout should remain linear on small screens and must not require horizontal scrolling.

Use heading levels that preserve the document outline. The inline checkpoint and closing guidance remain normal body sections after the generated sequence.

## Testing

Add focused browser tests for:

- `/learn/your-first-accessibility-review/` returning successfully;
- the path appearing on `/learn/` and replacing its empty state;
- breadcrumb and Learning paths submenu behavior;
- beginner level and `About 4 hours 10 minutes` metadata;
- the five frontmatter outcomes;
- exactly eleven rendered steps;
- exact method, Exercise, and checkpoint ordering;
- visible content-type labels;
- title, link, summary, and estimated time for referenced steps;
- the checkpoint link targeting `#prepare-for-screen-reader-checks`;
- exactly one rendered instance of every frontmatter step;
- no checkbox, progressbar, completion control, or progress-storage behavior;
- no automatically detectable accessibility issues;
- visible keyboard focus;
- light/dark theme presentation;
- narrow-viewport behavior without unrelated horizontal overflow;
- unchanged truthful empty state for Testing journeys;
- successful content validation and production reference resolution.

Update existing architecture and axe route coverage to include the new path. Run focused tests, the complete Playwright suite, Astro diagnostics, the production build, visual review, and `git diff --check`.

## Deferred work

This milestone does not include:

- progress tracking or saved completion state;
- accounts, authentication, or synchronization;
- a Testing journey;
- another Learning path;
- new methods or Exercises;
- adding every current method to this path;
- redesigning iframe height or scrolling;
- editing or deleting retained legacy content;
- the final pre-launch legacy cleanup.
