const Notification = require('../models/Notification');
const User = require('../models/User');


exports.createNotification = async (req, res) => {
  const { title , message, priority } = req.body;

  const notification = await Notification.create({title , message, priority });

  // Simulate sending emails to offline users
  const users = await User.find({ role: 'User' });

  users.forEach(user => {
    if (!user.isOnline && priority === 'high') {
      console.log(`📧 Email sent to ${user.email}`);
    }
  });

  // Emit socket event
  req.io.emit('newNotification', notification); // socket.io attached via middleware

  res.redirect('/dashboard');
};

