const createPath = require("../static_functions/create-path.js");

module.exports.getAuth = (req, res) => {
    try {
        const title = 'Authorization';
        res.render(createPath('auth'), { title });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Внутренняя ошибка сервера" });
    }
};

module.exports.getReg = (req, res) => {
    try {
        const title = 'Registration';
        res.render(createPath('log'), { title });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Внутренняя ошибка сервера" });
    }
};

module.exports.getLog = (req, res) => {
    try {
        const title = 'Authorization';
        res.render(createPath('reg'), { title });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Внутренняя ошибка сервера" });
    }
};