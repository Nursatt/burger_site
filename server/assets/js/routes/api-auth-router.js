const express = require("express")
const AuthController = require("../controllers/api-auth-controller.js")
const { body, check } = require("express-validator")
const router = express.Router();

// Add new user
router.post('/api/auth/registration', [
        body('name')
            .notEmpty().withMessage('The name cannot be empty')
            .isLength({ min: 1, max: 10 }).withMessage('Username must be less than 10'),
        body('email')
            .notEmpty().withMessage('The email cannot be empty')
            .isEmail().withMessage('Invalid email format'),
        body('password')
            .notEmpty().withMessage('The password cannot be empty')
            .isLength({ min: 1, max: 7 }).withMessage('Password must be at least 7 characters'),
    ],
    AuthController.registration);
// Get user by email
router.post('/api/auth/login', [
    check("email", "Email is invalid").notEmpty().isEmail(),
    check("password", "Password must be at least 8 characters").notEmpty().isLength({ min: 1, max: 7 }),
], AuthController.login);

module.exports = router;