const rateLimit = require('express-rate-limit');

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // limite de 100 requisições por IP
  message: {
    success: false,
    message: 'Muitas requisições deste IP, tente novamente mais tarde'
  },
  standardHeaders: true,
  legacyHeaders: false
});

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 5, // limite de 5 tentativas de login
  message: {
    success: false,
    message: 'Muitas tentativas de login, tente novamente mais tarde'
  },
  skipSuccessfulRequests: true
});

module.exports = { apiLimiter, authLimiter };
