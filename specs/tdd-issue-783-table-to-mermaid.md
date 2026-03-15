## Objective & Scope

- What: Convert all markdown tables in `specs/` into Mermaid diagrams and clarify the Mermaid-only rule to explicitly cover all diagram types (no ASCII).
- Why: Enforce Mermaid-only visuals and improve readability where tables are misaligned.
- File target: This document is intended for `specs/tdd-issue-783-table-to-mermaid.md`.

## Proposed Technical Strategy

### Logic flow

1. Update the Mermaid-only rule to state all diagrams must be Mermaid (no ASCII, any kind).
2. Identify all markdown tables in `specs/`.
3. For each table, choose an equivalent Mermaid representation (flowchart, graph, or mindmap) that preserves the meaning.
4. Replace the table with the Mermaid diagram, keeping surrounding text intact.
5. Verify no markdown tables remain in `specs/`.

### Impacted files

- `specs/00-visao-geral.md`
- `specs/01-idea.md`
- `specs/02-analise-mercado.md`
- `specs/03-plano-enterprise.md`
- `specs/tdd-fase-2-cli-ai.md`

### Language-specific guardrails

- Markdown: Use fenced Mermaid blocks and concise node labels.
- Preserve the original information order and meaning.

## Implementation Plan

### Pseudocode / steps

1. Update `.opencode/rules/55-mermaid-only-graphs.md` to clarify the rule scope.
2. Read each specs file containing tables.
3. Translate each table into Mermaid:
   - Use `flowchart` for comparisons and lists.
   - Use `mindmap` for grouped attributes.
4. Replace table blocks with Mermaid blocks.
5. Re-scan `specs/` to confirm no table separators remain.

### Path resolution

- No path changes; only content replacements.

### Naming standards

- Mermaid blocks use `flowchart` or `mindmap` with short IDs.
