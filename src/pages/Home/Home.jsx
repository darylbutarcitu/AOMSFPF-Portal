import { useState, useEffect } from 'react';
import './Home.css';
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../configs/firebaseConfig.js";
import VisitorCounter from "../Tracker/VisitorCounter.jsx";
import LoadingScreen from "../../components/LoadingScreen.jsx";
import { motion } from 'framer-motion';

function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const sendSignalToESP32 = async () => {
    try {
      const ledRef = doc(db, "commands", "LED_SIGNAL");
      await setDoc(ledRef, { signal: true, timestamp: Date.now() });
      console.log("Signal sent to ESP32");
      const audio = new Audio("/tweet_sfx.mp3");
      audio.play();
    } catch (error) {
      console.error("Error sending signal:", error);
    }
  };

  const Content = () => {
    return (
      <motion.div
        initial={{ y: '5vh', opacity: 0 }}
        animate={{ y: 0, opacity: 1 }} 
        transition={{ duration: 1.5, ease: 'easeInOut' }}
      >
        <div>
            <a href="https://www.youtube.com/watch?v=xvFZjo5PgG0" target="_blank">
              <img src="/mascot.svg" className="logo" alt="Sisiw Logo" />
            </a>
            <a href="https://www.youtube.com/watch?v=WzKJ1Ks3B8Y" target="_blank">
              <img src="/cituseal.svg" className="logo citu" alt="CIT-U logo" />
            </a>
            <h1>Automated Odor Mitigation System for Poultry Farms</h1>
            <div className="card">
              <button onClick={sendSignalToESP32} className="button">
                Ping ESP32
              </button>
              <p>
                <br></br>
                Team: 13 Research Why
              </p>
            </div>
            <p className="read-the-docs">
              🟢 Current Visitors:  <VisitorCounter />
            </p>
          </div>
      </motion.div>
    );
  };

  return (
    <>
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <Content />
      )}
    </>
  );
}

export default Home;
