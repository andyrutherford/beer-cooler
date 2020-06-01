const express = require('express');
const router = express.Router();

const { getUserProfile } = require('../controllers/profile-controller');
const { createUserProfile } = require('../controllers/profile-controller');
const { getAllProfiles } = require('../controllers/profile-controller');
const { getProfileById } = require('../controllers/profile-controller');

const authMiddleware = require('../middleware/auth');

router.route('/me').get(authMiddleware, getUserProfile);
router.route('/').post(authMiddleware, createUserProfile);
router.route('/').get(getAllProfiles);
router.route('/:user_id').get(getProfileById);

module.exports = router;
