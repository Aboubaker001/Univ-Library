const jwt = require('jsonwebtoken');
require('dotenv').config();
const User = require('../models/User'); // Assuming you have a User model

// Registration logic
const register = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // 1. Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already in use' });
    }

    // 2. Create new user (in real app, hash password first!)
    const user = new User({ email, password });
    await user.save();

    // 3. Generate token
    const token = generateToken(user._id);
    
    res.status(201).json({ 
      token,
      userId: user._id 
    });
    
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Login logic
const login = async (credentials) => {
  const { email, password } = credentials;
  
  // 1. Find user
  const user = await User.findOne({ email });
  if (!user) return null;

  // 2. Validate password (in real app, use bcrypt.compare)
  if (user.password !== password) return null;

  return { id: user._id };
};

// Token generation
const generateToken = (userId) => {
  return jwt.sign(
    { userId },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );
};

module.exports = {
  register,
  login,
  generateToken
};