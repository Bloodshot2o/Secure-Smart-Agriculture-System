const express = require('express');
const { register, login } = require('../controllers/authController');
const router = express.Router();

// @route   POST /api/auth/register
// @desc    Register a new user with optional role
router.post('/register', register);

// @route   POST /api/auth/login
// @desc    Login and receive JWT token
router.post('/login', login);

module.exports = router;
