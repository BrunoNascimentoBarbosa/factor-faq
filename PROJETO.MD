# Factor FAQ - Sistema de Perguntas Frequentes

## Visão Geral
Sistema moderno de FAQ (Perguntas Frequentes) para a empresa FACTOR, que desenvolve sistemas para transportadoras. Construído com React no frontend e Node.js no backend, seguindo as melhores práticas de desenvolvimento.

---

## 🎨 Identidade Visual

### Paleta de Cores
- **Cor Principal**: `#FFAD42` (laranja) - Usar em botões, destaques, ícones e elementos interativos
- **Cor Secundária**: `#2C3E50` (azul escuro) - Textos principais e elementos estruturais
- **Cor de Fundo**: `#F8F9FA` (cinza claro)
- **Cor de Destaque**: `#FFFFFF` (branco) - Cards e elementos de conteúdo

### Design System
- Layout limpo e responsivo com foco em UX
- Tipografia clara e legível (sugestão: Inter, Poppins ou Roboto)
- Design que transmite confiabilidade, tecnologia e suporte próximo ao cliente
- Ícones minimalistas (Lucide React ou React Icons)

---

## 🏗️ Arquitetura do Sistema

### Frontend - React
```
frontend/
├── public/
│   ├── index.html
│   ├── favicon.ico
│   └── assets/
│       └── atendente.jpg
├── src/
│   ├── api/                          # Cliente API
│   │   ├── axios.js                  # Configuração Axios
│   │   └── endpoints.js              # Definição de endpoints
│   ├── components/
│   │   ├── common/                   # Componentes reutilizáveis
│   │   │   ├── Button/
│   │   │   ├── Input/
│   │   │   ├── SearchBar/
│   │   │   ├── Modal/
│   │   │   └── YouTubeEmbed/
│   │   ├── layout/
│   │   │   ├── Header/
│   │   │   ├── Footer/
│   │   │   └── Sidebar/
│   │   └── faq/
│   │       ├── FAQItem/              # Card de FAQ expansível
│   │       ├── FAQList/              # Lista de FAQs
│   │       ├── CategoryFilter/       # Filtro de categorias
│   │       ├── VoteButtons/          # Botões Útil/Não Útil
│   │       └── WhatsAppButton/       # Botão de atendimento
│   ├── contexts/
│   │   ├── AuthContext.jsx           # Contexto de autenticação
│   │   └── FAQContext.jsx            # Contexto de FAQs
│   ├── hooks/
│   │   ├── useAuth.js
│   │   ├── useFAQs.js
│   │   ├── useSearch.js
│   │   ├── useCategories.js
│   │   └── useDebounce.js
│   ├── pages/
│   │   ├── Home/                     # Página principal com FAQs
│   │   ├── Admin/                    # Painel administrativo
│   │   │   ├── Dashboard.jsx
│   │   │   ├── FAQForm.jsx           # Criar/Editar FAQ
│   │   │   └── FAQManagement.jsx     # Gerenciar FAQs
│   │   └── Login/                    # Login admin
│   ├── routes/
│   │   └── AppRoutes.jsx             # Configuração de rotas
│   ├── services/
│   │   ├── faqService.js
│   │   ├── authService.js
│   │   └── categoryService.js
│   ├── styles/
│   │   ├── globals.css
│   │   └── theme.js                  # Tema com cores da FACTOR
│   ├── utils/
│   │   ├── validators.js
│   │   ├── formatters.js
│   │   └── constants.js              # Categorias, etc
│   ├── App.jsx
│   ├── main.jsx
│   └── vite.config.js
├── .env.development
├── .env.production
├── tailwind.config.js
├── package.json
└── README.md
```

