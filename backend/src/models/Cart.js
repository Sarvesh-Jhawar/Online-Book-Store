// src/models/Cart.js
const mongoose = require('mongoose');

const CartItemSchema = new mongoose.Schema({
  book: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Book',
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
    default: 1,
  },
});

const CartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true,
  },
  items: [CartItemSchema],
}, { timestamps: true });

// Method to calculate total
CartSchema.methods.calculateTotal = function() {
  return this.items.reduce((total, item) => {
    return total + (item.book.price * item.quantity);
  }, 0);
};

module.exports = mongoose.model('Cart', CartSchema);

