# Time limits and interruptions content-pair design

## Goal

Publish a beginner Testing method and paired Exercise that teach people to assess session time limits, warnings, extensions, expiry, data preservation, reauthentication, and save-and-return alternatives through one realistic community-support application.

The pair must remain useful to visitors who arrive directly, complement the existing forms, modal-dialog, keyboard, and motion material without duplicating it, and state clearly that the practice application does not submit, store, or retain anything entered.

## Public content

### Testing method

Create `Testing time limits and interruptions` at `/methods/testing-time-limits-and-interruptions/` as a beginner Testing method with collection order `21` and an estimated duration of 25 minutes. Require only basic keyboard navigation and basic use of one screen reader.

The method covers:

1. identifying inactivity, reading, interaction, authentication, and completion time limits;
2. recording the initial state, trigger, total duration, warning point, and usable time remaining;
3. checking whether a limit can be turned off, adjusted, or extended where required;
4. testing warning discovery, visible communication, announcements, focus, and keyboard operation;
5. checking whether repeated extensions are available when the product permits them;
6. testing whether completed work and current position survive expiry and reauthentication;
7. evaluating a save-and-return alternative and the information it gives the user;
8. recording essential exceptions, environmental limitations, and follow-up testing;
9. separating a time-limit accessibility problem from an ordinary network or performance delay.

The method must distinguish time limits from automatically moving content, media duration, and general performance. It must not imply that every timer is prohibited. Direct learners to the existing forms, keyboard, modal-dialog, and motion methods where a complete review of those adjacent topics is needed.

### Exercise

Create `Testing session timeout in a community-support application` at `/exercises/testing-session-timeout-in-a-community-support-application/` as a beginner, 30-minute, perform-test Exercise with collection order `65`. It uses the new method as its only primary method and links back to that method through the existing collection relationship. Its fixture key is `community-support-session-timeout`.

The Exercise instructions must tell learners before they open the workspace that:

- the application is fictional practice material;
- nothing entered is submitted, stored, or retained;
- reloading or resetting removes all entered information;
- learners must use fictional sample information only.

The Exercise asks learners to complete representative application steps, observe the automatic demonstration, reproduce warning and expiry states with assisted controls, test recovery, record six findings, retain useful passing checks, and document limitations of accelerated timing.

### Learning path

Add the method and Exercise to `Your first accessibility review` after `Testing forms and validation` and its Exercise. Forms teach ordinary initial, invalid, and successful states first; the new pair then extends that knowledge to interrupted completion, expiry, and recovery.

Increase the Learning-path estimate from 475 to 530 minutes. Keep the path beginner-level and retain its existing self-contained structure. Do not add the pair to `Practical screen-reader testing`.

Do not change any existing Testing journey. A future transactional journey may apply the method when its scenario genuinely contains session expiry.

## Standalone workspace

Create a fictional multi-step community-support application as a standalone Exercise workspace. It must not submit requests, make network calls, use authentication, persist form values, write application state to local or session storage, or request sensitive or identifying information.

A visible notice before the application states:

> This is a fictional practice application. Nothing you enter is submitted, stored, or retained. Reloading or resetting the workspace removes all entered information.

Use only fictional, low-risk fields such as a support category, preferred appointment period, and free-text note that explicitly asks for sample information. Do not request names, contact details, addresses, financial information, health information, account passwords, or real circumstances.

The application has enough steps to establish meaningful interrupted progress without becoming a form-design Exercise. Native form controls, labels, instructions, step identification, and ordinary next and previous actions are passing comparisons.

## Assisted timing controls

Place a clearly labelled `Testing controls` panel outside the fictional service interface. It provides four native buttons:

1. `Start short automatic demonstration`;
2. `Show session warning`;
3. `Expire session`;
4. `Reset application`.

The panel explains that it accelerates otherwise slow states for practice and does not reproduce production timing. The manual warning and expiry controls must invoke the same application state transitions used by the automatic demonstration rather than separate mock states.

The short automatic demonstration must be deterministic, bounded, and safe. It reaches the warning within five seconds, runs a five-second visible countdown, and expires without requiring a long wait. Reset cancels every outstanding timer and restores the first step, empty fields, initial application message, closed dialog, and stable focus.

## Controlled findings

Seed exactly six findings. The Exercise solution may disclose them, but the standalone workspace, its markup, and its Testing controls must not reveal finding labels, counts, diagnostic names, or answers.

### 1. Warning appears too late

The warning leaves too little usable time to understand the interruption and choose an action. The method teaches learners to record both the total limit and the meaningful time remaining rather than judging only whether a warning exists.

### 2. Countdown is announced too frequently

The countdown uses a live announcement that updates every second. The visible countdown is useful, but repeated full announcements can overwhelm or interrupt screen-reader use. The implementation must stop all announcements when the warning closes, the session expires, or the workspace resets.

### 3. Extending is not keyboard operable

