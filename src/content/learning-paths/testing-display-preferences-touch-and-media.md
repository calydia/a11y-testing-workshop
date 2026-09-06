---
title: Testing display preferences, touch, and media
summary: Build a self-contained intermediate review of keyboard access, zoom and reflow, forced colors, reduced motion, touch and orientation, and prerecorded media.
description: Compare tasks across display settings, input conditions, devices, and media support while separating author-controlled defects from environment-dependent behavior.
status: published
order: 30
topics: [intermediate, keyboard, focus, zoom, reflow, forced colors, high contrast, motion, reduced motion, touch, target size, gestures, orientation, media, captions, transcripts, audio description, user preferences, platform limitations, reporting]
prerequisites:
  - Basic familiarity with using a web browser
  - Basic keyboard use
level: intermediate
estimatedMinutes: 285
outcomes:
  - Prepare comparable test environments and record settings, devices, input methods, and limitations.
  - Establish keyboard and zoom-and-reflow baselines before changing specialized presentation or input conditions.
  - Assess whether information, controls, states, and focus remain perceivable in forced colors.
  - Assess automatic movement, user controls, reduced-motion behavior, and possible flashing safely.
  - Test touch-target spacing, gesture alternatives, pointer cancellation, and task availability across portrait and landscape orientations.
  - Compare audio, captions, transcripts, meaningful visual information, and player behavior while separating authored content from platform support.
  - Classify evidence as a finding, passing behavior, a support limitation, or an incomplete check and identify proportionate follow-up testing.
steps:
  - type: content
    title: Prepare comparable test environments
    anchor: prepare-comparable-test-environments
    summary: Record comparable environments, establish an ordinary baseline, and change one display, input, device, or media condition at a time.
    estimatedMinutes: 15
  - type: method
    entry: testing-keyboard-accessibility
  - type: exercise
    entry: keyboard-testing-a-preferences-form
  - type: method
    entry: testing-zoom-and-reflow
  - type: exercise
    entry: testing-an-appointment-booking-at-high-zoom
  - type: method
    entry: testing-forced-colors-and-high-contrast
  - type: exercise
    entry: testing-forced-colors-in-a-journey-planner
  - type: method
    entry: testing-motion-animation-and-flashing
  - type: exercise
    entry: testing-motion-preferences-on-a-parcel-tracking-dashboard
  - type: content
    title: Separate defects from expected adaptation
    anchor: separate-defects-from-expected-adaptation
    summary: Classify observations consistently, separate authored behavior from platform support, and consolidate symptoms of one underlying problem.
    estimatedMinutes: 15
  - type: method
    entry: testing-mobile-touch-and-orientation
  - type: exercise
    entry: testing-touch-interaction-on-a-community-festival-map
  - type: method
    entry: testing-media-accessibility
  - type: exercise
    entry: testing-a-community-announcement-video
---

Complete this path across several sessions if needed. Revisit each Testing method while you complete its paired Exercise, and keep one comparison record so you can interpret what changes between test conditions.

The Exercises use separate fictional interfaces rather than one continuous product. Carry a consistent evidence structure between them, not application state or one cumulative target finding count. A useful result may be expected adaptation, passing behavior, an incomplete check, a platform-dependent observation, or a finding; not every condition should preserve authored styling or expose a defect.

## Prepare comparable test environments

You need only:

- Basic familiarity with using a web browser
- Basic keyboard use

Individual methods may also ask you to use browser developer tools, operating-system settings, a physical or emulated mobile device, or media controls. Prepare only the environments you can test responsibly, and record when another device or platform is still needed.

Before each method-and-Exercise pair:

1. Record the device, operating system, browser, viewport, input method, theme, zoom or text-size condition, relevant user preferences, and available media support.
2. Identify which results come from physical hardware and which come from browser emulation. Treat emulation as useful evidence, not proof of physical-device behavior.
3. Learn how to enable and restore forced colors or another relevant contrast setting and the operating system's reduced-motion preference before changing them.
4. Establish the primary task and its ordinary presentation, then change one condition at a time so comparisons remain meaningful.
5. Keep keyboard, pointer, touch, visual, and media observations distinct. One result must not stand in for a condition you did not test.
6. If content may flash, avoid prolonged exposure and follow the motion method's safety guidance before investigating further.

This checkpoint prepares comparable conditions. Use each Testing method for its specific procedure and interpretation guidance.

## Separate defects from expected adaptation

After keyboard, zoom and reflow, forced-colors, and motion practice, pause to classify what you observed before changing device and media conditions.

Distinguish between:

- an expected change in color, layout, animation, orientation, or player presentation;
- loss of information, operation, focus visibility, or task completion;
- behavior controlled by the author and behavior controlled by the browser, operating system, device, assistive technology, or media platform;
- a passing check and a check that remains incomplete; and
- one underlying problem and several symptoms of it under different conditions.

For relevant observations, record the task and state, tested condition, steps, expected and actual result, user impact, environment limitation, remediation direction, and retest condition. Not every field applies to every observation. Use the structure to keep enough evidence for another person to reproduce the result and to consolidate related symptoms without hiding meaningful differences between environments.

## Where to go next

Apply the six techniques together in [Reviewing a community centre open day before launch](/journeys/reviewing-a-community-centre-open-day-before-launch/). The Testing journey uses one realistic workspace and asks you to make an evidence-based launch recommendation.

Use [Your first accessibility review](/learn/your-first-accessibility-review/) for optional broader practice with automated checks, visual review, text spacing, and forms. It is not a prerequisite for this self-contained path.

## Keep the scope in mind

These six techniques do not form a comprehensive audit or conformance assessment. Emulation does not establish physical-device behavior, and one platform or media-player combination does not establish universal support. For real products, define the untested scope, arrange additional specialist testing where needed, and involve disabled people whose experiences and ways of using technology may differ from your own.

[Read about the full scope and limitations of the Lab](/about/), including what its technical checks can and cannot establish.
