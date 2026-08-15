# Text-spacing overrides method and Exercise design

## Goal

Add a beginner Testing method and paired Exercise that teach learners to apply the WCAG text-spacing condition and determine whether content or functionality is lost. The pair should distinguish testing a user override from reviewing the site's authored typography.

The scope is limited to text spacing. It must not expand into forced colors, font replacement, browser zoom, text resizing, custom color schemes, or general user-stylesheet testing.

## Content position

Create:

- Testing method: `Testing text spacing and user overrides`
- Method slug: `testing-text-spacing-and-user-overrides`
- Exercise: `Testing text spacing on a community-services page`
- Exercise slug: `testing-text-spacing-on-a-community-services-page`
- Standalone fixture ID: `community-services-text-spacing`

Use beginner level for both entries. Estimate 20 minutes for the method and 20 minutes for the Exercise.

Place the method at order `8`, after `Testing visual accessibility` and before `Testing zoom and reflow`. Shift the adjacent method orders into the existing integer gaps so their learner-facing sequence remains unchanged: zoom `9`, automated `10`, structure and links `11`, data tables `12`, and controls `13`. Place the Exercise at order `25`, after the visual-dashboard Exercise and before the high-zoom Exercise.

Connect the entries bidirectionally:

- The method lists the Exercise through `relatedExercises`.
- The Exercise lists the method through `methods`.

## Testing method

### Learning outcomes

The method teaches learners to:

- Distinguish authored typography from a test in which a user overrides text spacing.
- Apply all four WCAG text-spacing values together without changing other style properties.
- Confirm that the override took effect before interpreting the page.
- Check whether text, controls, instructions, and functionality remain complete and available.
- Identify clipping, overlap, truncation, hidden content, and containers that do not grow.
- Reset and reapply the condition to establish causation.
- Record passing behavior as well as findings.

### Test condition

The method uses the current WCAG 2.2 Text Spacing condition:

- Line height of at least `1.5` times the font size.
- Spacing after paragraphs of at least `2` times the font size.
- Letter spacing of at least `0.12` times the font size.
- Word spacing of at least `0.16` times the font size.

The page is not required to use these values by default. The test asks whether content and functionality remain available when a user applies them together and changes no other style property.

Authoritative references:

