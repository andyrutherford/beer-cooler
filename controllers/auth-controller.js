const User = require('../models/User');
const Profile = require('../models/Profile');
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

    // Initialize empty profile for new user
    let profile = new Profile({
      user: user.id,
      location: 'Canada',
    });
    await profile.save();

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
        error: 'User not found.  Please create an account.',
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

// @desc    Change user password
// @route   PUT /api/v1/auth/
// @access  PRIVATE
exports.changePassword = async (req, res, next) => {
  const { oldPassword, newPassword } = req.body;
  const { email, id } = req.user;

  try {
    let user = await User.findOne({ email });

    const profileFields = {};
    profileFields.password = newPassword;

    // If user does not exist
    if (!user) {
      return res.status(400).json({
        success: false,
        error: 'Something went wrong.  Please try again later.',
      });
    }

    // Check existing password
    const isMatch = await bcrypt.compare(oldPassword, user.password);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        error: 'Your old password is incorrect.',
      });
    }

    // Encrypt new password
    const salt = await bcrypt.genSalt(10);
    profileFields.password = await bcrypt.hash(newPassword, salt);

    // Save new password
    user = await User.findByIdAndUpdate(
      id,
      { $set: profileFields },
      { new: true }
    );

    // Create new JWT
    const payload = {
      user: {
        email,
        id,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      {
        expiresIn: 360000,
      },
      (err, token) => {
        if (err) throw err;
        res.json({
          success: true,
          msg: 'Password changed successfully.',
          token,
        });
      }
    );
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// @desc    Delete user account and profile
// @route   DELETE /api/v1/auth/
// @access  PRIVATE
exports.deleteUser = async (req, res, next) => {
  const userId = req.user.id;
  try {
    await Profile.findOneAndRemove({ user: userId });
    await User.findOneAndRemove({ _id: userId });
    res.json({ success: true, message: 'User deleted.' });
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
