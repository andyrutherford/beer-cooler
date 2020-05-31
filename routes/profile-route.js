const express = require('express');
const router = express.Router();

const { getUserProfile } = require('../controllers/profile-controller');
const { createUserProfile } = require('../controllers/profile-controller');

router.route('/me').get(getUserProfile);
router.route('/').post(createUserProfile);

module.exports = router;
