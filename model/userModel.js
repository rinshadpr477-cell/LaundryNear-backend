const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    profile: {
        type: String,
        default: ""
    },
    role: {
        type: String,
        default: "customer",
        enum: ["customer", "shop", "admin", "delivery"]
    }
}, {
    timestamps: true
})

const users = mongoose.model("users", userSchema)

module.exports = users