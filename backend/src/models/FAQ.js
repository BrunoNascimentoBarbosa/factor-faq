const mongoose = require('mongoose');

const faqSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Título é obrigatório'],
    trim: true,
    maxlength: [200, 'Título não pode exceder 200 caracteres']
  },
  answer: {
    type: String,
    required: [true, 'Resposta é obrigatória'],
    trim: true
  },
  categories: [{
    type: String,
    enum: ['cadastro', 'monitoramento', 'medicao', 'financeiro'],
    required: true
  }],
  youtubeUrl: {
    type: String,
    validate: {
      validator: function(v) {
        if (!v) return true;
        return /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/.test(v);
      },
      message: 'URL do YouTube inválida'
    }
  },
  tags: [String],
  views: {
    type: Number,
    default: 0
  },
  helpful: {
    type: Number,
    default: 0
  },
  notHelpful: {
    type: Number,
    default: 0
  },
  isPublished: {
    type: Boolean,
    default: true
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

// Índices para performance
faqSchema.index({ title: 'text', answer: 'text' });
faqSchema.index({ categories: 1, isPublished: 1 });
faqSchema.index({ createdAt: -1 });

module.exports = mongoose.model('FAQ', faqSchema);
