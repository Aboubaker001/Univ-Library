const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/')
  .get(bookController.getAllBooks)
  .post(protect, admin, bookController.createBook);

module.exports = router;