/**
 * Configuração PM2 para Factor FAQ - DESENVOLVIMENTO
 * Use esta configuração apenas para desenvolvimento/testes
 *
 * Para iniciar:
 *   pm2 start ecosystem.development.js
 */

module.exports = {
  apps: [
    {
      name: "backend-dev",
      cwd: "/factor/factor-faq/backend",
      script: "npm",
      args: "run dev",
      autorestart: true,
      watch: false,
      max_restarts: 10,
      env: {
        NODE_ENV: "development"
      }
    },
    {
      name: "frontend-dev",
      cwd: "/factor/factor-faq/frontend",
      script: "npm",
      args: "run dev -- --host 0.0.0.0 --port 3000",
      autorestart: true,
      watch: false,
      max_restarts: 10,
      env: {
        NODE_ENV: "development"
      }
    }
  ]
};
