# Standalone-first Exercise workspace implementation plan

## Goal

Replace all document-fixture iframes with a consistent standalone-first workspace panel while preserving fixture routes, return links, themes, intentional findings, and inline-fixture support.

## Task 1: Update workflow tests first

- Update all six Exercise test files to expect a registered title, one same-tab `Start exercise` link, exact guidance, optional new-tab note, and no iframe.
- Assert each fixture's `Return to the exercise` link and destination.
- Move embedded behavior and theme assertions to direct fixture routes.
- Remove height, iframe title, `frameLocator`, and embedded synchronization assertions.
- Remove iframe exclusions from Exercise shell axe scans.

## Task 2: Add the standalone panel

- Add `StandaloneExercisePanel.astro` with title, action, primary guidance, and optional note.
- Update `ExerciseFixture.astro` to render the panel for document fixtures and retain direct rendering for inline fixtures.
- Remove iframe markup and fixture-specific height rules.

## Task 3: Refine interaction presentation

- Use existing Lab action, border, background, hover, focus, theme, and wrapping conventions.
- Confirm the link does not set `target` or force another browsing context.
- Confirm the panel remains usable without horizontal overflow at narrow widths.

## Task 4: Verify standalone behavior

- Re-run every fixture's interaction, responsive, intentional-finding, theme, and axe tests against its standalone route.
- Verify all return links and the Testing journey workspace link.
- Confirm no fixture or Exercise content markup changed.

## Task 5: Final verification

- Run focused Exercise, shell, axe, and journey tests.
- Run Astro diagnostics, production build, and complete Playwright suite.
- Visually review representative panels in desktop/mobile and light/dark modes.
- Run `git diff --check`.
