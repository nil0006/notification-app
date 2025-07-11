const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  title:{ type: String, required: true },
  message: { type: String, required: true },
  priority: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

// Auto-delete normal notifications after 2 days
notificationSchema.index({ createdAt: 1 }, { expireAfterSeconds: 172800 }); // 2 days

module.exports = mongoose.model('Notification', notificationSchema);
