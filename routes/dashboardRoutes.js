const express = require('express');
const router = express.Router();
const { requireAuth, isManager } = require('../middleware/auth');
const {
  getDashboard,
  getSendNotification
} = require('../controllers/dashboardController');

router.get('/dashboard', requireAuth, getDashboard);
router.get('/dashboard/send', requireAuth, isManager, getSendNotification);

module.exports = router;