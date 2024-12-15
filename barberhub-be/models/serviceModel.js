const mongoose = require('mongoose');


const serviceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    imgSrc: {
        type: String,
        required: false
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: false
    }

}, {timestamps: true, strict: true})



module.exports = mongoose.model('serviceModel', serviceSchema, 'services')