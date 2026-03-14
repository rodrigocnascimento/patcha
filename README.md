<p align="center">
  <img src="./assets/patcha_panda_logo_name.png" width="220" alt="Patcha Panda"/>
</p>

<h1 align="center">Patcha</h1>

<p align="center">
  🐼 Secure dependency patching for Node.js
</p>

<p align="center">
  Patch vulnerabilities in your dependencies instantly — without waiting for upstream releases.
</p>

<p align="center">

<img src="https://img.shields.io/npm/v/patcha?style=flat-square"/>
<img src="https://img.shields.io/npm/dm/patcha?style=flat-square"/>
<img src="https://img.shields.io/github/license/patcha/patcha?style=flat-square"/>
<img src="https://img.shields.io/badge/node-%3E%3D18-blue?style=flat-square"/>

</p>

<p align="center">

<a href="#install">Install</a> • <a href="#usage">Usage</a> • <a href="#why-patcha">Why Patcha</a> • <a href="#how-it-works">How it works</a> • <a href="#roadmap">Roadmap</a>
<span style="display:inline-block; width:1em"></span>
| <span style="display:inline-block; width:1em"></span>
<a href="README.pt-BR.md">Português (BR)</a>

</p>

---

## The Problem

Modern JavaScript projects rely on **hundreds of dependencies**.

When a vulnerability appears, developers often have to:

• wait for maintainers
• wait for new releases
• deal with nested dependency chains
• ship code with known vulnerabilities

This delay can take **days or weeks**.

---

## The Patcha Approach

Patcha allows developers to **patch vulnerable dependencies immediately**.

Instead of waiting for upstream fixes, Patcha safely injects targeted patches directly into your dependency tree.

```
Scan → Detect → Patch
```

No forks.
No waiting.
No production risk.

---

## Example

```bash
patcha scan
```

```
🐼 Patcha scanning dependencies...

✔ lodash patched
✔ minimist patched
⚠ axios requires manual review

Summary
-------
2 vulnerabilities patched
1 dependency requires attention
```

---

## Install

Install globally:

```bash
npm install -g patcha
```

Or run it directly with `npx`:

```bash
npx patcha scan
```

---

## Usage

### Scan dependencies

```bash
patcha scan
```

### Apply available patches

```bash
patcha apply
```

### Verify patched dependencies

```bash
patcha verify
```

Example workflow:

```bash
patcha scan
patcha apply
patcha verify
```

---

## How it works

Patcha operates in three stages.

### 1. Dependency Analysis

Patcha parses your dependency tree using:

* `package-lock.json`
* `pnpm-lock.yaml`
* `yarn.lock`

This builds a complete graph of installed packages.

---

### 2. Vulnerability Detection

Dependencies are compared against a **patch registry** containing known vulnerability fixes.

This registry maps:

```
package → vulnerable version → patch
```

---

### 3. Safe Patch Injection

Patcha applies targeted patches directly inside `node_modules`.

This allows fixes without:

• upgrading breaking versions
• forking repositories
• waiting for maintainers

---

## Why Patcha

| Feature                       | Patcha | Traditional Fix |
| ----------------------------- | ------ | --------------- |
| Immediate patching            | ✔      | ✘               |
| No forks required             | ✔      | ✘               |
| Works with existing lockfiles | ✔      | ✔               |
| CI friendly                   | ✔      | ✔               |

Patcha is designed for **real-world production workflows**.

---

## CI Usage

Patcha works well in CI pipelines.

Example GitHub Actions step:

```yaml
- name: Scan dependencies
  run: npx patcha scan

- name: Apply patches
  run: npx patcha apply
```

---

## Roadmap

Planned features:

* vulnerability database integration
* automatic patch registry updates
* workspace / monorepo support
* CI enforcement mode
* audit report generation
* GitHub Security integration

---

## Philosophy

Patcha follows a simple principle:

> Security patches should not depend on release cycles.

When a vulnerability appears, developers should be able to respond **immediately and safely**.

---

## Contributing

We welcome contributions.

You can help by:

• submitting new patches
• reporting vulnerabilities
• improving detection rules
• improving documentation

See:

```
CONTRIBUTING.md
```

---

## License

MIT License

---

<p align="center">

🐼 Patcha Panda protects your dependencies

</p>