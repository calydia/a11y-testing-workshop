# Forms and validation method and exercise implementation plan

## Goal

Publish `Testing forms and validation` and an interactive community-course registration Exercise with exactly six narrowly documented form-semantic and validation findings.

## Task 1: Add failing integration tests

### Files

- Modify: `tests/screen-reader-methods.spec.js`
- Modify: `tests/exercise-architecture.spec.js`
- Modify: `tests/axe-core.spec.js`
- Add: `tests/forms-validation-exercise.spec.js`

### Work

1. Expect the method after image alternative text and before icons/SVGs.
2. Expect the Exercise after the image alternative-text Exercise.
3. Assert routes, metadata, relationships, named iframe, and standalone route.
4. Establish a failing baseline before adding content or fixture code.

## Task 2: Create the Testing method

### Files

- Add: `src/content/testing-methods/testing-forms-and-validation.md`

### Work

1. Add beginner metadata, a 25-minute estimate, and collection order 17.
2. Write the approved end-to-end procedure for names, instructions, groups, invalid submission, errors, correction, and success.
3. Make keyboard and browser inspection the baseline and screen-reader announcements a separate verification step.
4. Explain context-dependent focus handling and the method's explicit scope boundaries.
5. Link to keyboard and automated methods without duplicating them.

## Task 3: Build and register the fixture

### Files

- Add: `src/components/exercise/fixtures/CourseRegistrationFixture.astro`
- Modify: `src/exercises/fixture-registry.ts`

### Work

1. Build a cohesive community-course registration form using standard HTML controls.
2. Implement deterministic initial, invalid, partially corrected, and successful states without network requests.
3. Preserve entered values through invalid submissions.
4. Seed exactly six marked findings: disconnected visible label, disconnected format instruction, unnamed choice group, unchanged focus after invalid submission, unassociated inline errors, and unannounced/unfocused success confirmation.
5. Keep keyboard behavior, focus visibility, contrast, responsive layout, and theme synchronization correct.

## Task 4: Create the Exercise entry

### Files

- Add: `src/content/exercises/testing-a-community-course-registration-form.md`

### Work

1. Add beginner `perform-test` metadata, a 25-minute estimate, order 60, and six expected findings.
2. Reference `testing-forms-and-validation`.
3. Add approved objectives, test procedure, three progressive hints, and a six-item solution.
4. Explain that the form is local and learners should test both invalid and successful submissions.

## Task 5: Pin fixture behavior and accessibility boundaries

### Files

- Complete: `tests/forms-validation-exercise.spec.js`

### Work

1. Assert exactly six intentional markers and the approved accessible-name, description, and grouping failures.
2. Assert invalid submission displays deterministic summary and inline errors, retains values, and leaves focus on the submit button.
3. Assert inline errors lack programmatic field relationships.
4. Correct the form and assert the visible confirmation lacks focus and announcement semantics.
5. Assert unaffected controls remain keyboard-operable and expose visible focus.
6. Pin axe output to documented findings and verify the outer Exercise shell separately.
7. Verify themes, narrow viewport, hints, and six solution sections.

## Task 6: Final verification

1. Run focused content and Exercise integration tests.
2. Run Astro diagnostics and the production build.
3. Run the complete Playwright suite.
4. Visually review the fixture in light/dark themes and desktop/mobile widths.
5. Run `git diff --check` and confirm no legacy form or iframe architecture was changed.

```sh
npx astro check
npm run build
npx playwright test tests/forms-validation-exercise.spec.js tests/screen-reader-methods.spec.js tests/exercise-architecture.spec.js --workers 1
npx playwright test --workers 1
git diff --check
```
