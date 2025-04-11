import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <footer className="site-footer full-width-footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>Automated Odor Mitigation System</h3>
          <p>Smart solutions for poultry farms using burnt rice hulls technology</p>
        </div>
        
        <div className="footer-section">
          <h3>Contact Us</h3>
          <ul className="contact-info">
          <li><i className="footer-icon">📍</i> Cebu Institute of Technology - University, N. Bacalso Avenue, Cebu City</li>
            <li><i className="footer-icon">📧</i> mrdarylbutar@gmail.com</li>
            <li><i className="footer-icon">📧</i> omero.jessica@gmail.com</li>
            <li><i className="footer-icon">📧</i> romeogabrielparco@gmail.com </li>
            <li><i className="footer-icon">📱</i> +63 994656 2912</li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul className="footer-links">
            <li><a href="/">Home</a></li>
            <li><a href="/offers">What We Offer</a></li>
            <li><a href="/system">System Details</a></li>
            <li><a href="/about">About Us</a></li>
          </ul>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Team 13 Research Why. All Rights Reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;