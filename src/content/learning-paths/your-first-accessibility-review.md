---
title: Your first accessibility review
summary: Build a practical beginner review through paired methods and Exercises for automated, keyboard, visual, text-spacing, zoom, and forms testing.
description: Follow an interleaved beginner path through automated, keyboard, visual, text-spacing override, zoom, screen-reader preparation, and forms testing.
status: published
order: 10
topics: [beginner, accessibility review, automated testing, keyboard, visual, text spacing, user overrides, zoom, forms]
prerequisites:
  - Basic familiarity with using a web browser
level: beginner
estimatedMinutes: 290
outcomes:
  - Define and run a scoped automated accessibility check without treating it as complete coverage.
  - Perform baseline keyboard, visual, and zoom and reflow reviews.
  - Apply the complete text-spacing condition and check whether content and functionality remain available.
  - Prepare a screen reader for limited form-oriented verification.
  - Test form labels, instructions, groups, validation errors, focus handling, and success communication.
  - Record reproducible findings and distinguish automated evidence from required human judgment.
steps:
  - type: method
    entry: testing-with-automated-tools
  - type: exercise
    entry: comparing-automated-and-manual-findings
  - type: method
    entry: testing-keyboard-accessibility
  - type: exercise
    entry: keyboard-testing-a-preferences-form
  - type: method
    entry: testing-visual-accessibility
  - type: exercise
    entry: finding-visual-problems-in-an-account-dashboard
  - type: method
    entry: testing-text-spacing-and-user-overrides
  - type: exercise
    entry: testing-text-spacing-on-a-community-services-page
  - type: method
    entry: testing-zoom-and-reflow
  - type: exercise
    entry: testing-an-appointment-booking-at-high-zoom
  - type: content
    title: Prepare for screen-reader checks
    anchor: prepare-for-screen-reader-checks
  - type: method
    entry: testing-forms-and-validation
  - type: exercise
    entry: testing-a-community-course-registration-form
---

Work through this path across several sessions. Revisit each Testing method while you complete its Exercise.

The Exercises use different small interfaces. Together they build transferable testing skills; they are not one continuous product review. A Testing journey combines several techniques in one realistic scenario.

## Prepare for screen-reader checks

The Testing method for forms and validation and its Exercise include a limited screen-reader verification step. Before continuing, choose one screen reader that works with your operating system and browser.

1. Learn how to start, pause or silence, and stop the screen reader.
2. Practise moving through native form controls.
3. Listen for each control's name, role, state, value, description, and group context where applicable.
4. Record what is actually announced and how the control behaves. Exact wording and timing can differ between screen readers and browsers.
5. Keep your visual and keyboard observations separate from your screen-reader observations.

You do not need to learn every screen-reader command before continuing. The goal is to gather enough direct evidence to inspect the form relationships and validation messages in the final Testing method and Exercise.

## Where to go next

Apply the foundational methods together in [Reviewing a course registration before launch](/journeys/reviewing-a-course-registration-before-launch/). The journey guides you through one realistic review and an evidence-based launch recommendation.

Continue with [Practical screen-reader testing](/learn/practical-screen-reader-testing/) when you want focused practice with page structure, links, data tables, controls, images, graphics, language changes, and modal dialogs.

Both are optional next steps, not requirements for completing this beginner path.

## Keep the scope in mind

This path is a broad introduction to a first accessibility review, not a complete audit or conformance assessment. When you review a real product, record the areas you did not test and arrange additional specialist testing and testing with disabled people according to the product and its risks.

[Read about the full scope and limitations of the Lab](/about/), including what its technical checks can and cannot establish.
