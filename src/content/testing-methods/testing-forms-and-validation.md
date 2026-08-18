---
title: Testing forms and validation
summary: Check whether people can understand, complete, correct, and successfully submit a form.
description: Learn a repeatable procedure for testing form labels, instructions, groups, validation errors, focus handling, and success messages.
status: published
order: 19
category: interaction-and-tasks
topics: [forms, validation, errors, accessible names, screen readers, keyboard]
prerequisites:
  - Basic keyboard navigation
  - Basic use of one screen reader
  - Basic familiarity with HTML inspection
skillLevel: beginner
estimatedMinutes: 25
tools: [Web browser, Keyboard, Screen reader, Browser developer tools]
platforms: [Desktop]
outcomes:
  - Verify that controls have useful visible labels and accessible names.
  - Evaluate instructions, required status, formats, constraints, and grouped controls.
  - Test invalid submission, error discovery, focus handling, and error relationships.
  - Correct a form and verify that successful submission is communicated.
  - Record form findings with the tested state, user impact, evidence, and expected result.
relatedMethods: [testing-keyboard-accessibility, testing-with-automated-tools]
relatedExercises: [testing-a-community-course-registration-form]
interpretation:
  - Visible proximity does not create a programmatic relationship between a control and its label, instruction, or error.
  - Related choices need individual labels and an appropriate programmatic group name.
  - After a failed submission, people must be made aware of the failure and able to reach each error efficiently.
  - Focus does not always need to move to the same place; judge whether the chosen strategy makes the failure and recovery path clear.
  - Corrected values should be retained, and successful submission must be communicated beyond a purely visual change.
limitations:
  - This baseline does not cover complex custom widgets, multi-step forms, CAPTCHAs, payment flows, or file uploads.
  - Server, timeout, and network failure handling require additional states and testing.
  - Automated checks can identify some missing names and relationships but cannot determine whether the complete correction experience is understandable.
  - Screen-reader wording and announcement timing differ between browser and assistive-technology combinations.
---

## What this method tests

This method checks whether people can understand a form, enter information, discover and correct validation errors, and recognize successful submission. It covers both visible communication and the programmatic relationships exposed to assistive technology.

## What you need

Use a web browser and keyboard for the baseline procedure. Add a screen reader and browser developer tools to verify accessible names, descriptions, groups, errors, and status announcements.

Use [Testing keyboard accessibility](/methods/testing-keyboard-accessibility/) for a complete keyboard review. [Testing with automated tools](/methods/testing-with-automated-tools/) can supplement this procedure but cannot assess the entire correction experience.

## Before you start

Identify the form's purpose, which information is required, the constraints on each value, and what should happen after submission. Use a test account or non-production data where submission could otherwise create a real record or send a message.

Plan to test at least three states: the initial form, an invalid submission, and a successful corrected submission. Record the exact values and state used so another tester can reproduce the result.

## How to perform the test

1. Review the form's purpose and the expected submission outcome.
2. Check that every control has a useful visible label and accessible name.
3. Check that required status, formats, constraints, and instructions are available before the relevant input.
4. Confirm that related choices have individually labelled controls and an appropriate programmatic group name.
5. Complete the form with the keyboard, using the native interactions for each control.
6. Submit the form with required information missing or incorrectly formatted.
7. Confirm that the failure is clearly communicated and inspect where keyboard focus moves or remains.
8. Find every error and verify that it identifies the affected field and explains how to correct the value.
9. With a screen reader, confirm that field names, instructions, groups, invalid state, and errors are exposed when needed.
10. Correct the invalid values and confirm that previously entered valid information remains available.
11. Submit again and verify that success is communicated visually and to assistive technology.
12. Record the state, affected control, current behavior, expected result, user impact, and remediation direction for each finding.

## What to observe

Look for labels that are visible but disconnected, instructions that are unavailable when entering a value, and sets of choices announced without their shared question. After submission, check whether a user is made aware of the failure, can locate every invalid field, understands each correction, and avoids re-entering valid information. On success, watch and listen for a clear confirmation rather than relying on a visual change alone.
