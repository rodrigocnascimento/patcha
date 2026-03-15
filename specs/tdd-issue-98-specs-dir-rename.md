## Objective & Scope

- What: Rename the repository documentation directory to `specs/` and update all references that affect rules, documentation, and automation.
- Why: Align infrastructure and workflow terminology around `specs/` for AI/infra-related documentation.
- File target: This document is intended for `specs/tdd-issue-98-specs-dir-rename.md`.

## Proposed Technical Strategy

### Logic flow

1. Identify every reference to the former documentation directory across the repo (rules, docs, scripts, configs).
2. Rename the documentation directory to `specs/`.
3. Update references so they point to `specs/`.
4. Validate there are no remaining references to the former directory name.

### Impacted files

- Documentation directory -> `specs/` (directory rename)
- `AGENTS.md` (rules referencing `specs/` and TDD path)
- Any other docs or configs referencing `specs/`

### Language-specific guardrails

- TypeScript: Not applicable; no TypeScript changes are expected.
- Shell: Avoid destructive operations; use `git mv` for directory rename.

## Implementation Plan

### Pseudocode / steps

1. Search for references to the documentation directory in the repo.
2. Rename directory:
   - `git mv docs specs`
3. Update references to `specs/` in impacted files.
4. Re-scan for any remaining `docs/` references and review if they should stay (e.g., third-party docs references).

### Path resolution

- Use relative paths with explicit `specs/` prefix after rename.

### Naming standards

- Directory name is lowercase: `specs/`.
