---
title: Testing data tables with a screen reader
summary: Check whether a data table exposes a useful name, dimensions, navigation, and row-and-column relationships.
description: Learn a repeatable beginner procedure for testing ordinary data tables with a screen reader.
status: published
order: 16
category: content-and-structure
topics: [screen readers, data tables, captions, headers, reading order]
prerequisites: [Basic keyboard use, Basic use of one screen reader]
skillLevel: beginner
estimatedMinutes: 25
tools: [Screen reader, Keyboard, Web browser, Browser developer tools]
platforms: [Desktop]
outcomes:
  - Decide whether information genuinely depends on tabular relationships.
  - Find and assess a table's accessible name and exposed dimensions.
  - Navigate representative cells using screen-reader table commands.
  - Check whether data cells expose their relevant row and column headers.
  - Compare screen-reader output with visible relationships and source order.
  - Record findings, passing behavior, and platform-dependent observations.
relatedExercises: [testing-a-community-course-timetable-with-a-screen-reader]
interpretation:
  - A visual heading above a table does not necessarily provide the table itself with an accessible name.
  - Visual alignment does not prove that row and column relationships are programmatically exposed.
  - Static data tables and interactive grids have different semantics and keyboard expectations.
limitations:
  - This method does not cover multi-level headers, irregular spans, sortable tables, or interactive grids.
  - Table commands and announcements vary between screen-reader, browser, and operating-system combinations.
  - One technical review does not establish compatibility across platforms or replace testing with disabled people.
---

## What this method tests

This method checks whether a screen-reader user can identify an ordinary data table, understand its dimensions, move through its cells, and determine which row and column headers describe each value. Use it when information depends on relationships across two dimensions, such as a timetable, price comparison, or venue summary.

Do not treat every visual arrangement of rows and columns as a data table. Layout tables are used only to position content and should not expose data-table relationships. Interactive grids behave more like applications and require a separate test of their keyboard model and changing state.

## What you need

Use one screen reader with a compatible browser and a keyboard. Record the screen reader, browser, operating system, versions, and initial page state. Find the commands for moving to tables, reading table information, and moving by cell, row, or column in your chosen screen reader.

Browser developer tools can help you inspect the underlying table, caption, header cells, and `scope` attributes when the output is unclear. Markup inspection supports the screen-reader test; it does not replace navigating the rendered table.

## How to perform the test

For each table:

1. Identify what information the table represents and decide whether its meaning genuinely depends on row-and-column relationships.
2. Move to the table and record the name or caption exposed by the screen reader.
3. Record the row and column count when your test environment exposes it.
4. Move through representative cells with table-navigation commands instead of relying only on sequential reading.
5. For each selected data cell, record the relevant column header, row header, and cell value that are announced or otherwise exposed.
6. Move in both directions through the table and check that the reading order matches the intended relationships.
7. Check what empty cells communicate. Confirm that an absence such as “No session” remains understandable without visual context.
8. If a relationship is unclear, inspect whether native `table`, `caption`, `th`, and `td` elements are used and whether simple `scope` values match the visible relationships.
9. Record the result as a finding, passing check, or support-dependent observation with enough detail to reproduce it.

## What to observe

Listen for a useful table name and, where supported, dimensions that match the rendered table. Check several cells rather than assuming that one correct announcement proves every relationship. Include cells at the beginning, middle, and end of the table, and include an empty-looking cell when one exists.

Simple native markup is usually the strongest baseline: a concise caption, header cells for genuine headings, logical source order, and restrained `scope="col"` or `scope="row"` where the relationship is simple. Do not add table semantics to content that does not need them.

Exact commands and speech strings differ across environments. Evaluate whether the name, values, and relationships are available and useful rather than expecting one prescribed announcement.
