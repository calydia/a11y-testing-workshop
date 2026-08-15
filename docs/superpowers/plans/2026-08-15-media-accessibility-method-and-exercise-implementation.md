# Media accessibility method and Exercise implementation plan

## Goal

Publish a beginner Testing method and standalone community-announcement Exercise for prerecorded captions, transcripts, meaningful visual information, audio description, autoplay, and essential player operation, then integrate the pair into the first Learning path.

## Task 1: Pin the content graph and learning contract

### Files

- Create: `tests/media-accessibility-exercise.spec.js`
- Modify: `tests/screen-reader-methods.spec.js`
- Modify: `tests/exercise-architecture.spec.js`
- Modify: `tests/learning-path.spec.js`
- Modify: `tests/testing-journey.spec.js`
- Modify: `tests/axe-core.spec.js`

### Work

1. Add failing assertions for the method route, beginner metadata, 25-minute estimate, prerecorded captions, transcripts, visual description, autoplay, native-player boundaries, browser limitations, and Exercise relationship.
2. Add failing assertions for the Exercise route, beginner metadata, 30-minute estimate, exactly five findings, three hints, method relationship, standalone workflow, passing checks, and closed solution.
3. Pin the method after mobile touch and before zoom/reflow. Shift later method order values only as needed while preserving their existing relative sequence.
4. Pin the Exercise after the community-festival touch Exercise and before the high-zoom Exercise. Shift later Exercise order values only as needed.
5. Pin the pair in `Your first accessibility review`, including the 475-minute estimate and updated media-testing scope.
6. Pin both existing Testing journeys' authored methods, stages, deliverables, and estimates so the new method does not enter them incidentally. Update only dynamically rendered recommended-path duration assertions from 420 to 475 minutes.
7. Add both learner-facing routes to automated accessibility coverage.

## Task 2: Create reproducible local media assets

### Files

- Create: `scripts/generate-community-announcement-media.mjs`
- Create: `public/media/community-centre-open-day.webm`
- Create: `public/media/community-centre-open-day.en.vtt`

### Work

1. Write one source-controlled Node generation script so the committed video can be regenerated without a third-party service or copyrighted source material. Use the macOS `say` and `afconvert` commands for temporary narration audio and Playwright's bundled Chromium `canvas.captureStream`, Web Audio, and `MediaRecorder` APIs to mux the authored cards and narration into WebM.
2. Generate clear synthetic narration for a fictional community-centre open day and combine it with simple authored title cards in a compact VP8/Opus WebM that the project's Playwright browser can decode.
3. Keep the video between 30 and 40 seconds and include ordinary spoken event details.
4. Present a quiet-hour time and accessible-entrance location visually without narrating them. Keep both details absent from the transcript and any described alternative so the visual-description finding is stable.
5. Include one meaningful non-speech sound or speaker transition whose caption identification is deliberately absent.
6. Create an English WebVTT file with deterministic cues containing one omitted spoken phrase, one missing sound or speaker identification, and one noticeably mistimed cue.
7. Keep other cues accurate, readable, ordered, and non-overlapping so the fixture does not become a general collection of caption defects.
8. Ensure there is no flashing, sudden loud audio, personal data, advertising, or external dependency.
9. Use browser media metadata and playback checks to verify duration, dimensions, video/audio tracks, and local decoding.
10. Keep temporary narration, frames, and intermediate assets outside the repository; commit only the generator, final WebM, and WebVTT file.

## Task 3: Create and register the media fixture

### Files

- Create: `src/components/exercise/fixtures/CommunityAnnouncementMediaFixture.astro`
- Modify: `src/exercises/fixture-registry.ts`

### Work

1. Build a realistic community-centre announcement page with the normal return link, page heading, introduction, native video, authored transcript, and platform-variation note.
2. Render one labelled `<video controls preload="metadata">` with the local WebM source and one default English caption track.
3. Deliberately omit `autoplay`; use the native player for playback, pause, seeking, volume, and caption selection so these remain passing evidence.
4. Author a visible transcript that is generally accurate but contains exactly the approved incomplete or inaccurate spoken-content defect.
5. Keep visual-only quiet-hour and entrance information unavailable from the narration, transcript, or a described alternative.
6. Avoid custom controls and unrelated keyboard, name, contrast, resize, focus, or screen-reader defects.
7. Preserve the explicit return link, visible focus on authored controls, saved theme, narrow-width reflow, and stable reload state.
8. Register `community-announcement-media` as a document fixture titled `Community announcement media exercise` with exactly five intentional-violation identifiers matching the approved findings.

## Task 4: Publish the Testing method

### Files

- Create: `src/content/testing-methods/testing-media-accessibility.md`

### Work

