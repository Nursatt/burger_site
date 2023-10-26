const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const User = require("../models/user.js")
const keys = require("../middleware/keys.js")
const { validationResult } = require("express-validator")
class ApiRegController {
    async registration(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ message: "Ошибка при регистрации", errors});
            }

            const { name, email, password } = req.body;

            const existingUser = await User.findOne({ email: email });
            if (existingUser) {
                return res.status(403).json({ message: 'Пользователь уже существует' });
            }

            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            const add_user = await new User({
                name: name,
                email: email,
                password: hashedPassword,
            });

            await add_user.save();
            res.status(201).json({ message: 'Регистрация прошла успешно', user: add_user });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Внутренняя ошибка сервера" });
        }
    }
    async login(req, res) {
        try {
            console.log(req.body)
            const { email, password } = req.body

            const user = await User.findOne({ email: email });
            if (!user) {
                return res.status(401).json({ message: 'Пользователь с таким email не найден' });
            }

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(401).json({ message: 'Неверный пароль' });
            }

            const token_user = jwt.sign({
                email: user.email,
                userId: user._id,
            }, keys.jwt, { expiresIn: "1h" });

            const token = `Bearer ${token_user}`

            res.status(200).json({ message: 'Авторизация прошла успешно', token: token });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Внутренняя ошибка сервера" });
        }
    }
}

module.exports = new ApiRegController()