const express = require('express');

// Controller functions
const { loginUser, signupUser, getUserInfo } = require('../controllers/userController');

const router = express.Router();

// Login route
router.post('/login', loginUser);

// Sign up route
router.post('/signup', signupUser);

// User Info route
router.get('/:email', getUserInfo);

module.exports = router
