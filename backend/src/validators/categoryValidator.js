const Joi = require('joi');

const categoryValidator = {
  create: Joi.object({
    id: Joi.string().required().lowercase().messages({
      'string.empty': 'ID da categoria é obrigatório'
    }),
    name: Joi.string().required().messages({
      'string.empty': 'Nome da categoria é obrigatório'
    }),
    description: Joi.string().allow('').optional(),
    icon: Joi.string().default('folder'),
    color: Joi.string().default('#FFAD42'),
    order: Joi.number().default(0),
    isActive: Joi.boolean().default(true)
  }),

  update: Joi.object({
    name: Joi.string(),
    description: Joi.string().allow(''),
    icon: Joi.string(),
    color: Joi.string(),
    order: Joi.number(),
    isActive: Joi.boolean()
  }).min(1)
};

module.exports = { categoryValidator };
