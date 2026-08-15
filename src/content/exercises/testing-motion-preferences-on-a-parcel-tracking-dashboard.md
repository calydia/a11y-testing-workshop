---
title: Testing motion preferences on a parcel-tracking dashboard
summary: Compare a parcel tracker before and after reduced motion and investigate movement that continues or cannot be controlled.
description: Practise testing automatic, scroll-linked, and interaction-triggered motion without displaying hazardous flashing.
status: published
order: 28
topics: [motion, animation, reduced motion, user controls, scrolling, flashing safety]
prerequisites:
  - Understand the Testing motion, animation, and flashing method
difficulty: beginner
estimatedMinutes: 20
exerciseType: find-issues
fixture: parcel-tracking-motion
objectives:
  - Inventory automatic, scroll-linked, and interaction-triggered motion and record its triggers.
  - Compare real or assisted reduced motion with the initial experience.
  - Test the scope, operation, and exposed state of a valid pause control.
  - Record five motion findings, useful passing checks, and environmental limitations safely.
methods: [testing-motion-animation-and-flashing]
hints:
  - Ask which movement starts automatically, continues, or restarts, and what controls it.
  - Compare reduced-motion behavior while scrolling, opening content, and repeating a confirmation action.
  - Check the route progress, live updates, tracking-details panel, background decoration, and delivery confirmation.
expectedFindings: 5
solution:
  summary: The dashboard contains five motion behaviors that remain uncontrolled or unreduced, alongside examples that pause, become immediate, or communicate without spatial movement.
  findings:
    - title: The route marker moves continuously without a control
      explanation: The non-essential route marker repeats for longer than five seconds, has no pause or stop mechanism, and continues under reduced motion. Stop or substantially reduce it for the preference and provide an appropriate user control where the moving-content requirement applies.
      method: testing-motion-animation-and-flashing
    - title: The live updates keep scrolling automatically
      explanation: The update text moves continuously and cannot be paused, stopped, or hidden. Provide an operable control or present the updates as a static list, especially in the reduced experience.
      method: testing-motion-animation-and-flashing
    - title: Tracking details retain a large sliding transition
      explanation: Opening the details panel moves it across a substantial part of the viewport even under reduced motion. Preserve the content and expanded state but make the reduced transition immediate or non-spatial.
      method: testing-motion-animation-and-flashing
    - title: The background retains scroll-linked parallax
      explanation: Scrolling changes the decorative scene at a different rate from the page and the effect ignores reduced motion. Keep the decoration static or remove it when reduced motion is requested.
      method: testing-motion-animation-and-flashing
    - title: Delivery confirmation repeatedly restarts a celebration
      explanation: Each confirmation restarts a large spatial animation under reduced motion. Keep the status message but replace the celebration with an immediate or non-spatial confirmation in the reduced experience.
      method: testing-motion-animation-and-flashing
---

Use [Testing motion, animation, and flashing](/methods/testing-motion-animation-and-flashing/) while investigating the parcel-tracking dashboard.

1. Record the operating system, browser, versions, viewport, Lab theme, page state, system motion preference, and any page-level motion control.
2. Review the dashboard before changing the preference. Record what moves automatically, continues, responds to scrolling, or starts after an action.
3. Activate a real reduced-motion preference when available. Otherwise, use **Apply reduced-motion simulation** and record that you used the limited learning aid.
4. Operate the delivery-vehicle pause control with keyboard and pointer input. Record its name, exposed state, and exactly which movement it controls.
5. Open and close tracking details, scroll the page, and activate delivery confirmation more than once.
6. Identify exactly five motion behaviors that remain uncontrolled or unreduced. Record passing comparisons that pause, become immediate, complete promptly, or communicate without spatial movement.
7. Reset the condition and repeat representative actions to establish causation.
8. Record actual and expected behavior, trigger, user impact, environmental limitations, and remediation direction.

This Exercise does not display hazardous flashing. Do not repeatedly watch or recreate suspected flashing. Follow the method's safe assessment guidance and escalate it for appropriate measurement.

Return to this Exercise when you are ready to continue or when you need a hint or the solution.
