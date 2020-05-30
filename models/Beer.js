const mongoose = require('mongoose');

const BeerSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
  },
  beerId: {
    type: Number,
  },
  name: {
    type: String,
  },
  quantity: {
    type: Number,
  },
  note: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Beer', BeerSchema);
