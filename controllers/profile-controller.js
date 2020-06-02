const mongoose = require('mongoose');

const Profile = require('../models/Profile');
const User = require('../models/User');

// @desc    Get current users profile
// @route   GET api/v1/profile/me
exports.getUserProfile = async (req, res, next) => {
  const userId = req.user.id;
  console.log(userId);
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
  const user = req.user.id;
  let currentBeers;

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
    cooler: Array.isArray(cooler)
      ? cooler
      : cooler.split(',').map((item) => ' ' + item.trim()),
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
    // TODO: Validate cooler array data is a number

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
      if (found) found.quantity += cur.quantity;
      else accumulator.push(cur);
      return accumulator;
    }, []);

    let profile = await Profile.findOneAndUpdate(
      { user: userId },
      { $set: { cooler: newCooler } },
      { new: true, upsert: true }
    );

    res.json({ success: true, profile });
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
