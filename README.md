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

Configure as variáveis de ambiente criando um arquivo `.env.development`:
```bash
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/factor-faq
JWT_SECRET=your-secret-key
JWT_EXPIRE=7d
FRONTEND_URL=http://localhost:3000
```

Inicie o servidor:
```bash
npm run dev
```

### Frontend

```bash
cd frontend
npm install
```

Configure as variáveis de ambiente no `.env.development` (já está criado).

Inicie o aplicativo:
```bash
npm run dev
```

## 👤 Criando um usuário admin

Para acessar o painel administrativo, você precisa criar um usuário. Você pode fazer isso usando um cliente REST como Insomnia ou Postman:

**POST** `http://localhost:5000/api/auth/register`

Body:
```json
{
  "name": "Admin",
  "email": "admin@factor.com",
  "password": "senha123",
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
