---
title: Testing forced colors and high contrast
summary: Check whether information, controls, states, and focus remain perceivable when a browser applies forced colors.
description: Learn a repeatable beginner procedure for testing pages with forced colors and compatible operating-system contrast themes.
status: published
order: 9
topics: [visual design, forced colors, high contrast, user preferences, focus, controls]
prerequisites:
  - Basic familiarity with browser settings and developer tools
skillLevel: beginner
estimatedMinutes: 20
tools: [Compatible browser and operating-system contrast setting, Keyboard, Browser developer tools]
platforms: [Desktop]
outcomes:
  - Distinguish CSS forced colors from authored themes and other contrast preferences.
  - Compare information and operation before and after forced colors are active.
  - Test essential graphics, control boundaries, states, focus, and color-dependent diagrams.
  - Inspect system-color behavior and identify risky uses of backgrounds, shadows, and forced-color-adjust.
  - Record reproducible findings, passing checks, environment limits, and remediation direction.
relatedExercises: [testing-forced-colors-in-a-journey-planner]
interpretation:
  - Replaced brand colors and changed decorative styling are expected when meaning and operation remain available.
  - A real compatible environment provides stronger evidence than a visual simulation.
  - A result in one contrast theme, browser, and operating-system combination does not prove identical behavior elsewhere.
limitations:
  - The paired simulation is a learning aid, not a complete reproduction of Windows contrast themes or browser behavior.
  - This method does not cover prefers-contrast comprehensively, magnification, text spacing, zoom and reflow, or reduced motion.
  - This focused technical check does not replace testing with disabled people or establish overall conformance.
---

## What this method tests

Forced-colors mode lets the browser replace many authored colors with a limited set of user-chosen system colors. On Windows, compatible browsers can activate CSS forced colors when a contrast theme is in use. This is different from the Lab's dark theme, an authored high-contrast theme, and contrast preferences that do not make `forced-colors: active` match.

The test asks whether information and operation survive those substitutions. It does not ask whether the page keeps its branding or looks identical.

## What you need

Prefer a browser and operating-system combination that supports forced colors, plus a keyboard and browser developer tools. Record the operating system, browser and versions, contrast theme or setting, Lab theme, viewport, and page state.

If you cannot activate a real forced-colors environment, the paired Exercise includes a stable assisted simulation. Use it to practise the procedure, but record that limitation. A simulation cannot reproduce every system color, browser adjustment, platform behavior, or personal configuration.

## How to perform the test

1. Review the page before changing the environment. Record representative text, controls, selected states, essential icons, focus indicators, fields, and diagrams.
2. Enable an operating-system contrast theme that activates forced colors in your browser. Confirm `forced-colors: active` with developer tools when possible. If that environment is unavailable, activate the Exercise simulation and record that you used it.
3. Check whether text and essential graphics remain perceivable. Do not report decorative images merely because they disappear.
4. Inspect controls for visible boundaries, names, roles, states, values, and instructions. Operate relevant controls with a keyboard and recheck changed states.
5. Move keyboard focus through the page and confirm that the focused element remains visibly identifiable.
6. Check selected, expanded, checked, current, invalid, and disabled states wherever they occur.
7. Inspect diagrams, maps, status indicators, and other information that originally used color. Confirm that labels, patterns, shapes, or another durable cue preserve each distinction.
8. Use developer tools to inspect suspicious CSS, including background images, box shadows, transparent borders, system colors, and `forced-color-adjust`.
9. Restore the original condition, confirm each suspected loss disappears, and repeat the changed condition to establish causation.
10. Record the element, environment, state, actual and expected behavior, user impact, passing comparisons, limitations, and remediation direction.

## What to observe

Browsers commonly substitute text, background, border, and control colors. They may suppress background images and box shadows. Those changes are often helpful and are not findings by themselves. Look for a boundary, focus indicator, state, icon, or data distinction that becomes unavailable.

Native controls often adapt well. Custom controls may need explicit borders or outlines using system colors such as `CanvasText`, `ButtonText`, or `Highlight`. A transparent border can reserve space for a border that becomes visible in forced colors, but verify the actual result rather than assuming one technique always works.

CSS background images should not carry unique essential meaning. Inline graphics can use `currentColor` and adjacent text where appropriate. Diagrams need labels, patterns, or shapes in addition to authored colors.

Allow the browser to apply the user's colors in most cases. Use `forced-color-adjust: none` only when retaining particular colors is necessary to preserve meaning and you have verified that the result remains perceivable. It is not a general technique for protecting brand colors from user preferences.

An accessibility tree or screen reader can help confirm a control's role and state. It cannot tell you whether a visible boundary, color distinction, or focus indicator can be perceived, so keep those observations separate.
