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

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const sendWipeSignal = async () => {
    try {
      const signalRef = doc(db, "commands", "wipe_signal");
      const line3Ref = doc(db, "display", "ssd1306");
      const signalDoc = await getDoc(signalRef);
      let message = "";
      
      if (signalDoc.data().isBusyESP) {
        console.log("ESP32 is busy. Please wait.");
        message = "Busy/Offline...";
      } else {
        await setDoc(signalRef, { status: true, isBusyESP: true, lastModifiedBy: "App", timestamp: Date.now() }, { merge: true });
        console.log("Wipe Signal sent to ESP32");
        message = "Wipe Signal sent to ESP32";
        const audio = new Audio("/tweet_sfx.mp3");
        audio.play();
      }
      
      await setDoc(line3Ref, { line_3: message }, { merge: true });
  
      setTimeout(async () => {
        const lastModifyDoc = await getDoc(signalRef);
        if (lastModifyDoc.data().lastModifiedBy === "App" && lastModifyDoc.data().isBusyESP === true) {
          await setDoc(signalRef, { status: false, isBusyESP: false, lastModifiedBy: "", timestamp: Date.now() }, { merge: true });
        }
        console.log('Connection with ESP failed');
        message = "Connection failed.";
        setDoc(line3Ref, { line_1: "---", line_2: "---", line_3: message }, { merge: true });
      }, 6000);
  
      setTimeout(async () => {
        await setDoc(line3Ref, { line_3: "---" }, { merge: true });
        console.log('line_3 cleared');
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
      const line3Ref = doc(db, "display", "ssd1306");
      let message = "";
  
      if (prevStatus === true && status === false && lastModifiedBy === "ESP") {
        console.log('Wipe signal changed from TRUE to FALSE');
        message = "Sweeping completed!";
        setDoc(line3Ref, { line_3: message }, { merge: true });
        setTimeout(() => {
          setDoc(line3Ref, { line_3: "" }, { merge: true });
          console.log('line_3 cleared');
        }, 3000);
      }
  
      setPrevStatus(status);
    });
  
    return () => unsubscribe();
  }, [prevStatus]);
  
  const Logos = () => {
    return (
      // <motion.div
      //   initial={{ y: '5vh', opacity: 0 }}
      //   animate={{ y: 0, opacity: 1 }} 
      //   transition={{ duration: 1.5, ease: 'easeInOut' }}
      // >
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
      // <motion.div
      //   initial={{ y: '5vh', opacity: 0 }}
      //   animate={{ y: 0, opacity: 1 }} 
      //   transition={{ duration: 1, ease: 'easeInOut' }}
      // >
        <div>
            <h1 className="title">{/*Automated Odor Mitigation System for Poultry Farms*/}</h1>
            <Display />
            <div className="card">
              <button onClick={sendWipeSignal} className="button">
                Move Sweeper
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
      //</motion.div>
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
