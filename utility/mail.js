const nodemailer = require("nodemailer");

// Configure the email transporter using your email service and credentials from the environment variables
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER, // Email address (from environment variables)
    pass: process.env.EMAIL_PASS, // App password or email password (from environment variables)
  }, 
});

//Sends an HTML email using the configured transporter
const sendEmail = async ({ to, subject, html }) => {
  try {
    const info = await transporter.sendMail({
      from: `"Samaaro Notification" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html,
    });

    console.log("Email sent:", info.messageId);
    return info;
  } catch (err) {
    console.error("Error sending email:", err);
    throw err;
  }
};

module.exports = sendEmail;
