# Modal dialog exercise implementation plan

## Goal

Publish a beginner Exercise for comparing a deliberately incomplete custom ARIA modal with a correctly implemented native `dialog`, then place it directly after its method in the Practical screen-reader testing path.

## Task 1: Pin the content and interaction contract

### Files

- Add: `tests/modal-dialog-exercise.spec.js`
- Modify: `tests/exercise-architecture.spec.js`
- Modify: `tests/screen-reader-methods.spec.js`
- Modify: `tests/learning-path.spec.js`
- Modify: `tests/testing-journey.spec.js`
- Modify: `tests/axe-core.spec.js`

### Work

1. Assert Exercise metadata, objectives, method link, standalone workflow, three hints, and six-item solution.
2. Pin the six custom-modal findings: missing name, unchanged initial focus, escaping focus, interactive background, unsupported Escape, and missing focus restoration.
3. Pin the native comparison's accessible name, modal state, initial focus, containment, inert background, Escape and visible-button closing, and focus restoration.
4. Assert that the fixture exposes no teaching-answer labels and that automated violations are limited to the approved custom-modal consequence.
5. Expect the Exercise in collection order and directly after its method in the Learning path.
6. Expect the revised path and downstream journey durations.

## Task 2: Create and register the account-settings fixture

### Files

- Add: `src/components/exercise/fixtures/AccountSettingsDialogsFixture.astro`
- Modify: `src/exercises/fixture-registry.ts`

### Work

1. Build the approved community-health account-settings page with harmless background controls.
2. Add the custom contact-preferences modal using `role="dialog"`, `aria-modal="true"`, and deliberately incomplete behavior local to the fixture.
3. Add the correctly named appointment-reminder `dialog`, open it with `showModal()`, and rely on native initial-focus, modal, close-request, and restoration behavior.
4. Give both modals equivalent visual presentation without identifying either as correct or broken.
5. Preserve visible hover/focus states, saved theme behavior, and responsive reflow at 390px.

## Task 3: Publish the Exercise

### Files

- Add: `src/content/exercises/testing-modal-dialogs-in-account-settings.md`

### Work

1. Add beginner `find-issues` metadata, a 25-minute estimate, six expected findings, and the modal-dialog method reference.
2. Write the environment-first keyboard and screen-reader comparison workflow.
3. Add three progressive hints and the six approved solution entries.
4. Explain that exact announcements can vary and that the native dialog is a valid platform-behavior comparison.

## Task 4: Integrate the method and Learning path

### Files

- Modify: `src/content/testing-methods/testing-modal-dialogs.md`
- Modify: `src/content/learning-paths/practical-screen-reader-testing.md`

### Work

1. Add `relatedExercises` metadata and a visible method-to-Exercise link.
2. Insert the Exercise immediately after the modal-dialog method.
3. Increase the path estimate from 195 to 220 minutes and update its displayed duration assertions.
4. Revise the path copy that says some methods still lack paired Exercises.
5. Update the conference journey's surfaced path-duration assertion.

## Task 5: Verify

1. Run the focused modal Exercise, method, path, journey, architecture, and axe tests.
2. Run Astro diagnostics and the production build.
3. Run the complete Playwright suite on the default port 4321.
4. Review the Exercise and standalone fixture at desktop/mobile widths in light and dark themes.
5. Verify the native behavior manually in a supported browser without custom focus-management code.
6. Run `git diff --check`.
