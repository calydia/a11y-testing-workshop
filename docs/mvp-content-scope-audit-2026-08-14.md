# Accessibility Testing Lab MVP content-scope audit

Date: 14 August 2026

## Executive conclusion

Accessibility Testing Lab has enough substantive content for a coherent beginner MVP. Its strongest feature is the learning system rather than any individual page: all ten published Testing methods have a paired Exercise, the two beginner Learning paths together teach all ten methods, and the two Testing journeys together apply all ten methods in realistic scenarios.

No new Testing method is launch-critical. The current foundation supports the stated primary audience: someone learning to perform a first scoped accessibility review.

The site is conditionally content-ready for an MVP after a small pre-launch refinement milestone. The remaining launch-critical work is primarily about helping learners enter, traverse, and correctly interpret the existing material:

1. give beginners a clear starting point from Home;
2. complete the two-way links between methods and their Exercises;
3. connect each Learning path to the journey that applies it, and each journey back to its recommended path;
4. state clearly that this is an introductory practice environment, not comprehensive testing, a conformance assessment, or a substitute for involving disabled people;
5. reconcile stale summaries and unexplained Learning-path duration differences;
6. make page-title and landmark checks explicit within the existing structure-and-links material.

These are refinements to the current content graph and expectations. They do not require a fifth content area, a new schema, or a broad rewrite.

The strongest candidate for the first post-MVP method is **Testing controls with a screen reader**, paired with an Exercise about names, roles, states, values, and instructions for common controls. Data-table testing is the next substantial content gap after that.

## Audit question and audience

This audit asks whether a beginner with basic browser familiarity can:

- discover a coherent starting point;
- learn essential first-review techniques;
- practise each technique independently;
- combine techniques in a realistic review;
- interpret evidence without overstating what it proves;
- identify passing behavior as well as defects;
- understand when the review remains incomplete or needs specialist involvement.

The audit does not ask whether the site teaches every WCAG success criterion or every assistive technology.

## Current published inventory

All current collection entries are published.

| Content area | Count | Level | Authored duration | Current role |
| --- | ---: | --- | ---: | --- |
| Learning paths | 2 | Both beginner | 250 and 220 minutes | Teach the complete current method set in two coherent sequences |
| Testing methods | 10 | All beginner | 195 minutes total | Provide reusable procedures and interpretation boundaries |
| Exercises | 10 | All beginner | 200 minutes total | Pair one-to-one with the ten methods through the two paths |
| Testing journeys | 2 | One beginner, one intermediate | 90 and 75 minutes | Apply the two method groups in realistic review scenarios |

### Learning paths

| Learning path | Duration | Coverage |
| --- | ---: | --- |
| `Your first accessibility review` | 250 minutes | Automated, keyboard, visual, zoom/reflow, limited screen-reader preparation, forms and validation |
| `Practical screen-reader testing` | 220 minutes | Structure and links, image alternatives, icons and SVGs, language changes, modal dialogs |

Together, the paths include every current method and every current Exercise. Their separation is useful: the first path supports a broad baseline review, while the second develops focused screen-reader skills without making the first path prohibitively long.

### Testing methods and paired Exercises

| Testing method | Paired Exercise | Used in journey |
| --- | --- | --- |
| Testing with automated tools | Comparing automated and manual findings | Course registration |
| Testing keyboard accessibility | Keyboard testing a preferences form | Course registration |
| Testing visual accessibility | Finding visual problems in an account dashboard | Course registration |
| Testing zoom and reflow | Testing an appointment booking at high zoom | Course registration |
| Testing forms and validation | Testing a community-course registration form | Course registration |
| Testing page structure and links with a screen reader | Reviewing structure and links in a community resources directory | Conference programme |
| Testing image alternative text | Evaluating image alternative text in context | Conference programme |
| Testing icons and SVGs with a screen reader | Reviewing icons and SVGs in a community events dashboard | Conference programme |
| Testing language changes with a screen reader | Testing language changes on a community library noticeboard | Conference programme |
| Testing modal dialogs | Testing modal dialogs in account settings | Conference programme |

This is strong MVP coverage architecture: every method is taught, practised, and applied. A learner does not encounter an orphan method or an Exercise without a reference procedure.

### Testing journeys

