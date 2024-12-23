const Order = require('../models/Order');
const orderController = require('../controllers/orderController');

jest.mock('../models/Order');

describe('Simplified Order Controller Tests', () => {
    let req, res;

    beforeEach(() => {
        req = {
            body: {},
            params: {},
        };
        res = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis(),
        };
    });

    it('should get all orders', async () => {
        Order.find.mockResolvedValue([{ id: 1, username: 'John' }, { id: 2, username: 'Jane' }]);

        await orderController.getAllOrders(req, res);
        expect(res.json).toHaveBeenCalled();
    });

    it('should create a new order with valid input', async () => {
        req.body = {
            username: 'John',
            tableNumber: 1,
            orderDetails: [{ productId: 1, quantity: 2 }],
            totalPrice: 20,
        };
        Order.prototype.save = jest.fn().mockResolvedValue(req.body);

        await orderController.createOrder(req, res);
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalled(); 
    });

    it('should return 400 for invalid order input', async () => {
        req.body = {
            username: '',
            tableNumber: 0,
            orderDetails: [],
            totalPrice: -5,
        };

        await orderController.createOrder(req, res);
        expect(res.status).toHaveBeenCalledWith(400); 
        expect(res.json).toHaveBeenCalledWith({ msg: 'Invalid input' }); 
    });

    it('should return 404 for non-existent order on update', async () => {
        req.params.id = '999'; 
        Order.findByIdAndUpdate.mockResolvedValue(null);

        await orderController.updateOrderStatus(req, res);
        expect(res.status).toHaveBeenCalledWith(404); 
        expect(res.json).toHaveBeenCalledWith({ msg: 'Order not found' });
    });

    it('should get orders by username', async () => {
        req.params.username = 'John';
        Order.find.mockResolvedValue([{ id: 1, username: 'John' }]);

        await orderController.getOrdersByUsername(req, res);
        expect(res.json).toHaveBeenCalled(); 
    });

    it('should return 404 for no orders by username', async () => {
        req.params.username = 'NonExistentUser';
        Order.find.mockResolvedValue([]);

        await orderController.getOrdersByUsername(req, res);
        expect(res.status).toHaveBeenCalledWith(404); 
        expect(res.json).toHaveBeenCalledWith({ msg: 'No orders found for this user' });
    });

    it('should get order by ID', async () => {
        req.params.id = '1';
        Order.findById.mockResolvedValue({ id: 1, username: 'John' });

        await orderController.getOrderById(req, res);
        expect(res.json).toHaveBeenCalled(); 
    });

    it('should return 404 for non-existent order by ID', async () => {
        req.params.id = '999';
        Order.findById.mockResolvedValue(null);

        await orderController.getOrderById(req, res);
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ msg: 'Order not found' }); 
    });
});
