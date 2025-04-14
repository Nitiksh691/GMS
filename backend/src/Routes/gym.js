const express = require('express');
const Controller = require("../Controllers/gym")
const router = express.Router();


router.post('/register',Controller.register);
router.post('/login',Controller.login);
router.post('/forgot-password', Controller.sendResetLink);
router.post('/verify-otp', Controller.checkOTP);
router.post('/reset-password', Controller.resetPassword);


module.exports = router;