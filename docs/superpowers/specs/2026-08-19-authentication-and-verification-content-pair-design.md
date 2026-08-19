# Authentication and verification content-pair design

## Purpose

Add an intermediate Testing method and paired Exercise for evaluating authentication and verification in a realistic web workflow. The pair will teach a practical, user-journey-led procedure through a fictional community-services account used to manage an existing booking.

The pair builds on forms, controls, status messages, time limits, keyboard testing, and screen-reader testing without repeating those methods in full. It remains self-contained for direct visitors and is not added to a Learning path or Testing journey yet.

## Standards basis

The method and Exercise follow current W3C guidance for WCAG 2.2 Accessible Authentication (Minimum) and Identify Input Purpose:

- Every step in a multi-step authentication process needs a path that does not require an unsupported cognitive-function test.
- Password-manager support and copy-and-paste can provide mechanisms that reduce recall and transcription.
- A verification code must be pasteable or automatically fillable when manual transcription would otherwise be required.
- Appropriate input-purpose metadata helps browsers, password managers, and assistive technology recognize username and password fields, but one observed autofill result is not universal proof of support.
- Authentication error handling also needs the ordinary form-testing judgment taught elsewhere in the Lab.

The content explains applicable requirements without becoming a success-criterion-by-success-criterion conformance checklist.

## Testing method

### Identity and metadata

- Title: `Testing authentication and verification`
- Slug: `testing-authentication-and-verification`
- Level: Intermediate
- Category: Interaction and tasks
- Estimated time: 30 minutes
- Status: Published
- Order: 22, after Testing time limits and interruptions
- Related Exercise: `Testing authentication for a community-services booking`

### Prerequisites

- Familiarity with Testing forms and validation
- Familiarity with Testing controls with a screen reader
- Basic keyboard and screen-reader operation

The method links contextually to Testing status messages and live updates and Testing time limits and interruptions where those procedures extend the authentication review.

### Learning outcomes

The method teaches learners to:

- Map every sign-in, verification, retry, and recovery state in the scoped authentication path.
- Test labels, instructions, programmatic input purposes, and compatibility with browser or password-manager assistance.
- Confirm that passwords and verification codes can be copied, pasted, or automatically filled where appropriate.
- Assess password-reveal controls without assuming that hiding or revealing a value is inherently sufficient.
- Identify memory, transcription, calculation, puzzle, and recognition tasks and determine whether a permitted mechanism, exception, or alternative path exists.
- Test errors, retries, retained information, lockouts, time limits, and recovery without conflating all failures with Accessible Authentication.
- Repeat important interactions with keyboard and screen reader and record environment-specific evidence carefully.
- Distinguish an accessibility review from penetration testing, identity assurance, privacy review, and security assessment.

### Procedure

The reusable procedure covers:

1. Define the account task, test account, environment, included authentication methods, and excluded security work.
2. Map the initial sign-in, verification, error, retry, success, timeout, and recovery states that can occur.
3. Inspect visible labels, instructions, field types, accessible names, and autocomplete purposes.
4. Try browser or password-manager assistance without treating one tool's behavior as universal proof.
5. Copy and paste the username, password, and any one-time or verification code.
6. Test password-reveal controls for name, state, keyboard operation, focus stability, and unintended disclosure.
7. Identify every cognitive-function test in every authentication step and evaluate mechanisms, alternatives, and relevant exceptions.
8. Trigger invalid, expired, repeated, and successful states where the test environment safely supports them.
9. Check error identification, recovery guidance, retained input, focus, announcements, retry limits, and preservation of the underlying task.
10. Repeat critical interactions with keyboard and screen reader, then record findings, passing checks, limitations, and untested security or platform behavior.

### Interpretation boundaries

- A labelled password field does not by itself prove reliable password-manager support.
- Missing or incorrect autocomplete metadata is evidence about programmatic input purpose; actual browser and password-manager behavior still needs observation.
- `autocomplete="off"` is not reliable evidence that autofill has been blocked because user agents may ignore it for credentials.
- A successful paste test does not prove that every password manager or one-time-code mechanism works.
- A password-reveal control can reduce typing difficulty but does not repair blocked paste or every cognitive authentication barrier.
- An audio transcription alternative to a visual transcription task is still a cognitive-function test.
- Object recognition and personal-content exceptions need precise interpretation and may still exclude people.
- Error messages, live announcements, timeouts, and focus behavior retain their own accessibility requirements.
- Accessibility testing does not assess whether authentication is secure enough for the service's threat model.

