# 🚀 Deploy Factor FAQ - AWS Linux

Guia completo para deploy no servidor AWS Linux em **http://suporte.factorlog.com.br/**

---

## 📋 Pré-requisitos (JÁ PRONTOS)

- ✅ Amazon Linux 2 ou superior
- ✅ Node.js v18+ instalado
- ✅ PM2 instalado globalmente
- ✅ PostgreSQL instalado e rodando
- ✅ Código em `/factor/factor-faq-main`

---

## 🚀 Deploy Rápido (Passo a Passo)

### 1️⃣ Preparar Banco de Dados

Conectar ao PostgreSQL e criar banco (se não existir):

```bash
# Verificar se banco existe
psql -U SEU_USUARIO -h localhost -l | grep factor_faq

# Se não existir, criar:
psql -U SEU_USUARIO -h localhost -c "CREATE DATABASE factor_faq;"
```

### 2️⃣ Configurar Ambiente de Produção

Navegar para o diretório:
```bash
cd /factor/factor-faq-main/backend
```

Copiar template do .env.production (já existe no repositório):
```bash
cp .env.production .env.production.local
nano .env.production.local
```

**OU** editar diretamente:
```bash
nano .env.production
```

**Configurar as seguintes variáveis:**

#### a) DATABASE_URL
Substituir com suas credenciais PostgreSQL:
```bash
DATABASE_URL=postgresql://SEU_USUARIO:SUA_SENHA@localhost:5432/factor_faq
```

#### b) JWT Secrets
Gerar secrets seguros:
```bash
# Gerar JWT_SECRET
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
# Copiar resultado e colar no JWT_SECRET=

# Gerar JWT_REFRESH_SECRET (diferente!)
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
# Copiar resultado e colar no JWT_REFRESH_SECRET=
```

**Exemplo de .env.production preenchido:**
```bash
NODE_ENV=production
PORT=80
DATABASE_URL=postgresql://admin:minhasenha@localhost:5432/factor_faq
JWT_SECRET=a1b2c3d4e5f6...longa_string_aqui
JWT_EXPIRE=7d
JWT_REFRESH_SECRET=z9y8x7w6v5u4...outra_string_diferente
JWT_REFRESH_EXPIRE=30d
WHATSAPP_NUMBER=5511999999999
```

### 3️⃣ Instalar Dependências e Buildar

```bash
# Backend
cd /factor/factor-faq-main/backend
npm install --production

# Frontend
cd /factor/factor-faq-main/frontend
npm install
npm run build
```

**✅ Verificar:** Pasta `frontend/dist/` deve existir com `index.html`

```bash
ls -la /factor/factor-faq-main/frontend/dist/
```

### 4️⃣ Criar Diretório de Logs

```bash
mkdir -p /factor/factor-faq-main/logs
```

### 5️⃣ Iniciar com PM2

```bash
cd /factor/factor-faq-main/backend
```

**⚠️ Porta 80 requer privilégios de root. Escolha uma opção:**

#### Opção A: Usar sudo (mais simples)
```bash
sudo pm2 start ecosystem.config.js
```

#### Opção B: Usar setcap (mais seguro)
```bash
# Dar permissão ao Node.js para usar porta 80
sudo setcap 'cap_net_bind_service=+ep' $(which node)

# Iniciar normalmente
pm2 start ecosystem.config.js
```

### 6️⃣ Configurar Auto-start no Boot

```bash
# Se usou sudo:
sudo pm2 startup systemd
sudo pm2 save

# Se usou setcap (sem sudo):
pm2 startup systemd
# Executar o comando que o PM2 mostrar
pm2 save
```

### 7️⃣ Verificar Status

```bash
pm2 status
# Deve mostrar: factor-faq | online

pm2 logs factor-faq --lines 50
# Verificar se não há erros
```

### 8️⃣ Testar Aplicação

```bash
# Testar API local
curl http://localhost/api/health
# Deve retornar: {"success":true,"message":"API is running"}

# Testar URL externa (se DNS já configurado)
curl http://suporte.factorlog.com.br/api/health
```

### 9️⃣ Criar Usuário Admin

```bash
curl -X POST http://localhost/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Admin Factor",
    "email": "admin@factorlog.com.br",
    "password": "SenhaSegura123!",
    "role": "admin"
  }'
```

### 🔟 Acessar Sistema

Abrir no navegador:
- **Frontend:** http://suporte.factorlog.com.br/
- **API Health:** http://suporte.factorlog.com.br/api/health
- **Login:** http://suporte.factorlog.com.br/login

**Credenciais:**
- Email: `admin@factorlog.com.br`
- Senha: `SenhaSegura123!`

---

## 🔧 Comandos Úteis

### Ver logs em tempo real
```bash
pm2 logs factor-faq
```

### Ver status e uso de recursos
```bash
pm2 status
pm2 monit
```

### Restart aplicação
```bash
pm2 restart factor-faq
```

### Stop aplicação
```bash
pm2 stop factor-faq
```

### Remover aplicação do PM2
```bash
pm2 delete factor-faq
```

---

## 🔄 Atualizar Aplicação

Após fazer alterações no código, use o script de atualização:

