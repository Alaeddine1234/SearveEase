const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CartSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    items: [{
        product: {
            type: String,
            required: true
        },
        quantity: {
            type: Number,
            required: true
        },
        price: {
            type: Number,
            required: true
        }
    }]
});

module.exports = mongoose.model('Cart', CartSchema);
