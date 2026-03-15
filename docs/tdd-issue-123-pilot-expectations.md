## Objective & Scope

- What: Create a simple documentation page describing what to expect when running the first pilot (without AI) for Patcha.
- Why: Provide a concise, practical checklist so users know the expected outputs, files changed, and validation steps.
- File target: This document is intended for `docs/tdd-issue-123-pilot-expectations.md`.

## Proposed Technical Strategy

### Logic flow

1. Add a short guide under `docs-mintlify/` describing the pilot run expectations.
2. Include prerequisites, expected outputs, and verification steps.
3. Link the guide in `docs-mintlify/docs.json` under an appropriate group (likely Guides).

### Impacted files

- `docs-mintlify/guides/pilot-expectations.mdx` (new page)
- `docs-mintlify/docs.json` (navigation update)

### Language-specific guardrails

- TypeScript: Not applicable; no TypeScript changes are expected.
- Shell: No destructive operations; documentation-only edits.

## Implementation Plan

### Pseudocode / steps

1. Create `docs-mintlify/guides/pilot-expectations.mdx` with:
   - Frontmatter (`title`, `description`)
   - Sections: prerequisites, expected scan output, expected fix output, files changed, validation, rollback.
2. Update `docs-mintlify/docs.json` to add the new page to Guides > Advanced.

### Path resolution

- Use root-relative links in content (e.g., `/guides/pilot-expectations`).

### Naming standards

- Kebab-case filename: `pilot-expectations.mdx`.
