const Beer = require('../models/Beer');

// @desc    Get all user beers
// @route   GET /api/v1/beers
exports.getUserBeers = async (req, res, next) => {
  try {
    return res.status(200).json({
      success: true,
    });
  } catch (error) {}
};

// @desc    Add beer to user
// @route   POST /api/v1/beers
exports.addUserBeer = async (req, res, next) => {
  const { user, beerId, name, quantity, note } = req.body;
  try {
    const newBeer = await Beer.create({
      user,
      beerId,
      name,
      quantity,
      note,
    });

    return res.status(201).json({
      success: true,
      data: newBeer,
    });
  } catch (error) {
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
