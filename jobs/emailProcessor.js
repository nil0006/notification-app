const dotenv = require("dotenv");
dotenv.config();

const sendEmail = require("../utility/mail");
const PendingEmail = require("../models/pendingEmails");

// Processes a batch of unsent emails and marks them as sent
exports.runEmailJob = async () => {
  // Fetch up to 10 unsent emails to process in this batch
  const unsentEmails = await PendingEmail.find({ sent: false }).limit(10);

  for (const email of unsentEmails) {
    try {
      // Attempt to send the email using the sendEmail utility
      await sendEmail({
        to: email.to,
        subject: email.subject,
        html: email.html,
      });

      // Mark email as sent and set sentAt for TTL auto-deletion
      await PendingEmail.findByIdAndUpdate(email._id, {
        sent: true,
        sentAt: new Date(), // TTL countdown starts here
      });

      console.log(`Email sent to ${email.to}`);
    } catch (err) {
      // If sending fails, log the error in the document
      email.error = err.message;
      await email.save();
      console.error(`Failed to send email to ${email.to}:`, err.message);
    }

    // Slight delay between emails to avoid overwhelming SMTP server
    await new Promise((r) => setTimeout(r, 200));
  }
};
