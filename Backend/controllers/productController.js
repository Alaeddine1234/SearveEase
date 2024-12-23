const Product = require('../models/Product');

// Get all products
exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({ msg: 'Server error' });
    }
};

// Create a new product
exports.createProduct = async (req, res) => {
    const { name, description, price, category } = req.body;

    try {
        const product = new Product({
            name,
            description,
            price,
            category,
        });

        await product.save();
        res.status(201).json({ msg: 'Product created successfully', product });
    } catch (error) {
        res.status(500).json({ msg: 'Server error' });
    }
};

// Update a product
exports.updateProduct = async (req, res) => {
    const { name, description, price, category } = req.body;
    const productId = req.params.id;

    try {
        const product = await Product.findByIdAndUpdate(
            productId,
            { name, description, price, category },
            { new: true }
        );

        res.json(product);
    } catch (error) {
        res.status(500).json({ msg: 'Server error' });
    }
};

// Delete a product
exports.deleteProduct = async (req, res) => {
    const productId = req.params.id;

    try {
        await Product.findByIdAndDelete(productId);
        res.json({ msg: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ msg: 'Server error' });
    }
};

// Get a product by ID
exports.getProductById = async (req, res) => {
    const { id } = req.params;

    try {
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ msg: 'Product not found' });
        }
        res.json(product);
    } catch (error) {
        res.status(500).json({ msg: 'Server error' });
    }
};

// Get products by category
exports.getProductsByCategory = async (req, res) => {
    const { category } = req.params;

    try {
        const products = await Product.find({ category: category });
        res.json(products);
    } catch (error) {
        res.status(500).json({ msg: 'Server error' });
    }
};
