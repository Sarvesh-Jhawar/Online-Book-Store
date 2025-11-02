// src/controllers/cartController.js
const Cart = require('../models/Cart');
const Book = require('../models/Book');

// @desc    Get user's cart
// @route   GET /api/cart
// @access  Private
exports.getCart = async (req, res) => {
  try {
    let cart = await Cart.findOne({ user: req.user._id }).populate('items.book');

    if (!cart) {
      cart = await Cart.create({ user: req.user._id, items: [] });
    }

    // Format cart items to match frontend expectations
    const formattedItems = cart.items.map(item => {
      const book = item.book;
      return {
        id: book._id.toString(),
        _id: book._id.toString(),
        title: book.title,
        author: book.author,
        price: book.price,
        originalPrice: book.originalPrice,
        rating: book.rating,
        reviews: book.reviews,
        category: book.category,
        image: book.image,
        description: book.description,
        discount: book.discount,
        isbn: book.isbn,
        publisher: book.publisher,
        pages: book.pages,
        year: book.year,
        quantity: item.quantity,
      };
    });

    res.json(formattedItems);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error fetching cart' });
  }
};

// @desc    Add item to cart
// @route   POST /api/cart
// @access  Private
exports.addToCart = async (req, res) => {
  try {
    const { bookId, quantity = 1 } = req.body;

    if (!bookId) {
      return res.status(400).json({ message: 'Book ID is required' });
    }

    // Verify book exists
    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    let cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
      cart = await Cart.create({ user: req.user._id, items: [] });
    }

    // Check if item already exists in cart
    const existingItemIndex = cart.items.findIndex(
      item => item.book.toString() === bookId
    );

    if (existingItemIndex > -1) {
      // Update quantity
      cart.items[existingItemIndex].quantity += quantity;
    } else {
      // Add new item
      cart.items.push({ book: bookId, quantity });
    }

    await cart.save();
    await cart.populate('items.book');

    // Format response
    const formattedItems = cart.items.map(item => {
      const book = item.book;
      return {
        id: book._id.toString(),
        _id: book._id.toString(),
        title: book.title,
        author: book.author,
        price: book.price,
        originalPrice: book.originalPrice,
        rating: book.rating,
        reviews: book.reviews,
        category: book.category,
        image: book.image,
        description: book.description,
        discount: book.discount,
        isbn: book.isbn,
        publisher: book.publisher,
        pages: book.pages,
        year: book.year,
        quantity: item.quantity,
      };
    });

    res.json(formattedItems);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error adding to cart' });
  }
};

// @desc    Update cart item quantity
// @route   PUT /api/cart/:bookId
// @access  Private
exports.updateCartItem = async (req, res) => {
  try {
    const { quantity } = req.body;
    const { bookId } = req.params;

    if (quantity <= 0) {
      return res.status(400).json({ message: 'Quantity must be greater than 0' });
    }

    const cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    const itemIndex = cart.items.findIndex(
      item => item.book.toString() === bookId
    );

    if (itemIndex === -1) {
      return res.status(404).json({ message: 'Item not found in cart' });
    }

    cart.items[itemIndex].quantity = quantity;
    await cart.save();
    await cart.populate('items.book');

    // Format response
    const formattedItems = cart.items.map(item => {
      const book = item.book;
      return {
        id: book._id.toString(),
        _id: book._id.toString(),
        title: book.title,
        author: book.author,
        price: book.price,
        originalPrice: book.originalPrice,
        rating: book.rating,
        reviews: book.reviews,
        category: book.category,
        image: book.image,
        description: book.description,
        discount: book.discount,
        isbn: book.isbn,
        publisher: book.publisher,
        pages: book.pages,
        year: book.year,
        quantity: item.quantity,
      };
    });

    res.json(formattedItems);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error updating cart' });
  }
};

// @desc    Remove item from cart
// @route   DELETE /api/cart/:bookId
// @access  Private
exports.removeFromCart = async (req, res) => {
  try {
    const { bookId } = req.params;

    const cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    cart.items = cart.items.filter(
      item => item.book.toString() !== bookId
    );

    await cart.save();
    await cart.populate('items.book');

    // Format response
    const formattedItems = cart.items.map(item => {
      const book = item.book;
      return {
        id: book._id.toString(),
        _id: book._id.toString(),
        title: book.title,
        author: book.author,
        price: book.price,
        originalPrice: book.originalPrice,
        rating: book.rating,
        reviews: book.reviews,
        category: book.category,
        image: book.image,
        description: book.description,
        discount: book.discount,
        isbn: book.isbn,
        publisher: book.publisher,
        pages: book.pages,
        year: book.year,
        quantity: item.quantity,
      };
    });

    res.json(formattedItems);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error removing from cart' });
  }
};

// @desc    Clear entire cart
// @route   DELETE /api/cart
// @access  Private
exports.clearCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    cart.items = [];
    await cart.save();

    res.json([]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error clearing cart' });
  }
};

