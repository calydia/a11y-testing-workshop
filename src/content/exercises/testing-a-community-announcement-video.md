---
title: Testing a community announcement video
summary: Investigate captions, transcript content, visual-only information, and native player behavior in a short community-centre announcement.
description: Practise a bounded prerecorded-media review by comparing one announcement's audio, video, captions, transcript, and player behavior.
status: published
order: 30
category: content-and-structure
topics: [media, video, captions, transcript, audio description, native controls]
prerequisites:
  - Understand the Testing media accessibility method
difficulty: beginner
estimatedMinutes: 30
exerciseType: find-issues
fixture: community-announcement-media
objectives:
  - Compare caption text, identification, and synchronization with the complete audio.
  - Assess whether the transcript works independently and accurately.
  - Identify meaningful visual information unavailable through audio or an equivalent alternative.
  - Record exactly five findings, useful passing checks, and platform limitations.
methods: [testing-media-accessibility]
hints:
  - Compare what you hear, see, read in the captions, and read in the transcript. Also operate the player and record useful passing behavior.
  - Check whether every phrase and meaningful sound is represented, whether cues appear with the matching audio, and whether visual-only details are available another way.
  - Review the omitted caption phrase, sound identification, late cue, transcript content, and information shown only in the video.
expectedFindings: 5
solution:
  summary: The announcement contains five controlled media-alternative problems. Its native controls, user-initiated playback, caption availability, and non-flashing presentation provide useful passing checks.
  findings:
    - title: A spoken workshop detail is omitted from the captions
      explanation: The narration says that workshops are free and do not require booking, but no caption cue provides that phrase. Add an accurately timed cue containing the complete meaningful speech and recheck the surrounding cue sequence.
      method: testing-media-accessibility
    - title: The bell is missing from the captions
      explanation: A bell signals the transition to Alex, but the captions contain no meaningful sound identification. Include a concise sound label, and identify the speaker as needed when the audio and context do not otherwise make the change clear.
      method: testing-media-accessibility
    - title: The welcome-desk caption appears late
      explanation: The cue about visiting the welcome desk begins about two seconds after the matching speech. Retiming the cue to accompany the phrase would reduce the effort of matching simultaneous audio and text while preserving readable cue duration and order.
      method: testing-media-accessibility
    - title: The transcript omits the opening time
      explanation: The narration and captions state that doors open at ten, but the transcript skips that meaningful event detail. Add the missing information in the correct sequence and review the entire transcript independently against the media.
      method: testing-media-accessibility
    - title: Quiet-hour and entrance details are available only visually
      explanation: The video shows the quiet hour and step-free entrance location, but neither the narration, transcript, captions, nor a described version makes them available without sight. Provide the meaningful visual information through synchronized audio description or an appropriate complete alternative.
      method: testing-media-accessibility
---

Use [Testing media accessibility](/methods/testing-media-accessibility/) while investigating the community-centre announcement.

1. Record the device, operating system, browser and version, player, input methods, caption settings, speakers or headphones, and assistive technology used.
2. Before playing the video, check whether it starts automatically. Operate playback, pause, seeking, volume or mute, and caption selection, and record passing behavior as well as defects.
3. Watch and listen with English captions enabled. Compare every phrase, meaningful sound, speaker change, name, number, and sequence.
4. Replay short sections when necessary. Record actual speech and cue times for synchronization evidence without relying only on a general impression.
5. Read the transcript without watching or listening, then compare it with the full announcement.
6. Listen without watching. Identify meaningful visual information that remains unavailable and look for a described version or complete equivalent alternative.
7. Identify exactly five findings. Keep browser-native presentation differences and untested platform combinations in your limitations rather than assuming they are author defects.
8. Record the time range or content, actual and expected result, user impact, environment, passing checks, limitations, and remediation direction.

Return to this Exercise when you are ready to continue or when you need a hint or the solution.
