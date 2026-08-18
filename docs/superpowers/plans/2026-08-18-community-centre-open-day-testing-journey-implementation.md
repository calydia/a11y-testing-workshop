# Community centre open-day Testing journey implementation plan

## Goal

Publish an intermediate, task-led community-centre open-day Testing journey with one standalone workspace, six existing Testing methods, recommended Learning-path preparation, a distinct locally generated travel video, six review stages, nine controlled findings, and useful passing comparisons.

## Task 1: Pin the journey graph and workspace contract

### Files

- Modify: `tests/testing-journey.spec.js`
- Create: `tests/community-centre-open-day-workspace.spec.js`
- Modify: `tests/axe-core.spec.js`

### Work

1. Add failing assertions for the third journey's listing and submenu order, intermediate metadata, 90-minute estimate, scenario, role, objectives, six methods, recommended Learning path, six stages, six deliverables, workspace link, and contextual guidance.
2. Pin the six referenced methods and stage-specific method links in their approved authored order.
3. Assert that the journey does not expose a solution, finding count, completed report, progress tracking, grading, or forced new-tab navigation.
4. Pin the standalone workspace route, page title, return link, saved theme, responsive behavior, deterministic reload, interaction boundaries, media assets, and nine controlled findings.
5. Preserve both existing journeys, their workspaces, their authored stages and methods, and their preparation behavior.
6. Add only the surrounding journey page to central zero-violation axe coverage; verify the deliberately defective workspace in its focused test with an explicit automated boundary.

## Task 2: Generate distinct local journey media

### Files

- Create: `scripts/generate-open-day-journey-media.mjs`
- Create: `public/media/open-day-travel-information.webm`
- Create: `public/media/open-day-travel-information.en.vtt`
- Create: `public/media/open-day-travel-information-poster.svg`

### Work

1. Reuse the proven local generation architecture without importing or coupling to the media Exercise generator.
2. Use macOS `say` and `afconvert` for temporary clear synthetic narration and Playwright Chromium canvas, Web Audio, and MediaRecorder APIs for a compact local WebM.
3. Keep the video short, user-initiated, non-flashing, free of abrupt loud audio, fictional, and independent of external or copyrighted media.
4. State the correct public-transport route number in narration and the authored transcript plan.
5. Write an otherwise accurate English WebVTT track that substitutes one incorrect route number in a deterministic cue.
6. Display a meaningful shuttle cancellation and time visually in the video and poster while omitting them from narration, captions, transcript, and any described source.
7. Generate stable cue timings from decoded narration segments rather than estimating speech timing by hand.
8. Keep temporary narration, frames, and intermediate files outside the repository; commit only the generator and final WebM, WebVTT, and poster assets.
9. Verify duration, dimensions, audio/video tracks, local decoding, caption text and timing, and production copying.

## Task 3: Build the standalone open-day workspace

### Files

- Create: `src/components/journey/workspaces/CommunityCentreOpenDay.astro`
- Create: `src/pages/journey-workspaces/community-centre-open-day.astro`

### Work

1. Build one realistic open-day website containing a return link, community-centre header and navigation, introduction, featured activities, schedule filters and cards, venue information, authored map, travel video and transcript, booking action, and trailing content.
2. Follow the existing journey-workspace page boundary and saved-theme initialization without registering the workspace as an Exercise fixture.
3. Seed exactly the nine approved findings without answer-revealing comments, selectors, accessible descriptions, visible labels, counts, or diagnostic metadata.
4. Include passing native links and buttons, visible focus, flexible schedule content, static content, sufficiently large primary actions, user-initiated video playback, correct transcript route number, portrait availability, and desktop-landscape availability.
5. Ensure reload restores carousel position, saved state, filter state, video state, and all content deterministically.
6. Keep the workspace fictional and local: no booking submission, authentication, persistence, analytics, external requests, or personal data.

## Task 4: Implement isolated workspace interactions

### Files

- Modify: `src/components/journey/workspaces/CommunityCentreOpenDay.astro`

### Work

1. Implement a predictable featured-activities timer that advances one carousel region, does not flash, does not duplicate, and deliberately continues under real reduced motion.
2. Do not provide a pause, stop, or hide control for the seeded carousel; keep unrelated page content static.
3. Implement the custom save control with pointer activation and visible saved feedback while deliberately omitting focusability and keyboard activation.
4. Implement schedule-filter selection with correct native or programmatic state and a visible authored selected cue in ordinary colors.
5. In real forced colors, deliberately remove the schedule filter's only durable visual selected cue while preserving the selected state.
6. Use authored map regions whose meaning depends on custom colors and deliberately collapses in real forced colors; include a durable text comparison elsewhere.
7. Define exact authored map-control target boxes and center spacing below the approved baseline, plus sufficiently large passing primary actions.
8. Apply the orientation blocker only at phone-like landscape dimensions and keep desktop landscape and portrait content available.
9. Implement the fixed booking bar so it is harmless at ordinary desktop and mobile conditions but obscures content at the approved zoom/reflow condition.
10. Render one labelled native video with local source, poster, default English caption track, no autoplay, and authored transcript; normalize generated WebM duration where Chromium requires it.
11. Avoid framework hydration, global state, stale timers, duplicated listeners, real navigation side effects, or irreversible actions.

