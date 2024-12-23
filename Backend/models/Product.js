const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  category: { type: String, enum: ['plats', 'boissons', 'sauces'], required: true }, // Category is included here
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
