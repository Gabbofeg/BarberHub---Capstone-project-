const mongoose = require('mongoose')


const productSchema = new mongoose.Schema({
    imgSrc: {
        type: String,
        required: true
    }, 
    name: {
        type: String, 
        required: true
    },
    brand: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: false,
    },
    btnText: {
        type: Number,
        required: true,
    }
}, {timestamps: true, strict: true});


module.exports = mongoose.model('productModel', productSchema, 'products')