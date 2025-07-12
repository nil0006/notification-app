const express = require('express');
const router = express.Router();
const { requireAuth, isManager } = require('../middleware/auth');
const {
  getDashboard,
  getSendNotification
} = require('../controllers/dashboardController');

// Protected route: Dashboard view for authenticated users
router.get('/dashboard', requireAuth, getDashboard);

// Manager-only route: Notification sending page
router.get('/dashboard/send', requireAuth, isManager, getSendNotification);

module.exports = router;