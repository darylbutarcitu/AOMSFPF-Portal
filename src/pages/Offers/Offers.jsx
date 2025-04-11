import React from 'react';
import './Offers.css';
import { motion } from 'framer-motion';

function Offers() {
  return (
    <div className="offers-container">
      <motion.div
        initial={{ y: '5vh', opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: 'easeInOut' }}
      >
        <h1 className="offers-title">What We Offer</h1>
        
        <div className="offers-content">
          <div className="offer-item">
            <div className="offer-icon">
              <img src="/chip.svg" alt="Automation" className="offer-svg" />
            </div>
            <div className="offer-text">
              <h2>Smart Odor Control System</h2>
              <p>
                Our automated system uses ESP32 microcontrollers and sensors to continuously monitor 
                air quality in poultry environments. When harmful gas levels exceed thresholds, 
                the system automatically distributes burnt rice hulls to neutralize odors.
              </p>
            </div>
          </div>

          <div className="offer-item">
            <div className="offer-icon">
              <img src="/wiper.svg" alt="Cleaning" className="offer-svg" />
            </div>
            <div className="offer-text">
              <h2>Automated Cleaning Mechanism</h2>
              <p>
                After odor treatment, our system activates a smart sweeping mechanism that cleans 
                catch pans, removing manure and used rice hull accumulation to maintain a hygienic 
                environment for poultry and farm workers.
              </p>
            </div>
          </div>

          <div className="offer-item">
            <div className="offer-icon">
              <img src="/data.svg" alt="Monitoring" className="offer-svg" />
            </div>
            <div className="offer-text">
              <h2>Remote Monitoring Dashboard</h2>
              <p>
                Access real-time data on your farm's air quality, system status, and operations through 
                our web interface. Receive alerts when intervention is needed and trigger manual clean 
                sweeps from anywhere with internet access.
              </p>
            </div>
          </div>

          <div className="offer-item">
            <div className="offer-icon">
              <img src="/sustainable.svg" alt="Eco-friendly" className="offer-svg" />
            </div>
            <div className="offer-text">
              <h2>Sustainable Waste Management</h2>
              <p>
                Our solution repurposes agricultural waste (burnt rice hulls) as an effective odor 
                control medium, creating a circular economy approach that reduces environmental impact 
                while solving a critical farming challenge.
              </p>
            </div>
          </div>

          <div className="offer-item">
            <div className="offer-icon">
              <img src="/mascot.svg" alt="Health" className="offer-svg" />
            </div>
            <div className="offer-text">
              <h2>Improved Animal Welfare</h2>
              <p>
                By maintaining optimal air quality levels, our system reduces respiratory issues in 
                poultry, leading to healthier birds, reduced mortality rates, and improved 
                production yields for farm operators.
              </p>
            </div>
          </div>

          <div className="cta-section">
            <h2>Ready to Transform Your Poultry Farm?</h2>
            <p>
              Contact our team for more information about implementing our Automated Odor Mitigation 
              System in your facility. We offer customization options based on your farm's specific needs.
            </p>
            <a href="mailto:omero.jessica@gmail.com" className="cta-button">Contact Us</a>
            </div>
        </div>
      </motion.div>
    </div>
  );
}

export default Offers;