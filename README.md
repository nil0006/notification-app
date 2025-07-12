# 📬 Notification App

A slick, real-time, role-based notification dashboard built with **Node.js**, **Express**, **MongoDB**, and **EJS** — styled using **Tailwind CSS** and **DaisyUI**. Designed for teams that need quick alerts and clean UX. 🧠💥

---

## 🔗 Live Demo

🌐 Hosted on [Render](https://notification-app-khbv.onrender.com)

---

## ✨ Features

* 👥 **Role-based Access**

  * `Manager`: Can send notifications.
  * `User`: Can view notifications.

* 🔔 **Real-time Notifications**
  Uses **Socket.IO** to push updates to online users instantly.

* 📩 **Offline Email Alerts**
  If a user is offline and the notification is marked as **High Priority**, they'll get an **automated email**.

* 🔡️ **Secure Auth**
  Authenticated using **JWT** with 2-hour expiration stored in **HTTP-only cookies**.

* 🧠 **Cron-Driven Email Job**
  Queued emails are sent via a background job every minute with automatic TTL cleanup.

* 💅 **Clean UI**
  Built with Tailwind CSS + DaisyUI for that modern, responsive, and polished dashboard look.

---

## 🧰 Tech Stack

| Technology    | Usage                            |
| ------------- | -------------------------------- |
| Node.js       | Backend runtime                  |
| Express.js    | Web framework                    |
| MongoDB       | Database                         |
| Mongoose      | MongoDB ODM                      |
| EJS           | Templating engine                |
| Tailwind CSS  | Utility-first CSS styling        |
| DaisyUI       | UI components on top of Tailwind |
| Socket.IO     | Real-time communication          |
| JWT + Cookies | Auth sessions                    |
| Nodemailer    | Email delivery                   |
| node-cron     | Background job for email queue   |

---

## 🚀 Getting Started

```bash
git clone https://github.com/nil0006/notification-app.git
cd notification-app
npm install
```

### 🔐 Setup Environment

Create a `.env` file in the root directory:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_app_password
```

---

## 🔁 Project Structure

```bash
notification-app/
├── controllers/         # Route logic
├── jobs/                # Cron jobs (e.g., send email)
├── middleware/          # Auth middleware
├── models/              # Mongoose schemas
├── public/              # Static assets (CSS, JS)
├── utility/             # Auth/email helper functions
├── views/               # EJS templates
├── routes/              # Route files
├── .env                 # Environment variables
├── app.js               # Main app entry
├── package.json         # NPM metadata
```

---

## 📅 Cron Job

Emails are not sent immediately. Instead, high-priority notifications for offline users are:

1. Stored in a `pendingemails` collection
2. Picked up by a cron job every minute
3. Sent using **Nodemailer**, then marked as sent
4. Automatically deleted after 1 hour using TTL

---

## 🚩 Security Notes

* Cookies are set to expire in 2 hours
* Routes are protected using middleware to enforce auth and role-based access

---

## 👋 Author

Made by [Niladri Karmakar](https://github.com/nil0006) 

---

> “Thanks for the opportunity — I enjoyed building this from the ground up.”
