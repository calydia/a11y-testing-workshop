# Testing Lab blog footer link design

## Context

The Accessibility Testing Lab footer already links to the A11ying and WCAG sites. The renewed accessibility blog is another related resource and should be discoverable consistently across the site ecosystem.

## Decision

Add a third link to the existing `A11ying sites` footer navigation:

- Label: “Accessibility blog”
- Destination: `https://sanna.a11y.ing/blog/accessibility/`

Use the existing external-link attributes and footer-link styling. Do not create another footer group because the blog is part of the same related-site collection.

## Scope

Only the Testing Lab footer and its automated coverage change. Header navigation, content-page links, and the general blog homepage are outside this change.

## Verification

- Confirm the `A11ying sites` footer navigation contains three links.
- Confirm each related-site label has the expected destination.
- Run the relevant footer test and production build.

