import React, { useState, useEffect } from "react";
import "../Booking/style.css";
import axios from "axios";

const BookingSystem = () => {
  const [availability, setAvailability] = useState({});

  useEffect(() => {
    axios
      .get("http://localhost:4040/availability")
      .then((response) => {
        console.log("Dati ricevuti:", response.data);
        const data = response.data.reduce((acc, item) => {
          acc[item.date] = item.timeslots;
          return acc;
        }, {});
        setAvailability(data);
        console.log("Stato aggiornato:", data);
      })
      .catch((err) => console.error("Errore nel caricamento:", err));
  }, []);

  const handleBooking = (day, time) => {
    axios
      .post("http://localhost:4040/availability/book", { date: day, time })
      .then(() => {
        setAvailability((prev) => ({
          ...prev,
          [day]: {
            ...prev[day],
            [time]: prev[day][time] - 1,
          },
        }));
      })
      .catch((err) => console.error("Errore nella prenotazione:", err));
  };

  const getButtonColor = (day, time) => {
    const slots = availability[day]?.[time];
    if (slots === 0) return "red";
    if (slots <= 2) return "yellow";
    return "green";
  };

  return (
    <div className="booking-container">
      <h1>Booking System</h1>
      {Object.keys(availability).length > 0 ? (
        Object.keys(availability).map((day) => (
          <div key={day} className="day-section">
            <h2>{day}</h2>
            <div className="time-slots">
              {Object.keys(availability[day] || {}).map((time) => (
                <button
                  key={time}
                  style={{ backgroundColor: getButtonColor(day, time) }}
                  className="time-slot"
                  onClick={() => handleBooking(day, time)}
                  disabled={availability[day][time] === 0}
                >
                  {time} ({availability[day][time]} posti)
                </button>
              ))}
            </div>
          </div>
        ))
      ) : (
        <p>Nessuna disponibilità trovata.</p>
      )}
    </div>
  );
};

export default BookingSystem;
