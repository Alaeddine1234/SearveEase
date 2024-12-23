const express = require('express');
const router = express.Router();
const {
    createPayment,
    getAllPayments,
    getPaymentById,
} = require('../controllers/paymentController');
const authMiddleware = require('../middleware/authMiddleware'); 

router.get('/', authMiddleware, getAllPayments);

router.post('/', authMiddleware, createPayment);

router.get('/:id', authMiddleware, getPaymentById);


module.exports = router;
