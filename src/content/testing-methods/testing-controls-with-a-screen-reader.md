---
title: Testing controls with a screen reader
summary: Check whether common controls expose useful names, roles, states, values, keyboard behavior, and changes after interaction.
description: Learn a repeatable beginner procedure for testing common controls with a screen reader.
status: published
order: 17
category: interaction-and-tasks
topics: [screen readers, controls, accessible names, roles, states, keyboard]
prerequisites: [Basic keyboard use, Basic use of one screen reader]
skillLevel: beginner
estimatedMinutes: 25
tools: [Screen reader, Keyboard, Web browser]
platforms: [Desktop]
outcomes:
  - Compare a control's accessible name with its visible label and purpose.
  - Identify exposed roles, states, and values before and after interaction.
  - Operate common controls using their expected keyboard commands.
  - Distinguish navigation links from buttons that perform actions.
  - Record findings, passing behavior, and platform-dependent observations.
relatedExercises: [testing-controls-in-a-community-events-finder]
interpretation:
  - Pointer operation does not prove that a control exposes the correct role, state, or keyboard behavior.
  - An accessible name should communicate the same purpose as the visible label, not merely exist.
  - A changed control state and a separate update elsewhere on the page may need different announcements.
limitations:
  - This method does not cover composite widgets such as comboboxes, tabs, trees, grids, or drag-and-drop controls.
  - Announcements and interaction modes vary between screen-reader, browser, and operating-system combinations.
  - One technical review does not establish compatibility across platforms or replace testing with disabled people.
---

## What this method tests

This method checks whether a screen-reader user can identify, understand, and operate common controls and determine what changed afterward. It covers native buttons, links, checkboxes, radio buttons, disclosure buttons, and a simple switch-like control.

## What you need

Use one screen reader with a compatible browser and a keyboard. Record the screen reader, browser, operating system, versions, and initial page state. Use the screen reader's own commands for moving to controls and reading their properties.

## How to perform the test

For each control:

1. Read its visible label and determine its intended purpose from the surrounding content.
2. Move to it with the screen reader and record its accessible name and exposed role.
3. Record its initial state or value when one applies, such as checked, selected, pressed, or expanded.
4. Confirm that a link navigates and a button performs an action rather than exposing the wrong control type for its purpose.
5. Operate it with the expected keyboard command. For example, use Enter for links and buttons, Space for checkboxes, and arrow keys within a native radio group.
6. Re-check its name, state, or value after the interaction.
7. Check whether related information elsewhere on the page changed and whether that update was communicated.
8. Record the observation as a finding, passing check, or support-dependent result with enough detail to reproduce it.

## What to observe

Listen for names that are absent, vague, duplicated, or inconsistent with visible labels. Check whether the role matches the control's purpose and whether checked, selected, expanded, or saved states remain accurate after activation. Confirm that keyboard operation follows the expected pattern and that important results are not available only visually.

Native HTML controls usually provide the strongest baseline when they match the required purpose. Custom controls must reproduce the relevant semantics, state updates, and keyboard behavior rather than only their appearance.
