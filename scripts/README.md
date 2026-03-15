# Scripts de Deploy

## upload-secrets.sh

Script para enviar variáveis de ambiente (.env) como GitHub Secrets automaticamente.

### Pré-requisitos

1. GitHub CLI instalado e autenticado:
```bash
gh auth login
```

2. Arquivo `.env` no diretório do componente que você quer fazer upload

### Uso

```bash
./scripts/upload-secrets.sh <component>
```

### Componentes Disponíveis

Cada componente pode ter seu próprio diretório com um arquivo `.env`:

```bash
./scripts/upload-secrets.sh <directory>
```

### Adicionar Novo Componente

1. Crie o diretório e o arquivo `.env`:
```bash
mkdir -p my-component
cp .env.example my-component/.env
```

2. Edite o arquivo com suas credenciais

3. Execute o script:
```bash
./scripts/upload-secrets.sh my-component
```

### Variáveis de Ambiente

O script envia TODAS as variáveis definidas no arquivo `.env` do componente para o GitHub Secrets.

Por padrão, cada variável recebe um prefixo baseado no nome do componente:
- `api/` → prefixo `API_`
- `landing-page/` → sem prefixo (flat)
- `transcoder/` → prefixo `TRANSCODER_`

Para自定义 o comportamento, edite o script `upload-secrets.sh` e ajuste o `case` statement.

### Exemplo Completo

1. Certifique-se que o arquivo `.env` existe:
```bash
ls -la my-component/.env
```

2. Execute o script:
```bash
./scripts/upload-secrets.sh my-component
```

3. Verifique os secrets no GitHub:
```
https://github.com/rodrigocnascimento/patcha/settings/secrets/actions
```

### Troubleshooting

**Erro: "Você não está autenticado no GitHub CLI"**
```bash
gh auth login
```

**Erro: "Arquivo .env não encontrado"**
- Certifique-se que o arquivo existe: `ls <component>/.env`
- Ou crie um baseado no exemplo: `cp <component>/.env.example <component>/.env`

**Secret não foi enviado**
- A variável pode estar vazia no arquivo `.env`
- Adicione a variável no `.env` e execute o script novamente
