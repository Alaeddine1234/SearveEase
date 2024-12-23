const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  orderID: { type: String, required: true },
  paymentMethod: { type: String, enum: ['carte', 'espece'], required: true },
  username: {type: String, required: true}
}, { timestamps: true });

module.exports = mongoose.model('Payment', paymentSchema);
