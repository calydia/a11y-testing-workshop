# Forms and validation method and exercise design

## Goal

Create a reusable Testing method for evaluating forms and validation, together with an interactive Exercise based on a community-course registration form. The method covers the complete testing sequence from understanding the form through invalid submission, error correction, and successful submission.

Use the retained `FormWithErrors` component and workshop pages only as source material. Do not import, edit, delete, redirect, or reproduce their workshop structure.

## Routes and collection placement

Publish:

- `/methods/testing-forms-and-validation/`
- `/exercises/testing-a-community-course-registration-form/`

Place `Testing forms and validation` after `Testing image alternative text` and before the remaining specialized screen-reader methods. Place the Exercise after `Evaluating image alternative text in context`.

Use the existing content collections, dynamic routes, section navigation, breadcrumbs, metadata, Exercise shell, and fixture-only routing. Do not add schema fields or primary-navigation items.

## Testing method

### Purpose

The method teaches a repeatable, tool-neutral procedure for checking whether people can understand, complete, validate, correct, and successfully submit a form.

Keyboard testing and browser inspection form the beginner-friendly baseline. A screen reader is introduced as a separate verification step for names, descriptions, groups, errors, and status announcements. The method links to existing keyboard and automated-testing methods rather than duplicating their full procedures.

### Procedure

The method guides the tester to:

1. Identify the form's purpose, required information, and expected submission outcome.
2. Check every control's accessible name and visible label.
3. Check that instructions, required status, accepted formats, and other constraints are available before submission.
4. Verify that related controls use an appropriate programmatic group and group name.
5. Complete the form with the keyboard, using native control interactions.
6. Submit incomplete or invalid information.
7. Confirm that the failure is clearly communicated.
8. Check where focus moves or remains after invalid submission.
9. Verify that each inline error is programmatically associated with its field and announced by a screen reader.
10. Correct the invalid fields and resubmit.
11. Confirm that successful submission is visibly communicated and exposed to assistive technology.

### Interpretation

The method distinguishes between visible information and programmatic relationships. A label, instruction, error, or confirmation is not sufficient merely because it appears near a control or changes visually.

Passing behavior includes:

- controls with appropriate visible and accessible names;
- instructions and constraints available when the user needs them;
- related choices exposed as a named group;
- errors that identify the affected fields and are programmatically associated with them;
- useful focus handling after failed submission;
- error and success states communicated without relying only on visual changes;
- retained input values so correction does not require unnecessary re-entry.

The method does not prescribe one universal focus strategy. It explains that the appropriate result depends on the form and error presentation, while requiring the user to be made aware of the failure and able to reach the errors efficiently.

### Scope boundaries

This first version does not cover:

- complex custom widgets;
- multi-step forms;
- CAPTCHAs;
- payment and checkout flows;
- file uploads;
- server, timeout, or network failure handling;
- every localization concern;
- a complete repeat of keyboard or automated testing.

## Exercise

### Scenario

Create a beginner `perform-test` Exercise titled `Testing a community-course registration form`, with an estimated duration of 25 minutes and `testing-forms-and-validation` as its related method.

The fixture represents registration for a community course. It uses standard HTML controls and a small client-side validation script. It never sends a network request. User-entered values remain in place after invalid submission so learners can inspect and correct the form.

The learner should:

1. Understand the form and its instructions.
2. Complete it using the keyboard.
3. Deliberately submit incomplete or invalid data.
4. Inspect the error summary, focus position, inline errors, and programmatic relationships.
5. Repeat the relevant checks with a screen reader.
6. Correct the fields and submit successfully.
7. Inspect how the successful state is communicated.

### Intentional findings

The fixture contains exactly six documented findings:

1. One visible label is not programmatically associated with its input.
2. Visible format instructions are not programmatically connected to the relevant field.
3. A related set of course-format choices lacks a programmatic group name.
4. After invalid submission, an error summary appears but focus remains on the submit button.
5. Inline validation errors are not programmatically associated with their fields.
6. After successful submission, the confirmation appears visually but is neither announced nor focused.

