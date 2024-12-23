const express = require('express');
const router = express.Router();
const {
    getAllOrders,
    createOrder,
    updateOrderStatus,
    getOrdersByUsername,
    getNotServedOrders,
    getOrderById
} = require('../controllers/orderController');

const authMiddleware = require('../middleware/authMiddleware')
const roleMiddleware = require('../middleware/roleMiddleware')


router.get('/', authMiddleware, roleMiddleware(['waiter','admin' ]), getAllOrders);

router.get('/forWaiter', authMiddleware, roleMiddleware(['admin', 'waiter']), getNotServedOrders)

router.post('/', authMiddleware, createOrder);


router.put('/:id/status', authMiddleware, roleMiddleware(['admin', 'waiter']), updateOrderStatus);

router.put('/orders/:id/status', authMiddleware, roleMiddleware(['admin', 'waiter']), updateOrderStatus);

router.get('/:username', authMiddleware, getOrdersByUsername);

router.get('/facture/:id',  authMiddleware, getOrderById);



module.exports = router;
