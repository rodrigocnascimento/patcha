# Plano Enterprise — Patcha

> Detalhamento do produto pago: o que é, como funciona, e por que empresas pagam por isso.

**Este documento descreve o Produto 2: a plataforma enterprise.** Para o Produto 1 (CLI open-source), veja [01-idea.md](./01-idea.md).

---

## Pré-requisito: Produto 1 (CLI)

O Enterprise **não existe sem o CLI**. A plataforma usa o core do CLI como biblioteca:

```
┌─────────────────────────────────────────────────────────────────┐
│                     PRODUTO 2: ENTERPRISE                        │
│   ┌───────────────────────────────────────────────────────────┐ │
│   │  Dashboard │ API │ Workers │ Auth │ Audit │ Compliance    │ │
│   └───────────────────────────────────────────────────────────┘ │
│                              │                                   │
│                              │ import { Scanner, Resolver }      │
│                              │ from 'patcha'            │
│                              ▼                                   │
│   ┌───────────────────────────────────────────────────────────┐ │
│   │           PRODUTO 1: CLI CORE (Open-Source)               │ │
│   │   Scanner │ Resolver │ LLM Providers │ Git Providers      │ │
│   └───────────────────────────────────────────────────────────┘ │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

**Ordem de desenvolvimento:**
1. Primeiro: CLI (Produto 1) — descrito em `01-idea.md`
2. Depois: Enterprise (Produto 2) — este documento

---

## Índice

1. [A Diferença Fundamental](#a-diferença-fundamental)
2. [O Que o Usuário Enterprise Vê](#o-que-o-usuário-enterprise-vê)
3. [Features Enterprise Detalhadas](#features-enterprise-detalhadas)
4. [Arquitetura Técnica](#arquitetura-técnica)
5. [Opções de Deploy](#opções-de-deploy)
6. [Pricing e Tiers](#pricing-e-tiers)
7. [Por Que Empresas Pagam](#por-que-empresas-pagam)
8. [Roadmap do Enterprise](#roadmap-do-enterprise)

---

## A Diferença Fundamental

O **free** é um **CLI** (ferramenta de terminal).  
O **enterprise** é uma **plataforma** (serviço web com backend).

```
┌─────────────────────────────────────────────────────────────────┐
│                        FREE (CLI)                                │
│                                                                  │
│  $ patcha scan                                          │
│  $ patcha fix --ai                                      │
│                                                                  │
│  → Roda no terminal do dev                                       │
│  → Resultado na tela e acabou                                    │
│  → Sem estado, sem histórico                                     │
│  → Cada dev roda no seu projeto isoladamente                     │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                     ENTERPRISE (Plataforma)                      │
│                                                                  │
│  → Dashboard web acessível pelo browser                          │
│  → Backend rodando scans periódicos                              │
│  → Banco de dados com histórico                                  │
│  → Visão consolidada de todos os projetos da empresa             │
│  → Gestão de equipe, permissões, workflows                       │
└─────────────────────────────────────────────────────────────────┘
```

**O core é o mesmo.** O enterprise adiciona camadas de gestão, persistência e colaboração em cima do mesmo engine de scan e resolução.

---

## O Que o Usuário Enterprise Vê

### 1. Dashboard Principal

Visão consolidada de todos os projetos da organização:

```
┌─────────────────────────────────────────────────────────────────┐
│  CONFLICT SOLVER ENTERPRISE          Acme Corp    [João ▾]      │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐        │
│  │ 47       │  │ 12       │  │ 8        │  │ 234      │        │
│  │ Projetos │  │ Críticos │  │ Altos    │  │ Resolvidos│        │
│  │          │  │    ⚠️    │  │    ⚡    │  │ este mês  │        │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘        │
│                                                                  │
│  VULNERABILIDADES POR PROJETO                                    │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │ api-gateway          ████████████████  12 critical         │ │
│  │ payment-service      ████████         6 critical           │ │
│  │ user-service         ████             3 high               │ │
│  │ notification-svc     ██               1 high               │ │
│  │ frontend-web         █                0 critical           │ │
│  └────────────────────────────────────────────────────────────┘ │
│                                                                  │
│  TENDÊNCIA (últimos 90 dias)                                     │
│  CVEs abertos: 45 → 20 (▼ 55%)                                  │
│  Tempo médio de resolução: 14 dias → 3 dias (▼ 78%)             │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### 2. Relatório de Compliance

O que o **auditor SOC2/ISO 27001** precisa ver:

