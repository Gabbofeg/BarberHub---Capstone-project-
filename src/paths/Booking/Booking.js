import BookingSystem from "../../components/Booking/Booking"
import '../Booking/style.css'


export const Booking = () => {
    return(
        <div className="booking-container">
            <BookingSystem /> 
            <h2><a href="http://localhost:3000/Login">Oppure registrati</a></h2>
            
        </div>
    )
}