## Task 5: Publish the third Testing journey

### Files

- Create: `src/content/testing-journeys/reviewing-a-community-centre-open-day-before-launch.md`

### Work

1. Add published intermediate metadata after the two existing journeys, a 90-minute estimate, scenario, role, objectives, six methods, and `Your first accessibility review` as recommended preparation.
2. Add the exact six stages for scope, keyboard/reflow, visual/motion preferences, touch/orientation, media, and consolidation/recommendation.
3. Associate methods only with the relevant stages and preserve their approved authored order.
4. Add exactly six static deliverables covering scope, findings, passing checks and limitations, consolidated evidence, remediation and follow-up, and launch recommendation.
5. Add concise body guidance for pacing, one evidence log, resets, overlap, terminology, prioritization, recommendation, and the Lab's testing boundary.
6. Add one same-tab workspace link with a clear accessible name.
7. Do not include a solution, finding count, completed recommendation, required reporting tool, progress UI, or grading.

## Task 6: Verify keyboard and zoom/reflow behavior

### Files

- Complete: `tests/community-centre-open-day-workspace.spec.js`

### Work

1. Verify the custom save control responds to pointer activation, exposes visible feedback, is omitted from sequential keyboard focus, and does not respond to Enter or Space.
2. Verify ordinary navigation, schedule, booking, and return controls work with keyboard input and retain visible focus.
3. Verify initial focus order remains logical outside the intentional save control.
4. Verify the schedule and ordinary content reflow without unrelated page-level horizontal overflow at narrow and zoomed conditions.
5. Reproduce the fixed booking-bar obstruction only at the approved 320-CSS-pixel or equivalent high-zoom condition and verify it does not obscure content at ordinary desktop.

## Task 7: Verify preferences, motion, touch, and orientation

### Files

- Complete: `tests/community-centre-open-day-workspace.spec.js`

### Work

1. Verify selected filter and map regions remain distinguishable in ordinary light and dark themes.
2. Emulate real forced colors and verify the selected cue and map-region distinction fail exactly as approved while passing text and controls remain available.
3. Verify carousel position changes on the approved timer, no pause control exists, and real reduced motion does not stop or reduce the seeded movement.
4. Inspect animation and timer definitions to reject flashing, rapid alternating cycles, or duplicated updates.
5. Measure map-control boxes and center distances to prove they fail both target size and spacing; measure passing primary actions at or above the approved baseline.
6. Verify portrait content remains available, phone-like landscape exposes the restriction, and desktop landscape remains available.
7. Keep synthetic pointer and orientation evidence accurately scoped; do not claim emulation proves physical touch usability.

## Task 8: Verify media and content boundaries

### Files

- Complete: `tests/community-centre-open-day-workspace.spec.js`

### Work

1. Verify one local native video source, one poster, one default English caption track, one authored transcript, and no autoplay or custom controls.
2. Read or fetch the WebVTT file and assert its exact correct context and incorrect route-number substitution.
3. Verify narration-plan and transcript text use the correct route number.
4. Verify the shuttle cancellation exists in the authored visual media and poster plan while remaining absent from captions, transcript, narration, and described alternatives.
5. Verify finite duration, playback, pause, seeking, volume, caption-track availability, and deterministic reload without depending on painted native controls.
6. Verify the workspace has no answer leakage, unique IDs, expected axe results, saved light/dark theme, and narrow-width fit outside intentional conditions.

## Task 9: Integrate navigation and complete verification

### Files

- Modify exact journey listing and navigation assertions in existing tests as required.

### Work

1. Run Astro diagnostics and the production build to validate all collection references and generated routes.
2. Run focused journey, workspace, content-architecture, breadcrumb, site-navigation, and axe tests on the default port `4321`.
3. Run the complete Playwright suite under Node.js 24.
4. Review the journey and workspace at desktop, portrait mobile, phone-like landscape, desktop landscape, and zoom/reflow conditions in light, dark, forced-colors, and reduced-motion states where applicable.
5. Watch the complete travel video with and without captions, read the transcript independently, and confirm the two controlled media findings and intended passing checks.
6. Verify both public routes in the sitemap, the workspace's contextual discoverability, and the built WebM, WebVTT, and poster assets.
7. Run `git diff --check`, inspect the final diff for unrelated changes or intermediate media files, and confirm both existing journeys and all existing methods and Exercises remain unchanged.

## Out of scope

- New Testing methods or Exercises.
- Changes to the two existing journey scenarios or workspaces.
- A completed model report, solution, or required finding count.
- Real booking, authentication, payments, persistence, analytics, or network requests.
- Custom media-player controls, live media, or third-party embeds.
- Mobile screen readers, voice control, switch control, or stylus-specific instruction.
- A conformance claim or exhaustive WCAG mapping.
- Treating the intentionally incomplete workspace as production-ready event software.
