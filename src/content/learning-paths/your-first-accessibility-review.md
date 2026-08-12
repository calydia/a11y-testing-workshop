---
title: Your first accessibility review
summary: Build a practical beginner review by learning one foundational testing technique and then applying it in a focused Exercise.
description: Follow an interleaved beginner path through automated, keyboard, visual, zoom, screen-reader preparation, and forms testing.
status: published
order: 10
topics: [beginner, accessibility review, automated testing, keyboard, visual, zoom, forms]
prerequisites:
  - Basic familiarity with using a web browser
level: beginner
estimatedMinutes: 250
outcomes:
  - Define and run a scoped automated accessibility check without treating it as complete coverage.
  - Perform baseline keyboard, visual, and zoom and reflow reviews.
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

## Prepare for screen-reader checks

The forms method and Exercise include a limited screen-reader verification step. Before continuing, choose one screen reader that works with your operating system and browser.

1. Learn how to start, pause or silence, and stop the screen reader.
2. Practise moving through native form controls.
3. Listen for each control's name, role, state, value, description, and group context where applicable.
4. Record what is actually announced and how the control behaves. Exact wording and timing can differ between screen readers and browsers.
5. Keep your visual and keyboard observations separate from your screen-reader observations.

You do not need to learn every screen-reader command before continuing. The goal is to gather enough direct evidence to inspect the form relationships and validation messages in the final method and Exercise.

## Where to go next

Continue with [Testing image alternative text](/methods/testing-image-alternative-text/) and [Evaluating image alternative text in context](/exercises/evaluating-image-alternative-text-in-context/) when you want to extend your image-testing skills.

For more focused screen-reader practice, explore:

- [Testing page structure and links with a screen reader](/methods/screen-reader-page-structure-and-links/)
- [Testing icons and SVGs with a screen reader](/methods/screen-reader-icons-and-svg/)
- [Testing language changes with a screen reader](/methods/screen-reader-language-changes/)
- [Testing modal dialogs](/methods/testing-modal-dialogs/)

These are useful next skills, not requirements for completing this beginner path.
