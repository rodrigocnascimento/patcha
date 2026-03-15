# TDD - Fase 2: CLI Aprimorado com IA

## Objective & Scope

**What:** Implementar o Resolution Engine com 3 níveis de correção de vulnerabilidades e sistema de providers LLM.

**Why:** O npm audit fix resolve ~60-70% das vulnerabilidades. A Fase 2 visa resolver os casos complexos que requerem análise de breaking changes e sugestões de IA.

**File Target:** `docs/tdd-phase-2-cli-ai.md`

---

## Proposed Technical Strategy

### 1. Resolution Engine (3 Níveis)

| Nível | Tipo | Descrição |
|-------|------|-----------|
| 1 | Auto-fix | Patch/minor updates (semver-compatível) |
| 2 | Smart upgrade | Major bumps com análise de breaking changes |
| 3 | AI-assisted | LLM para resolver casos complexos |

### 2. LLM Provider System

- Interface `LLMProvider` com métodos `complete()` e `embed()`
- Registry de providers com fallback chain
- Providers iniciais: Anthropic (Claude), Google (Gemini), OpenAI
- Cache de respostas usando arquivo local (JSON)

### 3. Context Enrichment

Para cada vulnerabilidade, coletar:
- Caminho de dependência (qual pacote depende de qual)
- Changelog do pacote vulnerável
- Breaking changes entre versões
- Código afetado no projeto

### 4. Arquitetura de Arquivos

```
src/
├── cli/
│   ├── commands/
│   │   ├── fix.ts       # novo comando fix
│   │   └── config.ts    # novo comando config
│   └── index.ts
├── scanner/
│   ├── index.ts         # existente
│   └── resolver/        # novo
│       ├── index.ts     # Resolution Engine
│       ├── level1.ts    # Auto-fix
│       ├── level2.ts    # Smart upgrade
│       └── level3.ts    # AI-assisted
├── llm/                # novo
│   ├── index.ts
│   ├── providers/
│   │   ├── interface.ts
│   │   ├── anthropic.ts
│   │   ├── google.ts
│   │   └── openai.ts
│   ├── cache.ts
│   └── registry.ts
└── config/             # novo
    ├── index.ts
    └── types.ts
```

---

## Implementation Plan

### Fase 2.1: Resolution Engine (Níveis 1-2)

```typescript
// src/scanner/resolver/index.ts
interface ResolutionResult {
  level: 1 | 2 | 3;
  vulnerability: Vulnerability;
  action: 'upgrade' | 'replace' | 'ai_analysis' | 'no_fix';
  newVersion?: string;
  alternative?: string;
  confidence: number;
}

class ResolutionEngine {
  async resolve(vulns: Vulnerability[]): Promise<ResolutionResult[]>
}
```

### Fase 2.2: LLM Providers

```typescript
// src/llm/providers/interface.ts
interface LLMProvider {
  name: string;
  complete(prompt: string): Promise<string>;
  isConfigured(): boolean;
}

interface LLMRegistry {
  register(provider: LLMProvider): void;
  get(providerName?: string): LLMProvider;
  fallback(): LLMProvider | null;
}
```

### Fase 2.3: Comandos CLI

```bash
patcha fix [path]           # Auto-fix nível 1
patcha fix --ai [path]     # Fix com IA para todos
patcha fix --dry-run       # Mostra o que seria feito
patcha config set api-key   # Configura API key
patcha config list         # Lista configurações
```

### Fase 2.4: Configuração

Arquivo `patcha.config.json` na raiz do projeto:
```json
{
  "llmProvider": "anthropic",
  "apiKeys": {
    "anthropic": "${ANTHROPIC_API_KEY}"
  },
  "autoFix": {
    "level1": true,
    "level2": false,
    "level3": false
  }
}
```

---

## Impacted Files

### Novos
- `src/scanner/resolver/index.ts`
- `src/scanner/resolver/level1.ts`
- `src/scanner/resolver/level2.ts`
- `src/scanner/resolver/level3.ts`
- `src/llm/index.ts`
- `src/llm/providers/interface.ts`
- `src/llm/providers/anthropic.ts`
- `src/llm/providers/google.ts`
- `src/llm/providers/openai.ts`
- `src/llm/cache.ts`
- `src/llm/registry.ts`
- `src/config/index.ts`
- `src/config/types.ts`
- `src/cli/commands/fix.ts`
- `src/cli/commands/config.ts`

### Modificados
- `src/cli/index.ts` - adicionar novos comandos
- `package.json` - adicionar dependências (anthropic, google-auth-library, etc)

---

## Type Safety

- Todas as interfaces com tipos explícitos
- Tipos para vulnerabilidades resolvidas
- Tipos para configuração
- Validação de schema com Zod para config

---

## Testing Strategy

- Testes unitários para cada nível de resolução
- Testes para LLM providers (mockados)
- Testes de integração para CLI commands

---

**Do you approve this technical approach, Developer?**
