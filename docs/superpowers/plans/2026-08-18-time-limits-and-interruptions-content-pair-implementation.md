# Time limits and interruptions content-pair implementation plan

## Goal

Publish a beginner Testing method and paired standalone Exercise for session warnings, extension, expiry, work preservation, reauthentication, and save-and-return alternatives, then add the pair to the end of `Your first accessibility review` without changing existing Testing journeys.

## Task 1: Pin the content graph and privacy contract

### Files

- Create: `tests/time-limits-and-interruptions-exercise.spec.js`
- Modify: `tests/screen-reader-methods.spec.js`
- Modify: `tests/exercise-architecture.spec.js`
- Modify: `tests/learning-path.spec.js`
- Modify: `tests/testing-journey.spec.js`
- Modify: `tests/axe-core.spec.js`

### Work

1. Add failing assertions for `/methods/testing-time-limits-and-interruptions/`, its beginner metadata, 25-minute estimate, prerequisites, procedure, interpretation boundaries, limitations, and related Exercise.
2. Add failing assertions for `/exercises/testing-session-timeout-in-a-community-support-application/`, its beginner metadata, 30-minute estimate, perform-test type, three hints, six closed solution findings, method relationship, and standalone workflow.
3. Pin method collection order `21` after icons and SVGs and before language changes while preserving all existing relative order.
4. Pin Exercise collection order `65` after the community-course registration Exercise.
5. Assert that both the Exercise page and standalone workspace state that nothing entered is submitted, stored, or retained and that reset or reload removes entered information.
6. Pin the new pair after the forms pair in `Your first accessibility review`, including its exact 23-step sequence and revised 530-minute total.
7. Update dynamic recommended-path duration expectations from 475 to 530 minutes without changing any existing journey's methods, stages, difficulty, estimate, or deliverables.
8. Add only the learner-facing method and Exercise routes to central zero-violation axe coverage; verify the deliberately defective workspace through its focused boundary.

## Task 2: Publish the Testing method

### Files

- Create: `src/content/testing-methods/testing-time-limits-and-interruptions.md`

### Work

1. Add published beginner metadata, order `21`, a 25-minute estimate, keyboard and screen-reader prerequisites, appropriate tools and platforms, the related Exercise, interpretation guidance, and explicit limitations.
2. Explain inactivity, reading, interaction, authentication, and completion limits and distinguish them from movement, media duration, ordinary response time, and general performance.
3. Explain when limits may be turned off, adjusted, extended, or essential without claiming that every timer is prohibited or prescribing one universal duration.
4. Write an environment-first procedure covering trigger and total duration, warning timing, usable remaining time, discovery, visible communication, announcements, focus, keyboard operation, repeated extensions, expiry, reauthentication, data preservation, current-position recovery, and save-and-return alternatives.
5. Require evidence that records application state, timing, action, expected and actual behavior, user impact, support limitations, remediation direction, and follow-up testing.
6. Link to the existing keyboard, forms, modal-dialog, and motion methods for complete reviews of those adjacent areas without making them hard prerequisites.
7. State that accelerated Exercise timing is a learning aid and cannot establish whether a real production duration is usable.

## Task 3: Publish the Exercise and solution

### Files

- Create: `src/content/exercises/testing-session-timeout-in-a-community-support-application.md`

### Work

1. Add published beginner metadata, order `65`, a 30-minute estimate, `perform-test` type, fixture key `community-support-session-timeout`, one method reference, and exactly six expected findings.
2. Put the privacy and practice boundary before the workspace instructions: fictional sample information only; no submission, storage, retention, accounts, or real service action.
3. Guide learners through initial inspection, representative sample entry, automatic demonstration, assisted warning and expiry controls, keyboard and screen-reader checks, simulated reauthentication, save-later behavior, reset, evidence recording, and limitations.
4. Add three progressive hints covering warning timing and keyboard operation, countdown announcements and focus, and state/position recovery after expiry.
5. Add exactly six closed solution entries for late warning, excessive countdown announcements, pointer-only extension, unrelated focus restoration, discarded entered information, and lost interrupted position after simulated reauthentication.
6. For every finding, explain actual behavior, user impact, evidence, and flexible remediation without prescribing one universal timeout or announcement interval.
7. Identify the privacy notice, native form controls, named steps, native dialog boundary, visible remaining time, ordinary warning action, save-later action, and deterministic reset as passing comparisons.

## Task 4: Create and register the standalone fixture

### Files

- Create: `src/components/exercise/fixtures/CommunitySupportSessionTimeoutFixture.astro`
- Modify: `src/exercises/fixture-registry.ts`

### Work

1. Build a fictional multi-step community-support application with a return link, visible practice/privacy notice, introductory step context, low-risk sample fields, logical native previous and next buttons, and a clearly separate Testing controls panel.
2. Use only a support category, preferred appointment period, and sample-note field. Do not request names, contact details, addresses, financial or health data, eligibility facts, passwords, or real circumstances.
3. Add the exact notice: `This is a fictional practice application. Nothing you enter is submitted, stored, or retained. Reloading or resetting the workspace removes all entered information.`
4. Provide native Testing controls named `Start short automatic demonstration`, `Show session warning`, `Expire session`, and `Reset application` plus an explanation of accelerated timing.
5. Add one correctly named native modal dialog with visible remaining time, a live countdown message, the pointer-only custom `Extend session` control, and at least one native keyboard-operable alternative action.
6. Add an expired state with a simple simulated reauthentication `Continue` button that requests no credentials.
7. Add a native `Save and finish later` action whose visible confirmation says it is a simulation and nothing was saved.
8. Register the fixture as a document fixture titled `Community support session-timeout exercise` with exactly six intentional-violation identifiers matching the approved findings.
9. Preserve the standalone return route, existing saved Lab theme behavior, visible focus for passing controls, responsive presentation, unique IDs, and no unrelated axe violations.

