# Learning graph refinement implementation plan

## Goal

Make the current beginner curriculum easier to enter and traverse by exposing the recommended starting path, rendering all method-to-Exercise relationships consistently, and connecting both paths to their matching journeys.

## Task 1: Pin the learning graph contract

### Files

- Modify: `tests/site-architecture.spec.js`
- Modify: `tests/learning-path.spec.js`
- Modify: `tests/screen-reader-methods.spec.js`
- Modify: `tests/testing-journey.spec.js`
- Modify: `tests/axe-core.spec.js`

### Work

1. Assert the Home beginner heading and direct first-path link.
2. Assert the Learning paths landing guidance distinguishes broad and focused choices.
3. Define all ten expected method-to-Exercise pairs and require one shared practice section per method.
4. Assert Exercise title links, summaries, estimates, and no duplicate practice sections.
5. Assert both path-to-journey links and the optional cross-path links.
6. Assert both journey-to-path Optional preparation relationships.
7. Preserve existing order, metadata, breadcrumbs, navigation, accessibility, and responsive contracts.

## Task 2: Resolve and render related Exercises

### Files

- Add: `src/components/method/RelatedExercises.astro`
- Modify: `src/pages/methods/[...id].astro`
- Modify: `src/layouts/MethodLayout.astro`

### Work

1. Define a compact presentation view containing Exercise title, summary, URL, and estimated minutes.
2. Resolve `relatedExercises` collection references in the method route.
3. Pass resolved views through `MethodLayout` to the dedicated component.
4. Render nothing for an empty array and a semantic list for one or more entries.
5. Follow existing content typography, borders, theme colors, focus styles, and responsive behavior.
6. Keep invalid references as build-time content failures without runtime fallback.

## Task 3: Complete method relationship metadata

### Files

- Modify: `src/content/testing-methods/testing-with-automated-tools.md`
- Modify: `src/content/testing-methods/testing-keyboard-accessibility.md`
- Modify: `src/content/testing-methods/testing-visual-accessibility.md`
- Modify: `src/content/testing-methods/testing-zoom-and-reflow.md`
- Modify: `src/content/testing-methods/testing-image-alternative-text.md`
- Modify: `src/content/testing-methods/testing-forms-and-validation.md`
- Modify: `src/content/testing-methods/screen-reader-page-structure-and-links.md`
- Modify: `src/content/testing-methods/screen-reader-icons-and-svg.md`
- Modify: `src/content/testing-methods/screen-reader-language-changes.md`
- Modify: `src/content/testing-methods/testing-modal-dialogs.md`

### Work

1. Add the six missing `relatedExercises` references.
2. Preserve the four existing references.
3. Remove the four manually authored `Practise this method` sections.
4. Do not change method procedures, limitations, estimates, or authored order.

## Task 4: Add the beginner entry points

### Files

- Modify: `src/pages/index.astro`
- Modify: `src/pages/learn/index.astro`

### Work

1. Add the approved `New to accessibility testing?` Home section and direct first-path link.
2. Keep all four content-area links unchanged.
3. Update the Learning paths introduction to identify the broad starting path and the focused screen-reader option.
4. Reuse existing link and content styling without introducing a new card or button variant.

## Task 5: Connect paths and journeys

### Files

- Modify: `src/content/learning-paths/your-first-accessibility-review.md`
- Modify: `src/content/learning-paths/practical-screen-reader-testing.md`
- Modify: `src/content/testing-journeys/reviewing-a-course-registration-before-launch.md`

### Work

1. Link the first path to the course-registration journey and the screen-reader path.
2. Link the screen-reader path to the conference journey and retain the first path as an optional foundation.
3. Remove the manual screen-reader-method list from the first path.
4. Add `your-first-accessibility-review` to the course journey's `learningPaths` references.
5. Preserve the conference journey's existing screen-reader path reference.

## Task 6: Verify

1. Run focused Home, method, path, journey, architecture, and axe tests.
2. Run Astro diagnostics and the production build.
3. Run the complete Playwright suite on port 4321.
4. Review Home, representative methods, both paths, and both journeys at desktop and mobile widths in both themes.
5. Confirm the MVP audit document remains unmodified and uncommitted.
6. Run `git diff --check`.