### Backend - Node.js
```
backend/
├── src/
│   ├── config/
│   │   ├── database.js               # Configuração MongoDB/PostgreSQL
│   │   ├── env.js                    # Validação variáveis de ambiente
│   │   └── cors.js                   # Configuração CORS
│   ├── controllers/
│   │   ├── faqController.js          # CRUD de FAQs
│   │   ├── authController.js         # Login/Registro
│   │   ├── categoryController.js     # Gestão de categorias
│   │   └── voteController.js         # Sistema de votos
│   ├── middleware/
│   │   ├── auth.js                   # Verificação JWT
│   │   ├── validate.js               # Validação de dados
│   │   ├── errorHandler.js           # Handler de erros global
│   │   └── rateLimiter.js            # Rate limiting
│   ├── models/
│   │   ├── FAQ.js                    # Schema FAQ
│   │   ├── User.js                   # Schema Usuário
│   │   ├── Category.js               # Schema Categoria
│   │   └── Vote.js                   # Schema Voto
│   ├── routes/
│   │   ├── index.js                  # Router principal
│   │   ├── faqRoutes.js
│   │   ├── authRoutes.js
│   │   ├── categoryRoutes.js
│   │   └── voteRoutes.js
│   ├── services/
│   │   ├── faqService.js             # Lógica de negócio
│   │   ├── authService.js
│   │   └── searchService.js          # Busca e filtros
│   ├── validators/
│   │   ├── faqValidator.js           # Schemas Joi/Zod
│   │   ├── authValidator.js
│   │   └── categoryValidator.js
│   ├── utils/
│   │   ├── logger.js                 # Winston logger
│   │   ├── responseFormatter.js
│   │   └── youtubeParser.js          # Extração ID do YouTube
│   ├── app.js                        # Configuração Express
│   └── server.js                     # Entry point
├── tests/
│   ├── unit/
│   ├── integration/
│   └── fixtures/
├── .env.development
├── .env.production
├── package.json
└── README.md
```

---

## 🚀 Stack Tecnológica

### Frontend
| Tecnologia | Uso | Versão |
|------------|-----|--------|
| **React** | Biblioteca UI | 18+ |
| **Vite** | Build tool e dev server | 5+ |
| **React Router** | Roteamento SPA | 6+ |
| **Axios** | Cliente HTTP | Latest |
| **TanStack Query** | Cache e sincronização de dados | 5+ |
| **Tailwind CSS** | Framework CSS | 3+ |
| **Lucide React** | Ícones | Latest |
| **React Hook Form** | Gerenciamento de formulários | 7+ |
| **Zod** | Validação de schemas | Latest |
| **Framer Motion** | Animações | Latest |
| **React YouTube** | Player YouTube | Latest |
| **Vitest** | Testes unitários | Latest |
| **React Testing Library** | Testes de componentes | Latest |

### Backend
| Tecnologia | Uso | Versão |
|------------|-----|--------|
| **Node.js** | Runtime JavaScript | 18+ |
| **Express.js** | Framework web | 4+ |
| **MongoDB** | Banco de dados NoSQL | 6+ |
| **Mongoose** | ODM para MongoDB | 8+ |
| **JWT** | Autenticação | Latest |
| **bcrypt** | Hash de senhas | Latest |
| **Joi** | Validação de dados | Latest |
| **Winston** | Logging | Latest |
| **Helmet** | Segurança HTTP headers | Latest |
| **express-rate-limit** | Rate limiting | Latest |
| **cors** | CORS | Latest |
| **dotenv** | Variáveis de ambiente | Latest |
| **Jest** | Framework de testes | Latest |
| **Supertest** | Testes de API | Latest |

---

## 📋 Funcionalidades do Sistema

### 🔝 Página Principal (Pública)

#### Cabeçalho
- Título principal: **"Estamos aqui para ajudar 🚚"**
- Barra de pesquisa com placeholder: "Pesquise sua dúvida..."
  - Filtro em tempo real usando debounce (300ms)
  - Busca por título e corpo do FAQ
  - Highlight dos termos encontrados

#### Coluna Lateral - Categorias
Menu fixo vertical com as 4 categorias:
- 🚛 **Cadastro**
- 📊 **Monitoramento**
- 📏 **Medição**
- 💰 **Financeiro**

**Comportamento:**
- Categoria selecionada: fundo `#FFAD42` + texto branco
- Categoria não selecionada: fundo branco + texto cinza
- Hover: leve destaque
- Contador de FAQs por categoria
- Opção "Todas as categorias"

#### Área Principal - Listagem de FAQs
Cada card de FAQ contém:
- **Título** (em negrito, clicável para expandir)
- **Badge(s) de categoria** (com cor `#FFAD42`)
- **Corpo da resposta** (texto rico, suporta markdown/HTML)
- **Player de vídeo YouTube** (se houver link)
  - Embed responsivo
  - Validação e extração automática do ID
- **Sistema de votos**:
  - "Essa resposta foi útil para você?"
  - Botões: 👍 Sim / 👎 Não
  - Contador de votos
  - Feedback visual após voto

**Interações:**
- Expansão/recolhimento com animação suave
- Lazy loading para performance
- Skeleton loading durante carregamento

#### Rodapé - Atendimento Humano
Seção com fundo claro e centralizada:
- Texto: **"Não encontrou o que procurava? Fale conosco!"**
- Botão WhatsApp:
  - Cor de fundo: `#FFAD42`
  - Ícone do WhatsApp
  - Texto: "Atendimento via WhatsApp"
  - Link: `https://wa.me/55XXXXXXXXXX?text=Olá,%20preciso%20de%20ajuda%20sobre%20o%20sistema%20FACTOR`
