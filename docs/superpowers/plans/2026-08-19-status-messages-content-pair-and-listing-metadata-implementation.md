# Status messages content pair and listing metadata implementation plan

## Goal

Publish an intermediate Testing method and standalone Exercise for status messages and live updates, and add learner level plus estimated time to cards across all four primary section listings without changing existing routes, category structure, Learning paths, or Testing journeys.

## Task 1: Pin the listing-metadata and content-pair contracts

### Files

- Modify: `tests/site-architecture.spec.js`
- Modify: `tests/screen-reader-methods.spec.js`
- Modify: `tests/exercise-architecture.spec.js`
- Modify: `tests/axe-core.spec.js`
- Create: `tests/status-messages-exercise.spec.js`

### Work

1. Add failing assertions for visible level and formatted estimated time on representative Learning path, Testing method, Exercise, and Testing journey cards.
2. Cover minute-only, hour-only, hour-and-minute, and missing-time card states.
3. Assert the visual middle dot has `aria-hidden="true"`, is absent when time is unavailable, and does not replace readable level or time text.
4. Preserve `h2` card titles on flat Learning path and Journey listings and `h3` card titles on grouped Method and Exercise listings.
5. Add failing assertions for the new method route, intermediate metadata, 30-minute estimate, prerequisites, outcomes, procedure, interpretation, limitations, category, order, and related Exercise.
6. Add failing assertions for the new Exercise route, intermediate metadata, 30-minute estimate, perform-test type, three hints, exactly six closed findings, category, order, and method relationship.
7. Pin the method after forms and before time limits within Interaction and tasks, and the Exercise after the registration form and before the session-timeout Exercise.
8. Assert that existing Learning-path steps, Journey methods and stages, estimates, and workspaces remain unchanged.
9. Add only the learner-facing method and Exercise routes to central axe coverage; test the intentionally defective standalone fixture through its focused boundary.

## Task 2: Extract and test shared duration formatting

### Files

- Create: `src/lib/duration.ts`
- Modify: `src/components/learning-path/LearningPathMeta.astro`
- Modify: `tests/learning-path.spec.js`
- Modify: `tests/site-architecture.spec.js`

### Work

1. Extract the existing Learning-path hour-and-minute display rules into a pure `formatEstimatedDuration` helper.
2. Preserve the existing rounding rule for totals within five minutes of the next whole hour.
3. Add unit-level or rendered assertions for `30`, `60`, `90`, and a near-hour boundary already represented by existing path data.
4. Allow listing cards to request the learner-facing `About` prefix consistently while preserving current Learning-path detail output.
5. Keep Exercise, Method, and Journey detail-page metadata wording unchanged.

## Task 3: Add optional metadata to the shared card model

### Files

- Modify: `src/components/content/ContentCard.astro`
- Modify: `src/components/content/ContentListing.astro` only if its types require propagation
- Modify: `src/pages/learn/index.astro`
- Modify: `src/pages/methods/index.astro`
- Modify: `src/pages/exercises/index.astro`
- Modify: `src/pages/journeys/index.astro`

### Work

1. Extend `ContentCardData` with optional `level` and `estimatedMinutes` fields.
2. Render a compact metadata line between the card heading and summary when at least one value exists.
3. Normalize authored lowercase enum values to title case for display without changing stored schema values.
4. Render the level and formatted duration as separate readable spans.
5. Render the visual middle dot in a separate `aria-hidden="true"` span only when both values are present.
6. Add a screen-reader-only natural separator only if accessibility-tree verification shows the values concatenate.
7. Use the existing small secondary-text styling pattern with sufficient contrast in both themes; do not introduce badges, icons, or color-only level cues.
8. Map `level`, `skillLevel`, or `difficulty` and `estimatedMinutes` from each collection into the shared card shape.
9. Preserve existing titles, summaries, links, card heading levels, borders, focus treatment, category grouping, grids, and responsive behavior.

## Task 4: Publish the Testing method

### Files

- Create: `src/content/testing-methods/testing-status-messages-and-live-updates.md`

### Work

1. Add published intermediate metadata, Interaction and tasks category, order `20`, a 30-minute estimate, screen-reader and existing-method prerequisites, and the related Exercise.
2. Explain status messages and dynamic updates without reducing the subject to the presence of ARIA attributes.
3. Distinguish status messages from deliberate focus movement, dialogs, inline validation, urgent alerts, and changes of context.
4. Provide an environment-first procedure covering visible state, DOM timing, accessibility-tree exposure, actual output, politeness, urgency, repetition, persistence, focus behavior, and relevant second-combination retesting.
5. Require evidence that records trigger, visible update, announced content, timing, focus, user impact, environment, support limitations, remediation direction, and follow-up testing.
6. Explain why forcing routine updates through assertive announcements or focus movement can create new barriers.
7. Link contextually to controls, forms, modal dialogs, and time limits without making those topics part of this method's full scope.
8. State that one browser and screen-reader result cannot establish universal support.

## Task 5: Publish the Exercise and solution

### Files

- Create: `src/content/exercises/testing-status-messages-in-a-community-activities-search.md`

### Work

