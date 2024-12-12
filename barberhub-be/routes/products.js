const express = require("express");
const products = express.Router();
const productModel = require("../models/productModel");
const logger = require("../middleware/logger");
const { default: mongoose } = require("mongoose");

products.get("/", [logger] , async (req, res) => {
  const { page, pageSize = 10 } = req.query;
  try {
    const products = await productModel
      .find()
      .limit(pageSize)
      .skip((page - 1) * pageSize)
      .sort({ name: -1 });

    const totalProducts = await productModel.countDocuments();
    const totalPages = Math.ceil(totalProducts / pageSize);

    if (products.length === 0) {
      return res.status(404).send({
        message: "Products not found",
        statusCode: 404,
      });
    }

    res.status(200).send({
      statusCode: 200,
      count: totalProducts,
      totalPages,
      products,
    });
  } catch (e) {
    res.status(500).send({
      message: e.message,
    });
  }
});

products.get("/:productId", [logger] , async (req, res) => {
  const { productId } = req.params;
  try {
    const product = await productModel.findById(productId);

    if (!product) {
      return res.status(404).send({
        statusCode: 404,
        message: `No product found with the given ID: ${productId}`,
      });
    }
    res.status(200).send(product);
  } catch (e) {
    res.status(500).send({
      message: e.message,
    });
  }
});

products.post("/create", [logger] , async (req, res) => {
  const newProduct = new productModel(req.body);
  try {
    const productToSave = await newProduct.save();
    res.status(201).send({
      statusCode: 201,
      message: "Product created successfully",
      productToSave,
    });
  } catch (e) {
    res.status(500).send({
      message: e.message,
    });
  }
});

products.put("/update/:productId", [logger] , async (req, res) => {
  const { productId } = req.params;
  try {
    const updatedProduct = req.body;
    const productToUpdate = await productModel.findByIdAndUpdate(
      productId,
      updatedProduct,
      { new: true }
    );
    res.status(200).send({
      statusCode: 200,
      message: `Product with ID ${productId} updated successfully`,
      productToUpdate,
    });
  } catch (e) {
    res.status(500).send({
      statusCode: 500,
      message: "Something went wrong",
    });
  }
});

products.delete("/delete/:productId", [logger] , async ( req, res ) => {
    const { productId } = req.params;
    try {
        const product = await productModel.findByIdAndDelete( productId )
        res.status(200).send({
            statusCode: 200,
            message: `Product with ID ${ productId } deleted successfully`,
          });
    } catch (e) {
        res.status(500).send({
            statusCode: 500,
            message: "Something went wrong",
          });
    }
});

module.exports = products;
