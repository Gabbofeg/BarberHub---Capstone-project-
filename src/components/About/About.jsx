import { auto } from "@cloudinary/url-gen/actions/resize"
import { autoGravity } from "@cloudinary/url-gen/qualifiers/gravity"
import { AdvancedImage}  from "@cloudinary/react"
import { Cloudinary } from '@cloudinary/url-gen'

const About = () => {
    const cld = new Cloudinary ({ cloud: { cloudName: 'dczawhczz' } });

    const img = cld
        .image('cld-sample-5')
        .format('auto') // Optimize delivery by resizing and applying auto-format and auto-quality
        .quality('auto')
        .resize(auto().gravity(autoGravity()).width(100).height(100)); // Transform the image: auto-crop to square aspect_ratio

    return(
        <div className="container d-flex py-5">
            <div>
                <h1>Chi siamo</h1>
                <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eos eveniet sit labore eum dolores! Asperiores dolore necessitatibus ullam magni commodi obcaecati possimus, animi, delectus minus voluptates repellat soluta, ipsa laboriosam doloremque voluptate atque totam sapiente deserunt ut nihil illum provident officia mollitia. Amet dolor ipsa veniam excepturi, natus explicabo consectetur!</p>
            </div>
            <AdvancedImage cldImg={img}/> 
        </div>
    )
}

export default About