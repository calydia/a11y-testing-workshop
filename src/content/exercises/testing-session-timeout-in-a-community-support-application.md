---
title: Testing session timeout in a community-support application
summary: Complete and interrupt a fictional multi-step application while testing its warning, extension, expiry, and recovery behavior.
description: Practise testing a session warning, countdown announcements, keyboard operation, focus restoration, work preservation, and return after simulated reauthentication.
status: published
order: 65
topics: [time limits, session timeout, interruptions, countdown, keyboard, screen readers, focus, data preservation]
prerequisites:
  - Understand the Testing time limits and interruptions method
difficulty: beginner
estimatedMinutes: 30
exerciseType: perform-test
fixture: community-support-session-timeout
objectives:
  - Measure when the warning appears and how much usable time remains.
  - Test the warning and its actions with a keyboard and screen reader.
  - Evaluate countdown announcements and focus after the interruption closes.
  - Check whether entered information and task position survive expiry and simulated reauthentication.
  - Record six findings, useful passing checks, and limitations of accelerated timing.
methods: [testing-time-limits-and-interruptions]
hints:
  - Compare the warning time with the time left to understand and operate it, then move through every action using only a keyboard.
  - Listen through the countdown and follow focus after extending the session or taking another warning action.
  - Enter fictional sample information, force expiry, continue through the simulated sign-in, and compare both the returned step and the information still available.
expectedFindings: 6
solution:
  summary: The application contains six findings involving warning timing, countdown announcements, extension operation, focus restoration, entered information, and return to the interrupted step.
  findings:
    - title: The warning appears too late
      explanation: The warning appears with only five seconds remaining. That leaves little usable time to understand the interruption, switch context, and choose an action. Provide a warning early enough for the task and users involved, and record evidence for the chosen timing rather than applying one universal duration.
      method: testing-time-limits-and-interruptions
    - title: Every countdown change is announced
      explanation: The live message announces the complete countdown once per second. Frequent announcements can interrupt screen-reader speech and make the warning harder to operate. Keep the visible countdown while announcing changes at a useful, proportionate frequency for the context.
      method: testing-time-limits-and-interruptions
    - title: Extend session is not keyboard operable
      explanation: The custom extension control responds to a pointer but is skipped in sequential keyboard navigation and does not respond to Enter or Space. Use a native button or implement the required role, focusability, keyboard interaction, and visible focus.
      method: testing-time-limits-and-interruptions
    - title: Focus moves away from the interrupted task
      explanation: Extending closes the correctly modal warning but moves focus to the Testing controls heading rather than returning to the application task. Restore focus to a meaningful location in the interrupted context when it remains available.
      method: testing-time-limits-and-interruptions
    - title: Expiry discards entered application information
      explanation: Expiry clears the selected support category, appointment period, sample note, and completed step. Preserve protected work where possible or provide a clear save-and-return route before expiry so people do not have to repeat the task.
      method: testing-time-limits-and-interruptions
    - title: Simulated reauthentication returns to the beginning
      explanation: Continuing after the fictional sign-in returns to an empty first step instead of the interrupted step with completed work. Return people to their prior task context and safely restore preserved information after reauthentication.
      method: testing-time-limits-and-interruptions
---

This is a fictional practice application. Nothing you enter is submitted, stored, or retained. Reloading or resetting the workspace removes all entered information. Use fictional sample information only.

Use [Testing time limits and interruptions](/methods/testing-time-limits-and-interruptions/) while completing the Exercise. The Testing controls accelerate otherwise slow states for practice; they do not reproduce production timing or establish whether a real duration is usable.

1. Record your browser, operating system, screen reader and versions, viewport, input method, and initial application state.
2. Review the privacy notice and initial form, then enter only fictional sample information and move to the second step.
3. Start the short automatic demonstration. Record when the warning appears, the time remaining, what is announced, and what happens at expiry.
4. Reset, use **Show session warning**, and test every warning action with a pointer, keyboard, and screen reader. Follow focus after each action.
5. Reset, re-enter sample information, and use **Expire session**. Compare the entered information and current step before and after expiry.
6. Continue through the credential-free simulated sign-in and record the step and information to which you return.
7. Reset and test **Save and finish later** with a keyboard. Read its confirmation and verify the stated storage boundary.
8. Identify exactly six findings. For each, record the state, timing, steps, expected and actual behavior, user impact, evidence, remediation direction, and follow-up testing.

Record the correctly named modal, visible remaining time, ordinary native form controls, and keyboard-operable save-later action as passing checks. Keep conclusions about production timing and screen-reader output limited to the environment and accelerated conditions you actually tested.
