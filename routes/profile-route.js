const express = require('express');
const router = express.Router();

const { getUserProfile } = require('../controllers/profile-controller');
const { createUserProfile } = require('../controllers/profile-controller');
const { getAllProfiles } = require('../controllers/profile-controller');
const { getProfileById } = require('../controllers/profile-controller');

router.route('/me').get(getUserProfile);
router.route('/').post(createUserProfile);
router.route('/').get(getAllProfiles);
router.route('/:user_id').get(getProfileById);

module.exports = router;
