---
title: Comparing automated and manual findings
summary: Scan an event-registration page, verify the reported results, and use a short manual review to find what automation misses.
description: Practise running, interpreting, and supplementing an automated accessibility check with a deliberately mixed event-registration fixture.
status: published
order: 40
topics: [automated testing, manual testing, triage, reporting]
prerequisites:
  - Understand the Testing with automated tools method
difficulty: beginner
estimatedMinutes: 20
exerciseType: find-issues
fixture: automated-event-registration
objectives:
  - Run a reproducible automated check against a defined page state.
  - Verify and classify each reported target instead of copying tool output directly.
  - Perform a short keyboard and content review after the automated scan.
  - Compare detected and missed issues and document evidence for both.
methods: [testing-with-automated-tools]
hints:
  - Inspect each reported target in the rendered page and confirm the issue in context before recording it.
  - Complete the session-selection and registration task using only a keyboard after the scan.
  - Compare controls and repeated links that look similar and ask whether their purpose is distinguishable without visual context.
expectedFindings: 5
solution:
  summary: The fixture contains three findings expected from common automated rules and two that require human review.
  findings:
    - title: Automated — the email field has no accessible label
      explanation: A visible Email address prompt appears before the input, but it is a paragraph rather than a programmatically associated label. A checker should report the unnamed form field. Confirm the target in context, then associate a visible label with the input using matching for and id values or another appropriate naming method.
      method: testing-with-automated-tools
    - title: Automated — the remove button has no accessible name
      explanation: The saved-session button contains only a symbol hidden from the accessibility tree, leaving the button unnamed. A checker should identify the button-name failure. Give the button a concise name that includes the action and, when needed, the affected session.
      method: testing-with-automated-tools
    - title: Automated — the registration helper has insufficient contrast
      explanation: The helper text has approximately 2 to 1 contrast against its background in both themes. A checker should report the affected text and measured pair. Use a foreground color that meets the applicable text-contrast requirement in every supported theme.
      method: testing-with-automated-tools
    - title: Manual — session selection is pointer-only
      explanation: Choose this session responds to a pointer click and changes state, but it is not a native control, cannot receive keyboard focus, and has no keyboard activation. An automated scan does not establish that the intended interaction works. Use a native button or implement equivalent semantics, focusability, state, and keyboard operation.
      method: testing-with-automated-tools
    - title: Manual — Read more links do not distinguish their destinations
      explanation: Both links expose the same Read more name while leading to different session details, and the allowed surrounding context does not make the destination clear. Tool output varies for contextual link-purpose judgments. Use link text that identifies the relevant session or provide an equally clear accessible name consistent with the visible purpose.
      method: testing-with-automated-tools
---

Use the [Testing with automated tools](/methods/testing-with-automated-tools/) method to review the event-registration page. Start the exercise from the Exercise workspace.

1. Record the checker, route, viewport, theme, configuration, and initial UI state.
2. Run an automated accessibility check and preserve its results.
3. Locate every reported target in the rendered page and classify it as confirmed, needs review, false or not applicable, or a tooling error.
4. For confirmed findings, record the rule or message, target, evidence, user impact, and remediation direction.
5. Complete session selection and registration using only a keyboard, then review the purpose of repeated links.
6. Find five accessibility problems in total and compare which were reported automatically with which required human review.

Exact tool wording and severity can differ. Return to this page whenever you need a hint or are ready to review the solution, and avoid opening the Solution until you have compared the automated and manual results.
