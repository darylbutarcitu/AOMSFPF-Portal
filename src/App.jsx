import { Routes, Route, Link } from "react-router-dom";
import Home from "../src/pages/Home/Home.jsx";
import About from "../src/pages/About/About.jsx";
import Offers from "../src/pages/Offers/Offers.jsx";
import SystemDetails from "../src/pages/SystemDetails/SystemDetails.jsx";
import Navbar from "../src/components/Navbar/Navbar.jsx";
import Footer from '../src/components/Footer/Footer.jsx';
import "./App.css";

function App() {
  return (
    <div className="app-container">
      <Navbar />
      <div className="content-container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/offers" element={<Offers />} />
          <Route path="/about" element={<About />} />          
          <Route path="/system" element={<SystemDetails />} />    
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;