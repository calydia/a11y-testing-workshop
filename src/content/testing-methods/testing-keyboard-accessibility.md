---
title: Testing keyboard accessibility
summary: Check whether every interactive element can be reached, identified, and operated with a keyboard in a logical sequence.
description: Learn a repeatable procedure for testing keyboard operability, focus order, focus visibility, bypass mechanisms, and keyboard traps.
status: published
order: 5
topics: [keyboard, focus, operability, navigation]
prerequisites:
  - Basic familiarity with links, buttons, and form controls
skillLevel: beginner
estimatedMinutes: 15
tools: [Keyboard, Web browser]
platforms: [Desktop]
outcomes:
  - Perform a systematic keyboard review without relying on a pointer.
  - Identify failures in reachability, operation, focus order, focus visibility, and focus movement.
  - Record keyboard findings with reproducible key sequences and expected results.
interpretation:
  - An interactive element that cannot receive keyboard focus cannot be operated by a keyboard user.
  - Reachability alone is not enough; the element must respond to the expected keys and expose a visible focus indicator.
  - Focus order should follow the meaning and operation of the page rather than jumping unpredictably between regions.
  - Focus must not become trapped unless a defined interaction intentionally contains it and provides a clear way to leave.
  - A useful finding identifies the element, the keys pressed, the expected result, and the observed result.
limitations:
  - Keyboard operability does not prove that controls have correct roles, names, states, or screen-reader output.
  - Browser and operating-system settings can change which elements receive Tab focus, so distinguish configuration from page defects.
  - Complex widgets must be compared with the keyboard interaction pattern documented for that widget.
  - Use the dedicated modal-dialog method for a complete check of modal focus containment and restoration.
  - Mobile keyboards, switch control, voice control, and other alternative input methods are outside this baseline desktop procedure.
---

## What this method tests

This method checks whether people can reach and operate a page's interactive content with a keyboard, follow a meaningful focus sequence, see which element has focus, and leave every interaction they enter.

## What you need

Use a physical keyboard or an equivalent keyboard input with a desktop browser. Know the expected keyboard behavior of common native controls such as links, buttons, text fields, checkboxes, radio groups, and select elements.

## Before you start

Load the page from a predictable starting point and place focus at the beginning of the document. During the test, avoid using a mouse, trackpad, or touchscreen to reach or operate controls.

Browser and operating-system settings can affect which elements receive focus when you press `Tab`. Confirm the relevant keyboard-navigation settings before reporting missing focus as a page defect.

## How to perform the test

1. Press `Tab` repeatedly and record every element that receives focus. Confirm that you can reach all links, buttons, form controls, and other interactive content.
2. Press `Shift` + `Tab` to move backwards through the same controls. Check that reverse navigation works and does not skip or reveal unexpected elements.
3. Operate representative links with `Enter`. Operate native buttons with both `Enter` and `Space`.
4. Test form controls with their expected keys. For example, use `Space` with checkboxes and use arrow keys within radio groups and other native controls that support them.
5. Complete every available action and task without switching to a pointer. Include controls that appear after expanding navigation, disclosures, or other dynamic content.
6. Check that focus order follows the page's meaning and operation. Watch for jumps into unrelated regions, movement behind overlays, or controls reached in a confusing sequence.
7. Check the focus indicator on every control and against each background where it appears. Focus must remain visually identifiable as you move through the page.
8. Enter and leave every interactive component. Confirm that focus does not become trapped and does not disappear or return to an unrelated place.
9. Check for a skip link or another practical way to bypass repeated blocks when the page contains them.
10. If the page provides shortcuts triggered by a single letter, number, punctuation mark, or symbol, confirm that users can turn them off, remap them, or limit them to the relevant component where required.
11. For each failure, record the element, starting position, keys pressed, expected result, and observed result so another person can reproduce it.

For overlays, also follow [Testing modal dialogs](/methods/testing-modal-dialogs/) to check initial focus, focus containment, Escape behavior, background inertness, and focus restoration in detail.

## What to observe

Look for controls that never receive focus, controls that receive focus but cannot be operated, focus indicators that disappear against some backgrounds, and focus movement that does not match the page's visual or logical sequence.

Also watch for focus entering hidden content, becoming trapped, moving behind an open overlay, or disappearing after content updates. A test passes only when the complete task remains understandable and operable from the keyboard—not merely when pressing `Tab` produces some movement.
