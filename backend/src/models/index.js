const { sequelize } = require('../config/database');
const User = require('./User');
const FAQ = require('./FAQ');
const Category = require('./Category');

// Definir relacionamentos
FAQ.belongsTo(User, {
  foreignKey: 'createdBy',
  as: 'creator'
});

User.hasMany(FAQ, {
  foreignKey: 'createdBy',
  as: 'faqs'
});

module.exports = {
  sequelize,
  User,
  FAQ,
  Category
};
