
import CustomHero from "../components/Hero/CustomHero"
import About from "../components/About/About"
import EmptyCard from "../components/EmptyCard/EmptyCard"
import BookingSystem from "../components/Booking/Booking"


export const Home = () => {
    return (
            <div className="mainContainer">
                <CustomHero
                    tagLine='Barberhub'
                    title='IL MIGLIOR BARBERSHOP IN CIRCOLAZIONE'
                    message='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam consectetur diam eget mollis mollis. Etiam sapien velit, tristique et velit at, congue vehicula massa. Nullam feugiat imperdiet tristique. Suspendisse dictum facilisis neque laoreet aliquet. Maecenas vitae risus pellentesque, sollicitudin felis quis, rutrum elit. Aliquam erat volutpat. In porttitor vehicula nunc eu bibendum. Suspendisse molestie justo vel lacus tempor, sit amet tincidunt urna sollicitudin. Sed sed ex neque. Integer pellentesque sollicitudin urna, non porttitor felis tincidunt ac. Suspendisse scelerisque ut turpis non maximus. Curabitur fringilla ligula et eros vulputate tincidunt. Integer sit amet congue lacus, nec efficitur elit. Nunc dictum lacus sed velit elementum sollicitudin.'
                    btnText='Prenota ora'
                />
                <About />
                <div className="d-flex px-5 gap-2 justify-content-center">
                    <EmptyCard 
                        title='Scopri i nostri prodotti'
                        imgSrc='https://picsum.photos/150/150'
                        
                    />
                    <EmptyCard
                        title='Scopri i nostri prodotti'
                        imgSrc='https://picsum.photos/150/150'
                    />
                </div>
                <BookingSystem /> 
            </div>
    )
}

