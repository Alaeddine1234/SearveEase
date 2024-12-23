const userController = require('../controllers/userController');
const User = require('../models/User');

jest.mock('../models/User');

describe('User Controller Tests', () => {
    let req, res;

    beforeEach(() => {
        req = { body: {}, params: {}, user: {} }; // Include user property for some tests
        res = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis(),
        };
    });

    it('should register a user successfully', async () => {
        req.body = { username: 'testuser', email: 'test@example.com', password: 'password' };
        User.findOne.mockResolvedValue(null); // No existing user

        await userController.registerUser(req, res);
        expect(res.status).toHaveBeenCalledWith(201); // Check for created status
        expect(res.json).toHaveBeenCalled(); // Check that json was called
    });

    it('should fail login with invalid credentials', async () => {
        req.body = { email: 'test@example.com', password: 'wrongpassword' };
        User.findOne.mockResolvedValue(null); // No user found

        await userController.loginUser(req, res);
        expect(res.status).toHaveBeenCalledWith(400); // Check for bad request
    });


    it('should fail to change password if old password is incorrect', async () => {
        req.body = { userId: '1', oldPassword: 'wrongpassword', newPassword: 'newpassword', confirmNewPassword: 'newpassword' };
        req.user.id = '1'; // Mock authenticated user ID
        User.findById.mockResolvedValue({ password: 'hashedOldPassword' }); // Mock user found

        await userController.changePassword(req, res);
        expect(res.status).toHaveBeenCalledWith(400); // Check for bad request
    });

    it('should create a waiter successfully', async () => {
        req.body = { username: 'waiter', email: 'waiter@example.com', password: 'password' };
        User.findOne.mockResolvedValue(null); // No existing user

        await userController.createWaiter(req, res);
        expect(res.status).toHaveBeenCalledWith(201); // Check for created status
    });

    it('should get all waiters successfully', async () => {
        User.find.mockResolvedValue([]); // Mock empty array of waiters

        await userController.getAllWaiters(req, res);
        expect(res.status).toHaveBeenCalledWith(200); // Check for success status
    });

    it('should update user successfully', async () => {
        req.body = { username: 'updateduser', email: 'updated@example.com' };
        req.user.id = '1'; // Mock authenticated user ID
        User.findByIdAndUpdate.mockResolvedValue({}); // Mock user update

        await userController.updateUser(req, res);
        expect(res.json).toHaveBeenCalled(); // Check that json was called
    });

    it('should delete a user successfully', async () => {
        req.params.id = '1';
        User.findByIdAndDelete.mockResolvedValue(); // Mock user deletion

        await userController.deleteUser(req, res);
        expect(res.json).toHaveBeenCalled(); // Check that json was called
    });

    it('should get all users successfully', async () => {
        User.find.mockResolvedValue([]); // Mock empty array of users

        await userController.getAllUsers(req, res);
        expect(res.json).toHaveBeenCalled(); // Check that json was called
    });

    it('should get username by user ID successfully', async () => {
        req.params.id = '1';
        User.findById.mockResolvedValue({ username: 'testuser' }); // Mock user found

        await userController.getUsernameById(req, res);
        expect(res.json).toHaveBeenCalled(); // Check that json was called
    });
});
