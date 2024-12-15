const mongoose = require('mongoose')


const RatingSchema = new mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'userModel'
    },
    rating: {
        type: Number,
        value: [0, 1, 2, 3, 4, 5],
        required: true
    },
    comment: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('RatingModel', RatingSchema, 'ratings')