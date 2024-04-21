const mongoose = require('mongoose')

const womenProductsSchema = mongoose.Schema({
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
    // styles: {
    //     type: Array
    // },
    // fabrics: {
    //     type: Array
    // }
})

module.exports = womenProductsSchema;