const express = require("express")
const Store = require("../controllers/api-store-controller.js")
const authMiddleware = require("../middleware/authMiddleware.js");

const router = express.Router();

router.get('/api/store', Store.getStore);
router.get('/api/store/:id', authMiddleware, Store.getById);
router.post('/api/store', authMiddleware, Store.create);

module.exports = router;