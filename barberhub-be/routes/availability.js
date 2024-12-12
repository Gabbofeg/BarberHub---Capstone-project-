const express = require("express");
const AvailabilityModel = require("../models/availabilityModel");
const availability = express.Router();

availability.get("/", async (req, res) => {
  try {
    const availability = await AvailabilityModel.find();
    res.json(availability);
  } catch (err) {
    res.status(500).send("Errore nel recupero delle disponibilità");
  }
});

availability.post("/book/create", async (req, res) => {
  const { date, time } = req.body;
  try {
    const availability = await AvailabilityModel.findOne({ date });
    if (availability && availability.timeslots.get(time) > 0) {
      availability.timeslots.set(time, availability.timeslots.get(time) - 1);
      await availability.save();
      res.json({ message: "Prenotazione effettuata" });
    } else {
      res.status(400).send("Orario non disponibile");
    }
  } catch (err) {
    res.status(500).send("Errore nella prenotazione");
  }
});

availability.delete("/delete/:id", async (req, res) => {
  const { availabilityId } = req.params;
  try {
    const availability = await AvailabilityModel.findByIdAndDelete(productId);
    res.status(200).send({
      statusCode: 200,
      message: `Reservation with ID ${availabilityId} deleted successfully`,
    });
  } catch (e) {
    res.status(500).send({
      statusCode: 500,
      message: "Something went wrong",
    });
  }
});

module.exports = availability;
