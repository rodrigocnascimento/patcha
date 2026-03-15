You are a senior product designer and developer-experience (DevEx) specialist.

Your task is to design a **developer-focused landing page** for a CLI tool called **Patcha**.

The output should follow a **developer-first philosophy**, similar to landing pages used by modern devtools such as Vite, Bun, Snyk, and Terraform. The page should feel **technical, trustworthy, and minimal**, optimized for developers who quickly scan for information.

---

## Product Overview

Patcha is a CLI tool that **detects and automatically patches vulnerabilities in Node.js dependencies**.

It integrates into developer workflows and CI pipelines and focuses on:

* security
* automation
* reliability
* speed
* developer experience

Example CLI usage:

```
patcha scan
patcha fix
patcha report
```

---

# Brand Identity Guidelines

### Brand Personality

The design should convey:

* security
* technical precision
* reliability
* minimalism
* performance

The tone should feel **developer-native**, not marketing-heavy.

Avoid buzzwords or exaggerated claims.

---

# Color System

Primary color palette:

Security Blue
`#1E2A38`

Patch Green
`#2ECC71`

Neutral Gray
`#6B7280`

Backgrounds should be mostly:

```
#0F172A
#111827
```

Accent colors should be used sparingly for:

* success states
* CLI highlights
* call-to-action buttons

---

# Typography

Primary font:

Inter

Code font:

JetBrains Mono

CLI blocks and terminal UI must use monospace fonts.

---

# Overall Layout Style

The landing page should be:

* clean
* technical
* documentation-inspired
* grid-based
* dark-mode first

Inspired by the aesthetic used by developer tools like:

* Vite
* Bun
* Snyk
* HashiCorp products

Spacing should be generous, with strong hierarchy and scannable sections.

---

# Landing Page Structure

## 1. Hero Section

Top headline:

**Patcha**

Subheadline:

"Secure dependency patching for Node.js projects."

Primary CTA:

```
Install Patcha
```

Installation example prominently displayed:

```
npm install -g patcha
```

Secondary link:

```
View Documentation
```

Visual concept:

* Terminal-style interface
* Animated dependency scan output
* Minimal shield + patch icon

---

## 2. CLI First Experience

Section title:

"Built for developers"

Show a clean CLI workflow:

```
patcha scan
patcha fix
```

Example output:

```
Patcha Security Scan

Dependencies scanned: 142
Vulnerabilities detected: 3

✔ patched lodash
✔ patched minimist
⚠ manual review required for axios
```

The terminal component should feel authentic.

---

## 3. Why Patcha

Three core benefits:

### Automated Fixes

Automatically apply safe dependency patches.

### Security-first

Detect and fix known vulnerabilities.

### CI Ready

Integrates easily into CI/CD pipelines.

Each feature should be presented with small technical diagrams or icons.

---

## 4. CI Integration

Show example integration with CI pipelines.

Example:

```
patcha scan --json
```

Explain that Patcha can fail builds when vulnerabilities are found.

Include example pipeline snippet.

---

## 5. Architecture / How it Works

Explain at a high level:

1. dependency graph analysis
2. vulnerability detection
3. automated patch application
4. reporting

Use simple diagrams representing dependency graphs.

---

## 6. Open Source Section

Mention that Patcha is open source.

Include GitHub star button and repository link.

Encourage contributions.

---

## 7. Documentation Section

Provide quick links:

* CLI commands
* configuration
* CI integration
* API

---

## 8. Footer

Include:

* GitHub
* Documentation
* License
* Community

---

# Visual Components

Use the following UI components:

* terminal window
* dependency graph visuals
* security icons (shield)
* patch symbols
* minimal diagrams

Avoid:

* stock photography
* corporate imagery
* cartoon mascots

---

# Interaction Design

Subtle animations:

* CLI typing simulation
* dependency nodes highlighting
* vulnerability detection feedback

Animations must remain subtle and fast.

---

# Tone of Copy

All copy must be:

* concise
* technical
* developer-friendly
* documentation-like

Example tone:

Correct:

"Automatically patch vulnerable dependencies."

Incorrect:

"Revolutionary AI-driven security platform."

---

# Output Requirements

Generate:

1. A structured landing page layout
2. Section descriptions
3. UI component suggestions
4. Example developer-facing copy
5. Terminal UI examples
6. Visual hierarchy recommendations

Focus on clarity, developer trust, and technical credibility.

The landing page should feel like a **modern devtool homepage built for engineers**.
