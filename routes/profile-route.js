const express = require('express');
const router = express.Router();

const {
  getUserProfile,
  createUserProfile,
  getAllProfiles,
  getProfileById,
  addCoolerItem,
  getCoolerItems,
  removeAllCoolerItems,
  removeCoolerItem,
  updateAddress,
  savePayment,
} = require('../controllers/profile-controller');

const authMiddleware = require('../middleware/auth');

router.route('/me').get(authMiddleware, getUserProfile);
router.route('/address').post(authMiddleware, updateAddress);
router.route('/payment').post(authMiddleware, savePayment);
router.route('/').post(authMiddleware, createUserProfile);
router.route('/').get(getAllProfiles);
router.route('/user/:user_id').get(getProfileById);
router.route('/cooler').post(authMiddleware, addCoolerItem);
router.route('/cooler').delete(authMiddleware, removeAllCoolerItems);
router.route('/cooler/:id').delete(authMiddleware, removeCoolerItem);
router.route('/cooler').get(authMiddleware, getCoolerItems);

module.exports = router;
