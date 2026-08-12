# Practical screen-reader testing Learning path implementation plan

## Goal

Publish `Practical screen-reader testing` as a self-contained seven-step beginner Learning path using existing screen-reader methods, demonstrations, and the image alternative-text Exercise. Refine the shared Learning path layout so each path can describe its own learning model accurately.

## Task 1: Add failing second-path tests

### Files

- Modify: `tests/learning-path.spec.js`
- Modify: `tests/axe-core.spec.js`

### Work

1. Expect the new route, its listing entry, breadcrumb, and exact-page submenu state.
2. Assert both Learning paths appear in collection order on the listing and submenu.
3. Assert beginner level, `About 2 hours 15 minutes`, six outcomes, and exactly seven ordered steps.
4. Pin the approved checkpoint, method, and Exercise order.
5. Assert referenced titles, links, summaries, durations, and sentence-case labels.
6. Assert the setup checkpoint target and matching rendered heading.
7. Assert path-specific introductions and the absence of progress, grading, completion, and storage controls.
8. Add the new route to central axe coverage.

## Task 2: Make Learning path introductions path-specific

### Files

- Modify: `src/layouts/LearningPathLayout.astro`
- Modify: `src/content/learning-paths/your-first-accessibility-review.md`

### Work

1. Remove the two first-path-specific prose paragraphs from `LearningPathLayout`.
2. Add equivalent introductory and pacing text to the first path's Markdown body.
3. Preserve the shared layout's ownership of metadata, outcomes, and generated steps.
4. Do not add schema fields or client-side behavior.

## Task 3: Create Practical screen-reader testing

### Files

- Add: `src/content/learning-paths/practical-screen-reader-testing.md`

### Work

1. Add published beginner metadata, order 20, 135-minute estimate, prerequisites, topics, and six outcomes.
2. Add the exact seven-step sequence from the approved design.
3. Write an independent introduction explaining pacing, guided demonstrations, and the one current independent Exercise.
4. Write `Prepare your screen reader` with the exact `prepare-your-screen-reader` anchor and cross-product interpretation guidance.
5. Add `Where to go next` links to the broader first path and the existing Testing journey without overstating their screen-reader coverage.
6. Mention possible future Exercises carefully while keeping the detailed path/journey audit as documented deferred work.
7. Avoid duplicating generated outcomes or the complete step list in Markdown.

## Task 4: Refine and validate presentation

### Files

- Complete the Learning path content and focused tests.

### Work

1. Verify both paths use accurate introductions after the shared prose is removed.
2. Verify semantic headings, ordered-list structure, breadcrumb hierarchy, and submenu current state.
3. Verify existing hover and keyboard-focus treatments on all generated links.
4. Verify light/dark themes and desktop/mobile layouts with no unrelated horizontal overflow.
5. Confirm no referenced method, demonstration, Exercise fixture, hints, or solution changed.

## Task 5: Final verification

1. Run focused Learning path, content-architecture, and axe tests.
2. Run Astro diagnostics and the production build to validate content references.
3. Run the complete Playwright suite.
4. Visually review both paths where the shared introduction moved, plus the new path in desktop/mobile and light/dark modes.
5. Run `git diff --check` and inspect the final changed-file list.

```sh
npx astro check
npm run build
npx playwright test tests/learning-path.spec.js tests/content-architecture.spec.js tests/axe-core.spec.js --workers 1
npx playwright test --workers 1
git diff --check
```