1. Add published intermediate metadata, Interaction and tasks category, order `62`, a 30-minute estimate, `perform-test` type, fixture key `community-activities-status-messages`, one method reference, and exactly six expected findings.
2. Put the fictional, local-only practice boundary before the workspace instructions.
3. Guide learners through visual baselining, search, filters, saving, removal, no-results, assisted urgent-error, DOM and accessibility-tree inspection, evidence recording, reset, repetition, and support limitations.
4. Add three progressive hints covering visible-versus-spoken changes, live-region timing and priority, and repetition plus insertion order.
5. Add exactly six solution entries for the unannounced result count, assertive routine loading, excessive typing announcements, unannounced save confirmation, pre-populated newly inserted live region, and late-added no-results live semantics.
6. Explain actual behavior, user impact, useful evidence, and flexible remediation for every finding.
7. Identify the polite removal confirmation, appropriate urgent error, native controls, focus retention, reset, and local-only behavior as passing checks.
8. Avoid prescribing one live-region implementation for every framework or interface.

## Task 6: Create and register the standalone fixture

### Files

- Create: `src/components/exercise/fixtures/CommunityActivitiesStatusMessagesFixture.astro`
- Modify: `src/exercises/fixture-registry.ts`

### Work

1. Build a fictional activities search with a keyword field, activity-type and accessibility-feature filters, result summary, loading feedback, result cards, save controls, saved-activities region, assisted Testing controls, and reset.
2. Use a fixed local activity dataset. Do not request personal data, create accounts, submit forms, call external services, or persist state.
3. Register the fixture as a document fixture titled `Community activities status-messages exercise` with exactly six intentional-violation identifiers matching the approved findings.
4. Preserve the standalone return route, saved Lab theme behavior, responsive layout, unique IDs, and visible focus for every passing control.
5. Keep solution terminology, violation identifiers, the finding count, and diagnostic labels out of rendered learner-facing markup.

## Task 7: Implement deterministic update behavior and six controlled findings

### Files

- Complete: `src/components/exercise/fixtures/CommunityActivitiesStatusMessagesFixture.astro`
- Complete: `tests/status-messages-exercise.spec.js`

### Work

1. Keep query, selected filters, visible activities, saved activities, status messages, and bounded timer handles local to the document lifecycle.
2. Update results deterministically from the fixed dataset after keyword or filter changes.
3. Visually update the result count without status semantics.
4. Expose routine loading through an assertive alert and trigger it without debouncing on each keyword input event.
5. Show an `Activity saved` visual confirmation without live-region or status semantics.
6. Create one message container already populated only after its triggering action, preserving the unreliable insertion pattern.
7. Add live-region semantics to the no-results element only after updating its text.
8. Implement a separate polite removal confirmation through a live region present before its text changes.
9. Provide an assisted urgent service-error control using an appropriate alert without requiring a real failure or request.
10. Keep ordinary updates from moving focus and ensure all standard controls remain named, keyboard operable, and visibly focused.
11. Prevent duplicated timers or listeners, cancel superseded loading timers, and clear every timer on reset and page unload.
12. Reset query, filters, results, saved activities, messages, dynamically added attributes and elements, and focus to one stable initial state.
13. Verify no application data is written to local storage, session storage, cookies, IndexedDB, or network endpoints; the established Lab theme preference may still be read.

## Task 8: Integrate navigation, relationships, and collection order

### Files

- Modify only related-content references where the new method needs contextual links
- Verify generated Methods and Exercises listings and sidebars

### Work

1. Confirm the method and Exercise appear in Interaction and tasks at their authored positions.
2. Confirm their detail sidebars show the complete current category and other-area links under the established grouped-navigation contract.
3. Confirm the method links to its Exercise and the Exercise links to its method.
4. Preserve existing method–Exercise pair categories and all unrelated authored order values.
5. Preserve both Learning paths and all Testing journeys without adding the new pair or changing their estimates.
6. Verify breadcrumbs, sitemap generation, primary navigation, and existing redirects without adding a legacy redirect for the new routes.

## Task 9: Complete project verification

### Work

1. Run focused listing-metadata, status-message, method, Exercise, architecture, navigation, breadcrumb, and axe tests on the default port `4321` under Node.js 24.
2. Run Astro diagnostics and the production build.
3. Run the complete Playwright suite.
4. Review all four listing pages at desktop and mobile widths in light and dark themes, including long duration text, grouped cards, and metadata wrapping.
5. Inspect the accessibility tree or an equivalent DOM contract to confirm the visual middle dot is hidden while level and time remain readable.
6. Manually exercise keyword input, filters, saving, removal, no-results, urgent error, and reset with keyboard and pointer input.
7. Confirm the passing polite update is populated after its container exists and that the six defective patterns remain isolated and deterministic.
8. Inspect storage and network activity to confirm no search or saved-item information is submitted, stored, or retained.
9. Confirm bounded timers terminate on replacement, reset, and navigation and that reload starts cleanly.
10. Run `git diff --check`, review the final diff for unrelated changes, and confirm existing Learning paths and Testing journeys remain stable.

## Out of scope

- Level-based filtering, sorting, tabs, badges, or category-route changes
- Changing existing learner-level values or their meaning
- Adding the new pair to a Learning path or Testing journey
- Production search, accounts, submissions, persistence, analytics, or network services
- A complete forms, controls, modal-dialog, time-limit, or framework-specific live-region audit
- Exhaustive browser and assistive-technology interoperability claims
- Rewriting existing card titles, summaries, routes, or body content
