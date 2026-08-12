# Course registration Testing journey design

## Goal

Publish the first Testing journey, `Reviewing a course registration before launch`, as a structured beginner review of one consistent interface. The journey combines five existing Testing methods and teaches scope definition, test sequencing, evidence consolidation, prioritization, and a launch recommendation.

The journey applies skills. It does not reteach the methods, duplicate the forms Exercise, or reveal the Exercise solution before the learner completes their own review.

## Route and collection placement

Publish at:

`/journeys/reviewing-a-course-registration-before-launch/`

Use status `published` and order `10`. Publishing the entry replaces the truthful empty state on `/journeys/` and adds the journey to the collection-driven Testing journeys submenu.

Use the existing Testing journey collection schema and dynamic route. Do not add schema fields, primary-navigation items, or a new fixture.

## Audience, duration, and prerequisites

Set:

- difficulty: `beginner`;
- estimated time: `90` minutes;
- role: `Accessibility tester supporting a pre-release review`.

Tell learners they may split the journey across two sessions. The first Learning path is recommended preparation but is not a schema reference or hard prerequisite. The community-course registration Exercise is optional preparation; learners should avoid opening its solution until their independent journey review is complete.

## Scenario

A community organization is preparing to launch online registration for a new course. The learner has been asked to perform a focused pre-release accessibility review of the registration experience and advise whether it is ready to launch.

The review covers one consistent interface: the existing standalone course-registration fixture at:

`/exercise-fixtures/course-registration/`

Reuse this registered fixture route directly. Do not embed the Exercise page, duplicate the fixture, alter its intentional defects, or expose the Exercise solution. A realistic review includes both failures and passing behavior; every method does not need to discover a new issue.

## Methods and optional preparation

Reference exactly five Testing methods:

1. `testing-with-automated-tools`
2. `testing-keyboard-accessibility`
3. `testing-visual-accessibility`
4. `testing-zoom-and-reflow`
5. `testing-forms-and-validation`

Reference `testing-a-community-course-registration-form` in the journey's `exercises` array as optional preparation. Present it with a warning to complete the independent review before consulting the Exercise solution.

The forms method supplies the limited screen-reader verification step. Do not add every specialized screen-reader method to this beginner journey.

## Objectives

Learners should be able to:

1. Define and document a reproducible review scope and test environment.
2. Sequence automated and manual checks across relevant interface states.
3. Record findings and passing checks with useful evidence.
4. Consolidate overlapping observations without inflating issue counts.
5. Prioritize impact and make a concise, evidence-based launch recommendation.

## Six-stage sequence

The frontmatter `stages` array is the authoritative sequence. Render exactly six stages.

### 1. Define the review scope

Task: Record the route, browser, viewport, zoom baseline, theme, assistive technology, test data, and included interface states. State what is outside the review.

No method reference is required for this planning stage.

### 2. Establish an automated baseline

Task: Scan the initial form and the invalid-submission state. Verify each result against the rendered interface and record the configuration and state needed to reproduce it.

Reference `testing-with-automated-tools`.

### 3. Test core manual access

Task: Review keyboard operation, focus order, visible focus, visual instructions, required indicators, control boundaries, error presentation, and interactive states. Record passing behavior as well as findings.

Reference `testing-keyboard-accessibility` and `testing-visual-accessibility`.

### 4. Test responsive conditions

Task: Review browser zoom, text resizing, and reflow at the method's defined conditions. Confirm whether content and controls remain available without assuming the interface must contain a defect.

Reference `testing-zoom-and-reflow`.

### 5. Test the complete form journey

Task: Inspect labels, instructions, and groups; submit invalid data; locate and understand errors; correct values; submit successfully; and use a screen reader to verify relationships and announcements.

Reference `testing-forms-and-validation` and `testing-keyboard-accessibility`.

### 6. Consolidate and recommend

Task: Merge duplicate evidence, distinguish findings from passing checks, prioritize user impact, identify launch blockers and follow-up work, and make a concise launch recommendation.

Reference all five methods because the final decision synthesizes the complete review.

## Deliverables

Render exactly five static deliverables:

1. Scope and test-environment note.
2. Method-by-method test record.
3. Findings table with evidence, user impact, and remediation direction.
4. Passing checks worth preserving during remediation.
5. Short launch recommendation identifying blockers and follow-up work.

These are ordinary list items, not checkboxes, completion controls, form inputs, or saved progress. Do not require a particular reporting tool or downloadable template.

