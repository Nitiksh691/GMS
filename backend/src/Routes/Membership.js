const express = require('express');
const router = express.Router();
const Auth = require('../Auth/Auth');
const MembershipController = require('../Controllers/Membership');


router.post('/add-membership', Auth, MembershipController.AddMembership);
router.get('/getmembership', Auth, MembershipController.getmembership);

module.exports = router;