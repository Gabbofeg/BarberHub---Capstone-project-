const mongoose = require("mongoose");

const availabilitySchema = new mongoose.Schema({
  date: String,
  timeslots: {
    type: Map,
    of: Number, // Ogni fascia oraria ha un numero di posti disponibili
  },
});

const Availability = mongoose.model("Availability", availabilitySchema);

module.exports = Availability;