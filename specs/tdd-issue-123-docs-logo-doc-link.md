## Objective & Scope

- What: Add the Patcha logo to the Mintlify docs site and update the docs link in the docs navigation to point to https://docs.patcha.site/.
- Why: Ensure the documentation branding and external link are correct and consistent with the new docs domain.
- File target: This document is intended for `specs/tdd-issue-123-docs-logo-doc-link.md`.

## Proposed Technical Strategy

### Logic flow

1. Add the provided logo image into `docs-mintlify/logo/`.
2. Update `docs-mintlify/docs.json` to reference the new logo for both light and dark variants.
3. Update the docs navigation anchor that points to the main site so it links to https://docs.patcha.site/.
4. Optionally add the logo to the docs landing page content if requested.

### Impacted files

- `docs-mintlify/docs.json` (update logo paths and Website link)
- `docs-mintlify/logo/patcha-logo.png` (new asset)
- `docs-mintlify/index.mdx` (optional, only if in-page logo is requested)

### Language-specific guardrails

- TypeScript: Not applicable; no TypeScript changes are expected.
- Shell: Avoid destructive git operations; use standard checkout and file edits only.

## Implementation Plan

### Pseudocode / steps

1. Place the logo at `docs-mintlify/logo/patcha-logo.png`.
2. In `docs-mintlify/docs.json`, set:
   - `logo.light` to `/logo/patcha-logo.png`
   - `logo.dark` to `/logo/patcha-logo.png`
3. In `docs-mintlify/docs.json`, update the Website anchor href to `https://docs.patcha.site/`.
4. If requested, add a logo element at the top of `docs-mintlify/index.mdx` using an image tag with alt text.

### Path resolution

- Use Mintlify root-relative paths (e.g., `/logo/patcha-logo.png`) so assets resolve from the site root.

### Naming standards

- Asset filename uses lowercase kebab-case: `patcha-logo.png`.
