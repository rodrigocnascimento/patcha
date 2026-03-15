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

```mermaid
flowchart TB
  A["Problema tecnico (Camada 1)<br/>Vulnerabilidades em deps Node.js<br/>Trabalho manual de scan e fix<br/>Incerteza sobre o que e seguro"]
  B["Patcha CLI (Produto 1)<br/>Open-source, gratuito<br/>Resolve o problema tecnico<br/>E util por si so"]
  C["Problema organizacional (Camada 2)<br/>Falta de visibilidade em multiplos projetos<br/>Dificuldade de provar compliance<br/>Sobrecarga de equipes de seguranca"]
  D["Patcha Enterprise (Produto 2)<br/>Pago, plataforma web<br/>Resolve o problema organizacional<br/>Gera valor recorrente"]
  A --> B --> C --> D
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

```mermaid
flowchart TB
  P1["Fase 1<br/>Construir um CLI que resolve o problema tecnico<br/>100% gratuito e open-source<br/>Gera confianca e adocao organica"]
  P2["Fase 2<br/>Usar o mesmo core na plataforma enterprise<br/>Adicionar gestao, compliance e escala<br/>Monetizar valor organizacional"]
  P3["Fase 3<br/>Comunidade melhora o core<br/>Usuarios viram defensores e leads<br/>Reduz CAC e aumenta confianca"]
  P1 --> P2 --> P3
```

### Por Que Isso é Diferente de Outros Modelos

```mermaid
flowchart TB
  A1["Freemium puramente artificial<br/>Problema: demo castrada, nao resolve<br/>Abordagem: CLI gratuito resolve o problema tecnico"]
  A2["Open-source com apoio comercial<br/>Problema: dificil monetizar produto completo<br/>Abordagem: CLI resolve tecnico, enterprise resolve organizacional"]
  A3["SaaS puro desde o inicio<br/>Problema: falta confianca para adocao<br/>Abordagem: open-source para construir confianca antes de vender"]
  A4["Core fraco + features enterprise<br/>Problema: gratuito nao e util<br/>Abordagem: core tecnico excelente"]
  A1
  A2
  A3
  A4
```

---

## A Jornada do Usuário

### Jornada do Desenvolvedor Individual (Produto 1)

```mermaid
flowchart TB
  D1["1. Descobre o Patcha (GitHub, recomendacao)"]
  D2["2. Instala: npm i -g patcha"]
  D3["3. Roda primeira vez: patcha scan ./meu-projeto"]
  D4["4. Ve vulnerabilidades e sugestoes de fix"]
  D5["5. Aplica fixes automaticos (nivel 1)"]
  D6["6. Usa --ai para casos complexos e revisa sugestoes"]
  D7["7. Cria MR automaticamente com --mr"]
  D8["8. Integra no workflow de desenvolvimento"]
  D9["9. Recomenda para colegas de time"]
  D10["10. Sugere melhorias no GitHub (issues/PRs)"]
  D1 --> D2 --> D3 --> D4 --> D5 --> D6 --> D7 --> D8 --> D9 --> D10
```

**Resultado:** Desenvolvedor mais produtivo, menos ansioso sobre segurança, se sente empoderado.

### Jornada da Equipe de Segurança (Produto 2)

```mermaid
flowchart TB
  S1["1. Ve que multiplos times usam o Patcha CLI"]
  S2["2. Avalia a plataforma enterprise para gestao centralizada"]
  S3["3. Faz deploy (SaaS ou self-hosted)"]
  S4["4. Conecta repositorios da organizacao"]
  S5["5. Configura scans automaticos diarios"]
  S6["6. Define politicas de SLA (critico em 48h)"]
  S7["7. Recebe alertas quando algo foge do SLA"]
  S8["8. Gera relatorio de compliance para auditoria"]
  S9["9. Usa audit logs para investigar incidentes"]
  S10["10. Otimiza politicas com metricas de tendencias"]
  S1 --> S2 --> S3 --> S4 --> S5 --> S6 --> S7 --> S8 --> S9 --> S10
```

**Resultado:** Equipe de segurança mais estratégica, menos operacional, capaz de provar compliance facilmente.

---

## O Modelo de Negócio: Como Ganhamos Dinheiro

Nosso modelo é simples: **o open-source cria o mercado, o enterprise captura o valor**.

```mermaid
flowchart TB
  O["Camada 1: Open-source (CLI)<br/>Custo: desenvolvimento e manutencao do core<br/>Receita: $0<br/>Valor: adocao organica, confianca, comunidade, leads"]
  E["Camada 2: Enterprise (Plataforma)<br/>Custo: dashboard, API, banco<br/>Receita: assinaturas recorrentes<br/>Valor: resolve problemas organizacionais, pricing por organizacao, margens altas, baixo churn"]
  V["Ciclo virtuoso<br/>Mais usuarios do CLI -> mais leads<br/>Mais clientes enterprise -> mais investimento no core<br/>Melhor core -> mais valor para ambos"]
  O --> E --> V
```

### Projeção de Receita (Conservadora)

```mermaid
flowchart TB
  P["Projecao de Receita (Conservadora)"]
  Y1["Ano 1<br/>Usuarios CLI: 5.000<br/>Team: 20<br/>Business: 5<br/>Enterprise: 0<br/>ARR: $42.000"]
  Y2["Ano 2<br/>Usuarios CLI: 25.000<br/>Team: 100<br/>Business: 30<br/>Enterprise: 5<br/>ARR: $288.000"]
  Y3["Ano 3<br/>Usuarios CLI: 100.000<br/>Team: 300<br/>Business: 100<br/>Enterprise: 20<br/>ARR: $960.000"]
  Y4["Ano 4<br/>Usuarios CLI: 250.000<br/>Team: 500<br/>Business: 200<br/>Enterprise: 50<br/>ARR: $2.100.000"]
  P --> Y1 --> Y2 --> Y3 --> Y4
```

**Assumptions:**
- Taxa de conversão: 0,5% dos usuários gratuitos para Team, 0,1% para Business, 0,02% para Enterprise
- Churn anual: 5%
- Preços conforme definido no plano enterprise

---

## O Ciclo de Valor: Como Ambos os Produtos se Beneficiam

```mermaid
flowchart TB
  C1["1. Usuario gratuito resolve um problema tecnico com o CLI"]
  C2["2. Conta para o time ou publica em comunidades"]
  C3["3. Lider de seguranca busca gestao centralizada"]
  C4["4. Adquire o enterprise para visibilidade e compliance"]
  C5["5. Pagamento financia melhorias no core"]
  C6["6. Melhorias no core beneficiam ambos os produtos"]
  C7["7. Usuario gratuito tem experiencia melhor e indica"]
  C8["8. O ciclo se repete"]
  C1 --> C2 --> C3 --> C4 --> C5 --> C6 --> C7 --> C8
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
