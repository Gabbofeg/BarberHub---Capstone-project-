const mongoose = require("mongoose");

const availabilitySchema = new mongoose.Schema({
  date: { type: String, required: true },
  time: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Availability", availabilitySchema);