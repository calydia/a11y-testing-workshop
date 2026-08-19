# Status messages content pair and listing metadata design

## Purpose

The next content pair will deepen the Lab's coverage of dynamic web interfaces while adding a clear intermediate option. A new Testing method and standalone Exercise will teach status-message and live-update testing through a fictional community activities search.

At the same time, all four section listings will expose knowledge level and estimated time on their cards. This helps visitors choose content appropriate to their experience without replacing the subject categories that organize Testing methods and Exercises.

## Learner-level meaning

`Beginner`, `Intermediate`, and `Advanced` describe the knowledge and testing experience a visitor is expected to bring. They do not describe the importance of the accessibility issue or imply that an interface is objectively simple or difficult.

The new method and Exercise are intermediate because they require learners to combine screen-reader output, accessibility-tree inspection, DOM behavior, focus behavior, timing, and task-state analysis.

## Testing method

### Identity and metadata

- Title: `Testing status messages and live updates`
- Level: Intermediate
- Category: Interaction and tasks
- Estimated time: 30 minutes
- Status: Published
- Placement: after Testing forms and validation and before Testing time limits and interruptions
- Related Exercise: `Testing status messages in a community activities search`

### Prerequisites

- Basic screen-reader operation
- Familiarity with Testing controls with a screen reader
- Familiarity with Testing forms and validation

The method links to those existing references rather than repeating their procedures.

### Learning outcomes

The method teaches learners to:

- Identify dynamic updates that need to be communicated without receiving focus.
- Distinguish status messages from focus changes, dialogs, validation errors, and changes of context.
- Test visible changes, accessibility-tree exposure, and actual assistive-technology output rather than looking only for an `aria-live` attribute.
- Check message content, timing, priority, repetition, and persistence.
- Compare polite routine updates with genuinely urgent interruptions.
- Record the trigger, visible change, announced output, timing, focus behavior, and user impact.
- Account for browser and screen-reader variability without treating one result as universal proof.

### Procedure

The procedure covers:

1. Define the task, tested states, browser, assistive technology, and settings.
2. Identify asynchronous or dynamic changes that occur without navigation.
3. Establish the visible sequence and expected user information.
4. Inspect roles, properties, ownership, visibility, and when live containers enter the DOM.
5. Trigger each update with the keyboard and screen reader.
6. Compare visible content with announced content.
7. Assess politeness, urgency, repetition, interruption, and queueing.
8. Confirm whether focus remains appropriate and whether a deliberate focus move is required instead.
9. Repeat important checks with a relevant second combination when feasible.
10. Record findings, passing checks, limitations, and retest conditions.

### Interpretation boundaries

- The presence of `role="status"`, `role="alert"`, or `aria-live` does not prove a useful announcement.
- A missing announcement is not always repaired by moving focus.
- Routine updates should not be made assertive merely to force output.
- Urgent errors, modal interactions, and changes of context require separate judgment.
- A message that announces once may still be incomplete, late, repetitive, or disruptive.
- Browser and assistive-technology support differences belong in the evidence and limitations.

## Exercise

### Identity and metadata

- Title: `Testing status messages in a community activities search`
- Level: Intermediate
- Category: Interaction and tasks
- Estimated time: 30 minutes
- Type: Perform test
- Expected findings: Six
- Fixture: A standalone community activities search document

The Exercise links only to the new status-message method as its required testing procedure. Controls, forms, and screen-reader operation remain prerequisites rather than additional Exercise methods.

### Workspace scenario

The fictional workspace contains:

- A keyword search field
- Activity-type and accessibility-feature filters
- A changing results count
- A short loading state
- Search-result cards with `Save activity` controls
- A saved-activities area
- A reset control
- A clearly visible practice-data notice

The workspace does not use accounts, personal information, network requests, submission, or persistence. Its state is local to the document and returns to a deterministic starting point on reset or reload.

### Controlled findings

The workspace contains exactly six intentional status-message problems:

1. The visible result count changes without programmatic status-message semantics.
2. Routine loading feedback uses an assertive alert and interrupts other output.
3. Loading announcements occur excessively while the user is still typing.
4. A visible `Activity saved` confirmation is not announced.
5. One live region is created already containing its message, making its announcement unreliable.
6. A no-results message receives live-region semantics only after its text changes, so assistive technology may miss the update.

The implementation keeps these problems deterministic in the DOM while acknowledging that exact spoken output varies by browser and screen reader.

### Passing comparisons

The workspace also provides:

- A specific polite confirmation when an activity is removed from the saved list
- An appropriately urgent service-error alert exposed through an assisted Testing control
- Keyboard-operable filters and save controls with visible focus
- Focus that remains on the initiating control after ordinary updates
- Deterministic reset behavior
- No persistence, submission, or external network activity

Passing comparisons are described as evidence within the task and solution without being labeled as answers in the workspace.

### Learner guidance

The Exercise asks learners to:

