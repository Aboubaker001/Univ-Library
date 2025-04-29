const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.json({ 
    message: 'Library Management API',
    endpoints: {
      books: '/api/books',
      users: '/api/users',
      auth: '/api/auth'
    }
  });
});

module.exports = router;