```
┌─────────────────────────────────────────────────────────────────┐
│  RELATÓRIO DE COMPLIANCE — Março 2026                           │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  Período: 01/03/2026 — 31/03/2026                               │
│  Projetos cobertos: 47/47 (100%)                                │
│  Scans realizados: 1.410 (diário × 47 projetos)                 │
│                                                                  │
│  VULNERABILIDADES IDENTIFICADAS                234              │
│  ├── Resolvidas automaticamente               189 (80.7%)       │
│  ├── Resolvidas com assistência de IA          31 (13.2%)       │
│  ├── Resolvidas manualmente                    10 (4.3%)        │
│  └── Pendentes (com justificativa)              4 (1.7%)        │
│                                                                  │
│  SLA DE RESOLUÇÃO                                                │
│  ├── Crítico (≤48h):   ✅ 100% dentro do SLA                    │
│  ├── Alto (≤7 dias):   ✅ 98% dentro do SLA                     │
│  ├── Médio (≤30 dias): ✅ 95% dentro do SLA                     │
│  └── Baixo (≤90 dias): ✅ 92% dentro do SLA                     │
│                                                                  │
│  EXCEÇÕES (vulnerabilidades pendentes com justificativa)         │
│  ├── CVE-2026-1234: Aguardando patch upstream (ETA: 15/04)      │
│  ├── CVE-2026-1235: Falso positivo confirmado                   │
│  ├── CVE-2026-1236: Risco aceito (não afeta nosso uso)          │
│  └── CVE-2026-1237: Migração em andamento (MR #4521)            │
│                                                                  │
│  [Exportar PDF]  [Exportar CSV]  [Enviar por email]             │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

**Valor**: Um auditor que recebe esse relatório pronto em vez de planilhas manuais economiza semanas de trabalho. Para empresas em processo de certificação, isso vale milhares de reais.

### 3. Audit Logs

Registro completo de todas as ações — quem fez o quê, quando:

```
┌─────────────────────────────────────────────────────────────────┐
│  AUDIT LOG                                                       │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  2026-03-12 14:23:01  João Silva                                │
│  ✅ Aprovou fix automático para CVE-2026-5678                   │
│  Projeto: api-gateway | MR: !2341 | Merged: sim                 │
│                                                                  │
│  2026-03-12 13:15:22  Sistema (scan automático)                 │
│  🔍 Scan detectou 3 novas vulnerabilidades                      │
│  Projeto: payment-service | Críticas: 1, Altas: 2               │
│                                                                  │
│  2026-03-12 12:00:00  Maria Santos                              │
│  ⚠️ Marcou CVE-2026-1235 como "risco aceito"                    │
│  Justificativa: "Função afetada não é usada no nosso código"    │
│  Aprovado por: Pedro Lima (Security Lead)                       │
│                                                                  │
│  2026-03-12 10:30:15  Sistema (fix automático)                  │
│  🔧 Auto-fix aplicado: lodash 4.17.20 → 4.17.21                 │
│  Projeto: user-service | MR: !2340 | CI: passou                 │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

**Valor**: Para compliance, trilha de auditoria de quem aprovou o quê e quando é **obrigatório** em muitas certificações (SOC2, ISO 27001, PCI-DSS).

### 4. Gestão de Equipe e Permissões

```
┌─────────────────────────────────────────────────────────────────┐
│  EQUIPE E PERMISSÕES                                             │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  Roles:                                                          │
│  ├── Admin: Configura tudo, gerencia equipe                     │
│  ├── Security Lead: Aprova/rejeita riscos, vê audit logs        │
│  ├── Developer: Vê vulnerabilidades, aplica fixes               │
│  └── Viewer: Só leitura (para auditores externos)               │
│                                                                  │
│  Políticas:                                                      │
│  ├── "Críticos devem ser resolvidos em 48h"                     │
│  ├── "Auto-fix nível 1 sem aprovação"                           │
│  ├── "Fix com IA requer aprovação de Security Lead"             │
│  └── "Risco aceito requer 2 aprovações"                         │
│                                                                  │
│  SSO: Conectado via SAML (Okta)                                 │
│  Membros: 23 ativos                                             │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### 5. Scans Agendados e Notificações

```
┌─────────────────────────────────────────────────────────────────┐
│  CONFIGURAÇÃO DE SCANS                                           │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  Frequência: Diário às 06:00 UTC                                │
│  Projetos: Todos (47)                                           │
│  Auto-fix nível 1: ✅ Habilitado                                │
│  Auto-fix nível 2: ⚠️ Requer aprovação                          │
│  Auto-fix nível 3 (IA): ⚠️ Requer aprovação                     │
│                                                                  │
│  NOTIFICAÇÕES                                                    │
│  ├── Slack: #security-alerts (críticos imediatos)               │
│  ├── Email: security-team@acme.com (resumo diário)              │
│  └── PagerDuty: Apenas críticos fora do SLA                     │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## Features Enterprise Detalhadas

