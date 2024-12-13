import ServiceContainer from "../../components/Services/ServiceContainer"
import '../Services/style.css'

export const Services = () => {
    return(
        <div>
            <ServiceContainer
                title='Service n.1'
                description= 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis neque cum ut. Earum consequuntur debitis tempore suscipit minima laudantium, quidem animi alias reiciendis officiis illo possimus autem, aspernatur officia fugiat voluptatum molestias consectetur in nemo magni. Quidem porro sunt, dolorem cum magni deserunt quas. Nihil beatae eaque eligendi fugit laboriosam.'
                imgSrc='https://picsum.photos/150/200'
            />
            <ServiceContainer
                title='Service n.2'
                description= 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis neque cum ut. Earum consequuntur debitis tempore suscipit minima laudantium, quidem animi alias reiciendis officiis illo possimus autem, aspernatur officia fugiat voluptatum molestias consectetur in nemo magni. Quidem porro sunt, dolorem cum magni deserunt quas. Nihil beatae eaque eligendi fugit laboriosam.'
                imgSrc='https://picsum.photos/150/200'
                className='service-odds'
            />
            <ServiceContainer
                title='Service n.3'
                description= 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis neque cum ut. Earum consequuntur debitis tempore suscipit minima laudantium, quidem animi alias reiciendis officiis illo possimus autem, aspernatur officia fugiat voluptatum molestias consectetur in nemo magni. Quidem porro sunt, dolorem cum magni deserunt quas. Nihil beatae eaque eligendi fugit laboriosam.'
                imgSrc='https://picsum.photos/150/200'
            />
            <ServiceContainer
                title='Service n.4'
                description= 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis neque cum ut. Earum consequuntur debitis tempore suscipit minima laudantium, quidem animi alias reiciendis officiis illo possimus autem, aspernatur officia fugiat voluptatum molestias consectetur in nemo magni. Quidem porro sunt, dolorem cum magni deserunt quas. Nihil beatae eaque eligendi fugit laboriosam.'
                imgSrc='https://picsum.photos/150/200'
            />

        </div>
    )
}



