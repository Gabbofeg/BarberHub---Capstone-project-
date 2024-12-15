const express = require("express");
const ratingModel = require("../models/ratingModel");
const ratings = express.Router();
const userModel = require('../models/userModel')
const { default: mongoose } = require("mongoose");

ratings.get("/", async (req, res) => {
  try {
    const rating = await ratingModel.find().populate('author');
    if (rating.length <= 0)
      return res.status(404).send({
        message: "Rating not found",
        statusCode: 404,
      });
    res.status(200).send({
      statusCode: 200,
      rating,
    });

  } catch (e) {
    res.status(500).send({
      message: e.message,
    });
  }

});

ratings.post('/create', async (req , res) => {
    const user = await userModel.findOne({_id: req.body.author})
    const newRating = new ratingModel({
        author: user._id,
        rating: req.body.rating,
        comment: req.body.comment
    });
    try {
        const ratingToSave = await newRating.save();
        res.status(200).send({
            statusCode: 200,
            message: 'Valutazione inviata con successo!',
            ratingToSave
        })
    } catch (e) {
        res.status(500).send({
            message: e.message,
          });
    }
});

ratings.put('/update/:ratingId', async ( req, res ) => {
    const {ratingId} = req.params
    try {
        const updatedRating = req.body
        const ratingToUpdate = await ratingModel.findByIdAndUpdate(
            ratingId,
            updatedRating,
            { new: true }
        );
        res.status(200).send({
            statusCode: 200,
            message: `Rating with ID ${ratingId} updated successfully`,
            ratingToUpdate,
          });
    } catch (e) {
        res.status(500).send({
            statusCode: 500,
            message: "Something went wrong",
          });
    }
});

ratings.delete('/delete/:ratingId', async ( req, res ) => {
    const {ratingId} = req.params
    try {
        const ratingToDelete = await ratingModel.findByIdAndDelete(ratingId)
        res.status(200).send({
            statusCode: 200,
            message:`Rating with ID ${ratingId} deleted successfully!`
        })
    } catch (e) {
        res.status(500).send({
            message: e.message
        })
    }
});


module.exports = ratings