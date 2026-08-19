---
title: Testing authentication and verification
summary: Check whether people can sign in and complete verification without unsupported memory, transcription, or recovery barriers.
description: Learn a practical procedure for testing input purposes, password-manager assistance, paste, cognitive tasks, verification, errors, and recovery in authentication flows.
status: published
order: 22
category: interaction-and-tasks
topics: [authentication, verification, cognitive accessibility, passwords, autocomplete, forms, screen readers]
prerequisites:
  - Familiarity with Testing forms and validation
  - Familiarity with Testing controls with a screen reader
  - Basic keyboard and screen-reader operation
skillLevel: intermediate
estimatedMinutes: 30
tools: [Web browser, Keyboard, Screen reader, Browser developer tools, Optional browser autofill or password manager]
platforms: [Desktop, Mobile]
outcomes:
  - Map and test every sign-in, verification, error, retry, and recovery state in an authentication path.
  - Evaluate input purposes, assistance mechanisms, paste, reveal controls, and cognitive-function tests.
  - Record authentication findings without confusing accessibility testing with security assessment.
relatedMethods: [testing-forms-and-validation, testing-controls-with-a-screen-reader, testing-status-messages-and-live-updates, testing-time-limits-and-interruptions]
relatedExercises: [testing-authentication-for-a-community-services-booking]
interpretation:
  - A labelled password field does not by itself prove reliable password-manager support. Inspect its markup and test relevant assistance in the chosen environment.
  - Missing or incorrect autocomplete metadata is evidence about programmatic input purpose, but one browser or password manager result is not universal proof of support or failure.
  - The autocomplete value off does not reliably prove that credential autofill is blocked because user agents may ignore it.
  - Successful paste does not prove that every password manager or one-time-code mechanism works.
  - A password-reveal control can reduce typing difficulty but does not repair blocked paste or every cognitive authentication barrier.
  - An audio transcription alternative to a visual transcription task is still a cognitive-function test.
  - Error handling, status announcements, time limits, and focus behavior retain their own accessibility requirements.
limitations:
  - This method does not assess whether authentication is secure enough for the service's threat model.
  - Do not use real credentials or trigger production lockouts, recovery messages, or verification traffic without authorization and suitable test accounts.
  - This procedure does not exhaustively test every password manager, browser, operating system, WebAuthn method, identity provider, biometric, or hardware token.
  - Object recognition and personal-content exceptions require precise interpretation and may still exclude people.
  - Use the forms, controls, status-message, and time-limit methods for deeper testing of those parts of the workflow.
---

## What this method tests

Authentication can include a username and password, a verification code, a device confirmation, a recovery step, or another way to establish identity. Every step can introduce accessibility barriers before someone reaches the service or task they came to use.

This method checks whether people can complete an existing-user authentication path with available assistance instead of being forced to remember, manipulate, or transcribe information. It also checks field purposes, password reveal, errors, retries, retained information, keyboard use, screen-reader output, and recovery across the complete journey.

## Before you start

Use an authorized test account and a safe environment. Do not use real personal credentials or deliberately trigger production lockouts, recovery messages, rate limits, or security controls unless that work is explicitly authorized.

Record the page or build, browser, operating system, input method, screen reader, password manager or browser autofill, relevant settings, and authentication methods in scope. Separate accessibility testing from penetration testing, identity assurance, privacy review, and other security work.

## Testing procedure

### 1. Map the complete authentication path

List the initial sign-in, verification, invalid-entry, retry, success, timeout, lockout, and recovery states available in the test environment. Include steps that appear only after repeated attempts or on another device.

Identify the task the person is trying to reach. Authentication is not successful if the person signs in but loses the booking, form, purchase, or other context they needed.

### 2. Inspect fields and instructions

Check visible labels, instructions, field types, accessible names, descriptions, required states, and programmatic input purposes. For common credential fields, inspect whether the markup identifies username, current password, new password, and one-time-code purposes appropriately.

Do not infer reliable autofill from labels alone. Also avoid claiming universal failure from one missing attribute or one password manager result. Record the deterministic markup and the behavior you actually observed.

### 3. Test available assistance

Try the browser's credential assistance or an authorized password manager where possible. Check whether fields are recognized, values are inserted into the intended controls, and sign-in remains operable after assistance is used.

