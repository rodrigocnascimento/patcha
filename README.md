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
<a href="#instalação">Instalação</a> • <a href="#uso">Uso</a> • <a href="#por-que-patcha">Por que Patcha</a> • <a href="#como-funciona">Como funciona</a>

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

## O Problema

Projetos JavaScript modernos dependem de **centenas de dependências**.

Quando uma vulnerabilidade aparece, desenvolvedores frequentemente precisam:

• esperar pelos mantenedores
• esperar por novos releases
• lidar com cadeias de dependências aninhadas
• enviar código com vulnerabilidades conhecidas

Esse atraso pode levar **dias ou semanas**.

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

## A Abordagem Patcha

Patcha permite que desenvolvedores **corrigam dependências vulneráveis imediatamente**.

Em vez de esperar por correções upstream, Patcha injeta patches direcionados diretamente na sua árvore de dependências.

```
Scan → Detect → Patch
```

Sem forks.
Sem esperar.
Sem risco em produção.

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

## Exemplo

```bash
patcha scan
```

```
🐼 Patcha escaneando dependências...

✔ lodash corrigido
✔ minimist corrigido
⚠ axios requer revisão manual

Resumo
------
2 vulnerabilidades corrigidas
1 dependência requer atenção
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

## Instalação

Instale globalmente:

```bash
npm install -g patcha
```

Ou rode diretamente com `npx`:

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

## Uso

### Escaneia dependências

```bash
patcha scan
```

### Aplica patches disponíveis

```bash
patcha apply
```

### Verifica dependências corrigidas

```bash
patcha verify
```

Exemplo de fluxo:

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

## Como funciona

Patcha opera em três etapas.

### 1. Análise de Dependências

Patcha analiza sua árvore de dependências usando:

* `package-lock.json`
* `pnpm-lock.yaml`
* `yarn.lock`

Isso constrói um grafo completo dos pacotes instalados.

---

### 2. Detecção de Vulnerabilidades

Dependências são comparadas com um **registro de patches** contendo correções conhecidas de vulnerabilidades.

Esse registro mapeia:

```
pacote → versão vulnerável → patch
```

---

### 3. Injeção Segura de Patches

Patcha aplica patches direcionados diretamente dentro do `node_modules`.

Isso permite correções sem:

• atualizar versões com breaking changes
• fazer fork de repositórios
• esperar pelos mantenedores

---

## Why Patcha

| Feature                       | Patcha | Traditional Fix |
| ----------------------------- | ------ | --------------- |
| Immediate patching            | ✔      | ✖               |
| No forks required             | ✔      | ✖               |
| Works with existing lockfiles | ✔      | ✔               |
| CI friendly                   | ✔      | ✔               |

Patcha is designed for **real-world production workflows**.

---

## Por que Patcha

| Recurso                       | Patcha | Correção Tradicional |
| ----------------------------- | ------ | -------------------- |
| Patch imediato                | ✔      | ✖                   |
| Sem forks necessários         | ✔      | ✖                   |
| Funciona com lockfiles        | ✔      | ✔                   |
| Amigo do CI                   | ✔      | ✔                   |

Patcha foi projetado para **fluxos de trabalho reais em produção**.

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

## Uso em CI

Patcha funciona bem em pipelines de CI.

Exemplo de passo no GitHub Actions:

```yaml
- name: Escaneia dependências
  run: npx patcha scan

- name: Aplica patches
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

## Roadmap

Funcionalidades planejadas:

* integração com banco de dados de vulnerabilidades
* atualizações automáticas do registro de patches
* suporte a workspaces / monorepos
* modo de execução em CI
* geração de relatórios de auditoria
* integração com GitHub Security

---

## Philosophy

Patcha follows a simple principle:

> Security patches should not depend on release cycles.

When a vulnerability appears, developers should be able to respond **immediately and safely**.

---

## Filosofia

Patcha segue um princípio simples:

> Patches de segurança não devem depender de ciclos de release.

Quando uma vulnerabilidade aparece, desenvolvedores devem ser capazes de responder **imediatamente e com segurança**.

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

## Contribuindo

Contribuições são bem-vindas.

Você pode ajudar:

• enviando novos patches
• reportando vulnerabilidades
• melhorando regras de detecção
• melhorando a documentação

Veja:

```
CONTRIBUTING.md
```

---

## License

MIT License

---

<p align="center">

🐼 Patcha Panda protects your dependencies

🐼 Patcha Panda protege suas dependências

</p>
