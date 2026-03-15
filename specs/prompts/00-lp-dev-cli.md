You are a senior frontend engineer and developer-experience designer.

Your task is to generate a **complete landing page implementation** for a developer tool called **Patcha**.

The landing page must be implemented using:

* React
* Tailwind CSS
* modern component structure
* dark mode first
* developer-focused UX

The result should feel like a **modern DevTool landing page** similar to tools like Bun, Vite, Snyk, or Terraform.

The final output must be **clean, minimal, and optimized for developers**.

---

# Product Overview

Patcha is a CLI tool that detects and automatically patches vulnerabilities in Node.js dependencies.

Example usage:

```bash
patcha scan
patcha fix
patcha report
```

Patcha integrates into CI pipelines and developer workflows.

Primary goal:

> Automatically detect and patch vulnerable dependencies.

---

# Brand Identity

Brand Name:

Patcha

Tagline:

Secure dependency patching for Node.js projects.

Brand personality:

* technical
* minimal
* precise
* trustworthy
* developer-first

Avoid marketing fluff.

---

# Design System

## Colors

Primary:

#1E2A38 (Security Blue)

Accent:

#2ECC71 (Patch Green)

Secondary:

#6B7280 (Neutral Gray)

Background:

#0F172A or #111827

All UI should be dark-mode first.

---

## Typography

Primary font:

Inter

Monospace font:

JetBrains Mono

Code blocks must use monospace styling.

---

# Page Layout

The landing page must include the following sections.

---

# Hero Section

Large headline:

Patcha

Subheadline:

Secure dependency patching for Node.js projects.

Primary CTA:

Install Patcha

Installation example:

```bash
npm install -g patcha
```

Secondary CTA:

View Docs

Include a **terminal-style UI component** showing Patcha running.

Example output:

```bash
patcha scan

Dependencies scanned: 142
Vulnerabilities detected: 3

✔ patched lodash
✔ patched minimist
⚠ manual review required for axios
```

---

# Developer Workflow Section

Title:

Built for developer workflows.

Show the CLI process:

```bash
patcha scan
patcha fix
patcha report
```

Explain briefly:

* scan dependencies
* apply patches automatically
* generate reports

---

# Features Section

Three columns:

Automated Patching
Automatically apply safe dependency patches.

Security-first
Detect known vulnerabilities.

CI Ready
Works in CI/CD pipelines.

Use minimal icons and clean cards.

---

# CI Integration Section

Show example CI usage:

```bash
patcha scan --json
```

Explain that builds can fail if vulnerabilities are found.

Include a minimal pipeline snippet.

---

# How It Works

Show a simple flow:

1. dependency graph analysis
2. vulnerability detection
3. automated patching
4. reporting

Use minimal diagram style.

---

# Open Source Section

Explain that Patcha is open source.

Include:

GitHub repository link
Star button

Encourage community contributions.

---

# Footer

Include:

Docs
GitHub
License
Community

---

# UI Components Required

The page must include:

* Terminal component
* Code blocks
* Feature cards
* Dark gradient hero
* Clean grid layout
* Minimal iconography

---

# Interaction Design

Include subtle UI effects:

* terminal typing animation
* hover states
* smooth scrolling
* subtle gradients

Avoid heavy animations.

---

# Code Requirements

The output must include:

* React functional components
* Tailwind CSS classes
* reusable UI components
* clean layout structure

Suggested components:

HeroSection
TerminalPreview
FeaturesSection
WorkflowSection
CISection
Footer

---

# Final Requirement

The final output should be **a complete React landing page implementation** that could realistically be used for a DevTool website.

The design must feel:

* professional
* developer-native
* modern
* minimal
