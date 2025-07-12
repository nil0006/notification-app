const Notification = require("../models/Notification");
const PendingEmail = require("../models/pendingEmails");
const User = require("../models/User");
const { generateEmailHTML } = require("../utility/email");

exports.createNotification = async (req, res) => {
  const { title, message, priority } = req.body;

  // Set expiration only for "Normal" priority notifications (48 hours)
  const expiresAt =
    priority === "Normal" ? new Date(Date.now() + 1000 * 60 * 60 * 48) : null;

  // Save the notification to the database
  const notification = await Notification.create({
    title,
    message,
    priority,
    createdBy: req.user.id, // Save who created it
    expiresAt,
  });

  // Emit real-time event to all connected clients
  req.io.emit("newNotification", notification);

  // If high priority, queue emails for all offline users
  if (priority === "High") {
    const offlineUsers = await User.find({ isOnline: false });

    // Prepare pending emails to be processed by a cron job
    const pendingEmails = offlineUsers.map((user) => ({
      to: user.email,
      subject: "Urgent: You Missed a High Priority Notification",
      html: generateEmailHTML(notification), // generate HTML in a helper
    }));

    await PendingEmail.insertMany(pendingEmails); // Bulk insert
  }

  // Redirect back to dashboard after notification is created
  res.redirect("/dashboard");
};
