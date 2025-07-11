const Notification = require('../models/Notification');
const User = require('../models/User');


exports.createNotification = async (req, res) => {
  const { title , message, priority } = req.body;

  const notification = await Notification.create({title , message, priority });

  // Emit socket event
  req.io.emit('newNotification', notification); // socket.io attached via middleware
  

  res.redirect('/dashboard');
};