1. Add published beginner metadata, a 25-minute estimate, suitable device/browser/headphone/transcript-inspection tools, and the related Exercise.
2. Explain the distinction among captions, transcripts, audio description, complete media alternatives, and ordinary visible text.
3. Explain that transcripts do not generally replace synchronized captions and that captions include meaningful non-speech audio and speaker identification where needed.
4. Write the approved environment-first procedure covering purpose and language inventory, essential controls, autoplay, caption completeness and timing, transcript independence, visual-only information, description alternatives, and evidence recording.
5. Briefly distinguish prerecorded and live captions without expanding into a live-production workflow.
6. Explain the boundary between author-controlled media and native user-agent controls, including platform-dependent control names, focus behavior, shortcuts, caption styling, and assistive-technology output.
7. State the method's custom-player, sign-language, live-stream, conformance, and disabled-user-testing limitations.

## Task 5: Publish the Exercise

### Files

- Create: `src/content/exercises/testing-a-community-announcement-video.md`

### Work

1. Add published beginner `find-issues` metadata, a 30-minute estimate, fixture ID, one method reference, and exactly five expected findings.
2. Write objectives and instructions covering environment evidence, player passing checks, repeated caption comparison, transcript-only review, visual-only content, platform limitations, and evidence recording.
3. Add three progressive hints ending with the five approved target areas without stating full solutions.
4. Add exactly five closed solution entries for caption omission, missing sound or speaker identification, mistiming, incomplete or inaccurate transcript content, and unavailable visual-only information.
5. For every solution entry, explain actual behavior, expected access, user impact, evidence, and flexible remediation direction.
6. Identify native player controls, lack of autoplay, caption selection, and lack of flashing as useful passing checks without turning them into additional findings.

## Task 6: Integrate collection order and the Learning path

### Files

- Modify: `src/content/learning-paths/your-first-accessibility-review.md`
- Modify: later entries in `src/content/testing-methods/` where order values must shift
- Modify: later entries in `src/content/exercises/` only if order values must shift

### Work

1. Insert the method and Exercise after the mobile-touch pair and before zoom and reflow.
2. Increase the path estimate from 420 to 475 minutes, which renders as `About 8 hours`.
3. Update summary, description, topics, and outcomes to include a bounded prerecorded-media review without claiming custom-player, live-media, or comprehensive media-production coverage.
4. Preserve every existing pair, checkpoint, and authored sequence.
5. Preserve both Testing journeys' authored scopes and update only dynamic recommended-path duration output.

## Task 7: Verify media, cues, fixture behavior, and controlled defects

### Files

- Complete: `tests/media-accessibility-exercise.spec.js`

### Work

1. Verify the fixture document boundary, return route, title, saved theme, responsive fit, unique IDs, and absence of answer leakage.
2. Verify exactly one native video, one local WebM source, one English default caption track, one authored transcript, three hints, and five closed solution sections.
3. Read or fetch the WebVTT file and assert its cue order, text, timestamps, approved omission boundary, missing identification, and deterministic mistiming.
4. Inspect the video element and text-track state without depending on the browser's painted native controls or caption style.
5. Start playback through a user gesture, verify time advances, pause it, seek to a known time, change volume, and confirm the state remains controllable.
6. Verify the media does not autoplay after load and exposes its caption track where the browser supports text tracks.
7. Confirm the transcript contains the approved controlled omission but otherwise exposes its required event information.
8. Confirm the visually rendered quiet-hour and entrance details exist in the video plan and remain absent from narration, transcript, captions, and any described source.
9. Verify visible focus on authored links and controls, light and dark theme compatibility, narrow-width fit, and the expected axe boundary.
10. Avoid assertions tied to one operating system's visual native-control layout, caption font, caption menu, or keyboard shortcut set.

## Task 8: Complete project verification

### Work

1. Run focused media, method-listing, Exercise-listing, Learning-path, journey, architecture, breadcrumb, and axe tests under Node.js 24.
2. Run Astro diagnostics and the production build.
3. Run the complete Playwright suite on the default port `4321`.
4. Review the method, Exercise, and standalone fixture at desktop and mobile widths in light and dark themes.
5. Watch the complete media with and without captions, read the transcript independently, and confirm the five controlled findings and intended passing checks manually.
6. Inspect generated media metadata and verify the production build contains the WebM and WebVTT assets.
7. Verify the public routes in the sitemap and all generated internal links.
8. Run `git diff --check` and inspect the final diff for unrelated changes or accidental intermediate media files.

## Out of scope

- Custom media-player controls.
- Live captions and live-stream production.
- Sign-language interpretation.
- Embedded third-party players, DRM, or cross-origin media behavior.
- A complete WCAG conformance mapping.
- A separate audio-only Exercise.
- Media analytics or playback telemetry.
- Adding unrelated media stages to either current Testing journey.
- Treating the intentionally incomplete announcement as production-ready public information.
