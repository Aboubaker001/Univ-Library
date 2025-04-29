const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Registration route
router.post('/register', authController.register);

// Login route (modified to use controller)
router.post('/login', async (req, res) => {
  try {
    // 1. Authenticate user (this would come from your controller)
    const user = await authController.login(req.body); 
    
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // 2. Generate token
    const token = authController.generateToken(user.id);
    
    // 3. Send response
    res.json({ 
      token,
      userId: user.id,
      message: 'Login successful' 
    });
    
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;