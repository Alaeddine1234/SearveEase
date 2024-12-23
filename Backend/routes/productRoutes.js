const express = require('express');
const router = express.Router();
const {
    getAllProducts,
    createProduct,
    updateProduct,
    deleteProduct,
    getProductById,
    getProductsByCategory  
} = require('../controllers/productController');

const authMiddleware = require('../middleware/authMiddleware'); 
const roleMiddleware = require('../middleware/roleMiddleware'); 

router.get('/', getAllProducts);

router.post('/', authMiddleware, roleMiddleware('admin'), createProduct);

router.put('/:id', authMiddleware, roleMiddleware('admin'), updateProduct);

router.delete('/:id', authMiddleware, roleMiddleware('admin'), deleteProduct);

router.get('/:id', getProductById);

router.get('/category/:category', getProductsByCategory); 

module.exports = router;