## Reporting guidance

The Markdown body should add concise guidance that is unique to a Testing journey:

- use one finding for one underlying problem even when several methods expose it;
- separate observed evidence from assumptions;
- record the interface state and method needed to reproduce each finding;
- include meaningful passing checks so remediation does not regress them;
- prioritize by user impact and task obstruction rather than automated severity alone;
- make a conditional launch recommendation when evidence supports it.

Do not include a completed model report, the six Exercise findings, hidden answers, grading, or a required finding count.

## Reusable Testing journey presentation

### Metadata

Add a focused Journey metadata adapter using the shared `ContentMeta` component. Render through `ContentLayout`'s `meta` slot:

- `Difficulty: beginner`
- `Estimated time: 90 minutes`

### Scenario and role

Render a labelled Scenario section from the `scenario` field and show the optional role as `Your role`. Do not duplicate these values manually in Markdown.

### Objectives

Render the frontmatter objectives once in a `What you will practise` section.

### Methods used

Resolve referenced methods at build time and render a compact list of linked titles and summaries. Preserve the frontmatter order.

### Stages

Render one semantic ordered list from `stages`. Each stage displays:

- stage title;
- task;
- relevant method links in frontmatter order.

A stage with no methods renders normally without an empty methods container. Do not turn stages into interactive completion controls.

### Optional preparation

Resolve the referenced Exercise at build time and render its title, summary, duration, and link. Add clear text telling learners not to consult its solution before completing their independent review.

### Workspace

Add a clearly labelled link to the standalone course-registration fixture. The link opens the same route used by the Exercise but does not embed it. Do not introduce a new iframe or modify shared iframe sizing.

### Deliverables

Render the five frontmatter deliverables in a labelled static list.

## Component and data architecture

Update the Testing journey detail route to resolve only the method and Exercise references required by the current entry. Normalize them to small view models containing URL, title, summary, and estimated time where relevant.

Extend `JourneyLayout` with focused static components, for example:

- `JourneyMeta`
- `JourneyScenario`
- `JourneyObjectives`
- `JourneyMethods`
- `JourneyStages`
- `JourneyPreparation`
- `JourneyDeliverables`

Components may be combined when their responsibilities remain clear, but journey-specific presentation must not be folded into Exercise or Learning path components. Reuse `ContentMeta` and general content-link conventions where appropriate.

All output is static HTML generated at build time. No hydration, client state, account, grading, or storage is needed.

Astro content references must fail validation or the build when a referenced method or Exercise is missing. Do not silently omit unresolved references. Render the stages and method arrays in their authored order.

## Accessibility and responsive behavior

Use semantic headings, lists, and an ordered list for stages. Method, Exercise, and workspace links retain visible focus treatment. Difficulty, duration, stage sequence, and method associations are expressed in text and do not rely on color or icons.

The page must work in light and dark themes, at desktop and narrow mobile widths, and without page-level horizontal overflow. Long stage titles, summaries, method names, and deliverables must wrap.

The surrounding journey page must have no automatically detectable accessibility violations. The directly linked fixture retains its intentionally inaccessible teaching state and existing focused regression tests.

## Testing

Add focused browser tests for:

- successful journey route and listing publication;
- removal of the Testing journeys empty state;
- breadcrumb and section-navigation behavior;
- compact difficulty and 90-minute metadata;
- scenario and role;
- exactly five objectives;
- exactly five referenced methods in approved order with correct links;
- exactly six ordered stages with approved titles, tasks, and stage-specific method links;
- one optional Exercise with correct title, summary, duration, and route;
- the warning not to consult the solution early;
- a direct workspace link to `/exercise-fixtures/course-registration/`;
- exactly five static deliverables;
- absence of Exercise solution text, checkboxes, progressbars, completion controls, grading, and progress storage;
- visible link focus treatment;
- light/dark theme and narrow-viewport behavior;
- no automated accessibility violations;
- unchanged Learning path rendering and iframe behavior;
- successful Astro diagnostics, content reference resolution, production build, and full regression suite.

Visually review desktop/mobile and light/dark presentation. Run `git diff --check` and confirm no fixture or Exercise implementation changed.

## Deferred work

- A second Testing journey
- A model report or downloadable reporting template
- Progress tracking, grading, or saved state
- New Testing methods or Exercises
- A journey-specific fixture
- Changes to the course-registration fixture or its intentional findings
- Iframe sizing or scrolling redesign
- Legacy content cleanup