- Foto do atendente (círculo, ao lado do botão)
- Horário de atendimento

### 🔐 Painel Administrativo (Protegido)

#### Login
- Autenticação via email/senha
- JWT com refresh token
- Sessão persistente

#### Dashboard
- Total de FAQs publicados
- FAQs mais visualizados
- FAQs com mais votos positivos/negativos
- Gráficos de analytics
- Últimas atividades

#### Gerenciamento de FAQs
**Listagem:**
- Tabela com todas as FAQs
- Filtros por categoria e status
- Busca por título
- Ordenação por data, visualizações, votos
- Ações: Editar, Excluir, Publicar/Despublicar

**Formulário de Criação/Edição:**
- **Título** (obrigatório, max 200 caracteres)
- **Categoria(s)** (múltipla escolha via checkboxes)
  - Cadastro
  - Monitoramento
  - Medição
  - Financeiro
- **Corpo** (editor rich text - TinyMCE ou Quill)
  - Suporte a formatação
  - Links
  - Listas
  - Imagens
- **Link do vídeo YouTube** (opcional)
  - Validação de URL
  - Preview do vídeo
- **Status** (Publicado/Rascunho)
- **Tags** (opcional)
- Preview em tempo real
- Botões: Salvar, Cancelar, Salvar como Rascunho

#### Gerenciamento de Categorias
- CRUD completo de categorias
- Definir ícone e cor
- Ordenação

---

## 💻 Implementação Técnica

### Componentes React - Exemplos de Código

#### 1. FAQItem Component
```jsx
// components/faq/FAQItem/FAQItem.jsx
import { useState } from 'react';
import { ChevronDown, ThumbsUp, ThumbsDown } from 'lucide-react';
import YouTubeEmbed from '@/components/common/YouTubeEmbed';
import VoteButtons from '@/components/faq/VoteButtons';

export const FAQItem = ({ faq, onVote }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <article className="bg-white rounded-lg shadow-md p-6 mb-4 transition-all hover:shadow-lg">
      <div
        className="flex justify-between items-start cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <h3 className="text-lg font-semibold text-gray-800 flex-1">
          {faq.title}
        </h3>
        <ChevronDown
          className={`w-5 h-5 text-gray-500 transition-transform ${
            isExpanded ? 'rotate-180' : ''
          }`}
        />
      </div>

      <div className="flex gap-2 mt-2">
        {faq.categories.map(cat => (
          <span
            key={cat}
            className="px-3 py-1 bg-[#FFAD42] text-white text-sm rounded-full"
          >
            {cat}
          </span>
        ))}
      </div>

      {isExpanded && (
        <div className="mt-4 animate-slideDown">
          <div
            className="prose prose-sm max-w-none text-gray-700"
            dangerouslySetInnerHTML={{ __html: faq.answer }}
          />

          {faq.youtubeUrl && (
            <div className="mt-4">
              <YouTubeEmbed url={faq.youtubeUrl} />
            </div>
          )}

          <VoteButtons
            faqId={faq._id}
            helpful={faq.helpful}
            notHelpful={faq.notHelpful}
            onVote={onVote}
          />
        </div>
      )}
    </article>
  );
};
```

#### 2. SearchBar Component
```jsx
// components/common/SearchBar/SearchBar.jsx
import { useState } from 'react';
import { Search } from 'lucide-react';
import { useDebounce } from '@/hooks/useDebounce';

export const SearchBar = ({ onSearch }) => {
  const [value, setValue] = useState('');
  const debouncedValue = useDebounce(value, 300);

  useEffect(() => {
    onSearch(debouncedValue);
  }, [debouncedValue, onSearch]);

  return (
    <div className="relative max-w-2xl mx-auto">
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Pesquise sua dúvida..."
        className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#FFAD42] focus:outline-none transition-colors"
      />
    </div>
  );
};
```

