// Generates the HTML content for a high-priority notification email
exports.generateEmailHTML = (notification) => {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <style>
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      background-color: #f4f4f4;
      margin: 0;
      padding: 20px;
    }
    .container {
      max-width: 600px;
      margin: auto;
      background-color: #ffffff;
      padding: 30px;
      border-radius: 10px;
      box-shadow: 0 4px 10px rgba(0,0,0,0.05);
    }
    .title {
      font-size: 22px;
      font-weight: 600;
      color: #1f2937;
      margin-bottom: 10px;
    }
    .message {
      font-size: 16px;
      color: #374151;
      line-height: 1.6;
      margin-bottom: 20px;
    }
    .description {
      font-size: 14px;
      color: #6b7280;
      border-top: 1px solid #e5e7eb;
      padding-top: 15px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="title"><strong>Title:</strong> ${notification.title}</div>
    <div class="message"><strong>Message:</strong> ${notification.message}</div>
    <div class="description">
      You received this email because you were offline when this high priority notification was triggered.
    </div>
  </div>
</body>
</html>
`;
};
