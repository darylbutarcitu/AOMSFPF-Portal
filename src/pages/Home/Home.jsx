import { useState, useEffect } from 'react';
import './Home.css';
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../configs/firebaseConfig.js";
import VisitorCounter from "../Tracker/VisitorCounter.jsx";
import LoadingScreen from "../../components/LoadingScreen.jsx";
import Display from '../Display/Display';
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
      window.confirm("ping");
    } catch (error) {
      console.error("Error sending signal:", error);
    }
  };

  const Logos = () => {
    return (
      <motion.div
        initial={{ y: '5vh', opacity: 0 }}
        animate={{ y: 0, opacity: 1 }} 
        transition={{ duration: 1.5, ease: 'easeInOut' }}
      >
        <div>
            <a href="/" target="_blank">
              <img src="/mascot.svg" className="logo" alt="Sisiw Logo" />
            </a>
            <a href="/" target="_blank">
              <img src="/cituseal.svg" className="logo citu" alt="CIT-U logo" />
            </a>
        </div>
      </motion.div>
    );
  };

  const Content = () => {
    return (
      <motion.div
        initial={{ y: '5vh', opacity: 0 }}
        animate={{ y: 0, opacity: 1 }} 
        transition={{ duration: 1, ease: 'easeInOut' }}
      >
        <div>
            <h1 className="title">Automated Odor Mitigation System for Poultry Farms</h1>
            <Display />
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
        <>
        <Logos />
        <Content />
        </>
      )}
    </>
  );
}

export default Home;
