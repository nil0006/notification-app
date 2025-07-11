const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true,
    unique: true
  },

  password: {
    type: String,
    required: true
  },

  role: {
    type: String,
    enum: ['User', 'Manager'],
    default: 'User'
  },

  isOnline: {
    type: Boolean,
    default: false // We'll use this to simulate online presence
  }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
