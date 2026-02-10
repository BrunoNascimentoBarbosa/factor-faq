#!/bin/bash

#######################################################
# Script de Atualização - Factor FAQ
# Servidor: AWS Linux - http://suporte.factorlog.com.br/
#######################################################

set -e  # Parar em caso de erro

echo "=========================================="
echo "🔄 Atualizando Factor FAQ..."
echo "=========================================="

# Navegar para diretório da aplicação
cd /factor/factor-faq-main

echo ""
echo "📦 1. Atualizando e buildando frontend..."
cd frontend
npm install
npm run build

if [ ! -f "dist/index.html" ]; then
    echo "❌ ERRO: Build do frontend falhou! dist/index.html não existe."
    exit 1
fi

echo "✅ Frontend buildado com sucesso!"

echo ""
echo "📦 2. Atualizando dependências do backend..."
cd ../backend
npm install --production

echo "✅ Dependências do backend atualizadas!"

echo ""
echo "🔄 3. Restartando aplicação PM2..."
pm2 restart factor-faq

echo ""
echo "📊 4. Verificando status..."
sleep 2
pm2 status factor-faq

echo ""
echo "=========================================="
echo "✅ Deploy atualizado com sucesso!"
echo "=========================================="
echo ""
echo "Para ver logs: pm2 logs factor-faq"
echo "Para verificar saúde: curl http://localhost/api/health"
echo ""
