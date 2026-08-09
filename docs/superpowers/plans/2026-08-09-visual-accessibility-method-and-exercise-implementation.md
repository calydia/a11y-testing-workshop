# Visual accessibility method and exercise implementation plan

## Goal

Publish `Testing visual accessibility` at `/methods/testing-visual-accessibility/` and `Finding visual problems in an account dashboard` at `/exercises/finding-visual-problems-in-an-account-dashboard/`. Adapt only the useful visual-review concepts from the retained workshop page, provide a realistic themed dashboard fixture with exactly four deliberate visual findings, and reuse the established Exercise presentation and fixture boundary.

## Task 1: Add failing method integration tests

### Files

- Modify: `tests/screen-reader-methods.spec.js`
- Modify: `tests/breadcrumbs.spec.js`
- Modify: `tests/axe-core.spec.js`

### Work

1. Generalize method-test naming where it still implies that every method tests with a screen reader.
2. Expect `Testing visual accessibility` on `/methods/` after keyboard testing and before the four screen-reader methods.
3. Expect the same collection order in Testing methods section navigation.
4. Assert the new route, three-level breadcrumb, exact current-page state, and one visible page heading.
5. Add the route to normal axe coverage.
6. Establish the red baseline before adding content.

### Verification

```sh
npx playwright test tests/screen-reader-methods.spec.js tests/breadcrumbs.spec.js tests/axe-core.spec.js --grep "visual accessibility|method listing|section navigation" --workers 1
```

## Task 2: Create the visual accessibility method

### Files

- Add: `src/content/testing-methods/testing-visual-accessibility.md`

### Work

1. Add published beginner metadata, a 15-minute estimate, browser/developer-tools/contrast-checker tools, and desktop/mobile browser platforms.
2. Position the method between keyboard testing and the screen-reader methods using the existing numeric order convention.
3. Add outcomes for systematic review, contrast measurement, color-only information, readable spacing, interaction-state inspection, and evidence-based reporting.
4. Write `What this method tests`, `What you need`, `Before you start`, an ordered procedure, and `What to observe`.
5. Require checks in every supported theme and relevant default, hover, and focus state.
6. Explain when numeric contrast measurement is required and state the limitations of visual inspection.
7. Use current WCAG terminology accurately without copying the legacy workshop structure.
8. Do not add a demonstration or migrate image alternative-text examples.

### Verification

```sh
npm run astro -- check
npm run build
npx playwright test tests/screen-reader-methods.spec.js --grep "Testing visual accessibility" --workers 1
```

## Task 3: Add failing Exercise and fixture-contract tests

### Files

- Modify: `tests/exercise-architecture.spec.js`
- Add: `tests/visual-account-dashboard-exercise.spec.js`
- Modify: `tests/axe-core.spec.js`

### Work

1. Expect the new Exercise after the keyboard preferences exercise on `/exercises/` and in Exercises section navigation.
2. Assert its route, breadcrumb, current-page state, beginner difficulty, 15-minute estimate, objectives, instructions, workspace, Hints, Solution, and related visual method.
3. Require exactly four expected findings and three progressive hints.
4. Require a named iframe and matching standalone route.
5. Add a normal outer-page axe assertion that maintains the intentional-fixture boundary.
6. Establish the red baseline before creating the fixture and content entry.

### Verification

```sh
npx playwright test tests/exercise-architecture.spec.js tests/visual-account-dashboard-exercise.spec.js --workers 1
```

## Task 4: Create and register the dashboard document fixture

### Files

- Add: `src/components/exercise/fixtures/VisualAccountDashboardFixture.astro`
- Modify: `src/exercises/fixture-registry.ts`

### Work

1. Build a cohesive account dashboard with a visible `h1`, short inspection prompt, return link, account-status area, meaningful multi-line content, and ordinary controls.
2. Use the shared fixture document route rather than duplicating iframe or page-shell behavior.
3. Use Atkinson Hyperlegible and Lab theme classes supplied by the fixture route.
4. Create responsive layout styles that avoid horizontal overflow at narrow widths.
5. Keep unaffected controls semantically correct, keyboard-operable, and visibly focused.
6. Register a stable document-fixture key, accessible iframe title, and four stable intentional-violation identifiers.
7. Confirm the embedded and standalone presentations render the same component.

### Verification

```sh
npm run astro -- check
npm run build
npx playwright test tests/visual-account-dashboard-exercise.spec.js --grep "iframe|standalone|responsive" --workers 1
```

## Task 5: Seed and test exactly four visual findings

### Files

- Modify: `src/components/exercise/fixtures/VisualAccountDashboardFixture.astro`
- Modify: `tests/visual-account-dashboard-exercise.spec.js`

### Work

