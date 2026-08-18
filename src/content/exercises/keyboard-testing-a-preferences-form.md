---
title: Keyboard testing a preferences form
summary: Investigate a communication-preferences form and find four problems that affect keyboard access, operation, focus order, or focus visibility.
description: Practise systematic keyboard accessibility testing with a deliberately flawed communication-preferences form.
status: published
order: 10
category: foundations
topics: [keyboard, focus, forms, operability]
prerequisites:
  - Understand the Testing keyboard accessibility method
difficulty: beginner
estimatedMinutes: 15
exerciseType: find-issues
fixture: keyboard-preferences-form
objectives:
  - Navigate a form systematically in both directions without using a pointer.
  - Test whether visible controls can be reached and operated with expected keys.
  - Assess focus order and visible focus throughout a task.
  - Record keyboard findings with reproducible key sequences.
methods: [testing-keyboard-accessibility]
hints:
  - Compare the visible control sequence with the sequence that receives focus.
  - Try both Enter and Space on anything that looks or announces itself as a button.
  - Watch the page rather than only counting Tab presses; one control loses its visible focus treatment.
expectedFindings: 4
solution:
  summary: The form contains four deliberately created keyboard accessibility problems.
  findings:
    - title: Preview preferences is skipped
      explanation: The visible Preview preferences control responds to pointer clicks but is not in the sequential focus order. A keyboard user cannot reach or operate it. Use a native button, or provide equivalent semantics, focusability, and keyboard activation when a native element cannot be used.
    - title: Delivery frequency cannot be activated with a keyboard
      explanation: The custom Delivery frequency control receives focus and identifies itself as a button, but Enter and Space do nothing. Its click behavior needs equivalent keyboard activation; using a native button would provide that behavior automatically.
    - title: Delivery help loses its focus indicator
      explanation: The Show delivery help button works with the keyboard, but its focus outline and replacement focus styles are removed. Keep the browser focus indicator or provide a clearly visible custom indicator against every background where the control appears.
    - title: Positive tabindex values change the focus order
      explanation: Save preferences and Email address receive focus before controls that appear earlier in the page. Remove positive tabindex values and arrange the document order so the natural keyboard sequence follows the visible and logical form sequence.
---

Use the [Testing keyboard accessibility](/methods/testing-keyboard-accessibility/) method to review the communication-preferences form. Start the exercise from the Exercise workspace.

1. Begin before the first control and use only your keyboard.
2. Navigate forward and backward through every visible control.
3. Try to operate each control with the keys you expect it to support.
4. Observe the order in which focus moves and whether focus remains visually identifiable.
5. Find four keyboard accessibility problems.
6. For each finding, record the affected control, the keys you pressed, what you expected, and what happened instead.

Avoid inspecting the source until you have completed the keyboard test. Return to this page whenever you need a hint or are ready to review the solution.
