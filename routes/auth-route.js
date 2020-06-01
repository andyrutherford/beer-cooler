const express = require('express');
const router = express.Router();
const {
  getUser,
  createUser,
  loginUser,
} = require('../controllers/auth-controller');

router.route('/').get(getUser);
router.route('/signup').post(createUser);
router.route('/login').post(loginUser);

module.exports = router;
