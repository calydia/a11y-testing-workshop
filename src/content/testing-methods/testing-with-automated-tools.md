---
title: Testing with automated tools
summary: Run a reproducible accessibility scan, verify every result in context, and identify what still requires manual testing.
description: Learn a tool-neutral procedure for scoping, running, interpreting, documenting, and rerunning automated accessibility checks.
status: published
order: 9
topics: [automated testing, tooling, triage, reporting, WCAG]
prerequisites:
  - Basic familiarity with browser developer tools
skillLevel: beginner
estimatedMinutes: 20
tools: [Web browser, Automated accessibility checker, Browser developer tools, Keyboard]
platforms: [Desktop]
outcomes:
  - Define and reproduce the page state and checker configuration used for a scan.
  - Verify automated results against rendered elements and classify them accurately.
  - Document confirmed findings with evidence and remediation direction.
  - Explain why a clean automated report is not proof of accessibility conformance.
  - Follow automated checks with appropriate manual testing methods.
relatedExercises: [comparing-automated-and-manual-findings]
interpretation:
  - A reported result may be a confirmed issue, need human review, be false or not applicable in context, or indicate that the checker did not execute correctly.
  - Issue counts and severity labels are triage aids, not accessibility scores or conformance decisions.
  - A clean report means only that the enabled rules found no reportable results in the scanned state.
  - Rerunning the same configuration after a change helps confirm a fix but does not replace regression testing or manual review.
limitations:
  - Rules, wording, severity, standards mappings, and coverage differ between tools and versions.
  - Automated checks cannot reliably judge every aspect of purpose, usability, interaction behavior, visual meaning, or assistive-technology output.
  - Dynamic states, frames, shadow roots, authentication, timeouts, and exclusions can prevent content from being scanned.
  - Valid HTML can prevent some implementation errors, but markup validation and automated accessibility checking do not prove conformance.
---

## What this method tests

This method checks the accessibility properties that an automated ruleset can evaluate in one defined page state. It also checks whether the resulting report can be reproduced, verified, and followed by suitable manual testing.

## What you need

Use a browser, one automated accessibility checker, developer tools, and a keyboard. Know how to identify a reported element in the rendered page and inspect its relevant markup or computed styles.

The procedure does not depend on one checker. Record the product and version when available because rules and results can change.

## Before you start

Define the scope before scanning. Record the route, task, authentication context, viewport, theme, and UI state. Note the enabled standards target, rules, and exclusions, and whether the checker includes frames, dialogs, dynamically revealed content, and shadow roots.

Prepare the exact state you want to assess. Open menus, dialogs, validation messages, or other conditional content when those states belong in the scan.

## How to perform the test

1. Load the defined page and prepare the recorded UI state.
2. Run the checker with a known configuration.
3. Save or copy enough configuration and output for another tester to reproduce the scan.
4. Locate every reported target in the rendered interface.
5. Inspect the target in context and classify the result as a confirmed issue, needs human review, false positive or not applicable, or tooling/execution error.
6. Record the rule or message, affected target, user impact, evidence, applicable requirement when known, and remediation direction.
7. Investigate missing frames, states, or regions if the scan scope is smaller than expected.
8. Resolve confirmed issues and rerun the same scan to check the changes.
9. Continue with relevant manual keyboard, visual, zoom/reflow, content, and screen-reader methods.

## What to observe

Check whether the report covers the state you intended to scan and whether each target actually demonstrates the reported condition. Watch for elements outside the scan scope, results that require contextual judgment, repeated instances of one underlying component problem, and real interaction or content problems absent from the report.

Do not copy issue text into a report without verifying the target. Do not interpret a low issue count, a severity label, or a clean scan as an accessibility score.