#### 3. CategoryFilter Component
```jsx
// components/faq/CategoryFilter/CategoryFilter.jsx
import { Truck, BarChart3, Ruler, DollarSign } from 'lucide-react';

const CATEGORIES = [
  { id: 'cadastro', name: 'Cadastro', icon: Truck },
  { id: 'monitoramento', name: 'Monitoramento', icon: BarChart3 },
  { id: 'medicao', name: 'Medição', icon: Ruler },
  { id: 'financeiro', name: 'Financeiro', icon: DollarSign },
];

export const CategoryFilter = ({ selected, onSelect, counts }) => {
  return (
    <aside className="w-64 bg-white rounded-lg shadow-md p-4 sticky top-4">
      <h2 className="text-lg font-semibold mb-4 text-gray-800">Categorias</h2>

      <button
        onClick={() => onSelect(null)}
        className={`w-full text-left px-4 py-3 rounded-lg mb-2 transition-colors ${
          !selected
            ? 'bg-[#FFAD42] text-white'
            : 'hover:bg-gray-100 text-gray-700'
        }`}
      >
        Todas as categorias
      </button>

      {CATEGORIES.map(({ id, name, icon: Icon }) => (
        <button
          key={id}
          onClick={() => onSelect(id)}
          className={`w-full text-left px-4 py-3 rounded-lg mb-2 flex items-center gap-3 transition-colors ${
            selected === id
              ? 'bg-[#FFAD42] text-white'
              : 'hover:bg-gray-100 text-gray-700'
          }`}
        >
          <Icon className="w-5 h-5" />
          <span className="flex-1">{name}</span>
          <span className="text-sm">{counts[id] || 0}</span>
        </button>
      ))}
    </aside>
  );
};
```

#### 4. Custom Hook - useFAQs
```jsx
// hooks/useFAQs.js
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { faqService } from '@/services/faqService';

export const useFAQs = (filters = {}) => {
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ['faqs', filters],
    queryFn: () => faqService.getAll(filters),
    staleTime: 5 * 60 * 1000, // 5 minutos
  });

  const voteMutation = useMutation({
    mutationFn: ({ faqId, isHelpful }) =>
      faqService.vote(faqId, isHelpful),
    onSuccess: () => {
      queryClient.invalidateQueries(['faqs']);
    },
  });

  return {
    faqs: data?.data || [],
    isLoading,
    error,
    vote: voteMutation.mutate,
  };
};
```

### Backend - Exemplos de Código

#### 1. FAQ Model (Mongoose)
```javascript
// models/FAQ.js
const mongoose = require('mongoose');

const faqSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Título é obrigatório'],
    trim: true,
    maxlength: [200, 'Título não pode exceder 200 caracteres']
  },
  answer: {
    type: String,
    required: [true, 'Resposta é obrigatória'],
    trim: true
  },
  categories: [{
    type: String,
    enum: ['cadastro', 'monitoramento', 'medicao', 'financeiro'],
    required: true
  }],
  youtubeUrl: {
    type: String,
    validate: {
      validator: function(v) {
        if (!v) return true;
        return /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/.test(v);
      },
      message: 'URL do YouTube inválida'
    }
  },
  tags: [String],
  views: {
    type: Number,
    default: 0
  },
  helpful: {
    type: Number,
    default: 0
  },
  notHelpful: {
    type: Number,
    default: 0
  },
  isPublished: {
    type: Boolean,
    default: true
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

// Índices para performance
faqSchema.index({ title: 'text', answer: 'text' });
faqSchema.index({ categories: 1, isPublished: 1 });
faqSchema.index({ createdAt: -1 });

module.exports = mongoose.model('FAQ', faqSchema);
```

#### 2. FAQ Controller
```javascript
// controllers/faqController.js
const faqService = require('../services/faqService');
const { asyncHandler } = require('../utils/asyncHandler');

class FAQController {
  // Listar FAQs com filtros
  getAll = asyncHandler(async (req, res) => {
    const { category, search, page = 1, limit = 10 } = req.query;

    const result = await faqService.getAll({
      category,
      search,
      page: parseInt(page),
      limit: parseInt(limit),
      isPublished: true
    });

    res.status(200).json({
      success: true,
      data: result.faqs,
      pagination: {
        total: result.total,
        page: result.page,
        pages: result.pages
      }
    });
  });

  // Buscar FAQ por ID
  getById = asyncHandler(async (req, res) => {
    const faq = await faqService.getById(req.params.id);

    if (!faq) {
      return res.status(404).json({
        success: false,
        message: 'FAQ não encontrado'
      });
    }

    // Incrementar visualizações
    await faqService.incrementViews(faq._id);

    res.status(200).json({
      success: true,
      data: faq
    });
  });

  // Criar FAQ (admin)
  create = asyncHandler(async (req, res) => {
    const faq = await faqService.create({
      ...req.body,
      createdBy: req.user._id
    });

    res.status(201).json({
      success: true,
      data: faq,
      message: 'FAQ criado com sucesso'
    });
  });

  // Atualizar FAQ (admin)
  update = asyncHandler(async (req, res) => {
    const faq = await faqService.update(req.params.id, req.body);

    if (!faq) {
      return res.status(404).json({
        success: false,
        message: 'FAQ não encontrado'
      });
    }

    res.status(200).json({
      success: true,
      data: faq,
      message: 'FAQ atualizado com sucesso'
    });
  });

  // Deletar FAQ (admin)
  delete = asyncHandler(async (req, res) => {
    const faq = await faqService.delete(req.params.id);

    if (!faq) {
      return res.status(404).json({
        success: false,
        message: 'FAQ não encontrado'
      });
    }

    res.status(200).json({
      success: true,
      message: 'FAQ deletado com sucesso'
    });
  });

  // Votar em FAQ
  vote = asyncHandler(async (req, res) => {
    const { isHelpful } = req.body;
    const faq = await faqService.vote(req.params.id, isHelpful);

    res.status(200).json({
      success: true,
      data: {
        helpful: faq.helpful,
        notHelpful: faq.notHelpful
      }
    });
  });
}

module.exports = new FAQController();
```

