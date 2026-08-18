---
title: Testing language changes on a community library noticeboard
summary: Review Finnish, Swedish, and English notices while separating language-markup defects from voice and platform limitations.
description: Practise testing declared and inherited language changes with a screen reader and inspecting missing, incorrect, invalid, and overly broad language markup.
status: published
order: 57
category: content-and-structure
topics: [screen readers, language, Finnish, Swedish, pronunciation]
prerequisites:
  - Understand the Testing language changes with a screen reader method
difficulty: beginner
estimatedMinutes: 20
exerciseType: find-issues
fixture: community-library-noticeboard
objectives:
  - Identify the intended human language of each passage before inspecting markup.
  - Test language boundaries and nested content with a screen reader.
  - Inspect declared and inherited language values.
  - Distinguish missing, incorrect, invalid, and overly broad language declarations.
  - Separate markup defects from unavailable voices or unsupported automatic switching.
methods: [screen-reader-language-changes]
hints:
  - Compare each passage's visible language with the language it inherits from the English document.
  - Inspect nested links and the exact point where content returns from Finnish or Swedish to English.
  - Look for one missing declaration, one wrong valid language, one invalid value, one unnecessary nested override, and one declaration whose scope is too broad.
expectedFindings: 5
solution:
  summary: The noticeboard contains five markup findings. The correctly marked Finnish and Swedish activities, inherited Swedish link, and intentional nested English event name are passing checks. Voice switching still depends on the test environment.
  findings:
    - title: The Finnish family-reading notice inherits English
      explanation: The Finnish sentence has no language declaration, so it inherits English from the document. Declare lang="fi" on the smallest suitable container for the Finnish passage.
      method: screen-reader-language-changes
    - title: The Swedish digital-help notice is marked as Finnish
      explanation: The notice declares the valid code fi even though its content is Swedish. Automated validation cannot infer that mismatch. Change the declaration to lang="sv".
      method: screen-reader-language-changes
    - title: The Swedish registration link is overridden as English
      explanation: The surrounding paragraph correctly declares Swedish, but the Swedish link declares English and can trigger the wrong pronunciation. Remove the unnecessary override so the link inherits sv.
      method: screen-reader-language-changes
    - title: The Finnish writing-workshop scope includes English content
      explanation: The Finnish language declaration wraps both the Finnish notice and the following English availability sentence. Move lang="fi" to the Finnish passage, or restore English exactly at the genuine boundary.
      method: screen-reader-language-changes
    - title: The local-history notice uses an invalid Swedish language value
      explanation: The value swedish is not a valid BCP 47 language tag. Replace it with the valid Swedish tag sv.
      method: screen-reader-language-changes
---

Use the [Testing language changes with a screen reader](/methods/screen-reader-language-changes/) method to review the community library noticeboard. Start the exercise from the Exercise workspace.

1. Record your screen reader, browser, operating system, installed Finnish and Swedish voices, and automatic-language-switching setting.
2. Review the visible English, Finnish, and Swedish passages and predict each language boundary.
3. Read through every notice and its nested links with your screen reader.
4. Inspect the declared and inherited language values in the markup.
5. Identify exactly five markup findings and four passing checks.
6. Record actual pronunciation or voice behavior separately from the markup evidence.
7. For each finding, record the affected passage, declared or inherited value, expected language, user impact, and remediation direction.

Do not report a markup defect solely because a voice did not switch. Voice availability, automatic switching, and supported behavior vary across screen readers, browsers, operating systems, and user settings.
