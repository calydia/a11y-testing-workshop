# Authentication and verification content-pair implementation plan

## Goal

Publish an intermediate Testing method and paired Exercise for evaluating a fictional community-services authentication and verification flow with five controlled findings and explicit privacy boundaries.

## Task 1: Add failing content and relationship tests

### Files

- Add: `tests/authentication-verification-exercise.spec.js`
- Modify: `tests/axe-core.spec.js`
- Modify: `tests/exercise-architecture.spec.js`
- Modify: `tests/screen-reader-methods.spec.js`

### Work

1. Assert method metadata, category, level, estimate, order, outcomes, procedure, interpretation boundaries, limitations, related methods, and related Exercise.
2. Assert Exercise metadata, category, difficulty, estimate, order, objectives, one required method, three hints, five solution findings, fixture key, and reciprocal relationship.
3. Assert both routes appear in Interaction and tasks listings and section navigation.
4. Pin existing Learning-path and Testing-journey authored content so the pair does not enter either curriculum automatically.
5. Add the new method and Exercise shells to Axe coverage.

## Task 2: Add the Testing method

### Files

- Add: `src/content/testing-methods/testing-authentication-and-verification.md`

### Work

1. Add published intermediate metadata, a 30-minute estimate, Interaction and tasks category, and order 22.
2. Add prerequisites, outcomes, tools, platforms, interpretation guidance, limitations, related methods, and the paired Exercise reference.
3. Write the practical ten-step procedure covering scope, states, input purpose, assistance mechanisms, paste, reveal controls, cognitive tests, errors, recovery, keyboard, screen reader, and evidence.
4. Explain WCAG boundaries without presenting a conformance checklist or security assessment.
5. Warn against real credentials and unauthorized production testing.

## Task 3: Add the Exercise content

### Files

- Add: `src/content/exercises/testing-authentication-for-a-community-services-booking.md`

### Work

1. Add published intermediate metadata, a 35-minute estimate, perform-test type, Interaction and tasks category, order 67, and the fixture key.
2. Link only the new authentication method as the required procedure.
3. Add objectives, privacy and safety guidance, a task-led workflow, evidence prompts, three progressive hints, and exactly five solution entries.
4. Separate intended findings from valid passing comparisons and environment limitations.
5. State that nothing is submitted, stored, or retained and prohibit real credentials.

## Task 4: Build and register the standalone fixture

### Files

- Add: `src/components/exercise/fixtures/CommunityServicesAuthenticationFixture.astro`
- Modify: `src/exercises/fixture-registry.ts`

### Work

1. Build a two-step fictional sign-in and verification interface using native controls.
2. Provide deterministic fictional reference and verification-code values.
3. Implement the five controlled defects: inappropriate autocomplete purposes, blocked password paste, blocked code paste, unsupported memory/transcription task, and destructive weak recovery.
4. Implement valid labels, visible focus, logical order, password reveal, instructions, success state, and deterministic reset.
5. Move focus appropriately when the workflow changes step while retaining focus for password reveal.
6. Keep all state in the current document with no form endpoint, fetch, timers, storage, cookies, or external requests.
7. Support light and dark themes, narrow viewports, zoom, and text wrapping.

## Task 5: Verify fixture behavior and isolation

### Files

- Modify: `tests/authentication-verification-exercise.spec.js`

### Work

1. Assert the privacy notice, fictional-data boundary, and absence of submission or persistence.
2. Assert initial state, step changes, correct and incorrect verification, successful completion, and reset.
3. Assert autocomplete markup and paste prevention on only the intended fields.
4. Assert booking-reference disappearance and lack of an alternative mechanism.
5. Assert destructive failed recovery and weak guidance.
6. Assert password reveal name, pressed state, field type, focus retention, and reset.
7. Assert native labels, visible focus, comparison paste behavior, themes, and narrow viewport fit.
8. Assert fixture text does not leak the five answers.

## Task 6: Complete regression verification

1. Run the focused authentication, architecture, navigation, and Axe tests.
2. Run Astro diagnostics and the production build.
3. Run the complete Playwright suite.
4. Run `git diff --check` and inspect the scoped diff.

## Out of scope

- Real authentication, account creation, password recovery, network calls, or persistence
- Security, privacy-compliance, or penetration testing
- Adding the pair to a Learning path or Testing journey
- Broad changes to existing forms, controls, status-message, or time-limit content
- New schemas, routes, categories, or fixture-registry behavior
