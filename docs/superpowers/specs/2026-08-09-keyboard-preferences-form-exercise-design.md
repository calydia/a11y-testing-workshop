# Keyboard testing a preferences form exercise design

## Purpose

Create the first published Exercise for Accessibility Testing Lab. The exercise lets visitors apply the Testing keyboard accessibility method to a small, realistic communication-preferences form containing four deliberate keyboard defects.

Keep the exercise tightly aligned with what the keyboard method can reveal. Do not include form-label, accessible-name, screen-reader, or code-inspection findings in this milestone.

## Route and collection

Add one published `exercises` entry:

```text
/exercises/keyboard-testing-a-preferences-form/
```

Suggested title: `Keyboard testing a preferences form`.

Use the existing Exercise schema and layout:

- Difficulty: beginner
- Estimated time: 15 minutes
- Exercise type: `find-issues`
- Expected findings: 4
- Related method: `testing-keyboard-accessibility`
- Topics: keyboard, focus, forms, operability
- Prerequisite: complete or understand the Testing keyboard accessibility method

This is the first Exercises collection entry, so it appears on `/exercises/`, receives the shared Exercises submenu and breadcrumb, and replaces the landing page's truthful empty state.

## Scenario and instructions

Present the visitor with a compact communication-preferences form. Ask them to test it without using a mouse, trackpad, or touchscreen.

The task is to:

1. Start before the first control.
2. Navigate forward and backward through every visible control.
3. Operate each control using its expected keys.
4. Observe focus order and focus visibility.
5. Find four keyboard accessibility problems.
6. Record the affected control, keys pressed, expected result, and observed result.

Do not identify the faulty controls in the visible instructions.

## Fixture delivery

Use a document fixture rendered through the existing `/exercise-fixtures/[...id]/` route and embedded in the Exercise workspace with an iframe.

The iframe must have a concise accessible title such as `Communication preferences form exercise`. It must be tall enough to avoid unnecessary nested vertical scrolling at common desktop widths and adapt safely at narrow widths.

Extend the reusable document-fixture presentation to include an `Open exercise in a new page` link immediately before the iframe. The link opens the same fixture route in the current browsing context unless normal browser behavior is modified by the user. Do not force a new window.

The full-page fixture must include:

- A valid document title.
- A visible `h1` identifying the practice form, without revealing defects.
- A short instruction reminding visitors to use only the keyboard.
- A clear way to return to the Exercise page, because the full-page route intentionally omits the Lab shell.
- Self-contained responsive light/dark-compatible styling.
- Proper labels and native semantics for controls that are not intentionally defective.

### Lab theme integration

The fixture must visually belong to Accessibility Testing Lab rather than using an independent system palette.

- Use Atkinson Hyperlegible for fixture content.
- Use the Lab's exact light background, text, heading, link, border, and control colors.
- Use the Lab's exact dark background, text, heading, link, border, and control colors.
- Initialize the fixture document from the same `darkMode` local-storage preference as the Lab shell before visible content renders.
- When no stored preference exists, use the operating-system color-scheme preference just as the Lab shell does.
- Listen for stored theme changes so toggling the Lab theme updates the same-origin embedded iframe without reloading it.
- Apply the same initialization and colors to the standalone fixture route.

Do not render the full Lab header, primary navigation, breadcrumbs, or footer inside the iframe. Theme integration is shared presentation, not a duplicated site shell.

## Intentional findings

Seed exactly four keyboard-focused defects.

### 1. Visible click-only control skipped by focus

Render a control that looks and responds like an interactive option when clicked but is not in the sequential keyboard focus order. A keyboard tester should notice that a visible action is skipped.

### 2. Focusable custom control cannot be activated

Render a custom control that can receive focus and responds to pointer clicks but has no `Enter` or `Space` keyboard activation. Give it enough semantics for the tester to identify it as a control without adding the missing keyboard behavior.

### 3. Missing visible focus indicator

Remove the focus indicator from one otherwise operable control without providing an equivalent replacement. Limit the CSS to that deliberate target so the fixture's other controls and full-page return link retain strong focus visibility.

### 4. Illogical focus order

