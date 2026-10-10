const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  legacyId: { type: Number, required: true, unique: true },
  name: { type: String, required: true, trim: true },
  category: { type: String, required: true },
  description: { type: String, default: '' },
  unitPrice: { type: Number, required: true },
  promotionPrice: { type: Number, default: null },
  image: { type: String, required: true },
  unit: { type: String, default: 'cái' },
  section: { type: String, enum: ['new', 'top', 'catalog'], default: 'catalog' },
  displayOrder: { type: Number, default: 0 }
}, { timestamps: true });

productSchema.index({ section: 1, displayOrder: 1 });

module.exports = mongoose.model('Product', productSchema);
