## Objective & Scope

- What: Convert all existing ASCII graphs in the repository to Mermaid diagrams.
- Why: Enforce the Mermaid-only diagrams rule and ensure consistent, renderable documentation graphics.
- File target: This document is intended for `specs/tdd-issue-783-mermaid-graph-conversion.md`.

## Proposed Technical Strategy

### Logic flow

1. Identify all ASCII diagrams across docs/specs and other markdown files.
2. Replace each ASCII diagram with an equivalent Mermaid diagram.
3. Verify that no ASCII diagrams remain after conversion.

### Impacted files

- Documentation/spec files containing ASCII diagrams (paths discovered via search)

### Language-specific guardrails

- Markdown: Use fenced Mermaid blocks with clear, minimal labels.
- Keep diagrams semantically equivalent to the original ASCII layout.

## Implementation Plan

### Pseudocode / steps

1. Search for ASCII diagram patterns (e.g., arrows, box drawings) in markdown files.
2. For each match, translate to Mermaid (flowchart, sequence, or graph) as appropriate.
3. Re-scan to confirm no ASCII diagrams remain.

### Path resolution

- Preserve existing file locations; only edit diagram blocks.

### Naming standards

- Use `flowchart` or `sequenceDiagram` Mermaid blocks as needed.
