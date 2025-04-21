const express = require('express');
const Controller = require("../Controllers/gym");
const router = express.Router();

// Auth routes
router.post('/register', Controller.register);
router.post('/login', Controller.login);
router.post('/logout', Controller.logout);

// Password Reset Flow
router.post('/forgot-password', Controller.sendResetLink); // Step 1: Send reset link
router.post('/verify-otp', Controller.checkOTP);           // Step 2: Verify OTP
router.post('/reset-password', Controller.resetPassword);  // Step 3: Set new password

module.exports = router;