#### 3. FAQ Service
```javascript
// services/faqService.js
const FAQ = require('../models/FAQ');

class FAQService {
  async getAll(filters) {
    const { category, search, page, limit, isPublished } = filters;

    const query = {};

    if (isPublished !== undefined) {
      query.isPublished = isPublished;
    }

    if (category) {
      query.categories = category;
    }

    if (search) {
      query.$text = { $search: search };
    }

    const skip = (page - 1) * limit;

    const [faqs, total] = await Promise.all([
      FAQ.find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .populate('createdBy', 'name email'),
      FAQ.countDocuments(query)
    ]);

    return {
      faqs,
      total,
      page,
      pages: Math.ceil(total / limit)
    };
  }

  async getById(id) {
    return FAQ.findById(id).populate('createdBy', 'name email');
  }

  async create(data) {
    const faq = new FAQ(data);
    return faq.save();
  }

  async update(id, data) {
    return FAQ.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true
    });
  }

  async delete(id) {
    return FAQ.findByIdAndDelete(id);
  }

  async vote(id, isHelpful) {
    const field = isHelpful ? 'helpful' : 'notHelpful';
    return FAQ.findByIdAndUpdate(
      id,
      { $inc: { [field]: 1 } },
      { new: true }
    );
  }

  async incrementViews(id) {
    return FAQ.findByIdAndUpdate(
      id,
      { $inc: { views: 1 } },
      { new: true }
    );
  }

  async getCategoryCounts() {
    const counts = await FAQ.aggregate([
      { $match: { isPublished: true } },
      { $unwind: '$categories' },
      { $group: { _id: '$categories', count: { $sum: 1 } } }
    ]);

    return counts.reduce((acc, { _id, count }) => {
      acc[_id] = count;
      return acc;
    }, {});
  }
}

module.exports = new FAQService();
```

#### 4. Rotas
```javascript
// routes/faqRoutes.js
const express = require('express');
const faqController = require('../controllers/faqController');
const { authMiddleware, adminMiddleware } = require('../middleware/auth');
const { validate } = require('../middleware/validate');
const { faqValidator } = require('../validators/faqValidator');

const router = express.Router();

// Rotas públicas
router.get('/', faqController.getAll);
router.get('/:id', faqController.getById);
router.post('/:id/vote', faqController.vote);

// Rotas admin (protegidas)
router.post(
  '/',
  authMiddleware,
  adminMiddleware,
  validate(faqValidator.create),
  faqController.create
);

router.put(
  '/:id',
  authMiddleware,
  adminMiddleware,
  validate(faqValidator.update),
  faqController.update
);

router.delete(
  '/:id',
  authMiddleware,
  adminMiddleware,
  faqController.delete
);

module.exports = router;
```

#### 5. Validação (Joi)
```javascript
// validators/faqValidator.js
const Joi = require('joi');

const faqValidator = {
  create: Joi.object({
    title: Joi.string().required().max(200).messages({
      'string.empty': 'Título é obrigatório',
      'string.max': 'Título não pode exceder 200 caracteres'
    }),
    answer: Joi.string().required().messages({
      'string.empty': 'Resposta é obrigatória'
    }),
    categories: Joi.array()
      .items(Joi.string().valid('cadastro', 'monitoramento', 'medicao', 'financeiro'))
      .min(1)
      .required()
      .messages({
        'array.min': 'Selecione pelo menos uma categoria'
      }),
    youtubeUrl: Joi.string().uri().allow('').optional(),
    tags: Joi.array().items(Joi.string()).optional(),
    isPublished: Joi.boolean().default(true)
  }),

  update: Joi.object({
    title: Joi.string().max(200),
    answer: Joi.string(),
    categories: Joi.array()
      .items(Joi.string().valid('cadastro', 'monitoramento', 'medicao', 'financeiro'))
      .min(1),
    youtubeUrl: Joi.string().uri().allow(''),
    tags: Joi.array().items(Joi.string()),
    isPublished: Joi.boolean()
  }).min(1)
};

module.exports = { faqValidator };
```

