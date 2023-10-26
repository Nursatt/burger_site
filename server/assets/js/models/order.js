const mongoose = require("mongoose")
const Schema = mongoose.Schema

const order = new Schema({
    items: [
        {
            item: {
                ref: "items",
                type: Schema.Types.ObjectId
            },
            count: {
                type: Number,
                require: true,
                min: 0
            }
        },
    ],
    user: {
        ref: "user",
        type: Schema.Types.ObjectId
    }
}, { timestamps: true })

const add_order = mongoose.model("orders", order)

module.exports = add_order