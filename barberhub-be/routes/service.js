const express = require("express");
const serviceModel = require("../models/serviceModel");
const service = express.Router();
const { default: mongoose } = require("mongoose");

service.get("/", async (req, res) => {
  const { serviceInfo } = req.body;
  try {
    const services = await serviceModel.find();
    if (services.length === 0) {
      return res.status(404).send({
        message: "Products not found",
        statusCode: 404,
      });
    }
    res.status(200).send({
      statusCode: 200,
      services
    });
    console.log(services)
  } catch (e) {
    res.status(500).send({
        message: e.message,
      });
  }
});


module.exports = service