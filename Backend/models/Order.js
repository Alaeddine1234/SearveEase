const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  username: { type: String, required: true },
  tableNumber: { type: Number, required: true },
  orderDetails: [
    {
      productName: { type: String, required: true },
      productID: { type: String, required: true },
      quantity: { type: Number, required: true }
    }
  ],
  totalPrice: { type: Number, required: true },
  status: { type: String, enum: ['Preparing', 'Ready', 'Served'], default: 'Preparing' },
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
