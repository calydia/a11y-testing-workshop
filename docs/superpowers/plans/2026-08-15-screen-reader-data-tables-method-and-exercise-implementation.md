# Screen-reader data tables method and Exercise implementation plan

## Goal

Publish a beginner Testing method and standalone Exercise for evaluating ordinary data-table names, dimensions, navigation, header relationships, and meaningful cell content with a screen reader, then integrate the pair into the practical screen-reader Learning path and conference Testing journey.

## Task 1: Pin the content graph and learning contract

### Files

- Create: `tests/screen-reader-data-tables-exercise.spec.js`
- Modify: `tests/screen-reader-methods.spec.js`
- Modify: `tests/exercise-architecture.spec.js`
- Modify: `tests/learning-path.spec.js`
- Modify: `tests/testing-journey.spec.js`
- Modify: `tests/community-conference-workspace.spec.js`
- Modify: `tests/axe-core.spec.js`

### Work

1. Add failing assertions for the method route, beginner metadata, 25-minute estimate, outcomes, ordinary-table scope, repeatable procedure, interpretation guidance, limitations, and Exercise relationship.
2. Add failing assertions for the Exercise route, beginner metadata, five findings, three hints, method relationship, standalone workflow, passing comparison, and closed solution.
3. Pin method order `11` and Exercise order `46` between the existing structure-and-links and controls entries.
4. Pin the pair directly after structure and links in `Practical screen-reader testing`, including its 320-minute estimate and seven-technique scope.
5. Pin the method in the conference journey's ordered method list, programme-navigation stage, consolidation, evidence, and 105-minute estimate while preserving six stages.
6. Pin the conference workspace's added compact schedule table and preservation of the existing session-card experience.
7. Add both learner-facing routes to automated accessibility coverage.

## Task 2: Create and register the timetable fixture

### Files

- Create: `src/components/exercise/fixtures/CommunityCourseTimetableFixture.astro`
- Modify: `src/exercises/fixture-registry.ts`

### Work

1. Build one realistic community-course booking page containing a weekly timetable and a smaller venue-information table.
2. Add exactly the five approved timetable findings without answer labels:
   - no caption or other accessible table name;
   - weekday labels implemented as ordinary cells;
   - time-slot labels implemented as ordinary cells;
   - the top-left `Time` header assigned an incorrect `scope`;
   - visually empty cells that do not communicate `No session`.
3. Add the venue-information passing comparison with a concise caption, correctly scoped column and row headers, logical source order, and meaningful cell content.
4. Keep the fixture deterministic and free of unnecessary interaction so the learner can focus on screen-reader table navigation.
5. Preserve visible hover and focus styles where applicable, saved Lab theme, responsive behavior at 390px, and the explicit return link.
6. Register `community-course-timetable` through the existing document-fixture route contract.

## Task 3: Publish the Testing method

### Files

- Create: `src/content/testing-methods/testing-data-tables-with-a-screen-reader.md`

### Work

1. Add published beginner metadata at order `11`, a 25-minute estimate, screen-reader/browser/markup-inspection tooling, desktop scope, and the related Exercise.
2. Write outcomes for identifying genuine tabular information, finding the table name, determining dimensions, navigating cells, checking row and column headers, and recording evidence.
3. Write an environment-first repeatable procedure that compares representative screen-reader output with visible and source relationships.
4. Cover native table elements, captions, simple headers, restrained `scope`, logical source order, and meaningful empty-cell interpretation.
5. Add interpretation guidance for data tables versus layout tables, static tables versus interactive grids, nearby visible headings versus programmatic names, and platform variation.
6. Describe expected relationships without prescribing exact speech strings.
7. Explicitly defer complex spanning headers, sortable tables, application grids, and cross-platform compatibility claims.

## Task 4: Publish the Exercise

### Files

- Create: `src/content/exercises/testing-a-community-course-timetable-with-a-screen-reader.md`

### Work

