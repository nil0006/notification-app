const mongoose = require("mongoose");

// Schema for storing user information
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true, // Full name of the user
    },

    email: {
      type: String,
      required: true, // Must be provided during signup
      unique: true, // No duplicate accounts with same email
    },

    password: {
      type: String,
      required: true, // Hashed password stored here
    },

    role: {
      type: String,
      enum: ["User", "Manager"], // Role-based access control
      default: "User", // Default role
    },

    isOnline: {
      type: Boolean,
      default: false, // Used for real-time presence tracking
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt
  }
);

module.exports = mongoose.model("User", userSchema);
