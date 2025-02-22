const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');
const morgan = require('morgan');
const connectDB = require('./config/db');

dotenv.config({ path: './config/config.env' });

connectDB();

// Routes
const users = require('./routes/auth-route');
const profile = require('./routes/profile-route');
const email = require('./routes/email');
const order = require('./routes/order-route');

const app = express();

// Body parser
app.use(express.json());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use('/api/v1/auth', users);
app.use('/api/v1/profile', profile);
app.use('/api/v1/orders', order);
app.use('/password', email);

// Serve static assets
if (process.env.NODE_ENV === 'production') {
  // Set Static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV.red.bold} on port ${PORT.yellow.bold}`
  )
);
