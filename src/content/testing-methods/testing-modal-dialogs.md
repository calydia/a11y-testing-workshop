---
title: Testing modal dialogs
summary: Test modal names, initial focus, keyboard containment, background inertness, closing behavior, and focus restoration.
description: Learn a repeatable keyboard and screen-reader procedure for testing modal dialogs.
status: published
order: 40
category: interaction-and-tasks
topics: [modals, dialogs, keyboard, screen readers, focus]
prerequisites: [Keyboard navigation, Basic use of one screen reader]
skillLevel: beginner
estimatedMinutes: 25
tools: [Keyboard, Screen reader, Web browser]
platforms: [Desktop]
outcomes:
  - Check a dialog's accessible name and description.
  - Test initial focus and focus containment in both directions.
  - Verify closing behavior, background inertness, and focus restoration.
relatedExercises: [testing-modal-dialogs-in-account-settings]
demonstration: screen-reader/modal-dialogs
interpretation:
  - Opening a modal should move focus to a meaningful element inside it and announce enough context to identify the dialog.
  - Tab and Shift+Tab should remain within the active modal while background content is unavailable.
  - Every supported close action should restore focus to the control that opened the modal.
limitations:
  - Native dialog behavior differs between browser and screen-reader combinations, especially on older versions.
  - A short keyboard test does not establish that focus starts on the best element for every dialog task.
---

## What this method tests

This method checks whether a modal behaves as a temporary, self-contained interaction for keyboard and screen-reader users.

## What you need

Use a keyboard first, then repeat the procedure with a screen reader. Test with a browser and assistive-technology combination supported by the product.

## How to perform the test

1. Focus the control that opens the modal and activate it.
2. Confirm that focus moves inside the modal and lands on a meaningful element.
3. Listen for the dialog role, accessible name, and any useful description.
4. Press Tab through every focusable element, then continue once more to confirm focus wraps within the modal.
5. Repeat in reverse with Shift+Tab.
6. Try to navigate to or operate background content while the modal remains open.
7. Close the modal using its visible control and confirm focus returns to the opener.
8. Reopen it, press Escape when that behavior is supported, and check focus restoration again.

## What to observe

Watch for focus remaining behind the overlay, escaping into the page, disappearing after close, or returning to an unrelated location. Listen for dialogs announced without a name or with excessive duplicated descriptions.
