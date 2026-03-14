# TDD: Fase 1 - CLI Mínimo Viável

## 1. Objective & Scope

**What:** Implementar o CLI mínimo viável do Patcha para scanning de vulnerabilidades em dependências npm.

**Why:** Entregar a primeira versão funcional do produto que permite desenvolvedores escanear vulnerabilidades em seus projetos npm com output formatado no terminal.

**File Target:** `docs/tdd-fase-1-cli-minimo-viavel.md`

### Escopo Técnico
- CLI básico com Commander.js
- Scanner que lê package.json e package-lock.json
- Integração com @npmcli/arborist para árvore de dependências
- Consumo da npm audit JSON API
- Estrutura de dados para vulnerabilidades (CVE, severidade, pacote afetado)
- Output formatado em terminal (cores, tabelas simples)
- Tratamento básico de erros

### Escopo UX
- Comando `patcha scan [path]`
- Output legível no terminal mostrando contagem por severidade
- Código de saída adequado para scripts (0 = sucesso, 1 = vulnerabilidades encontradas)
- Help completo (`--help`)
- Versionamento semântico via `package.json`

---

## 2. Proposed Technical Strategy

### Arquitetura de Diretórios
```
src/
├── cli/
│   ├── index.ts          # Entry point do CLI
│   └── commands/
│       └── scan.ts       # Comando 'scan'
├── scanner/
│   ├── index.ts          # Scanner principal
│   ├── arborist.ts       # Integração @npmcli/arborist
│   ├── npm-audit.ts     # Consumo da npm audit API
│   └── types.ts          # Tipos compartilhados
├── output/
│   └── formatter.ts      # Output formatado com cores
└── utils/
    └── errors.ts         # Tratamento de erros
```

### Estrutura de Dados (types.ts)
```typescript
interface Vulnerability {
  id: string;
  severity: 'low' | 'moderate' | 'high' | 'critical';
  packageName: string;
  packageVersion: string;
  title: string;
  url: string;
  fixable: boolean;
  fixVersion?: string;
}

interface ScanResult {
  path: string;
  timestamp: Date;
  vulnerabilities: Vulnerability[];
  summary: {
    critical: number;
    high: number;
    moderate: number;
    low: number;
    total: number;
  };
}
```

### Fluxo de Execução
1. Parsear argumentos (path opcional, defaults to CWD)
2. Ler package.json do path
3. Usar @npmcli/arborist para construir árvore de dependências
4. Consumir npm audit JSON API com a árvore
5. Transformar resposta em Vulnerability[]
6. Calcular summary por severidade
7. Formatar output com cores
8. Retornar código de saída (0 = sem vulns, 1 = vulns encontradas)

### Dependências Adicionais
- @npmcli/arborist: ^7.0.0
- picocolors: ^1.0.0 (cores leves)

---

## 3. Implementation Plan

### Fase 1: Infraestrutura CLI
1. **src/cli/index.ts** - Entry point com Commander.js
2. **src/cli/commands/scan.ts** - Comando 'scan' com options
3. **src/utils/errors.ts** - Error handler centralizado

### Fase 2: Scanner Core
4. **src/scanner/types.ts** - Interfaces Vulnerability, ScanResult
5. **src/scanner/arborist.ts** - Função buildDepTree(path): DepTree
6. **src/scanner/npm-audit.ts** - Função audit(depTree): AuditResponse
7. **src/scanner/index.ts** - Orquestrador: scan(path): ScanResult

### Fase 3: Output
8. **src/output/formatter.ts** - Função format(result): string com cores
9. **Integração no comando scan** para exibir resultado

### Fase 4: Configuração Final
10. **Atualizar package.json** com dependências adicionais
11. **Testes unitários** para scanner e formatter
12. **Teste de integração** do comando scan

---

**Documento criado:** Março/2026  
**Próximo passo:** Aguardar aprovação do Developer antes de implementar.