1. Add published beginner `find-issues` metadata at order `46`, a 25-minute estimate, fixture ID, method reference, and exactly five expected findings.
2. Write objectives and instructions covering environment recording, both table names, exposed dimensions, cell navigation, header associations, visible comparison, optional markup inspection, and passing checks.
3. Add the three approved progressive hints: table identification, header announcements, then the `Time` relationship and empty cells.
4. Add exactly five solution entries, one for each approved timetable finding, with expected relationship, observed problem, user impact, and remediation direction.
5. Explain why the venue-information table passes.
6. Remind learners to record their actual output rather than expect one prescribed speech string.

## Task 5: Integrate the Learning path

### Files

- Modify: `src/content/learning-paths/practical-screen-reader-testing.md`

### Work

1. Insert the new method and Exercise after the structure-and-links pair and before the controls pair.
2. Increase the estimate from 270 to 320 minutes.
3. Update the summary, description, topics, outcomes, journey transition, and scope language to include table names, navigation, and row-and-column relationships.
4. Change the authored scope from six to seven focused techniques.
5. Preserve every existing pair and the rule that each method is immediately followed by its Exercise.

## Task 6: Integrate the conference Testing journey and workspace

### Files

- Modify: `src/content/testing-journeys/reviewing-a-community-conference-programme.md`
- Modify: `src/components/journey/workspaces/CommunityConferenceProgramme.astro`

### Work

1. Add the method after structure and links and before controls in the ordered method list.
2. Increase the estimate from 90 to 105 minutes.
3. Update description, topics, objectives, and evidence guidance for programme-schedule navigation and exposed header relationships.
4. Extend `Find your way through the programme` with the schedule name, table navigation, and relevant row-and-column relationships.
5. Include the method in consolidation while preserving the intermediate level, six stages, and existing deliverable structure.
6. Add a compact at-a-glance schedule table to the existing workspace without removing or replacing session cards.
7. Give the schedule a small number of table-specific observations and useful passing relationships that do not reproduce the Exercise's exact five findings.
8. Preserve every existing workspace finding, interaction, theme behavior, and return route.

## Task 7: Verify intentional, passing, and integrated behavior

### Files

- Complete: `tests/screen-reader-data-tables-exercise.spec.js`
- Complete: `tests/community-conference-workspace.spec.js`

### Work

1. Verify the Exercise fixture's document boundary, return route, theme persistence, mobile fit, and absence of teaching answers in markup.
2. Verify exactly five authored findings and exactly five solution sections.
3. Verify that the timetable lacks an accessible name, exposes weekday and time labels as ordinary cells, assigns the wrong scope to `Time`, and leaves no-session cells ambiguous without introducing unrelated failures.
4. Verify the venue table's caption, column headers, row headers, source order, and meaningful data cells.
5. Verify progressive hints and the closed-by-default solution.
6. Verify expected axe results in light and dark themes, limited to issues axe can detect reliably.
7. Verify the conference schedule's intended table observations and passing relationships separately from the Exercise fixture.
8. Verify that the conference workspace retains its existing cards, controls, modal behavior, language changes, images, and return workflow.

## Task 8: Complete project verification

### Work

1. Run the focused data-table, method, Exercise, path, journey, workspace, architecture, breadcrumb, and axe tests under Node.js 24.
2. Run Astro diagnostics and the production build.
3. Run the complete Playwright suite on the default port `4321`.
4. Review the method, Exercise, fixture, journey, and conference workspace at desktop/mobile widths in light and dark themes.
5. Manually navigate representative cells in the flawed timetable, passing venue table, and conference schedule with an available screen-reader and browser combination.
6. Crawl generated internal links and verify the new routes appear in the sitemap.
7. Run `git diff --check` and inspect the final diff for unrelated changes.

## Out of scope

- Multi-level headers and irregular row or column spans.
- Sortable tables, spreadsheet-like interfaces, and interactive grids.
- A comprehensive table-ARIA tutorial or multi-platform compatibility matrix.
- A new Learning path or Testing journey.
- Changes to the first Learning path or course-registration journey.
- Replacing the conference session cards with a table.
- Treating either deliberately incomplete fixture as production-ready scheduling software.
