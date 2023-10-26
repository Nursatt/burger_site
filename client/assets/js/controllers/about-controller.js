const createPath = require("../static_functions/create-path.js");

module.exports.getAbout = (req, res) => {
    try {
        const title = 'Order';
        res.render(createPath('about'));
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Внутренняя ошибка сервера" });
    }
};