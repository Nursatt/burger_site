const express = require('express');
const Auth = require("../controllers/auth-controller.js");

const router = express.Router();

router.get('/auth', Auth.getAuth);
router.get('/auth/login', Auth.getReg);
router.get('/auth/registration', Auth.getLog);

module.exports = router;