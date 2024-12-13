import 'bootstrap/dist/css/bootstrap.min.css';
import '../src/App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import { Home } from './paths/Home';
import { About } from './paths/About/About';
import { ProductList }  from './paths/Products/Products';
import { Services } from './paths/Services/Services';
import { Booking } from './paths/Booking/Booking';
import { LoggingPage } from './paths/login/LoggingPage';
 



const App = () => {
  

  return (
    <div className='page-container'>
      <Router>
        <Navbar />
        <main>
          <Routes>
            <Route path='/' element={<Home/>}></Route>
            <Route path='/chiSiamo' element={<About/>}></Route>
            <Route path='/Prodotti' element={<ProductList/>}></Route>
            <Route path='/Servizi' element={<Services/>}></Route>
            <Route path='/Prenota' element={<Booking />}></Route>
            <Route path='/Login' element={<LoggingPage />}></Route>
          </Routes>
        </main>
        <Footer className='footer-app' /> 
      </Router>
    </div>
  );
}

export default App;
