const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Get user by token
exports.getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

// @desc    Create a new user
// @route   POST /api/v1/auth/signup
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

    user = new User({
      name,
      email,
      password,
    });

    // Encrypt password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    const payload = {
      user: {
        email: user.email,
        id: user.id,
      },
    };

    // Create JWT
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      {
        expiresIn: 360000,
      },
      (err, token) => {
        if (err) throw err;
        res.json({
          token,
          email,
          name,
        });
      }
    );
  } catch (error) {
    console.log(error);
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((val) => val.message);
      return res.status(400).json({
        success: false,
        error: messages,
      });
    } else
      return res.status(500).json({
        success: false,
        error,
      });
  }
};

// @desc  Login user
// @route POST /api/v1/auth/login
// @access  PUBLIC
exports.loginUser = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    // See if user already exists
    let user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        success: false,
        error: 'User not found',
      });
    }

    // Decrypt stored password and compare
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        error: 'Invalid credentials.  Please try again.',
      });
    }

    const name = user.name;
    const payload = {
      user: {
        email: user.email,
        id: user.id,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: 360000 },
      (err, token) => {
        if (err) throw err;
        res.json({
          token,
          email,
          name,
        });
      }
    );
  } catch (error) {
    console.log(error);
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((val) => val.message);

      return res.status(400).json({
        success: false,
        error: messages,
      });
    } else {
      return res.status(500).json({
        sucess: false,
        error: 'Server error',
      });
    }
  }
};
