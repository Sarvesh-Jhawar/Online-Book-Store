// src/controllers/bookController.js
const Book = require('../models/Book');

// @desc    Get all books
// @route   GET /api/books
// @access  Public
exports.getBooks = async (req, res) => {
  try {
    const { category, search, sortBy } = req.query;
    let query = {};

    // Filter by category
    if (category && category !== 'All') {
      query.category = category;
    }

    // Search by title or author
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { author: { $regex: search, $options: 'i' } },
      ];
    }

    let books = Book.find(query);

    // Sort
    if (sortBy === 'price-low') {
      books = books.sort({ price: 1 });
    } else if (sortBy === 'price-high') {
      books = books.sort({ price: -1 });
    } else if (sortBy === 'rating') {
      books = books.sort({ rating: -1 });
    } else if (sortBy === 'newest') {
      books = books.sort({ year: -1 });
    } else {
      // Default: featured (can be customized)
      books = books.sort({ rating: -1, reviews: -1 });
    }

    const result = await books;
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error fetching books' });
  }
};

// @desc    Get single book by ID
// @route   GET /api/books/:id
// @access  Public
exports.getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    if (book) {
      res.json(book);
    } else {
      res.status(404).json({ message: 'Book not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error fetching book' });
  }
};

// @desc    Get books by category
// @route   GET /api/books/category/:category
// @access  Public
exports.getBooksByCategory = async (req, res) => {
  try {
    const books = await Book.find({ category: req.params.category });
    res.json(books);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error fetching books by category' });
  }
};