#### 6. Middleware de Autenticação
```javascript
// middleware/auth.js
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Token de acesso necessário'
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select('-password');

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Token inválido'
      });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Token inválido ou expirado'
    });
  }
};

const adminMiddleware = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({
      success: false,
      message: 'Acesso negado. Apenas administradores'
    });
  }
  next();
};

module.exports = { authMiddleware, adminMiddleware };
```

---

## 🔒 Segurança

### Backend
```javascript
// app.js
const express = require('express');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const rateLimit = require('express-rate-limit');
const cors = require('cors');

const app = express();

// Security headers
app.use(helmet());

// Sanitização contra NoSQL injection
app.use(mongoSanitize());

// Prevenção XSS
app.use(xss());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // 100 requisições por IP
  message: 'Muitas requisições deste IP, tente novamente mais tarde'
});
app.use('/api/', limiter);

// CORS
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}));

// Body parser
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
```

---

## 🧪 Testes

### Frontend (Vitest + React Testing Library)
```jsx
// components/faq/FAQItem/FAQItem.test.jsx
import { render, screen, fireEvent } from '@testing-library/react';
import { FAQItem } from './FAQItem';

describe('FAQItem', () => {
  const mockFAQ = {
    _id: '1',
    title: 'Como cadastrar transportadora?',
    answer: '<p>Acesse o menu Empresas...</p>',
    categories: ['cadastro'],
    helpful: 10,
    notHelpful: 2
  };

  it('deve renderizar título da FAQ', () => {
    render(<FAQItem faq={mockFAQ} />);
    expect(screen.getByText(mockFAQ.title)).toBeInTheDocument();
  });

  it('deve expandir resposta ao clicar', () => {
    render(<FAQItem faq={mockFAQ} />);

    const title = screen.getByText(mockFAQ.title);
    fireEvent.click(title);

    expect(screen.getByText(/Acesse o menu Empresas/)).toBeInTheDocument();
  });

  it('deve exibir categorias', () => {
    render(<FAQItem faq={mockFAQ} />);
    expect(screen.getByText('cadastro')).toBeInTheDocument();
  });
});
```

### Backend (Jest + Supertest)
```javascript
// tests/integration/faq.test.js
const request = require('supertest');
const app = require('../../src/app');
const FAQ = require('../../src/models/FAQ');

describe('FAQ API', () => {
  beforeEach(async () => {
    await FAQ.deleteMany({});
  });

  describe('GET /api/faqs', () => {
    it('deve retornar todas as FAQs publicadas', async () => {
      await FAQ.create({
        title: 'Teste',
        answer: 'Resposta',
        categories: ['cadastro'],
        createdBy: 'userId'
      });

      const res = await request(app)
        .get('/api/faqs')
        .expect(200);

      expect(res.body.success).toBe(true);
      expect(res.body.data).toHaveLength(1);
    });

    it('deve filtrar por categoria', async () => {
      await FAQ.create([
        {
          title: 'FAQ 1',
          answer: 'Resposta 1',
          categories: ['cadastro'],
          createdBy: 'userId'
        },
        {
          title: 'FAQ 2',
          answer: 'Resposta 2',
          categories: ['financeiro'],
          createdBy: 'userId'
        }
      ]);

      const res = await request(app)
        .get('/api/faqs?category=cadastro')
        .expect(200);

      expect(res.body.data).toHaveLength(1);
      expect(res.body.data[0].categories).toContain('cadastro');
    });
  });

  describe('POST /api/faqs', () => {
    it('deve criar nova FAQ com autenticação', async () => {
      const newFAQ = {
        title: 'Nova FAQ',
        answer: 'Nova resposta',
        categories: ['monitoramento']
      };

      const res = await request(app)
        .post('/api/faqs')
        .set('Authorization', `Bearer ${adminToken}`)
        .send(newFAQ)
        .expect(201);

      expect(res.body.data.title).toBe(newFAQ.title);
    });

    it('deve retornar erro sem autenticação', async () => {
      await request(app)
        .post('/api/faqs')
        .send({ title: 'Teste' })
        .expect(401);
    });
  });
});
```

---

## 🌍 Variáveis de Ambiente

