const express = require('express');
const router = express.Router();
const {
  getUser,
  createUser,
  loginUser,
  changePassword,
  deleteUser,
} = require('../controllers/auth-controller');
const authMiddleware = require('../middleware/auth');

router.route('/').get(authMiddleware, getUser);
router.route('/').put(authMiddleware, changePassword);
router.route('/').delete(authMiddleware, deleteUser);
router.route('/signup').post(createUser);
router.route('/login').post(loginUser);

module.exports = router;
