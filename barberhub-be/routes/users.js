const express = require('express');
const users = express.Router();
const userModel = require ("../models/userModel");
const bcrypt = require('bcrypt')
const isAuthored = require('../middleware/isAuthored')
const logger = require('../middleware/logger');
const { validateUserBody } = require('../middleware/validateUser')



users.get('/users' , async ( req, res ) => {
    const { page, pageSize = 10 } = req.query
    try {
        const users = await userModel.find()
            .limit(pageSize)
            .skip((page - 1) * pageSize )
            .sort({ userName: - 1 }) 

        const totalUsers = await userModel.countDocuments();
        const totalPages= Math.ceil( totalUsers / pageSize )

        if (users.length === 0) {
            return res.status(404).send({
                statusCode: 404,
                message: "No users found"
            })
        }
        res.status(200).send({
            statusCode: 200,
            count: totalUsers,
            totalPages,
            users
        })
    } catch (e)  {
        res.status(500).send({
            statusCode: 500,
            message: "Something went wrong",
        });
    }
});



users.get('/users/:userId', async ( req, res ) => {
    const { userId } = req.params
    try { 
        const user = await userModel.findById(userId)

        if (!user) {
            return res
                .status(404)
                .send({
                    statusCode: 404,
                    message: `No book found with the given ID: ${ userId }`,
                })
        }
        
        res
            .status(200)
            .send(user)
    } catch (e) {
        res
            .status(500)
            .send({
                message: e.message
            })
    }
});



users.post('/users/create', async ( req, res ) => {

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(req.body.password, salt)

    const newUser = new userModel({
        ...req.body,
        password: hashedPassword
    });
    try {
        const userToSave = await newUser.save();
        res.status(201).send({
            statusCode: 201,
            message: "User created successfully",
            userToSave
        })
    } catch (e) {
        next(e)
    }
});


users.put('/users/update/:userId', async ( req, res ) => {
    const { userId } = req.params
    try{
        const updatedUser = req.body
        const userToUpdate = userModel.findByIdAndUpdate(
            userId,
            updatedUser,
            { new: true }
        )
        res.status(200).send({
            statusCode: 200,
            message: `User with ID ${userId} updated successfully`,
            userToUpdate
        })
    } catch (e) {
        res.status(500).send({
            statusCode: 500,
            message: "Something went wrong",
          })
    }
    
});



users.delete('/users/delete/:userId', [ logger ] , async ( req, res ) => {
    const { userId } = req.params
    try {
        const user = userModel.findByIdAndDelete( userId )
        res.status(200).send({
            statusCode: 200,
            message: `User with ID ${userId} deleted successfully`,
          });
    } catch (e) {
        res.status(500).send({
            statusCode: 500,
            message: "Something went wrong",
          });
    }
})



module.exports = users;