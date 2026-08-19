---
title: Testing status messages and live updates
summary: Check whether dynamic updates are communicated at the right time and priority without unnecessarily moving focus or interrupting a task.
description: Learn a repeatable procedure for testing status messages, live regions, update timing, announcement priority, repetition, and focus behavior.
status: published
order: 20
category: interaction-and-tasks
topics: [status messages, live regions, screen readers, dynamic content, focus]
prerequisites:
  - Basic screen-reader operation
  - Familiarity with Testing controls with a screen reader
  - Familiarity with Testing forms and validation
skillLevel: intermediate
estimatedMinutes: 30
tools: [Keyboard, Screen reader, Browser developer tools]
platforms: [Desktop]
outcomes:
  - Identify dynamic updates that should be communicated without receiving focus.
  - Test message content, timing, priority, repetition, persistence, and focus behavior.
  - Record status-message findings with the tested environment and relevant support limitations.
relatedMethods: [testing-controls-with-a-screen-reader, testing-forms-and-validation, testing-modal-dialogs, testing-time-limits-and-interruptions]
relatedExercises: [testing-status-messages-in-a-community-activities-search]
interpretation:
  - A live-region attribute or status role does not prove that a useful message is announced.
  - Moving focus is not a general substitute for communicating an update. It can interrupt the task and change the user's context.
  - Routine progress and confirmation messages normally need less urgency than errors that require immediate attention.
  - An announcement can be present but still fail because it is vague, late, repetitive, interrupted, or no longer relevant.
  - Results can differ between browsers and screen readers. Record the tested combination and repeat important checks with another relevant combination when feasible.
limitations:
  - This method does not replace a complete review of control names, roles, states, values, or keyboard operation.
  - Use the forms method for a complete review of field instructions, validation, error association, and submission states.
  - Use the modal-dialog method when an update opens a modal interaction or deliberately changes focus.
  - Use the time-limits method for warnings, countdowns, expiry, extensions, and interrupted task recovery.
  - One browser and screen-reader result cannot establish support across every assistive-technology combination.
---

## What this method tests

Status messages tell people that something changed without requiring focus to move to the changed content. Examples include a result count, loading state, saved-item confirmation, progress update, or an error that appears while the user remains on the same page.

This method checks whether people using a screen reader receive equivalent, useful information at an appropriate time and priority. It also checks whether repeated updates remain manageable and whether ordinary updates leave focus where the user needs it.

## Before you start

Choose the task and dynamic states you will test. Record the browser, screen reader, operating system, input method, relevant verbosity settings, and whether the page was freshly loaded.

Learn the visible behavior before evaluating announcements. Identify what triggers each update, what changes on screen, how long it remains, and what the user needs to know or do next.

## Testing procedure

### 1. Inventory dynamic updates

Complete the task visually and list changes that occur without navigation. Include loading feedback, result summaries, confirmations, progress, availability, validation outcomes, and errors.

For each update, decide whether it should be communicated without moving focus, whether it is urgent, and whether the user must take an action.

### 2. Inspect the implementation

Use developer tools to inspect the changed content and its surrounding container. Check roles, `aria-live`, `aria-atomic`, visibility, ownership, and when the container enters the document.

Do not stop after finding live-region markup. Note whether the container exists before its text changes, whether semantics are added before or after the update, and whether the whole region or only changed content is exposed.

### 3. Test the visible and spoken sequence

Start the screen reader before triggering the update. Perform the task with the keyboard and compare:

- what triggered the change;
- what appeared visually;
- what was announced;
- when it was announced;
- whether another message interrupted or replaced it; and
- where focus remained or moved.

Repeat the check from a stable initial state. Reload or use a reliable reset when earlier messages could affect the result.

### 4. Assess content and timing

The announcement should contain enough context to be useful. A message such as “Updated” may be technically announced but fail to identify what changed.

Check whether the message arrives early enough to support the task, remains relevant when heard, and is not removed before assistive technology can expose it. Test rapid input and repeated actions as well as a single slow interaction.

### 5. Assess priority and repetition

Compare routine and urgent updates. Routine filtering, loading, and confirmations should not repeatedly interrupt other output. An urgent error may need stronger interruption when the user must respond immediately.

Check whether typing, changing several filters, progress updates, or repeated saves produce an excessive stream of announcements. Consider whether updates can be consolidated, delayed, or made more specific.

### 6. Check focus behavior

Confirm that ordinary status updates leave focus on the control the user was operating. Moving focus may be appropriate when the interface starts a new interaction or the user must act elsewhere, but that decision needs its own focus and context review.

If focus moves only to make a message announce, record both the announcement problem and the disruption caused by the focus change.

### 7. Repeat important checks

When feasible, repeat high-impact checks with another relevant browser and screen-reader combination. Separate implementation defects from support differences and describe both accurately.

## Record the results

For each finding, record:

- the page, task, trigger, and starting state;
- the visible update and expected information;
- the exact or closely transcribed announced output;
- timing, priority, repetition, and focus behavior;
- the browser, screen reader, operating system, and relevant settings;
- the user impact;
- relevant DOM or accessibility-tree evidence;
- a remediation direction; and
- combinations or states that still need follow-up testing.

Also record passing checks. A useful result distinguishes what worked, what failed, and what could not be established in the tested environment.

## Avoid common testing mistakes

- Do not assume the presence of `aria-live`, `role="status"`, or `role="alert"` guarantees an announcement.
- Do not add assertive announcements to every update simply to make output easier to notice.
- Do not move focus to routine messages unless the interaction genuinely requires a new context.
- Do not test only one slow action when real users may type or change controls rapidly.
- Do not report one assistive-technology result as universal support.
- Do not treat a spoken message as passing without checking its content, timing, repetition, and relevance.

## Related testing

Use [Testing controls with a screen reader](/methods/testing-controls-with-a-screen-reader/) to review the controls that trigger updates and [Testing forms and validation](/methods/testing-forms-and-validation/) for complete form and error handling. Use [Testing modal dialogs](/methods/testing-modal-dialogs/) when an update opens a modal interaction and [Testing time limits and interruptions](/methods/testing-time-limits-and-interruptions/) for warnings, countdowns, and expiry.

