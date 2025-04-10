import React, { useState } from 'react';
import './SystemDetails.css';
import { motion } from 'framer-motion';

function SystemDetails() {
  const [activeSection, setActiveSection] = useState(null);

  const toggleSection = (section) => {
    setActiveSection(activeSection === section ? null : section);
  };

  return (
    <div className="system-container">
      <motion.div
        initial={{ y: '5vh', opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: 'easeInOut' }}
      >
        <h1 className="system-title">System Details</h1>

        <div className="system-overview-container">
          <div className="system-header">
            <h2>Automated Odor Mitigation System for Poultry Farms</h2>
            <p className="system-subtitle">
              ESP-Based Air Quality Monitoring and Odor Control with Burnt Rice Hulls
            </p>
          </div>

          <div className="system-overview">
            <p>
              Our system is designed to monitor air quality inside poultry farms and automatically mitigate
              foul odors by dispensing burnt rice hulls as a natural odor absorber. It uses various sensors
              and a microcontroller to detect harmful gas levels, evaluate container levels, and trigger
              odor control mechanisms. It also features real-time monitoring and manual override through
              a web application.
            </p>
          </div>
        </div>

        <div className="accordion-container">
          {/* Hardware Section */}
          <div className="accordion-item">
            <div 
              className="accordion-header"
              onClick={() => toggleSection('hardware')}
            >
              <h2>Hardware Components</h2>
              <div className="chevron-icon">
                {activeSection === 'hardware' ? '▲' : '▼'}
              </div>
            </div>
            
            {activeSection === 'hardware' && (
              <motion.div 
                className="accordion-content"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                transition={{ duration: 0.3 }}
              >
                <ul className="components-list">
                  <li>
                    <h3>ESP32 Microcontroller</h3>
                    <p>Acts as the central processing unit, handling all sensor data, decision-making algorithms, and communication with the web interface. It's the brain behind the entire system.</p>
                  </li>
                  <li>
                    <h3>MQ-137 Ammonia Sensor</h3>
                    <p>Detects ammonia gas concentration in the poultry environment, a primary indicator of odor issues. It provides precise readings for the system to determine when intervention is needed.</p>
                  </li>
                  <li>
                    <h3>Ultrasonic Sensor</h3>
                    <p>Measures the remaining level of burnt rice hulls in the dispenser, ensuring the system knows when supplies are running low and need replenishment.</p>
                  </li>
                  <li>
                    <h3>Servo Motors</h3>
                    <p>Controls the dispensing gate and sweeper mechanisms, providing precise mechanical control for both the odor control material release and the cleaning functions.</p>
                  </li>
                  <li>
                    <h3>Prototype Poultry Cage</h3>
                    <p>A scaled model of a poultry farm environment used for testing and demonstration, featuring realistic catch pan dimensions and manure collection areas.</p>
                  </li>
                  <li>
                    <h3>Power Supply</h3>
                    <p>Provides the necessary power for all components, designed with energy efficiency in mind to ensure reliable operation even in rural farm settings.</p>
                  </li>
                </ul>
              </motion.div>
            )}
          </div>

          {/* Software Section */}
          <div className="accordion-item">
            <div 
              className="accordion-header"
              onClick={() => toggleSection('software')}
            >
              <h2>Software Components</h2>
              <div className="chevron-icon">
                {activeSection === 'software' ? '▲' : '▼'}
              </div>
            </div>
            
            {activeSection === 'software' && (
              <motion.div 
                className="accordion-content"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                transition={{ duration: 0.3 }}
              >
                <ul className="components-list">
                  <li>
                    <h3>Embedded Firmware (Arduino IDE)</h3>
                    <p>Programmed on the ESP32 to handle sensor readings, threshold detection, motor control, and communication with the cloud database. Features advanced algorithms for optimal odor control.</p>
                  </li>
                  <li>
                    <h3>Web Application (React.js with Firebase)</h3>
                    <p><strong>Frontend:</strong> Developed in React.js for a responsive, intuitive user interface that provides real-time data visualization and system control capabilities. <br/><strong>Backend:</strong> Firebase Realtime Database for storing sensor readings, system states, and user preferences with minimal latency.</p>
                  </li>
                  <li>
                    <h3>Communication Protocol</h3>
                    <p><strong>Wi-Fi</strong> (via ESP32) connectivity enables seamless data transfer between the physical system and the cloud database, allowing for remote monitoring and control from anywhere in the world.</p>
                  </li>
                </ul>
              </motion.div>
            )}
          </div>

          {/* Functionalities Section */}
          <div className="accordion-item">
            <div 
              className="accordion-header"
              onClick={() => toggleSection('functionalities')}
            >
              <h2>Key Functionalities</h2>
              <div className="chevron-icon">
                {activeSection === 'functionalities' ? '▲' : '▼'}
              </div>
            </div>
            
            {activeSection === 'functionalities' && (
              <motion.div 
                className="accordion-content"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                transition={{ duration: 0.3 }}
              >
                <ul className="components-list">
                  <li>
                    <h3>Automatic Odor Detection and Control</h3>
                    <p>Continuously monitors ammonia levels and automatically dispenses burnt rice hulls when thresholds are exceeded, maintaining optimal air quality without human intervention.</p>
                  </li>
                  <li>
                    <h3>Rice Hull Level Monitoring</h3>
                    <p>Uses an ultrasonic sensor to track the amount of burnt rice hulls remaining in the dispenser, alerting farm operators when refills are needed before depletion occurs.</p>
                  </li>
                  <li>
                    <h3>Manual Override</h3>
                    <p>Users can remotely trigger the mechanisms through the web interface, allowing for immediate intervention or scheduled maintenance operations regardless of sensor readings.</p>
                  </li>
                  <li>
                    <h3>Sweeping/Wiping Mechanism</h3>
                    <p>Ensures even distribution of the burnt rice hulls across the catch pan area and removes accumulated waste, maintaining system efficiency and preventing blockages.</p>
                  </li>
                  <li>
                    <h3>Real-Time Web Monitoring</h3>
                    <p>Users can view live readings of ammonia levels, system status, and operational history through an intuitive dashboard, enabling data-driven farm management decisions.</p>
                  </li>
                </ul>
              </motion.div>
            )}
          </div>
        </div>

        
      </motion.div>
    </div>
  );
}

export default SystemDetails;