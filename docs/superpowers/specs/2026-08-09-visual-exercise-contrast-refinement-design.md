# Visual exercise contrast refinement design

## Purpose

Make the deliberately low-contrast profile note in the visual account-dashboard Exercise more readily identifiable. The current contrast is approximately 2.69:1 in the light theme and 3.6:1 in the dark theme; both examples should instead be close to 2:1.

## Design

Change only the `.account-note` foreground colors in `VisualAccountDashboardFixture.astro`:

- Light theme: `#b2b2b2` against `#fafafa`, approximately 2.03:1.
- Dark theme: `#40404a` against `#010017`, approximately 2.02:1.

These intentional colors do not need to use Lab theme tokens. All other fixture colors, findings, themes, content, and interactions remain unchanged.

Tighten the focused Playwright contrast assertion so each theme must produce a ratio from 1.9:1 through 2.15:1. Retain the fixture axe expectation that the profile note is the only automatically detected violation.

## Verification

- Run the visual-dashboard Exercise tests.
- Confirm both computed contrast ratios fall within the approved range.
- Confirm the standalone fixture still reports only the intentional color-contrast violation.
- Visually inspect the note in both themes.
- Run the complete regression suite.
