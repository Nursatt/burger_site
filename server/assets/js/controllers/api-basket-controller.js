const User = require("../models/user.js")
const Order = require("../models/order.js")

module.exports.getAllBasket = async (req, res) => {
    try {
        //console.log(req.user.userId);
        const order_items = await Order.findOne({ user: req.user.userId });
        console.log(order_items.items)
        if (!order_items) {
            res.status().json({ message: "Order empty" })
        }
        return res.json({ order_items: order_items.items })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Внутренняя ошибка сервера" });
    }
};

module.exports.getById = async (req, res) => {
    try {
        const get_order_by_id = await Order.findOne({ _id: req.params.id_of_item })
        return res.json({ get_order_by_id })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Внутренняя ошибка сервера" });
    }
};

module.exports.remove = async (req, res) => {
    try {
        console.log(req.params.id_of_item)
        const item_id = req.params.id_of_item
        const order = await Order.findOne({ user: req.user.userId })
        console.log(order)
        if (!order) {
            return res.status(404).json({ message: "Order empty" })
        } else {
            const updateOrder = await Order.findOne({
                items: { $elemMatch: { item: item_id } },
                user: req.user.userId
            })
            if (!updateOrder) {
                return res.status(404).json({ message: "Item not found on order" })
            } else {
                const itemIndex = updateOrder.items.findIndex(
                    (item) => item.item.toString() === item_id
                )
                if (itemIndex === -1) {
                    return res.status(404).json({ message: "Item not found on order" });
                } else {
                    if (updateOrder.items[itemIndex].count > 1) {
                        updateOrder.items[itemIndex].count--;
                        await updateOrder.save()
                    } else {
                        await Order.findOneAndUpdate(
                            { user: req.user.userId },
                            { $pull: { items: { item: item_id } } },
                            { new: true }
                        )
                    }
                }
            }
        }
        return res.json({ message: `Items with id: ${item_id} deleted` , id_of_game: item_id })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Внутренняя ошибка сервера" });
    }
};

module.exports.update = async (req, res) => {
    try {
        console.log(req.params.id_of_item)
        const item_id = req.params.id_of_item
        const order = await Order.findOne({ user: req.user.userId })
        console.log(order)
        if (!order) {
            return res.status(404).json({ message: "Order empty" })
        } else {
            const updateOrder = await Order.findOne({
                items: { $elemMatch: { item: item_id } },
                user: req.user.userId
            })
            if (!updateOrder) {
                return res.status(404).json({ message: "Item not found on order" })
            } else {
                await Order.findOneAndUpdate(
                    {
                        items: { $elemMatch: { item: item_id } },
                        user: req.user.userId
                    },
                    { $inc: { 'items.$.count': 1 } },
                    { new: true })
            }
        }
        return res.json({ message: `Items with id: ${item_id} deleted` , id_of_game: item_id })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Внутренняя ошибка сервера" });
    }
};

module.exports.validateOrder = async (req, res) => {
    try {
        console.log(req.user.userId);
        const order = await Order.findOne({ user: req.user.userId });
        console.log(order)
        if (!order || order.items.length === 0) {
            return res.status(404).json({ message: "Order empty" })
        }

        await Order.findOneAndDelete({ user: req.user.userId })

        return res.status(200).json({ message: "Order confirmed" })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Внутренняя ошибка сервера" });
    }
};



/*
if (updateOrder.count > 1) {
                    await Order.findOneAndUpdate({
                            items: { $elemMatch: { item: item_id } },
                            user: req.user.userId
                        },
                        { $set: { "items.$.count": updateOrder.count - 1 } },
                        { new: true })
                } else {
                    await Order.findOneAndUpdate(
                        { user: req.user.userId },
                        { $pull: { items: { item: item_id } } },
                        { new: true })
                }
 */