### Records and limitations

The learner records:

- tested URL or build, browser, operating system, assistive technology, password manager or browser autofill, and relevant settings;
- authentication route and state;
- field purpose, visible and accessible labels, and observed assistance;
- attempted copy, paste, autofill, or device-mediated action;
- cognitive task, available mechanism or alternative, and user impact;
- error, retained information, focus, announcement, and recovery behavior;
- passing checks, untested methods, environment variation, and security work outside scope.

The method cautions against using real credentials or testing production lockouts and recovery paths without authorization.

## Exercise

### Identity and metadata

- Title: `Testing authentication for a community-services booking`
- Slug: `testing-authentication-for-a-community-services-booking`
- Level: Intermediate
- Category: Interaction and tasks
- Estimated time: 35 minutes
- Type: Perform test
- Expected findings: Five
- Order: 67, after Testing session timeout in a community-support application
- Fixture key: `community-services-authentication`

The Exercise references only the new authentication method as its required method. Existing forms, controls, status-message, and time-limit methods are recommended background rather than additional Exercise methods.

### Scenario and privacy boundary

The learner tests a fictional sign-in flow for an existing community-services booking. The workspace clearly states before the form that:

- all account, booking, password, and verification details are fictional;
- nothing entered is submitted, stored, or retained;
- the interaction runs only in the current page and resets on reload;
- real credentials must not be entered.

The fixture performs no network requests and writes nothing to local storage, session storage, cookies, IndexedDB, or external services.

### Workspace flow

The deterministic two-step interface contains:

1. A booking summary with a short fictional booking reference.
2. An email and password sign-in form that accepts any non-empty fictional values.
3. A working password-reveal control that exposes a useful name and pressed state, retains focus, and returns the field to its concealed state on reset.
4. A verification step where the booking summary and reference are no longer visible.
5. A simulated message containing a six-character verification code that can be selected or copied.
6. Fields for the remembered booking reference and verification code.
7. An invalid-verification path that returns to sign-in, clears entered values, and displays weak recovery guidance.
8. A successful state reached with the documented fictional reference and verification code.
9. A reset control that returns every field, message, reveal state, and step to a stable starting state.

No real authentication, booking modification, account creation, password recovery, timeout, lockout, or security validation occurs.

### Five controlled findings

1. **Input purposes are not identified appropriately.** The email field omits `autocomplete="username"`, and the existing-password field uses `autocomplete="new-password"` instead of `current-password`. The finding concerns deterministic markup and compatibility risk, not a claim that every password manager must fail.
2. **Password paste is blocked.** A paste handler prevents inserting a fictional password, forcing manual entry and blocking a common assistance mechanism.
3. **Verification-code paste is blocked.** The code is visible and copyable in the simulated message, but the verification field prevents pasting the complete code and does not provide an automatic-fill mechanism.
4. **Verification requires unsupported memory and transcription.** The learner must recall and re-enter the site-provided booking reference after it disappears, with no non-cognitive alternative or assistance mechanism.
5. **The failed-verification path impedes recovery.** It returns the user to the first step, clears all entered values, and provides a generic failure message without identifying what can be corrected or how to continue.

The fifth finding is evaluated through the broader authentication journey and form-recovery procedure. It is not presented as automatically belonging to Accessible Authentication (Minimum).

### Passing comparisons

The workspace also includes:

- native, programmatically labelled fields;
- logical keyboard order and visible focus;
- a password field concealed by default;
- a named, stateful, keyboard-operable password-reveal control that preserves focus;
- visible step headings and concise instructions;
- a selectable and copyable simulated verification message;
- a successful completion state;
- a keyboard-operable deterministic reset;
- explicit fictional-data and no-storage guidance.

Passing checks are discoverable through testing but are not labelled as answers in the fixture.

### Learner task and support

The Exercise asks learners to:

