// src/routes/bookRoutes.js
const express = require('express');
const { getBooks, getBookById, getBooksByCategory } = require('../controllers/bookController');

const router = express.Router();

router.get('/', getBooks);
router.get('/category/:category', getBooksByCategory);
router.get('/:id', getBookById);

module.exports = router;