### Tabela Comparativa Free vs. Enterprise

| Feature | Free (CLI) | Team | Business | Enterprise |
|---|:---:|:---:|:---:|:---:|
| **Preço** | $0 | $99/mês | $299/mês | $999+/mês |
| Scanner de vulnerabilidades | ✅ | ✅ | ✅ | ✅ |
| Auto-fix (níveis 1-3) | ✅ | ✅ | ✅ | ✅ |
| Integração com LLM | ✅ | ✅ | ✅ | ✅ |
| Criação de MRs/PRs | ✅ | ✅ | ✅ | ✅ |
| **Projetos** | 5 | 20 | 100 | Ilimitado |
| **Dashboard web** | ❌ | ✅ | ✅ | ✅ |
| **Histórico de scans** | ❌ | 30 dias | 1 ano | Ilimitado |
| **Scans agendados** | ❌ | ✅ | ✅ | ✅ |
| **Relatórios de compliance** | ❌ | Básico | Completo | Customizado |
| **Audit logs** | ❌ | ❌ | ✅ | ✅ |
| **SSO / SAML** | ❌ | ❌ | ❌ | ✅ |
| **Roles e permissões** | ❌ | ❌ | ✅ | ✅ |
| **Políticas de SLA** | ❌ | ❌ | ✅ | ✅ |
| **Integrações (Slack, PagerDuty)** | ❌ | ❌ | ✅ | ✅ |
| **API REST** | ❌ | ❌ | ✅ | ✅ |
| **Self-hosted** | N/A | ❌ | ❌ | ✅ |
| **Suporte** | Comunidade | Email | Email + Chat | Dedicado + SLA |

### Detalhamento das Features Enterprise

#### SSO / SAML
- Integração com provedores de identidade: Okta, Azure AD, Google Workspace, OneLogin
- Provisioning automático de usuários (SCIM)
- Logout centralizado
- MFA via provedor de identidade

#### Audit Logs
- Registro de todas as ações na plataforma
- Filtros por usuário, projeto, tipo de ação, período
- Export em JSON/CSV para sistemas de SIEM
- Retenção configurável (1 ano, 3 anos, 7 anos)
- Imutabilidade (logs não podem ser alterados ou deletados)

#### Relatórios de Compliance
- Templates prontos: SOC2, ISO 27001, PCI-DSS, HIPAA
- Evidências automatizadas para controles de segurança
- Métricas de SLA com histórico
- Export em PDF com marca d'água e assinatura digital
- Agendamento de envio automático

#### Políticas e Workflows
- Definição de SLAs por severidade (crítico em 48h, alto em 7 dias, etc.)
- Escalation automático quando SLA está próximo de estourar
- Aprovações em cadeia (ex: dev propõe, security lead aprova)
- Exceções documentadas com justificativa obrigatória

#### Integrações
- **Slack**: Alertas em canais, interações via bot
- **Microsoft Teams**: Equivalente ao Slack
- **PagerDuty**: Alertas críticos fora do SLA
- **Jira**: Criação automática de tickets para vulnerabilidades
- **Webhook genérico**: Para qualquer sistema interno

#### API REST
- Acesso programático a todas as funcionalidades
- Autenticação via API keys ou OAuth
- Rate limiting por tier
- Documentação OpenAPI/Swagger

---

## Arquitetura Técnica

### Visão Geral

