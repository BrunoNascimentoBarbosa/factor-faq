const corsOptions = {
  origin: function (origin, callback) {
    // Em produção, permitir requisições sem origin (same-origin) e do próprio domínio
    if (!origin || process.env.NODE_ENV === 'production') {
      return callback(null, true);
    }

    // Em desenvolvimento, verificar lista de origens permitidas
    const allowedOrigins = [
      process.env.FRONTEND_URL,
      'http://localhost:3000',
      'http://localhost:5173',
      'http://localhost:5001'
    ];

    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200
};

module.exports = corsOptions;
