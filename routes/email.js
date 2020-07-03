var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');

const { forgotPassword } = require('../controllers/email-controller');
router.route('/forgot').post(forgotPassword);
const { resetPassword } = require('../controllers/email-controller');
router.route('/reset').get(resetPassword);
const { updatePassword } = require('../controllers/email-controller');
router.route('/update').put(updatePassword);

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_SMTP,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

transporter.verify((error, success) => {
  if (error) {
    console.log(error);
  } else {
    console.log('Server is ready to take messages');
  }
});

module.exports = router;