1. Add one meaningful text target whose computed foreground/background contrast fails the applicable threshold in both themes.
2. Add two or more statuses distinguished only by color, with otherwise identical text treatment and no icon, shape, pattern, or textual state label.
3. Add one meaningful multi-line text block with deliberately cramped line height.
4. Add one operable control whose hover and keyboard-focus treatments are too difficult to distinguish, while preserving activation and avoiding a keyboard trap.
5. Scope every defect to stable fixture targets so tests do not depend on incidental selectors.
6. Programmatically calculate or assert the intended color pairs in both themes rather than relying only on screenshots.
7. Assert the color-only statuses lack another distinguishing cue, the dense block has the intended computed spacing, and the weak-state control remains operable.
8. Scan for and reject unrelated detectable violations beyond the documented fixture boundary.

### Verification

```sh
npx playwright test tests/visual-account-dashboard-exercise.spec.js --grep "contrast|color-only|spacing|interaction state" --workers 1
```

## Task 6: Create the Exercise content entry

### Files

- Add: `src/content/exercises/finding-visual-problems-in-an-account-dashboard.md`

### Work

1. Add published beginner metadata, 15-minute estimate, `find-issues` type, four expected findings, and the registered fixture key.
2. Reference `testing-visual-accessibility` as the related method.
3. Add objectives for systematic theme/state review, contrast measurement, non-color cues, readability, and reproducible evidence.
4. Ask learners to test both themes and relevant interaction states and find exactly four problems.
5. Request affected target, theme/state, expectation, observation, and measurement evidence where relevant.
6. Add the three approved progressive hints without naming the affected elements.
7. Add a collapsed solution with exactly four one-to-one findings, each covering impact, evidence, and remediation direction.
8. Do not mention or seed alternative text, screen-reader output, zoom, reflow, keyboard order, or source inspection.

### Verification

```sh
npm run astro -- check
npm run build
npx playwright test tests/exercise-architecture.spec.js tests/visual-account-dashboard-exercise.spec.js --workers 1
```

## Task 7: Verify shared presentation and theme behavior

### Files

- Modify: `tests/visual-account-dashboard-exercise.spec.js`

### Work

1. Confirm the Exercise reuses the existing full-row Hints and Solution disclosure treatment.
2. Assert full-row hover, complete high-contrast focus outline, native marker, and Enter-key operation without adding exercise-specific disclosure CSS.
3. Set saved light and dark preferences and verify the standalone and embedded fixture palettes.
4. Toggle the parent theme and verify the iframe updates without reloading.
5. Confirm the four deliberate findings remain present and measurable in both themes.
6. Test desktop and narrow viewport widths for page-level overflow and nested-scrolling regressions.

### Verification

```sh
npx playwright test tests/visual-account-dashboard-exercise.spec.js --grep "theme|disclosure|narrow viewport" --workers 1
```

## Task 8: Verify boundaries and legacy preservation

### Files

- Modify: `tests/visual-account-dashboard-exercise.spec.js`
- Modify: `tests/axe-core.spec.js`

### Work

1. Run axe against the method and outer Exercise shell with zero expected violations.
2. Run fixture-specific assertions that account only for the documented deliberate targets and fail on accidental issues.
3. Confirm the iframe title, document title, visible fixture heading, standalone link, and return link.
4. Confirm `/testing-visuals/` remains available and unchanged.
5. Confirm no image assets, alternative-text examples, redirects, schema changes, or new primary-navigation items were introduced.
6. Confirm the keyboard Exercise still renders and behaves unchanged.

### Verification

```sh
npx playwright test tests/visual-account-dashboard-exercise.spec.js tests/axe-core.spec.js --workers 1
git diff -- src/pages/testing-visuals.astro
```

## Task 9: Final validation and visual review

### Work

1. Run Astro type/content validation and build the static site.
2. Run the complete Playwright regression suite.
3. Review the method for accurate, concise, tool-neutral instructions and clear testing limitations.
4. Visually review the embedded and standalone dashboard at desktop and mobile widths in light and dark themes.
5. Exercise default, hover, and keyboard-focus states and confirm only the intended target is weak.
6. Confirm all four problems are discoverable but not disclosed before Hints or Solution.
7. Review the diff for accidental legacy edits, duplicated shared components, unrelated defects, or content outside the approved scope.

### Verification

```sh
npm run astro -- check
npm run build
npx playwright test --workers 1
git diff --check
git status --short
```

## Completion criteria

- The visual method renders at its approved route and appears between keyboard and screen-reader methods.
- The method teaches repeatable visual inspection, appropriate measurement, theme/state coverage, evidence gathering, and method limitations.
- The dashboard Exercise renders at its approved route and follows the same reusable format as the keyboard Exercise.
- Its named iframe and standalone link render one responsive, synchronized Lab-themed fixture.
- The fixture contains exactly the four approved visual findings in both themes and no unrelated deliberate defects.
- Hints remain progressive and the collapsed solution explains exactly four findings.
- Image alternative text remains deferred to the separately identified screen-reader exercise.
- The retained visual workshop page remains unchanged.
- Astro validation, production build, focused behavior tests, accessibility-boundary checks, visual review, and the full regression suite pass.
