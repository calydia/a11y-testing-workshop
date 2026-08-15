# Screen-reader data tables method and Exercise design

## Goal

Add a beginner Testing method and paired Exercise that teach learners to evaluate ordinary data tables with a screen reader. The pair should help learners connect visible row-and-column relationships with the table name, dimensions, headers, cell navigation, and spoken or inspected output.

The pair must distinguish data tables from layout tables and interactive grids. It must not imply that one screen reader announces every table identically or expand into advanced table patterns.

## Content position

Create:

- Testing method: `Testing data tables with a screen reader`
- Method slug: `testing-data-tables-with-a-screen-reader`
- Exercise: `Testing a community-course timetable with a screen reader`
- Exercise slug: `testing-a-community-course-timetable-with-a-screen-reader`
- Standalone fixture ID: `community-course-timetable`

Use beginner level for both entries. Estimate 25 minutes for the method and 25 minutes for the Exercise.

Place the method at order `11`, after `Testing page structure and links with a screen reader` and before `Testing controls with a screen reader`. Place the Exercise at order `46`, after the structure-and-links Exercise and before the controls Exercise.

Connect the entries bidirectionally:

- The method lists the Exercise through `relatedExercises`.
- The Exercise lists the method through `methods`.

## Testing method

### Learning outcomes

The method teaches learners to:

- Decide whether information genuinely depends on tabular relationships.
- Find and assess the table's accessible name or caption.
- Determine the row and column count when the test environment exposes it.
- Navigate cell by cell and by row or column with screen-reader table commands.
- Check that relevant column and row headers are associated with data cells.
- Compare announced or inspected relationships with the visible table.
- Inspect markup and restrained use of `scope` when output is unclear.
- Record passing behavior as well as missing, incorrect, or misleading relationships.

### Procedure

The method asks the learner to document their screen reader, browser, operating system, and versions before testing. For each table, the learner records:

1. The information represented and whether a table is appropriate.
2. The table name or caption exposed to the screen reader.
3. The row and column count when available.
4. The result of moving through representative cells with table navigation commands.
5. The row and column headers associated with each representative data cell.
6. Whether empty cells communicate an understandable relationship or absence of data.
7. Any difference between visible relationships, source order, markup, and screen-reader output.
8. Passing checks, defects, and environment-dependent observations.

The method should prefer native table elements and simple header relationships. Markup inspection supports the screen-reader test but does not replace it.

### Interpretation and limitations

The guidance will distinguish:

- A data table from content that merely uses rows and columns for visual layout.
- A static data table from an interactive grid with application-style keyboard behavior.
- A visible heading above a table from a programmatically associated caption or accessible name.
- A cell that looks aligned with a header from one whose relationship is exposed.
- An intentionally empty value from an absence that becomes ambiguous without visual context.
- A reproducible implementation problem from variation in announcements or commands across screen-reader and browser combinations.

Examples and expected results must describe relationships rather than prescribe an exact speech string.

## Exercise scenario

The standalone workspace presents a community-course booking page with a flawed weekly timetable and a smaller, correctly marked-up venue-information table. The timetable lets learners practise finding related row and column information, while the venue table provides a passing comparison on the same page.

The timetable contains exactly five intentional findings. It must not label defective targets, expose the answers in comments or test-oriented attributes, or make every table behavior fail.

### Intentional findings

1. **The timetable has no caption or other accessible name.**
   A visible page heading provides surrounding context, but the table itself is not programmatically named. The venue-information comparison has a concise caption.

2. **Weekday labels are ordinary cells instead of column headers.**
   They look like headings visually, but data cells do not receive the relevant weekday relationship during table navigation.

3. **Time-slot labels are ordinary cells instead of row headers.**
   They look like headings visually, but course cells do not receive the relevant time relationship during table navigation.

4. **The top-left `Time` header uses the wrong `scope`.**
   It is a header cell, but its scope creates a misleading relationship instead of correctly describing the time-label column.

5. **Visually empty timetable cells do not communicate `No session`.**
   Visual spacing suggests that no course is scheduled, but cell navigation provides no meaningful value for that absence.

### Passing comparison

The venue-information table includes:

- A concise caption.
- Correctly scoped column and row headers.
- Logical source order.
- Meaningful data-cell content.
- Relationships that remain understandable during table navigation.

The surrounding page also provides stable heading structure, visible focus, accessible instructions, and an explicit return link.

## Exercise guidance

The Exercise objectives and task steps ask learners to:

