const Order = require('../models/Order');

const mongoose = require('mongoose');

// @desc    Place new order as a guest
// @route   POST /api/v1/orders/guest-new
// @access  PUBLIC
exports.placeGuestOrder = async (req, res, next) => {
  console.log('* place guest order controller *');
  const { address, payment, cooler } = req.body;
  try {
    let order = new Order({
      address: { ...address },
      payment: { ...payment },
      cooler: [...cooler],
    });
    const orderId = order._id.toString().slice(18, 24);
    order.orderId = orderId;
    await order.save();
    res.json({
      success: true,
      order,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      success: false,
      error: 'A problem occurred.  Please try again',
    });
  }
};

// @desc    Place new order
// @route   POST /api/v1/orders/new
// @access  PRIVATE
exports.placeOrder = async (req, res, next) => {
  console.log('* place order controller *');
  const userId = req.user.id;
  const { address, payment, cooler } = req.body;
  try {
    // Initialize empty profile for new user
    let order = new Order({
      user: userId,
      address: { ...address },
      payment: { ...payment },
      cooler: [...cooler],
    });
    const orderId = order._id.toString().slice(18, 24);

    order.orderId = orderId;
    await order.save();
    res.json({
      success: true,
      order,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      success: false,
      error: 'A problem occurred.  Please try again',
    });
  }
};

// @desc    Get order by order id
// @route   GET /api/v1/orders/:id
// @access  PRIVATE
exports.getOrderById = async (req, res, next) => {
  const orderId = req.params.order_id;
  const userId = req.user.id;

  //   Ensure the order ID is a valid object ID
  if (!mongoose.isValidObjectId(orderId)) {
    return res
      .status(500)
      .json({ success: false, message: 'Invalid order ID' });
  }

  try {
    //   Ensure the order matches both the order ID and the ID of the user requesting it
    const order = await Order.findOne({ _id: orderId, user: userId });
    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found.',
      });
    }
    res.json({
      success: true,
      order,
    });
  } catch (error) {
    console.log(error.message);
    res.send(error.message);
  }
};

// @desc    Get all users orders
// @route   GET /api/v1/orders/
// @access  PRIVATE
exports.getAllUserOrders = async (req, res, next) => {
  const userId = req.user.id;
  try {
    const orders = await Order.find({
      user: userId,
    }).sort({ date: -1 });

    res.json({ success: true, orders });
  } catch (error) {
    console.log(error.message);
    res.send(error.message);
  }
};
