---
title: Testing a community-course registration form
summary: Complete, invalidate, correct, and submit a realistic registration form while examining its form relationships and messages.
description: Practise testing labels, instructions, grouped choices, validation errors, focus handling, and successful form submission.
status: published
order: 60
topics: [forms, validation, errors, screen readers, keyboard]
prerequisites:
  - Understand the Testing forms and validation method
difficulty: beginner
estimatedMinutes: 25
exerciseType: perform-test
fixture: course-registration
objectives:
  - Evaluate the visible and accessible names, instructions, and groups in a form.
  - Trigger and inspect a deterministic invalid-submission state.
  - Verify focus handling and programmatic relationships for validation errors.
  - Correct the form and evaluate how successful submission is communicated.
methods: [testing-forms-and-validation]
hints:
  - Compare what is printed beside each control with the name and description exposed in the accessibility tree.
  - After invalid submission, note both what appears and where focus remains, then revisit each affected field with a screen reader.
  - A message that is visually obvious after submission is not necessarily announced to someone who cannot see the change.
expectedFindings: 6
solution:
  summary: The form contains six findings involving one label, one instruction, one group, invalid-submission focus, inline error relationships, and successful-submission communication.
  findings:
    - title: The full-name label is not associated with its input
      explanation: Full name is visibly placed above the input, but its for value does not match the input ID. The field therefore has no accessible name. Match the label and input identifiers or wrap the input with its label.
      method: testing-forms-and-validation
    - title: The email format instruction is not connected to the field
      explanation: The expected email format is visible, but the email input has no programmatic description that references it. Associate the instruction so it is available with the field name when users encounter the input.
      method: testing-forms-and-validation
    - title: The attendance choices have no programmatic group name
      explanation: In person and Online each have a label, but their shared question is not associated with the group. Use a fieldset and legend or an equivalently named group so the question is announced with the choices.
      method: testing-forms-and-validation
    - title: Invalid submission leaves focus on the submit button
      explanation: The error summary appears earlier in the page while focus remains on the submit button, so a non-visual user may not discover the failure efficiently. Apply a deliberate strategy that makes the summary or first invalid field immediately available.
      method: testing-forms-and-validation
    - title: Inline errors are not associated with their fields
      explanation: The errors are visible near their controls but are not referenced by aria-describedby or aria-errormessage, and invalid state is not exposed. Connect each error to its field and communicate the invalid state.
      method: testing-forms-and-validation
    - title: Successful submission is only communicated visually
      explanation: The confirmation is inserted visually but does not receive focus and is not exposed through a status or live region. Use an appropriate focus or announcement strategy so assistive-technology users learn that submission succeeded.
      method: testing-forms-and-validation
---

Use the [Testing forms and validation](/methods/testing-forms-and-validation/) method to review the community-course registration form. Start the exercise from the Exercise workspace.

1. Review the form before entering information. Compare visible labels, instructions, and grouped questions with what browser inspection and a screen reader expose.
2. Complete the form with a keyboard, but deliberately leave some required information missing.
3. Submit and record how the failure is communicated, where focus remains, and how you locate and understand each error.
4. Revisit the affected controls with a screen reader and inspect their programmatic relationships.
5. Correct every error and submit successfully.
6. Record how the confirmation is presented visually and whether assistive technology is informed of the change.
7. Identify exactly six accessibility findings. For each one, record the state, affected element, current behavior, expected result, user impact, and remediation direction.

The form runs entirely in your browser and does not send or retain the information you enter.
