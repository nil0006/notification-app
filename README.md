# Notification App

A robust, real-time, role-based notification dashboard built with **Node.js**, **Express**, **MongoDB**, and **EJS**, styled using **Tailwind CSS** and **DaisyUI**. Designed for teams that need quick alerts and a clean, responsive UI.

---

## Live Demo

[Live Application (Hosted on Render)](https://notification-app-khbv.onrender.com)

> **Note:** The app is hosted on Render’s free tier. If you encounter a “502 Bad Gateway” error, it’s likely due to server inactivity. Please wait a few seconds and refresh the page — the server will resume automatically.

---

## Features

- **Role-Based Access Control**
  - **Manager:** Authorized to send notifications
  - **User:** Receives and views notifications

- **Real-Time Notifications**
  - Uses **Socket.IO** to instantly deliver updates to online users

- **Offline Email Alerts**
  - Sends email alerts to offline users when a high-priority notification is generated

- **Secure Authentication**
  - JWT-based authentication using HTTP-only cookies with 2-hour expiration

- **Background Email Scheduler**
  - Cron job sends pending emails every minute and automatically cleans up using TTL

- **Modern UI**
  - Built with Tailwind CSS and DaisyUI for a responsive and intuitive user interface

---

## Tech Stack

| Technology    | Purpose                            |
| ------------- | ---------------------------------- |
| Node.js       | Backend runtime                    |
| Express.js    | Web framework                      |
| MongoDB       | NoSQL database                     |
| Mongoose      | MongoDB ODM                        |
| EJS           | Server-side templating             |
| Tailwind CSS  | CSS utility framework              |
| DaisyUI       | UI component library               |
| Socket.IO     | Real-time communication            |
| JWT + Cookies | Authentication                     |
| Nodemailer    | Email service                      |
| node-cron     | Scheduled tasks                    |

---

## Getting Started

Clone the repository and install dependencies:

```bash
git clone https://github.com/nil0006/notification-app.git
cd notification-app
npm install
```

---

### Environment Setup

Create a `.env` file in the root directory with the following variables:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_app_password
```

---

## Project Structure

```
notification-app/
├── controllers/         # Route logic
├── jobs/                # Cron jobs (e.g., send email)
├── middleware/          # Authentication middleware
├── models/              # Mongoose schemas
├── public/              # Static assets
├── utility/             # Helper functions
├── views/               # EJS templates
├── routes/              # Route definitions
├── .env                 # Environment variables
├── app.js               # Application entry point
├── package.json         # Project metadata
```

---

## Email Notification Workflow

High-priority notifications follow this flow:

1. Stored in a `pendingemails` collection if the recipient is offline
2. A cron job checks for unsent emails every minute
3. Emails are sent using **Nodemailer**
4. Sent emails are removed from the collection automatically after 1 hour via MongoDB TTL

---

## Unit Testing

Manual unit test cases are documented here:  
[Unit Test Plan - Google Sheets](https://docs.google.com/spreadsheets/d/1iKVQOHg_sXrotyV3-Arxw8yY5wVC3h_oMInKf0eS8W8/edit?usp=sharing)

Tests include:

- Authentication module
- Notification logic
- Email queue simulation
- Role-based route protection

---

## Security Notes

- JWT tokens expire after 2 hours
- Protected routes enforce authentication and role-based access using middleware

---

## Author

Developed by [Niladri Karmakar](https://github.com/nil0006)

- Email: [niladrikarmakar006@gmail.com](mailto:niladrikarmakar006@gmail.com)  
- Portfolio: [https://nilportfolio.netlify.app](https://nilportfolio.netlify.app)  
- LinkedIn: [https://www.linkedin.com/in/niladri-karmakar](https://www.linkedin.com/in/niladri-karmakar)

> Thank you for the opportunity to work on this project. It’s been a great experience building it end-to-end.