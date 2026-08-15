---
title: Reviewing a community conference programme
summary: Apply screen-reader testing techniques to assess one conference programme and make an evidence-based publication recommendation.
description: Conduct an intermediate review of programme structure, common controls, graphical content, language changes, and session-detail dialogs.
status: published
order: 20
topics: [screen readers, headings, links, controls, states, images, SVG, language, modal dialogs, reporting]
prerequisites:
  - Basic screen-reader operation
difficulty: intermediate
estimatedMinutes: 90
scenario: A community conference team is preparing to publish its programme. You have been asked to review whether screen-reader users can understand the programme, choose sessions using its content and controls, follow multilingual information, inspect session details, and return without losing their place.
role: Accessibility tester reviewing a conference programme before publication
objectives:
  - Define a reproducible screen-reader review environment and scope.
  - Navigate a programme by structure and links rather than relying on visual layout.
  - Assess whether common controls expose useful names, roles, states, and keyboard behavior.
  - Evaluate whether images, icons, and SVG controls communicate equivalent content and purpose.
  - Separate language-markup failures from unavailable voices or platform support.
  - Test modal naming, containment, background inertness, closing behavior, and focus restoration within a realistic task.
  - Consolidate overlapping evidence and make a concise publication recommendation.
methods:
  - screen-reader-page-structure-and-links
  - testing-controls-with-a-screen-reader
  - testing-image-alternative-text
  - screen-reader-icons-and-svg
  - screen-reader-language-changes
  - testing-modal-dialogs
learningPaths:
  - practical-screen-reader-testing
stages:
  - title: Define the review conditions
    task: Record the workspace route, screen reader, browser, operating system, versions, installed voices, theme, viewport, initial UI state, and test scope. State what is outside the review.
    methods: []
  - title: Find your way through the programme
    task: Locate the keynote and selected sessions using heading navigation, sequential reading, and link lists. Assess whether programme structure and session destinations remain understandable outside the visual layout.
    methods: [screen-reader-page-structure-and-links]
  - title: Choose a session using its complete content
    task: Identify speakers and venues, compare graphical information with nearby text, and try the graphical schedule control. Check its name, role, keyboard operation, and exposed state, then decide which graphics communicate information or function and which should remain silent.
    methods: [testing-controls-with-a-screen-reader, testing-image-alternative-text, screen-reader-icons-and-svg, screen-reader-page-structure-and-links]
  - title: Review multilingual session information
    task: Read the Finnish and Swedish content. Distinguish markup problems from unavailable voices or unsupported automatic switching, and record the environment needed to reproduce the result.
    methods: [screen-reader-language-changes]
  - title: Inspect session details and return to the programme
    task: Check the names, roles, and operation of controls that open and close session details. Identify the dialog, navigate within it, attempt to reach background content, close it using supported methods, and continue from the trigger.
    methods: [testing-controls-with-a-screen-reader, testing-modal-dialogs, screen-reader-page-structure-and-links, screen-reader-icons-and-svg]
  - title: Consolidate and recommend
    task: Merge overlapping evidence, distinguish defects from passing comparisons and support limitations, prioritize user impact, and recommend whether the programme is ready to publish.
    methods: [screen-reader-page-structure-and-links, testing-controls-with-a-screen-reader, testing-image-alternative-text, screen-reader-icons-and-svg, screen-reader-language-changes, testing-modal-dialogs]
deliverables:
  - Test environment and review scope.
  - Programme-navigation record.
  - Findings with reproduction steps, evidence, user impact, and remediation direction.
  - Passing checks and support-dependent observations.
  - Concise publication recommendation identifying blockers and follow-up testing.
---

Complete the Testing journey in one focused session or split it into shorter reviews. Preserve the same documented environment and initial state when comparing results.

## Testing journey workspace

[Open the Testing journey workspace for the community conference programme](/journey-workspaces/community-conference-programme/) and use that same page throughout the Testing journey. Return here whenever you need the stage guidance or Testing method links. You may open the workspace in a new tab if you want to keep both pages available.

## Build useful evidence

For every observation, record the programme state, navigation or interaction steps, actual result, expected result, and user impact. Keep direct observations separate from assumptions. Combine evidence when several techniques expose one underlying problem, and record useful behavior that passes.

Screen-reader commands, control announcements, state changes, language switching, and dialog behavior can vary across combinations. Record enough environment detail to distinguish a content or implementation problem from unavailable voices, unsupported behavior, or another platform limitation.

## Make the publication recommendation

Prioritize findings by their effect on understanding the programme and choosing sessions. Recommend whether the programme is ready to publish, ready only after specified blockers are corrected, or not ready. State incomplete review areas and required follow-up testing.
