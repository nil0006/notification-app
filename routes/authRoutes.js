const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const redirectIfAuth = require('../middleware/redirectIfAuth');

//Default route
router.get('/', authController.homeRedirect);

// View pages
router.get('/signup',redirectIfAuth , authController.getSignup);
router.get('/login',redirectIfAuth , authController.getLogin);

// Handle forms
router.post('/signup', authController.postSignup);
router.post('/login', authController.postLogin);

// Logout
router.get('/logout', authController.logout);

module.exports = router;
