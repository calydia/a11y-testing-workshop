# Screen-reader controls method and Exercise design

## Goal

Add a beginner Testing method and paired Exercise that teach learners to inspect common controls with a screen reader. The pair closes the current curriculum gap between keyboard operability and the correct exposure of names, roles, states, values, and changes after interaction.

The pair must remain focused on common controls. It must not become a gallery of ARIA widgets or imply that one assistive-technology result represents every platform.

## Content position

Create:

- Testing method: `Testing controls with a screen reader`
- Method slug: `testing-controls-with-a-screen-reader`
- Exercise: `Testing controls in a community events finder`
- Exercise slug: `testing-controls-in-a-community-events-finder`
- Standalone fixture ID: `community-events-finder`

Use beginner level for both entries. Estimate 25 minutes for the method and 25 minutes for the Exercise.

Place the method at order `12`, after `Testing page structure and links with a screen reader` and before `Testing image alternative text`. Place the Exercise at order `47`, after the structure-and-links Exercise and before the image-alternative-text Exercise.

Connect the entries bidirectionally:

- The method lists the Exercise through `relatedExercises`.
- The Exercise lists the method through `methods`.

## Testing method

### Learning outcomes

The method teaches learners to:

- Identify the exposed role of a common interactive element.
- Compare its accessible name with its visible label, purpose, and nearby instructions.
- Check its initial state or value before activation.
- Operate it using the keyboard behavior expected for that control.
- Re-check whether a changed state, value, or expanded/collapsed condition is exposed.
- Distinguish a navigation link from a button that performs an action.
- Record passing behavior as well as defects.

### Procedure

The reusable procedure will ask the learner to establish a documented screen-reader and browser environment, then examine each control in both its initial and changed states. For each control, the learner records:

1. Visible label and purpose.
2. Announced or inspected accessible name.
3. Exposed role.
4. Initial state or value when applicable.
5. Expected keyboard command and observed operation.
6. Exposed state, value, or result after operation.
7. Whether the result is a finding, passing check, or support-dependent observation.

The method covers native buttons, links, checkboxes, radio buttons, disclosure buttons, and a simple switch-like control. It explains that native HTML is generally the baseline when it provides the required semantics and interaction.

### Interpretation and limitations

The interpretation guidance will distinguish:

- A control that works with a pointer from one whose role and state are correctly exposed.
- A control that has an accessible name from one whose name communicates the same purpose as its visible label.
- A state change from a separate page update that may require an announcement.
- A platform variation from an implementation failure, based on reproducible evidence rather than one exact speech string.

The limitations explicitly defer comboboxes, tabs, trees, grids, drag-and-drop, nested composite widgets, and other advanced patterns. Testing one browser and screen reader does not establish compatibility across combinations or replace testing with disabled people.

## Exercise scenario

The standalone workspace presents a community events finder. Learners expand filters, choose event categories, change the results view, save an event, and inspect event details.

The page contains five intentional findings and passing comparisons. It must not label defective targets, reveal the solution in markup, or make every control fail.

### Intentional findings

1. **The filter disclosure exposes stale expanded state.**
   The filter panel opens and closes visually, but the trigger's `aria-expanded` value remains `false`. The button remains keyboard operable and correctly named so the finding stays focused on state.

2. **Event details use the wrong control type.**
   A `View event details` control is implemented and exposed as a button even though its purpose is navigation to an event-detail destination. The comparison event uses an ordinary link.

3. **The save-event switch exposes stale checked state.**
   A simple switch-like control can be focused and operated with both pointer and Space. Its visible saved state changes, but its exposed `aria-checked` value does not. This avoids combining keyboard and state defects in one target.

4. **A second event's visible save-control label conflicts with its accessible name.**
   This separate control visibly says `Save event`, while its accessible name uses unrelated `Bookmark item` wording that does not include the visible label. Its role and operation otherwise work. It is not the switch used for the stale-state finding.

5. **Filtered results change without an announcement.**
   Selecting a category updates the visible result count and list, but the changed result information is not exposed through an appropriate status announcement. The native checkbox itself remains correctly named, checked, and keyboard operable.

### Passing comparisons

The workspace includes:

- Correctly associated native category checkboxes.
- A native radio group for list or compact view.
- A correctly named ordinary action button.
- A correct event-detail link.
- Controls with exposed initial state and expected keyboard operation.
- Stable page structure, visible focus, and accessible surrounding instructions.

