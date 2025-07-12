const mongoose = require('mongoose');

// Establish MongoDB connection
const connectDB = async () => {
  try {
    // Attempt connection using MONGO_URI from .env
    await mongoose.connect(process.env.MONGO_URI);

    console.log('MongoDB connected successfully');
  } catch (err) {
    // Log connection errors
    console.error('MongoDB connection failed:', err.message);
  }
};

module.exports = connectDB;
