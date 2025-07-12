const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const path = require('path');
const http = require('http');
const { Server } = require('socket.io');
const connectDB = require('./config/db');
const User = require('./models/User');
const cron = require("node-cron");
const { runEmailJob } = require("./jobs/emailProcessor");
dotenv.config();

// Initialize Express and HTTP server
const app = express();
const server = http.createServer(app); // ✅ wrap express with HTTP server

// Setup Socket.IO
const io = new Server(server);

app.use((req, res, next) => {
  req.io = io;
  next();
});

// Connect to MongoDB from db.js in config
connectDB();

// Middleware 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// View Engine & Static Files Setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

// Routes
const authRoutes = require('./routes/authRoutes');
const notificationRoutes = require('./routes/notificationRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');


app.use('/', authRoutes);
app.use('/notifications', notificationRoutes);
app.use('/', dashboardRoutes);


// Setup Socket.IO for Real-Time Notifications
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  // Client must send user ID right after connecting from dashboard or send email page 
  socket.on('user-online', async (userData) => {

    try {
      // Store userId on socket for later use
      socket.userId = userData.id;

      // Update DB if user is online for email 
     const user = await User.findByIdAndUpdate(userData.id, { isOnline: true });
      console.log(`User ${user.name || user.email} is now online`);
    } catch (err) {
      console.error('Failed to set user online:', err.message);
    }
  });
// Step 2: Disconnect → mark user offline in DB
  socket.on('disconnect', async () => {
    if (!socket.userId) return;

    try {
      const user = await User.findByIdAndUpdate(socket.userId, { isOnline: false });
      console.log(`User ${user.name} is now offline`);
    } catch (err) {
      console.error('Failed to set user offline:', err.message);
    }
  });
});

// Scheduled Job: Process Pending Emails Every Minute 
// This cron job runs once every minute (* * * * *)
// It calls the runEmailJob() function to send pending emails from the queue
cron.schedule("* * * * *", () => {
  console.log("Running email job...");
  runEmailJob();
});
// Start Server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
