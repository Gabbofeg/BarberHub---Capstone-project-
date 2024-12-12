

import './style.css'



const ServiceContainer = ({title, description, imgSrc}) =>{
    return(
        <div className='service-container'>
            <div className='text-container'>
                <h3>{ title }</h3>
                <p>{ description }</p>
            </div>
            <img id='serviceImg' src={ imgSrc } alt={ title }/>
        </div>
    )
}

export default ServiceContainer;


