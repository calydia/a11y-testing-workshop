# Keyboard testing a preferences form exercise implementation plan

## Goal

Publish the first Exercise at `/exercises/keyboard-testing-a-preferences-form/`. Deliver a realistic communication-preferences form through a named document-fixture iframe and standalone fallback route, seed exactly four keyboard-only defects, and preserve the rest of the fixture and Lab shell as an accessible baseline.

## Task 1: Add failing Exercise route and integration tests

### Files

- Modify: `tests/exercise-architecture.spec.js`
- Add: `tests/keyboard-preferences-form-exercise.spec.js`
- Modify: `tests/axe-core.spec.js`

### Work

1. Assert `/exercises/` lists `Keyboard testing a preferences form` instead of the empty state.
2. Assert `/exercises/keyboard-testing-a-preferences-form/` renders successfully with one page heading.
3. Assert its breadcrumb is `Home / Exercises / Keyboard testing a preferences form`.
4. Assert the Exercises section navigation contains the entry and identifies it as the exact current page.
5. Assert the page exposes beginner difficulty, 15-minute estimate, objectives, instructions, workspace, hints, and solution controls.
6. Assert the iframe and standalone fixture route do not exist yet, establishing the red baseline.
7. Add an outer-page axe scan that does not treat intentional fixture defects as Lab-shell failures.

### Verification

```sh
npx playwright test tests/exercise-architecture.spec.js tests/keyboard-preferences-form-exercise.spec.js --workers 1
```

## Task 2: Create and register the document fixture

### Files

- Add: `src/components/exercise/fixtures/KeyboardPreferencesFormFixture.astro`
- Modify: `src/exercises/fixture-registry.ts`

### Work

1. Build a cohesive communication-preferences form with a visible `h1`, short keyboard-only instruction, and a return link to the Exercise.
2. Use self-contained responsive styles, strong baseline focus indicators, and `prefers-color-scheme` support.
3. Give every non-defective native form control a visible associated label.
4. Group related choices with `fieldset` and `legend`.
5. Prevent actual form navigation or reload while preserving native keyboard behavior.
6. Register the fixture under a stable key such as `keyboard-preferences-form` as a `document` fixture.
7. Set the registered title to `Communication preferences form exercise`.
8. Record stable identifiers for the four intentional defects in `intentionalViolations`.

### Verification

```sh
npm run astro -- check
npm run build
```

## Task 3: Seed and test the four intentional keyboard defects

### Files

- Modify: `src/components/exercise/fixtures/KeyboardPreferencesFormFixture.astro`
- Modify: `tests/keyboard-preferences-form-exercise.spec.js`

### Work

1. Add a visible click-only control that is not in sequential focus order.
2. Add a custom control with appropriate button semantics and `tabindex="0"` that responds to pointer clicks but not `Enter` or `Space`.
3. Remove the visible focus indicator from one otherwise operable control, scoped only to that target.
4. Add deterministic positive `tabindex` values that make a small subset of controls receive focus before the visually first form control.
5. Test each seeded behavior directly:
   - the skipped control never receives focus during the sequence;
   - the custom control receives focus but keyboard activation does not change its state;
   - pointer activation does change the custom control's state;
   - the no-indicator target has no visible outline or replacement;
   - the positive-tabindex controls appear first in the seeded order.
6. Confirm the return link and unaffected native controls remain keyboard operable.
7. Do not add a hard keyboard trap.

### Verification

```sh
npx playwright test tests/keyboard-preferences-form-exercise.spec.js --grep "intentional|focus|activation|order" --workers 1
```

## Task 4: Add the iframe fallback presentation

### Files

- Modify: `src/components/exercise/ExerciseFixture.astro`
- Modify: `tests/keyboard-preferences-form-exercise.spec.js`

### Work

1. Keep inline-fixture rendering unchanged.
2. For document fixtures, derive one fixture URL from the registry key.
3. Render `Open exercise in a new page` as a normal link before the iframe.
4. Render the iframe with the registered title and the same fixture URL.
5. Give the iframe a responsive width and sufficient minimum height for the form at common desktop sizes.
6. Confirm the link does not force a new window.
7. Confirm both embedded and standalone presentations use the same fixture implementation.

### Verification

```sh
npm run astro -- check
npx playwright test tests/keyboard-preferences-form-exercise.spec.js --grep "iframe|new page|standalone" --workers 1
```

## Task 5: Create the Exercise content entry

### Files

- Add: `src/content/exercises/keyboard-testing-a-preferences-form.md`

### Work

1. Add published beginner metadata with `exerciseType: find-issues`, 15-minute estimate, and four expected findings.
2. Reference `testing-keyboard-accessibility` in the `methods` field.
3. Point `fixture` to the stable registry key rather than a component path.
4. Add objectives for systematic keyboard navigation, operation testing, focus assessment, and reproducible reporting.
5. Write concise instructions that ask visitors to find four problems without identifying the affected controls.
6. Add the three approved progressive hints.
7. Add a collapsed solution with exactly four findings, each describing reproduction, impact, and a broad correction.
8. Do not add label-association, screen-reader, source-inspection, or workshop-answer findings.

### Verification

```sh
npm run astro -- check
npm run build
npx playwright test tests/exercise-architecture.spec.js tests/keyboard-preferences-form-exercise.spec.js --workers 1
```

## Task 6: Verify accessibility boundaries and legacy preservation

### Files

- Modify: `tests/keyboard-preferences-form-exercise.spec.js`
- Modify: `tests/axe-core.spec.js`

### Work

1. Run axe against the Exercise instructions and shell while excluding only the embedded fixture document from the zero-violation expectation.
2. Run a fixture-specific scan and filter only rules directly caused by documented intentional targets; fail on unexpected violations.
3. Confirm the iframe title, standalone link, fixture document title, visible `h1`, and return link.
4. Confirm narrow-screen layouts do not introduce page-level horizontal overflow.
5. Confirm the Exercise solution lists exactly four findings.
6. Confirm `FormWithErrors.astro`, the legacy keyboard route, and `answers.astro` remain unchanged.

### Verification

```sh
npx playwright test tests/keyboard-preferences-form-exercise.spec.js tests/axe-core.spec.js --workers 1
git diff -- src/components/FormWithErrors.astro src/pages/testing-keyboard-accessibility.astro src/pages/answers.astro
```

## Task 7: Final verification and hands-on review

### Work

1. Run Astro type and content validation.
2. Build the production site and confirm both the Exercise and fixture routes are generated.
3. Run the complete Playwright suite.
4. Manually traverse the iframe and standalone fixture using only the keyboard.
5. Confirm all four findings are discoverable, deterministic, and not disclosed before hints or solution.
6. Confirm iframe entry and exit remain manageable and the standalone route provides a practical fallback.
7. Review the diff for accidental extra defects, duplicated fixture markup, legacy edits, schema changes, or unrelated content.

### Verification

```sh
npm run astro -- check
npm run build
npx playwright test --workers 1
git diff --check
git status --short
```

## Completion criteria

- The first published Exercise appears at the approved route and on `/exercises/`.
- Its instructions ask visitors to apply Testing keyboard accessibility and find exactly four problems.
- A named iframe and normal full-page fallback link render the same registered fixture.
- The fixture has exactly the four approved keyboard defects and no hard trap.
- Non-defective controls, return navigation, and the Lab shell remain keyboard operable.
- Hints are progressive and the collapsed solution explains exactly four findings.
- Intentional defects are narrowly isolated from automated accessibility expectations.
- Legacy workshop content remains unchanged.
- Astro validation, production build, focused behavior tests, axe boundaries, and the complete Playwright suite pass.
