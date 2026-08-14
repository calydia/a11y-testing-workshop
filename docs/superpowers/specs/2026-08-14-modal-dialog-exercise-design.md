# Modal dialog exercise design

## Goal

Create a beginner Exercise that follows `Testing modal dialogs` and gives learners focused practice comparing a custom ARIA modal with a correctly implemented native `dialog` modal.

The Exercise belongs at the end of `Practical screen-reader testing`. The custom modal contains realistic authoring failures. The native modal preserves the browser's built-in modal behavior and serves as a valid comparison rather than another source of findings.

## Published content

Create the Exercise at:

`/exercises/testing-modal-dialogs-in-account-settings/`

Use:

- title: `Testing modal dialogs in account settings`;
- difficulty: beginner;
- estimated time: 25 minutes;
- Exercise type: `find-issues`;
- primary method: `testing-modal-dialogs`;
- expected findings: exactly six.

The objectives are to:

1. identify and compare custom ARIA and native modal-dialog implementations;
2. check each dialog's accessible name with a screen reader or accessibility inspector;
3. test initial focus, sequential focus containment, and background availability with a keyboard;
4. test visible closing controls and Escape behavior;
5. verify where focus moves after a dialog closes;
6. distinguish browser-provided native behavior from responsibilities that custom implementations must supply.

## Learner workflow

The authored instructions ask the learner to:

1. record the browser, operating system, screen reader, and relevant versions;
2. open the standalone account-settings workspace;
3. test the custom contact-preferences modal first using the keyboard and a screen reader;
4. test its accessible name, initial focus, Tab and Shift+Tab sequence, background availability, Escape behavior, visible close button, and focus position after closing;
5. repeat the same procedure with the native appointment-reminder modal;
6. identify exactly six findings in the custom modal and record the native modal as a valid comparison;
7. record observed behavior instead of relying on one prescribed announcement.

The Exercise must explain that browser, assistive-technology, and platform output can differ. The expected findings concern exposed semantics and observable interaction behavior, not exact speech strings.

## Standalone fixture

Create a standalone fixture at:

`/exercise-fixtures/account-settings-dialogs/`

The fixture represents a compact account-settings page for a community health service. It contains:

- a return link to the Exercise;
- a page heading and brief testing context;
- harmless background account controls and links that make background availability testable;
- an `Edit contact preferences` button opening a custom ARIA modal;
- a `Review appointment reminder` button opening a native `dialog` modal;
- concise content and multiple controls inside each modal so forward and reverse focus movement can be tested.

Both modals use the same visual treatment, visible close controls, and realistic account-settings content. Visual similarity prevents the answer from being revealed by styling.

## Custom ARIA modal

Implement the custom modal with a `div` carrying `role="dialog"` and `aria-modal="true"`. Opening and closing may toggle `hidden`, but the implementation deliberately omits the additional behavior required to make a custom modal work correctly.

It contains all six intentional findings:

### 1. The dialog has no accessible name

The modal includes a visible heading but does not associate it through `aria-labelledby` or provide another accessible name.

Remediation direction: reference the visible heading with `aria-labelledby`.

### 2. Focus does not move into the dialog when it opens

Activating the opener reveals the modal but leaves focus on the opener in the background.

Remediation direction: deliberately move focus to the most suitable element inside the dialog when opening it.

### 3. Keyboard focus is not contained

Tab and Shift+Tab can move between dialog content and the surrounding page.

Remediation direction: contain sequential focus within the custom modal while it is open.

### 4. Background content remains interactive

The page behind the custom modal is neither inert nor otherwise made unavailable.

Remediation direction: make content outside the active custom modal inert and restore it when the modal closes.

### 5. Escape does not close the dialog

No keyboard handler implements the conventional close request for the custom modal.

Remediation direction: support Escape while preserving any intentional cancellation logic.

### 6. Closing the dialog does not restore focus

The visible close button hides the custom modal without returning focus to the element that opened it. When the close button held focus, focus consequently falls back elsewhere rather than returning to the opener.

Remediation direction: remember the invoking element and restore focus to it when the custom modal closes, when that element remains available.

These findings are intentionally related because they commonly result from treating `role="dialog"` and `aria-modal="true"` as a complete modal implementation. Do not add unrelated form, validation, contrast, link-purpose, or heading-structure defects.

## Native dialog comparison

Implement the appointment-reminder modal with a native `dialog` element opened through `showModal()`. It is a fully valid comparison and must have:

- an accessible name associated with its visible heading;
- a sensible initial-focus target selected through native dialog focusing, using `autofocus` only when the content makes an explicit target preferable;
- native modal containment and background inertness;
- native Escape close-request behavior;
- a visible close control using a native dialog-closing mechanism;
- native focus restoration to its opener after closing.