The custom `Extend session` control works with pointer activation but is absent from sequential keyboard navigation and does not respond to Enter or Space. Other warning actions use native, keyboard-operable controls as passing comparisons.

### 4. Focus is restored to an unrelated location

The warning itself uses a correctly named native modal dialog with proper background inertness and containment. After the user extends or otherwise closes it, focus moves to an unrelated page location rather than the control or task context from which the interruption occurred.

### 5. Expiry discards entered information

When the session expires, the application clears completed fields and its in-memory progress. The expiry message communicates that the session ended but does not preserve the person's work.

### 6. Reauthentication loses the interrupted position

The fictional reauthentication step uses a simple `Continue` button and never requests credentials. Continuing returns the user to the empty first step rather than restoring the interrupted step and preserved work.

## Passing comparisons

Include these intentional passing behaviors:

- a visible and programmatically useful privacy/practice notice;
- ordinary native form controls with useful labels and instructions;
- correctly named current steps and logical previous and next actions;
- a native modal dialog with a useful accessible name and message;
- modal focus containment and background inertness;
- visibly displayed remaining time;
- a native keyboard-operable warning action distinct from the broken extension control;
- a keyboard-accessible `Save and finish later` option;
- a save-later confirmation that clearly says the action is simulated and nothing was saved;
- a deterministic reset that clears all in-memory values and timers;
- light and dark theme support and useful narrow-width presentation.

Do not build a complete corrected version of the application. Passing comparisons clarify expected categories of behavior without giving learners a side-by-side answer key.

## State model

Keep the state local to the fixture component and its page lifecycle. The required states are:

- current application step;
- in-memory field values held by the rendered controls;
- timer status: idle, running, warning, expired, or saved;
- remaining demonstration seconds;
- currently scheduled timer handles;
- the element or task context active before the warning.

All transitions must be idempotent enough for repeated practice. Starting the demonstration twice must not duplicate timers. Showing the warning twice must not duplicate dialogs or announcements. Expiring after expiry must not add repeated messages. Reset must always return to the same initial document state.

No application state may survive a reload. The existing Lab theme preference may continue to use its established saved-theme mechanism; that theme setting is outside the fictional application data promise.

## Architecture

Use the established standalone Exercise structure:

- one content entry in `src/content/testing-methods/`;
- one content entry in `src/content/exercises/`;
- one dedicated fixture component in `src/components/exercise/fixtures/`;
- one fixture-registry entry;
- the existing generated standalone fixture route;
- shared method, Exercise, breadcrumb, navigation, solution, and theme components.

Keep the timer and application behavior in the dedicated fixture component. Do not introduce framework hydration, a shared timer service, authentication infrastructure, persistence, external requests, or unrelated component refactoring.

## Solution and hints

Provide three progressive hints:

1. inspect when the warning becomes available and what a keyboard user can operate;
2. listen to the countdown and follow focus after warning actions;
3. enter sample information, force expiry, continue through the simulated sign-in, and compare the returned state and position.

The closed solution contains exactly six finding sections in the same conceptual order as the controlled findings. Each finding explains the current behavior, user impact, evidence to record, and flexible remediation direction. It must not prescribe one universal timeout duration or claim that one exact announcement schedule suits every context.

## Testing boundaries

Focused Playwright tests must verify:

- method and Exercise metadata, order, relationship links, hints, and six solution findings;
- the privacy promise on both the Exercise page and standalone workspace;
- absence of submissions, storage writes, external requests, credential fields, and sensitive-data prompts;
- all Testing controls and their shared transition functions;
- automatic timing is short, deterministic, bounded, and non-duplicating;
- warning timing and visible countdown;
- per-second live-region changes and their cleanup;
- pointer activation but no sequential keyboard or Enter/Space operation for extension;
- native dialog naming, containment, background inertness, and deliberately unrelated focus restoration;
- field and step loss after expiry and the return to step one after simulated reauthentication;
- save-later keyboard operation and explicit no-save confirmation;
- reset behavior from running, warning, expired, and saved states;
- passing native controls and visible focus;
- expected axe results without unrelated violations;
- saved Lab theme behavior, narrow-width fit, and unique element IDs;
- absence of answer leakage in fixture markup;
- Learning-path placement, revised total duration, collection navigation, breadcrumbs, central axe coverage, and production build.

The Exercise must describe accelerated timing as a learning aid. Browser automation demonstrates deterministic application behavior, not the usability of real production durations or every screen-reader announcement pattern.

## Out of scope

- Production authentication, accounts, session storage, databases, network requests, or submissions.
- Real personal, contact, financial, health, eligibility, or password data.
- CAPTCHAs, payments, file uploads, server failures, or network recovery.
- A complete forms, modal-dialog, keyboard, screen-reader, or motion audit.
- Hazardous flashing, long waits, or an unbounded timer.
- A complete corrected application or side-by-side answer implementation.
- Changes to existing Testing journeys or the focused screen-reader Learning path.
- Exhaustive WCAG mapping or a conformance claim.
