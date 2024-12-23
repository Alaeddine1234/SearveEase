const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');


exports.changePassword = async (req, res) => {
    const { userId, oldPassword, newPassword, confirmNewPassword } = req.body;

    // Validate request data
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // Ensure new passwords match
    if (newPassword !== confirmNewPassword) {
        return res.status(400).json({ msg: 'New passwords do not match' });
    }

    try {
        // Find the user by ID
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        // Check old password
        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Old password is incorrect' });
        }

        // Hash new password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        // Update user password
        user.password = hashedPassword;
        await user.save();

        res.status(200).json({ msg: 'Password updated successfully' });
    } catch (error) {
        console.error('Error changing password:', error);
        res.status(500).json({ msg: 'Server error' });
    }
};
// Register a new user
exports.registerUser = async (req, res) => {
    const { username, email, password } = req.body;

    // Validate request data
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // Check if any fields are empty
    if (!username || !email || !password) {
        return res.status(400).json({ msg: 'Please provide all required fields' });
    }

    try {
        // Check if the user already exists
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: 'User already exists' });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create a new user
        user = new User({
            username,
            email,
            password: hashedPassword,
        });

        await user.save();

        res.status(201).json({ msg: 'User registered successfully' });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ msg: 'Server error' });
    }
};

// User login
exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if the user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        // Check if the password is correct
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        // Generate JWT token
        const payload = {
            user: {
                id: user.id,
                role: user.role,
                username: user.username,
                email: user.email,
            },
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '3h' },
            (err, token) => {
                if (err) throw err;
                res.json({ token });
            }
        );
    } catch (error) {
        res.status(500).json({ msg: 'Server error' });
    }
};

exports.createWaiter = async (req, res) => {
    // Validate request data (optional)
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
  
    const { username, email, password } = req.body;
  
    try {
      // Check if user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
      }
  
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Create new user with the role 'waiter'
      const newUser = new User({
        username,
        email,
        password: hashedPassword,
        role: 'waiter'
      });
  
      // Save the user to the database
      await newUser.save();
  
      // Send a response back to the client
      res.status(201).json({
        message: 'Waiter created successfully',
        user: {
          username: newUser.username,
          email: newUser.email,
          role: newUser.role
        }
      });
    } catch (error) {
      console.error('Error creating waiter:', error);
      res.status(500).json({ message: 'Server error' });
    }
  };


//Get all waiters
  exports.getAllWaiters = async (req, res) => {
    try {
      // Find all users with the role 'waiter'
      const waiters = await User.find({ role: 'waiter' });
  
      // Send a response back to the client
      res.status(200).json({
        message: 'Waiters retrieved successfully',
        waiters
      });
    } catch (error) {
      console.error('Error retrieving waiters:', error);
      res.status(500).json({ message: 'Server error' });
    }
  };


// Update user details
exports.updateUser = async (req, res) => {
    const { username, email, password } = req.body;
    const userId = req.user.id; // Assuming you have middleware to authenticate the user

    try {
        // Hash the new password if provided
        let updatedData = { username, email };
        if (password) {
            const salt = await bcrypt.genSalt(10);
            updatedData.password = await bcrypt.hash(password, salt);
        }

        const user = await User.findByIdAndUpdate(userId, updatedData, { new: true });

        res.json(user);
    } catch (error) {
        res.status(500).json({ msg: 'Server error' });
    }
};


// Delete a user
exports.deleteUser = async (req, res) => {
    const userId = req.params.id;

    try {
        // Find the user by ID and delete
        await User.findByIdAndDelete(userId);

        res.json({ msg: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ msg: 'Server error' });
    }
};

// Get all users
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password');
        res.json(users);
    } catch (error) {
        res.status(500).json({ msg: 'Server error' });
    }
};

// Get a username by userID
exports.getUsernameById = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await User.findById(id).select('username');
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ msg: 'Server error' });
    }
};






