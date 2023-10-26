const express = require('express');
const About = require("../controllers/about-controller.js");

const router = express.Router();

router.get('/about', About.getAbout);

module.exports = router;