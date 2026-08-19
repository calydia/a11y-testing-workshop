---
title: Testing status messages in a community activities search
summary: Investigate how a dynamic activities search communicates loading, results, saving, removal, no-results, and urgent-error updates.
description: Practise intermediate status-message and live-update testing in a deliberately flawed community activities search.
status: published
order: 62
category: interaction-and-tasks
topics: [status messages, live regions, screen readers, search, dynamic content, focus]
prerequisites:
  - Complete or understand Testing status messages and live updates
  - Be able to operate a screen reader and inspect page markup
difficulty: intermediate
estimatedMinutes: 30
exerciseType: perform-test
fixture: community-activities-status-messages
objectives:
  - Compare visible dynamic updates with screen-reader output.
  - Evaluate message content, timing, priority, repetition, and focus behavior.
  - Inspect live-region insertion order and changing semantics.
  - Record findings with environment details and support limitations.
methods: [testing-status-messages-and-live-updates]
hints:
  - Compare every visible change with what the screen reader announces. Include result totals, loading, saving, removal, no-results, and the assisted error state.
  - Inspect whether each message container exists before its text changes and whether its role or live-region property is present at that time. Compare polite and assertive updates.
  - Type several characters without pausing and watch for repeated loading messages. For the inserted and no-results messages, pay close attention to whether content or semantics arrives first.
expectedFindings: 6
solution:
  summary: The activities search contains six deliberately created status-message and live-update problems.
  findings:
    - title: The changing result count is not announced
      explanation: The visible results summary updates after searches and filters, but it has no status role or live-region relationship. Screen-reader users can remain unaware that the result set changed. Expose a concise result update through a suitable status mechanism while keeping focus on the control being used.
      method: testing-status-messages-and-live-updates
    - title: Routine loading feedback is unnecessarily assertive
      explanation: The loading message uses an alert for an ordinary search update. Assertive output can interrupt the user's current speech even though no immediate response is required. Use a less disruptive status pattern or omit transient loading announcements when the useful completion message is sufficient.
      method: testing-status-messages-and-live-updates
    - title: Typing produces excessive loading announcements
      explanation: Every keyword input event immediately replaces the routine loading message. Fast typing can create repeated interruptions and stale feedback. Consolidate or delay updates so announcements describe a useful settled state rather than every intermediate keystroke.
      method: testing-status-messages-and-live-updates
    - title: The saved-activity confirmation is visual only
      explanation: Saving an activity displays a confirmation, but the message has no status semantics and focus remains on the Save activity button. Keeping focus is appropriate, but the confirmation still needs a reliable non-focus communication mechanism.
      method: testing-status-messages-and-live-updates
    - title: The inserted confirmation may not be announced reliably
      explanation: One confirmation is inserted into the document already populated and marked as a live region. Assistive technologies may not observe a content change inside a region that did not previously exist. Keep the live container present before updating its message, or use another supported status pattern appropriate to the interaction.
      method: testing-status-messages-and-live-updates
    - title: No-results semantics are added after the message changes
      explanation: The no-results text is updated before the element receives its live-region property. Assistive technology may miss the change because the element was not live when the content changed. Establish the semantics before changing the message and verify the result with relevant browser and screen-reader combinations.
      method: testing-status-messages-and-live-updates
---

## Before you begin

This is a fictional practice search. It does not use accounts or personal information, and nothing you do is submitted, stored, or retained. Reloading or resetting the workspace removes its local state.

Read [Testing status messages and live updates](/methods/testing-status-messages-and-live-updates/) before starting. Prepare a screen reader, keyboard, and browser developer tools. Record the browser, screen reader, operating system, and relevant settings.

## Your task

Open the standalone workspace and investigate how it communicates dynamic changes. The workspace contains deliberate problems, but it does not reveal how many or where they are.

1. Establish the visible behavior of the initial results, keyword search, filters, saving, removal, and reset.
2. Repeat the task with a screen reader. Compare visible changes with announced output and note where focus remains.
3. Type several characters at normal speed instead of testing only one slow input event.
4. Produce a no-results state and inspect the message element before and after the update.
5. Save activities and remove one from the saved list. Compare the different confirmations.
6. Use the assisted service-error control and compare its urgency with routine loading feedback.
7. Inspect live-region roles, properties, DOM insertion timing, and changed text.
8. Record findings and passing checks with triggers, visible output, spoken output, timing, priority, repetition, focus, user impact, and environment details.
9. Reset and repeat uncertain results from a stable state. Use another relevant browser and screen-reader combination when feasible.

Use **Return to the exercise** when you are ready to continue, need a hint, or want to compare your findings with the solution.

## Scope

Focus on status messages and live updates. You may note other observations, but a complete audit of filter controls, forms, result-card structure, or content quality is outside this exercise.

