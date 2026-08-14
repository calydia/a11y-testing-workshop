# MVP content-scope audit design

## Goal

Assess whether Accessibility Testing Lab has a coherent minimum viable content offering for people learning to perform their first practical accessibility review.

The audit evaluates the current Learning paths, Testing methods, Exercises, and Testing journeys as one connected learning system. It may recommend missing content, including a new Testing method when a serious beginner-level capability is absent, but it does not treat comprehensive WCAG coverage as an MVP requirement.

The audit produces recommendations only. It does not create, migrate, or rewrite public content.

## Primary audience and readiness question

The launch-critical audience is a beginner who has basic web-browser familiarity and wants to learn how to conduct a scoped, practical accessibility review.

The central readiness question is:

> Can that learner discover a coherent starting point, learn the essential techniques, practise them independently, combine them in a realistic review, interpret the evidence responsibly, and understand when specialist testing is still needed?

Intermediate topic-specific practice is valuable but not required for the MVP. The existing intermediate screen-reader journey is treated as evidence of a viable post-beginner progression rather than the minimum launch baseline.

## Audit approach

Use a learner-outcome audit rather than a page-count or WCAG-criterion inventory.

Start with the capabilities required for a first practical review, then map the current content to those capabilities. Significant standards and information-architecture concerns may be recorded, but they are classified according to their impact on the beginner workflow.

This approach avoids equating educational completeness with exhaustive conformance coverage. It also prevents superficially balanced section page counts from hiding missing learner skills.

## Beginner workflow

Evaluate the current content against this end-to-end workflow:

1. Understand what accessibility testing can and cannot establish.
2. Define scope, environment, interface states, and test data.
3. Run and interpret automated checks.
4. Test keyboard operation and focus.
5. Review visual presentation, zoom, and reflow.
6. Inspect structure, links, images, and common controls.
7. Test forms, errors, status communication, and modal interactions.
8. Perform a focused screen-reader review.
9. Record evidence, passing checks, limitations, and recommendations.
10. Recognize when additional specialist testing is required.

This workflow is an audit framework, not a required new public navigation structure.

## Capability matrix

For each workflow capability, identify:

- the Learning path that introduces or sequences it;
- the reusable Testing method that explains it;
- the Exercise that provides independent practice;
- any Testing journey that applies it in a multi-method scenario;
- relevant setup, interpretation, limitation, or reporting guidance;
- cross-links that help a visitor discover the next appropriate step;
- gaps, overlaps, or unnecessary duplication;
- an MVP classification.

The matrix must distinguish a genuinely missing capability from one that is adequately covered inside another page. A capability does not require a dedicated page merely to create one-to-one symmetry.

## Evaluation criteria

Evaluate each capability using five questions:

1. Is the technique explained accurately enough for a beginner?
2. Can the learner practise it independently?
3. Does the content explain how to interpret results without overstating what the test establishes?
4. Is the technique applied in a realistic multi-method journey where that application materially supports learning?
5. Can a visitor discover the relevant prerequisite, practice, and next step through the current paths and internal links?

Record evidence from the actual content metadata and body text. Where rendered relationships or duration calculations matter, verify them against the relevant components or tests.

## Recommendation classifications

Classify every identified gap or opportunity as one of:

### Launch-critical

Without this change, the primary beginner cannot complete or correctly interpret the promised first-review workflow. A launch-critical gap may justify a new method or other content page when refinement or linking cannot solve it.

### Valuable soon after launch

The addition would materially improve breadth, progression, or repeat practice, but the beginner MVP remains coherent without it.

### Later expansion

The topic supports intermediate, specialist, platform-specific, or more comprehensive coverage beyond the initial product promise.

### Intentionally out of scope

The topic is outside the defined MVP audience or requires a separate product decision. The audit should state why deferral is reasonable rather than silently omitting it.

## New-content threshold

Recommend a new public page only when all of the following are true:

- the learner outcome is materially absent or too fragmented to use;
- the outcome belongs within the beginner first-review promise;
- refining an existing page or adding internal links would not address it clearly;
- the proposed content has a distinct, reusable purpose within one of the four primary areas;
- its practice or application role is clear enough to avoid an isolated reference page.

The audit may recommend more than one missing item, but it should identify at most one new Testing method as launch-critical unless the evidence shows that the current beginner promise is fundamentally incomplete.

## Deliverable

Write the completed audit to:

`docs/mvp-content-scope-audit-2026-08-14.md`

The document contains:

1. an executive MVP-readiness conclusion;
2. a concise inventory of the current four content areas;
3. the capability matrix;
4. launch-critical missing content;
5. valuable additions for shortly after launch;
6. intentionally deferred specialist topics;
7. navigation, sequencing, and cross-linking concerns;
8. content that needs refinement rather than a new page;
9. a recommended sequence for the remaining pre-launch content work;
10. explicit assumptions and evidence limitations.

Lead with conclusions and make each recommendation actionable. Separate observed evidence from evaluative judgment. Do not turn the document into an implementation plan for every recommendation.

## Evidence sources

Include:

- all published entries in `src/content/learning-paths/`;
- all published entries in `src/content/testing-methods/`;
- all published entries in `src/content/exercises/`;
- all published entries in `src/content/testing-journeys/`;
- Home and About copy where they define the site's learner promise;
- collection schemas and rendering helpers where they affect relationships or discoverability;
- focused tests that pin content order, links, durations, and section behavior;
- approved design specifications where they document deliberate scope boundaries not visible in public copy.

Legacy workshop routes may be consulted only when necessary to understand an explicit deferral. They are not candidates for opportunistic migration during this audit.

## Validation and self-review

Before presenting the completed audit:

1. verify every inventory count and route against the current collections;
2. check that each matrix mapping names existing content accurately;
3. ensure each recommendation has an evidence-based classification;
4. scan for recommendations that duplicate existing content under a different title;
5. confirm that launch-critical items directly serve the primary audience;
6. distinguish public-content gaps from final legacy-cleanup work;
7. scan for placeholders, contradictory conclusions, and ambiguous ownership;
8. run `git diff --check` for the audit document.

No application build or browser test run is required because the audit does not modify public content or application code.

## Out of scope

- exhaustive mapping to every WCAG success criterion;
- creating a conformance claim or certifying the site or its educational coverage;
- editing, deleting, redirecting, or migrating retained legacy content;
- performing the final pre-launch legacy cleanup;
- creating or rewriting public content;
- adding routes, schemas, components, fixtures, or tests;
- production hosting, deployment, monitoring, analytics, SEO, or launch communications;
- determining detailed scope for every recommended future page;
- requiring every Testing method in every Learning path or Testing journey;
- treating equal page counts across the four primary areas as evidence of readiness.
