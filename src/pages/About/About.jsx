import React from 'react';
import './About.css';
import { motion } from 'framer-motion';

function About() {
  return (
    <div className="about-container">
      <motion.div
        initial={{ y: '5vh', opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: 'easeInOut' }}
      >
        {/* <h1 className="about-title">About Us</h1> */}
        
        <div className="about-content">
          <div className="about-section">
            <h2>Our Mission</h2>
            <p>
            We, Team 13 Research Why, are committed to revolutionizing poultry farming through smart, sustainable solutions. Our Automated Odor Mitigation System for Poultry Farms (AOMSFP) is designed to address both environmental and operational challenges by improving air quality, animal welfare, and the working conditions of poultry farm operators. By integrating cutting-edge technology, we aim to provide farms with efficient, reliable systems that support long-term success.
            </p>
          </div>
          
          <div className="about-section">
            <h2>The Team</h2>
            <p>
              We are a group of Computer Engineering students from Cebu Institute of Technology - University, 
              combining expertise in electronics, software development, and agricultural science to tackle real-world problems.
            </p>
            
            <div className="team-members">
            <div className="team-member">
                <img src="/src/assets/daryl.jpg" alt="Daryl D. Butar" />
                <h3>Daryl D. Butar</h3>
            </div>
            <div className="team-member">
                <img src="/src/assets/jessica1.jpg" alt="Jessica A. Omero" />
                <h3>Jessica A. Omero</h3>
            </div>
            <div className="team-member">
                <img src="/src/assets/romeo.jpg" alt="Romeo Gabriel A. Parco" />
                <h3>Romeo Gabriel A. Parco</h3>
            </div>
            </div>

          </div>
          
          <div className="about-section">
            <h2>Our Technology</h2>
            <p>
            The AOMSFP employs ESP32 microcontrollers and specialized sensors to monitor environmental conditions and air quality in poultry farms. By constantly tracking odor levels, our system ensures that when ammonia and other harmful compounds exceed safe thresholds, the system activates an automated mechanism to dispense burnt rice hulls. These hulls efficiently mitigate the odor, improving the overall air quality within the farm.

            <p>In addition, after the system dispenses the burnt rice hulls, it triggers the cleaning mechanism. This feature cleans the catch pan, eliminating manure and rice hull buildup, ensuring the environment remains hygienic and odor-free. Our technology is designed for energy efficiency, ease of maintenance, and scalability, making it an ideal solution for poultry farms of all sizes.</p>
            </p>
            
          </div>
          
          <div className="about-section">
            <h2>Partnerships</h2>
            <p>
              We proudly partner with Cebu Institute of Technology - University, which provides 
              research facilities and academic support for our ongoing development efforts.
            </p>
            <p>
              We also collaborate with local poultry farms to test and refine our system in real-world conditions.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default About;