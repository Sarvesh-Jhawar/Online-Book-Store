// src/models/Book.js
const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  author: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  originalPrice: {
    type: Number,
    min: 0,
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5,
  },
  reviews: {
    type: Number,
    default: 0,
    min: 0,
  },
  category: {
    type: String,
    required: true,
    trim: true,
  },
  image: {
    type: String,
    default: '',
  },
  description: {
    type: String,
    default: '',
  },
  discount: {
    type: Number,
    min: 0,
    max: 100,
  },
  isbn: {
    type: String,
    trim: true,
  },
  publisher: {
    type: String,
    trim: true,
  },
  pages: {
    type: Number,
    min: 0,
  },
  year: {
    type: Number,
    min: 0,
  },
}, { timestamps: true });

module.exports = mongoose.model('Book', BookSchema);

