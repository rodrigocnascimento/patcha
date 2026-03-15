#!/bin/bash

# Script para enviar secrets de .env para o GitHub
# Autor: Claude Code
# Uso: ./scripts/upload-secrets.sh <directory>
#      Exemplo: ./scripts/upload-secrets.sh api
#               ./scripts/upload-secrets.sh landing-page

REPO="rodrigocnascimento/patcha"

# Cores para output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Verificar argumento
if [ -z "$1" ]; then
    echo -e "${RED}❌ Erro: Diretório não especificado${NC}"
    echo ""
    echo "Uso: $0 <directory>"
    echo ""
    echo "Diretórios disponíveis:"
    echo "  api              - API secrets (Database, Clerk, R2, Resend)"
    echo "  landing-page     - Landing page (Cloudflare tokens)"
    echo "  transcoder       - Transcoder secrets (Database URL, R2 buckets)"
    echo ""
    echo "Exemplo:"
    echo "  $0 api"
    echo "  $0 landing-page"
    exit 1
fi

COMPONENT=$1
ENV_FILE="${COMPONENT}/.env"

echo -e "${GREEN}🔐 GitHub Secrets Uploader - ${COMPONENT^^}${NC}"
echo "================================================"
echo ""

# Verificar se está autenticado no GitHub CLI
if ! gh auth status &> /dev/null; then
    echo -e "${RED}❌ Você não está autenticado no GitHub CLI${NC}"
    echo "Execute: gh auth login"
    exit 1
fi

echo -e "${GREEN}✅ GitHub CLI autenticado${NC}"
echo ""

# Verificar se o arquivo .env existe
if [ ! -f "$ENV_FILE" ]; then
    echo -e "${RED}❌ Arquivo $ENV_FILE não encontrado!${NC}"
    echo "Crie o arquivo com as credenciais primeiro."
    exit 1
fi

echo -e "${GREEN}✅ Arquivo $ENV_FILE encontrado${NC}"
echo ""

# Determinar prefixo baseado no componente
case "$COMPONENT" in
    api)
        PREFIX="API_"
        ;;
    landing-page)
        PREFIX=""
        ;;
    transcoder)
        PREFIX="TRANSCODER_"
        ;;
    frontend)
        PREFIX="FRONTEND_"
        ;;
    *)
        echo -e "${RED}❌ Componente desconhecido: ${COMPONENT}${NC}"
        echo "Componentes válidos: api, landing-page, transcoder, frontend"
        exit 1
        ;;
esac

echo -e "${YELLOW}📤 Enviando TODAS as variáveis do .env para GitHub...${NC}"
echo -e "${YELLOW}Prefixo usado: ${PREFIX}${NC}"
echo ""

# Contador
total=0
success=0
skipped=0

# Ler todas as variáveis do .env e enviar
while IFS='=' read -r key rest; do
    # Pular linhas vazias e comentários
    [[ -z "$key" || "$key" =~ ^[[:space:]]*# ]] && continue

    # Remover comentários inline (tudo após #)
    value=$(echo "$rest" | sed 's/#.*//' | xargs)

    # Remover aspas do valor
    value=$(echo "$value" | sed 's/^["'\'']//' | sed 's/["'\'']$//')

    # Pular se valor vazio
    if [ -z "$value" ]; then
        echo -e "${YELLOW}⚠️  ${key}: Valor vazio, pulando...${NC}"
        ((skipped++))
        continue
    fi

    # Definir nome do secret
    # Se a variável já começa com o prefixo, não duplicar
    if [[ "$key" == ${PREFIX}* ]]; then
        secret_name="$key"
    else
        secret_name="${PREFIX}${key}"
    fi

    # Enviar para GitHub
    if echo "$value" | gh secret set "$secret_name" --repo="$REPO" 2>&1 > /dev/null; then
        echo -e "${GREEN}✅ ${secret_name}${NC}"
        ((success++))
    else
        echo -e "${RED}❌ ${secret_name}: Falha ao adicionar${NC}"
    fi

    ((total++))
done < <(grep -v "^[[:space:]]*$" "$ENV_FILE" | grep "=")

echo ""
echo "================================================"
echo -e "${GREEN}✅ Processo concluído!${NC}"
echo ""
echo "📊 Estatísticas:"
echo "   Total processado: $total"
echo "   Enviados com sucesso: $success"
echo "   Pulados (vazios): $skipped"
echo ""
echo "Verifique os secrets em:"
echo "https://github.com/$REPO/settings/secrets/actions"
