
const Payment = require('../models/Payment'); // Adjust the path as necessary


exports.createPayment = async (req, res) => {
    const { orderID, paymentMethod } = req.body;
    const username = req.user.username; // Get the username from the decoded token

    try {
        // Validate input
        if (!orderID || !paymentMethod) {
            return res.status(400).json({ msg: 'OrderID and paymentMethod are required' });
        }

        // Create a new payment record
        const newPayment = new Payment({
            orderID,
            paymentMethod,
            username
        });

        // Save the payment to the database
        await newPayment.save();

        res.status(201).json({ msg: 'Payment created successfully', payment: newPayment });
    } catch (error) {
        console.error('Error creating payment:', error);
        res.status(500).json({ msg: 'Server error' });
    }
};


exports.getAllPayments = async (req, res) => {
    try {
        res.status(200).json({ payments: [] });
    } catch (error) {
        res.status(500).json({ msg: 'Server error' });
    }
};

exports.getPaymentById = async (req, res) => {
    const { id } = req.params;
    try {
        res.status(200).json({ payment: {} });
    } catch (error) {
        res.status(500).json({ msg: 'Server error' });
    }
};

exports.updatePaymentStatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    try {
        res.status(200).json({ msg: 'Payment status updated' });
    } catch (error) {
        res.status(500).json({ msg: 'Server error' });
    }
};

exports.deletePayment = async (req, res) => {
    const { id } = req.params;
    try {
        res.status(200).json({ msg: 'Payment deleted successfully' });
    } catch (error) {
        res.status(500).json({ msg: 'Server error' });
    }
};
