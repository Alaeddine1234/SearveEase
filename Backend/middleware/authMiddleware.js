const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ message: 'Access denied, no token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Decoded JWT:', decoded);  // Check if the role is in the token
    
    // Assign only the user object from the token
    req.user = decoded.user;  // Accessing the `user` part directly
    next();
  } catch (error) {
    console.error('Token verification failed:', error);
    res.status(400).json({ message: 'Invalid token' });
  }
};