1. Read the method and prepare a screen reader and browser.
2. Open the standalone workspace in the same tab.
3. Establish the visual behavior before assessing announcements.
4. Exercise search, filters, saving, removal, no-results, and the assisted error state.
5. Inspect the DOM and accessibility tree where output is missing or disruptive.
6. Record evidence including trigger, visible update, announced output, timing, focus, and impact.
7. Return to the Exercise for progressive hints and the closed solution.
8. Reset between runs and document the tested environment and support limitations.

The three hints progress from comparing visual and spoken changes, to inspecting live-region timing and priority, to examining repetition and DOM insertion order.

The closed solution contains exactly six entries corresponding to the controlled findings. Each explains actual behavior, impact, evidence, and flexible remediation without prescribing one live-region pattern for every interface.

## Listing-card metadata

### Shared card model

Shared card data gains optional `level` and `estimatedMinutes` values. Listing pages map their collection-specific fields into that model:

- Learning paths: `level`, `estimatedMinutes`
- Testing methods: `skillLevel`, optional `estimatedMinutes`
- Exercises: `difficulty`, `estimatedMinutes`
- Testing journeys: `difficulty`, `estimatedMinutes`

The shared card component renders the metadata consistently in grouped and flat listings. If a method has no estimate, the card shows only its level and does not render an empty separator.

### Presentation

Metadata appears between the card title and summary in the site's smaller secondary-text treatment:

```text
Intermediate · About 30 minutes
```

Labels use normal title case. Level remains visible text and is not communicated through color alone.

The visual middle dot is a separate element with `aria-hidden="true"`. Level and time remain separate readable values. If assistive-technology testing shows the values run together, visually hidden punctuation provides a natural pause without exposing the decorative dot.

The duration display supports:

- `About 30 minutes`
- `About 1 hour`
- `About 1 hour 30 minutes`

The existing Learning-path duration logic will be extracted into a shared formatter and reused by listing cards. Existing detail-page metadata wording remains unchanged unless it already uses that formatter.

### Information hierarchy

- Category remains the primary organization on Methods and Exercises listings.
- Level and time are secondary decision information.
- Cards are not regrouped or filtered by level.
- Metadata is not a heading, badge, interactive control, or additional route.
- Existing card heading levels, focus treatment, borders, themes, grid behavior, titles, summaries, and URLs remain unchanged.

## Content relationships

- The new method and Exercise link to each other.
- The method may contextually link to controls, forms, modal-dialog, and time-limit references where boundaries need explanation.
- The pair is not automatically added to an existing Learning path or Testing journey.
- Existing Learning-path steps, Journey methods and stages, duration estimates, and workspaces remain unchanged.
- Future curriculum work may deliberately add the pair after reviewing path scope and total duration.

## Components and state

- `ContentCard` owns optional metadata presentation.
- Listing pages only map collection data into the shared card shape.
- A shared duration formatter owns human-readable hour and minute wording.
- The fixture registry exposes the workspace through the existing standalone Exercise flow.
- The new fixture owns its local search, filter, saved-item, loading, error, and reset state.
- The fixture does not call `fetch` or write to local storage, session storage, cookies, IndexedDB, or form endpoints.
- Timers used for deterministic loading demonstrations are bounded, cleared before replacement, and cancelled on reset and unload.

## Accessibility requirements

- Card metadata has sufficient contrast in light and dark themes and remains readable at narrow widths and high zoom.
- The decorative middle dot is hidden from the accessibility tree.
- Metadata does not disturb the existing listing heading hierarchy.
- All non-intentionally defective fixture controls are native, named, keyboard operable, and visibly focused.
- Ordinary updates do not move focus.
- The passing removal message uses an existing polite live region populated after it is present.
- The assisted urgent-error comparison uses an appropriate alert.
- Intentional defects remain isolated to the six documented findings.
- The outer Exercise shell remains free of deliberate accessibility defects.

## Verification

Tests will cover:

- Level and duration metadata on representative cards from all four listings
- Correct mapping of `level`, `skillLevel`, and `difficulty`
- Minute-only, hour-only, hour-and-minute, and missing-time formatting
- No separator when time is missing
- `aria-hidden="true"` on the visual middle dot
- Existing card heading hierarchy, category grouping, focus styles, themes, and responsive layout
- New method metadata, outcomes, procedure, interpretation, limitations, relationships, category, and order
- New Exercise metadata, objectives, hints, six solution findings, and standalone workflow
- The six deterministic fixture findings and approved passing comparisons
- Keyboard behavior, focus retention, reset, bounded timers, light and dark themes, and narrow viewport fit
- No storage, submission, external requests, answer leakage, or unrelated axe violations
- Existing Learning paths and Testing journeys remain unchanged
- Astro diagnostics, production build, focused tests, and the complete Playwright suite

## Out of scope

- Level-based filters, tabs, sorting, or new category routes
- Changing the meaning or value of existing content levels
- Rewriting existing card titles or summaries
- Adding the pair to a Learning path or Testing journey
- A complete forms, controls, modal-dialog, or time-limit audit
- Exhaustive browser and assistive-technology interoperability claims
- Production search, accounts, storage, analytics, submissions, or network services
- Advanced framework-specific live-region APIs
