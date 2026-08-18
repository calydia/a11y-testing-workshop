---
title: Testing time limits and interruptions
summary: Check whether people have enough time, receive useful warnings, can extend a session, and can recover their work after interruption.
description: Learn a repeatable beginner procedure for testing time limits, warnings, session extension, expiry, work preservation, and return to an interrupted task.
status: published
order: 21
topics: [time limits, interruptions, session timeout, warnings, focus, screen readers, keyboard, data preservation]
prerequisites:
  - Basic keyboard navigation
  - Basic use of one screen reader
skillLevel: beginner
estimatedMinutes: 25
tools: [Web browser, Keyboard, Screen reader, Timer or timestamp record]
platforms: [Desktop, Mobile]
outcomes:
  - Identify inactivity, reading, interaction, authentication, and completion time limits.
  - Measure when warnings appear and how much usable time remains.
  - Test warning discovery, announcements, focus, keyboard operation, and session extension.
  - Check whether work and task position survive expiry and reauthentication.
  - Evaluate save-and-return alternatives and record essential exceptions or testing limitations.
relatedMethods: [testing-keyboard-accessibility, testing-forms-and-validation, testing-modal-dialogs, testing-motion-animation-and-flashing]
relatedExercises: [testing-session-timeout-in-a-community-support-application]
interpretation:
  - The existence of a warning does not establish that people receive it early enough, can operate it, or have enough usable time to respond.
  - A visible countdown may be helpful while announcements of every change can interrupt or overwhelm assistive-technology users.
  - Expiry is not only an authentication event; preserving completed work and returning to the interrupted task can determine whether a person can finish at all.
  - Some time limits are essential or outside the content provider's control, but that conclusion requires evidence rather than assumption.
limitations:
  - Accelerated Exercise timing demonstrates states and transitions, not whether a real production duration is usable.
  - This method does not replace complete keyboard, forms, modal-dialog, motion, authentication, security, or screen-reader testing.
  - Network delay and slow performance can consume available time but require separate performance and failure-state investigation.
  - Technical testing cannot determine every person's timing needs or replace testing with disabled people.
---

## What this method tests

This method checks whether people have enough time to read and act, receive a useful warning before a limit expires, can extend or avoid the limit where appropriate, and can continue without losing completed work or their position.

Time limits can be based on inactivity, total completion time, authentication, reading time, or a particular interaction. They differ from automatically moving content, prerecorded media duration, and ordinary response time. A timer is not automatically an accessibility failure, and one duration is not suitable for every context.

## What you need

Use a browser, keyboard, one compatible screen reader, and a timer or timestamp record. Record the browser, operating system, assistive technology and versions, viewport, input method, application state, test account conditions, and any server or authentication settings that affect timing.

Use [Testing keyboard accessibility](/methods/testing-keyboard-accessibility/) for the complete keyboard path, [Testing forms and validation](/methods/testing-forms-and-validation/) for ordinary form states, [Testing modal dialogs](/methods/testing-modal-dialogs/) for the full modal interaction, and [Testing motion, animation, and flashing](/methods/testing-motion-animation-and-flashing/) when content itself moves or updates automatically.

## Before you start

Identify every known inactivity, reading, interaction, authentication, and completion limit. Establish what triggers each timer, its total duration, whether activity resets it, and what the product is expected to do at warning and expiry. Use safe test data and a non-production environment where expiry could otherwise discard or submit real work.

Decide which states you must reach and how you will measure them. Developer-supported controls or shortened test-environment values can make slow states reproducible, but record that acceleration and confirm important conclusions against production-like behavior later.

## How to perform the test

1. Start from a documented initial state and begin the task using safe sample data.
2. Record what starts the limit, the total duration, and which activity resets or does not reset it.
3. Check whether the limit can be turned off, adjusted, or extended before it begins when that option is required.
4. Allow the warning to appear. Record when it appears and calculate the usable time remaining.
5. Check that the warning is visually clear and exposed with a useful name, message, and remaining time.
6. With a screen reader, listen to the initial warning and subsequent countdown changes. Determine whether important information is available without repeated announcements interrupting the task.
7. Move through every warning action with a keyboard. Check names, roles, focus order, operation, and visible focus.
8. Extend the session and record whether the extension takes effect, whether repeated extension is available where required, and where focus returns.
9. Repeat the task and allow the session to expire. Record what happens to entered values, completed steps, uploads, selections, and unsaved changes.
10. Continue through any reauthentication or return action. Confirm whether the person returns to the interrupted step with their work available.
11. Test any save-and-return alternative with a keyboard and screen reader. Check what is saved, for how long, and how the person resumes it.
12. Record essential exceptions, uncertain platform behavior, incomplete checks, user impact, remediation direction, and follow-up testing.

## What to observe

Look for warnings that arrive too late to understand and operate, keyboard-inaccessible extension controls, focus that moves away from the interrupted task, countdown announcements that repeatedly interrupt speech, and expired sessions that discard work or return people to the beginning.

Record useful passing behavior as well: an understandable warning, a visible remaining-time display, native operable actions, preserved values, restored task position, repeated extension where required, and a clear save-and-return route.

## Interpreting essential limits

Do not assume a limit is essential because it supports security, capacity, or a real-time event. Record who controls the limit, why changing it would invalidate the activity, which alternatives exist, and what evidence supports the exception. A security timeout may still allow earlier warning, extension, protected draft saving, or return to the interrupted task.

Separate timing failures from ordinary performance problems. If network or rendering delays consume a significant part of the available time, record that observation and arrange the appropriate performance or failure-state investigation in addition to this method.
