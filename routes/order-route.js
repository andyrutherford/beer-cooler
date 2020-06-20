const express = require('express');
const router = express.Router();

const {
  placeOrder,
  placeGuestOrder,
  getOrderById,
  getAllUserOrders,
} = require('../controllers/order-controller');

const authMiddleware = require('../middleware/auth');

router.route('/').get(authMiddleware, getAllUserOrders);
router.route('/guest-new').post(placeGuestOrder);
router.route('/new').post(authMiddleware, placeOrder);
router.route('/:order_id').get(authMiddleware, getOrderById);

module.exports = router;
