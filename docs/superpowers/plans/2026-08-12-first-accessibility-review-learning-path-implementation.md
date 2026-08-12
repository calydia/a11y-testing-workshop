# First accessibility review Learning path implementation plan

## Goal

Publish `Your first accessibility review` as an eleven-step beginner Learning path and add reusable static presentation for path metadata, outcomes, and referenced steps without progress tracking.

## Task 1: Add failing Learning path tests

### Files

- Add: `tests/learning-path.spec.js`
- Modify: `tests/content-architecture.spec.js`
- Modify: `tests/axe-core.spec.js`

### Work

1. Expect the new route, listing entry, breadcrumb, and section navigation.
2. Assert level, formatted total duration, five outcomes, and exactly eleven ordered steps.
3. Pin the approved interleaved method, Exercise, and checkpoint order.
4. Assert labels, summaries, item durations, checkpoint target, and absence of progress controls/storage.
5. Preserve the Testing journeys empty state.

## Task 2: Add reusable Learning path presentation

### Files

- Add: `src/components/learning-path/LearningPathMeta.astro`
- Add: `src/components/learning-path/LearningPathSteps.astro`
- Modify: `src/layouts/LearningPathLayout.astro`
- Modify: `src/pages/learn/[...id].astro`

### Work

1. Render level and human-friendly total duration near the title.
2. Render collection outcomes once in a labelled section.
3. Resolve method and Exercise references at build time and render one semantic ordered list.
4. Render type, linked title, summary, and optional item time for referenced steps.
5. Render content checkpoints as same-page links with a concise preparation description.
6. Keep all output static and exhaustive across validated step variants.

## Task 3: Create the first Learning path

### Files

- Add: `src/content/learning-paths/your-first-accessibility-review.md`

### Work

1. Add beginner metadata, 250-minute estimate, five outcomes, order 10, and the exact eleven-step sequence.
2. Add pacing advice and explain that Exercises use separate interfaces.
3. Write the focused screen-reader preparation checkpoint with the exact approved anchor.
4. Add optional next steps for image alternative text and specialized screen-reader methods.
5. Avoid duplicating the generated outcomes or step list in Markdown.

## Task 4: Refine presentation and accessibility

### Files

- Complete the Learning path components and focused tests.

### Work

1. Apply site-consistent card, type-label, link, and focus treatments.
2. Verify semantic heading order and ordered-list structure.
3. Ensure long titles and step metadata wrap without horizontal overflow.
4. Verify light/dark themes and desktop/mobile layouts.
5. Confirm no progress checkboxes, progressbars, completion UI, hydration, or persistence exists.

## Task 5: Final verification

1. Run focused Learning path and architecture tests.
2. Run Astro diagnostics and production build to validate all references.
3. Run the complete Playwright suite.
4. Visually review desktop/mobile and light/dark presentation.
5. Run `git diff --check` and confirm Testing journeys and iframe behavior remain unchanged.

```sh
npx astro check
npm run build
npx playwright test tests/learning-path.spec.js tests/content-architecture.spec.js tests/axe-core.spec.js --workers 1
npx playwright test --workers 1
git diff --check
```
