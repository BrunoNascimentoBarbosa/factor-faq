const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  name: {
    type: String,
    required: [true, 'Nome da categoria é obrigatório'],
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  icon: {
    type: String,
    default: 'folder'
  },
  color: {
    type: String,
    default: '#FFAD42'
  },
  order: {
    type: Number,
    default: 0
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

categorySchema.index({ order: 1 });

module.exports = mongoose.model('Category', categorySchema);
