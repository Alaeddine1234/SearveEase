const Product = require('../models/Product');
const productController = require('../controllers/productController');

jest.mock('../models/Product');

describe('Super Simple Product Controller Tests', () => {
    let req, res;

    beforeEach(() => {
        req = { body: {}, params: {} };
        res = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis(),
        };
    });

    it('should create a product successfully', async () => {
        req.body = { name: 'New Product', description: 'Product Description', price: 10, category: 'Food' };
        Product.prototype.save = jest.fn();

        await productController.createProduct(req, res);
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalled(); 
    });

    it('should get all products', async () => {
        Product.find.mockResolvedValue([]);

        await productController.getAllProducts(req, res);
        expect(res.json).toHaveBeenCalled(); 
    });

    it('should update a product successfully', async () => {
        req.params.id = '1';
        Product.findByIdAndUpdate.mockResolvedValue({});

        await productController.updateProduct(req, res);
        expect(res.json).toHaveBeenCalled(); 
    });

    it('should delete a product successfully', async () => {
        req.params.id = '1';
        Product.findByIdAndDelete.mockResolvedValue();

        await productController.deleteProduct(req, res);
        expect(res.json).toHaveBeenCalled(); 
    });

    it('should return a product by ID', async () => {
        req.params.id = '1';
        Product.findById.mockResolvedValue({});

        await productController.getProductById(req, res);
        expect(res.json).toHaveBeenCalled(); 
    });

    it('should get products by category', async () => {
        req.params.category = 'Food';
        Product.find.mockResolvedValue([]);

        await productController.getProductsByCategory(req, res);
        expect(res.json).toHaveBeenCalled();
    });
});