1. Read the method and prepare a browser, keyboard, screen reader, and optional browser autofill or password manager.
2. Read the privacy boundary and use only fictional values.
3. Open the standalone workspace in the same tab.
4. Map both authentication steps and establish the visible behavior.
5. Inspect field purposes and try copy, paste, reveal, keyboard, and screen-reader interactions.
6. Complete successful and failed verification attempts and assess retained information and recovery.
7. Record five findings, useful passing checks, tested environment, and limitations.
8. Return to the Exercise for progressively more specific hints or the closed solution.
9. Reset between runs when a stable starting state is needed.

Three hints progress from trying assistance mechanisms, to comparing both authentication steps, to inspecting autocomplete values, paste handlers, disappearing information, and the failed-state transition.

The closed solution contains exactly five entries matching the controlled findings. Each entry explains observed behavior, impact, evidence, relevant requirement boundaries, and flexible remediation direction.

## Content relationships

- The method and Exercise link to each other through collection references.
- The method links contextually to forms, controls, status messages, and time limits where their procedures extend the review.
- The Exercise uses one required method so the learner's primary task remains clear.
- The pair appears in the Interaction and tasks groups on the Methods and Exercises listings and in their shared section navigation.
- Existing Learning-path steps, Testing-journey methods, stages, estimates, workspaces, and recommendations remain unchanged.
- A later curriculum review may add the pair deliberately after considering prerequisites and total path duration.

## Components and state

- Add a dedicated `CommunityServicesAuthenticationFixture.astro` component.
- Register it under `community-services-authentication` in the existing fixture registry.
- Keep all state inside the fixture document and use native controls wherever an intentional defect does not require script behavior.
- Prevent paste only on the password and verification-code fields and leave email and booking-reference paste available for comparison.
- Use bounded event listeners without timers, external requests, or persistence.
- Reset field values, validation text, current step, reveal state, and focus destination deterministically.
- Do not add a new generic authentication component or broaden the fixture registry API.

## Accessibility requirements

- All defects are intentional, documented, and limited to the five controlled findings.
- The outer Exercise page, hints, solution, navigation, and workspace-launch link remain accessible.
- Non-defective fixture controls have useful names, native roles, visible focus, adequate contrast, and keyboard operation.
- Step changes update the visible heading and move focus only when the workflow changes context, following the existing forms and status-message guidance.
- Error content is visible and programmatically exposed even though its wording and recovery support are deliberately insufficient.
- The password-reveal control uses text rather than an icon-only implementation and announces its state.
- Dark and light themes, narrow viewports, zoom, and text wrapping remain usable.
- Deliberate paste prevention never affects the rest of the site or real user data.

## Verification

Focused tests will cover:

- Method metadata, outcomes, procedure, interpretation boundaries, limitations, related methods, Exercise relationship, category, level, estimate, order, and listing/navigation presence
- Exercise metadata, objectives, one required method, hints, expected finding count, solution entries, category, level, estimate, order, and listing/navigation presence
- Privacy notice and prohibition on real credentials
- No form action, fetch call, external request, or browser-storage access
- Stable initial state and deterministic reset
- Appropriate native labels and approved passing keyboard/focus behavior
- Password reveal name, pressed state, field type, focus retention, and reset
- Missing or incorrect autocomplete values as authored
- Password and verification-code paste prevention, with comparison fields still accepting paste
- Booking-reference disappearance and lack of an alternative mechanism
- Failed-verification clearing and weak recovery guidance
- Successful completion with fictional test values
- No answer leakage from the fixture
- Existing Learning paths and Testing journeys remain unchanged apart from any dynamic listing or total-reference output that intentionally derives from published collections
- Axe coverage for the method and Exercise shells, with documented fixture defects excluded only where necessary
- Astro diagnostics, production build, focused browser tests, complete Playwright suite, and `git diff --check`

## Out of scope

- Real accounts, credentials, authentication, bookings, submissions, storage, email, SMS, or device notifications
- Account creation, password reset, account recovery, lockout, session timeout, or re-authentication implementation
- Security testing, threat modelling, penetration testing, identity assurance, or privacy compliance
- Exhaustive testing of password managers, browsers, mobile operating systems, WebAuthn, OAuth, biometrics, or hardware tokens
- CAPTCHA galleries, object-recognition exercises, or every Accessible Authentication exception
- Adding the pair to a Learning path or Testing journey
- Rewriting the existing forms, controls, status-message, or time-limit methods
