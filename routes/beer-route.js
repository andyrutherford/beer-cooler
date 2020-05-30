const express = require('express');
const router = express.Router();

const { getUserBeers, addUserBeer } = require('../controllers/beer-controller');

router.route('/').get(getUserBeers);
router.route('/').post(addUserBeer);

module.exports = router;
