// src/routes/orderRoutes.js
const express = require('express');
const { protect } = require('../middleware/auth');
const {
  createOrder,
  getOrders,
  getOrder,
} = require('../controllers/orderController');

const router = express.Router();

// All order routes require authentication
router.use(protect);

router.route('/')
  .get(getOrders)
  .post(createOrder);

router.route('/:id')
  .get(getOrder);

module.exports = router;

