const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const FAQ = sequelize.define('FAQ', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  title: {
    type: DataTypes.STRING(200),
    allowNull: false,
    validate: {
      notEmpty: { msg: 'Título é obrigatório' },
      len: {
        args: [1, 200],
        msg: 'Título não pode exceder 200 caracteres'
      }
    }
  },
  answer: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      notEmpty: { msg: 'Resposta é obrigatória' }
    }
  },
  categories: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: false,
    defaultValue: [],
    validate: {
      notEmpty: { msg: 'Pelo menos uma categoria é obrigatória' },
      isValidCategories(value) {
        const validCategories = ['cadastro', 'monitoramento', 'medicao', 'financeiro'];
        if (!value.every(cat => validCategories.includes(cat))) {
          throw new Error('Categoria inválida');
        }
      }
    }
  },
  youtubeUrl: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      isValidYoutubeUrl(value) {
        if (value && !/^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/.test(value)) {
          throw new Error('URL do YouTube inválida');
        }
      }
    }
  },
  tags: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    defaultValue: []
  },
  views: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  helpful: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  notHelpful: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  isPublished: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  createdBy: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'Users',
      key: 'id'
    }
  }
}, {
  timestamps: true,
  indexes: [
    {
      fields: ['categories']
    },
    {
      fields: ['isPublished']
    },
    {
      fields: ['createdAt']
    },
    {
      type: 'FULLTEXT',
      fields: ['title', 'answer']
    }
  ]
});

module.exports = FAQ;
