const mongoose = require('mongoose')

const cartItemSchema = mongoose.Schema({
    title: String,
    description: String,
    images: String,
    price: Number,
    colors: {
        type: String,
        required: true
    },
    size: {
        type: String,
        required: true
    },
    quantity: Number
})

module.exports = cartItemSchema;