Do not add custom focus trapping, background inertness, Escape handling, or focus-restoration code to the native modal. Do not manually remove its `open` attribute. Use `close()`, `requestClose()`, or `form method="dialog"` as appropriate so the built-in close behavior remains intact.

The native modal is not one of the findings. Its purpose is to let learners observe which modal behaviors the platform provides when `dialog` and `showModal()` are used correctly.

## Visual and interaction design

Use the established standalone-fixture conventions:

- Atkinson Hyperlegible typography;
- light and dark themes consistent with existing fixtures;
- a restrained account-settings layout with bordered sections;
- identical modal surfaces and backdrops for both examples;
- existing button hover and whole-control keyboard-focus styling;
- responsive single-column presentation without horizontal page scrolling at 390px.

The custom overlay must be visually modal without preventing pointer or keyboard interaction with the background. The native `dialog::backdrop` should visually match it closely. The visual design must not label either implementation as broken, correct, custom, or native on the fixture page; the distinct action names provide stable references without revealing the solution.

## Hints and solution

Provide three progressive hints:

1. compare what is announced when each modal opens and note where keyboard focus starts;
2. move forward and backward through every focusable item, then try a control behind each modal and press Escape;
3. inspect the custom dialog's accessible name and compare what happens to focus after each visible close button is used.

The solution lists the six custom-modal findings above. It explicitly identifies the native dialog as a valid comparison and explains that its naming is authored while initial focus, background inertness, containment, close requests, and focus restoration are supplied by the platform when the element is used correctly.

## Method and Learning path integration

Update `Testing modal dialogs` to link visibly to the new Exercise and reference it through `relatedExercises` metadata.

Update `Practical screen-reader testing` so the Exercise follows `Testing modal dialogs` immediately. Preserve all preceding method-and-Exercise pairs.

Increase the Learning path estimate from 195 minutes to 220 minutes, displayed as approximately 3 hours 40 minutes. Any journey card or related surface that derives and displays this path's duration must reflect 220 minutes.

Remove or revise the current statement that some remaining methods lack Exercises because every method in this Learning path will then have a paired Exercise.

## Architecture

Add the account-settings fixture component to the existing Exercise fixture registry and render it through the shared standalone fixture route. Reuse `ExerciseLayout`, `StandaloneExercisePanel`, Exercise hints and solution components, breadcrumbs, section navigation, theme persistence, and collection helpers.

Keep the deliberately incomplete custom-dialog script local to the fixture component. Use neutral, content-oriented data attributes where browser tests need stable targets. Do not expose labels such as `finding`, `broken`, `problem`, `answer`, or `solution` in rendered fixture markup.

## Validation

Add focused Playwright coverage that asserts:

- Exercise metadata, objectives, method link, standalone workflow, three hints, and six-item solution;
- the custom modal is exposed as a dialog without an accessible name;
- opening the custom modal leaves focus on its opener;
- Tab and Shift+Tab can reach background controls while it is open;
- background controls remain operable;
- Escape leaves the custom modal open;
- its visible close button hides it without restoring focus to the opener;
- the native dialog has the authored accessible name;
- opening it invokes native modal state and places focus at the intended in-dialog target;
- native sequential focus remains inside it and the background is inert;
- Escape and the visible close control close it;
- both native close paths restore focus to the opener;
- button hover and whole-control keyboard-focus styles remain visible;
- saved theme and 390px responsive behavior work;
- the standalone fixture's automated accessibility results contain only findings that are unavoidable consequences of the six approved custom-modal defects;
- the method links to the Exercise;
- the Learning path places the Exercise directly after the method and shows 220 minutes as approximately 3 hours 40 minutes;
- related journey surfaces display the updated duration where applicable;
- the outer Exercise page passes axe.

Run Astro diagnostics, the production build, focused Exercise, method, Learning path, journey, architecture, and accessibility tests, the complete Playwright suite, visual review in light/dark and desktop/mobile conditions, and `git diff --check`.

## Out of scope

- changing the existing modal-dialog Testing method demonstration;
- changing the legacy screen-reader example route;
- changing the community-conference journey modal or its deliberate findings;
- adding light-dismiss behavior or testing the `closedby` attribute;
- testing alert dialogs, nested dialogs, non-modal dialogs, popovers, or destructive confirmations;
- requiring one exact screen-reader announcement;
- adding form validation, live-region, contrast, zoom, reflow, language, image, icon, SVG, page-structure, or link-purpose defects;
- implementing fixes inside the deliberately problematic custom modal.
