const express = require('express');
const Order = require("../controllers/order-controller.js");

const router = express.Router();

router.get('/order', Order.getOrders);

module.exports = router;