```bash
cd /factor/factor-faq-main
chmod +x update.sh  # Primeira vez apenas
./update.sh
```

**OU manualmente:**
```bash
cd /factor/factor-faq-main/frontend
npm install && npm run build

cd /factor/factor-faq-main/backend
npm install --production

pm2 restart factor-faq
```

---

## ⚙️ Configuração DNS (Se necessário)

No provedor de domínio (Registro.br, etc):

```
Tipo: A
Host: suporte
Valor: <IP_PÚBLICO_DO_SERVIDOR_AWS>
TTL: 3600
```

Propagação DNS pode levar até 24 horas.

---

## 🔐 Configuração AWS Security Group

Certifique-se que o Security Group permite:

```
Inbound Rules:
┌─────────────────────────────────────────┐
│ Type: HTTP                              │
│ Protocol: TCP                           │
│ Port: 80                                │
│ Source: 0.0.0.0/0 (anywhere)           │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│ Type: SSH                               │
│ Protocol: TCP                           │
│ Port: 22                                │
│ Source: MEU_IP_FIXO (restrito)         │
└─────────────────────────────────────────┘
```

---

## ⚠️ Troubleshooting

### Problema: Erro "EACCES: permission denied" na porta 80
**Solução:**
```bash
sudo setcap 'cap_net_bind_service=+ep' $(which node)
pm2 restart factor-faq
```

### Problema: Frontend retorna 404
**Verificar build:**
```bash
ls -la /factor/factor-faq-main/frontend/dist/
# Deve ter index.html e assets/
```

**Solução:**
```bash
cd /factor/factor-faq-main/frontend
npm run build
pm2 restart factor-faq
```

### Problema: Erro de conexão com banco
**Verificar:**
```bash
# PostgreSQL rodando?
sudo systemctl status postgresql

# Credenciais corretas?
cat /factor/factor-faq-main/backend/.env.production | grep DATABASE_URL

# Banco existe?
psql -U SEU_USUARIO -h localhost -l | grep factor_faq
```

### Problema: PM2 não mantém app rodando
**Reconfigurar:**
```bash
pm2 unstartup
pm2 startup systemd
# Executar comando sugerido
pm2 save
```

### Ver logs de erro
```bash
# Logs PM2
pm2 logs factor-faq --err

# Logs diretos
tail -f /factor/factor-faq-main/logs/error.log
```

---

## 📊 Monitoramento

### Verificar saúde da aplicação
```bash
# Status PM2
pm2 status

# CPU e Memória
pm2 monit

# Health check
curl http://localhost/api/health

# Conexões PostgreSQL
psql -U postgres -c "SELECT count(*) FROM pg_stat_activity WHERE datname='factor_faq';"
```

---

## 💾 Backup do Banco

### Criar backup
```bash
pg_dump -U SEU_USUARIO -d factor_faq > /opt/backups/factor_faq_$(date +%Y%m%d_%H%M%S).sql
```

### Restaurar backup
```bash
psql -U SEU_USUARIO -d factor_faq < /opt/backups/factor_faq_YYYYMMDD_HHMMSS.sql
```

---

## 📁 Estrutura de Arquivos

```
/factor/factor-faq-main/
├── backend/
│   ├── src/
│   │   └── server.js         (ajustado para .env correto)
│   ├── .env.production        (CONFIGURAR!)
│   ├── ecosystem.config.js    (config PM2)
│   └── package.json
├── frontend/
│   ├── dist/                  (build gerado)
│   ├── .env.production
│   └── package.json
├── logs/
│   ├── error.log
│   └── out.log
└── update.sh                  (script atualização)
```

---

## ✅ Checklist Completo

- [ ] PostgreSQL com banco `factor_faq` criado
- [ ] `.env.production` configurado com credenciais reais
- [ ] JWT secrets gerados e configurados
- [ ] Dependencies backend instaladas
- [ ] Frontend buildado (pasta `dist/` existe)
- [ ] PM2 iniciado e status "online"
- [ ] PM2 configurado para auto-start
- [ ] Porta 80 aberta no Security Group
- [ ] DNS apontando para servidor (se aplicável)
- [ ] `/api/health` retorna sucesso
- [ ] Frontend carrega corretamente
- [ ] Usuário admin criado
- [ ] Login funciona
- [ ] CRUD de FAQs funciona

---

## 📞 Suporte

**Em caso de problemas:**
1. Verificar logs: `pm2 logs factor-faq`
2. Verificar status: `pm2 status`
3. Verificar PostgreSQL: `sudo systemctl status postgresql`
4. Testar health: `curl http://localhost/api/health`

---

## 🎯 Próximos Passos (Opcional)

### Configurar HTTPS com Let's Encrypt
```bash
# Instalar Nginx como reverse proxy
sudo yum install nginx -y

# Instalar Certbot
sudo yum install certbot python3-certbot-nginx -y

# Obter certificado
sudo certbot --nginx -d suporte.factorlog.com.br
```

### Configurar monitoramento com PM2 Plus
```bash
pm2 link <SECRET_KEY> <PUBLIC_KEY>
```

---

**🎉 Deploy Concluído!**

**URL:** http://suporte.factorlog.com.br/
