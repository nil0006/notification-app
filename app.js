const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const path = require('path');
const http = require('http');
const { Server } = require('socket.io');
const connectDB = require('./config/db');

dotenv.config();

// Initialize Express and HTTP server
const app = express();
const server = http.createServer(app); // ✅ wrap express with HTTP server

// Setup Socket.IO
const io = new Server(server);

// Middleware to inject `io` into `req`
app.use((req, res, next) => {
  req.io = io;
  next();
});

// 🔌 Connect to MongoDB
connectDB();

// ========== Middleware ==========
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ========== EJS & Static ==========
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

// ========== Routes ==========
const authRoutes = require('./routes/authRoutes');
const notificationRoutes = require('./routes/notificationRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');

app.use('/', authRoutes);
app.use('/notifications', notificationRoutes);
app.use('/', dashboardRoutes);


// ========== Socket.IO Logic ==========
io.on('connection', (socket) => {
  console.log('🔌 A user connected:', socket.id);

  socket.on('disconnect', () => {
    console.log('❌ A user disconnected:', socket.id);
  });
});

// ========== Start Server ==========
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));
