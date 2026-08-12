# Practical screen-reader testing Learning path design

## Goal

Publish a second Learning path, `Practical screen-reader testing`, as a self-contained beginner sequence for learning focused screen-reader testing techniques. The path must work both as a natural continuation after `Your first accessibility review` and as a direct entry point for someone seeking screen-reader-specific skills.

Reuse the five existing relevant Testing methods, their demonstrations, and the existing image alternative-text Exercise. Do not create new methods, Exercises, fixtures, or Testing journeys in this milestone.

## Route and collection placement

Publish the path at:

`/learn/practical-screen-reader-testing/`

Use order `20`, after `Your first accessibility review`, on `/learn/` and in the collection-driven Learning paths submenu. Use the existing Learning path collection schema and dynamic route. Do not add a route, collection, or navigation section.

## Audience and prerequisites

The path is for beginners who want practical experience testing web content with a screen reader. It assumes:

- basic familiarity with using a web browser;
- basic keyboard use.

Prior completion of `Your first accessibility review` is recommended context but is not a requirement. The introduction must make the path understandable to visitors who arrive directly from search, a Testing method, or the Learning paths listing.

Learners choose one screen-reader and browser combination available on their platform. The path must not present one product's commands or announcement wording as universal.

## Path metadata

Use:

- title: `Practical screen-reader testing`;
- level: `beginner`;
- estimated time: `135` minutes;
- status: `published`;
- order: `20`.

The existing duration formatter presents the total as `About 2 hours 15 minutes`.

### Outcomes

After completing the path, learners should be able to:

1. Prepare one compatible screen-reader and browser combination for focused testing.
2. Navigate and assess headings and links using sequential and element-based navigation.
3. Evaluate image alternatives, icons, and SVGs according to their purpose and context.
4. Investigate language changes while accounting for installed voices and platform support.
5. Test modal naming, focus movement, containment, closing behavior, background availability, and focus restoration.
6. Record actual announcements and interaction behavior without assuming identical output across screen readers.

## Authoritative step sequence

The Learning path frontmatter `steps` array remains the authoritative order. It contains exactly seven steps:

1. Content checkpoint: `Prepare your screen reader`, anchored at `prepare-your-screen-reader`
2. Method: `screen-reader-page-structure-and-links`
3. Method: `testing-image-alternative-text`
4. Exercise: `evaluating-image-alternative-text-in-context`
5. Method: `screen-reader-icons-and-svg`
6. Method: `screen-reader-language-changes`
7. Method: `testing-modal-dialogs`

Every step renders exactly once. Referenced entries resolve through Astro content references at build time. A missing reference must fail validation or the production build rather than silently disappear.

## Instructional progression

Begin with a setup checkpoint so the path remains self-contained. Page structure and links follow because they introduce navigation through common page content and element lists. Image alternative text then adds contextual judgment and is immediately followed by its matching independent Exercise. Icons and SVGs extend accessible-name testing to compact graphical content. Language changes introduce platform-dependent interpretation. Modal dialogs finish the path with the most interaction-heavy combination of screen-reader and keyboard testing.

The existing method demonstrations provide guided hands-on practice. The image alternative-text Exercise is the path's only independent Exercise in this milestone. The path must not imply that every method already has a matching Exercise.

## Prepare your screen reader checkpoint

The checkpoint is inline Learning path content, not a separate route or Testing method. Cover:

1. Choose one screen reader that supports the learner's operating system and browser.
2. Learn how to start, pause or silence, and stop speech.
3. Move sequentially through ordinary page content.
4. Navigate by headings and links and open the tool's element lists where supported.
5. Recognize when browsing and direct interaction modes differ, without attempting to teach every product-specific command.
6. Record the actual announcement, state, and interaction behavior.
7. Note the screen reader, browser, operating system, relevant versions, voice support, and initial page state when results may depend on them.

State that commands, mode names, speech output, and supported behavior vary across combinations. Link to authoritative help for the learner's chosen screen reader instead of reproducing complete command references.

## Markdown body responsibilities

The new path body supplies:

1. introduction and pacing advice;
2. an explanation that method demonstrations provide guided practice and that the image topic includes an independent Exercise;
3. the inline `Prepare your screen reader` section with the exact matching anchor;
4. interpretation advice about cross-product variation;
5. a closing `Where to go next` section.

The closing guidance should link to `Your first accessibility review` for broader testing practice and to the existing course-registration Testing journey for applying several techniques in a realistic scenario. Do not claim that the current journey assesses every screen-reader topic in this path.

