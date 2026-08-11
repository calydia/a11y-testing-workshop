# Image alternative text method and exercise implementation plan

## Goal

Publish a dedicated image alternative-text Testing method and a contextual community-volunteering Exercise containing four findings, three valid comparisons, and one deterministic broken-image case.

## Task 1: Add failing integration tests

### Files

- Modify: `tests/screen-reader-methods.spec.js`
- Modify: `tests/exercise-architecture.spec.js`
- Modify: `tests/axe-core.spec.js`
- Add: `tests/image-alternative-text-exercise.spec.js`

### Work

1. Expect the method between page-structure/links and icons/SVGs.
2. Expect the Exercise after the automated/manual Exercise.
3. Assert routes, collection navigation, breadcrumbs, learning structure, named iframe, and standalone route.
4. Establish the failing baseline.

## Task 2: Create the method

### Files

- Add: `src/content/testing-methods/testing-image-alternative-text.md`

### Work

1. Add beginner metadata, 20-minute estimate, and approved order.
2. Write the purpose-first procedure for meaningful, decorative, functional, complex, text-containing, and localized images.
3. Explain missing versus empty alternatives, automated limitations, screen-reader limitations, and broken-image fallback variability.
4. Link to the icons/SVG method without duplicating it.

## Task 3: Create and register the fixture

### Files

- Add: `src/components/exercise/fixtures/ImageAlternativeTextFixture.astro`
- Modify: `src/exercises/fixture-registry.ts`

### Work

1. Build a cohesive community-volunteering page using suitable existing local assets and retained credits.
2. Seed four stable findings: vague meaningful, noisy decorative, unhelpful linked-logo, and missing alternative.
3. Add three valid comparisons: useful meaningful, empty decorative, and useful broken-image fallback.
4. Register one document fixture with stable intentional identifiers.

## Task 4: Create the Exercise entry

### Files

- Add: `src/content/exercises/evaluating-image-alternative-text-in-context.md`

### Work

1. Add beginner `compare` metadata, 20-minute estimate, and four expected findings.
2. Reference the image-alternative method.
3. Add objectives, visual/screen-reader/markup instructions, three hints, four findings, and valid-comparison guidance.

## Task 5: Pin behavior and accessibility boundaries

### Files

- Modify: `tests/image-alternative-text-exercise.spec.js`

### Work

1. Assert exact `alt` presence, absence, and values.
2. Assert image and linked-image accessible names.
3. Assert the broken resource fails to load while retaining its intended accessible name.
4. Assert the empty decorative image has no image role.
5. Pin axe output to documented structural targets only.
6. Verify unaffected links, themes, responsive layout, Hints, Solution, and shell accessibility.

## Task 6: Final verification

1. Run Astro validation and production build.
2. Run focused and complete Playwright suites.
3. Visually review desktop/mobile and light/dark presentation, including broken-image fallback.
4. Confirm legacy pages and iframe behavior remain unchanged.

```sh
npm run astro -- check
npm run build
npx playwright test tests/image-alternative-text-exercise.spec.js --workers 1
npx playwright test --workers 1
git diff --check
```