### Backend (.env)
```bash
# Server
NODE_ENV=development
PORT=5000

# Database
MONGODB_URI=mongodb://localhost:27017/factor-faq
# ou PostgreSQL:
# DATABASE_URL=postgresql://user:password@localhost:5432/factor-faq

# JWT
JWT_SECRET=your-super-secret-jwt-key-change-in-production
JWT_EXPIRE=7d
JWT_REFRESH_SECRET=your-refresh-token-secret
JWT_REFRESH_EXPIRE=30d

# CORS
FRONTEND_URL=http://localhost:3000

# Email (opcional)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password

# WhatsApp
WHATSAPP_NUMBER=5511999999999
```

### Frontend (.env)
```bash
VITE_API_URL=http://localhost:5000/api
VITE_APP_NAME=Factor FAQ
VITE_WHATSAPP_NUMBER=5511999999999
VITE_WHATSAPP_MESSAGE=Olá, preciso de ajuda sobre o sistema FACTOR
```

---

## 📦 Scripts Package.json

### Frontend
```json
{
  "name": "factor-faq-frontend",
  "version": "1.0.0",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "lint": "eslint . --ext js,jsx --report-unused-disable-directives --max-warnings 0",
    "format": "prettier --write \"src/**/*.{js,jsx,json,css}\"",
    "test": "vitest",
    "test:ui": "vitest --ui",
    "test:coverage": "vitest --coverage"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.20.0",
    "@tanstack/react-query": "^5.17.0",
    "axios": "^1.6.2",
    "react-hook-form": "^7.49.2",
    "zod": "^3.22.4",
    "@hookform/resolvers": "^3.3.3",
    "lucide-react": "^0.303.0",
    "framer-motion": "^10.16.16",
    "react-youtube": "^10.1.0",
    "clsx": "^2.0.0"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.2.1",
    "vite": "^5.0.8",
    "tailwindcss": "^3.4.0",
    "autoprefixer": "^10.4.16",
    "postcss": "^8.4.32",
    "eslint": "^8.56.0",
    "prettier": "^3.1.1",
    "vitest": "^1.1.0",
    "@testing-library/react": "^14.1.2",
    "@testing-library/jest-dom": "^6.1.5"
  }
}
```

### Backend
```json
{
  "name": "factor-faq-backend",
  "version": "1.0.0",
  "scripts": {
    "start": "node src/server.js",
    "dev": "nodemon src/server.js",
    "test": "jest --watchAll --verbose",
    "test:coverage": "jest --coverage",
    "lint": "eslint . --ext .js",
    "format": "prettier --write \"src/**/*.js\""
  },
  "dependencies": {
    "express": "^4.18.2",
    "mongoose": "^8.0.3",
    "jsonwebtoken": "^9.0.2",
    "bcryptjs": "^2.4.3",
    "joi": "^17.11.0",
    "dotenv": "^16.3.1",
    "cors": "^2.8.5",
    "helmet": "^7.1.0",
    "express-rate-limit": "^7.1.5",
    "express-mongo-sanitize": "^2.2.0",
    "xss-clean": "^0.1.4",
    "winston": "^3.11.0"
  },
  "devDependencies": {
    "nodemon": "^3.0.2",
    "jest": "^29.7.0",
    "supertest": "^6.3.3",
    "eslint": "^8.56.0",
    "prettier": "^3.1.1"
  }
}
```

---

## 📡 API REST - Documentação

### Base URL
```
http://localhost:5000/api
```

### Endpoints

#### FAQs

| Método | Endpoint | Descrição | Auth |
|--------|----------|-----------|------|
| GET | `/faqs` | Lista todas FAQs | Não |
| GET | `/faqs/:id` | Busca FAQ por ID | Não |
| POST | `/faqs` | Cria nova FAQ | Admin |
| PUT | `/faqs/:id` | Atualiza FAQ | Admin |
| DELETE | `/faqs/:id` | Deleta FAQ | Admin |
| POST | `/faqs/:id/vote` | Vota em FAQ | Não |

**GET /faqs - Query Parameters:**
```
?category=cadastro          # Filtrar por categoria
&search=transportadora      # Busca por termo
&page=1                     # Paginação
&limit=10                   # Itens por página
&sort=-createdAt           # Ordenação
```

**POST /faqs - Request Body:**
```json
{
  "title": "Como cadastrar transportadora?",
  "answer": "<p>Para cadastrar...</p>",
  "categories": ["cadastro"],
  "youtubeUrl": "https://youtube.com/watch?v=xxxxx",
  "tags": ["cadastro", "transportadora"],
  "isPublished": true
}
```

**POST /faqs/:id/vote - Request Body:**
```json
{
  "isHelpful": true  // true para 👍, false para 👎
}
```

#### Categorias

