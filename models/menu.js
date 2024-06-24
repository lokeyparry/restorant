const mongoose = require('mongoose')
const menuItemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    taste: {
        type: String,
        enum: ['sweet', 'spicy', 'sour'],
        required: true
    },
    is_drink: {
        type: Boolean,
        default: false
    },
    ingredient: {
        type: [String],
        default: []
    },
    num_salse: {
        type: Number,
        required: true
    },
})

const MenuItem = mongoose.model("MenuItems", menuItemSchema)
module.exports = MenuItem