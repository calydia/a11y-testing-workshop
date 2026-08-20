# Shared UI boundary implementation plan

1. Finalize the framework-neutral `a11ying-ui` tokens export and distinguish the supported brand foundations from compatibility-only application utilities in its documentation.
2. Keep React peer dependencies optional for token-only consumers and keep the existing global stylesheet consuming the same extracted tokens.
3. Test and build `a11ying-ui`, then commit, tag, and publish version 2.0.13 so clean consumer installs and Netlify builds can resolve it.
4. Verify A11ying and WCAG against the published package without changing their existing React component architecture.
5. Add the tokens-only dependency to Testing Lab, replace its duplicated brand declarations, and retain all Astro components and site-specific global styles.
6. Build and run focused shell, visual, and accessibility checks for Testing Lab in both themes.
7. Add the tokens-only dependency to Sanna, replace the duplicated Tailwind brand declarations, and retain its local general-site and blog components and styles.
8. Build and run Sanna's focused unit, visual, and accessibility checks across representative general and blog pages in both themes.
9. Compare computed token values and representative screenshots before and after each consumer migration to confirm that the work causes no visual change.
