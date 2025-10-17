const express = require('express');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const cors = require('cors');
const corsOptions = require('./config/cors');
const routes = require('./routes');
const errorHandler = require('./middleware/errorHandler');
const { apiLimiter } = require('./middleware/rateLimiter');

const app = express();

// Security middleware
app.use(helmet());
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

// Root route
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

// Error handler (deve ser o último middleware)
app.use(errorHandler);

module.exports = app;
