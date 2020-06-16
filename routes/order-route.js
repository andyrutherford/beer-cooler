const express = require('express');
const router = express.Router();

const { placeOrder, getOrderById } = require('../controllers/order-controller');

const authMiddleware = require('../middleware/auth');

router.route('/new').post(authMiddleware, placeOrder);
router.route('/:order_id').get(authMiddleware, getOrderById);

module.exports = router;
