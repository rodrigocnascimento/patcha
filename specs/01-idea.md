# Patcha — CLI

> CLI inteligente para resolução automatizada de vulnerabilidades em dependências Node.js, com assistência de IA e integração multi-platform.

**Este documento descreve o Produto 1: o CLI open-source.** Para o Produto 2 (plataforma enterprise com dashboard, compliance e gestão), veja [03-plano-enterprise.md](./03-plano-enterprise.md).

---

## Índice

1. [Visão Geral](#visão-geral)
2. [O Problema](#o-problema)
3. [A Solução](#a-solução)
4. [Arquitetura](#arquitetura)
5. [Design do Core como Biblioteca](#design-do-core-como-biblioteca)
6. [Sistema de Providers LLM](#sistema-de-providers-llm)
7. [Integração Git Multi-Platform](#integração-git-multi-platform)
8. [Fases de Desenvolvimento](#fases-de-desenvolvimento)
9. [Stack Tecnológica](#stack-tecnológica)
10. [Configuração do Usuário](#configuração-do-usuário)
11. [Estrutura de Pastas](#estrutura-de-pastas)
12. [Riscos e Mitigações](#riscos-e-mitigações)

---

## Visão Geral

O **Patcha** é uma ferramenta de linha de comando (CLI) que automatiza a detecção e resolução de vulnerabilidades em projetos Node.js. Diferente das ferramentas existentes, ele utiliza **inteligência artificial** para resolver os casos que `npm audit fix` não consegue — como conflitos de dependências transitivas, breaking changes em major versions, e substituição de bibliotecas abandonadas.

### Produto 1 vs. Produto 2

| Aspecto | Produto 1 (CLI) | Produto 2 (Enterprise) |
|---|---|---|
| **Documento** | Este (`01-idea.md`) | `03-plano-enterprise.md` |
| **Tipo** | Ferramenta de terminal | Plataforma web |
| **Modelo** | Open-source, gratuito | Pago (SaaS/self-hosted) |
| **Quando** | **Agora** | Futuro |
| **Resolve** | Problema técnico | Problema organizacional |
| **Features** | Scan, fix, IA, MRs | Dashboard, compliance, SSO, audit logs |

O Produto 2 (Enterprise) **usará o core do Produto 1 como biblioteca**. Por isso, a arquitetura do CLI é desenhada para ser consumida programaticamente no futuro.

### Para quem é

- Equipes de desenvolvimento com **múltiplos projetos Node.js** (5+)
- Empresas que precisam manter **compliance de segurança** (SOC2, ISO 27001, PCI-DSS)
- Times que usam **GitLab** ou outras plataformas onde Dependabot não funciona bem
- Desenvolvedores que perdem tempo resolvendo vulnerabilidades manualmente

### O que faz

1. **Escaneia** `package.json` e `package-lock.json` para identificar vulnerabilidades
2. **Resolve automaticamente** os casos simples (patch/minor updates)
3. **Usa IA** para analisar e sugerir soluções para casos complexos
4. **Cria Merge Requests** automaticamente na plataforma Git configurada
5. **Suporta múltiplos projetos** via arquivo de configuração

---

## O Problema

### O que existe hoje

| Ferramenta | O que faz | Limitação |
|---|---|---|
| `npm audit` | Lista vulnerabilidades | Não resolve, só reporta |
| `npm audit fix` | Aplica fixes automáticos | Só resolve ~60-70% dos casos (patch/minor) |
| `npm audit fix --force` | Força major updates | Pode quebrar o projeto, não analisa impacto |
| Dependabot | Cria PRs automáticos | Não funciona bem no GitLab, não resolve conflitos |
| Snyk | Análise profunda + fixes | Caro ($99/dev/mês), não usa IA para casos complexos |
| Renovate | Atualiza dependências | Não foca em segurança, só em atualizações |

### Os 5 níveis de complexidade de vulnerabilidades

| Nível | Descrição | Exemplo | Resolvível por npm audit fix? |
|---|---|---|---|
| 1 | Patch disponível dentro do semver | `lodash` 4.17.20 → 4.17.21 | Sim |
| 2 | Minor update dentro do semver | `express` 4.17.0 → 4.18.0 | Sim |
| 3 | Major version necessário | `express` 3.x → 4.x (breaking changes) | Não |
| 4 | Dependência transitiva vulnerável | `meu-app` → `lib-a` → `lib-vulneravel` | Não |
| 5 | Sem fix disponível / lib abandonada | Vulnerabilidade sem patch, precisa trocar de lib | Não |

**O Patcha resolve os níveis 1-5**, usando IA para os casos 3, 4 e 5 onde ferramentas tradicionais falham.

### Por que a IA agrega valor

Nos casos complexos (níveis 3-5), a IA pode:

- **Analisar changelogs** e identificar breaking changes entre versões
- **Sugerir overrides** no `package.json` para dependências transitivas
- **Recomendar bibliotecas alternativas** quando não há fix disponível
- **Avaliar o risco** de cada estratégia de resolução
- **Gerar código de migração** quando APIs mudaram

---

## A Solução

### Fluxo de Execução

```
┌─────────────────────────────────────────────────────────────────┐
│                         patcha scan                     │
└─────────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────┐
│  1. SCANNER MODULE                                               │
│     ├── Lê package.json + package-lock.json                      │
│     ├── Constrói árvore de dependências (@npmcli/arborist)       │
│     └── Consulta npm audit advisory database                     │
└─────────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────┐
│  2. RESOLUTION ENGINE                                            │
│     │                                                            │
│     ├── Nível 1: Auto-fix (semver-compatible)                    │
│     │   └── Aplica npm audit fix para patch/minor                │
│     │                                                            │
│     ├── Nível 2: Smart Upgrade (major bumps)                     │
│     │   └── Analisa breaking changes, aplica se seguro           │
│     │                                                            │
│     └── Nível 3: LLM-Assisted Resolution                         │
│         ├── Envia contexto ao provider de LLM configurado        │
│         ├── Recebe sugestão: upgrade, override, ou substituição  │
│         └── Usuário aprova/rejeita (modo interativo) ou auto     │
└─────────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────┐
│  3. REPORTER                                                     │
│     ├── Gera relatório formatado (terminal, JSON, markdown)      │
│     ├── Lista vulnerabilidades resolvidas e pendentes            │
│     └── Mostra ações tomadas e riscos identificados              │
└─────────────────────────────────────────────────────────────────┘
                                │
                                ▼ (opcional, se --push ou --mr)
┌─────────────────────────────────────────────────────────────────┐
│  4. GIT PLATFORM INTEGRATION                                     │
│     ├── Commit das mudanças em branch separada                   │
│     ├── Push para remote                                         │
│     └── Cria Merge Request / Pull Request automaticamente        │
└─────────────────────────────────────────────────────────────────┘
```

---

## Arquitetura

### Diagrama de Módulos

```
┌─────────────────────────────────────────────────────────────────────┐
│                        Patcha CLI                           │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────────────┐   │
│  │   Scanner    │  │  Resolution  │  │      LLM Service          │   │
│  │   Module     │  │    Engine    │  │  (Provider Abstraction)   │   │
│  └──────┬───────┘  └──────┬───────┘  └────────────┬─────────────┘   │
│         │                 │                        │                 │
│         │                 │          ┌─────────────┴──────────────┐  │
│         │                 │          │    Provider Registry       │  │
│         │                 │          ├────────────────────────────┤  │
│         │                 │          │ ┌─────────┐ ┌───────────┐  │  │
│         │                 │          │ │HuggingFace│ │  Gemini  │  │  │
│         │                 │          │ └─────────┘ └───────────┘  │  │
│         │                 │          │ ┌─────────┐ ┌───────────┐  │  │
│         │                 │          │ │ OpenAI  │ │  Ollama   │  │  │
│         │                 │          │ └─────────┘ └───────────┘  │  │
│         │                 │          └────────────────────────────┘  │
│         │                 │                                          │
│  ┌──────┴─────────────────┴──────────────────────────────────────┐  │
│  │                      Core Services                             │  │
│  ├────────────────────────────────────────────────────────────────┤  │
│  │  Config │ Logger │ Cache │ Reporter │ Git Platform Service     │  │
│  └────────────────────────────────────────────────────────────────┘  │
│                                                                      │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Design do Core como Biblioteca

### Por Que Isso Importa

O CLI é o **Produto 1**, mas no futuro o **Produto 2 (Enterprise)** vai precisar do mesmo motor de scan e resolução. Para evitar reescrever código, o core é desenhado como uma **biblioteca independente** que não sabe que está sendo usada por um CLI.

### O Princípio

```
┌─────────────────────────────────────────────────────────────────┐
│                        QUEM CONSOME                              │
│                                                                  │
│   Agora:                          Futuro (Enterprise):           │
│   ┌──────────┐                   ┌──────────────┐               │
│   │   CLI    │                   │  Backend API │               │
│   │ (terminal│                   │  (Fastify)   │               │
│   │ commands)│                   ├──────────────┤               │
│   └────┬─────┘                   │   Workers    │               │
│        │                         │  (BullMQ)    │               │
│        │                         └──────┬───────┘               │
│        │                                │                        │
│        └──────────┬─────────────────────┘                        │
│                   │                                              │
│                   ▼                                              │
│   ┌──────────────────────────────────────────────────────────┐  │
│   │                    CORE (Biblioteca)                       │  │
│   │                                                            │  │
│   │   Scanner  │  Resolver  │  LLMService  │  GitService      │  │
│   │                                                            │  │
│   │   → Não sabe quem está chamando                           │  │
│   │   → Não faz console.log                                    │  │
│   │   → Não lê argv (argumentos de linha de comando)          │  │
│   │   → Só recebe dados, processa, retorna resultado          │  │
│   └──────────────────────────────────────────────────────────┘  │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### Regra de Separação

| O core PODE ter | O core NÃO PODE ter |
|---|---|
| Lógica de scan | `console.log` / `console.table` |
| Lógica de resolução | `process.argv` |
| Chamadas a APIs de LLM | `import { Command } from 'commander'` |
| Chamadas a APIs do Git | `ora()` / spinners / prompts |
| Tipos e interfaces | Formatação de output para terminal |
| Tratamento de erros (throw) | `process.exit()` |

### Teste Mental

> **Se eu deletar toda a pasta `src/cli/`, o core (`src/core/` e `src/providers/`) ainda compila sem erros?**

Se sim, a separação está correta.

### Exemplo Prático

**O core (biblioteca pura):**

```typescript
// src/core/scanner/index.ts
// → NÃO tem nenhum import de CLI, terminal, ou console

export class Scanner {
  constructor(private config: ScannerConfig) {}

  async scan(projectPath: string): Promise<ScanResult> {
    const deps = await this.parseDependencies(projectPath);
    const advisories = await this.fetchAdvisories(deps);
    
    return {
      projectPath,
      totalDependencies: deps.length,
      vulnerabilities: advisories,
      scannedAt: new Date(),
    };
  }
}
```

**O CLI (camada fina que usa o core):**

```typescript
// src/cli/commands/scan.ts
// → Só orquestra: pega input do terminal, chama core, mostra output

import { Scanner } from '../../core/scanner';
import { Reporter } from '../ui/reporter';

export async function scanCommand(options: ScanOptions) {
  const spinner = ora('Escaneando projeto...').start();
  
  const scanner = new Scanner(config);
  const result = await scanner.scan(options.path);
  
  spinner.stop();
  Reporter.printScanResult(result);
}
```

**O enterprise (no futuro, usa o MESMO core):**

```typescript
// enterprise/api/routes/scan.ts
import { Scanner, Resolver } from 'patcha'; // npm package

export async function scanEndpoint(req: Request, res: Response) {
  const scanner = new Scanner(config);
  const result = await scanner.scan(req.body.projectPath);
  
  await db.scanResults.create({ data: result });
  res.json(result);
}
```

### Publicação como Package

Com o core separado, o package pode ser usado de duas formas:

```json
{
  "name": "patcha",
  "bin": {
    "patcha": "./dist/cli/index.js"
  },
  "exports": {
    ".": "./dist/core/index.js",
    "./scanner": "./dist/core/scanner/index.js",
    "./resolver": "./dist/core/resolver/index.js",
    "./providers/llm": "./dist/providers/llm/index.js",
    "./providers/git": "./dist/providers/git/index.js"
  }
}
```

- **Como CLI**: `npx patcha scan`
- **Como biblioteca**: `import { Scanner } from 'patcha'`

---

## Sistema de Providers LLM

O sistema de LLM é **extensível por design**. Qualquer provider pode ser adicionado implementando uma interface padrão, sem modificar o código core.

### Interface do Provider

```typescript
interface LLMProvider {
  // Identificação única do provider
  readonly name: string;

  // Verifica se o provider está configurado (API key presente, etc.)
  isAvailable(): Promise<boolean>;

  // Verifica se o provider está respondendo (health check)
  healthCheck(): Promise<boolean>;

  // Executa a análise de vulnerabilidade
  analyze(context: VulnerabilityContext): Promise<AnalysisResult>;
}
```

### Input Padronizado (VulnerabilityContext)

```typescript
interface VulnerabilityContext {
  // Informações da vulnerabilidade
  vulnerability: {
    id: string;              // CVE-2024-xxxxx
    severity: 'critical' | 'high' | 'medium' | 'low';
    title: string;
    description: string;
    affectedPackage: string;
    affectedVersionRange: string;
    patchedVersion?: string;
    references: string[];    // links para advisories
  };

  // Caminho na árvore de dependências
  dependencyPath: string[];  // ["meu-app", "express", "qs"]
  isDirect: boolean;         // true se é dependência direta

  // Versões
  currentVersion: string;
  availableVersions: string[];
  latestVersion: string;

  // Contexto adicional (opcional, enriquece a análise)
  changelog?: string;        // changelog entre versões
  codeUsage?: string[];      // trechos do código que usam a lib
  projectContext?: {
    nodeVersion: string;
    hasTests: boolean;
    framework?: string;      // express, nestjs, fastify, etc.
  };
}
```

### Output Padronizado (AnalysisResult)

```typescript
interface AnalysisResult {
  // Estratégia recomendada
  strategy: 'upgrade' | 'override' | 'replace' | 'patch' | 'ignore' | 'manual';

  // Nível de confiança da sugestão (0.0 a 1.0)
  confidence: number;

  // Ação específica a ser tomada
  action: {
    type: 'upgrade' | 'override' | 'replace';
    package: string;
    fromVersion: string;
    toVersion?: string;
    replacement?: {
      package: string;
      version: string;
      migrationNotes?: string;
    };
    override?: {
      [dependency: string]: string;  // formato do package.json overrides
    };
  };

  // Explicação legível para o usuário
  reasoning: string;

  // Análise de impacto
  impact: {
    breakingChanges: string[];
    riskLevel: 'low' | 'medium' | 'high';
    testsRecommended: boolean;
    manualReviewRequired: boolean;
  };
}
```

### Registry e Service

```typescript
// Registry para providers registrados
class ProviderRegistry {
  private providers: Map<string, LLMProvider> = new Map();

  register(provider: LLMProvider): void;
  get(name: string): LLMProvider | undefined;
  list(): string[];
  has(name: string): boolean;
}

// Service que orquestra a cadeia de fallback
class LLMService {
  constructor(
    private registry: ProviderRegistry,
    private config: LLMConfig
  ) {}

  async analyze(context: VulnerabilityContext): Promise<AnalysisResult> {
    for (const providerName of this.config.chain) {
      const provider = this.registry.get(providerName);
      
      if (!provider || !(await provider.isAvailable())) {
        continue;
      }

      try {
        return await provider.analyze(context);
      } catch (error) {
        continue;
      }
    }

    return this.noAIFallback(context);
  }
}
```

### Cadeia de Fallback

```
┌─────────────────────────────────────────────────────────────────┐
│                    Configuração do Usuário                       │
│                                                                  │
│  chain: ["openai", "huggingface", "gemini"]                     │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│  1. OpenAI (se configurado)                                      │
│     ├── API key presente? → Tenta usar                          │
│     └── Créditos acabaram ou erro? → Fallback                   │
└─────────────────────────────────────────────────────────────────┘
                              │ fallback
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│  2. Hugging Face (free tier)                                     │
│     ├── Rate limit ok? → Usa                                    │
│     └── Rate limit atingido? → Fallback                         │
└─────────────────────────────────────────────────────────────────┘
                              │ fallback
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│  3. Gemini (free tier)                                           │
│     ├── Rate limit ok? → Usa                                    │
│     └── Tudo falhou? → Fallback sem IA                          │
└─────────────────────────────────────────────────────────────────┘
                              │ fallback
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│  4. Sem IA                                                       │
│     └── Retorna sugestão básica baseada em heurísticas          │
└─────────────────────────────────────────────────────────────────┘
```

### Adicionando um Novo Provider

Para adicionar suporte a um novo LLM (ex: Anthropic Claude), basta:

1. Criar o arquivo `src/providers/llm/anthropic.provider.ts`
2. Implementar a interface `LLMProvider`
3. Registrar no bootstrap da aplicação

```typescript
// src/providers/llm/anthropic.provider.ts
export class AnthropicProvider implements LLMProvider {
  readonly name = 'anthropic';

  constructor(private config: AnthropicConfig) {}

  async isAvailable(): Promise<boolean> {
    return !!this.config.apiKey;
  }

  async healthCheck(): Promise<boolean> {
    // implementação
  }

  async analyze(context: VulnerabilityContext): Promise<AnalysisResult> {
    // chamada para API da Anthropic
    // normaliza resposta para AnalysisResult
  }
}

// No bootstrap
registry.register(new AnthropicProvider(config.anthropic));
```

---

## Integração Git Multi-Platform

Similar ao sistema de LLM, a integração com plataformas Git é **extensível**.

### Interface do Provider Git

```typescript
interface GitPlatformProvider {
  readonly name: string;  // 'gitlab' | 'github' | 'bitbucket'

  // Autenticação
  isAuthenticated(): Promise<boolean>;

  // Operações de branch
  createBranch(repo: string, branchName: string, baseBranch: string): Promise<void>;
  pushBranch(repo: string, branchName: string): Promise<void>;

  // Merge/Pull Request
  createMergeRequest(options: MergeRequestOptions): Promise<MergeRequestResult>;
  commentOnMergeRequest(mrId: string, comment: string): Promise<void>;

  // CI/CD
  getPipelineStatus(mrId: string): Promise<PipelineStatus>;
  waitForPipeline(mrId: string, timeout: number): Promise<PipelineResult>;
}

interface MergeRequestOptions {
  repo: string;
  sourceBranch: string;
  targetBranch: string;
  title: string;
  description: string;
  labels?: string[];
  assignees?: string[];
  autoMerge?: boolean;
}
```

### Providers Planejados

| Provider | Prioridade | SDK |
|---|---|---|
| GitLab | Alta (implementação inicial) | `@gitbeaker/rest` |
| GitHub | Média | `@octokit/rest` |
| Bitbucket | Baixa (futuro) | `bitbucket` |

---

## Fases de Desenvolvimento

### Fase 1 — MVP (~4-5 semanas)

**Objetivo**: CLI funcional com scanner, auto-fix e integração com LLM.

| Semana | Entregáveis |
|---|---|
| 1 | Setup do projeto (TypeScript, ESLint, estrutura de pastas), CLI básico com commander |
| 2 | Scanner module: leitura de package.json/lock, integração com @npmcli/arborist, npm audit |
| 3 | Resolution Engine nível 1 e 2: auto-fix semver-compatible, análise de major bumps |
| 4 | Sistema de providers LLM: interface, registry, implementação HuggingFace + Gemini |
| 5 | Integração completa, testes, documentação, polish do CLI |

**Comandos disponíveis no MVP**:
```bash
patcha scan [path]          # escaneia um projeto
patcha scan --all [dir]     # escaneia múltiplos projetos
patcha fix [path]           # aplica fixes automáticos
patcha fix --ai [path]      # fixes com assistência de IA
patcha config               # gerencia configuração
```

### Fase 2 — Git Platform Integration (~2-3 semanas)

**Objetivo**: Criar MRs/PRs automaticamente e integrar com CI/CD.

| Semana | Entregáveis |
|---|---|
| 1 | Interface GitPlatformProvider, implementação GitLab |
| 2 | Fluxo completo: branch → commit → push → MR → aguarda CI |
| 3 | Implementação GitHub, testes de integração, documentação |

**Novos comandos**:
```bash
patcha fix --mr             # fix + cria MR automaticamente
patcha fix --mr --auto-merge # fix + MR + merge se CI passar
```

### Visão de Futuro

Após as Fases 1 e 2, o CLI estará completo como **Produto 1**. O **Produto 2 (Enterprise)** será desenvolvido separadamente, usando o core do CLI como biblioteca. Veja [03-plano-enterprise.md](./03-plano-enterprise.md) para detalhes da plataforma enterprise.

---

## Stack Tecnológica

| Componente | Tecnologia | Justificativa |
|---|---|---|
| Linguagem | TypeScript | Type safety, melhor DX, ecossistema Node.js |
| Runtime | Node.js 20+ | LTS, suporte a ESM nativo |
| CLI Framework | `commander` | Simples, maduro, amplamente usado |
| Parsing de deps | `@npmcli/arborist` | Mesma lib que o npm usa internamente |
| Advisory data | npm audit JSON API | Fonte primária, gratuita, atualizada |
| HTTP client | `undici` ou `fetch` | Nativo no Node 18+, performático |
| LLM - HuggingFace | `@huggingface/inference` | SDK oficial |
| LLM - Gemini | `@google/generative-ai` | SDK oficial |
| LLM - OpenAI | `openai` | SDK oficial |
| Git - GitLab | `@gitbeaker/rest` | SDK completo e bem mantido |
| Git - GitHub | `@octokit/rest` | SDK oficial |
| Config | `cosmiconfig` | Padrão para config em projetos JS |
| Logging | `pino` | Rápido, estruturado, baixo overhead |
| Testes | `vitest` | Rápido, compatível com Jest, ESM nativo |

---

## Configuração do Usuário

O CLI busca configuração em ordem de prioridade:

1. Argumentos de linha de comando
2. Variáveis de ambiente (prefixo `PATCHA_`)
3. Arquivo `.patcha.yml` ou `.patcha.json` no projeto
4. Arquivo `~/.config/patcha/config.yml` (global)

### Exemplo de `.patcha.yml`

```yaml
# Configuração de providers LLM
llm:
  # Cadeia de fallback (ordem de prioridade)
  chain:
    - huggingface
    - gemini
  
  # Configuração por provider
  providers:
    huggingface:
      model: meta-llama/Llama-3.1-8B-Instruct
      apiKey: ${HF_TOKEN}  # variável de ambiente
    
    gemini:
      model: gemini-pro
      apiKey: ${GEMINI_API_KEY}
    
    openai:  # opcional, se quiser usar provider pago
      model: gpt-4o-mini
      apiKey: ${OPENAI_API_KEY}

# Configuração da plataforma Git
git:
  platform: gitlab  # gitlab | github | bitbucket
  
  gitlab:
    host: https://gitlab.com  # ou self-hosted
    token: ${GITLAB_TOKEN}
    defaultBranch: main
    mrLabels:
      - security
      - dependencies

# Configuração de scan
scan:
  # Severidades a considerar
  severities:
    - critical
    - high
    - medium  # comentar para ignorar medium/low
    # - low
  
  # Ignorar vulnerabilidades específicas
  ignore:
    - CVE-2023-xxxxx  # falso positivo conhecido
  
  # Timeout para análise de IA (ms)
  aiTimeout: 30000

# Multi-projeto (limite de 5 no free, ilimitado no enterprise)
projects:
  - path: ./api
    name: backend-api
  - path: ./web
    name: frontend-web
  - path: ./workers
    name: background-workers

# Comportamento de fix
fix:
  # Aplicar fixes de nível 1 automaticamente sem confirmação
  autoApplyLevel1: true
  
  # Criar branch separada para fixes
  createBranch: true
  branchPrefix: fix/security-
  
  # Commit message template
  commitTemplate: "fix(security): resolve {count} vulnerabilities"

# Output
output:
  format: terminal  # terminal | json | markdown
  verbose: false
  colors: true
```

---

## Estrutura de Pastas

```
patcha/
├── src/
│   ├── index.ts                 # Entry point (exporta core como biblioteca)
│   │
│   ├── cli/                     # CLI (consumidor do core)
│   │   ├── index.ts             # Setup do commander
│   │   ├── commands/
│   │   │   ├── scan.ts          # comando scan
│   │   │   ├── fix.ts           # comando fix
│   │   │   └── config.ts        # comando config
│   │   └── ui/
│   │       ├── spinner.ts       # loading indicators
│   │       ├── prompts.ts       # confirmações interativas
│   │       └── reporter.ts      # output formatado
│   │
│   ├── core/                    # CORE (biblioteca pura - NÃO depende do CLI)
│   │   ├── scanner/
│   │   │   ├── index.ts         # Scanner principal
│   │   │   ├── arborist.ts      # Wrapper do @npmcli/arborist
│   │   │   └── audit.ts         # Integração com npm audit
│   │   │
│   │   ├── resolver/
│   │   │   ├── index.ts         # Resolution Engine
│   │   │   ├── level1.ts        # Auto-fix (semver-compatible)
│   │   │   ├── level2.ts        # Smart upgrade (major)
│   │   │   └── level3.ts        # LLM-assisted
│   │   │
│   │   └── analyzer/
│   │       ├── changelog.ts     # Parser de changelogs
│   │       ├── breaking.ts      # Detector de breaking changes
│   │       └── usage.ts         # Análise de uso no código
│   │
│   ├── providers/               # PROVIDERS (também biblioteca)
│   │   ├── llm/
│   │   │   ├── interface.ts     # LLMProvider interface
│   │   │   ├── registry.ts      # ProviderRegistry
│   │   │   ├── service.ts       # LLMService (orquestrador)
│   │   │   ├── huggingface.ts   # HuggingFace provider
│   │   │   ├── gemini.ts        # Gemini provider
│   │   │   └── openai.ts        # OpenAI provider
│   │   │
│   │   └── git/
│   │       ├── interface.ts     # GitPlatformProvider interface
│   │       ├── service.ts       # GitService (orquestrador)
│   │       ├── gitlab.ts        # GitLab provider
│   │       └── github.ts        # GitHub provider
│   │
│   ├── config/                  # CONFIG (compartilhado)
│   │   ├── index.ts             # Loader de configuração
│   │   ├── schema.ts            # Validação de config
│   │   └── defaults.ts          # Valores padrão
│   │
│   ├── utils/                   # UTILS (compartilhado)
│   │   ├── logger.ts            # Logging com pino
│   │   ├── cache.ts             # Cache de advisories
│   │   └── semver.ts            # Helpers de semver
│   │
│   └── types/                   # TIPOS (compartilhado)
│       ├── vulnerability.ts     # VulnerabilityContext, etc.
│       ├── analysis.ts          # AnalysisResult, etc.
│       └── config.ts            # Tipos de configuração
│
├── tests/
│   ├── unit/
│   ├── integration/
│   └── fixtures/                # package.json de teste
│
├── specs/
│   ├── 00-idea.md               # Este documento (CLI)
│   ├── 01-analise-mercado.md    # Análise de potencial de negócio
│   └── 03-plano-enterprise.md   # Plano do Produto 2 (Enterprise)
│
├── package.json
├── tsconfig.json
├── vitest.config.ts
├── .eslintrc.js
└── README.md
```

---

## Riscos e Mitigações

| Risco | Probabilidade | Impacto | Mitigação |
|---|---|---|---|
| IA sugere fix que quebra o projeto | Média | Alto | Sempre rodar testes via CI antes de merge; flag `--dry-run`; confirmação interativa |
| Alucinação do LLM sobre libs alternativas | Média | Médio | Validar que a lib sugerida existe no npm e tem manutenção ativa |
| Rate limiting dos providers free | Alta | Baixo | Cadeia de fallback, cache de respostas similares |
| Dependência transitiva muito profunda | Baixa | Alto | Usar `overrides` do npm/pnpm; sugerir fork se necessário |
| npm/GitHub lança feature similar | Média | Alto | Foco em multi-platform (GitLab/Bitbucket), features avançadas |
| Complexidade do merge de configs | Média | Médio | Usar `cosmiconfig` que já resolve isso bem |
| Performance em monorepos grandes | Média | Médio | Processamento paralelo, cache agressivo, modo incremental |

---

## Próximos Passos

1. **Setup inicial do projeto** (npm init, TypeScript, ESLint, estrutura de pastas)
2. **Implementar Scanner Module** como primeiro entregável
3. **Validar conceito** escaneando projetos reais
4. **Implementar Resolution Engine** (níveis 1, 2, 3)
5. **Implementar providers LLM** (HuggingFace + Gemini)
6. **Fase 2**: Git Platform Integration

---

*Documento criado em: Março/2026*
*Última atualização: Março/2026*
