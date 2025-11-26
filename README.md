# Factor-FAQ

Este projeto é um **sistema de treinamento** para a empresa FACTOR, com um FAQ (Perguntas Frequentes) moderno construído com React no frontend e Node.js no backend.

## 🚀 Tecnologias

### Frontend
- React 18
- Vite
- Tailwind CSS
- React Router
- TanStack Query
- Axios
- Framer Motion

### Backend
- Node.js
- Express.js
- **PostgreSQL**
- JWT Authentication
- Joi Validation

## 📋 Pré-requisitos

- **Node.js**: v18 ou superior
- **npm** ou **yarn**
- **PostgreSQL**: É necessário ter o PostgreSQL instalado e rodando na sua máquina. Você pode baixá-lo [aqui](https://www.postgresql.org/download/).

## 🔧 Configuração do Ambiente Local

Siga os passos abaixo para configurar e executar o projeto localmente.

1.  **Clone o repositório**
    ```bash
    git clone <URL_DO_SEU_REPOSITORIO>
    cd Factor-FAQ
    ```

### Backend

1.  **Navegue até a pasta do backend e instale as dependências:**
    ```bash
    cd backend
    npm install
    ```

2.  **Configure as variáveis de ambiente:**
    Crie um arquivo chamado `.env.development` na pasta `backend` e adicione o seguinte conteúdo. Certifique-se de que o banco de dados `factor_faq` exista no seu servidor PostgreSQL.

    ```env
    # backend/.env.development
    NODE_ENV=development
    PORT=5000
    DATABASE_URL="postgresql://SEU_USUARIO:SUA_SENHA@localhost:5432/factor_faq"
    JWT_SECRET=sua-chave-secreta-para-jwt
    JWT_EXPIRE=7d
    FRONTEND_URL=http://localhost:3000
    ```

3.  **Inicie o servidor de desenvolvimento do backend:**
    ```bash
    npm run dev
    ```
    O servidor estará rodando em `http://localhost:5000`.

### Frontend

1.  **Em um novo terminal, navegue até a pasta do frontend e instale as dependências:**
    ```bash
    cd frontend
    npm install
    ```

2.  **Inicie o servidor de desenvolvimento do frontend:**
    ```bash
    npm run dev
    ```
    A aplicação estará acessível em `http://localhost:3000`.

## 👤 Criando um usuário admin

Para acessar o painel administrativo, você precisa criar um usuário com a permissão de `admin`. Você pode fazer isso enviando uma requisição para a API usando um cliente REST como Insomnia ou Postman.

**Endpoint:** `POST http://localhost:5000/api/auth/register`

**Body (JSON):**
```json
{
  "name": "Admin",
  "email": "admin@factor.com",
  "password": "SuaSenhaSegura123!",
  "role": "admin"
}
```

Após criar o usuário, faça login em `http://localhost:3000/login`

## 📡 Endpoints da API

### FAQs
- `GET /api/faqs` - Lista todas as FAQs
- `GET /api/faqs/:id` - Busca FAQ por ID
- `POST /api/faqs` - Cria nova FAQ (admin)
- `PUT /api/faqs/:id` - Atualiza FAQ (admin)
- `DELETE /api/faqs/:id` - Deleta FAQ (admin)
- `POST /api/faqs/:id/vote` - Vota em FAQ

### Categorias
- `GET /api/categories` - Lista categorias
- `GET /api/categories/counts` - Contador por categoria

### Autenticação
- `POST /api/auth/register` - Registra usuário
- `POST /api/auth/login` - Login
- `GET /api/auth/me` - Usuário atual
- `POST /api/auth/logout` - Logout

## 🎨 Funcionalidades

- ✅ Listagem de FAQs com filtros por categoria
- ✅ Busca em tempo real
- ✅ Sistema de votos (útil/não útil)
- ✅ Player de vídeos do YouTube
- ✅ Painel administrativo
- ✅ Autenticação JWT
- ✅ Responsivo
- ✅ Integração WhatsApp

## 🔐 Segurança

- Helmet para headers HTTP seguros
- Rate limiting
- Sanitização contra NoSQL injection
- Prevenção XSS
- CORS configurado
- Senhas com hash bcrypt

## 📝 Licença

Propriedade da empresa FACTOR. Todos os direitos reservados.
