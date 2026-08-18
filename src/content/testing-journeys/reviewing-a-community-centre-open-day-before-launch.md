---
title: Reviewing a community centre open day before launch
summary: Apply several manual accessibility testing techniques to assess an open-day website and make an evidence-based launch recommendation.
description: Conduct an intermediate review covering keyboard access, zoom and reflow, forced colors, motion preferences, touch targets, orientation, and media alternatives.
status: published
order: 30
topics: [keyboard, zoom, reflow, forced colors, motion, reduced motion, touch targets, orientation, captions, transcripts, reporting]
prerequisites:
  - Familiarity with manual accessibility testing
difficulty: intermediate
estimatedMinutes: 90
scenario: Riverside Community Centre is preparing to launch its open-day website. You have been asked to review whether visitors can explore activities, filter the schedule, understand the venue map and travel information, and reach the booking action across a range of input, display, and preference conditions.
role: Accessibility tester reviewing an open-day website before launch
objectives:
  - Define a focused, reproducible review across several environments and user preferences.
  - Assess keyboard access, focus visibility, operation, sequence, and content obstruction.
  - Test whether visual states and meaningful graphics remain available in forced colors.
  - Assess movement with reduced-motion preferences and identify user control requirements.
  - Evaluate touch-target spacing and useful content in portrait and landscape orientations.
  - Compare travel video audio, captions, visual information, and transcript for equivalent meaning.
  - Consolidate overlapping evidence and make a proportionate launch recommendation.
methods:
  - testing-keyboard-accessibility
  - testing-forced-colors-and-high-contrast
  - testing-motion-animation-and-flashing
  - testing-mobile-touch-and-orientation
  - testing-media-accessibility
  - testing-zoom-and-reflow
learningPaths:
  - your-first-accessibility-review
stages:
  - title: Define the review scope and environments
    task: Record the workspace route, browsers, operating systems, input methods, viewport sizes, zoom conditions, themes, forced-colors and motion settings, media settings, and initial state. Identify checks that require a physical device or another platform.
    methods: []
  - title: Complete core tasks with a keyboard and at high zoom
    task: Move through navigation, activities, schedule filters, venue information, travel information, and booking using only a keyboard. Repeat representative tasks at 200% and 400% zoom or equivalent narrow CSS widths, checking focus, operation, sequence, reflow, and content that may be obscured.
    methods: [testing-keyboard-accessibility, testing-zoom-and-reflow]
  - title: Review visual preferences and movement
    task: Compare selected schedule states and the venue map in ordinary colors and forced colors. Observe featured activities with and without reduced motion, checking whether movement starts automatically and whether users can pause, stop, hide, or reduce it.
    methods: [testing-forced-colors-and-high-contrast, testing-motion-animation-and-flashing]
  - title: Test touch targets and orientation
    task: Inspect and measure representative controls, including the map controls and primary actions. Test portrait and landscape at phone-like dimensions and compare desktop landscape. Record what emulation can demonstrate and what still needs physical-device testing.
    methods: [testing-mobile-touch-and-orientation]
  - title: Compare the travel video's alternatives
    task: Play, pause, seek, and adjust the travel video. Compare spoken information, captions, meaningful visuals, and the transcript for timing, accuracy, completeness, and equivalent access to important details.
    methods: [testing-media-accessibility]
  - title: Consolidate evidence and recommend
    task: Merge overlapping observations into reproducible findings, retain useful passing checks and limitations, prioritize user impact, propose remediation and follow-up testing, and recommend whether the website is ready to launch.
    methods: [testing-keyboard-accessibility, testing-forced-colors-and-high-contrast, testing-motion-animation-and-flashing, testing-mobile-touch-and-orientation, testing-media-accessibility, testing-zoom-and-reflow]
deliverables:
  - Test environment, scope, and stated limitations.
  - Reproducible findings with evidence and user impact.
  - Passing checks and behavior that requires follow-up testing.
  - Consolidated evidence where several methods reveal one underlying problem.
  - Remediation direction, ownership questions, and follow-up checks.
  - Concise launch recommendation identifying blockers and residual risk.
---

Complete the Testing journey in one session or split it into method-focused reviews. Use one evidence log throughout so that observations from different conditions can be compared and combined.

## Testing journey workspace

[Open the Testing journey workspace for the community centre open day](/journey-workspaces/community-centre-open-day/) and use that page throughout the review. Return to this journey whenever you are ready to continue, need method guidance, or want to check the next stage. You may choose to open the workspace in another tab if that suits your workflow.

Reload the workspace when you need its initial state. Record the environment before changing preferences or dimensions, and change one test condition at a time where possible.

## Record evidence consistently

For each observation, record the task, condition, steps, expected and actual behavior, user impact, and supporting evidence. When several techniques expose the same underlying barrier, create one finding and include evidence from each relevant condition.

Keep defects separate from useful passing comparisons. Note when browser emulation, unavailable hardware, media support, or another platform limitation means a check is incomplete rather than passed.

## Make the launch recommendation

Prioritize findings by their effect on discovering activities, understanding travel information, and reaching booking. Recommend whether the website is ready to launch, ready after named blockers are corrected, or not ready. Include remediation direction, unresolved questions, and the follow-up testing needed after changes.
