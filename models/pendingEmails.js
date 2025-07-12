const mongoose = require("mongoose");

// Schema for emails queued to be sent
const pendingEmailSchema = new mongoose.Schema({
  to: {
    type: String,
    required: true, // Recipient email address
  },
  subject: {
    type: String,
    required: true, // Email subject line
  },
  html: {
    type: String,
    required: true, // HTML content of the email
  },
  sent: {
    type: Boolean,
    default: false, // Whether the email has been successfully sent
  },
  sentAt: {
    type: Date,
    default: null, // Timestamp when the email was sent
    // 🔔 This is used for TTL auto-deletion
  },
  createdAt: {
    type: Date,
    default: Date.now, // Timestamp when the email was queued
  },
});

// TTL index — deletes email 1 hour after it was sent
// Only applies when sentAt is set
pendingEmailSchema.index({ sentAt: 1 }, { expireAfterSeconds: 3600 });

module.exports = mongoose.model("PendingEmail", pendingEmailSchema);
