const mongoose = require("mongoose")
const Schema = mongoose.Schema

const user = new Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    }
}, { timestamps: true })

const add_user = mongoose.model("users", user)

module.exports = add_user