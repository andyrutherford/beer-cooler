const User = require('../models/User');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const bcrypt = require('bcryptjs');

exports.forgotPassword = async (req, res, next) => {
  console.log('res: ', req.body);
  const { email } = req.body;
  console.log('email: ', email);
  try {
    const user = await User.findOne({ email });
    if (!user) {
      res.send('no user found');
    } else {
      const token = crypto.randomBytes(20).toString('hex');

      const resetPasswordToken = token;
      const resetPasswordExpires = Date.now() + 360000;

      user.resetPasswordToken = resetPasswordToken;
      user.resetPasswordExpires = resetPasswordExpires;
      await user.save();

      const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASSWORD,
        },
      });

      const mailURL =
        process.env.NODE_ENV === 'development'
          ? `http://localhost:3000/reset_password/${token}`
          : `https://beer-cooler-2635.herokuapp.com/reset_password/${token}`;

      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: user.email,
        subject: 'Reset your Password',
        text:
          `You are receiving this because you (or someone else) has requested the reset of the password for your account.\n\n` +
          `Please click on the following link, or paste this into your browser to complete the process within one hour of receiving it:\n\n` +
          `${mailURL} \n\n` +
          `If you did not request this, please ignore this email and your password will remain unchanged.\n`,
      };

      transporter.sendMail(mailOptions, (err, response) => {
        if (err) {
          console.error('error: ', err);
        } else {
          res.status(200).send('recovery email sent');
        }
      });
    }
  } catch (error) {
    console.log(error.message);
  }
};

exports.resetPassword = async (req, res, next) => {
  console.log(req.query);
  try {
    const user = await User.findOne({
      resetPasswordToken: req.query.resetPasswordToken,
      resetPasswordExpires: {
        $gt: Date.now(),
      },
    });

    if (!user) {
      console.log('There was a problem, please try again');
      return res.send('Problem');
    }
    console.log('user found');
    res.status(200).json({
      email: user.email,
      message: 'password reset successful',
    });
  } catch (error) {
    console.log(error.message);
  }
};

exports.updatePassword = async (req, res, next) => {
  try {
    const user = await User.findOne({
      email: req.body.email,
    });
    if (user) {
      console.log('user exists');
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(req.body.password, salt);
      user.resetPasswordToken = null;
      user.resetPasswordExpires = null;
      await user.save();
      console.log('password updated');
      res.status(200).send({ message: 'password updated' });
    } else {
      console.log('user does not exist');
      res.status(404).json('no user exists in db to update');
    }
  } catch (error) {
    console.log(error.message);
  }
};