- Record their test environment.
- Identify and navigate both data tables with screen-reader table commands.
- Record the table names and exposed dimensions where available.
- Move through representative cells and note the associated row and column headers.
- Compare the output with the relationships conveyed visually.
- Inspect the table markup if the output is unclear.
- Identify exactly five timetable findings.
- Record passing behavior from the venue-information table.
- Document actual behavior, expected relationships, likely user impact, and remediation direction.

Hints remain progressive:

1. Direct attention to how each table is identified and whether its purpose is exposed.
2. Ask the learner to compare visual weekday and time labels with the headers announced for course cells.
3. Direct attention to the `Time` relationship and what an apparently empty cell communicates without visual context.

The solution stays closed by default and contains exactly five finding sections. Each section describes the expected relationship, observed problem, likely impact, and remediation. It also explains why the venue-information table passes.

## Reusable component structure

Follow the standalone-first Exercise architecture used by the existing practice fixtures:

- Add a dedicated `CommunityCourseTimetableFixture.astro` containing only the practice page, tables, and local styles.
- Register the fixture through the existing fixture route contract rather than creating a bespoke public route.
- Use the shared Exercise page rendering, metadata panel, start-and-return workflow, hints, and solution rendering.
- Preserve theme preference in the standalone fixture and provide an explicit return link to the Exercise.

Do not use an iframe or force a new tab. Keep the flawed timetable and passing venue table together so learners can compare table behavior without changing context.

## Learning path integration

Add the method and Exercise to `Practical screen-reader testing` immediately after the structure-and-links pair and before the controls pair.

Update the path:

- Summary and description mention interpreting data-table names and relationships.
- Topics include data tables, captions, and header relationships where appropriate.
- Outcomes include navigating tables and evaluating row and column associations.
- Steps include the new method followed immediately by its Exercise.
- Estimated duration increases from 270 to 320 minutes, matching the additional 25-minute method and 25-minute Exercise.
- Scope text changes from six to seven focused techniques.
- The journey transition mentions applying table testing to a conference programme.

The pair remains self-contained for direct visitors; the path is recommended sequencing, not a prerequisite gate.

## Testing journey integration

Add the method to `Reviewing a community conference programme`, where a compact at-a-glance schedule is genuinely tabular.

Extend the existing conference workspace with a small schedule table. Keep the existing card-based session content because it supports the broader journey tasks; the table is an additional representation rather than a replacement. Give the schedule a small number of table-specific observations and useful passing relationships, without copying the Exercise timetable or its exact findings.

Update the journey:

- Description, topics, and objectives mention navigating the programme schedule and checking exposed header relationships.
- Add the method to the ordered `methods` list after structure and links and before controls.
- Extend `Find your way through the programme` to include table navigation, the schedule name, and relevant row-and-column relationships.
- Include the data-tables method in consolidation and expected evidence.
- Increase estimated duration from 90 to 105 minutes.
- Preserve the existing six-stage structure.

Do not change `Your first accessibility review`, the course-registration journey, or the first broad Learning path.

## Verification

Add focused automated coverage for:

- Method and Exercise routes, metadata, collection order, bidirectional links, and content-type labels.
- Exactly five documented timetable findings and exactly five solution sections.
- The flawed timetable's intentional semantic boundary without unrelated failures.
- The passing venue table's caption, row headers, column headers, source order, and meaningful cell content.
- Standalone fixture return route, theme persistence, responsive layout, and unique IDs.
- Progressive hints, closed solution, and authored markup that does not reveal answers.
- Learning path order, updated outcomes, 320-minute estimate, and seven-technique scope language.
- Conference journey method order, schedule-stage integration, six-stage structure, and 105-minute estimate.
- The conference workspace schedule's intended observations and passing relationships without disrupting existing behavior.
- Expected axe results in light and dark themes, limited to issues axe can reliably detect.
- Generated internal links and sitemap coverage.

Run Astro diagnostics, the production build, focused tests, and the complete Playwright suite on the default port `4321` under Node.js 24. Complete a visual review at desktop and narrow widths and a manual screen-reader review of representative cells in both tables, because automated semantic assertions cannot establish the quality of the navigation experience or announcements.

## Out of scope

- Multi-level headers and irregular row or column spans.
- Sortable tables, spreadsheet-like interfaces, and interactive grids.
- A comprehensive tutorial on every table-related ARIA attribute.
- Prescribing exact speech output or commands for every screen reader.
- Testing every browser, operating system, and screen-reader combination.
- Adding a new Testing journey or Learning path.
- Replacing the conference journey's session cards with a table.
- Treating either fixture as production-ready booking or scheduling software.
