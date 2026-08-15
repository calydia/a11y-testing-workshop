# Release-readiness design

## Goal

Prepare Accessibility Testing Lab for a reproducible Netlify release without activating the production domain yet. Finish the repository-owned hosting configuration, error handling, accessibility statement, metadata cleanup, and deployment documentation so that the later domain change is limited to external configuration and production verification.

## Scope

This milestone includes:

- Netlify build and publish configuration.
- Node.js 24 runtime pinning.
- Netlify-level permanent redirects for every legacy URL already represented in Astro.
- Conservative response security headers.
- A branded not-found page.
- A site accessibility statement and footer link.
- Favicon and web app manifest cleanup.
- Deployment and release documentation.
- Automated and manual verification appropriate to these changes.

The production domain remains `https://testing.a11y.ing/` in Astro metadata because that is the intended public address. The site must not be treated as launched until that domain is connected and the production-only checks are complete.

## Hosting configuration

Add a root-level `netlify.toml` as the repository-owned source of truth for Netlify:

- Build command: `npm run build`.
- Publish directory: `dist`.
- Node runtime: Node.js 24, pinned with a root `.nvmrc` containing `24` and declared in `package.json` as `engines.node: ">=24 <25"`.
- Permanent `301` redirect rules for all entries in `src/config/legacy-redirects.js`.

Keep `legacyRedirects` in Astro. Astro provides redirects in local/static previews and preserves hosting portability; Netlify rules provide real HTTP redirects in production. A verification test must fail if the two redirect lists drift apart.

Apply these response headers site-wide:

- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: strict-origin-when-cross-origin`
- A `Permissions-Policy` that disables camera, microphone, and geolocation because the Lab does not use them.
- `X-Frame-Options: DENY`

Do not add custom cache rules. Netlify's static asset behavior and atomic deployments are sufficient. Do not add a strict Content Security Policy in this milestone because the current site uses inline scripts and styles; CSP work requires a separate design and regression pass.

## Not-found experience

Add `src/pages/404.astro`, producing `dist/404.html`, so Netlify serves it automatically for unresolved paths.

The page uses `BaseLayout` and the established light/dark theme, header, footer, typography, widths, and focus styles. It contains:

- A clear `Page not found` heading.
- Brief plain-language guidance that the address may be incorrect or the page may have moved.
- A prominent Home link.
- Links to Learning paths, Testing methods, Exercises, and Testing journeys.

The page does not use breadcrumbs because the missing URL has no reliable place in the information architecture. Its metadata instructs search engines not to index it. `BaseLayout` and `DocumentHead` therefore gain an optional `noindex` prop that is false by default and emits `meta name="robots" content="noindex"` only when requested.

## Accessibility statement

Add a new `/accessibility/` page and link it from the footer's informational navigation beside About this Lab. It does not belong in primary navigation.

The statement will:

- Say that Accessibility Testing Lab aims to meet WCAG 2.2 Level AA.
- Identify the assessment method as self-assessment.
- State the date on which the statement was prepared or last reviewed.
- Explain that the site is monitored and issues will be corrected when found.
- Identify deliberately inaccessible Exercise and Testing journey workspaces as a known exception created for learning purposes.
- Explain that these workspaces are isolated practice material and are not examples to copy into production.
- Invite accessibility feedback through the same anonymous Google Forms form used by a11y.ing: `https://docs.google.com/forms/d/e/1FAIpQLSf0zWrTLbzRQGZ7nyFPHHqe6ht2y-QEa5xygZn-bNZlV7LgxA/viewform?usp=sf_link`.

The page must describe the site's actual status without asserting that every exercise fixture conforms. It is an honest project statement, not a claim of statutory certification or a substitute for a formal audit.

## Metadata and manifest

Retain the existing canonical production URL, description metadata, Open Graph text metadata, sitemap discovery, and WebSite structured data.

Improve favicon discovery in `DocumentHead.astro` by explicitly declaring the SVG favicon, PNG favicon, and Apple touch icon while retaining the ICO fallback and manifest link. Add a theme-color declaration consistent with the existing manifest/theme.

Remove the manifest's forced portrait orientation. The Lab is a responsive website used extensively on desktop and should not suggest an orientation restriction. Keep the name, short name, icon set, theme/background colors, start URL, and standalone display mode.

A social-sharing image and Twitter card image metadata remain optional post-MVP polish and are not part of this milestone.

## Documentation

Expand `README.md` with:

- Node.js 24 as the supported runtime.
- Installation, development, build, preview, and test commands.
- Netlify build and publish settings, noting that `netlify.toml` is authoritative.
- The intended production URL.
- A release checklist split into repository checks and production-only checks.

The production-only checklist must explicitly defer and later verify:

- Connecting `testing.a11y.ing` to the existing Netlify project.
- DNS, TLS certificate, and primary-domain behavior.
- Canonical URLs, sitemap, and robots output on the public host.
- Legacy redirects as actual HTTP `301` responses.
- Custom 404 behavior and security response headers.
- A keyboard, screen-reader, responsive, light/dark, and exercise-workspace smoke test on production.

Promotion of the WordPress Accessibility Day talk and the coordinated `sanna.a11y.ing`/blog move remain outside this repository milestone and must wait for permission and the broader launch schedule.

## Verification

Before considering the local milestone complete:

- Run Astro diagnostics and a production build under Node.js 24.
- Run the complete Playwright suite on the default port 4321.
- Confirm that `dist/404.html`, the accessibility page, sitemap, robots file, favicons, and manifest are generated and reachable.
- Crawl generated internal links and ensure every non-deliberately-broken internal target resolves.
- Verify redirect parity between `netlify.toml` and `legacyRedirects`.
- Test the 404 and accessibility pages at mobile and desktop widths, in light and dark themes, with keyboard navigation and automated accessibility checks.
- Verify the 404 page emits `noindex` and ordinary pages do not.
- Verify the accessibility feedback link and footer navigation label.
- Confirm the worktree contains no unrelated changes.

## Deferred work

- Production domain activation and Netlify UI/DNS changes.
- Production-only smoke checks.
- WordPress Accessibility Day talk promotion pending permission.
- Coordinated migration of the personal blog under `sanna.a11y.ing`.
- Strict Content Security Policy design.
- Social-sharing artwork.
- Additional Testing Lab learning content, which resumes after this milestone while external launch decisions are pending.
