# Footer link spacing alignment design

## Context

Testing Lab footer links carry the same `py-2` utility classes as the A11ying and WCAG footers, but a later global `padding: 0` declaration overrides them. The links therefore have less vertical spacing and a smaller interactive area than their counterparts on the other sites.

## Decision

Add a footer-specific style after the shared link rule that restores `0.5rem` block padding for footer links that are not buttons:

```css
footer a:not(.button) {
  padding-block: 0.5rem;
}
```

This matches the effective `py-2` spacing used by A11ying and WCAG while retaining zero horizontal padding.

## Scope

Only footer links change. Do not remove the broader padding reset because it also affects header, breadcrumb, main-content, and section-navigation links.

## Verification

- Assert that a related-site footer link has `8px` top and bottom padding.
- Retain the existing footer destination assertions.
- Run the shell browser tests and production build.

