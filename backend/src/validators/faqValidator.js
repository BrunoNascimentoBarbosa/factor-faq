const Joi = require('joi');

const faqValidator = {
  create: Joi.object({
    title: Joi.string().required().max(200).messages({
      'string.empty': 'Título é obrigatório',
      'string.max': 'Título não pode exceder 200 caracteres'
    }),
    answer: Joi.string().required().messages({
      'string.empty': 'Resposta é obrigatória'
    }),
    categories: Joi.array()
      .items(Joi.string().valid('cadastro', 'monitoramento', 'medicao', 'financeiro'))
      .min(1)
      .required()
      .messages({
        'array.min': 'Selecione pelo menos uma categoria'
      }),
    youtubeUrl: Joi.string().uri().allow('').optional(),
    tags: Joi.array().items(Joi.string()).optional(),
    isPublished: Joi.boolean().default(true)
  }),

  update: Joi.object({
    title: Joi.string().max(200),
    answer: Joi.string(),
    categories: Joi.array()
      .items(Joi.string().valid('cadastro', 'monitoramento', 'medicao', 'financeiro'))
      .min(1),
    youtubeUrl: Joi.string().uri().allow(''),
    tags: Joi.array().items(Joi.string()),
    isPublished: Joi.boolean()
  }).min(1)
};

module.exports = { faqValidator };
