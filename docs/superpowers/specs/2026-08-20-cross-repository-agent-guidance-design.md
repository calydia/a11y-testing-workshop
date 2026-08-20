# Cross-repository agent guidance design

## Purpose

The A11ying with Sanna ecosystem consists of four public sites and one shared UI package. Each repository needs enough local context that future development can preserve the purpose of the current site, choose the correct ownership boundary, and verify cross-repository changes without relying on conversation history.

The documentation must reflect that A11ying, WCAG, and Accessibility Testing Lab form the closest content family, while the Sanna personal site and blog remain closely related through the same brand foundations.

## Documentation model

Maintain a root `AGENTS.md` in all five repositories. Use a consistent section structure and ecosystem vocabulary, but give each file repository-specific operational detail rather than copying one universal document.

The repositories are:

- `a11ying-ui`: shared framework-neutral brand foundations plus React components and complete global styles.
- `a11ying-front`: broad bilingual accessibility education and reference site.
- `wcag-front`: focused bilingual WCAG guide.
- `a11y-testing-astro`: English hands-on accessibility testing learning and practice environment.
- `sanna`: bilingual personal and professional site with an English editorial blog.

## Shared ecosystem explanation

Every file should identify all five repositories and explain these relationships:

- A11ying, WCAG, and Accessibility Testing Lab are complementary accessibility sites. A11ying provides broad knowledge, WCAG provides criterion-focused guidance, and Testing Lab provides practical testing instruction and exercises.
- Sanna provides the personal, professional, speaking, projects, and blog context around the same A11ying with Sanna brand.
- The sites may link to and recommend one another, but each retains its own information architecture, content responsibility, and release lifecycle.
- A shared visual language does not require shared page composition or components.

## `a11ying-ui` consumption modes

Document two supported package boundaries.

### Full React and style consumers

`a11ying-front` and `wcag-front` consume shared React components and the complete global stylesheet. Reusable React behavior, shared component APIs, broad element styles, and brand tokens may belong in `a11ying-ui` when they form a stable contract for both sites.

### Tokens-only Astro consumers

`a11y-testing-astro` and `sanna` import `a11ying-ui/tokens`. They keep their Astro components, layouts, navigation, theme behavior, content presentation, and site-specific styles local. They must not add React merely to reuse a small shared component.

The supported tokens-only contract consists of brand colors, font-family names, the class-based dark variant, and stable brand custom properties. Compatibility utility aliases may exist in the export but are not automatically cross-site design requirements.

## Ownership decision rule

The files should give future contributors a consistent decision sequence:

1. Is the change content, routing, metadata, data fetching, page composition, or site-specific behavior? Keep it in the site repository.
2. Is it a stable brand primitive needed by several sites? Put the framework-neutral value in `a11ying-ui` tokens.
3. Is it reusable React component behavior required by both A11ying and WCAG? Consider placing it in `a11ying-ui` with Storybook and consumer coverage.
4. Is the similarity only visual, or does only one site need it? Keep the component local and use shared tokens where appropriate.

## Commit and push authority

Agents may commit and push changes only in the `a11ying-ui` repository. This exception supports the package's tag-based release workflow when an approved cross-repository change requires a new consumable version.

Changes in `a11ying-front`, `wcag-front`, `a11y-testing-astro`, and `sanna` must remain uncommitted for human review. An agent may implement and verify changes in those repositories, but must not commit or push them. This restriction applies even when a cross-repository task has already been approved and even when the package-side change has been committed and released.

Every `AGENTS.md` must state the rule from its repository's perspective. Cross-repository workflow instructions must separate the package release step from the human-reviewed consumer commit step.

## Repository-specific content

Each `AGENTS.md` should include:

- Project purpose, public URL, audience, languages, and content scope.
- A complete related-repository table.
- The repository's precise `a11ying-ui` consumption mode.
- Information-architecture and content boundaries.
- Repository map and important sources of truth.
- Accessibility, localization, theme, routing, and generated-output rules.
- Relevant development, build, and test commands.
- Cross-repository release and verification expectations.
- The repository-specific commit and push authority rule.

Existing accurate operational guidance should be retained and integrated. Obsolete statements that describe only A11ying and WCAG as supported consumers must be updated.

## Site boundaries

### A11ying

Teach broad accessibility foundations, inclusive design and development, content accessibility, testing concepts, assistive technology, standards, and laws. It is not the detailed WCAG criterion reference and should not duplicate hands-on exercises from Testing Lab.

### WCAG

Explain WCAG structure, principles, guidelines, success criteria, terminology, and related European requirements. Preserve criterion hierarchy and bilingual route relationships. Broader educational context belongs in A11ying; practical skill sequences and exercises belong in Testing Lab.

### Accessibility Testing Lab

Teach accessibility testing through learning paths, reusable testing methods, exercises with deliberate problems, and realistic testing journeys. Its primary routes are `/learn/`, `/methods/`, `/exercises/`, and `/journeys/`. Exercise fixtures and journey workspaces may contain intentional failures and require different expectations from the accessible instructional shell.

### Sanna

Present Sanna's personal and professional identity, speaking, projects, and bilingual top-level pages. Host the English editorial blog under `/blog/`, with a Finnish introduction rather than a translated archive. It may connect readers to the accessibility sites but should not become another accessibility reference hierarchy.

### Shared UI package

Own the stable brand foundation and reusable React contracts, not site routing, CMS integration, content taxonomy, or Astro page structure. Public package changes require build and package verification, an appropriate Git tag, dependency updates in affected consumers, and consumer-level testing.

## Verification

After updating the files:

- Confirm every repository has one root `AGENTS.md`.
- Confirm every ecosystem table lists all five repositories with accurate roles.
- Confirm the full-consumer versus tokens-only distinction is explicit in every relevant file.
- Confirm commands and runtime requirements match each current `package.json` and test configuration.
- Confirm no instruction tells Testing Lab or Sanna to adopt React components by default.
- Confirm only `a11ying-ui` permits agent commits and pushes, while all four site repositories require human review before commit.
- Review the files for contradictory ownership or release instructions.
