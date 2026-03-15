# Roadmap Completo — Patcha

> Evolução completa do produto, desde o CLI open-source mínimo até a plataforma enterprise madura, incluindo todos os aspectos técnicos, de experiência do usuário e de negócio. Sem cronogramas — apenas sequência lógica de features.

---

## Índice

1. [Fase 0: Fundação](#fase-0-fundação)
2. [Fase 1: CLI Mínimo Viável](#fase-1-cli-mínimo-viável)
3. [Fase 2: CLI Aprimorado com IA](#fase-2-cli-aprimorado-com-ia)
4. [Fase 3: Preparação para Monetização](#fase-3-preparação-para-monetização)
5. [Fase 4: Lançamento do Enterprise](#fase-4-lançamento-do-enterprise)
6. [Fase 5: Crescimento do Enterprise](#fase-5-crescimento-do-enterprise)
7. [Fase 6: Escala e Maturidade](#fase-6-escala-e-maturidade)

---

## Fase 0: Fundação ✅

### Técnico
- [x] Repositório Git inicializado
- [x] Estrutura de pastas definida (src/, tests/, specs/)
- [x] Configuração básica (TypeScript, ESLint, Vitest)
- [x] README inicial com visão do projeto
- [x] Licença definida (Apache 2.0)

### Experiência do Usuário
- [x] Nenhuma (fase de setup interno)

### Negócio
- [x] Definição da visão de produto
- [x] Pesquisa inicial de mercado informal
- [x] Validação do problema com desenvolvedores conhecidos
- [x] Definição do modelo open-core como estratégia

---

## Fase 1: CLI Mínimo Viável ✅

### Técnico
- [x] CLI básico com Commander.js
- [x] Scanner que lê package.json e package-lock.json
- [x] Integração com @npmcli/arborist para árvore de dependências
- [x] Consumo da npm audit JSON API
- [x] Estrutura de dados para vulnerabilidades (CVE, severidade, pacote afetado)
- [x] Output formatado em terminal (cores, tabelas simples)
- [x] Tratamento básico de erros

### Experiência do Usuário
- [x] Comando `patcha scan [path]`
- [x] Output legível no terminal mostrando contagem por severidade
- [x] Código de saída adequado para scripts (0 = sucesso, 1 = vulnerabilidades encontradas)
- [x] Help completo (`--help`)
- [x] Versionamento semântico via `package.json`

### Negócio
- [x] Validação do conceito com 5-10 desenvolvedores externos
- [x] Coleta de feedback sobre dor real e utilidade básica
- [x] Primeiros issues no GitHub de usuários iniciais
- [x] Preparação para lançamento open-source inicial

---

## Fase 2: CLI Aprimorado com IA ✅

### Técnico
- [x] Resolution Engine com 3 níveis:
  - [x] Nível 1: Auto-fix semver-compatível (patch/minor)
  - [x] Nível 2: Análise de breaking changes para major bumps
  - [x] Nível 3: Integração com providers de LLM (HuggingFace free → Gemini free)
- [x] Sistema de providers LLM extensível (interface + registry)
- [x] Cadeia de fallback configurável (provider pago → HF → Gemini → nenhuma IA)
- [x] Context enrichment para LLM (changelog, código afetado, caminho de dependência)
- [x] Cache inteligente de advisories e respostas de LLM
- [x] Suporte a múltiplos projetos via arquivo de configuração
- [x] Criação automática de branch e commit para fixes
- [x] Integração Git multi-plataforma (GitLab prioritária, GitHub)

### Experiência do Usuário
- [x] Novos comandos:
  - [x] `patcha fix [path]` (auto-fix nível 1)
  - [x] `patcha fix --ai [path]` (fix com IA para todos os níveis)
  - [x] `patcha fix --mr` (fix + cria MR automático)
  - [x] `patcha config` (gerencia API keys e preferences)
- [x] Output aprimorado: explicações legíveis das sugestões da IA
- [x] Modo interativo para aprovação/rejeição de sugestões de IA
- [x] Modo não-interativo (--auto) para uso em CI/CD
- [x] Suporte a output em JSON e além do terminal
- [x] Verbose mode para debug

### Negócio
- [ ] Lançamento oficial open-source no npm
- [ ] Primeiros 100 downloads e estrelas no GitHub
- [ ] Posts técnicos em blog explicando como funciona a IA
- [ ] Participação em comunidades (Reddit, Dev.to, Twitter/X)
- [ ] Primeiros contributions externos (bug fixes, documentação)
- [ ] Validação de que a IA resolve casos que `npm audit fix` não resolve
- [ ] Preparação para o primeiro case study de uso real

---

## Fase 3: Preparação para Monetização

### Técnico
- Melhoria significativa na qualidade das sugestões de LLM:
  - Integração com changelogs reais de pacotes
  - Detecção automática de breaking changes via análise semântica
  - Sugestões de bibliotecas alternativas com métricas de adoção
  - Avaliação de risco mais sofisticada (baixo/médio/alto)
- Sistema de políticas configurável:
  - "Auto-aplicar fixes de nível 1 sem confirmação"
  - "Exigir aprovação para fixes de nível 2 e 3"
  - "Exigir 2 aprovações para marcar como risco aceito"
- Histórico local de scans (arquivo JSON oculto no projeto)
- Relatório de export em múltiplos formatos (terminal, JSON, markdown)
- Melhorias significativas na performance (cache paralelos, processamento em batch)
- Suporte a monorepos (Yarn Workspaces, NPM Workspaces, Lerna, Nrwl Nx)
- Integração avançada com CI (comentários em MRs, status checks)
- Suporte a variáveis de ambiente para configuração em CI

### Experiência do Usuário
- Experiência significativamente mais refinada:
  - Wizard interativo para configuração inicial
  - Templates de commit configuráveis (Conventional Commits)
  - Integração nativa com husky/lint-staged se presentes
  - Sugestões de melhoria baseadas em padrões de uso
  - Detalhes de por que uma sugestão foi feita (ex: "Esta atualização evita CVE-2024-XYZ que afeta a função X usada no seu código")
  - Integração com editores via linguagem server (opcional)
- Melhorias na acessibilidade (suporte a leitores de tela no terminal)
- Documentação excelente com exemplos reais
- Guia de migração para equipes vindo de outras ferramentas (Dependabot, Snyk)

### Negócio
- Primeiros case studies públicos com métricas reais:
  - "Redução de 70% no tempo gasto com vulnerabilidades"
  - "3 vulnerabilidades críticas evitadas em 2 meses"
- Início de esforços de conteúdo estratégico:
  - Série de blog posts sobre segurança de dependências
  - Webinars sobre supply chain security
  - Participação em conferências como palestrante
- Construção de lista de e-mails através de conteúdo valioso
- Primeira versão de "página de produto" simples (não é ainda o dashboard enterprise)
- Experimentos com modelos de precificação via pesquisas com usuários
- Identificação de padrões de uso que indicam necessidade de versão paga:
  - Usuários com >5 projetos
  - Usuários que rodam scans diariamente
  - Equipes que pedem funcionalidades de gestão

---

## Fase 4: Lançamento do Enterprise

### Técnico (Base do Produto)
- O CLI continua exatamente como antes (100% backward compatible)
- Todas as melhorias do core beneficiam tanto o CLI quanto o enterprise
- O enterprise é uma aplicação separada que **depende** do CLI como dependência npm

### Técnico (Enterprise Específico)
- Arquitetura separada:
  - Frontend: Vuejs3 + TypeScript
  - Backend API: Node.js + Fastify
  - Workers: Node.js + BullMQ (para scans agendados)
  - Banco de dados: PostgreSQL (dados estruturados, histórico)
  - Cache/Filas: Redis
  - Storage: Cloudflare R2/MinIO (para relatórios PDF, exports)
- Autenticação:
  - Email/senha inicial
  - Preparação para SAML/OIDC (para SSO futuro)
- Autorização básica:
  - Roles: Admin, Developer, Viewer
  - Permissões por projeto
- Funcionalidades core:
  - Dashboard com visão consolidada de todos os projetos
  - Histórico de scans (30 dias inicialmente)
  - Relatórios básicos de vulnerabilidades
  - Criação e gestão de scans agendados
  - Notificações por email básicas
  - API REST para acesso programático
  - Import/export de configuração
  - Suporte a projetos ilimitados (diferente do limite de 5 do CLI free)

### Experiência do Usuário (Enterprise)
- Dashboard principal:
  - Métricas-chave: projetos totais, críticos, altos, resolvidos no mês
  - Lista de projetos com status de vulnerabilidades
  - Tendência temporal (últimos 90 dias)
- Tela de projeto individual:
  - Histórico de scans
  - Detalhes de vulnerabilidades por nível
  - Ações tomadas (auto-fix, IA, manual)
  - Links para MRs/PRs associados
- Tela de configuração:
  - Integração com Git providers (tokens, webhooks)
  - Definição de políticas de SLA
  - Configuração de notificações (email, Slack webhook)
  - Gestão de usuários e roles
- Relatórios:
  - Relatório de vulnerabilidades por projeto
  - Histórico de ações tomadas
  - Export em CSV e JSON
- Suporte básico:
  - Documentação de setup
  - Email de suporte
  - FAQ

### Negócio
- Modelo de precificação inicial:
  - Free: CLI ilimitado (mesmo que antes)
  - Team: $49/mês (até 10 projetos, dashboard básico)
  - Business: $149/mês (projetos ilimitado, relatórios, API)
  - Enterprise: Custom (SSO, self-hosted, SLA)
- Estratégia de lançamento:
  - Convite para usuários power do CLI gratuito
  - Descontos de lançamento para early adopters
  - Programa de referência (desconto por indicação)
- Primeiros esforços de vendas:
  - Outreach para leads identificados no uso do CLI gratuito
  - Demonstrações personalizadas para prospects
  - Case studies com clientes iniciais
- Operações:
  - Processo de faturamento simples (Stripe ou PayPal inicial)
  - Suporte por email com SLA de 24h
  - Métricas básicas de uso e churn
- Legal e compliance:
  - Termos de serviço e política de privacidade básicos
  - Preparação para future compliance (SOC2 tipo 1 planejado)

---

## Fase 5: Crescimento do Enterprise

### Técnico (Base do Produto)
- Melhorias contínuas no core baseadas em uso enterprise:
  - Scanner mais rápido (processamento paralelo agressivo)
  - Providers de LLM mais especializados (modelos fine-tuned para segurança de deps)
  - Melhor detecção de falsos positivos
  - Integração com bancos de dados de vulnerabilidades adicionais (OSV, CVE.org)
  - Suporte a lockfiles de outros gerenciadores (yarn.lock, pnpm-lock.yaml)
  - Análise de uso de código mais profunda (AST parsing para identificar calls afetados)

### Técnico (Enterprise Específico)
- Autenticação avançada:
  - SAML 2.0 (Okta, Azure AD, Google Workspace)
  - OpenID Connect (Auth0, etc.)
  - Provisioning automático de usuários (SCIM)
  - MFA obrigatória para admins
- Autorização sofisticada:
  - Roles customizáveis
  - Políticas de acesso por projeto/equipe/tags
  - Delegação de permissões
  - Sessões com timeout configurável
- Funcionalidades avançadas:
  - Relatórios de compliance prontos (SOC2, ISO 27001, PCI-DSS, HIPAA templates)
  - Audit logs completos (todas as ações, quem, quando, IP)
  - Export de logs para SIEM (Splunk, ELK, Datadog)
  - Políticas de SLA configuráveis por severidade
  - Escalation automático quando SLA está próximo de estourar
  - Aprovações em cadeia (ex: dev → tech lead → security lead)
  - Marcação de riscos aceitos com justificativa obrigatória e revisão periódica
  - Integração com Jira (criação automática de tickets)
  - Integração com Slack/MS Teams (notificações interativas)
  - Webhook genérico para sistemas internos
  - API REST completa com documentação OpenAPI/Swagger
  - Rate limiting e quotas por tier
  - Suporte a self-hosted completo (Helm chart, docker-compose)
  - Opção hybrid (dashboard na nuvem, scans na infra do cliente)
- Performance e escala:
  - Processamento de scans em background com prioridade configurável
  - Cache inteligente de resultados semelhantes
  - Batch processing para grandes organizações
  - Preparação para multi-região
  - Health checks e métricas de Prometheus/Grafana

### Experiência do Usuário (Enterprise)
- Dashboard avançado:
  - Widgets customizáveis
  - Análise de causa raiz para vulnerabilidades recorrentes
  - Heatmap de risco por projeto/equipe/time
  - Previsão de esforço baseado em histórico
  - Benchmarking interno (projetos similares na organização)
- Fluxo de trabalho aprovado:
  - Workflow padrão para tratamento de vulnerabilidades
  - Solicitações de mudança para exceções políticas
  - Revisões periódicas de riscos aceitos
  - Relatórios de tendência para reuniões de segurança
- Experiência do administrador:
  - Painel de administração com métricas de uso
  - Gerenciamento de licenças e uso
  - Análise de adoção por equipe/time
  - Integração com sistemas de providência de acesso (ex: Okta Groups)
- Experiência do desenvolvedor final (que ainda usa o CLI):
  - Melhorias contínuas no CLI que beneficiam todos
  - Integração mais suave com fluxos de trabalho empresariais
  - Notificações mais relevantes (menos ruído, mais sinal)

### Negócio
- Modelo de preços maduro:
  - Free: CLI ilimitado (open-source core)
  - Team: $79/mês (até 25 projetos, dashboard básico, email support)
  - Business: $249/mês (projetos ilimitado, compliance básico, API, chat support)
  - Enterprise: $799+/mês (ILIMITADO, SSO, self-hosted, SLA, dedicated support)
  - Add-ons: Suporte prioritário (+$199/mês), treinamento personalizado
- Estratégia de mercado:
  - Marketing de conteúdo focado em CISOs e VPs de Engenharia
  - Participação ativa em eventos de segurança (RSA, Black Hat local, etc.)
  - Programa de parceiros (consultorias de segurança implementam e revendem)
  - Oferta de prova de conceito (POC) gratuita para empresas médias/grandes
  - Campanhas de ABM (Account-Based Marketing) para contas-alvo
- Operações de negócio:
  - Função de vendas dedicada (inicialmente fundador-led, depois equipe)
  - Equipe de customer success para retenção e expansão
  - Processo de onboarding estruturado
  - Métricas-chave: CAC, LTV, churn mensal, NPS, expansion revenue
  - Previsibilidade de receita melhorada através de contratos anuais
- Desenvolvimento de produto:
  - Ciclo de release regular (a cada 4-6 semanas)
  - Programa de beta para features importantes
  - Inclusão de feedback do enterprise no roadmap do core (beneficia todos)
- Proteção de IP e compliance:
  - Registro de marca
  - Preparação para certificações próprias (SOC2 tipo 2 do produto)
  - Termos de serviço e contrato empresarial maduros
  - Processo de revisão legal e de segurança contínuo

---

## Fase 6: Escala e Maturidade

### Técnico (Base do Produto)
- Core se torna uma biblioteca de segurança de dependências respeitada:
  - Usada por outras ferramentas além do Patcha
  - Contribuições significativas da comunidade
  - Integração com ecossistemas de segurança maiores
  - Suporte a múltiplas linguagens (expansão para Python, Go, etc. como plugins)
- IA evolui para ser mais especializada:
  - Modelos próprios fine-tuned em vulnerabilidades de dependências
  - Integração com fontes de threat intelligence
  - Predição de vulnerabilidades futuras baseado em padrões de código
  - Sugestões de refatoração proativa para eliminar dependências problemáticas
- Integração profunda com o ecossistema de desenvolvedor:
  - GitHub Action oficial
  - GitLab CI template oficial
  - Plugin para IDEs populares (VS Code, JetBrains)
  - Integração com sistemas de feature flagging

### Técnico (Enterprise)
- Plataforma de segurança de dependências completa:
  - Gestão completa do ciclo de vida de vulnerabilidades
  - Integração com SBOM (Software Bill of Materials) generation and validation
  - Análise de licenças de dependências junto com vulnerabilidades
  - Detecção de malware em dependências (quando aplicável)
  - Integração com sistemas de gestão de risco empresarial (GRC)
  - Simulação de impacto de vulnerabilidades antes do fix
  - Workflow de aprovação de novas dependências (como fazem os bancos)
  - Integração com ferramentas de gestão de configuração e CMDB
- Infraestrutura de classe enterprise:
  - Alta disponibilidade (99.9% SLA)
  - Backup e recuperação de desastres
  - Auditorias de segurança regulares (penetration testing, code review)
  - Conformidade com padrões internacionais (ISO 27001, SOC 2 tipo 2, etc.)
  - Suporte a grandes organizações (10.000+ projetos)
  - Arquitetura de microserviços se necessário para escala
  - Observabilidade completa (traces, logs, metrics)

### Experiência do Usuário
- Experiência consumidora e intuitiva:
  - Onboarding guiado para novos usuários
  - Sugestões proativas baseadas em padrões de uso
  - Personalização de dashboard por role
  - Acesso móvel limitado (para visualização de alertas críticos)
  - Integração suave com fluxos de trabalho existentes (não requer mudança de processo)
- Experiência do administrador estratégico:
  - Visão de risco agregada por unidade de negócio
  - Métricas de eficiência do processo de gestão de vulnerabilidades
  - Benchmarking externo (como nos comparamos a pares da indústria)
  - Relatórios executivos prontos para comitês de risco
  - Integração com sistemas de remediação e ticketing existentes
- Experiência do desenvolvedor final:
  - Ferramenta que desaparece em boa parte (funciona tão bem que não se nota)
  - Integração tão suave que parece parte do fluxo de trabalho nativo
  - Confiança total nas sugestões (baixo nível de falsos positivos/negativos)
  - Tempo gasto com segurança de dependências reduzido ao mínimo possível

### Negócio
- Modelo de negócio maduro e escalável:
  - Margens brutas de 85%+ (software puro)
  - Taxa de churn anual <5% para enterprise
  - Expansão de receita existente >120% ano a ano (upsell + cross-sell)
  - Ciclo de vendas previsível e repetível
  - Marca reconhecida no segmento de segurança de aplicações
  - Presença global com suporte em múltiplos fusos horários
  - Ecossistema de parceiros consolidado (SIEs, VARs, consultorias)
  - Roadmap público e transparente para clientes
  - Programa de advocacy de clientes (referências, case studies, eventos)
- Impacto de negócio comprovado:
  - Estudos de caso com ROI documentado (muitas vezes >10x)
  - Redução documentada no mean time to remediate (MTTR)
  - Melhoria em auditorias de segurança (menos achados, menos tempo gasto)
  - Habilitação de novos mercados (contratos governamentais que exigem certos níveis de segurança)
  - Posicionamento como líder de pensamento em segurança de cadeia de suprimentos

---

## Princípios que Guiam Toda a Evolução

### Técnico
1. **Separação de preocupações clara**: CLI, core, enterprise sempre bem definidos
2. **Backward compatibility sagrada**: Nenhuma quebra intencional para usuários existentes
3. **Extensibilidade por design**: Qualquer nova capacidade pode ser adicionada via plugin/provider
4. **Qualidade antes de velocidade**: Melhor fazer menos coisas bem do que muitas coisas mal
5. **Dogfooding rigoroso**: A equipe usa o próprio produto dia a dia

### Experiência do Usuário
1. **Respeito ao fluxo de trabalho do desenvolvedor**: Nunca força mudança de hábitos desnecessária
2. **Progressive disclosure**: Mostra apenas o que é necessário naquele momento
3. **Consistência em todos os touchpoints**: CLI, dashboard, API, notificações seguem mesmos padrões
4. **Acesso como direito básico**: Funcionalidades essenciais nunca ficam atrás de paywall desnecessário
5. **Empoderamento através da educação**: Ajuda o usuário a entender não só o "o que" mas o "por quê"

### Negócio
1. **Produto primeiro, lucro segundo**: Um produto excelente vende sozinho
2. **Alinhamento de incentivos**: Ganhamos dinheiro quando o cliente é mais seguro e produtivo
3. **Transparência total**: Nada escondido sobre como o produto funciona ou quanto custa
4. **Foco em resultado, não em features**: Vendemos menos trabalho manual e mais segurança comprovada
5. **Crescimento sustentável**: Nunca sacrifiscamos qualidade ou integridade por crescimento rápido

---

## Como Usar Este Roadmap

Este documento serve como:

1. **Guia de desenvolvimento**: Para a equipe técnica saber o que construir em seguida
2. **Ferramenta de alinhamento**: Para garantir que produto, engenharia e negócio estejam no mesmo page
3. **Comunicação com investidores**: Para mostrar a visão de longo prazo e como monetizamos
4. **Base para precificação**: Para entender quais features pertencem a cada tier
5. **Referência para marketing**: Para criar mensagens corretas para cada estágio de adoção
6. **Métrica de progresso**: Para marcar o que foi concluído e o que vem a seguir

**Importante**: Este não é um cronograma fixo, mas uma visão da evolução lógica. Algumas fases podem overlapper, e algumas features podem ser antecipadas ou atrasadas com base em aprendizados do mercado e feedback de usuários reais.

O mais importante é manter a visão central: **Resolver bem o problema técnico para desenvolvedores, para que naturalmente resolvamos o problema organizacional para empresas.**

--- 

*Documento criado em: Março/2026*  
*Última atualização: Março/2026*  
*Este roadmap é um documento vivo e será atualizado conforme o amadurecimento do produto e do mercado.*
