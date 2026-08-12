---
title: Reviewing a course registration before launch
summary: Combine automated and manual testing techniques to assess one registration experience and make an evidence-based launch recommendation.
description: Conduct a staged pre-release accessibility review of a community-course registration form and produce a concise professional report.
status: published
order: 10
topics: [accessibility review, reporting, prioritization, forms, keyboard, visual, zoom, automated testing]
prerequisites:
  - Familiarity with the foundational methods in Your first accessibility review
difficulty: beginner
estimatedMinutes: 90
scenario: A community organization is preparing to launch online registration for a new course. You have been asked to perform a focused pre-release accessibility review of the registration experience and advise whether it is ready to launch.
role: Accessibility tester supporting a pre-release review
objectives:
  - Define and document a reproducible review scope and test environment.
  - Sequence automated and manual checks across relevant interface states.
  - Record findings and passing checks with useful evidence.
  - Consolidate overlapping observations without inflating issue counts.
  - Prioritize impact and make a concise, evidence-based launch recommendation.
methods:
  - testing-with-automated-tools
  - testing-keyboard-accessibility
  - testing-visual-accessibility
  - testing-zoom-and-reflow
  - testing-forms-and-validation
exercises:
  - testing-a-community-course-registration-form
stages:
  - title: Define the review scope
    task: Record the route, browser, viewport, zoom baseline, theme, assistive technology, test data, and included interface states. State what is outside the review.
    methods: []
  - title: Establish an automated baseline
    task: Scan the initial form and the invalid-submission state. Verify each result against the rendered interface and record the configuration and state needed to reproduce it.
    methods: [testing-with-automated-tools]
  - title: Test core manual access
    task: Review keyboard operation, focus order, visible focus, visual instructions, required indicators, control boundaries, error presentation, and interactive states. Record passing behavior as well as findings.
    methods: [testing-keyboard-accessibility, testing-visual-accessibility]
  - title: Test responsive conditions
    task: Review browser zoom, text resizing, and reflow at the method's defined conditions. Confirm whether content and controls remain available without assuming the interface must contain a defect.
    methods: [testing-zoom-and-reflow]
  - title: Test the complete form journey
    task: Inspect labels, instructions, and groups; submit invalid data; locate and understand errors; correct values; submit successfully; and use a screen reader to verify relationships and announcements.
    methods: [testing-forms-and-validation, testing-keyboard-accessibility]
  - title: Consolidate and recommend
    task: Merge duplicate evidence, distinguish findings from passing checks, prioritize user impact, identify launch blockers and follow-up work, and make a concise launch recommendation.
    methods: [testing-with-automated-tools, testing-keyboard-accessibility, testing-visual-accessibility, testing-zoom-and-reflow, testing-forms-and-validation]
deliverables:
  - Scope and test-environment note.
  - Method-by-method test record.
  - Findings table with evidence, user impact, and remediation direction.
  - Passing checks worth preserving during remediation.
  - Short launch recommendation identifying blockers and follow-up work.
---

You can complete this journey in one focused session or split it across two sessions. Preserve your notes between stages so the final recommendation reflects the same documented review scope.

## Testing workspace

[Open the course registration workspace](/exercise-fixtures/course-registration/) in a separate page and use that same interface throughout the journey. It contains intentionally designed accessibility problems, but the journey does not tell you how many findings to expect. A useful review also records relevant behavior that passes.

## Build useful evidence

For each observation, record the interface state, method, steps, actual result, expected result, and user impact. Keep observed evidence separate from assumptions. If several methods expose the same underlying problem, report one finding with all relevant evidence instead of inflating the issue count.

Record meaningful passing checks as well. They help reviewers understand the tested scope and help developers avoid regressions while correcting other behavior.

## Make the launch recommendation

Prioritize findings by their effect on completing registration, not by an automated tool's severity label alone. Identify problems that block or seriously obstruct the task, changes that should follow soon after launch, and any review areas that remain incomplete.

End with a concise recommendation: ready to launch, ready only if specified blockers are corrected, or not ready to launch. Connect the recommendation to your evidence and state any conditions or follow-up testing clearly.
