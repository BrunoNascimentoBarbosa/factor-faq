const { Sequelize } = require('sequelize');

// Configuração do Sequelize
const sequelize = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost:5432/factor_faq', {
  dialect: 'postgres',
  logging: process.env.NODE_ENV === 'development' ? console.log : false,
  dialectOptions: {
    ssl: process.env.DATABASE_URL && process.env.DATABASE_URL.includes('render.com') ? {
      require: true,
      rejectUnauthorized: false
    } : false
  },
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('PostgreSQL Connected successfully!');

    // Sincronizar models com o banco (criar tabelas)
    await sequelize.sync({ alter: process.env.NODE_ENV === 'development' });
    console.log('Database synchronized');

    // Criar categorias padrão se não existirem
    await createDefaultCategories();
  } catch (error) {
    console.error('Unable to connect to database:', error.message);
    process.exit(1);
  }
};

const createDefaultCategories = async () => {
  const Category = require('../models/Category');

  const defaultCategories = [
    {
      id: 'cadastro',
      name: 'Cadastro',
      description: 'Dúvidas sobre cadastro de empresas e usuários',
      icon: 'truck',
      color: '#FFAD42',
      order: 1
    },
    {
      id: 'monitoramento',
      name: 'Monitoramento',
      description: 'Questões sobre rastreamento e monitoramento',
      icon: 'bar-chart',
      color: '#3B82F6',
      order: 2
    },
    {
      id: 'medicao',
      name: 'Medição',
      description: 'Informações sobre medições e relatórios',
      icon: 'ruler',
      color: '#10B981',
      order: 3
    },
    {
      id: 'financeiro',
      name: 'Financeiro',
      description: 'Dúvidas sobre aspectos financeiros',
      icon: 'dollar-sign',
      color: '#8B5CF6',
      order: 4
    }
  ];

  for (const category of defaultCategories) {
    await Category.findOrCreate({
      where: { id: category.id },
      defaults: category
    });
  }

  console.log('Default categories created/updated');
};

module.exports = connectDB;
module.exports.sequelize = sequelize;