```
┌─────────────────────────────────────────────────────────────────┐
│                       ENTERPRISE STACK                           │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌──────────────┐     ┌───────────────┐     ┌──────────────┐    │
│  │   Frontend   │     │  Backend API  │     │   Workers    │    │
│  │   (React)    │────▶│   (Node.js)   │────▶│   (Scans)    │    │
│  └──────────────┘     └───────┬───────┘     └──────┬───────┘    │
│                               │                     │            │
│                    ┌──────────┴──────────┐         │            │
│                    │                     │         │            │
│              ┌─────▼─────┐        ┌──────▼─────────▼──┐         │
│              │ PostgreSQL│        │      Redis        │         │
│              │  (dados)  │        │  (filas/cache)    │         │
│              └───────────┘        └───────────────────┘         │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### Componentes

| Componente | Tecnologia | Função |
|---|---|---|
| **Frontend** | React + TypeScript | Dashboard web, visualizações, configurações |
| **Backend API** | Node.js + Fastify | REST API, autenticação, autorização, lógica de negócio |
| **Workers** | Node.js + BullMQ | Execução de scans agendados, processamento assíncrono |
| **Banco de dados** | PostgreSQL | Dados estruturados, histórico, audit logs |
| **Cache/Filas** | Redis | Cache de resultados, filas de jobs, sessões |
| **Storage** | S3/MinIO | Armazenamento de relatórios PDF, exports |

### Relação com o Core Open-Source (Produto 1)

O enterprise **importa o CLI como dependência npm**:

```typescript
// enterprise/package.json
{
  "dependencies": {
    "patcha": "^1.0.0"  // o CLI publicado como package
  }
}

// enterprise/workers/scan-job.ts
import { Scanner, Resolver, LLMService } from 'patcha';

export async function executeScan(projectPath: string) {
  const scanner = new Scanner(config);
  const resolver = new Resolver(llmService, resolverConfig);
  
  const scanResult = await scanner.scan(projectPath);
  const resolutionPlan = await resolver.resolve(scanResult);
  
  // Enterprise adiciona: persistência, notificações, audit log
  await db.scans.create({ data: scanResult });
  await db.resolutions.create({ data: resolutionPlan });
  await auditLog.record('scan_completed', { projectPath });
  await notifications.send(resolutionPlan);
  
  return resolutionPlan;
}
```

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                  │
│   ENTERPRISE PLATFORM (Produto 2)                                │
│   ┌───────────────────────────────────────────────────────────┐ │
│   │  Dashboard │ API │ Workers │ Auth │ Audit │ Compliance    │ │
│   └───────────────────────────────────────────────────────────┘ │
│                              │                                   │
│                              │ import from 'patcha'     │
│                              ▼                                   │
│   ┌───────────────────────────────────────────────────────────┐ │
│   │              CONFLICT-SOLVER CORE (Produto 1)             │ │
│   │   Scanner │ Resolver │ LLM Providers │ Git Providers      │ │
│   └───────────────────────────────────────────────────────────┘ │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

O **core** (scanner, resolver, providers) é o mesmo código open-source do Produto 1, usado como biblioteca. O enterprise adiciona as camadas de:
- Persistência (banco de dados)
- Autenticação e autorização
- Interface web
- Processamento assíncrono
- Integrações externas

**Importante**: Qualquer melhoria no core do CLI automaticamente beneficia o enterprise. São o mesmo motor.

---

## Opções de Deploy

### SaaS (Hosted)

```
┌─────────────────────────────────────────────────────────────────┐
│                         CLOUD (Nossa infra)                      │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │  patcha.app                                       │  │
│  │  - Multi-tenant                                            │  │
│  │  - Dados isolados por organização                          │  │
│  │  - Backups automáticos                                     │  │
│  │  - Updates automáticos                                     │  │
│  └───────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
                              ▲
                              │ HTTPS
┌─────────────────────────────┴───────────────────────────────────┐
│                        CLIENTE                                   │
│  - Acessa pelo browser                                          │
│  - Não precisa gerenciar infra                                  │
│  - Ideal para: startups, empresas menores                       │
└─────────────────────────────────────────────────────────────────┘
```

**Vantagens**: Zero manutenção, sempre atualizado, menor custo inicial  
**Desvantagens**: Dados fora do controle do cliente

### Self-Hosted

```
┌─────────────────────────────────────────────────────────────────┐
│                      INFRA DO CLIENTE                            │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │  Kubernetes / Docker Compose                               │  │
│  │  - Deploy via Helm chart ou docker-compose                 │  │
│  │  - Dados 100% dentro da rede do cliente                    │  │
│  │  - Cliente controla updates                                │  │
│  │  - Pode customizar configurações                           │  │
│  └───────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
```

**Vantagens**: Dados on-premise, controle total, atende requisitos de segurança rigorosos  
**Desvantagens**: Cliente precisa gerenciar infra, updates manuais

### Hybrid

```
┌─────────────────────────────────────────────────────────────────┐
│                         CLOUD (Nossa infra)                      │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │  Dashboard + API (sem dados sensíveis)                     │  │
│  └───────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
                              ▲
                              │ Metadados apenas