`Reviewing a course registration before launch` is a beginner journey that applies all five foundational methods from the first path. It teaches scope, state selection, evidence, duplicate consolidation, passing checks, prioritization, and a launch recommendation.

`Reviewing a community conference programme` is an intermediate journey that applies all five methods from the screen-reader path. It adds useful platform-awareness around screen-reader output, language voices, graphical content, and modal behavior.

The two scenarios complement rather than duplicate each other. The first emphasizes an end-to-end transaction; the second emphasizes content comprehension and screen-reader interaction.

## Beginner capability matrix

Ratings describe readiness for the defined MVP, not comprehensive accessibility-testing coverage.

| Beginner capability | Current evidence | Assessment | Needed action |
| --- | --- | --- | --- |
| Understand what testing can and cannot establish | Automated method rejects scores and clean-report overclaims; all methods include limitations; journeys require incomplete areas and follow-up work | Strong but distributed | Add one concise site-level expectation statement so direct visitors do not need to infer the overall boundary |
| Define scope, environment, states, and test data | Automated method has explicit scope preparation; forms covers initial, invalid, and successful states; both journeys begin with documented conditions | Strong | Preserve this pattern in future content |
| Run and interpret automated checks | Dedicated method, five-target Exercise, first path, and course journey distinguish confirmed, manual, false/not-applicable, and missed results | Strong | No launch change beyond completing method-to-Exercise navigation |
| Test keyboard operation and focus | Dedicated baseline method and Exercise; forms and modal methods extend focus behavior; course journey applies it | Strong | No new launch content required |
| Review visual presentation, zoom, and reflow | Dedicated visual and zoom/reflow pairs; course journey applies both; methods distinguish measurement from observation | Strong baseline | Keep text spacing, forced colors, motion, and specialized low-vision testing explicit future topics |
| Inspect structure, links, images, and common page content | Structure/link, image, and icon pairs plus conference journey provide meaningful practice | Mostly strong | Make page title and landmark checks explicit as passing checks; common control semantics remain a post-MVP gap |
| Test forms, errors, status communication, and modal interactions | Two detailed method/Exercise pairs; both journeys apply the relevant interaction | Strong | No launch-critical addition |
| Perform a focused screen-reader review | Self-contained path, five method/Exercise pairs, and intermediate journey cover setup, navigation, content, language, and dialogs | Strong within its stated scope | Add common-control and table testing after MVP |
| Record evidence, passing checks, limitations, and recommendations | Individual methods define useful records; both journeys explicitly require evidence, passing checks, consolidation, prioritization, and recommendations | Strong | Consider reusable reporting guidance later, but a separate launch method is unnecessary |
| Recognize when specialist or additional testing is needed | Method limitations are accurate; automation explicitly rejects conformance conclusions; journeys require follow-up areas | Partial | Add site-level guidance about incomplete coverage, specialist methods, and involving disabled people |

## Launch-critical refinements

### 1. Give beginners a direct starting point

**Evidence:** Home explains the four content types and links only to their landing pages. It does not recommend `Your first accessibility review` or distinguish a beginner start from reference browsing.

**Impact:** A visitor in the primary audience must understand the information architecture before choosing their first page. The product already has a designed beginner entry point but does not surface it at the highest-traffic decision point.

**Recommendation:** Add a visible primary invitation to start `Your first accessibility review`, while retaining links to all four sections for visitors arriving with a specific goal. The Learning paths landing page should also identify which of its two paths is the broad beginner starting point and which is the focused screen-reader path.

### 2. Complete bidirectional method–Exercise navigation

**Evidence:** Every Exercise body links to its method. Only four of ten methods contain `relatedExercises` metadata and a visible `Practise this method` link: page structure and links, icons and SVGs, language changes, and modal dialogs. Keyboard, visual, zoom/reflow, automated, image-alternative, and forms methods do not link back to their paired Exercises.

**Impact:** Learners following a path see every pair, but visitors landing directly on six reusable method pages cannot discover the intended practice without returning to a section listing or Learning path.

**Recommendation:** Populate `relatedExercises` for all ten methods and render related Exercises consistently through one shared method-page component. Replace or absorb the four manually authored practice sections so the metadata and visible relationship cannot drift apart.

This is an architecture-supported content refinement, not a request for six new Exercises.

### 3. Correct path–journey transitions