The group finding should retain individually labelled native choices; the defect is specifically the missing group relationship and name. The validation script should expose the other failures consistently without introducing missing button names, broken tab order, inaccessible custom controls, low contrast, hidden content, or other unintended defects.

### Correct behavior retained

Keep these aspects intentionally correct:

- logical DOM and keyboard focus order;
- visible focus indicators;
- native text, email, select, radio, checkbox, and button operation;
- valid HTML types and deterministic client-side validation;
- clear visible error text;
- preservation of entered values after invalid submission;
- correction and resubmission;
- responsive layout and Lab theme synchronization.

### Exercise presentation

Reuse the established Exercise structure:

1. purpose and scenario;
2. learning objectives;
3. related Testing method;
4. task instructions;
5. named embedded fixture;
6. standalone fixture fallback;
7. progressive hints;
8. solution with exactly six findings.

The iframe receives a specific accessible name. The standalone fixture includes a return link. Do not redesign iframe sizing or scrolling in this milestone; review that experience across all exercises after the remaining content work.

## Component architecture and behavior

Add one focused `CourseRegistrationFixture.astro` component and one fixture-registry entry. Keep fixture markup, state transitions, validation, and fixture-specific styles within that component.

The form has deterministic states:

- **Initial:** no validation messages are shown.
- **Invalid:** submission displays an error summary and the relevant inline errors while leaving focus on the submit button.
- **Partially corrected:** another submission recalculates the current errors without clearing valid entered data.
- **Successful:** all errors are removed and a visible confirmation replaces or follows the form without receiving focus or live-region semantics.

The successful state is deliberately inaccessible only in its announcement behavior. It remains visible and readable. If learners edit a field after an invalid submission, the fixture may leave the current errors in place until the next submission; live per-keystroke validation is outside this exercise.

Intentional targets should use fixture-specific data attributes so regression tests can distinguish designed defects from accidental ones. These markers are test hooks, not learner-facing explanations.

## Accessibility boundary

The surrounding Exercise page remains trustworthy and should pass its normal automated accessibility scan. The fixture intentionally fails selected manual checks and may produce narrowly documented automated findings. Tests must assert the expected fixture results rather than applying a blanket zero-violation rule to it.

Do not expose fixture-only routes in navigation or listings. Do not use the old `FormWithErrors` component directly because its markup, naming, and behavior are tied to the retained workshop and do not provide the approved interactive validation sequence.

## Testing

Add focused browser tests for:

- method and Exercise routes, metadata, collection order, and relationships;
- the method's expected structure and absence of a demonstration component;
- the fixture's accessible iframe name and standalone fallback;
- exactly six intentional finding markers;
- accessible-name behavior for the disconnected label;
- absence of an accessible description for the format instruction;
- absence of a programmatic name on the course-format group while its individual controls remain labelled;
- invalid submission, visible summary and inline errors, retained values, and focus remaining on the submit button;
- missing programmatic field-to-error associations;
- successful submission and the confirmation's absent focus and announcement semantics;
- correct keyboard operation and visible focus styles for unaffected controls;
- light and dark theme synchronization;
- narrow-viewport usability without unrelated horizontal overflow;
- progressive hints and a six-item solution;
- no unrelated axe violations in the Exercise shell or fixture;
- unchanged legacy `FormWithErrors`, workshop routes, and deferred iframe behavior.

Run the focused tests, the complete Playwright suite, Astro diagnostics, the production build, and `git diff --check`.

## Deferred work

This milestone does not include:

- another forms Exercise;
- multi-step or checkout-form testing;
- an exercise for fixing the implementation;
- changes to the content schema or shared Exercise layout;
- a cross-exercise iframe sizing or scrolling redesign;
- editing, deleting, or redirecting retained legacy content;
- the final pre-launch legacy cleanup.
