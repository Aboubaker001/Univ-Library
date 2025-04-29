const Book = require('../models/Book');
const APIError = require('../utils/APIError');

exports.getAllBooks = async (req, res, next) => {
  try {
    // Add pagination, filtering, and sorting
    const { page = 1, limit = 10, genre, available } = req.query;
    
    const query = {};
    if (genre) query.genre = genre;
    if (available) query.availableCopies = { $gt: 0 };
    
    const books = await Book.find(query)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });
    
    const count = await Book.countDocuments(query);
    
    res.json({
      data: books,
      meta: {
        total: count,
        pages: Math.ceil(count / limit),
        page: parseInt(page)
      }
    });
  } catch (err) {
    next(err);
  }
};

exports.getBookById = async (req, res, next) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      throw new APIError('Book not found', 404);
    }
    res.json(book);
  } catch (err) {
    next(err);
  }
};

exports.createBook = async (req, res) => {
    try {
      const book = await Book.create(req.body);
      res.status(201).json(book);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

// Implement other CRUD operations...