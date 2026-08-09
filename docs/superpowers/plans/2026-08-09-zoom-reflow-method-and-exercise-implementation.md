# Zoom and reflow method and exercise implementation plan

## Goal

Publish `Testing zoom and reflow` and a matching appointment-booking Exercise with exactly four deterministic resize/reflow defects, while preserving all retained legacy content.

## Task 1: Add failing integration tests

### Files

- Modify: `tests/screen-reader-methods.spec.js`
- Modify: `tests/exercise-architecture.spec.js`
- Modify: `tests/breadcrumbs.spec.js`
- Modify: `tests/axe-core.spec.js`
- Add: `tests/zoom-reflow-appointment-exercise.spec.js`

### Work

1. Expect the method after visual testing and before screen-reader methods.
2. Expect the Exercise after the visual dashboard Exercise.
3. Assert routes, listing order, section navigation, breadcrumbs, learning structure, named iframe, and standalone route.
4. Establish the failing baseline.

## Task 2: Create the method

### Files

- Add: `src/content/testing-methods/testing-zoom-and-reflow.md`

### Work

1. Add published beginner metadata and the approved order.
2. Write separate 200% text-resizing and 320 CSS-pixel reflow procedures.
3. Cover incremental checks, exceptions, browser differences, evidence, interpretation, and limitations.
4. Avoid outdated CSS-unit claims and browser-specific workshop instructions.

## Task 3: Create and register the fixture

### Files

- Add: `src/components/exercise/fixtures/ZoomAppointmentBookingFixture.astro`
- Modify: `src/exercises/fixture-registry.ts`

### Work

1. Build a cohesive themed appointment-booking page with operable baseline controls.
2. Register one document fixture with four stable intentional-target identifiers.
3. Seed the fixed panel, unbreakable reference, fixed-height clipping, and fixed-action overlap defects only.

## Task 4: Create the Exercise entry

### Files

- Add: `src/content/exercises/testing-an-appointment-booking-at-high-zoom.md`

### Work

1. Add beginner, 20-minute, four-finding metadata and the visual test procedure.
2. Reference the zoom/reflow method.
3. Add objectives, instructions, three hints, and four solution findings.

## Task 5: Test rendered conditions

### Files

- Modify: `tests/zoom-reflow-appointment-exercise.spec.js`

### Work

1. Assert page overflow at 320 CSS pixels.
2. Assert the confirmation reference exceeds its available width.
3. Apply a test-only 200% root text-size override and assert appointment-card clipping.
4. Assert fixed action-bar intersection at the narrow condition.
5. Confirm unaffected controls remain operable, themes synchronize, and no unrelated axe failures appear.

## Task 6: Final verification and handoff

1. Run Astro validation and production build.
2. Run focused and complete Playwright suites.
3. Visually inspect desktop/mobile and light/dark states.
4. Confirm `/testing-zooming/` is unchanged.
5. Write the end-of-day continuation summary.

```sh
npm run astro -- check
npm run build
npx playwright test tests/zoom-reflow-appointment-exercise.spec.js --workers 1
npx playwright test --workers 1
git diff --check
```
