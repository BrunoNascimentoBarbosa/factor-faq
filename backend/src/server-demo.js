require('dotenv').config({ path: '.env.development' });
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(helmet());
app.use(cors({ origin: '*' }));
app.use(express.json());

// Mock data - Começando com array vazio para dados reais
let faqs = [];

let users = [
  {
    _id: '1',
    name: 'Admin FACTOR',
    email: 'admin@factor.com',
    password: '$2a$10$rZ5qH8QqH8QqH8QqH8QqH.4vZ5qH8QqH8QqH8QqH8QqH8QqH8QqH8Q', // senha123
    role: 'admin',
    isActive: true
  }
];

// Routes
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Factor FAQ API - DEMO MODE (sem MongoDB)',
    version: '1.0.0',
    endpoints: {
      health: '/api/health',
      faqs: '/api/faqs',
      categories: '/api/categories',
      auth: '/api/auth'
    }
  });
});

app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'API is running in DEMO mode',
    timestamp: new Date().toISOString()
  });
});

// FAQ routes
app.get('/api/faqs', (req, res) => {
  const { category, search } = req.query;

  let filtered = [...faqs];

  if (category) {
    filtered = filtered.filter(faq => faq.categories.includes(category));
  }

  if (search) {
    const searchLower = search.toLowerCase();
    filtered = filtered.filter(faq =>
      faq.title.toLowerCase().includes(searchLower) ||
      faq.answer.toLowerCase().includes(searchLower)
    );
  }

  res.json({
    success: true,
    data: filtered,
    pagination: {
      total: filtered.length,
      page: 1,
      pages: 1
    }
  });
});

app.get('/api/faqs/:id', (req, res) => {
  const faq = faqs.find(f => f._id === req.params.id);

  if (!faq) {
    return res.status(404).json({
      success: false,
      message: 'FAQ não encontrado'
    });
  }

  // Incrementar views
  faq.views++;

  res.json({
    success: true,
    data: faq
  });
});

// Create FAQ
app.post('/api/faqs', (req, res) => {
  const newFAQ = {
    _id: String(faqs.length + 1),
    ...req.body,
    views: 0,
    helpful: 0,
    notHelpful: 0,
    createdAt: new Date()
  };

  faqs.push(newFAQ);

  res.status(201).json({
    success: true,
    data: newFAQ,
    message: 'FAQ criado com sucesso'
  });
});

// Update FAQ
app.put('/api/faqs/:id', (req, res) => {
  const index = faqs.findIndex(f => f._id === req.params.id);

  if (index === -1) {
    return res.status(404).json({
      success: false,
      message: 'FAQ não encontrado'
    });
  }

  faqs[index] = {
    ...faqs[index],
    ...req.body
  };

  res.json({
    success: true,
    data: faqs[index],
    message: 'FAQ atualizado com sucesso'
  });
});

// Delete FAQ
app.delete('/api/faqs/:id', (req, res) => {
  const index = faqs.findIndex(f => f._id === req.params.id);

  if (index === -1) {
    return res.status(404).json({
      success: false,
      message: 'FAQ não encontrado'
    });
  }

  faqs.splice(index, 1);

  res.json({
    success: true,
    message: 'FAQ deletado com sucesso'
  });
});

app.post('/api/faqs/:id/vote', (req, res) => {
  const { isHelpful } = req.body;
  const faq = faqs.find(f => f._id === req.params.id);

  if (!faq) {
    return res.status(404).json({
      success: false,
      message: 'FAQ não encontrado'
    });
  }

  if (isHelpful) {
    faq.helpful++;
  } else {
    faq.notHelpful++;
  }

  res.json({
    success: true,
    data: {
      helpful: faq.helpful,
      notHelpful: faq.notHelpful
    }
  });
});

// Category routes
app.get('/api/categories/counts', (req, res) => {
  const counts = {
    cadastro: faqs.filter(f => f.categories.includes('cadastro')).length,
    monitoramento: faqs.filter(f => f.categories.includes('monitoramento')).length,
    medicao: faqs.filter(f => f.categories.includes('medicao')).length,
    financeiro: faqs.filter(f => f.categories.includes('financeiro')).length
  };

  res.json({
    success: true,
    data: counts
  });
});

// Auth routes
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;

  // Aceitar qualquer email/senha em modo demo
  res.json({
    success: true,
    data: {
      user: {
        id: '1',
        name: 'Admin Demo',
        email: email,
        role: 'admin'
      },
      token: 'demo-token-' + Date.now(),
      refreshToken: 'demo-refresh-token'
    },
    message: 'Login realizado com sucesso (DEMO)'
  });
});

app.get('/api/auth/me', (req, res) => {
  res.json({
    success: true,
    data: {
      id: '1',
      name: 'Admin Demo',
      email: 'admin@factor.com',
      role: 'admin'
    }
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`
    ╔═══════════════════════════════════════╗
    ║   Factor FAQ API - DEMO MODE 🚀      ║
    ╠═══════════════════════════════════════╣
    ║   Status: Running WITHOUT MongoDB    ║
    ║   Port: ${PORT}                           ║
    ║   URL: http://localhost:${PORT}          ║
    ║                                       ║
    ║   Login: qualquer email/senha        ║
    ╚═══════════════════════════════════════╝
  `);
});
