const express = require('express');
const router = express.Router();

const { getUserProfile } = require('../controllers/profile-controller');

router.route('/me').get(getUserProfile);

module.exports = router;
