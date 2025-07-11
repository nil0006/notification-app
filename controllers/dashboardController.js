const Notification = require('../models/Notification');

exports.getDashboard = async (req, res) => {
  try {
    const notifications = await Notification.find().sort({ createdAt: -1 });

    res.render('dashboard', {
      user: req.user,
      notifications,
      error: req.query.error || null
    });
  } catch (err) {
    console.error('Dashboard load error:', err);
    res.render('dashboard', {
      user: req.user,
      notifications: [],
      error: 'Something went wrong!'
    });
  }
};

exports.getSendNotification = (req, res) => {
  res.render('sendNotification', { user: req.user });
};
