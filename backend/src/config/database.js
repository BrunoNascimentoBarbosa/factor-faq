const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);

    // Criar categorias padrão se não existirem
    await createDefaultCategories();
  } catch (error) {
    console.error(`Error: ${error.message}`);
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
    await Category.findOneAndUpdate(
      { id: category.id },
      category,
      { upsert: true, new: true }
    );
  }

  console.log('Default categories created/updated');
};

module.exports = connectDB;
