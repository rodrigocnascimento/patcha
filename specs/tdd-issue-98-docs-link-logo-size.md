## Objective & Scope

- What: Update the landing page Docs link to https://docs.patcha.site and increase the documentation logo display size to ~100x100.
- Why: Ensure users reach the correct documentation URL and improve logo visibility in the docs UI.
- File target: This document is intended for `specs/tdd-issue-98-docs-link-logo-size.md`.

## Proposed Technical Strategy

### Logic flow

1. Locate the landing page Docs link and update its href to https://docs.patcha.site.
2. Adjust the docs logo presentation to render at approximately 100x100.
3. Validate no other docs links or logo settings are unintentionally changed.

### Impacted files

- Landing page file containing the Docs link (likely under the landing page source directory)
- `docs-mintlify/docs.json` and/or `docs-mintlify/custom.css` for logo sizing

### Language-specific guardrails

- TypeScript: Preserve existing UI structure and styles; avoid introducing new dependencies.
- CSS: Use minimal overrides scoped to the docs logo to avoid collateral layout changes.

## Implementation Plan

### Pseudocode / steps

1. Search for the Docs link in the landing page and update the href.
2. If Mintlify supports logo sizing in `docs.json`, set logo size; otherwise add a scoped rule in `docs-mintlify/custom.css`.
3. Verify the logo renders around 100x100 in the navbar/landing header.

### Path resolution

- Use existing relative paths for local assets and absolute URL for the docs link.

### Naming standards

- Keep filenames and directories in kebab-case.
