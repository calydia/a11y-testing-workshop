# Accessibility Testing Lab continuation status — 2026-08-09

## Current state

The new Accessibility Testing Lab architecture is active with collection-driven routes, breadcrumbs, primary and section navigation, responsive content/sidebar layout, shared Exercise presentation, document-fixture isolation, standalone fixture links, synchronized light/dark themes, and reusable full-row Hints/Solution disclosures.

The retained workshop and example routes still exist. No legacy cleanup has been performed.

## Published Testing methods

In collection order:

1. `/methods/testing-keyboard-accessibility/`
2. `/methods/testing-visual-accessibility/`
3. `/methods/testing-zoom-and-reflow/`
4. `/methods/screen-reader-page-structure-and-links/`
5. `/methods/screen-reader-icons-and-svg/`
6. `/methods/screen-reader-language-changes/`
7. `/methods/testing-modal-dialogs/`

The four screen-reader methods selectively adapt the old `/examples/screen-reader/` material. The keyboard, visual, and zoom/reflow methods selectively adapt useful concepts from the old workshop pages without modifying those pages.

## Published Exercises

### Keyboard testing a preferences form

- Route: `/exercises/keyboard-testing-a-preferences-form/`
- Fixture: `/exercise-fixtures/keyboard-preferences-form/`
- Intentional findings: skipped click-only control, custom button without keyboard activation, missing focus indicator, and positive-tabindex focus order.

### Finding visual problems in an account dashboard

- Route: `/exercises/finding-visual-problems-in-an-account-dashboard/`
- Fixture: `/exercise-fixtures/visual-account-dashboard/`
- Intentional findings: approximately 2:1 account-note contrast in both themes, color-only service statuses, cramped line spacing, and indistinguishable hover/focus states.
- Contrast colors are `#b2b2b2` on `#fafafa` (about 2.03:1) and `#40404a` on `#010017` (about 2.02:1).

### Testing an appointment booking at high zoom

- Route: `/exercises/testing-an-appointment-booking-at-high-zoom/`
- Fixture: `/exercise-fixtures/zoom-appointment-booking/`
- Intentional findings: fixed-width booking panel at 320 CSS pixels, unbreakable confirmation reference, fixed-height appointment card clipping at 200% text resizing, and a fixed narrow-screen action bar obscuring final content.
- The default desktop presentation is explicitly tested not to clip the appointment card or fix the action bar over content.

## Validation at end of day

- Astro check: 0 errors; two pre-existing unused-variable hints in `src/components/CardOk.astro`.
- Production build: 33 static pages.
- Complete Playwright suite: 105 passed.
- `git diff --check`: clean before the final status file was added.
- The old `/testing-zooming/` page was not edited.
- Local development server was available at `http://127.0.0.1:4323/` during implementation.

## Current working tree

The zoom/reflow implementation is complete and validated but not committed as an implementation commit. Expected changed or new implementation files are:

- `src/exercises/fixture-registry.ts`
- `tests/axe-core.spec.js`
- `tests/exercise-architecture.spec.js`
- `tests/screen-reader-methods.spec.js`
- `src/components/exercise/fixtures/ZoomAppointmentBookingFixture.astro`
- `src/content/exercises/testing-an-appointment-booking-at-high-zoom.md`
- `src/content/testing-methods/testing-zoom-and-reflow.md`
- `tests/zoom-reflow-appointment-exercise.spec.js`

Do not discard these changes when resuming.

## Deferred content work

### Image alternative-text Exercise

Create a separate screen-reader/content Exercise rather than including alternative text in visual testing. Candidate cases include useful, vague, empty, and missing alternatives plus a deliberately broken image so learners can compare visual fallback text and assistive-technology exposure. This needs its own design.

### Pre-launch legacy cleanup

Before launch, plan a separate final milestone to inventory every retained legacy route, component, style, image, and asset; map useful content to replacements; decide retain/redirect/archive/remove per route; check inbound references and analytics; remove unused dependencies only after verifying them; and test redirects, sitemap output, missing routes, and the production build.

The cleanup requirement is recorded in `docs/superpowers/specs/2026-08-09-zoom-reflow-method-and-exercise-design.md` and must not be performed opportunistically during content migrations.

## Recommended next session

Start by reviewing the completed zoom Exercise in a real browser at both 400% page zoom and 200% text resizing. Automated tests reproduce the effective rendered conditions, but manual browser-chrome testing is still valuable.

After approval, analyse `/testing-automated-tools/` and design the next reusable Testing method plus a deliberately scoped automated-testing Exercise. Keep the image alternative-text Exercise as a separate later item unless priorities change.
