const mongoose = require('mongoose')

const menProductsSchema = mongoose.Schema({
    title: String,
    description: String,
    images: {
        type: Array,
    },
    price: Number,
    size: {
        type: Array,
    },
    availability: String,
    colors: {
        type: Array,
    },
})

module.exports = menProductsSchema;