The body must not duplicate the complete generated step list or frontmatter outcomes.

## Shared Learning path introduction refinement

`LearningPathLayout` currently renders two paragraphs that assume every path contains several method-and-Exercise pairs using different fixture interfaces. That assumption is true for the first path but false for this one.

Remove those paragraphs from the shared layout. Add equivalent wording to the Markdown body of `Your first accessibility review` so its meaning and visible content remain intact. Add path-specific introductory wording to `Practical screen-reader testing`.

Do not add schema fields solely to hold these introductions. Authored Markdown is the appropriate path-specific boundary, while the shared layout continues to own metadata, outcomes, and the generated ordered sequence.

## Component and route architecture

Reuse without structural changes:

- the Learning path collection and schema;
- `/learn/[...id].astro` and build-time reference resolution;
- `LearningPathLayout` after removing its path-specific prose;
- `LearningPathMeta`;
- `LearningPathSteps`;
- breadcrumbs;
- the collection-driven Learning paths submenu and landing-page cards.

All presentation remains static HTML. Do not add hydration, accounts, API calls, saved state, progress tracking, grading, or completion controls.

Do not edit the referenced Testing methods, demonstrations, image Exercise fixture, intentional findings, hints, or solution during this milestone.

## Internal linking and navigation

The path is discoverable from:

- the `/learn/` listing;
- the Learning paths submenu on both path detail pages;
- breadcrumbs through `Home` and `Learning paths`.

Keep both Learning paths at the same URL depth. Do not nest the second path below the first because it is independently useful and does not require prior completion.

Within the path, every generated reference uses descriptive linked titles. The setup checkpoint link targets `#prepare-your-screen-reader`, and that anchor must match the rendered heading exactly.

## Future Exercise expansion

Dedicated Exercises may later be useful for:

- page structure and links;
- icons and SVGs;
- language changes;
- modal dialogs.

Treat that as a separately designed content milestone. When Exercises are added, audit every Learning path and Testing journey to decide whether each new Exercise belongs in its progression or scenario. Do not automatically insert all new Exercises everywhere.

The public path wording may state that additional Exercises can be added later, but it must not promise a schedule or imply that the current demonstrations are incomplete pages. Keep the detailed cross-content audit requirement in project documentation.

## Error handling and content integrity

Astro content references enforce that method and Exercise IDs exist. The rendering layer must continue to handle every validated step type exhaustively.

The content checkpoint anchor in frontmatter must match the Markdown heading ID. Add a regression assertion for the link and target heading. Do not add runtime anchor discovery or fallback behavior.

If a referenced method lacks an optional estimated time, omit only that line while keeping the step. Every referenced item in this path currently has an estimate.

## Accessibility and responsive behavior

Use the existing semantic ordered list for progression. Step type, title, summary, and time remain textual and do not rely on color or icons. Links use the site's existing visible hover and keyboard-focus treatments.

The page must work in light and dark themes, on desktop and narrow mobile viewports, and with long titles wrapping without page-level horizontal overflow. Preserve a logical heading structure and the existing breadcrumb and submenu behavior.

## Testing

Add or update focused browser tests for:

- `/learn/practical-screen-reader-testing/` returning successfully;
- both Learning paths appearing in order on `/learn/` and in the submenu;
- the new path's breadcrumb and exact-page current state;
- `beginner` level and `About 2 hours 15 minutes` metadata;
- all six frontmatter outcomes;
- exactly seven rendered steps in the approved order;
- visible sentence-case content-type labels;
- referenced titles, links, summaries, and durations;
- the setup checkpoint linking to `#prepare-your-screen-reader` and its matching heading;
- path-specific introductory wording on both paths after removing it from the shared layout;
- no checkbox, progressbar, completion, grading, or progress-storage behavior;
- visible keyboard focus;
- light and dark theme presentation;
- narrow-viewport behavior without unrelated horizontal overflow;
- no automatically detectable accessibility violations;
- successful Astro content validation and production reference resolution;
- a successful production build and complete Playwright regression suite.

Perform a desktop/mobile and light/dark visual review. Run `git diff --check` and confirm no referenced method, demonstration, Exercise fixture, or solution changed.

## Deferred work

This milestone does not include:

- new Testing methods, Exercises, demonstrations, fixtures, or Testing journeys;
- changes to existing method or Exercise content;
- dedicated Exercises for the four demonstration-only methods;
- automatically updating paths or journeys when future Exercises are published;
- progress tracking, grading, saved completion state, accounts, or synchronization;
- legacy content cleanup.
