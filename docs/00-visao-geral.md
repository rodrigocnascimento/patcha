# Visão Geral — Patcha

> Da solução técnica para o problema organizacional: como um CLI open-source evolui para uma plataforma de segurança de dependências enterprise.

---

## Índice

1. [A Visão Única](#a-visão-única)
2. [O Problema em Duas Camadas](#o-problema-em-duas-camadas)
3. [A Estratégia de Produto](#a-estratégia-de-produto)
4. [A Jornada do Usuário](#a-jornada-do-usuário)
5. [O Modelo de Negócio](#o-modelo-de-negócio)
6. [O Ciclo de Valor](#o-ciclo-de-valor)
7. [Por Que Isso Funciona](#por-que-isso-funciona)
8. [Próximos Passos](#próximos-passos)

---

## A Visão Única

**Nossa visão é tornar a gestão de vulnerabilidades em dependências Node.js simples, automática e auditável — desde o desenvolvedor individual até a grande empresa.**

Não queremos ser apenas mais um scanner de vulnerabilidades. Queremos ser a plataforma que **elimina o trabalho manual** associado à segurança de dependências, transformando um processo reativo e doloroso em algo proativo e transparente.

Isse enxergamos isso em duas camadas inseparáveis:

```
┌─────────────────────────────────────────────────────────────────┐
│                         VISÃO GERAL                              │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  PROBLEMA TÉCNICO (Camada 1)                                    │
│  → Vulnerabilidades em deps Node.js                              │
│  → Trabalho manual de scan e fix                                 │
│  → Incerteza sobre o que é seguro                                │
│                                                                  │
│  ▼                                                              │
│                                                                  │
│  Patcha CLI (Produto 1)                                 │
│  → Open-source, gratuito                                         │
│  → Resolve o problema técnico                                    │
│  → É útil por si só                                              │
│                                                                  │
│  ▼                                                              │
│                                                                  │
│  PROBLEMA ORGANIZACIONAL (Camada 2)                             │
│  → Falta de visibilidade em múltiplos projetos                  │
│  → Dificuldade de provar compliance                             │
│  → Sobrecarga de equipes de segurança                           │
│                                                                  │
│  ▼                                                              │
│                                                                  │
│  Patcha ENTERPRISE (Produto 2)                         │
│  → Pago, plataforma web                                         │
│  → Resolve o problema organizacional                            │
│  → Gera valor recorrente                                        │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## O Problema em Duas Camadas

### Camada 1: O Problema Técnico (Resolvido pelo CLI)

**O que o desenvolvedor sente:**
- "Tenho que rodar `npm audit` toda semana e ficar tentando entender o output"
- "O `npm audit fix` resolve algumas coisas, mas trava nos casos complexos"
- "Perco horas tentando descobrir se uma atualização vai quebrar algo"
- "Não tenho confiança de que estou realmente seguro"

**O que o CLI entrega:**
- Scan automático de `package.json` e `package-lock.json`
- Auto-fix para casos simples (patch/minor)
- Assistência de IA para casos complexos (major bumps, transitivas, libs abandonadas)
- Criação automática de MRs/PRs para revisão
- Tudo isso no terminal, onde o desenvolvedor já trabalha

**Resultado:** O desenvolvedor passa de 1h/semana em tarefas manuais para 10min revisando sugestões da IA.

### Camada 2: O Problema Organizacional (Resolvido pelo Enterprise)

**O que o líder de segurança / CTO sente:**
- "Não tenho visibilidade de quantos projetos têm vulnerabilidades críticas"
- "Não consigo provar pro auditor que estamos tratando CVEs em tempo hábil"
- "Minha equipe gasta horas gerando planilhas para reuniões de compliance"
- "Não sei se os desenvolvedores estão realmente aplicando os fixes"
- "Preciso de uma forma de escalar isso conforme crescemos"

**O que o Enterprise entrega:**
- Dashboard consolidado com visão de todos os projetos
- Relatórios de compliance prontos para auditor (SOC2, ISO 27001, PCI-DSS)
- Audit logs completos de quem aprovou o quê e quando
- SSO, roles e permissões para gestão de equipe
- Scans agendados e notificações automáticas
- API para integração com sistemas internos

**Resultado:** A equipe de segurança passa de 20h/semana em tarefas manuais para 2h revisando exceções e aprovando decisões estratégicas.

---

## A Estratégia de Produto: Open-Core Feito Certo

Nossa estratégia segue o modelo **open-core** que funcionou para empresas como GitLab, HashiCorp e Elastic, mas com uma diferença crucial: **o core técnico é tão bom que o open-source é valioso por si só**.

```
┌─────────────────────────────────────────────────────────────────┐
│                      ESTRATÉGIA DE PRODUTO                      │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  FASE 1: Construir um CLI tão bom que desenvolvedores amem usá-lo │
│          → Resolve realmente o problema técnico                 │
│          → É 100% gratuito e open-source                       │
│          → Gera confiança, adoção orgânica e contribuições      │
│                                                                 │
│  FASE 2: Usar essa base para construir o enterprise             │
│          → O mesmo core que faz o CLI funcionar                 │
│          → É consumido como biblioteca pela plataforma web      │
│          → Adiciona camadas de gestão, compliance e escala      │
│          → Monetiza o valor organizacional                      │
│                                                                 │
│  FASE 3: Deixar o open-source impulsionar o enterprise          │
│          → Comunidade contribui para melhorar o core            │
│          → Usuários gratuitos viram defensores e leads          │
│          → Reduz CAC e aumenta confiança no produto             │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Por Que Isso é Diferente de Outros Modelos

| Modelo | Problema | Nossa Abordagem |
|---|---|---|
| **Freemium puramente artificial** | O gratuito é uma demo castrada que não resolve nada de verdade | Nosso CLI gratuito **realmente resolve o problema técnico** — é útil mesmo sem pagar |
| **Open-source com apoio comercial** | Difícil de monetizar porque o produto é completo | Separamos claramente: CLI resolve técnico, enterprise resolve organizacional |
| **SaaS puro desde o início** | Falta de confiança, difícil de adotar em empresas security-conscious | Começamos com open-source para construir confiança antes de vender |
| **Core fraco + features enterprise** | O gratuito não é útil, ninguém adota | Investimos pesado em fazer o core técnico ser excelente |

---

## A Jornada do Usuário

### Jornada do Desenvolvedor Individual (Produto 1)

```
┌─────────────────────────────────────────────────────────────────┐
│                           JORNADA                                │
├─────────────────────────────────────────────────────────────────┤
│  1. Descobre o Patcha (GitHub, recomendação)           │
│  2. Instala: npm i -g patcha                           │
│  3. Roda primeira vez: patcha scan ./meu-projeto       │
│  4. Vê vulnerabilidades e sugestões de fix                      │
│  5. Aplica fixes automáticos (nível 1) com um comando           │
│  6. Usa --ai para casos complexos e revisa sugestões da IA      │
│  7. Cria MR automaticamente com --mr                            │
│  8. Integra no seu workflow de desenvolvimento                  │
│  9. Recomenda para colegas de time                              │
│  10. Sugere melhorias no GitHub (issues/PRs)                    │
└─────────────────────────────────────────────────────────────────┘
```

**Resultado:** Desenvolvedor mais produtivo, menos ansioso sobre segurança, se sente empoderado.

### Jornada da Equipe de Segurança (Produto 2)

```
┌─────────────────────────────────────────────────────────────────┐
│                           JORNADA                                │
├─────────────────────────────────────────────────────────────────┤
│  1. Vê que múltiplos times estão usando o Patcha CLI   │
│  2. Avalia a plataforma enterprise para gestão centralizada     │
│  3. Faz deploy (SaaS ou self-hosted)                           │
│  4. Conecta todos os repositórios da organização               │
│  5. Configura scans automáticos diários                       │
│  6. Define políticas de SLA (crítico em 48h, etc.)             │
│  7. Recebe alertas quando algo foge do SLA                     │
│  8. Gera relatório de compliance com um clique para auditoria   │
│  9. Usa audit logs para investigar incidentes                  │
│ 10. Otimiza políticas baseado em métricas de tendências         │
└─────────────────────────────────────────────────────────────────┘
```

**Resultado:** Equipe de segurança mais estratégica, menos operacional, capaz de provar compliance facilmente.

---

## O Modelo de Negócio: Como Ganhamos Dinheiro

Nosso modelo é simples: **o open-source cria o mercado, o enterprise captura o valor**.

```
┌─────────────────────────────────────────────────────────────────┐
│                     MODELO DE NEGÓCIO                           │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  CAMADA 1: OPEN-SOURCE (CLI)                                    │
│  → Custo: desenvolvimento e manutenção do core                  │
│  → Receita: $0                                                  │
│  → Valor:                                                       │
│    • Adoção orgânica (GitHub stars, downloads, word of mouth)   │
│    • Confiança e credibilidade no mercado                       │
│    • Comunidade que contribui com melhorias                     │
│    • Pipeline de leads qualificados (empresas que usam o CLI)   │
│                                                                 │
│  CAMADA 2: ENTERPRISE (Plataforma)                              │
│  → Custo: desenvolvimento de dashboard, API, banco, etc.        │
│  → Receita: assinaturas recorrentes (SaaS/self-hosted)          │
│  → Valor:                                                       │
│    • Resolve problemas organizacionais caros                    │
│    • Pricing por organização (não por desenvolvedor)            │
│    • Margens altas (80%+ após escala)                           │
│    • Baixo churn (integração profunda, compliance crítico)      │
│                                                                 │
│  O CÍCLO VIRTUOSO:                                              │
│  Mais usuários do CLI → Mais leads para o enterprise            │
│  Mais clientes enterprise → Mais investimento no core           │
│  Melhor core → Mais valor para ambos os produtos                │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Projeção de Receita (Conservadora)

| Ano | Usuários CLI Gratuitos | Clientes Team ($99/mês) | Clientes Business ($299/mês) | Clientes Enterprise ($999/mês) | ARR |
|---|---|---|---|---|---|
| 1 | 5.000 | 20 | 5 | 0 | $42.000 |
| 2 | 25.000 | 100 | 30 | 5 | $288.000 |
| 3 | 100.000 | 300 | 100 | 20 | $960.000 |
| 4 | 250.000 | 500 | 200 | 50 | $2.100.000 |

**Assumptions:**
- Taxa de conversão: 0,5% dos usuários gratuitos para Team, 0,1% para Business, 0,02% para Enterprise
- Churn anual: 5%
- Preços conforme definido no plano enterprise

---

## O Ciclo de Valor: Como Ambos os Produtos se Beneficiam

```
┌─────────────────────────────────────────────────────────────────┐
│                       CICLO DE VALOR                            │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  1. Usuário gratuito resolve um problema técnico difícil       │
│     usando o CLI com assistência de IA                         │
│                                                                 │
│  2. Ele conta para seu time ou posta no LinkedIn/Reddit         │
│                                                                 │
│  3. Líder de segurança vê que múltiplos times estão usando      │
│     e quer gestão centralizada                                 │
│                                                                 │
│  4. Adquire o enterprise para visibilidade e compliance         │
│                                                                 │
│  5. Pagamento financia melhorias no core                        │
│     (scanner mais rápido, melhores providers de LLM, etc.)     │
│                                                                 │
│  6. Melhorias no core beneficiam AMBOS os produtos              │
│     → CLI fica mais preciso e rápido                           │
│     → Enterprise fica mais confiável                           │
│                                                                 │
│  7. Usuário gratuito tem experiência ainda melhor              │
│     e conta para mais pessoas                                  │
│                                                                 │
│  8. O ciclo se repete                                          │
└─────────────────────────────────────────────────────────────────┘
```

Este ciclo é o que torna o modelo sustentável e escalável. Não estamos vendendo "funcionalidades" — estamos vendendo **resultado**: menos trabalho manual, mais segurança, compliance fácil.

---

## Por Que Isso Funciona

### 1. Alinhamento com Incentivos Naturais

- **Desenvolvedores** querem ser produtivos → CLI salva tempo deles
- **Equipes de segurança** querem provar compliance → Enterprise entrega relatórios prontos
- **Líderes de engenharia** querem reduzir risco → Ambos os produtos reduzem exposição a CVEs

### 2. Redução de Atrito na Adoção

- Começar com algo **gratuito e útil** (CLI) reduz a barreira de entrada
- Expandir para algo **pago e valioso** (enterprise) acontece quando há necessidade real
- Nenhuma venda agressiva necessária — a demanda vem do uso real

### 3. Defensibilidade Técnica

- O core técnico (scanner, resolver, LLM service) é difícil de replicar bem
- Nossa arquitetura de providers extensíveis nos permite adaptar rapidamente
- A combinação de IA + git integration + multi-platform é única

### 4. Timing de Mercado Perfeito

- Supply chain attacks estão em alta (Log4Shell, xz-utils, etc.)
- Regulamentações estão apertando (EU Cyber Resilience Act, NIST SBOM)
- Empresas estão dispostas a pagar por soluções que realmente funcionam
- IA aplicada a segurança é um dos áreas mais quentes de investimento atualmente

---

## Próximos Passos

### No Curto Prazo (Próximos 3-6 meses)

1. **Completar o CLI (Produto 1)**:
   - Fase 1: MVP com scanner, auto-fix e LLM
   - Fase 2: Integração Git (MRs automáticos)
   - Lançar open-source e começar a coletar feedback

2. **Validar o mercado**:
   - Usar o CLI em nossos próprios 20+ projetos
   - Estudos de caso com empresas parceiras
   - Ajustar baseado em feedback real

### No Médio Prazo (6-18 meses)

1. **Iniciar o Enterprise (Produto 2)**:
   - Fase 1: MVP enterprise (dashboard básico, autenticação)
   - Fase 2: Features de compliance e gestão de equipe
   - Primeiros clientes pagantes

2. **Escalabilidade**:
   - Melhorar o core baseado no uso real
   - Expandir para mais plataformas Git (Bitbucket)
   - Construir parcerias com consultorias de segurança

### No Longo Prazo (18+ meses)

1. **Liderança de mercado**:
   - Tornar-se referência em segurança de dependências para Node.js
   - Expandir para outras linguagens (Python, Go, etc.)
   - Tornar-se padrão da indústria para gestão de vulnerabilidades

---

## Conclusão

O Patcha não é apenas mais uma ferramenta de segurança. É uma **visão de como resolver problemas técnicos e organizacionais em camadas**:

1. **Primeiro, resolva o problema técnico tão bem que desenvolvedores escolham usar sua ferramenta gratuitamente.**
2. **Depois, use essa confiança e adoção para resolver o problema organizacional que empresas estão dispostas a pagar.**
3. **Finalmente, deixe o ciclo virtuoso entre open-source e enterprise impulsionar ambos os produtos para frente.**

Este documento é o norte que guia todas as decisões de produto, tecnologia e negócio. Quando houver dúvidas, voltemos aqui: estamos construindo o CLI para ser tão bom que naturalmente leve ao enterprise — e o enterprise para ser tão valioso que justifique o investimento no core.

**Vamos construir algo que desenvolvedores amem usar e empresas precisem comprar.**

--- 

*Documento criado em: Março/2026*  
*Última atualização: Março/2026*
