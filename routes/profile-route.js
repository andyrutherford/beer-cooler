const express = require('express');
const router = express.Router();

const { getUserProfile } = require('../controllers/profile-controller');
const { createUserProfile } = require('../controllers/profile-controller');
const { getAllProfiles } = require('../controllers/profile-controller');
const { getProfileById } = require('../controllers/profile-controller');
const { addCoolerItem } = require('../controllers/profile-controller');
const { getCoolerItems } = require('../controllers/profile-controller');
const { removeAllCoolerItems } = require('../controllers/profile-controller');
const { removeCoolerItem } = require('../controllers/profile-controller');

const authMiddleware = require('../middleware/auth');

router.route('/me').get(authMiddleware, getUserProfile);
router.route('/').post(authMiddleware, createUserProfile);
router.route('/').get(getAllProfiles);
router.route('/user/:user_id').get(getProfileById);
router.route('/cooler').post(authMiddleware, addCoolerItem);
router.route('/cooler').delete(authMiddleware, removeAllCoolerItems);
router.route('/cooler/:id').delete(authMiddleware, removeCoolerItem);
router.route('/cooler').get(authMiddleware, getCoolerItems);

module.exports = router;
