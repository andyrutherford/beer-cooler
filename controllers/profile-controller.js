const mongoose = require('mongoose');

const Profile = require('../models/Profile');
const User = require('../models/User');

// @desc    Get current users profile
// @route   GET api/v1/profile/me
exports.getUserProfile = async (req, res, next) => {
  const userId = req.headers.user;
  console.log(userId);
  try {
    const profile = await Profile.findOne({
      _id: userId,
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
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @desc  Create and update user profile
// @route POST api/v1/profile
exports.createUserProfile = async (req, res, next) => {
  const { location, cooler } = req.body;
  const userId = req.headers.user;
  let currentBeers;

  try {
    // Check beers in profile
    let profile = await Profile.findOne({
      user: userId,
    });
    currentBeers = profile.cooler;
  } catch (error) {}

  const profileFields = {
    user: userId,
    location,
    cooler: [cooler, ...currentBeers],
  };

  try {
    let profile = await Profile.findOneAndUpdate(
      { user: userId },
      { $set: profileFields },
      { new: true, upsert: true }
    );
    res.json({
      success: true,
      profile,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
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
    console.error(error.message);
    res.status(500).send('Server error');
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
    console.log(profile);

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
    console.error(error.message);
    return res.status(500).json({ msg: 'Server error ' });
  }
};
