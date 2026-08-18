---
title: Testing a community-course timetable with a screen reader
summary: Investigate table names, navigation, headers, and empty cells in a course timetable and compare them with a correctly marked-up venue table.
description: Practise testing ordinary data-table relationships with a screen reader on a community-course booking page.
status: published
order: 46
category: content-and-structure
topics: [screen readers, data tables, captions, headers, reading order]
prerequisites:
  - Understand the Testing data tables with a screen reader method
difficulty: beginner
estimatedMinutes: 25
exerciseType: find-issues
fixture: community-course-timetable
objectives:
  - Identify and navigate two ordinary data tables with screen-reader table commands.
  - Compare visible relationships with exposed table names, dimensions, and headers.
  - Investigate how empty cells communicate the absence of a scheduled session.
  - Distinguish five timetable findings from useful passing behavior in the venue table.
methods: [testing-data-tables-with-a-screen-reader]
hints:
  - Start by checking how each table is identified. Does each table expose a useful name as you move to it?
  - Move through course cells in both directions and compare the visible weekday and time labels with the headers your screen reader exposes.
  - Inspect the relationship created by the Time header, then consider what a visually empty timetable cell communicates without seeing the layout.
expectedFindings: 5
solution:
  summary: The timetable contains five focused naming and relationship findings. The smaller venue table provides a passing comparison.
  findings:
    - title: The timetable has no accessible name
      explanation: The Weekly timetable heading provides nearby visual context, but the table has no caption or other programmatic name. Give the table a concise caption that identifies the schedule.
      method: testing-data-tables-with-a-screen-reader
    - title: Weekday labels are not column headers
      explanation: Monday, Wednesday, and Saturday look like headings but are ordinary data cells. Mark genuine weekday headings as header cells with the correct column relationship.
      method: testing-data-tables-with-a-screen-reader
    - title: Time-slot labels are not row headers
      explanation: Each time range looks like a row label but is an ordinary data cell. Mark each time range as a row header so it can be associated with the course cells in that row.
      method: testing-data-tables-with-a-screen-reader
    - title: The Time header exposes the wrong relationship
      explanation: The top-left Time header uses row scope even though it labels the time column, producing a misleading relationship. Use a header relationship that matches the structure after correcting the rest of the header cells.
      method: testing-data-tables-with-a-screen-reader
    - title: Empty cells do not communicate that no session is scheduled
      explanation: Blank cells make the absence of a course apparent visually but provide no meaningful value during cell navigation. Include concise text such as No session when the absence is important to understanding the timetable.
      method: testing-data-tables-with-a-screen-reader
---

Use [Testing data tables with a screen reader](/methods/testing-data-tables-with-a-screen-reader/) while investigating the community-course booking page.

1. Record your screen reader, browser, operating system, relevant versions, and initial page state.
2. Move to both tables and record their names and dimensions when your screen reader exposes them.
3. Navigate representative cells by row and by column using table commands. Record the row header, column header, and value exposed for each cell.
4. Compare that output with the weekday, time, course, and venue relationships shown visually.
5. Include the apparently empty timetable cells in your review, and inspect the native markup if the output remains unclear.
6. Identify exactly five findings in the timetable and record useful passing behavior from the venue-information table.
7. For every finding, record actual and expected behavior, likely user impact, and remediation direction.

The venue table has a concise caption, correctly scoped row and column headers, logical source order, and meaningful cell content. Use it as a comparison rather than assuming that both tables are defective.

Exact announcements and table commands can differ across screen readers, browsers, and operating systems. Evaluate whether the relationships are exposed and useful rather than expecting one prescribed speech string.
