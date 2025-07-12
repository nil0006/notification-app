const Notification = require('../models/Notification');

// Render the dashboard with all notifications
exports.getDashboard = async (req, res) => {
  try {
    // Fetch all notifications, newest first
    const notifications = await Notification.find().sort({ createdAt: -1 });

    // Render dashboard view with user, notifications, and optional error
    res.status(200).render('dashboard', {
      user: req.user,
      notifications,
      error: req.query.error || null,
    });
  } catch (err) {
    console.error(' Dashboard load error:', err.message);

    // In case of error, render the dashboard with empty notifications and show error
    res.status(500).render('dashboard', {
      user: req.user,
      notifications: [],
      error: 'Something went wrong!',
    });
  }
};

// ✉️ Render the "Send Notification" form page
exports.getSendNotification = (req, res) => {
  res.status(200).render('sendNotification', { user: req.user });
};
