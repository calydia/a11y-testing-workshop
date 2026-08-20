# AGENTS.md

## Project

`a11y-testing-astro` is the Astro site for **Accessibility Testing Lab** at
`https://testing.a11y.ing/`. It is an English hands-on environment for learning
and practising accessibility testing.

Its four primary content areas are:

- Learning paths (`/learn/`): self-contained sequences that teach skills progressively.
- Testing methods (`/methods/`): reusable instructions for specific testing techniques.
- Exercises (`/exercises/`): deliberately created examples visitors investigate.
- Testing journeys (`/journeys/`): realistic scenarios that combine techniques.

Learning paths teach skills; testing journeys apply them. The accessible site
shell explains each task, while exercise fixtures and journey workspaces may
intentionally contain accessibility failures. Do not “fix” a deliberate defect
without checking the exercise's learning objective and solution.

The project is a static Astro site, uses Node.js 24, has no CMS or React
runtime, and treats accessible interaction, light/dark themes, responsive
layouts, and keyboard and screen-reader usability as release requirements.

## Related Repositories

Sibling repositories normally live under the same `projects` directory:

| Repository | Role |
| --- | --- |
| `../a11y-testing-astro` | This hands-on accessibility testing site. |
| `../a11ying-front` | Broad bilingual accessibility education and reference site. |
| `../wcag-front` | Focused bilingual WCAG guide. |
| `../sanna` | Bilingual personal/professional site and English blog for Sanna. |
| `../a11ying-ui` | Shared brand tokens for all sites and React design system for A11ying and WCAG. |

A11ying, WCAG, and Testing Lab form the closest content family: A11ying teaches
broad knowledge, WCAG explains the standard and criteria, and Testing Lab
provides practical instruction and practice. Sanna supplies the closely related
personal, professional, speaking, projects, and editorial-blog context.

This repository consumes only `a11ying-ui/tokens` from a tagged GitHub version.
Keep Astro layouts, components, navigation, theme behavior, and learning UI
local. Do not import `a11ying-ui/styles` or add React merely to reuse a small
component. Share a stable brand primitive through the token package; visual
similarity alone is not enough to share component implementation.

## Commit and Push Authority

Agents may implement and verify changes in this repository, but must not commit
or push them. Leave all changes uncommitted for human review. Only the sibling
`a11ying-ui` repository permits agent commits and pushes as part of its approved
tagged-package release workflow.

## Information Architecture and Content Rules

- Keep primary navigation limited to Learning paths, Testing methods,
  Exercises, and Testing journeys. About this Lab belongs in the footer.
- Use content collections and existing layouts for new paths, methods,
  exercises, and journeys; preserve their schema relationships and ordering.
- Methods should be reusable references. Exercises should ask visitors to
  investigate rather than reveal the solution immediately. Journeys should
  combine techniques in a credible workflow.
- Related-content navigation should help visitors discover relevant skills
  without implying that every item must be completed in strict order.
- Keep exercise fixtures self-contained and clearly separated from the
  instructional shell. External or standalone practice views must provide a
  clear way to return to the exercise for hints or the solution.
- Preserve honest level and knowledge-needed metadata. Do not label all content
  as beginner material when it requires intermediate testing judgment.
- Legacy workshop content must not re-establish the old workshop information
  architecture. Reuse only content that has been deliberately renewed into the
  current structure; preserve configured redirects for removed public URLs.

## Repository Map

- `src/content/`: content collections for learning paths, methods, exercises,
  and journeys.
- `src/pages/`: route entry points, exercise fixtures, journey workspaces, and
  legacy redirect-compatible pages.
- `src/layouts/`: document, content, method, exercise, learning-path, and
  journey layouts.
- `src/components/`: Astro site shell, section navigation, cards, metadata, and
  exercise/journey presentation.
- `src/config/`: navigation, taxonomy, related-content, and legacy redirect data.
- `src/styles/` and layout-global styles: local site presentation consuming
  shared package tokens.
- `tests/`: Playwright shell, content, fixture, accessibility, and interaction coverage.
- `netlify.toml`: deployment, redirects, headers, Node version, and publish settings.
- `docs/superpowers/specs/`: reviewed architecture and implementation records.

## Working Rules

- Preserve semantic HTML, landmark structure, accessible names, logical focus
  order, visible focus, native control behavior, and screen-reader clarity.
- Keep the instructional shell accessible. Intentional failures belong only in
  clearly scoped practice content and must match the documented task and solution.
- Check light and dark themes and desktop, intermediate, and mobile widths for
  visual changes. Avoid horizontal edge collisions and nested scrolling where possible.
- Prefer native HTML behavior before ARIA or custom scripting, especially for
  dialogs, disclosures, forms, error messages, and status updates.
- Keep deliberate examples deterministic: no submission, storage, or retention
  should occur unless a future exercise explicitly and transparently requires it.
- Preserve trailing-slash routes, canonical metadata, sitemap behavior, custom
  404 handling, and Astro/Netlify redirect agreement.
- Treat `dist/`, `.astro/`, `test-results/`, and `playwright-report/` as generated output.
- Do not update visual baselines or exercise solutions without reviewing the
  rendered behavior and confirming the change is intentional.

## Commands

Run commands from this repository root with Node.js 24:

```bash
npm install
npm run dev
npm run build
npm run preview
npm run astro -- check
npm test
```

Playwright uses port 4321 and normally starts the required preview server. Do
not leave another development or preview server on that port while running the
suite. Use the smallest relevant test while iterating, then run the complete
suite for site-shell, shared-token, navigation, or broadly visual changes.

## Cross-Repository Changes

For an `a11ying-ui` token change:

1. Implement and verify the stable token contract in `a11ying-ui`.
2. Build, commit, tag, and push the package release there when approved.
3. Update the dependency and lockfile in every affected site.
4. Verify this site's build and relevant browser, accessibility, and theme behavior.
5. Leave all Testing Lab changes uncommitted for human review.