**Evidence:**

- The first path explains what a Testing journey is but does not link to its matching course-registration journey.
- The course-registration journey names familiarity with the first path as a prerequisite but does not reference it through `learningPaths`, so it is absent from Optional preparation.
- The screen-reader path links learners to the course-registration journey even though that journey does not apply its specialized screen-reader methods.
- The conference journey correctly references the screen-reader path, but the path does not link back to that matching journey.

**Impact:** The distinction “Learning paths teach skills; Testing journeys apply skills” is implemented in content but not consistently discoverable at the transition where learners need it.

**Recommendation:**

- Link `Your first accessibility review` to `Reviewing a course registration before launch`.
- Add the first path to that journey's `learningPaths` preparation references.
- Link `Practical screen-reader testing` to `Reviewing a community conference programme` rather than presenting the course-registration journey as its main application.
- Retain cross-links between the two Learning paths as optional progression.

### 4. Set an honest site-level scope boundary

**Evidence:** Individual methods contain accurate limitations, and automated testing explicitly says it does not prove conformance. Home and About describe a broad hands-on accessibility-testing environment but do not state the scope of the current curriculum or explain the role of disabled people in evaluating real experiences.

**Impact:** A beginner can complete a well-designed sequence yet infer that the sequence constitutes a complete audit. The current material teaches many boundaries locally but lacks one discoverable overall statement.

**Recommendation:** Expand About, and optionally the first path conclusion, to state that:

- the Lab teaches selected practical testing techniques rather than exhaustive coverage;
- completing a path or journey is not a conformance assessment;
- automated and manual technical checks do not replace usability evaluation or involving disabled people;
- real reviews must define excluded areas and arrange specialist or user testing when the product and risk require it;
- deliberately inaccessible Exercise and journey workspaces are isolated practice material.

This should be concise expectation-setting, not a new Testing method.

### 5. Reconcile summaries and duration expectations

**Evidence:** The `Practical screen-reader testing` summary still says it provides Exercises for “structure, links, and image alternatives,” although it now pairs Exercises with all five methods. Its overall estimate is 220 minutes, while the visible referenced methods and Exercises total 205 minutes; the remaining 15 minutes plausibly represents setup but is not displayed on the checkpoint. The first path is estimated at 250 minutes, while its visible referenced items total 190 minutes; the remaining 60 minutes is not attributed, despite the screen-reader checkpoint being described as short.

**Impact:** Stale copy understates the path, and unexplained totals make planning a multi-session path harder.

**Recommendation:** Update the screen-reader path summary to reflect all paired practice. Decide and document whether Learning-path totals include checkpoint practice, note-taking, and repetition. Either add estimated time to content checkpoints or revise totals so the displayed item times and overall estimate have an understandable relationship.

Do not mechanically sum times without deciding what “estimated time” is intended to represent.

### 6. Make foundational document checks explicit

**Evidence:** The structure-and-links method begins by reading the page title and main heading, and its fixture uses a page title and `main` element. It does not explicitly ask the learner to judge whether the document title is useful or whether primary content and landmarks are discoverable. These are therefore implicit passing behavior rather than taught checks.

**Impact:** Page titles and primary structure are common first-review checks. Their omission is more noticeable because the method already owns adjacent page-structure work.

**Recommendation:** Extend the existing structure-and-links method and Exercise instructions to assess the page title, main content, and a restrained baseline of landmark use. Use passing comparisons in the existing fixture where possible; do not increase the finding count merely to manufacture defects. Rename the method only if the expanded scope makes the current title misleading, which is unlikely.

## Valuable soon after launch

### Testing controls with a screen reader

This is the highest-value new method candidate. The current keyboard method explicitly says operability does not prove correct roles, names, states, or screen-reader output. Forms, icons, and dialogs cover those concepts only in specific contexts.

A focused beginner method and Exercise could cover:

- buttons versus links;
- accessible names and visible labels;
- role, state, value, and changes after activation;
- checkboxes, radio buttons, switches, disclosure controls, and simple custom controls;
- instructions and keyboard interaction appropriate to the control;
- the boundary between a basic review and specialist testing of complex widgets.

If created, place it in `Practical screen-reader testing` and review whether the conference journey can apply it naturally. Do not turn one Exercise into a gallery of every ARIA widget.

