const express = require('express');
const router = express.Router();

const { placeOrder } = require('../controllers/order-controller');

const authMiddleware = require('../middleware/auth');

router.route('/new').post(authMiddleware, placeOrder);

module.exports = router;
