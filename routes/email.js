var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');

const { forgotPassword } = require('../controllers/email-controller');
router.route('/forgot').post(forgotPassword);
const { resetPassword } = require('../controllers/email-controller');
router.route('/reset').get(resetPassword);
const { updatePassword } = require('../controllers/email-controller');
router.route('/update').put(updatePassword);

// var transport = {
//   host: 'smtp.gmail.com',
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASSWORD,
//   },
// };

// var transporter = nodemailer.createTransport(transport);

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
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

router.post('/', (req, res, next) => {
  var name = req.body.name;
  var email = req.body.email;
  var message = req.body.message;
  var content = `name: ${name} \n email: ${email} \n message: ${message} `;

  var mail = {
    from: name,
    to: 'andrew.rutherford.6@gmail.com',
    subject: 'New Message from Contact Form',
    text: content,
  };

  transporter.sendMail(mail, (err, data) => {
    if (err) {
      res.json({
        msg: 'fail',
      });
    } else {
      res.json({
        msg: 'success',
      });
    }
  });
});

module.exports = router;