### Testing data tables with a screen reader

Tables are common enough to justify a reusable method after the MVP. The method should distinguish simple data tables from layout tables and more complex grids, with an Exercise focused on headers, captions, scope, reading order, and meaningful interpretation. A later journey should apply it only when the scenario genuinely contains tabular data.

### Text spacing and user overrides

The visual method correctly says user-defined text-spacing checks need an additional procedure, while the current Exercise tests cramped authored spacing rather than applying user overrides. Decide whether to extend the visual method and Exercise or create a small dedicated method. Treat forced-colors and operating-system high-contrast modes as related but separate scope decisions.

### A second broad beginner journey

The course-registration journey already provides the necessary first realistic application. A second broad journey would improve repeat practice after launch, particularly for a content-rich service page or account workflow that combines structure, controls, images, and forms. It should follow new method development rather than duplicate the existing course-registration sequence immediately.

### Exercise-depth review

Several Exercises were deliberately scoped narrowly. That is appropriate for the MVP. When an Exercise gains cases later, record which Testing methods and journeys depend on it, then decide whether their stages, expected duration, optional-preparation warning, and tests also need revision. Do not automatically expand every downstream page whenever a fixture changes.

## Later expansion

The following topics are meaningful but not required for the defined beginner MVP:

- mobile touch operation, orientation, target sizing, and gesture alternatives;
- switch control, voice control, and other alternative input methods;
- captions, transcripts, audio description, media-player controls, and autoplay;
- motion, animation, flashing, time limits, and interruption controls;
- forced colors, operating-system contrast settings, magnification, and broader low-vision configurations;
- complex images, charts, maps, diagrams, and canvas content;
- complex custom widgets, rich application grids, drag-and-drop, and nested composite controls;
- multi-step transactions, authentication, payments, CAPTCHAs, file uploads, network failures, and session timeouts;
- cognitive accessibility, plain-language review, consistency, memory burden, and personalization;
- more advanced testing strategy, sampling, regression planning, and organizational reporting.

These topics should not be presented as unimportant. They are deferred because they require distinct methods, specialist judgment, more complex fixtures, or a broader audience promise.

## Intentionally out of scope for this audit

- exhaustive WCAG-success-criterion mapping;
- a conformance claim for the Lab or its curriculum;
- production SEO, analytics, deployment, or launch communications;
- migration or deletion of retained workshop routes;
- detailed design of every future method and Exercise;
- equal page counts across the four content areas.

The final retained-content cleanup remains a separate pre-launch milestone. It should inventory, redirect, archive, or remove legacy routes only after the MVP public-content decisions are stable.

## Recommended remaining pre-launch sequence

1. **Repair the learning graph.** Add the missing method-to-Exercise relationships and correct both path-to-journey transitions.
2. **Clarify entry and scope.** Give Home a direct beginner start and expand About with the overall testing boundary and role of disabled people.
3. **Resolve small content drift.** Update the screen-reader path summary, reconcile path-duration assumptions, and make page-title and landmark checks explicit.
4. **Perform a concise editorial consistency pass.** Check terms such as Testing method, Exercise, Learning path, journey, finding, passing check, and recommendation across the four areas without rewriting stable content.
5. **Define and execute the separate legacy cleanup milestone.** Decide retain, redirect, archive, or remove for each old route and unused asset; verify links, sitemap behavior, 404s, and production output.
6. **Run the final launch-readiness review.** Recheck the four section inventories, all relationship links, accessibility tests, responsive presentation, and production build against the chosen MVP boundary.

New method development can begin after launch or in parallel only if it does not delay the focused pre-launch work above. `Testing controls with a screen reader` should be the first candidate when content expansion resumes.

## Evidence and limitations

This audit used the current collection entries, Home and About copy, collection schemas, relationship rendering, focused tests, and approved design specifications. Counts and mappings reflect the repository on 14 August 2026.

The audit evaluates curriculum structure and authored guidance. It does not measure learner completion, comprehension, search behavior, or real-world outcomes because no learner research, analytics, or usability-study evidence was in scope. Recommendations about discoverability are therefore expert judgments grounded in the current link graph, not observed user behavior.

The conclusion also assumes that the current exercises and journeys continue to work as verified in their existing automated and visual checks. This audit did not modify or rerun application code.
