const express = require('express');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const cors = require('cors');
const path = require('path');
const corsOptions = require('./config/cors');
const routes = require('./routes');
const errorHandler = require('./middleware/errorHandler');
const { apiLimiter } = require('./middleware/rateLimiter');

const app = express();

// Security middleware
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      baseUri: ["'self'"],
      connectSrc: ["'self'", "https://www.youtube.com", "https://www.google.com"],
      fontSrc: ["'self'", "https:", "data:"],
      formAction: ["'self'"],
      frameAncestors: ["'self'"],
      frameSrc: ["'self'", "https://www.youtube.com", "https://www.youtube-nocookie.com"],
      imgSrc: ["'self'", "data:", "https:", "https://i.ytimg.com"],
      objectSrc: ["'none'"],
      scriptSrc: ["'self'", "'unsafe-inline'", "https://www.youtube.com", "https://s.ytimg.com"],
      scriptSrcAttr: ["'none'"],
      styleSrc: ["'self'", "https:", "'unsafe-inline'"],
      upgradeInsecureRequests: []
    }
  }
}));
app.use(mongoSanitize());
app.use(xss());

// CORS
app.use(cors(corsOptions));

// Body parser
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Rate limiting
app.use('/api/', apiLimiter);

// Routes
app.use('/api', routes);

// Servir arquivos estáticos do frontend em produção
if (process.env.NODE_ENV === 'production') {
  // Servir arquivos estáticos
  app.use(express.static(path.join(__dirname, '../../frontend/dist')));

  // Todas as rotas não-API retornam o index.html
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../frontend/dist/index.html'));
  });
} else {
  // Root route em desenvolvimento
  app.get('/', (req, res) => {
    res.json({
      success: true,
      message: 'Factor FAQ API',
      version: '1.0.0',
      endpoints: {
        health: '/api/health',
        faqs: '/api/faqs',
        auth: '/api/auth',
        categories: '/api/categories'
      }
    });
  });
}

// Error handler (deve ser o último middleware)
app.use(errorHandler);

module.exports = app;
