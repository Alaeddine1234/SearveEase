const express = require('express');
const router = express.Router();
const {
    addToCart,
    getCartItems,
    removeFromCart,
    clearCart
} = require('../controllers/cartController');

const authMiddleware = require('../middleware/authMiddleware')


router.post('/add',  authMiddleware, addToCart);

router.get('/items/:username', authMiddleware, getCartItems);

router.delete('/remove/:username/:dish', authMiddleware, removeFromCart);

router.delete('/clear/:username', authMiddleware, clearCart);


module.exports = router;
