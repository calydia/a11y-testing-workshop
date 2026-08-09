# Visual accessibility method and exercise design

## Purpose

Create a reusable Testing method for visual accessibility and a separate Exercise that applies it to a realistic account dashboard. Selectively adapt the useful visual-testing material from the retained `/testing-visuals/` workshop page without rewriting or deleting that legacy page.

Keep this milestone narrowly focused on findings that learners can investigate through visual inspection and appropriate browser tools. Image alternative text belongs to a later screen-reader exercise and is not part of this method or fixture.

## Routes and collection order

Publish these entries:

- `/methods/testing-visual-accessibility/`
- `/exercises/finding-visual-problems-in-an-account-dashboard/`

Place the visual method after `Testing keyboard accessibility` and before the existing screen-reader methods. Add the exercise after `Keyboard testing a preferences form`.

Both entries use the existing collection-driven breadcrumbs, section navigation, metadata, related-content links, and listing pages. The retained `/testing-visuals/` route remains unchanged.

## Testing method

The method teaches a repeatable visual review covering:

- text contrast against every background on which the text appears;
- non-text contrast for meaningful interface components and graphical objects;
- meaning conveyed through color alone;
- text readability and spacing;
- visible and distinguishable hover and keyboard-focus states;
- reviewing every supported site theme and relevant interactive state.

The procedure should distinguish visual observation from measurement. Learners should use browser inspection and a contrast-checking tool where a contrast result requires numeric evidence. The method must explain that visual inspection cannot establish every accessibility failure and must not present personal visual judgment as a substitute for measurement or testing with other methods.

The method may reuse accurate concepts from the old workshop page, but its content must be rewritten as a reusable procedure rather than retained as workshop tasks. It must not include the old alternative-text examples or the old interactive contrast demonstration.

Suggested metadata:

- Skill level: beginner
- Estimated time: 15 minutes
- Tools: browser, browser developer tools, contrast checker
- Platforms: desktop and mobile browsers
- Outcomes: perform a systematic visual review, measure relevant contrast pairs, identify color-only and readability problems, and record findings with affected states and evidence

## Exercise

Create a beginner `find-issues` Exercise titled `Finding visual problems in an account dashboard`, with an estimated duration of 15 minutes and `testing-visual-accessibility` as its related method.

The Exercise follows the same published structure as the keyboard preferences exercise:

1. Summary and metadata
2. Objectives
3. Instructions
4. Exercise workspace
5. Progressive Hints disclosure
6. Solution disclosure
7. Related method

Ask learners to inspect the dashboard in both themes and relevant interaction states, find exactly four visual accessibility problems, and record the affected element or content, state and color pair where relevant, expected result, observed result, and measurement evidence where applicable.

## Fixture

Use a document-level fixture rendered through `/exercise-fixtures/[...id]/`, embedded in the Exercise with the existing named iframe and standalone fallback link.

The fixture is a compact, realistic account dashboard rather than a component gallery. It should contain a heading, account status, a short activity or notification text area, and one or more ordinary controls. The design must feel cohesive enough that the learner has to review the interface systematically.

The fixture uses Atkinson Hyperlegible and the exact Lab light and dark page themes. It reads the saved `darkMode` preference, follows system preference when no site preference is stored, and synchronizes live when embedded and the parent theme changes. It remains responsive without component-caused horizontal scrolling.

The fixture contains exactly these four deliberate findings:

1. **Insufficient text contrast.** A meaningful text element fails the applicable contrast threshold. Its light- and dark-theme colors may differ, but the problem must remain measurable in both themes.
2. **Color-only status.** At least two statuses or states are distinguished only by color, without accompanying text, icon shape, pattern, or another non-color cue.
3. **Poor text spacing.** A meaningful multi-line text block uses cramped line spacing that impairs readability. The problem should be visible without requiring source inspection.
4. **Weak interaction-state treatment.** An operable control has hover and keyboard-focus treatments that are difficult to distinguish from its default state or surrounding background. The control must remain operable and must not introduce a keyboard trap.

Do not seed alternative-text, accessible-name, semantic-structure, keyboard-operation, focus-order, zoom, reflow, or screen-reader defects. The fixture should contain no unrelated accidental failures.

## Hints and solution

Provide three progressive hints that direct attention without naming the four answers immediately:

- compare foreground and background colors in both themes;
- check whether information survives when color differences are ignored;
- inspect dense text and compare default, hover, and keyboard-focus states.

The Solution lists exactly four findings, corresponding one-to-one with the seeded fixture problems. Each explanation states the user impact, the evidence needed to establish the result, and a practical remediation direction. Do not expose the solution in the initial rendered view or fixture source-facing instructions.

## Component architecture

Reuse the existing Exercise presentation unchanged:

- `ExerciseMeta`
- `ExerciseObjectives`
- `ExerciseInstructions`
- `ExerciseWorkspace`
- `ExerciseFixture`
- `ExerciseDisclosure`
- `ExerciseHints`
- `ExerciseSolution`
- `RelatedMethods`

Add one focused account-dashboard fixture component and register it as a document fixture in `src/exercises/fixture-registry.ts`. Do not duplicate iframe, theme, disclosure, breadcrumb, or section-navigation behavior.

## Accessibility and testing

The Lab shell, Exercise content, workspace framing, iframe title, standalone link, Hints, and Solution must pass normal automated accessibility checks. Intentional fixture problems must remain narrowly documented and isolated from assertions intended for the surrounding Lab interface.

Automated coverage should verify:

- both routes render and appear in their collection listings in the intended order;
- the Exercise references the visual-testing method;
- the fixture is embedded in a named iframe and available standalone;
- light and dark themes initialize and synchronize correctly;
- the fixture remains usable at narrow viewport widths;
- the four intentional problems exist in both themes and unrelated defects are absent;
- Hints and Solution retain their full-row hover, focus, marker, and keyboard behavior;
- the normal Exercise shell has no automatically detectable accessibility issues;
- existing keyboard-exercise and site-wide regression tests continue to pass.

Perform a final visual review at desktop and mobile widths in light and dark themes.

## Deferred alternative-text exercise

Plan a separate screen-reader/content Exercise for image alternative text. Candidate cases include meaningful images with useful and vague alternatives, decorative images with empty alternatives, missing alternatives, and a deliberately broken image so learners can observe how alternative text is presented visually and exposed by assistive technology when image loading fails.

That future exercise needs its own design because visual rendering, accessible-name computation, browser broken-image behavior, and screen-reader output are related but distinct observations. It must not be folded into the visual-dashboard fixture.

## Out of scope

- Deleting or redirecting `/testing-visuals/`
- Editing the retained legacy workshop content
- Migrating the old image examples
- Creating the alternative-text exercise now
- Adding zoom, reflow, automated-tool, or screen-reader defects to this fixture
- Creating a Learning path or Testing journey
