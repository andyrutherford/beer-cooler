const express = require('express');
const router = express.Router();
const {
  getUser,
  createUser,
  loginUser,
} = require('../controllers/auth-controller');
const authMiddleware = require('../middleware/auth');

router.route('/').get(authMiddleware, getUser);
router.route('/signup').post(createUser);
router.route('/login').post(loginUser);

module.exports = router;