┌─────────────────────────────┴───────────────────────────────────┐
│                      INFRA DO CLIENTE                            │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │  Workers (scans rodam localmente)                          │  │
│  │  - Código fonte nunca sai da rede do cliente               │  │
│  │  - Apenas resultados agregados vão para o dashboard        │  │
│  └───────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
```

**Vantagens**: Melhor dos dois mundos — UX do SaaS, segurança do self-hosted  
**Desvantagens**: Mais complexo de operar

---

## Pricing e Tiers

### Estrutura de Preços

| Tier | Preço | Target | Principais Features |
|---|---|---|---|
| **Free** | $0 | Desenvolvedores individuais, projetos pessoais | CLI completo, 5 projetos |
| **Team** | $99/mês | Times pequenos (5-20 devs) | Dashboard, 20 projetos, scans agendados |
| **Business** | $299/mês | Empresas médias | 100 projetos, compliance, audit logs, API |
| **Enterprise** | $999+/mês | Empresas grandes | Ilimitado, SSO, self-hosted, suporte dedicado |

### Comparativo com Competidores

| Ferramenta | Modelo de Pricing | Preço para time de 20 devs |
|---|---|---|
| **Snyk** | Por desenvolvedor | $99 × 20 = **$1.980/mês** |
| **Socket.dev** | Por desenvolvedor | ~$25 × 20 = **$500/mês** |
| **Patcha (Business)** | Por organização | **$299/mês** (fixo) |

**Nosso diferencial**: Pricing por **organização**, não por desenvolvedor. Muito mais previsível e acessível para times crescendo.

---

## Por Que Empresas Pagam

### A Lógica de Valor

| Necessidade | Dev Individual | Empresa de 50 devs |
|---|---|---|
| Rodar scan e ver resultado | CLI gratuito basta | CLI gratuito basta |
| Ver todos os 47 projetos de uma vez | Não precisa | **Precisa** → Dashboard |
| Provar pro auditor que CVEs são tratados | Não precisa | **Obrigatório** → Compliance |
| Saber quem aprovou cada fix | Não precisa | **Obrigatório** → Audit logs |
| Login único pra equipe | Não precisa | **Precisa** → SSO |
| Garantir que críticos são resolvidos em 48h | Bom senso | **Precisa de evidência** → SLA |
| Scan automático todo dia | Cron job manual | **Precisa gerenciado** → Workers |

### O Padrão

> **O CLI resolve o problema técnico.**  
> **O enterprise resolve o problema organizacional.**

Empresas pagam para resolver problemas organizacionais: compliance, auditoria, gestão de equipe, visibilidade, SLAs.

### ROI para o Cliente

**Cenário**: Empresa com 20 projetos, 1 Security Engineer dedicado a gerenciar vulnerabilidades.

| Sem Patcha | Com Patcha Enterprise |
|---|---|
| 20h/semana em tarefas manuais | 2h/semana revisando sugestões da IA |
| Planilhas para auditor | Relatório automático |
| Sem visibilidade centralizada | Dashboard em tempo real |
| Risco de CVE crítico passar despercebido | Alertas automáticos |

**Economia**: 18h/semana × $50/h = **$3.600/mês** em tempo do Security Engineer.  
**Custo do produto**: $299/mês (tier Business).  
**ROI**: 12x.

---

## Roadmap do Enterprise

> **Pré-requisito**: O CLI (Produto 1) deve estar completo (Fases 1 e 2) antes de iniciar o Enterprise.

### Fase 1: MVP Enterprise (~3-4 semanas)
- Dashboard web básico (React)
- Autenticação simples (email/senha)
- Visualização de múltiplos projetos
- Histórico de scans (30 dias)
- **Meta**: Validar willingness to pay

### Fase 2: Compliance & Teams
- Relatórios de compliance (SOC2, ISO 27001)
- Audit logs completos
- Roles e permissões básicas
- Integrações (Slack, webhook)
- **Meta**: Primeiros clientes Business

### Fase 3: Enterprise Full
- SSO/SAML
- Self-hosted (Helm chart, docker-compose)
- API REST completa
- Políticas e workflows customizáveis
- Suporte dedicado
- **Meta**: Clientes enterprise de grande porte

### Fase 4: Scale
- Multi-região
- SLA 99.9%
- Certificações próprias (SOC2 do produto)
- Partner program (consultorias)

---

*Documento criado em: Março/2026*  
*Última atualização: Março/2026*
