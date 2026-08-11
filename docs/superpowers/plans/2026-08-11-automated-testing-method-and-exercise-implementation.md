# Automated testing method and exercise implementation plan

## Goal

Publish `Testing with automated tools` and a matching event-registration Exercise containing exactly three expected automated detections and two human-review findings.

## Task 1: Add failing integration tests

### Files

- Modify: `tests/screen-reader-methods.spec.js`
- Modify: `tests/exercise-architecture.spec.js`
- Modify: `tests/axe-core.spec.js`
- Add: `tests/automated-manual-findings-exercise.spec.js`

### Work

1. Expect the new method after zoom/reflow and before the screen-reader methods.
2. Expect the new Exercise after the zoom appointment Exercise.
3. Assert routes, collection navigation, breadcrumbs, learning structure, named iframe, and standalone route.
4. Establish the failing baseline before adding content.

## Task 2: Create the method

### Files

- Add: `src/content/testing-methods/testing-with-automated-tools.md`

### Work

1. Add beginner metadata, 20-minute estimate, tool-neutral wording, and the approved collection order.
2. Write setup, scan, verification, classification, reporting, rerun, and manual follow-up procedures.
3. Explain limitations without retaining percentage claims or preferred-product lists.
4. Present markup validation as complementary rather than conformance proof.

## Task 3: Create and register the event fixture

### Files

- Add: `src/components/exercise/fixtures/AutomatedEventRegistrationFixture.astro`
- Modify: `src/exercises/fixture-registry.ts`

### Work

1. Build a cohesive themed event-registration experience with an accessible baseline.
2. Seed the unlabelled email input, unnamed icon button, and low-contrast helper text.
3. Seed the click-only session control and ambiguous repeated links.
4. Register the document fixture with five stable intentional identifiers.

## Task 4: Create the Exercise entry

### Files

- Add: `src/content/exercises/comparing-automated-and-manual-findings.md`

### Work

1. Add beginner, 20-minute, five-finding metadata.
2. Reference the automated-tools method.
3. Add objectives, scan/classification/manual-review instructions, three hints, and five solution findings.

## Task 5: Pin automated and manual contracts

### Files

- Modify: `tests/automated-manual-findings-exercise.spec.js`

### Work

1. Assert the exact axe rules and intended targets in both themes.
2. Assert pointer activation but no keyboard reach or activation for the custom control.
3. Assert repeated links share an accessible name but use different destinations.
4. Confirm unaffected controls remain keyboard-operable.
5. Verify themes, responsive layout, shell accessibility, Hints, and Solution.

## Task 6: Final verification

1. Run Astro validation and production build.
2. Run focused and complete Playwright suites.
3. Visually review desktop/mobile and light/dark rendering.
4. Confirm `/testing-automated-tools/` is unchanged.

```sh
npm run astro -- check
npm run build
npx playwright test tests/automated-manual-findings-exercise.spec.js --workers 1
npx playwright test --workers 1
git diff --check
```
