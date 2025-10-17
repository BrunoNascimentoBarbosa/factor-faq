export const CATEGORIES = [
  {
    id: 'cadastro',
    name: 'Cadastro',
    description: 'Dúvidas sobre cadastro de empresas e usuários'
  },
  {
    id: 'monitoramento',
    name: 'Monitoramento',
    description: 'Questões sobre rastreamento e monitoramento'
  },
  {
    id: 'medicao',
    name: 'Medição',
    description: 'Informações sobre medições e relatórios'
  },
  {
    id: 'financeiro',
    name: 'Financeiro',
    description: 'Dúvidas sobre aspectos financeiros'
  },
];

export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
export const WHATSAPP_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER || '5511999999999';
export const WHATSAPP_MESSAGE = import.meta.env.VITE_WHATSAPP_MESSAGE || 'Olá, preciso de ajuda sobre o sistema FACTOR';
