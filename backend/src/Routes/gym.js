const express = require('express');
const Auth = require('../Auth/Auth')
const Controller = require("../Controllers/gym")
const router = express.Router();


router.post('/register',Controller.register);
router.post('/login',Controller.login);
router.post('/forgot-password', Controller.sendResetLink);
router.post('/verify-otp', Controller.checkOTP);
router.post('/reset-password', Controller.resetPassword);
router.post('/logout',Controller.logout)

module.exports = router;