const mongoose = require("mongoose");

// Schema for storing notifications
const notificationSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true, // Title is mandatory
  },
  message: {
    type: String,
    required: true, // Message content is mandatory
  },
  priority: {
    type: String,
    enum: ["High", "Normal"], // Allowed values
    default: "Normal",
  },
  createdAt: {
    type: Date,
    default: Date.now, // Auto-populate creation timestamp
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    required: true, // User who created the notification
    ref: "User", // Optional: Add reference to User model
  },
  expiresAt: {
    type: Date,
    default: null, // If null, it won’t auto-expire
  },
});

// TTL index to auto-delete expired notifications
notificationSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

module.exports = mongoose.model("Notification", notificationSchema);
