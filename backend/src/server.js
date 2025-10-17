require('dotenv').config({ path: '.env.development' });
const app = require('./app');
const connectDB = require('./config/database');

const PORT = process.env.PORT || 5000;

// Connect to database
connectDB();

// Start server
const server = app.listen(PORT, () => {
  console.log(`
    ╔═══════════════════════════════════════╗
    ║   Factor FAQ API is running! 🚀      ║
    ╠═══════════════════════════════════════╣
    ║   Environment: ${process.env.NODE_ENV || 'development'}             ║
    ║   Port: ${PORT}                           ║
    ║   URL: http://localhost:${PORT}          ║
    ╚═══════════════════════════════════════╝
  `);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.log('UNHANDLED REJECTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});

// Handle SIGTERM
process.on('SIGTERM', () => {
  console.log('👋 SIGTERM RECEIVED. Shutting down gracefully');
  server.close(() => {
    console.log('💥 Process terminated!');
  });
});
