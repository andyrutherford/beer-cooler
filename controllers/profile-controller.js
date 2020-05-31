const Profile = require('../models/Profile');
const User = require('../models/User');

// @desc    Get all user beers
// @route   GET api/v1/profile/me
exports.getUserProfile = async (req, res, next) => {
  const userId = req.headers.user;
  console.log(userId);
  try {
    const profile = await User.findOne({
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
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};
