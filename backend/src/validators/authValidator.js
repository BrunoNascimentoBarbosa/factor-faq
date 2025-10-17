const Joi = require('joi');

const authValidator = {
  login: Joi.object({
    email: Joi.string().email().required().messages({
      'string.empty': 'Email é obrigatório',
      'string.email': 'Email inválido'
    }),
    password: Joi.string().required().messages({
      'string.empty': 'Senha é obrigatória'
    })
  }),

  register: Joi.object({
    name: Joi.string().required().messages({
      'string.empty': 'Nome é obrigatório'
    }),
    email: Joi.string().email().required().messages({
      'string.empty': 'Email é obrigatório',
      'string.email': 'Email inválido'
    }),
    password: Joi.string().min(6).required().messages({
      'string.empty': 'Senha é obrigatória',
      'string.min': 'Senha deve ter no mínimo 6 caracteres'
    }),
    role: Joi.string().valid('admin', 'user').default('admin')
  })
};

module.exports = { authValidator };
