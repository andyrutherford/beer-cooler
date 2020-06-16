const Order = require('../models/Order');
const User = require('../models/User');

// @desc    Place new order
// @route   POST /api/v1/orders/new
exports.placeOrder = async (req, res, next) => {
  const userId = req.user.id;
  const { address, payment } = req.body;
  try {
    // Initialize empty profile for new user
    let order = new Order({
      user: userId,
      address: { ...address },
      payment: { ...payment },
    });
    await order.save();
    console.log(order);
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
