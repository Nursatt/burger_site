const Product = require("../models/product.js")
const Order = require("../models/order.js")

module.exports.getStore = async (req, res) => {
    try {
        const items = await Product.find()
        console.log(items)
        res.json({items})
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Внутренняя ошибка сервера" });
    }
};

module.exports.getById = async (req, res) => {
    try {
        const get_item_by_id = await Product.findById({ _id: req.params.id })
        console.log(get_item_by_id)
        return res.json({ get_item_by_id })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Внутренняя ошибка сервера" });
    }
};

module.exports.create = async (req, res) => {
    try {
        const id = req.body.id;

        const order = await Order.findOne({ user: req.user.userId })
        console.log(order)
        if (!order) {
            const newOrder = await new Order({
                    items: {
                        item: id,
                        count: 1
                    },
                    user: req.user.userId }).save()

            return res.json({ message: "You create order", order: newOrder })
        } else {
            const updateOrder = await Order.findOne({
                items: { $elemMatch: { item: id } },
                user: req.user.userId
            })
            if (updateOrder) {
                const newUpdateOrder = await Order.findOneAndUpdate(
                    {
                        items: { $elemMatch: { item: id } },
                        user: req.user.userId
                    },
                    { $inc: { "items.$.count": 1 } },
                    { new: true })

                return res.json({ message: "You update order", order: newUpdateOrder });
            } else {
                const newItem = {
                    item: id,
                    count: 1,
                };

                const addNewOrder = await Order.findOneAndUpdate(
                    { user: req.user.userId },
                    { $push: { items: newItem } },
                    { new: true }
                );

                return res.json({ message: "You add order", order: addNewOrder });
            }
        }
    } catch (error) {
        console.log(error);
    }
}