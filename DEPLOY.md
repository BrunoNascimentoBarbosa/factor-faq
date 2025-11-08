# 🚀 Guia de Deploy - Factor FAQ

Este guia explica como fazer deploy do Factor FAQ no Render.com com PostgreSQL (servidor único servindo frontend + backend).

## 📋 Pré-requisitos

1. Conta no [Render.com](https://render.com) (gratuita)
2. Repositório Git (GitHub, GitLab ou Bitbucket)

## 🌐 Deploy no Render

### Opção A: Deploy Automático com Blueprint (Recomendado)

1. Acesse [Render Dashboard](https://dashboard.render.com/)
2. Clique em **"New +"** → **"Blueprint"**
3. Conecte seu repositório Git
4. O Render detectará automaticamente o `render.yaml` e criará:
   - ✅ Banco de dados PostgreSQL (gratuito)
   - ✅ Web Service com frontend + backend
   - ✅ Todas as variáveis de ambiente configuradas automaticamente
5. Clique em **"Apply"**
6. Aguarde o deploy completar (~5-10 minutos)

### Opção B: Deploy Manual

#### Passo 1: Criar Banco de Dados PostgreSQL

1. No Render Dashboard, clique em **"New +"** → **"PostgreSQL"**
2. Configure:
   - **Name:** `factor-faq-db`
   - **Database:** `factor_faq`
   - **User:** `factor_user`
   - **Region:** Oregon (ou mais próximo)
   - **Plan:** Free
3. Clique em **"Create Database"**
4. **Copie a "Internal Database URL"** (você vai precisar)

#### Passo 2: Criar Web Service

1. No Render Dashboard, clique em **"New +"** → **"Web Service"**
2. Conecte seu repositório Git
3. Configure:

   **Build & Deploy:**
   - **Name:** `factor-faq`
   - **Region:** Oregon (mesmo do banco)
   - **Branch:** `main`
   - **Root Directory:** (deixe vazio)
   - **Runtime:** Node
   - **Build Command:** `cd backend && npm install && npm run build`
   - **Start Command:** `cd backend && npm start`
   - **Plan:** Free

   **Environment Variables:**
   ```
   NODE_ENV=production
   PORT=10000
   DATABASE_URL=cole-aqui-a-internal-database-url
   JWT_SECRET=sua-chave-secreta-aleatoria-aqui
   JWT_EXPIRE=7d
   JWT_REFRESH_SECRET=outra-chave-secreta-diferente
   JWT_REFRESH_EXPIRE=30d
   ```

4. Clique em **"Create Web Service"**
5. Aguarde o build e deploy completar

## ⚙️ Configurar Usuário Admin

Após o deploy, crie o primeiro usuário admin via API:

```bash
curl -X POST https://your-app.onrender.com/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Admin",
    "email": "admin@factor.com",
    "password": "SuaSenhaSegura123",
    "role": "admin"
  }'
```

## 🎉 Acesse sua aplicação

URL: `https://your-app.onrender.com`

---

**Pronto! Seu Factor FAQ está no ar com PostgreSQL! 🎉**
