<p align="center">
  <img src="./assets/patcha_panda_logo_name.png" width="220" alt="Patcha Panda"/>
</p>

<h1 align="center">Patcha</h1>

<p align="center">
  🐼 Correção segura de dependências para Node.js
</p>

<p align="center">
  Corrija vulnerabilidades nas suas dependências instantaneamente — sem esperar por releases upstream.
</p>

<p align="center">

<img src="https://img.shields.io/npm/v/patcha?style=flat-square"/>
<img src="https://img.shields.io/npm/dm/patcha?style=flat-square"/>
<img src="https://img.shields.io/github/license/patcha/patcha?style=flat-square"/>
<img src="https://img.shields.io/badge/node-%3E%3D18-blue?style=flat-square"/>

</p>

<p align="center">

<a href="#instalação">Instalação</a> • <a href="#uso">Uso</a> • <a href="#por-que-patcha">Por que Patcha</a> • <a href="#como-funciona">Como funciona</a> • <a href="#roadmap">Roadmap</a>
<span style="display:inline-block; width:1em"></span>
| <span style="display:inline-block; width:1em"></span>
<a href="README.md">English (US)</a>

</p>

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

## Por que Patcha

| Recurso                       | Patcha | Correção Tradicional |
| ----------------------------- | ------ | -------------------- |
| Patch imediato                | ✔      | ✘                   |
| Sem forks necessários         | ✔      | ✘                   |
| Funciona com lockfiles        | ✔      | ✔                   |
| Amigo do CI                   | ✔      | ✔                   |

Patcha foi projetado para **fluxos de trabalho reais em produção**.

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

Funcionalidades planejadas:

* integração com banco de dados de vulnerabilidades
* atualizações automáticas do registro de patches
* suporte a workspaces / monorepos
* modo de execução em CI
* geração de relatórios de auditoria
* integração com GitHub Security

---

## Filosofia

Patcha segue um princípio simples:

> Patches de segurança não devem depender de ciclos de release.

Quando uma vulnerabilidade aparece, desenvolvedores devem ser capazes de responder **imediatamente e com segurança**.

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

## Licença

MIT License

---

<p align="center">

🐼 Patcha Panda protege suas dependências

</p>