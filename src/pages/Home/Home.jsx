import { useState, useEffect } from 'react';
import './Home.css';
import { doc, setDoc, getDoc, onSnapshot  } from "firebase/firestore";
import { db } from "../../configs/firebaseConfig.js";
import VisitorCounter from "../Tracker/VisitorCounter.jsx";
import LoadingScreen from "../../components/LoadingScreen.jsx";
import Display from '../Display/Display';
import { motion } from 'framer-motion';

function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [prevStatus, setPrevStatus] = useState(null);
  const [showNotification, setShowNotification] = useState(false); // State for notification visibility
  const [notificationMessage, setNotificationMessage] = useState(''); // Notification message
  const [notificationCooldown, setNotificationCooldown] = useState(false); // Cooldown state

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  // Callback to handle rice hull status from Display
  const handleRiceHullsStatus = (status) => {
    if (status === 'LOW' && !notificationCooldown) {
      setNotificationMessage('⚠️ Warning: Rice Hull Level is LOW!');
      setShowNotification(true);
    }
  };

  // Handle dismissing the notification
  const dismissNotification = () => {
    setShowNotification(false);
    setNotificationCooldown(true); // Start cooldown
    setTimeout(() => {
      setNotificationCooldown(false); // Reset cooldown after 30 seconds
    }, 30000);
  };

  const sendSignal = async (signalName, successMessage) => {
    try {
      const signalRef = doc(db, "commands", signalName);
      const line5Ref = doc(db, "display", "ssd1306");
      const espStatusRef = doc(db, "commands", "ESPstatus");
  
      const [signalDoc, espStatusDoc] = await Promise.all([
        getDoc(signalRef),
        getDoc(espStatusRef),
      ]);
  
      let message = "";
      if (espStatusDoc.data().isBusy) {
        message = "Busy/Offline...";
      } else {
        await setDoc(signalRef, {
          status: true,
          lastModifiedBy: "App",
          timestamp: Date.now(),
        }, { merge: true });
  
        await setDoc(espStatusRef, { isBusy: true }, { merge: true });
        message = successMessage;
        const audio = new Audio("/tweet_sfx.mp3");
        audio.play();
      }
  
      await setDoc(line5Ref, { line_5: message }, { merge: true });
      setTimeout(async () => {
        const lastModifyDoc = await getDoc(signalRef);
        if (lastModifyDoc.data().lastModifiedBy === "App") {
          await setDoc(signalRef, {
            status: false,
            lastModifiedBy: "",
            timestamp: Date.now(),
          }, { merge: true });
  
          await setDoc(espStatusRef, { isBusy: false }, { merge: true });
        }
      }, 6000);
  
      setTimeout(async () => {
        await setDoc(line5Ref, { line_5: "" }, { merge: true });
      }, 3000);
    } catch (error) {
      console.error("Error sending signal:", error);
    }
  };

  
  useEffect(() => {
    const signalRef = doc(db, "commands", "wipe_signal");
  
    const unsubscribe = onSnapshot(signalRef, (docSnapshot) => {
      const status = docSnapshot.data()?.status;
      const lastModifiedBy = docSnapshot.data()?.lastModifiedBy;
      const line5Ref = doc(db, "display", "ssd1306");
      let message = "";
  
      if (prevStatus === true && status === false && lastModifiedBy === "ESP") {
        console.log('Wipe signal changed from TRUE to FALSE');
        message = "Sweeping completed!";
        setDoc(line5Ref, { line_5: message }, { merge: true });
        setTimeout(async () => {
          await setDoc(line5Ref, { line_5: "" }, { merge: true });
          console.log('line_5 cleared');
        }, 3000);
      }
  
      setPrevStatus(status);
    });
  
    return () => unsubscribe();
  }, [prevStatus]);
  
  const Logos = () => {
    return (
        <div>
            <a href="/" target="_blank">
              <img src="/mascot.svg" className="logo" alt="Sisiw Logo" />
            </a>
            <a href="/" target="_blank">
              <img src="/cituseal.svg" className="logo citu" alt="CIT-U logo" />
            </a>
        </div>
      //</motion.div>
    );
  };

  const Content = () => {
    return (
        <div>
            <h1 className="title"></h1>
            <Display onRiceHullsStatusChange={handleRiceHullsStatus} />
            <div className="card">
              <div className="button-container">
                <button onClick={() => sendSignal("wipe_signal", "Wipe Signal sent to ESP32")} className="sweepButton">
                  Sweep
                </button>
                <button onClick={() => sendSignal("dispense_signal", "Dispense Signal sent to ESP32")} className="dispenseButton">
                  Dispense
                </button>
              </div>
              {/* Notification Dropdown */}
              {showNotification && (
                <div className="notification-dropdown">
                  <p>{notificationMessage}</p>
                  <button onClick={dismissNotification}>Dismiss</button>
                </div>
              )}
              <p>
                <br></br>
                Team: 13 Research Why
              </p>
            </div>
            <p className="read-the-docs">
              🟢 Current Visitors:  <VisitorCounter />
            </p>
          </div>
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