Use positive `tabindex` values on a small subset of controls so focus begins or moves in an order that conflicts with the visible form sequence. Keep the order deterministic and easy to reproduce.

Do not add a hard keyboard trap. The exercise should teach trap detection without trapping visitors inside the embedded fixture.

## Non-defective baseline

All unrelated behavior should work:

- Every native input has a correctly associated visible label.
- Related controls use appropriate `fieldset` and `legend` grouping.
- Native links and buttons support their expected keys.
- The form does not submit or navigate unexpectedly during practice.
- Successful controls have visible focus states.
- Pointer activation remains available so each custom-control difference is observable.
- The fixture does not interfere with the parent Lab shell.

The fixture should feel like one small form, not four disconnected test snippets.

## Hints and solution

Add progressive hints that disclose strategy before answers:

1. Compare the visible control sequence with the sequence that receives focus.
2. Try both `Enter` and `Space` on anything that looks or announces itself as a button.
3. Watch the page rather than only counting Tab presses; one control loses its visible focus treatment.

The collapsed solution lists four findings, one per intentional defect. Each finding explains:

- How to reproduce it.
- Why it is a keyboard accessibility problem.
- What broad implementation change would correct it.

The solution should not become a full code tutorial.

### Shared disclosure interaction

Hints and Solution must use one reusable Exercise disclosure component rather than duplicating accordion styles.

The component owns:

- Native `<details>` and `<summary>` semantics and behavior.
- The visible disclosure marker.
- The accordion border and spacing.
- A full-width padded summary row.
- A full-row hover background and text treatment using the Lab light/dark interaction palette.
- A clearly visible keyboard-focus outline around the complete summary row rather than only its text.
- A separately padded content wrapper so content spacing does not reduce the summary's interactive box.

ExerciseHints and ExerciseSolution supply only their label and distinct content. Do not apply these styles globally to legacy `<details>` elements.

## Reusable component changes

Update `ExerciseFixture.astro` only at the document-fixture boundary:

- Keep inline fixtures unchanged.
- For document fixtures, render the standalone link and named iframe together.
- Derive both URLs from the registered fixture key.
- Use the registered fixture title for the iframe title.

Keep fixture lookup in `fixture-registry.ts`. Register the new fixture with a stable key and its intentional-defect identifiers. Do not place component filesystem paths in exercise frontmatter.

## Accessibility-test boundaries

The exercise page, instructions, hints, solution controls, workspace heading, iframe title, and standalone link must pass normal automated checks.

Do not require the deliberately defective fixture to produce a zero-violation axe result. Automated tests must isolate intentional targets narrowly and still detect unexpected violations in the fixture's non-defective baseline.

Behavior tests should verify the intentional defects rather than accidentally fixing them:

- The click-only control is skipped during sequential focus.
- The custom control receives focus but `Enter` and `Space` do not activate it.
- The selected operable control has no visible focus indicator.
- The positive-tabindex controls receive focus in the seeded order.

Also verify:

- The iframe has the registered accessible title.
- The standalone link resolves to the same fixture route.
- The standalone fixture has a return link.
- The embedded and standalone fixture backgrounds, typography, and palette match the selected Lab theme.
- Changing the Lab theme updates the embedded fixture theme.
- Hints and Solution use the same full-width disclosure interaction.
- Both summary rows change visibly on hover in light and dark themes.
- Both summary rows receive a complete, high-contrast focus outline.
- Native disclosure markers and expanded/collapsed behavior remain available.
- The Exercise breadcrumb and Exercises submenu are correct.
- The solution contains four findings.
- The legacy `FormWithErrors` component and keyboard workshop page remain unchanged.

## Legacy-content handling

Use the legacy form and keyboard page only as inspiration. Do not reuse `FormWithErrors.astro` directly because its main defects are label associations rather than keyboard-only findings.

Do not modify or delete:

- `src/components/FormWithErrors.astro`
- `src/pages/testing-keyboard-accessibility.astro`
- `src/pages/answers.astro`

## Non-goals

- Testing label associations or accessible names.
- Reusing every defect from the workshop form.
- Adding screen-reader instructions.
- Adding a keyboard trap.
- Building a realistic multi-page Testing journey.
- Creating a learning path.
- Removing or redirecting legacy content.
