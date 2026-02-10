/**
 * Configuração PM2 para Factor FAQ - PRODUÇÃO
 * Servidor: AWS Linux - http://suporte.factorlog.com.br/
 *
 * IMPORTANTE: Em produção, o backend serve tanto a API quanto o frontend buildado.
 * Não rode frontend separadamente!
 *
 * Para iniciar:
 *   cd /factor/factor-faq-main/backend
 *   sudo pm2 start ecosystem.config.js
 *
 * Para verificar status:
 *   pm2 status
 *   pm2 logs factor-faq
 *
 * Para restart:
 *   pm2 restart factor-faq
 *
 * Para parar:
 *   pm2 stop factor-faq
 */

module.exports = {
  apps: [{
    name: 'factor-faq',
    script: './src/server.js',
    cwd: '/factor/factor-faq-main/backend',
    instances: 1,
    exec_mode: 'fork',

    // Variáveis de ambiente - PRODUÇÃO
    env: {
      NODE_ENV: 'production',
      PORT: 80
    },

    // Logs
    error_file: '/factor/factor-faq-main/logs/error.log',
    out_file: '/factor/factor-faq-main/logs/out.log',
    log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
    merge_logs: true,

    // Restart automático
    autorestart: true,
    max_restarts: 10,
    min_uptime: '10s',
    max_memory_restart: '500M',

    // Configurações adicionais
    watch: false,
    ignore_watch: ['node_modules', 'logs'],

    // Tratamento de sinais
    kill_timeout: 5000,
    wait_ready: false,
    listen_timeout: 3000
  }]
};
