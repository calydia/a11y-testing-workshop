---
title: Testing modal dialogs in account settings
summary: Compare an incomplete custom modal with a native dialog while testing naming, focus, background availability, and closing behavior.
description: Practise testing custom and native modal dialogs with a keyboard and screen reader in a focused account-settings page.
status: published
order: 58
category: interaction-and-tasks
topics: [screen readers, modal dialogs, keyboard, focus, ARIA]
prerequisites:
  - Understand the Testing modal dialogs method
difficulty: beginner
estimatedMinutes: 25
exerciseType: find-issues
fixture: account-settings-dialogs
objectives:
  - Identify and compare custom ARIA and native modal-dialog implementations.
  - Check each dialog's accessible name with a screen reader or accessibility inspector.
  - Test initial focus, focus containment, and background availability with a keyboard.
  - Test visible closing controls and Escape behavior.
  - Verify where focus moves after a dialog closes.
  - Distinguish native browser behavior from responsibilities a custom implementation must supply.
methods: [testing-modal-dialogs]
hints:
  - Compare what is announced when each modal opens and note where keyboard focus starts.
  - Move forward and backward through every focusable item, then try a control behind each modal and press Escape.
  - Inspect the contact-preferences dialog's accessible name and compare what happens to focus after each visible close button is used.
expectedFindings: 6
solution:
  summary: The contact-preferences modal contains six related findings. The appointment-reminder dialog is a passing check that preserves the platform's native modal behavior.
  findings:
    - title: The contact-preferences dialog has no accessible name
      explanation: The dialog has a visible heading but does not reference it with aria-labelledby or provide another accessible name. Associate the visible heading with the dialog.
      method: testing-modal-dialogs
    - title: Focus remains on the opener
      explanation: Revealing the custom modal does not move focus inside it. Move focus deliberately to the most suitable element in the dialog when it opens.
      method: testing-modal-dialogs
    - title: Keyboard focus can leave the custom modal
      explanation: Tab and Shift+Tab can move between the dialog and surrounding page. Contain sequential focus within the active custom modal.
      method: testing-modal-dialogs
    - title: Background content remains available
      explanation: Controls behind the custom modal can still receive focus and be activated. Make content outside the active custom modal inert, then restore it when the modal closes.
      method: testing-modal-dialogs
    - title: Escape does not close the custom modal
      explanation: The custom implementation does not handle the conventional Escape close request. Add Escape support while preserving any intentional cancellation logic.
      method: testing-modal-dialogs
    - title: Closing does not restore focus
      explanation: The visible close button hides the custom modal without returning focus to the control that opened it. Remember the invoking element and restore focus when it remains available.
      method: testing-modal-dialogs
---

Use the [Testing modal dialogs](/methods/testing-modal-dialogs/) method to compare the two modal interactions in the account-settings page. Start the exercise from the Exercise workspace.

1. Record your browser, operating system, screen reader, and relevant versions.
2. Open the contact-preferences modal and test its accessible name and initial focus.
3. Move through all controls with Tab and Shift+Tab, then try to reach and operate the page behind it.
4. Test both Escape and the visible close button. Record where focus moves after closing.
5. Repeat the same procedure with the appointment-reminder modal.
6. Identify exactly six findings in the contact-preferences modal and record the appointment-reminder dialog as a passing check.
7. For every finding, record the expected behavior, observed behavior, user impact, and remediation direction.

Exact announcements can differ across screen readers, browsers, and operating systems. Evaluate the exposed name and observable interaction behavior rather than expecting one prescribed speech string.
