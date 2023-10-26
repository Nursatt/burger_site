const express = require('express');
const Basket = require("../controllers/api-basket-controller.js");
const authMiddleware = require("../middleware/authMiddleware.js")

const router = express.Router();

router.get('/api/basket', authMiddleware, Basket.getAllBasket);
router.get('/api/basket/:id_of_item', authMiddleware, Basket.getById);
router.delete('/api/basket/:id_of_item', authMiddleware, Basket.remove);
router.patch('/api/basket/:id_of_item', authMiddleware, Basket.update);
router.patch('/api/basket', authMiddleware, Basket.validateOrder);


module.exports = router;