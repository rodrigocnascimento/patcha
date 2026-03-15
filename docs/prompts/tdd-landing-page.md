# TDD: Landing Page - Patcha CLI

## 1. Objective & Scope

**What:** Criar landing page para o Patcha CLI utilizando Vue.js 3 + Tailwind CSS.

**Why:** Disponibilizar uma página de apresentação profissional para o projeto open-source, seguindo o padrão de landing pages de devtools modernas.

**File Target:** `docs/tdd-landing-page.md`

### Escopo
- Landing page em **Vue.js 3 + Vite + Tailwind CSS**
- Dark mode com toggle + detecção automática de preference do sistema
- Design "dark mode first" com cores do brand
- Responsivo (mobile, tablet, desktop)
- Seções: Hero, Terminal Preview, Features, CI Integration, How It Works, Open Source, Footer

---

## 2. Proposed Technical Strategy

### Stack
- Vue.js 3 (Composition API)
- Vite (build tool)
- Tailwind CSS (styling)
- TypeScript

### Estrutura de Diretórios
```
landing-page/
├── src/
│   ├── App.vue              # Root component com dark mode toggle
│   ├── main.ts             # Entry point
│   ├── style.css           # Tailwind imports
│   ├── vite-env.d.ts       # Vue type declarations
│   └── components/
│       ├── Hero.vue        # Hero section
│       ├── TerminalPreview.vue  # Terminal demo
│       ├── Features.vue    # 3 feature cards
│       ├── CIIntegration.vue   # CI pipeline example
│       ├── HowItWorks.vue  # 4 step flow
│       ├── OpenSource.vue  # GitHub star CTA
│       └── Footer.vue      # Footer links
├── public/
│   └── patcha-logo.svg     # Logo
├── index.html
├── vite.config.ts
├── tailwind.config.js      # Dark mode enabled
├── postcss.config.js
├── tsconfig.json
└── tsconfig.node.json
```

### Dark Mode Implementation
- Toggle button no header
- Detecta `prefers-color-scheme` do sistema
- Salva preferência em `localStorage`
- Usa classe `dark` no `<html>` via Tailwind

### Cores (Design System)
- Primary: #1E2A38
- Accent: #2ECC71
- Secondary: #6B7280
- Background: #0F172A / #111827 (dark)
- Fontes: Inter + JetBrains Mono

---

## 3. Implementation Plan

### Tarefas Concluídas
1. ✅ Setup Vue 3 + Vite + Tailwind
2. ✅ Config dark mode com toggle
3. ✅ Hero section
4. ✅ Terminal preview com typewriter effect
5. ✅ Features (3 colunas)
6. ✅ CI Integration section
7. ✅ How It Works (4 passos)
8. ✅ Open Source section
9. ✅ Footer
10. ✅ Build de produção

### Próximas Possíveis Melhorias
- Adicionar imagens de `assets/` para logos
- Animação mais sofisticada no terminal
- Preview de servidor local (`npm run dev`)

---

**Documento criado:** Março/2026  
**Status:** Implementação concluída na branch `feat/landing-page`
