const Profile = require('../models/Profile');
const User = require('../models/User');

// @desc    Get all user beers
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
exports.createUserProfile = async (req, res, nex) => {
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
