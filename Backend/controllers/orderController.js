const Order = require('../models/Order');

// Get all incoming orders
exports.getAllOrders = async (req, res) => {
    try {
        // Find all orders and return them
        const orders = await Order.find();
        res.json(orders);
    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({ msg: 'Server error' });
    }
};

// Get all orders that are not served
exports.getNotServedOrders = async (req, res) => {
    try {
        // Query to find orders where status is not "Served"
        const orders = await Order.find({ status: { $ne: 'Served' } })
            .populate('orderDetails.product', 'name'); // Populate the product field with the name
        
        // Return the orders in the response
        res.status(200).json(orders);
    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Create a new order
exports.createOrder = async (req, res) => {
    const { username, tableNumber, orderDetails, totalPrice } = req.body;

    // Validate input data
    if (!username || typeof tableNumber !== 'number' || tableNumber <= 0 || !Array.isArray(orderDetails) || orderDetails.length === 0 || typeof totalPrice !== 'number' || totalPrice <= 0) {
        return res.status(400).json({ msg: 'Invalid input' });
    }

    try {
        // Create a new order instance
        const newOrder = new Order({
            username,
            tableNumber,
            orderDetails,
            totalPrice,
            status: 'Preparing' // Default status on order creation
        });
        
        // Save the order to the database
        const savedOrder = await newOrder.save();

        // Return the saved order in the response
        res.status(201).json(savedOrder);
    } catch (error) {
        console.error('Error creating order:', error);
        res.status(500).json({ msg: 'Server error', error: error.message });
    }
};

// Update order status
exports.updateOrderStatus = async (req, res) => {
    const orderId = req.params.id;
    const { status } = req.body;

    try {
        // Find the order by ID and update its status
        const order = await Order.findByIdAndUpdate(orderId, { status }, { new: true });
        
        // Check if the order exists
        if (!order) {
            return res.status(404).json({ msg: 'Order not found' });
        }

        // Return the updated order in the response
        res.json(order);
    } catch (error) {
        console.error('Error updating order status:', error);
        res.status(500).json({ msg: 'Server error' });
    }
};

// Get order by ID

// Get orders by username

// Get orders by username
exports.getOrdersByUsername = async (req, res) => {
    const { username } = req.params;

    try {
        // Find orders associated with the provided username
        const orders = await Order.find({ username });

        // If no orders are found, send a 404 response
        if (orders.length === 0) {
            return res.status(404).json({ msg: 'No orders found for this user' });
        }

        // Return the found orders
        res.json(orders);
    } catch (error) {
        console.error('Error fetching orders by username:', error);
        res.status(500).json({ msg: 'Server error' });
    }
};



exports.getOrderById = async (req, res) => {
    const orderId = req.params.id;

    try {
        const order = await Order.findById(orderId);

        if (!order) {
            return res.status(404).json({ msg: 'Order not found' });
        }

        res.json(order);
    } catch (error) {
        console.error('Error fetching order by ID:', error);
        res.status(500).json({ msg: 'Server error' });
    }
};