## Task 5: Implement one deterministic timing state machine

### Files

- Complete: `src/components/exercise/fixtures/CommunitySupportSessionTimeoutFixture.astro`

### Work

1. Keep current step, control values, timer status, remaining seconds, timer handles, and pre-warning task context local to the fixture page lifecycle.
2. Implement shared transition functions for `start demonstration`, `show warning`, `tick countdown`, `extend`, `expire`, `continue after simulated sign-in`, `save`, and `reset`.
3. Make the automatic demonstration show the warning within five seconds, then run a five-second countdown to expiry.
4. Make assisted warning and expiry controls call the same transition functions as the automatic sequence.
5. Prevent repeated start or warning actions from creating duplicated timers, dialogs, messages, or listeners.
6. Stop and clear every timer when the warning closes, the session expires, the work is saved, the page unloads, or reset runs.
7. Ensure reset closes the dialog, clears sample values, restores step one and the initial message, cancels timers, removes expiry and save confirmations, and moves focus to a stable reset result or application heading.
8. Keep application data in memory only. Do not submit forms, call `fetch`, navigate to external routes, or write application values or state to `localStorage`, `sessionStorage`, cookies, IndexedDB, or another persistence mechanism.

## Task 6: Seed and verify the six controlled findings

### Files

- Complete: `tests/time-limits-and-interruptions-exercise.spec.js`
- Complete: `src/components/exercise/fixtures/CommunitySupportSessionTimeoutFixture.astro`

### Work

1. Verify the warning begins with exactly five seconds remaining, making the short demonstration's warning deliberately late while remaining quick to test.
2. Verify the visible countdown and live announcement update once per second through the warning and stop after close, expiry, save, or reset.
3. Verify pointer activation extends the session, while the custom extension control is skipped by sequential focus and does not respond to Enter or Space.
4. Verify `showModal()` provides modal containment and background inertness, then verify extension deliberately moves focus to the Testing controls heading rather than the interrupted application control or step.
5. Enter representative sample information, advance beyond the first step, expire the session, and verify the entered values and step state are discarded.
6. Activate the credential-free simulated reauthentication action and verify it returns to the empty first step rather than the interrupted position.
7. Verify ordinary native fields and navigation remain keyboard operable, the dialog has a useful accessible name and visible remaining time, and the native warning action works.
8. Verify `Save and finish later` works with a keyboard and shows both `This is a simulation` and `Nothing was saved` without persisting values.
9. Reset from running, warning, expired, and saved states and verify the same deterministic initial state every time.
10. Assert the fixture contains no answer-revealing finding count, diagnostic labels, solution terms, or intentional-violation identifiers in rendered markup.

## Task 7: Integrate collection order and the Learning path

### Files

- Modify: `src/content/learning-paths/your-first-accessibility-review.md`
- Modify later method order values only if exact collection ordering requires it.

### Work

1. Append the new method and Exercise after the forms and validation pair while preserving the existing checkpoint and every prior step.
2. Increase `estimatedMinutes` from 475 to 530, which renders as `About 8 hours 50 minutes`.
3. Update the path summary, description, topics, and relevant outcomes to include session warnings, time limits, interrupted completion, and recovery without implying full authentication or transaction testing.
4. Update the path introduction or closing scope only where necessary to describe the new pair accurately; do not rewrite stable guidance.
5. Preserve `Practical screen-reader testing` unchanged.
6. Preserve all three Testing journeys' authored methods, stages, estimates, and workspaces. Update only dynamically rendered recommended-preparation duration text where tests pin it.
7. Verify method and Exercise listings, section navigation, related-content links, breadcrumbs, homepage relationships, and sitemap generation include the new routes in authored order.

## Task 8: Complete project verification

### Work

1. Run the focused time-limit, method-listing, Exercise-listing, Learning-path, journey, architecture, breadcrumb, navigation, and central axe tests on the default port `4321` under Node.js 24.
2. Run Astro diagnostics and the production build.
3. Run the complete Playwright suite.
4. Review the method, Exercise, and standalone workspace at desktop and mobile widths in light and dark themes.
5. Manually run automatic warning-to-expiry, assisted warning, assisted expiry, extension, simulated reauthentication, save-later, and reset flows with keyboard and pointer input.
6. Inspect browser storage and network activity to confirm that application values are never submitted, stored, or retained and that only the established Lab theme preference may be read.
7. Confirm countdown announcements terminate, repeated controls do not duplicate timers, reload starts cleanly, and no long-running timer survives navigation.
8. Verify all public routes are present in the sitemap and no standalone fixture route is exposed through section listings or search metadata.
9. Run `git diff --check`, inspect the final diff for unrelated changes, and confirm all existing content pairs and journeys remain stable.

## Out of scope

- Production authentication, accounts, credentials, sessions, databases, submissions, storage, or network requests.
- Real names, contact details, addresses, financial information, health information, eligibility details, passwords, or personal circumstances.
- CAPTCHAs, payments, file uploads, server errors, network recovery, or full multi-step form validation.
- A complete keyboard, forms, modal-dialog, motion, or screen-reader audit.
- Hazardous flashing, long waits, real production durations, or unbounded timers.
- A corrected duplicate application or side-by-side answer key.
- Changes to existing Testing journeys or `Practical screen-reader testing`.
- Exhaustive WCAG mapping, legal advice, or a conformance claim.
