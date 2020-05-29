const express = require('express');
const router = express.Router();
const {
  getUsers,
  createUser,
  loginUser,
} = require('../controllers/auth-controller');

router.route('/').get(getUsers);
router.route('/signup').post(createUser);
router.route('/login').post(loginUser);

module.exports = router;
