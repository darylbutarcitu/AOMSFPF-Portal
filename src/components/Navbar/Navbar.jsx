import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
          <img src="/mascot.svg" className="nav-logo" alt="Sisiw Logo" />
          AOMSFP
        </Link>

        <div className={`menu-icon ${isMobileMenuOpen ? 'active' : ''}`} onClick={toggleMobileMenu}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>

        <ul className={`nav-menu ${isMobileMenuOpen ? 'active' : ''}`}>
          <li className="nav-item">
            <Link to="/" className="nav-link" onClick={closeMobileMenu}>Home</Link>
          </li>
          <li className="nav-item">
            <Link to="/offers" className="nav-link" onClick={closeMobileMenu}>Offers</Link>
          </li>
          <li className="nav-item">
            <Link to="/system" className="nav-link" onClick={closeMobileMenu}>System Details</Link>
          </li>
          <li className="nav-item">
            <Link to="/about" className="nav-link" onClick={closeMobileMenu}>About Us</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
