const mongoose = require('mongoose');

const Profile = require('../models/Profile');
const User = require('../models/User');

// @desc    Get current users profile
// @route   GET api/v1/profile/me
exports.getUserProfile = async (req, res, next) => {
  const userId = req.user.id;
  try {
    const profile = await Profile.findOne({
      user: userId,
    });

    if (!profile) {
      return res.status(400).json({
        success: false,
        error: 'There is no profile for this user',
      });
    }

    return res.json({
      success: true,
      profile: profile,
    });
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

// @desc    Create and update user profile
// @route   POST api/v1/profile
// @access  Private
exports.createUserProfile = async (req, res, next) => {
  const { location, cooler } = req.body;
  const userId = req.user.id;

  try {
    // Check beers in profile
    let profile = await Profile.findOne({
      user: userId,
    });
    currentBeers = profile.cooler;
  } catch (error) {}

  const profileFields = {
    user: req.user.id,
    location,
  };

  try {
    let profile = await Profile.findOneAndUpdate(
      { user: req.user.id },
      { $set: profileFields },
      { new: true, upsert: true }
    );
    res.json({
      success: true,
      profile,
    });
  } catch (error) {
    console.error(error);
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((val) => val.message);
      return res.status(400).json({
        success: false,
        error: messages,
      });
    }
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        error: error.message,
      });
    } else
      return res.status(500).json({
        success: false,
        error: error,
      });
  }
};

// @desc    Add/update profile address
// @route   POST api/v1/profile/address
// @access  Private
exports.updateAddress = async (req, res, next) => {
  const userId = req.user.id;
  const address = req.body;
  try {
    const profile = await Profile.findOneAndUpdate(
      { user: userId },
      { $set: { address } },
      { new: true, upsert: true }
    );
    if (!profile) {
      return res.status(500).json({
        success: false,
        msg: 'A problem occurred.  Please try again.',
      });
    }
    res.json({ success: true, profile });
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

// @desc    Save profile payment information
// @route   POST api/v1/profile/payment
// @access  Private
exports.savePayment = async (req, res, next) => {
  console.log(req.body);
  const userId = req.user.id;
  const { cardName, cardNumber, expMonth, expYear } = req.body;

  const paymentInfo = { cardName, cardNumber, expMonth, expYear };
  console.log(paymentInfo);
  try {
    const profile = await Profile.findOneAndUpdate(
      {
        user: userId,
      },
      { $set: { payment: paymentInfo } },
      { new: true, upsert: true }
    );

    if (!profile) {
      return res.status(500).json({
        success: false,
        msg: 'A problem occurred.  Please try again.',
      });
    }
    res.json({ success: true, profile });
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

// @desc    Add items to cooler
// @route   POST api/v1/profile/cooler
// @access  Private
exports.addCoolerItem = async (req, res, next) => {
  const userId = req.user.id;
  const coolerItems = req.body;
  try {
    let guy = await Profile.findOne({
      user: userId,
    });

    const concatCoolers = guy.cooler.concat(coolerItems.cooler);
    const newCooler = concatCoolers.reduce(function (accumulator, cur) {
      let id = cur.id,
        found = accumulator.find(function (elem) {
          return elem.id == id;
        });
      if (found) {
        found.quantity += cur.quantity;
      } else {
        accumulator.push(cur);
      }
      return accumulator;
    }, []);

    let profile = await Profile.findOneAndUpdate(
      { user: userId },
      { $set: { cooler: newCooler } },
      { new: true, upsert: true }
    );

    res.json({ success: true, profile });
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

// @desc    Remove cooler item
// @route   DELETE api/v1/profile/cooler/:id
// @access  PRIVATE
exports.removeCoolerItem = async (req, res, next) => {
  const userId = req.user.id;
  const itemToRemove = parseInt(req.params.id);
  try {
    const profile = await Profile.findOneAndUpdate({
      user: userId,
    });
    const item = profile.cooler.find((i) => i.id === itemToRemove);

    // Make sure item exists
    if (!item) {
      res.status(404).json({ success: false, msg: 'Item does not exist.' });
    }

    profile.cooler = profile.cooler.filter(({ id }) => id !== itemToRemove);

    await profile.save();

    return res.json({
      success: true,
      profile,
    });
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

// @desc    Remove all cooler items
// @route   DELETE api/v1/profile/cooler
// @access  PRIVATE
exports.removeAllCoolerItems = async (req, res, next) => {
  const userId = req.user.id;
  try {
    let profile = await Profile.findOneAndUpdate(
      { user: userId },
      { $set: { cooler: [] } },
      { new: true, upsert: true }
    );
    res.json({
      success: true,
      profile,
    });
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

// @desc    Get cooler items
// @route   GET api/v1/profile/cooler
exports.getCoolerItems = async (req, res, next) => {
  const userId = req.user.id;
  try {
    const profile = await Profile.findOne({
      user: userId,
    });
    if (!profile) {
      return res.json({ success: true, profileCooler: [] });
    }
    const profileCooler = profile.cooler;

    res.json({ success: true, profileCooler });
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

// @desc  Get all user profiles
// @route GET api/v1/profile
exports.getAllProfiles = async (req, res, next) => {
  try {
    const profiles = await Profile.find().populate('user', ['name', 'email']);
    res.json({
      success: true,
      profiles,
    });
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

// @desc  Get profile by userId
// @route GET api/v1/profile/user/:user_id
exports.getProfileById = async ({ params: { user_id } }, res, next) => {
  // Make sure user_id is a valid mongoose ObjectId
  if (!mongoose.Types.ObjectId.isValid(user_id))
    return res.status(400).json({ success: false, error: 'Invalid user ID' });
  try {
    const profile = await Profile.findOne({
      user: user_id,
    }).populate('user', ['name', 'email']);

    if (!profile) {
      return res.status(400).json({
        success: false,
        error: 'Profile not found',
      });
    }
    return res.json({
      success: true,
      profile,
    });
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
