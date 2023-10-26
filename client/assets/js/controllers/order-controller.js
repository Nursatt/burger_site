const createPath = require("../static_functions/create-path.js");

module.exports.getOrders = (req, res) => {
    try {
        const title = 'Order';
        res.render(createPath('order'));
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Внутренняя ошибка сервера" });
    }
};