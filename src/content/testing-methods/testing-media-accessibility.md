---
title: Testing media accessibility
summary: Check prerecorded captions, transcripts, visual description, autoplay, and essential player operation across media alternatives.
description: Learn a beginner procedure for comparing prerecorded audio and video with captions, transcripts, descriptions, and player behavior.
status: published
order: 12
category: content-and-structure
topics: [media, video, captions, transcripts, audio description, autoplay, player controls]
prerequisites:
  - Basic familiarity with playing video and selecting captions in a web browser
skillLevel: beginner
estimatedMinutes: 25
tools: [Computer or mobile device, Web browser, Headphones or speakers, Text editor or browser developer tools]
platforms: [Desktop, Mobile, Tablet]
outcomes:
  - Compare prerecorded speech and meaningful sounds with caption content and timing.
  - Assess whether a transcript works as a complete, independent text alternative.
  - Identify meaningful visual information that needs audio description or an equivalent complete alternative.
  - Check autoplay and essential player operation without treating every user-agent difference as a defect.
  - Record author-controlled findings separately from browser, platform, and assistive-technology limitations.
relatedExercises: [testing-a-community-announcement-video]
interpretation:
  - A transcript does not generally replace synchronized captions for video with audio.
  - Captions include dialogue and meaningful non-speech audio, not merely a rough script of spoken words.
  - Native controls provide useful baseline behavior, but their names, focus, shortcuts, caption presentation, and assistive-technology output vary.
limitations:
  - This method does not teach custom media-player implementation, live caption production, sign-language interpretation, or streaming-platform evaluation.
  - A focused technical review does not establish the quality of every translation, description, or lived media experience.
  - Passing one browser and assistive-technology combination does not establish support across platforms.
---

## What this method tests

This method checks prerecorded media across its connected forms: audio, video, captions, transcript, visual description, playback behavior, and essential controls. The goal is to determine whether people can get equivalent information and operate the media without depending on one sense or one input.

Use the real media in a browser. Source inspection can confirm cue text, timing, language metadata, and player attributes, but it cannot replace watching, listening, reading, and operating the result.

## Captions and transcripts

Prerecorded captions should represent all meaningful dialogue and non-speech audio, identify speakers when the identity is not otherwise clear, and appear close enough to the corresponding audio to be followed. Check names, numbers, specialized terms, punctuation that changes meaning, reading order, cue duration, and overlaps.

A transcript is a separate text alternative that someone can read independently. Compare it with the complete media rather than assuming it is correct because it resembles the narration script. It should preserve meaningful speech and sounds and, when intended as a complete media alternative, the visual information needed to understand the video.

A transcript does not generally replace synchronized captions. Captions are available while the video plays; a transcript supports a different way of accessing and navigating the information.

## Visual information and audio description

Watch once without looking away from the video, then listen without watching. Record information that is meaningful only visually: names, locations, demonstrations, actions, changes, on-screen text, charts, or expressions that affect understanding.

Determine whether a synchronized audio-described version or an equivalent complete alternative makes that information available. Description should fit the purpose and context. It need not narrate decoration or repeat information already clear from the main audio.

See the W3C guidance on [captions for prerecorded media](https://www.w3.org/WAI/WCAG22/Understanding/captions-prerecorded.html) and [audio description for prerecorded media](https://www.w3.org/WAI/WCAG22/Understanding/audio-description-prerecorded.html).

## How to perform the test

1. Record the page, media title and purpose, duration, languages, device, operating system, browser and version, player, input methods, caption settings, and assistive technology used.
2. Before activating the player, observe whether audio or video starts automatically. Confirm that unexpected playback can be stopped and that automatic audio does not make the page difficult to use.
3. Operate the available player. Check play, pause, seeking, volume or mute, caption selection, focus visibility, and any other essential task exposed by that player.
4. Play the media with captions enabled. Compare every spoken phrase, important sound, speaker change, name, number, and sequence with the caption text.
5. Replay short sections to assess synchronization. Record the cue, actual audio time, caption time, and practical effect rather than describing timing only as “off.”
6. Read the transcript without watching or listening. Note whether it identifies the media, follows a useful order, and preserves meaningful speech, sounds, and any visual content it claims to replace.
7. Listen without watching. Identify meaningful visual information that the audio does not provide, then look for an audio-described version or complete equivalent alternative.
8. Repeat essential checks with another relevant browser or assistive technology when possible. Separate author-controlled defects from user-agent differences and unsupported combinations.
9. Record the media state, time range, actual and expected information or behavior, user impact, passing checks, environment, limitations, and remediation direction.

## Player and platform boundaries

Native media controls are provided largely by the browser and operating system. Their visual layout, accessible names, focus order, shortcuts, caption menus, and screen-reader announcements can differ. Verify what happens in the environment you use and avoid requiring one browser's exact presentation everywhere.

An author still controls whether the media has controls, starts automatically, includes caption and description sources, declares track languages, and provides useful alternatives. A custom player adds more author responsibility and needs its own keyboard, screen-reader, touch, zoom, and visual testing.

Live captions have different production, correction, and delay constraints from prerecorded captions. Record whether the source is live or prerecorded; do not apply a polished prerecorded-media expectation without acknowledging the live context.
