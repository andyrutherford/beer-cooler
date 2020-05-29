const express = require('express');
const router = express.Router();
const { createUser } = require('../controllers/users-controller');
const { getUsers } = require('../controllers/users-controller');

router.route('/').get(getUsers);
router.route('/').post(createUser);

module.exports = router;
