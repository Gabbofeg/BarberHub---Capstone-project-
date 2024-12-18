import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import axios from "axios";
import "./style.css";

const BookingCreator = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [timeslots, setTimeSlots] = useState([
    "08:00",
    "08:30",
    "09:00",
    "09:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "12:00",
    "12:30",
    "14:30",
    "15:00",
    "15:30",
    "16:00",
    "16:30",
    "17:00",
    "17:30",
    "18:00",
    "18:30",
    "19:00",
    "19:30",
    "20:00",
  ]);
  const [allDates, setAllDates] = useState([]);
  const [bookedTimes, setBookedTimes] = useState(new Set());

  useEffect(() => {
    axios
      .get("http://localhost:4040/availability")
      .then((response) => {
        const dates = response.data.map((item) => item.date);
        setAllDates(dates);
      })
      .catch((err) => console.error("Errore nel caricamento delle date:", err));
  }, []);

  useEffect(() => {
    if (selectedDate) {
      axios
        .get(`http://localhost:4040/availability/${selectedDate}`)
        .then((response) => {
          if (response.data.length > 0) {
            const timesForSelectedDate = response.data[0].time || [];
            const bookedTimesFromServer = new Set(timesForSelectedDate);

            setBookedTimes(bookedTimesFromServer);
            setTimeSlots(
              timeslots.filter((time) => !bookedTimesFromServer.has(time))
            );
          } else {
            setBookedTimes(new Set());
            setTimeSlots(timeslots);
          }
        })
        .catch((err) =>
          console.error("Errore nel caricamento degli orari:", err)
        );
    }
  }, [selectedDate]);

  const handleBooking = (time) => {
    axios
      .post("http://localhost:4040/availability/book", {
        date: selectedDate,
        time: time,
      })
      .then(() => {
        alert("Prenotazione effettuata con successo!");

        setBookedTimes((prev) => new Set([...prev, time]));
        setTimeSlots((prev) => prev.filter((slot) => slot !== time));
      })
      .catch((err) => console.error("Errore nella prenotazione:", err));
  };
  const isDateAndTimeAvailable = (date, time) => {
    const formattedDate = date.toISOString().split("T")[0];
    return allDates.some(
      (item) => item.date === formattedDate && item.time === time
    );
  };
  return (
    <div className="booking-container">
      <h1>Crea una Prenotazione</h1>
      <div className="booking-creator">
        <Calendar
          onChange={(date) => {
            const formattedDate = date.toISOString().split("T")[0];
            setSelectedDate(formattedDate);
          }}
          tileClassName={({ date }) =>
            isDateAndTimeAvailable(date) ? "available-date" : "unavailable-date"
          }
        />
        {selectedDate && (
          <div className="booking-time-container">
            <h2>Orari disponibili per {selectedDate}:</h2>
            <div className="time-container">
              {timeslots.length > 0 ? (
                timeslots.map((time) => (
                  <button
                    key={time}
                    onClick={() => handleBooking(time)}
                    className="time-btn"
                    disabled={bookedTimes.has(time)}
                  >
                    {time}
                  </button>
                ))
              ) : (
                <p>Nessun orario disponibile per questa data.</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingCreator;
