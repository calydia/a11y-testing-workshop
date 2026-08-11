# Automated testing method and exercise design

## Purpose

Create a reusable Testing method for accessibility checkers and a separate Exercise that compares automated results with a short manual review. Selectively adapt the useful principle from `/testing-automated-tools/`—automation is valuable but incomplete—without retaining its dated coverage percentages, personal tool list, or workshop tasks.

## Routes and order

Publish:

- `/methods/testing-with-automated-tools/`
- `/exercises/comparing-automated-and-manual-findings/`

Place the method after `Testing zoom and reflow` and before the screen-reader methods. Place the Exercise after `Testing an appointment booking at high zoom`. Use existing collection-driven listings, breadcrumbs, section navigation, metadata, and Exercise presentation.

The legacy `/testing-automated-tools/` route remains unchanged.

## Testing method

The method teaches a repeatable, tool-neutral process rather than one product interface.

### Scope and setup

Before scanning, record:

- page or route;
- task and UI state;
- authentication or permission context;
- viewport and supported theme;
- checker name and version when available;
- enabled rules, standards target, and exclusions;
- whether frames, dialogs, dynamically revealed content, and shadow roots are included.

### Procedure

1. Load and prepare the exact state to test.
2. Run the checker with a known configuration.
3. Preserve or export enough output to reproduce the scan.
4. Locate every flagged element in the rendered interface and inspect it in context.
5. Classify each result as a confirmed issue, needs human review, false positive or not applicable, or tooling/execution error.
6. Record the rule, target, impact, evidence, applicable requirement when known, and remediation direction.
7. Fix or otherwise resolve confirmed issues and rerun the same scan.
8. Follow with the relevant manual methods, including keyboard, visual, zoom/reflow, content, and screen-reader testing.

### Interpretation and limitations

Do not present issue counts, severity labels, or a clean report as an accessibility score or conformance decision. Rule names, wording, severity, and coverage differ across products and versions. Coverage percentages also vary with the ruleset, page, state, and issue mix, so the old page's percentage claims are not migrated.

Automated output may identify a definite failure, flag a target that needs judgment, miss a real problem, or produce a result that does not apply in context. Testers must inspect and verify every result before reporting it.

Markup validation is a complementary engineering check. Valid HTML can prevent some implementation errors, but neither valid markup nor a clean automated accessibility report proves accessibility conformance.

Suggested metadata:

- Skill level: beginner
- Estimated time: 20 minutes
- Tools: web browser, automated accessibility checker, browser developer tools, keyboard
- Platforms: desktop
- Outcomes: scope reproducible scans, verify and classify results, document evidence, rerun after changes, and explain what automation did not test

## Exercise

Create a beginner `find-issues` Exercise titled `Comparing automated and manual findings`, with an estimated duration of 20 minutes and `testing-with-automated-tools` as its related method.

Use the standard Exercise sequence:

1. Summary and metadata
2. Objectives
3. Instructions
4. Exercise workspace
5. Progressive Hints disclosure
6. Solution disclosure
7. Contextual related-method link

Ask learners to run one automated checker against the event-registration fixture, verify and classify its results, then perform a short keyboard and content review. For each finding they should record the tool message or manual procedure, affected target, classification, evidence, and remediation direction. They should explicitly compare what the checker reported with what it missed.

## Event-registration fixture

Use a document fixture through the existing named iframe and standalone route. The fixture depicts a cohesive event-registration experience with session information, an email field, saved-item management, session selection, and links to additional session details.

Use Atkinson Hyperlegible and the exact Lab base themes with stored/system preference initialization and live parent-frame synchronization. Ordinary controls and all non-target content must form an accessible baseline.

Seed exactly five deliberate findings.

### Expected automated detections

1. **Unlabelled email field.** A visible contextual prompt exists, but the email input has no programmatically associated label or accessible name.
2. **Unnamed icon-only button.** A button used to remove a saved session contains only a decorative or hidden icon and has no accessible name.
3. **Low-contrast helper text.** Meaningful ordinary text has a deterministic contrast failure in both fixture themes.

### Expected human review findings

4. **Pointer-only session control.** A visible custom `Choose this session` control responds to pointer clicks but cannot receive focus or be operated from the keyboard. The chosen state should visibly change after a click so the missing keyboard path is demonstrable.
5. **Ambiguous repeated links.** Multiple `Read more` links lead to different session-detail targets, but neither their accessible names nor their allowed surrounding context distinguishes the destinations adequately. This requires interpretation rather than relying on one automated rule result.

Do not introduce image-alternative, zoom/reflow, focus-order, modal, language, heading-structure, or screen-reader-output defects. Do not duplicate the future image alternative-text Exercise.

## Automated contract

Use axe in the repository tests only as a stable regression checker; the learner-facing method remains tool-neutral.

Fixture tests must assert that axe reports exactly the intended automated rule set and targets for the unlabelled field, unnamed button, and low-contrast helper text. If axe emits a review item or additional best-practice result for the ambiguous links, either refine the markup so the intended automated/manual split remains stable or document that result explicitly without changing the five learning findings.

Independently test the manual-only findings:

- pointer activation changes the session state;
- sequential keyboard navigation never reaches the custom control;
- Enter and Space cannot activate it;
- repeated links expose indistinguishable accessible names while resolving to different targets.

The outer Exercise shell must pass normal automated checks with the iframe excluded. Standalone fixture checks may allow only the documented intentional results.

## Hints and solution

Provide three progressive hints:

- inspect each reported target in context instead of copying the issue list;
- complete the registration using only a keyboard after the scan;
- compare controls and links that look similar and ask whether their purpose is distinguishable without visual context.

The Solution contains exactly five findings, grouped or labelled by expected detection mode. Each explanation covers evidence, user impact, verification, and remediation, and notes that exact tool wording can differ.

## Reuse and boundaries

Reuse all existing Exercise layouts, fixture rendering, theme behavior, iframe fallback, disclosures, navigation, and breadcrumbs. Add one focused fixture component, one registry entry, one method entry, one Exercise entry, and focused tests.

Do not edit legacy content, add a product-specific integration, install another checker, add a new content schema, or expose fixture-only routes in site navigation.

## Verification

Verify:

- route and collection order for the method and Exercise;
- breadcrumbs and exact section-navigation states;
- method headings and absence of a Demonstration section;
- one named iframe and matching standalone route;
- exactly five deliberate targets;
- stable automated result rules and targets in both themes;
- independent pointer-only and ambiguous-link behaviors;
- operability and accessible baseline of unaffected controls;
- synchronized themes and narrow-width usability;
- progressive Hints and five-item Solution;
- zero normal-shell axe violations;
- unchanged legacy automated-tools page;
- production build and complete regression suite.

## Out of scope

- Editing, deleting, or redirecting `/testing-automated-tools/`
- Retaining old coverage percentages or a preferred-products list
- Adding analytics or scan-result storage
- Installing or integrating a new third-party checker
- Creating the image alternative-text Exercise
- Performing the deferred pre-launch legacy cleanup
- Creating a Learning path or Testing journey
