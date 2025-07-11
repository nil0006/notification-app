const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notificationController');
const { requireAuth, isManager } = require('../middleware/auth');


// Create notification
router.post('/create', requireAuth, isManager, notificationController.createNotification);


module.exports = router;
