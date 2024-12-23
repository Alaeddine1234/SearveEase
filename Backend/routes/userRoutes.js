const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');



const {
    registerUser,
    loginUser,
    updateUser,
    deleteUser,
    getAllUsers,
    getUsernameById,
    getAllWaiters,
    createWaiter,
    changePassword 
} = require('../controllers/userController');

router.post('/register', registerUser);

router.post('/login', loginUser);

router.get('/waiters', authMiddleware, roleMiddleware('admin'), getAllWaiters);

router.post('/waiters', authMiddleware, roleMiddleware('admin'), createWaiter);

router.post('/change-password', authMiddleware, changePassword);

router.put('/update', authMiddleware, updateUser); 

router.delete('/:id', authMiddleware, roleMiddleware('admin'), deleteUser); 

router.get('/', authMiddleware, roleMiddleware('admin'), getAllUsers); 

router.get('/:id', authMiddleware, getUsernameById); 

module.exports = router;
