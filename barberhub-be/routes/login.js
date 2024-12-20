const express = require('express')
const login = express.Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const UserModel = require('../models/userModel')

login.post('/login', async (req, res, next) => {
    try {
        const user = await UserModel.findOne({ email: req.body.email })
        if (!user) {
            return res
                .status(404)
                .send({
                    statusCode: 404,
                    message: 'User not found with the given email'
                })
        }

        const isPasswordValid = await bcrypt.compare(req.body.password, user.password)
        if (!isPasswordValid) {
            return res
                .status(401)
                .send({
                    statusCode: 401,
                    message: 'Email or password not valid!'
                })
        }

        // logica di creazione JWT e invio dello stesso
        const token = jwt.sign({
            email: user.email,
            role: user.role,
            userName: user.userName,
            isActive: user.isActive,
            dob: user.dob,
            createdAt: user.createdAt
        }, process.env.JWT_SECRET, {
            expiresIn: '10m'
        })

        res
            .header('authorization', token)
            .status(200)
            .send({
                statusCode: 200,
                message: 'Login successfully',
                token
            })
    } catch (error) {
        next(error)
    }
})


module.exports = login