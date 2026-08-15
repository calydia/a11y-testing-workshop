# Media Accessibility Method and Exercise Design

## Goal

Publish a beginner Testing method and paired Exercise for evaluating prerecorded media accessibility. Learners will compare a short fictional community announcement's audio, video, captions, and transcript; identify five controlled alternative-content problems; verify useful native-player behavior; and record browser and platform limitations accurately.

## Public routes and placement

Add these routes:

- `/methods/testing-media-accessibility/`
- `/exercises/testing-a-community-announcement-video/`
- `/exercise-fixtures/community-announcement-media/`

Connect the method and Exercise bidirectionally. Insert the pair into `Your first accessibility review` after mobile touch and orientation and before zoom and reflow. The method takes 25 minutes and the Exercise takes 30 minutes, increasing the path estimate from 420 to 475 minutes, displayed as about 8 hours.

The pages must remain self-contained for visitors arriving directly. The Learning path recommends a sequence; it is not an access requirement.

Do not add the method to either existing Testing journey. Neither current scenario contains meaningful media. Update only assertions or presentation that dynamically expose the first path's new duration.

## Testing method

Create `Testing media accessibility` as a beginner method. It teaches a bounded real-media-first procedure for prerecorded content:

1. identify the media's purpose, languages, important speakers, meaningful sounds, and meaningful visual information;
2. operate the player with available inputs and confirm that playback, pause, seeking, volume, and caption selection remain available;
3. confirm that playback does not begin unexpectedly and that any automatic playback can be stopped;
4. compare every spoken phrase and meaningful sound with the captions;
5. inspect caption synchronization, reading order, speaker identification, sound identification, language metadata, and readability;
6. use the transcript without watching or listening and compare it with the complete media;
7. identify visual-only information and determine whether audio description or an equivalent complete alternative makes it available;
8. record browser, operating-system, player, caption-presentation, and assistive-technology limitations.

The method must distinguish author-controlled media from user-agent controls. A native video player can provide useful baseline behavior, but its control names, focus behavior, caption styling, and shortcuts vary by browser and operating system. Mouse operation or DOM inspection does not establish usability with every assistive technology.

Cover prerecorded captions, transcripts, audio description, autoplay, and essential player operation. Briefly distinguish live captions from prerecorded captions. Keep sign-language interpretation, custom media-player implementation, live-stream production, DRM, and detailed WCAG conformance mapping outside this focused method.

The method must not imply that a transcript generally replaces captions. It must explain that captions include dialogue and meaningful non-speech audio, while a complete transcript provides a separate text alternative. It must also distinguish a visual description included in a complete media alternative from a synchronized audio-described version.

## Media scenario and assets

Create a 30–40 second fictional community-centre open-day announcement. Use simple illustrated title cards and clear synthetic narration. The spoken content includes ordinary event details. Meaningful visual-only content includes a quiet-hour time and the accessible-entrance location so the missing audio-description case is concrete.

Store a compact WebM file and an English WebVTT caption file as repository assets. The media must be locally hosted and must not depend on an external service. It must contain no hazardous flashing, abrupt loud audio, copyrighted third-party footage, personal data, or advertising.

The WebVTT file deliberately contains the approved caption findings. The fixture includes an authored HTML transcript with its approved controlled defect. There is intentionally no audio-described version or complete equivalent alternative.

Keep the asset small enough for a static educational site. The production build must copy the media and track successfully. Source-generation commands or scripts may be documented if they materially improve reproducibility, but runtime generation is not required.

## Standalone fixture

Register `community-announcement-media` as a document fixture titled `Community announcement media exercise`.

The fixture contains:

- the normal return link to the Exercise;
- a concise community-centre heading and introduction;
- a labelled native `<video controls preload="metadata">` element;
- an English caption `<track>` available by default where the browser supports it;
- no `autoplay` attribute;
- a visible HTML transcript;
- a short testing note explaining that native controls and caption presentation vary across platforms.

Use native controls rather than a custom player. Playback, pause, seeking, volume, focus, and caption availability are passing evidence, not additional defects. Do not seed keyboard, control-name, contrast, resize, or screen-reader defects unrelated to the media alternatives.

The learner instructions ask visitors to watch more than once, compare captions with the audio, use the transcript independently, inspect cue data when useful, and identify information conveyed only visually. They must encourage testing with a real browser and relevant assistive technology while allowing DOM and file inspection as supporting evidence.