| Método | Endpoint | Descrição | Auth |
|--------|----------|-----------|------|
| GET | `/categories` | Lista categorias | Não |
| GET | `/categories/counts` | Contador por categoria | Não |
| POST | `/categories` | Cria categoria | Admin |
| PUT | `/categories/:id` | Atualiza categoria | Admin |
| DELETE | `/categories/:id` | Deleta categoria | Admin |

#### Autenticação

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| POST | `/auth/register` | Registra admin |
| POST | `/auth/login` | Login |
| POST | `/auth/refresh` | Refresh token |
| POST | `/auth/logout` | Logout |
| GET | `/auth/me` | Usuário atual |

**POST /auth/login - Request:**
```json
{
  "email": "admin@factor.com",
  "password": "senha123"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "xxx",
      "name": "Admin",
      "email": "admin@factor.com",
      "role": "admin"
    },
    "token": "eyJhbGciOiJIUzI1NiIs...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIs..."
  }
}
```

---

## 🚀 Deploy

### Frontend (Vercel)
```bash
# Instalar Vercel CLI
npm i -g vercel

# Deploy
vercel --prod

# Ou via GitHub (automático)
# Push para main -> deploy automático
```

**vercel.json:**
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite",
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

### Backend (Railway/Render)

**Railway:**
```bash
# Instalar Railway CLI
npm i -g @railway/cli

# Login
railway login

# Deploy
railway up
```

**Render:**
- Conectar repositório GitHub
- Build Command: `npm install`
- Start Command: `npm start`
- Adicionar variáveis de ambiente

### Banco de Dados

**MongoDB Atlas:**
1. Criar cluster gratuito
2. Configurar IP Whitelist (0.0.0.0/0 para acesso público)
3. Criar usuário
4. Copiar connection string
5. Atualizar `MONGODB_URI` no .env

---

## 🎯 Configuração do Tailwind

```javascript
// tailwind.config.js
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#FFAD42',
        secondary: '#2C3E50',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        slideDown: 'slideDown 0.3s ease-out',
      },
      keyframes: {
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
```

---

## 📊 Melhorias Futuras

### Fase 2
- [ ] Sistema de notificações para admins
- [ ] Analytics completo (Google Analytics, Hotjar)
- [ ] Sistema de tags e busca avançada
- [ ] Exportação de FAQs (PDF, CSV)
- [ ] Versionamento de FAQs (histórico)
- [ ] Comentários e discussões em FAQs
- [ ] Sistema de anexos (PDFs, imagens)

### Fase 3
- [ ] PWA (Progressive Web App)
- [ ] Modo offline
- [ ] Internacionalização (PT/EN/ES)
- [ ] Dark mode
- [ ] ElasticSearch para busca avançada
- [ ] Redis para cache
- [ ] GraphQL como alternativa REST
- [ ] WebSocket para atualizações em tempo real

### Fase 4
- [ ] API pública com documentação Swagger
- [ ] Rate limiting por usuário
- [ ] Métricas e dashboard de analytics
- [ ] A/B testing de respostas
- [ ] IA para sugestões de FAQs relacionados
- [ ] Chatbot integrado

---

## 📝 Comandos de Instalação

### Iniciar Projeto Frontend
```bash
# Criar projeto Vite + React
npm create vite@latest frontend -- --template react

cd frontend

# Instalar dependências
npm install react-router-dom @tanstack/react-query axios react-hook-form zod @hookform/resolvers lucide-react framer-motion react-youtube clsx

# Instalar Tailwind
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

# Instalar ferramentas de desenvolvimento
npm install -D eslint prettier vitest @testing-library/react @testing-library/jest-dom

# Rodar projeto
npm run dev
```

### Iniciar Projeto Backend
```bash
# Criar diretório
mkdir backend && cd backend

# Inicializar npm
npm init -y

# Instalar dependências
npm install express mongoose jsonwebtoken bcryptjs joi dotenv cors helmet express-rate-limit express-mongo-sanitize xss-clean winston

# Instalar dev dependencies
npm install -D nodemon jest supertest eslint prettier

# Rodar projeto
npm run dev
```

---

## 📚 Recursos e Documentação

- **React**: https://react.dev/
- **Vite**: https://vitejs.dev/
- **TanStack Query**: https://tanstack.com/query/latest
- **Tailwind CSS**: https://tailwindcss.com/
- **Express**: https://expressjs.com/
- **Mongoose**: https://mongoosejs.com/
- **JWT**: https://jwt.io/

---

## 👥 Equipe e Contato

**Desenvolvedor:** [Seu nome]
**Empresa:** FACTOR - Sistemas para Transportadoras
**Suporte:** [WhatsApp configurado]

---

## 📄 Licença

Propriedade da empresa FACTOR. Todos os direitos reservados.
