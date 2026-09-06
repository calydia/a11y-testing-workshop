---
title: Reviewing a community-services appointment change
summary: Apply five testing techniques while changing an appointment and evaluating validation, live updates, interruption, reauthentication, and recovery.
description: Conduct an intermediate accessibility review of a changing transactional task without treating the result as a security assessment or comprehensive audit.
status: published
order: 40
topics: [controls, forms, validation, status messages, live updates, session timeout, interruptions, authentication, verification, screen readers, keyboard, focus, task recovery, data preservation, reporting]
prerequisites:
  - Complete or understand Testing dynamic and authenticated tasks
difficulty: intermediate
estimatedMinutes: 105
scenario: Riverside Community Services is preparing to release a feature for changing an existing advice appointment. You have been asked to review whether people can choose a new time, update support preferences, recover from a session interruption, reauthenticate, and understand the final confirmation without losing their work or task context.
role: Accessibility tester reviewing an appointment-change feature before release
objectives:
  - Define a safe, reproducible environment and map the states in a changing authenticated task.
  - Assess the names, roles, states, values, instructions, and keyboard behavior of controls used to reschedule an appointment.
  - Follow the form through initial, invalid, corrected, review, and confirmed states.
  - Compare visible availability, validation, session, and confirmation updates with screen-reader output, timing, priority, and focus.
  - Test the warning, extension, expiry, preservation, and return behavior of an interrupted task.
  - Evaluate credential assistance, paste, password reveal, verification, errors, and recovery without making security claims.
  - Consolidate overlapping evidence, record passing behavior and limitations, and make a proportionate release recommendation.
methods:
  - testing-controls-with-a-screen-reader
  - testing-forms-and-validation
  - testing-status-messages-and-live-updates
  - testing-time-limits-and-interruptions
  - testing-authentication-and-verification
learningPaths:
  - testing-dynamic-and-authenticated-tasks
stages:
  - title: Define the safe review conditions
    task: Record the workspace route, browser, operating system, viewport, input method, screen reader, versions, relevant settings, and initial booking state. Use only the provided fictional values, define the review boundary, and identify platform combinations that remain untested.
    methods: []
  - title: Reschedule the appointment
    task: Map the booking summary and task steps. Choose a new date and time with a pointer, keyboard, and screen reader. Compare visible labels and selected states with exposed names, roles, and states, and record the visible and spoken availability updates.
    methods: [testing-controls-with-a-screen-reader, testing-status-messages-and-live-updates]
  - title: Validate and review the changes
    task: Update the fictional communication and visit-support preferences. Produce an invalid state, locate and understand the error, correct it, and reach the review step. Check labels, groups, instructions, retained values, error relationships, focus, and announcements.
    methods: [testing-controls-with-a-screen-reader, testing-forms-and-validation, testing-status-messages-and-live-updates]
  - title: Interrupt the task
    task: Use the accelerated timer and deterministic Testing controls to inspect the warning, remaining time, extension, expiry, focus, and announcements. Compare the draft values and current task position before and after each transition.
    methods: [testing-time-limits-and-interruptions, testing-status-messages-and-live-updates, testing-controls-with-a-screen-reader]
  - title: Reauthenticate and resume
    task: Use the provided fictional email, password, and verification code. Test input purposes, password assistance, paste, the reveal control, invalid verification, successful verification, preserved work, and return to the interrupted step. Separate deterministic implementation evidence from browser or password-manager variation.
    methods: [testing-authentication-and-verification, testing-forms-and-validation, testing-controls-with-a-screen-reader, testing-status-messages-and-live-updates, testing-time-limits-and-interruptions]
  - title: Confirm, consolidate, and recommend
    task: Complete the appointment change and compare the visible confirmation with focus and screen-reader output. Consolidate observations that describe one underlying barrier, retain meaningful passing checks and limitations, and recommend whether the feature is ready to release.
    methods: [testing-controls-with-a-screen-reader, testing-forms-and-validation, testing-status-messages-and-live-updates, testing-time-limits-and-interruptions, testing-authentication-and-verification]
deliverables:
  - Safe test environment, scope, and initial-state record.
  - Task and state-transition map.
  - Reproducible findings with expected behavior, evidence, user impact, and remediation direction.
  - Passing checks and support-dependent or incomplete observations.
  - Interruption, reauthentication, preservation, and recovery record.
  - Consolidated release recommendation identifying blockers, residual risk, and follow-up testing.
---

Complete the Testing journey in one focused session or split it at a stable task state. Keep one evidence record throughout so you can compare what remains available before and after validation, interruption, and reauthentication.

## Testing journey workspace

[Open the Testing journey workspace for the community-services appointment change](/journey-workspaces/community-services-appointment-change/) and use that page throughout the review. Return to this journey whenever you need the stage guidance or Testing method links. You may keep the workspace open in another tab if that supports your workflow.

The application and all of its customer, booking, credential, and verification details are fictional. It submits, sends, stores, and retains nothing. Reloading or resetting restores its initial state. Use only the values provided in the workspace, and never enter real personal information or credentials.

## Follow one evidence record

For each relevant observation, record the task and starting state, trigger or input, visible result, announced result and timing, focus before and after, retained or cleared information, available recovery, and returned task position. Add the expected and actual result, user impact, tested environment, support limitations, remediation direction, and retest condition where they apply.

Not every field is useful for every observation. When several techniques reveal symptoms of one underlying barrier, combine their evidence into one finding. Keep useful passing behavior and incomplete or support-dependent checks visible beside the problems you record.

## Make the release recommendation

Prioritize evidence by its effect on changing the appointment, recovering from an interruption, and understanding whether the change was confirmed. Recommend whether the feature is ready to release, ready after named blockers are corrected, or not ready. State the important passing behavior, excluded areas, residual risk, and follow-up testing needed after changes.

This accessibility review does not assess authentication security, privacy compliance, production timing, universal platform compatibility, or conformance. Use fictional data only and keep conclusions within the environment and task states you actually tested.