Repeat relevant checks after validation errors and when the authentication form is dynamically inserted or divided across steps.

### 4. Test copy and paste

Copy and paste fictional or authorized test values into username, password, verification-code, and recovery fields. Check whether scripts block the paste event, replace the pasted value, split it unexpectedly, or require selected characters to be entered separately.

For one-time codes, determine whether the user can paste the complete code or use a supported automatic-fill or device-mediated mechanism instead of manual transcription.

### 5. Test password reveal

If a reveal control exists, check its accessible name, role, state, keyboard operation, visible focus, and effect on the password field. Confirm that activating it does not move focus unexpectedly or clear, duplicate, or expose the value elsewhere.

Check both directions: revealing and concealing the password. Record privacy or shared-device concerns as context without assuming that the control itself replaces other assistance.

### 6. Identify cognitive-function tests

Look for tasks that require remembering, transcribing, calculating, solving a puzzle, or recognizing information. Check every authentication step, including conditional challenges and recovery.

Determine whether a non-cognitive authentication alternative, a mechanism that assists completion, or a relevant exception is available. An alternative that merely changes visual transcription into audio transcription still requires the same cognitive operation.

### 7. Test verification choices

Where the test environment safely permits it, compare available verification methods. Check whether codes can be pasted or filled automatically, whether device confirmation avoids transcription, and whether the person can select a method suited to their needs.

Record unavailable or untested methods rather than assuming their behavior from the visible interface.

### 8. Trigger errors and retries

Use authorized fictional or test values to trigger invalid and expired states. Check whether the error identifies what happened, suggests a useful next action, retains information that does not need to be re-entered, and preserves the person's place in the authentication journey.

Check focus and screen-reader announcements. Use the dedicated forms and status-message methods when the error behavior needs deeper investigation.

### 9. Check interruption and recovery

Test safe timeout, cancellation, back-navigation, refresh, and return-to-task states when available. Check whether the person can resume without unnecessary repetition and whether the underlying task survives re-authentication.

Use the time-limits method for countdowns, extensions, expiry, and interrupted-task recovery. Do not manufacture lockouts or send real messages merely to complete a checklist.

### 10. Repeat and record

Repeat critical steps with keyboard and screen reader. When feasible, use another relevant browser, password manager, or assistive-technology combination for high-impact findings.

Record the authentication route and state, attempted assistance, cognitive task, available alternative or mechanism, error and recovery behavior, focus, announcement, user impact, environment, limitations, and evidence needed for a retest.

## Record the results

For each finding, include:

- the account task and authentication step;
- the tested environment and authorized test data;
- visible labels, accessible names, field purposes, and relevant markup;
- the attempted paste, autofill, password-manager, or device action;
- any memory, transcription, calculation, puzzle, or recognition requirement;
- available mechanisms, alternatives, and exceptions considered;
- error, retained information, focus, announcement, and recovery behavior;
- the effect on the task the user was trying to reach;
- a remediation direction and retest condition; and
- untested authentication and security work outside scope.

Record passing checks as well as barriers. A useful report distinguishes deterministic implementation evidence from environment-specific behavior and does not turn one successful tool combination into a universal claim.

## Avoid common testing mistakes

- Do not use personal credentials in an exercise, screenshot, recording, or bug report.
- Do not treat a correctly labelled password field as proof that password managers work.
- Do not assume `autocomplete="off"` reliably prevents or permits credential assistance.
- Do not test only the first sign-in screen when verification and recovery add further barriers.
- Do not accept an audio transcription task as a non-cognitive alternative to visual transcription.
- Do not report an accessibility issue as a security vulnerability without appropriate security evidence and ownership.
- Do not trigger production lockouts, messages, or account recovery without authorization.

## Related testing

Use [Testing forms and validation](/methods/testing-forms-and-validation/) for labels, instructions, errors, and retained form data. Use [Testing controls with a screen reader](/methods/testing-controls-with-a-screen-reader/) for reveal controls and authentication choices, [Testing status messages and live updates](/methods/testing-status-messages-and-live-updates/) for asynchronous feedback, and [Testing time limits and interruptions](/methods/testing-time-limits-and-interruptions/) for expiry and re-authentication.
