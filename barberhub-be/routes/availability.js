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
    const availability = await Availability.findOne({ date });

    if (availability && availability.time.includes(time)) {
      return res.status(400).send("Orario già prenotato o non disponibile")
    }

    const result = await Availability.updateOne(
      { date },
      { $addToSet: { time: time } }
    );

    if (result.matchedCount === 0) {
      await Availability.updateOne(
        { date },
        { $set: { time: [time] } },
        {upsert: true}
      )
    }

    res.status(200).json({ message: `Orario ${time} aggiunto con successo` });
  } catch (err) {
    console.error("Errore nella prenotazione:", err);
    res.status(500).send("Errore nella prenotazione");
  }
});

module.exports = availability;