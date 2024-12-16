import { navlinks } from "../../navlinks/navlinks";
import "../Navbar/style.css";
import { useEffect, useState, useRef } from "react";
import logo from "../Navbar/assets/logo.webp";
import { Link } from "react-router-dom";
import { motion } from "motion/react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const toggleRef = useRef(null);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };
 

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && isOpen) {
        setIsOpen(false);
      }
    };
    
    const handleClickOutside = (e) => {
      if (
        isOpen &&
        menuRef.current &&
        !menuRef.current.contains(e.target) &&
        toggleRef.current &&
        !toggleRef.current.contains(e.target)
      ) {
        setIsOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    if (isOpen) {
      setTimeout(() => {
        document.addEventListener("click", handleClickOutside);
      }, 0);
    }

    return () => {
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <nav className="d-flex px-5 navigationBar">
      <div className="leftNav d-flex">
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onHoverStart={() => console.log("hover started!")}
          className="imgContainer"
        >
          <Link to="http://localhost:3000/">
            <img className="logoImg" src={logo} alt="logo" link='http://localhost:3000/Home'/>
          </Link>
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.95 }}
          onHoverStart={() => console.log("hover started!")}
          className="instaBanner"
        >
          <a className="instaLink" href="https://instagram.com/">
            @barberhub
          </a>
        </motion.div>
      </div>
      <div className="burger-menu">
        <ul
          ref={menuRef}
          className={`navbar-links overlay ${isOpen ? "open" : ""}`}
        >
          {navlinks.map((link, index) => (
            <li key={index} onClick={() => setIsOpen(false)}>
              <Link className="path" to={link.href}>
                {link.text}
              </Link>
            </li>
          ))}
        </ul>
        <div className="navbar-toggle">
          <button
            ref={toggleRef}
            className="toggle-button"
            onClick={handleToggle}
          >
            ☰
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
