# Visual exercise contrast refinement implementation plan

## Goal

Move the intentionally low-contrast account note to approximately 2:1 contrast in both fixture themes and guard the intended range with focused tests.

## Task 1: Tighten the contrast contract

### Files

- Modify: `tests/visual-account-dashboard-exercise.spec.js`

### Work

1. Require the computed account-note contrast in each theme to be at least 1.9:1 and at most 2.15:1.
2. Run the focused test and confirm the current colors fail the new upper bound.

## Task 2: Apply the approved fixture colors

### Files

- Modify: `src/components/exercise/fixtures/VisualAccountDashboardFixture.astro`

### Work

1. Set the light account-note color to `#b2b2b2`.
2. Set the dark account-note color to `#40404a`.
3. Leave every other fixture target and style unchanged.

## Task 3: Verify

1. Run the focused visual-dashboard Exercise suite.
2. Confirm axe still reports only the intentional account-note contrast violation.
3. Visually inspect the account note in both themes.
4. Run Astro validation and the complete Playwright suite.

```sh
npm run astro -- check
npx playwright test tests/visual-account-dashboard-exercise.spec.js --workers 1
npx playwright test --workers 1
git diff --check
```
