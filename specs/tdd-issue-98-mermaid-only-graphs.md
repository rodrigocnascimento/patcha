## Objective & Scope

- What: Add a new rule requiring Mermaid graphs only and explicitly forbidding ASCII graphs.
- Why: Standardize diagram output format and avoid ASCII art in documentation.
- File target: This document is intended for `specs/tdd-issue-98-mermaid-only-graphs.md`.

## Proposed Technical Strategy

### Logic flow

1. Add a new rule file under `.opencode/rules/` that mandates Mermaid graphs only.
2. Ensure the rule text clearly forbids ASCII diagrams and provides a brief example.
3. Recompile `AGENTS.md` via `npm run opencode:compile` to include the new rule.

### Impacted files

- `.opencode/rules/<new-rule>.md`
- `AGENTS.md` (generated)

### Language-specific guardrails

- Markdown: Keep the rule concise and unambiguous; avoid non-ASCII characters unless already present.

## Implementation Plan

### Pseudocode / steps

1. Create `.opencode/rules/XX-mermaid-only-graphs.md`.
2. Add clear rule text: Mermaid only, no ASCII diagrams.
3. Run `npm run opencode:compile` to update `AGENTS.md`.

### Path resolution

- Place the rule in `.opencode/rules/` alongside existing governance rules.

### Naming standards

- Use kebab-case for the rule filename with a numeric prefix.
