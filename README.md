# Accessibility Testing Lab

A hands-on environment for learning and practising accessibility testing. Its intended production address is `https://testing.a11y.ing/`; connecting that domain is deliberately deferred until the coordinated site launch.

## Requirements

- Node.js 24
- npm

If you use nvm, run `nvm use` from the repository root to select the version in `.nvmrc`.

## Local development

All commands are run from the repository root:

| Command                   | Action                                                        |
| :------------------------ | :------------------------------------------------------------ |
| `npm install`             | Install dependencies                                          |
| `npm run dev`             | Start the development server at `http://localhost:4321`       |
| `npm run build`           | Build the production site into `./dist/`                      |
| `npm run preview`         | Preview a completed production build                          |
| `npm test`                | Install Playwright browsers and run the complete browser suite |
| `npm run astro -- check`  | Run Astro diagnostics                                         |
| `npm run astro -- --help` | Show Astro CLI help                                            |

Playwright uses port 4321 by default and starts the required preview server itself.

## Netlify

The repository's `netlify.toml` is the source of truth for deployment settings:

- Build command: `npm run build`
- Publish directory: `dist`
- Runtime: Node.js 24, also declared in `.nvmrc` and `package.json`
- Legacy routes: permanent redirects mirrored from `src/config/legacy-redirects.js`
- Response headers: baseline content-type, referrer, permissions, and framing protections

Do not duplicate or override these settings in the Netlify UI unless there is a documented reason.

## Repository release checklist

- [ ] Use Node.js 24 and install dependencies successfully.
- [ ] Run `npm run astro -- check`.
- [ ] Run `npm run build`.
- [ ] Run the complete Playwright suite on port 4321.
- [ ] Confirm generated internal links resolve, excluding deliberately broken exercise content.
- [ ] Confirm `404.html`, the accessibility statement, sitemap, robots file, manifest, and favicons exist in `dist`.
- [ ] Confirm Netlify and Astro legacy redirect definitions match.
- [ ] Review the final diff and confirm the worktree contains no unrelated changes.

## Deferred production checklist

Complete these checks only when the coordinated launch is ready:

- [ ] Connect `testing.a11y.ing` to the existing Netlify project.
- [ ] Verify DNS, TLS certificate issuance, and primary-domain behavior.
- [ ] Verify canonical URLs, the sitemap, and `robots.txt` on the public host.
- [ ] Verify every legacy URL returns a real HTTP `301` response to its expected destination.
- [ ] Verify unknown URLs use the custom 404 page and return the appropriate not-found response.
- [ ] Verify the configured security response headers.
- [ ] Smoke-test keyboard and screen-reader navigation, responsive layouts, light and dark themes, and representative exercise workspaces on production.

The coordinated move of the personal blog under `sanna.a11y.ing` and promotion of the WordPress Accessibility Day talk are external launch tasks. Talk promotion remains deferred until advertising permission is received.
