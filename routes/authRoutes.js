const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const redirectIfAuth = require('../middleware/redirectIfAuth');

// Redirect to dashboard or login based on auth status
router.get('/',redirectIfAuth);

// Show signup page (only if not already logged in)
router.get('/signup',redirectIfAuth , authController.getSignup);

// Show login page (only if not already logged in)
router.get('/login',redirectIfAuth , authController.getLogin);

// Auth Form Handlers 
// Handle user signup
router.post('/signup', authController.postSignup);

// Handle user login
router.post('/login', authController.postLogin);

// Logout 
// Clear session and redirect to login
router.get('/logout', authController.logout);

module.exports = router;
