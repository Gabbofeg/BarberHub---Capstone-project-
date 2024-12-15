const express = require("express");
const Availability = require("../models/availabilityModel");
const availability = express.Router();


availability.get("/", async (req, res) => {
  try {
    const availability = await Availability.find();
    res.json(availability);
  } catch (err) {
    res.status(500).send("Errore nel recupero delle disponibilità");
  }
});


availability.get("/:date", async (req, res) => {
  const { date } = req.params;
  try {
    const availability = await Availability.find({ "date": date });
    res.json(availability);
  } catch (err) {
    res.status(500).send("Errore nel recupero degli orari");
  }
});

availability.post("/book", async (req, res) => {
  const { date, time } = req.body;
  if (!date || !time) {
    console.error("Dati mancanti:", req.body)
    return res.status(400).send("Dati mancanti o non validi");
  }

  try {
    const result = await Availability.updateOne(
      { date, [`time.${time}`]: { $gt: 0 } },
      { $inc: { [`time.${time}`]: -1 } }
    );

    if (result.modifiedCount === 0) {
      return res.status(400).send("Orario non disponibile");
    }

    res.status(200).json({ message: "Prenotazione effettuata" });
  } catch (err) {
    res.status(500).send("Errore nella prenotazione");
  }
});

module.exports = availability;