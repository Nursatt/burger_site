const mongoose = require("mongoose")
const Schema = mongoose.Schema

const product = new Schema({
    name: {
        type: String,
        require: true,
        unique: true
    },
    price: {
        type: String,
        require: true
    },
    img: {
        type: String,
        require: true
    }
})

const add_product = mongoose.model("product", product)

module.exports = add_product