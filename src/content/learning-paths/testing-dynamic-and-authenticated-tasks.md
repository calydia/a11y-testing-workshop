---
title: Testing dynamic and authenticated tasks
summary: Build intermediate skills for testing controls, forms, live updates, interruptions, and authentication through changing task states.
description: Follow a self-contained intermediate path through controls, validation, status messages, time limits, authentication, and task recovery.
status: published
order: 40
topics: [intermediate, interaction and tasks, controls, forms, validation, status messages, live regions, time limits, interruptions, authentication, verification, screen readers, focus, task recovery]
prerequisites:
  - Basic familiarity with using a web browser
  - Basic keyboard use
  - Basic operation of one screen reader
level: intermediate
estimatedMinutes: 310
outcomes:
  - Assess control names, roles, states, values, instructions, keyboard operation, and screen-reader output.
  - Follow a form through initial, invalid, corrected, and successful states.
  - Compare visible dynamic changes with announcements, timing, and focus behavior.
  - Test warnings, extensions, expiry, preserved work, and return to an interrupted task.
  - Evaluate authentication assistance, verification, cognitive-function requirements, errors, and recovery.
  - Maintain reproducible evidence across a changing task without confusing accessibility testing with security assessment or universal compatibility claims.
steps:
  - type: content
    title: Prepare a safe, reproducible test environment
    anchor: prepare-a-safe-reproducible-test-environment
    summary: Prepare fictional test data, record the environment and starting state, and keep observations safe and reproducible.
    estimatedMinutes: 15
  - type: method
    entry: testing-controls-with-a-screen-reader
  - type: exercise
    entry: testing-controls-in-a-community-events-finder
  - type: method
    entry: testing-forms-and-validation
  - type: exercise
    entry: testing-a-community-course-registration-form
  - type: content
    title: Track state, context, and recovery
    anchor: track-state-context-and-recovery
    summary: Use one evidence structure to follow visible changes, announcements, focus, retained values, and recovery across task states.
    estimatedMinutes: 15
  - type: method
    entry: testing-status-messages-and-live-updates
  - type: exercise
    entry: testing-status-messages-in-a-community-activities-search
  - type: method
    entry: testing-time-limits-and-interruptions
  - type: exercise
    entry: testing-session-timeout-in-a-community-support-application
  - type: method
    entry: testing-authentication-and-verification
  - type: exercise
    entry: testing-authentication-for-a-community-services-booking
---

Complete this path across several sessions if needed. Revisit each Testing method while you complete its paired Exercise, and keep your notes so you can compare how information and task context change from one state to the next.

The Exercises use separate fictional interfaces rather than one continuous service. Carry the same evidence structure between them, not application state or one accumulating target finding count. A useful test may record passing behavior, a support limitation, or a finding; it does not need to discover a defect in every category.

## Prepare a safe, reproducible test environment

Use fictional information provided by the Exercise or other explicitly authorized test data. Do not enter real credentials or personal information, trigger production lockouts or recovery messages, or complete destructive submissions merely to reach a test state.

Before each Exercise:

1. Record the browser, operating system, viewport, input method, screen reader, versions, and relevant settings.
2. Note any browser assistance or password manager you will use when the task reaches authentication.
3. Read the practice-data notice and learn how to return the interface to its deterministic initial state.
4. Record the state you start from before operating a control, submitting a form, waiting for an update, or allowing a session to expire.
5. Keep visible, keyboard, focus, and screen-reader observations distinct so that one result is not mistaken for another.

This preparation supports an accessibility review. It does not authorize security testing or establish that the fictional Exercise behavior represents a production system.

## Track state, context, and recovery

Controls and validation establish the task states you will examine in the later methods. Use one consistent evidence structure as you move from ordinary interaction to dynamic updates, interruptions, and authentication.

For each relevant observation, record:

- the task and starting state;
- the trigger or input;
- the visible result;
- the announced result and its timing;
- focus before and after the change;
- values and context that were retained or cleared;
- the available recovery and the task position to which the person returned;
- the expected result, actual result, and user impact;
- the tested environment and support limitations; and
- a remediation direction and retest condition.

Not every field applies to every observation. Use the structure to preserve the evidence that matters, connect related behavior across states, and avoid reporting several symptoms of one underlying problem as unrelated findings.

## Where to go next

Apply these skills together in [Reviewing a community-services appointment change](/journeys/reviewing-a-community-services-appointment-change/). The journey combines controls, validation, dynamic confirmations, a session warning, reauthentication, preserved work, and return to the original task in one realistic workspace.

Use [Your first accessibility review](/learn/your-first-accessibility-review/) when you want a broader foundation in automated, keyboard, visual, text-spacing, zoom, and forms testing.

Use [Testing display preferences, touch, and media](/learn/testing-display-preferences-touch-and-media/) for focused practice with forced colors, reduced motion, touch, orientation, and prerecorded media.

Use [Practical screen-reader testing](/learn/practical-screen-reader-testing/) for more focused practice with page structure, data tables, controls, images, graphics, language changes, and modal dialogs.

These paths are optional supporting routes. You do not need to complete any of them before working through this self-contained sequence.

## Keep the scope in mind

These five techniques do not form a comprehensive accessibility or conformance assessment. One browser and assistive-technology combination cannot establish universal compatibility, and accessibility testing does not determine whether an authentication system is secure enough for a service's threat model. For real services, define the review boundary, arrange specialist work where needed, and involve disabled people whose experiences and ways of using technology may differ from your own.

[Read about the full scope and limitations of the Lab](/about/), including what its technical checks can and cannot establish.