- [Understanding Success Criterion 1.4.12: Text Spacing](https://www.w3.org/WAI/WCAG22/Understanding/text-spacing)
- [Technique C36: Allowing for text spacing override](https://www.w3.org/WAI/WCAG22/Techniques/css/C36.html)

### Procedure

The method asks the learner to document the browser, operating system, viewport, theme, page state, and override mechanism. The learner then:

1. Reviews the page in its initial state and records representative content and controls.
2. Applies all four text-spacing values with a reliable extension, bookmarklet, user stylesheet, developer tools, or the Exercise's assisted control.
3. Confirms through inspection or computed styles that every value took effect.
4. Reviews navigation, headings, paragraphs, cards, notices, labels, buttons, instructions, and other text-bearing components.
5. Checks for clipping, overlap, truncation, hidden content, lost labels, obscured controls, or unavailable functionality.
6. Records flexible content that expands or wraps successfully as passing evidence.
7. Resets and reapplies the override to confirm that each observed change is caused by the test condition.
8. Records the result with the viewport, state, actual behavior, expected behavior, user impact, and remediation direction.

### Interpretation and limitations

The guidance will make clear that:

- A page does not fail merely because its default spacing differs from the test values.
- A failed extension or bookmarklet does not prove that the page prevents overrides; the learner must confirm the values were applied.
- A layout change is not automatically a failure if all content and functionality remain available.
- Wrapping, taller containers, and changed component proportions are often expected passing behavior.
- The method evaluates loss caused by the combined condition rather than diagnosing each spacing property in isolation.

The method does not claim broad low-vision or cognitive-accessibility coverage and does not replace testing with disabled people.

## Exercise scenario

The standalone workspace presents a community support directory with service navigation, an introductory panel, an important notice, service cards, opening information, and contact actions. Its normal state appears complete and usable. An assisted control applies the full text-spacing condition to the same document.

The page contains exactly six intentional findings that become observable after the override is active. It must not label defective targets, expose the answers in comments or diagnostic attributes, or make every component fail.

### Intentional findings

1. **A fixed-height introductory panel clips its final lines.**
   The panel fits its text in the initial state but cannot grow after line, word, letter, and paragraph spacing increase.

2. **A service-card heading overlaps its description.**
   The card positions its heading and description within fixed dimensions, so the expanded heading occupies the description's space.

3. **A service-navigation item truncates its label.**
   The item forces a single line inside a fixed width and hides overflow instead of wrapping or expanding.

4. **An important notice hides part of its paragraph.**
   A line clamp accommodates the initial text but removes content when increased spacing requires more lines.

5. **A contact button clips its complete visible label.**
   Fixed dimensions and hidden overflow prevent the control from growing with its text.

6. **An urgent-support paragraph resists the override.**
   Higher-specificity authored `!important` declarations keep its line height, paragraph spacing, letter spacing, and word spacing unchanged while the override works elsewhere. The finding requires computed-style confirmation rather than visual inspection alone.

### Passing comparisons

The workspace includes flexible service cards, wrapping navigation links, ordinary paragraphs and notices, and buttons that grow with their labels. The assisted override control must remain fully visible, named, operable, and stateful in both conditions.

## Assisted override behavior

The fixture provides one button whose initial accessible name and visible label are `Apply test text spacing`. Activation:

- injects an override stylesheet into the fixture document;
- applies `line-height: 1.5`, `letter-spacing: 0.12em`, and `word-spacing: 0.16em` broadly enough to test text-bearing content;
- applies a `2em` end margin to paragraphs;
- uses sufficient cascade priority to replace authored values;
- sets `aria-pressed="true"`;
- changes the visible label to `Reset text spacing`.

Reset removes the injected stylesheet, restores `aria-pressed="false"`, and restores the original label and layout. Repeated activation must be deterministic and must not duplicate styles.

The control is an Exercise aid, not a claim that every real page should provide its own text-spacing setting. The method also teaches external override mechanisms so the procedure transfers to other sites.

## Exercise guidance

The Exercise objectives and task steps ask learners to:

- Record the browser, operating system, viewport, theme, page state, and override mechanism.
- Review representative content before applying the condition.
- Apply the complete condition and confirm that it is active.
- Inspect all text-bearing content and controls at the same viewport.
- Identify exactly six losses of content or functionality, including an override that does not take effect.
- Record passing comparisons that expand or wrap correctly.
- Reset and reapply the condition to confirm causation.
- Record actual behavior, expected behavior, likely user impact, and remediation direction.

Hints remain progressive:

1. Direct attention to containers that should grow when their text occupies more space.
2. Ask the learner to inspect wrapping, truncation, overlap, line clamping, and complete control labels.
3. Point to the introduction, one service card, one navigation item, the important notice, one contact action, and text that does not visibly change without stating the fixes.

The solution stays closed by default and contains exactly six finding sections. Each section explains the layout cause, user impact, and a flexible remediation direction. It also identifies representative passing behavior. The resistant-override solution must recommend removing or restructuring declarations that block user overrides, not hard-coding the test values as the page defaults.

## Reusable component structure

Follow the existing standalone-first Exercise architecture:

- Add a dedicated `CommunityServicesTextSpacingFixture.astro` containing the practice page, assisted override behavior, and local styles.
- Register the fixture through the shared document-fixture route contract.
- Use the shared Exercise rendering, metadata panel, start-and-return workflow, hints, and solution.
- Preserve saved theme preference and provide an explicit return link.

Do not use an iframe or force a new tab. Keep the override behavior local to the fixture rather than introducing a site-wide text-spacing feature.

## Learning path integration

Add the method and Exercise to `Your first accessibility review` immediately after the visual pair and before zoom and reflow.

Update the path:

- Summary and description distinguish authored visual review from applying text-spacing overrides.
- Topics include text spacing and user overrides.
- Outcomes include checking whether content and functionality survive the complete spacing condition.
- Steps include the method followed immediately by its Exercise.
- Estimated duration increases from 250 to 290 minutes.
- Preserve every existing pair and its authored sequence.

The pair remains self-contained for direct visitors; the path is recommended sequencing, not a prerequisite gate.

## Testing journey integration

Add the method to `Reviewing a course registration before launch` without changing the course-registration fixture or the forms Exercise finding boundary.

Update the journey:

- Add the method after visual accessibility and before zoom and reflow in the ordered method list.
- Extend `Test responsive conditions` to apply and verify the full text-spacing override alongside the existing zoom, text-resize, and reflow checks.
- Include the method in consolidation and evidence guidance.
- Increase estimated duration from 90 to 105 minutes.
- Preserve the existing six-stage structure and five deliverables.

The course-registration page may pass this check. Recording that passing behavior is an intentional part of the journey rather than a requirement to add another defect.

## Verification

Add focused automated coverage for:

- Method and Exercise routes, metadata, collection order, and bidirectional links.
- Exactly six findings, three progressive hints, and six solution sections.
- Complete initial content before activation.
- All four override values applied together with sufficient priority.
- Each approved target becoming clipped, overlapped, truncated, or incomplete only after activation.
- The urgent-support paragraph retaining all four authored spacing values while representative nearby content receives the override.
- Passing comparison regions expanding or wrapping without losing content.
- Reset restoring the initial layout and repeated toggling remaining deterministic.
- Assisted control name, `aria-pressed` state, keyboard activation, visible focus, and complete label in both states.
- Saved light and dark themes, narrow viewport behavior, unique IDs, and no answer leakage.
- Expected axe results before and after activation, limited to issues axe can detect reliably.
- Learning path order, updated outcomes, and 290-minute estimate.
- Course journey method order, responsive-stage integration, six-stage structure, and 105-minute estimate.
- Generated internal links and sitemap coverage.

Run Astro diagnostics, the production build, focused tests, and the complete Playwright suite on the default port `4321` under Node.js 24. Complete a manual visual review at desktop and narrow widths in both themes because automated geometry checks cannot fully establish whether every text-spacing failure is understandable to a learner.

## Out of scope

- Forced-colors and operating-system high-contrast modes.
- Browser zoom, text-only resizing, and reflow procedures already covered elsewhere.
- Font replacement and broad custom-user-stylesheet testing.
- Motion, animation, flashing, or color-preference testing.
- Diagnosing each spacing property separately.
- A comprehensive low-vision or cognitive-accessibility review.
- Changing the course-registration fixture or its forms Exercise findings.
- Adding a new Learning path or Testing journey.
- Treating the deliberately incomplete fixture as a production-ready directory.