The fixture follows the Lab's light and dark themes, preserves visible keyboard focus around authored interactive elements, fits a narrow viewport, and does not reveal finding labels, counts, hints, or solution language.

## Controlled findings

The Exercise contains exactly five solution findings, and the fixture registry contains exactly five matching internal violation identifiers:

1. **A spoken phrase is omitted from the captions.** One meaningful narrated phrase has no equivalent caption text.
2. **A meaningful sound or speaker change is not identified.** A cue omits information needed to understand who is speaking or what meaningful non-speech audio occurs.
3. **A caption cue is noticeably mistimed.** One cue appears sufficiently early or late that it no longer accompanies the corresponding audio reliably.
4. **The transcript is incomplete or inaccurate.** It omits or misrepresents meaningful spoken content rather than differing only in harmless punctuation or formatting.
5. **Meaningful visual-only information has no description.** The quiet-hour or entrance detail is visible in the video but absent from the narration, transcript, and any described version or complete equivalent alternative.

Caption omission, sound or speaker identification, and synchronization are separate findings because each requires distinct evidence and remediation. Do not multiply one repeated caption defect into several findings.

The solution explains actual behavior, expected access, user impact, evidence to record, and flexible remediation direction. It also identifies useful passing checks: native player controls are present, playback is not forced, captions can be selected, and the media has no hazardous flashing.

## Exercise content

Create `Testing a community announcement video` with beginner difficulty and a 30-minute estimate. It references only `Testing media accessibility`.

The Exercise asks learners to:

1. record the device, operating system, browser, player, input, caption settings, and assistive technology used;
2. operate the player and record passing behavior as well as defects;
3. watch and listen with captions enabled, then compare cue content and timing with the media;
4. read the transcript without relying on the player and compare it with the complete announcement;
5. identify meaningful visual information unavailable through audio;
6. record exactly five findings and relevant platform limitations.

Provide three progressive hints. The first points learners toward audio, video, caption, transcript, and player comparisons. The second calls attention to completeness, identification, synchronization, and visual-only information. The third names the five target regions without giving full solutions.

The solution stays closed by default and contains exactly five finding sections.

## Collection integration

Place the method after `Testing mobile touch and orientation` and before `Testing zoom and reflow`. Shift later method order values only as needed to preserve the existing authored sequence.

Place the Exercise after the community-festival touch Exercise and before the high-zoom appointment Exercise. Shift later Exercise order values only if their values would otherwise collide or produce the wrong listing sequence.

Update `Your first accessibility review` summary, description, topics, outcomes, steps, and duration so media testing is represented accurately. Preserve every existing pair, checkpoint, and relative order. Keep the path's setup, note-taking, review, and repetition explanation unchanged.

Do not modify either Testing journey's scenario, methods, stages, deliverables, or estimate merely to include the new pair.

## Verification

Add focused Playwright coverage for:

- the method and Exercise metadata and their bidirectional relationship;
- standalone fixture title, route, and return workflow;
- one video, one caption track, one transcript, and exactly five solution findings;
- the video source, caption language, default availability, cue content, and deliberate cue timing;
- playback, pause, seeking, volume, caption-track exposure, and absence of autoplay;
- meaningful visual-only details and the controlled transcript omission;
- light and dark themes, visible focus, narrow layouts, and expected axe results;
- no solution leakage from the fixture;
- section listings, shared section navigation, breadcrumbs, and site-wide accessibility-route coverage;
- the first Learning path's exact expanded sequence, 475-minute source estimate, and displayed `About 8 hours` value;
- unchanged authored scope for both Testing journeys, apart from any dynamic recommended-path duration output;
- Astro diagnostics, the full Playwright suite, the production build, and representative visual checks.

Tests must assess controlled defects precisely without depending on a particular browser's visual rendering of native controls or captions. Prefer media element state, text-track cue data, source markup, and authored DOM evidence over pixel assertions for user-agent UI.

## Out of scope

- custom media-player controls;
- live captions and live-stream production workflows;
- sign-language interpretation;
- embedded third-party players;
- DRM or cross-origin media behavior;
- a complete WCAG conformance mapping;
- changes to existing Testing journeys;
- a separate audio-only Exercise;
- media analytics or playback telemetry.
