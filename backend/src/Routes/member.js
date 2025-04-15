const express = require('express');
const router = express.Router();
const memberController = require('../Controllers/member')
const Auth = require("../Auth/Auth")

router.get("/get-member",Auth,memberController.getAllMember)
router.post("/register-member",Auth,memberController.registerMember)
router.get('/searched-members',Auth,memberController.searchMember)
router.get('/monthly-members',Auth,memberController.monthlyMember)
router.get('/expiry-in-3-days-members',Auth,memberController.expiringWithin3Days)
router.get('/expiry-in-4-to-7-days-members', Auth, memberController.expiringWithin4To7Days);


module.exports = router;