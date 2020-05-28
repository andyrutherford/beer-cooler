const User = require('../models/User');

// @desc    Create a new user
// @route   POST /api/v1/auth
// @access  PUBLIC
exports.createUser = async (req, res, next) => {
  const { name, email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        success: false,
        error: 'A user with this email already exists',
      });
    }

    const newUser = new User({
      name,
      email,
      password,
    });

    await newUser.save();

    res.status(200).json({ success: true, user: newUser });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((val) => val.message);
      return res.status(400).json({
        success: false,
        error: messages,
      });
    } else
      return res.status(500).json({
        success: false,
        error: error,
      });
  }
};
