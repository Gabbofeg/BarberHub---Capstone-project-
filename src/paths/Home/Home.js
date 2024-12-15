
import CustomHero from "../../components/Hero/CustomHero"
import BookingSystem from "../../components/Booking/Booking"
import RatingsDisplay from "../../components/Ratings/RatingsDisplay"


export const Home = () => {
    return (
            <div className="mainContainer">
                <CustomHero
                    tagLine='Barberhub'
                    title='IL MIGLIOR BARBERSHOP IN CIRCOLAZIONE'
                    message='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam consectetur diam eget mollis mollis. Etiam sapien velit, tristique et velit at, congue vehicula massa. Nullam feugiat imperdiet tristique. Suspendisse dictum facilisis neque laoreet aliquet. Maecenas vitae risus pellentesque, sollicitudin felis quis, rutrum elit. Aliquam erat volutpat. In porttitor vehicula nunc eu bibendum. Suspendisse molestie justo vel lacus tempor, sit amet tincidunt urna sollicitudin. Sed sed ex neque. Integer pellentesque sollicitudin urna, non porttitor felis tincidunt ac. Suspendisse scelerisque ut turpis non maximus. Curabitur fringilla ligula et eros vulputate tincidunt. Integer sit amet congue lacus, nec efficitur elit. Nunc dictum lacus sed velit elementum sollicitudin.'
                    btnText='Prenota ora'
                />
                <div className="d-flex">
                    <BookingSystem /> 
                    <RatingsDisplay />
                </div>
            </div>
    )
}