Passing comparisons let the learner distinguish a localized finding from a broken page and record evidence of useful behavior.

## Exercise guidance

The Exercise objectives and task steps ask learners to:

- Record their screen reader, browser, operating system, and versions.
- Inspect every interactive control in its initial state.
- Compare visible labels with accessible names and intended purpose.
- Check roles, states, and values.
- Operate each control with the expected keyboard command.
- Re-check changed states and resulting page information.
- Identify exactly five findings and record passing comparisons.
- Record reproduction steps, actual and expected behavior, user impact, and remediation direction.

Hints remain progressive:

1. Direct attention to the filter trigger, event actions, and information that changes after interaction.
2. Ask the learner to compare visible labels with names, roles, and initial versus changed state.
3. Identify the specific properties and result announcement to inspect without giving the fixes verbatim.

The solution stays closed by default and contains exactly five finding sections matching the approved boundary.

## Reusable component structure

Follow the standalone-first Exercise architecture already used by other fixtures:

- Add a dedicated `CommunityEventsFinderFixture.astro` containing only the practice interface and its local behavior/styles.
- Register the fixture through the existing fixture route contract rather than creating a bespoke page route.
- Use the shared Exercise page rendering, metadata panel, start/return workflow, hints, and solution rendering.
- Preserve theme preference in the standalone fixture and provide an explicit return link to the Exercise.

Do not use an iframe or force a new tab. Do not share implementation code with the existing community-events dashboard fixture merely because the scenarios have similar names; the two fixtures teach different skills and should remain independently understandable.

## Learning path integration

Add the method and Exercise to `Practical screen-reader testing` immediately after the structure-and-links pair.

Update the path:

- Summary and description mention common control semantics and state changes.
- Topics include controls, roles, names, and states where appropriate.
- Outcomes include checking names, roles, state/value changes, keyboard behavior, and result announcements.
- Steps include the new method followed immediately by its Exercise.
- Estimated duration increases from 220 to 270 minutes, matching the additional 25-minute method and 25-minute Exercise.
- The scope text changes from five to six focused techniques.
- The journey transition mentions control testing as part of the conference application.

The pair remains self-contained for direct visitors; the path is recommended sequencing, not a prerequisite gate.

## Testing journey integration

Add the new method to `Reviewing a community conference programme`, whose existing scenario already requires choosing sessions with controls.

Update the journey:

- Description, topics, and objectives mention common controls and exposed state.
- Add the method to the ordered `methods` list after structure and links.
- Extend `Choose a session using its complete content` to inspect the graphical schedule control's name, role, operation, and state alongside its graphical purpose.
- Extend `Inspect session details and return to the programme` to check the controls that open and close details, while leaving modal-specific focus behavior under the modal method.
- Include the controls method in the consolidation stage and expected evidence.
- Increase estimated duration from 75 to 90 minutes because the added control review is integrated into existing stages rather than creating a seventh stage.

Do not change `Your first accessibility review` or the course-registration journey.

## Verification

Add focused automated coverage for:

- Method and Exercise routes, metadata, bidirectional relationship links, and content-type labels.
- Learning path order, updated outcomes, duration, and six-technique scope language.
- Conference journey method order, stage integration, deliverables, and duration.
- Standalone fixture return route, theme persistence, and narrow viewport behavior.
- Exactly five documented fixture targets and exactly five solution sections.
- Correct names, roles, initial states, and keyboard operation for passing controls.
- Each intentional stale or mismatched semantic condition without introducing unrelated failures.
- Expected axe results in light and dark themes, limited to findings axe can detect reliably.
- Outer Exercise shell accessibility, visible focus, unique IDs, progressive hints, and closed solution.
- Fixture markup not exposing authored answers.

Run the focused tests, complete Playwright suite on port 4321, Astro diagnostics, and production build under Node.js 24. Complete a manual screen-reader check of the initial and changed control states because automated role assertions cannot establish the quality or timing of actual announcements.

## Out of scope

- Composite widgets such as tabs, comboboxes, trees, grids, or drag-and-drop controls.
- A comprehensive ARIA authoring tutorial.
- Testing every screen-reader, browser, or operating-system combination.
- Adding a new Testing journey or Learning path.
- Expanding the existing icons, forms, keyboard, or modal Exercises.
- Treating the fixture as production-ready interface code.
