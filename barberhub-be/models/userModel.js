const { Router } = require('express')
const mongoose = require('mongoose')


const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minLenght: 8,
    },
    userName: {
        type: String,
        required: true,
        unique: true
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
}, {timestamps: true, strict: true})
 
module.exports = mongoose.model('userModel', userSchema, 'users')
