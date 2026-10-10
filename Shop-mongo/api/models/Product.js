const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    price: { type: Number, required: true, min: 0 },
    stock: { type: Number, required: true, min: 0, default: 0 },
    description: { type: String, trim: true, default: '' },
    image: { type: String, default: null },
    imageCredit: { type: String, default: null },
    imageSourceUrl: { type: String, default: null },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
      index: true,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model('Product', productSchema);
