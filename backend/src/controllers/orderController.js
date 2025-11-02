// src/controllers/orderController.js
const Order = require('../models/Order');
const Cart = require('../models/Cart');

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
exports.createOrder = async (req, res) => {
  try {
    const { shippingAddress } = req.body;

    // Get user's cart
    const cart = await Cart.findOne({ user: req.user._id }).populate('items.book');

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: 'Cart is empty' });
    }

    // Calculate totals
    const subtotal = cart.calculateTotal();
    const tax = subtotal * 0.1;
    const shipping = 9.99;
    const total = subtotal + tax + shipping;

    // Create order items
    const orderItems = cart.items.map(item => ({
      book: item.book._id,
      quantity: item.quantity,
      price: item.book.price,
    }));

    // Create order
    const order = await Order.create({
      user: req.user._id,
      items: orderItems,
      subtotal,
      tax,
      shipping,
      total,
      shippingAddress: shippingAddress || {},
    });

    // Clear cart
    cart.items = [];
    await cart.save();

    await order.populate('items.book');

    // Format response
    const formattedOrder = {
      id: order._id.toString(),
      _id: order._id.toString(),
      items: order.items.map(item => {
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
      }),
      subtotal: order.subtotal,
      tax: order.tax,
      shipping: order.shipping,
      total: order.total,
      status: order.status,
      shippingAddress: order.shippingAddress,
      createdAt: order.createdAt,
      updatedAt: order.updatedAt,
    };

    res.status(201).json(formattedOrder);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error creating order' });
  }
};

// @desc    Get user's orders
// @route   GET /api/orders
// @access  Private
exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .populate('items.book')
      .sort({ createdAt: -1 });

    // Format response
    const formattedOrders = orders.map(order => ({
      id: order._id.toString(),
      _id: order._id.toString(),
      items: order.items.map(item => {
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
      }),
      subtotal: order.subtotal,
      tax: order.tax,
      shipping: order.shipping,
      total: order.total,
      status: order.status,
      shippingAddress: order.shippingAddress,
      createdAt: order.createdAt,
      updatedAt: order.updatedAt,
    }));

    res.json(formattedOrders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error fetching orders' });
  }
};

// @desc    Get single order
// @route   GET /api/orders/:id
// @access  Private
exports.getOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('items.book');

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Check if order belongs to user
    if (order.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    // Format response
    const formattedOrder = {
      id: order._id.toString(),
      _id: order._id.toString(),
      items: order.items.map(item => {
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
      }),
      subtotal: order.subtotal,
      tax: order.tax,
      shipping: order.shipping,
      total: order.total,
      status: order.status,
      shippingAddress: order.shippingAddress,
      createdAt: order.createdAt,
      updatedAt: order.updatedAt,
    };

    res.json(formattedOrder);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error fetching order' });
  }
};

