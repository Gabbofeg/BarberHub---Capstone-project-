import '../Footer/style.css'
import { navlinks } from '../../navlinks/navlinks'
import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <div className=' footer-container'>
            <div className='footer-detail my-ads'>
                <img />
                <h4></h4>
                <p></p>
            </div>
            <div className='footer-detail useful-links'>
                {navlinks.map((link, index) => (
                            <li key={index}>
                              <Link className="path" to={link.href}>
                                {link.text}
                              </Link>
                            </li>
                          ))}
            </div>
            <div className='footer-detail'></div>
        </div>
    )
}

export default Footer