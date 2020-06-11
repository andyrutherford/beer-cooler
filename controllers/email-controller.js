const User = require('../models/User');
const crypto = require('crypto');
const nodemailer = require('nodemailer');

exports.forgotPassword = async (req, res, next) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      res.send('No user found');
    } else {
      const token = crypto.randomBytes(20).toString('hex');
      const userToken = {
        resetPasswordToken: token,
        resetPasswordExpires: Date.now() + 360000,
      };
      user.token = userToken;
      await user.save();

      const transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
          user: 'oceane38@ethereal.email',
          pass: 'Qd85UAQTxQFCeyEAV7',
        },
      });

      const mailOptions = {
        from: `password_reset@beercooler.com`,
        to: `${user.email}`,
        subject: 'Rest your Password',
        text:
          `You are receiving this because you (or someone else) has requested the reset of the password for your account.\n\n` +
          `Please click on the following link, or paste this into your browser to complete the process within one hour of receiving it:\n\n` +
          `http://localhost:3031/reset/${token}\n\n` +
          `If you did not request this, please ignore this email and your password will remain unchanged.\n`,
      };

      transporter.sendMail(mailOptions, (err, response) => {
        if (err) {
          console.error('error: ', err);
        } else {
          console.log('ressss: ', response);
          res.status(200).json('response email sent');
        }
      });
    }
  } catch (error) {
    console.log(error.message);
  }
};
