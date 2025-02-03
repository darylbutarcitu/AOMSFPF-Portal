import { useState } from 'react'
import reactLogo from '../../assets/react.svg'
import viteLogo from '/vite.svg'
import './Home.css'
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../configs/firebaseConfig.js";

function Home() {
  const [count, setCount] = useState(0)

  const sendSignalToESP32 = async () => {
    try {
      const ledRef = doc(db, "commands", "LED_SIGNAL");
      await setDoc(ledRef, { signal: true, timestamp: Date.now() });
      console.log("Signal sent to ESP32");
    } catch (error) {
      console.error("Error sending signal:", error);
    }
  };

  return (
    <>
      <div>
        <a href="https://www.youtube.com/watch?v=xvFZjo5PgG0" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://www.youtube.com/watch?v=WzKJ1Ks3B8Y" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Automated Odor Mitigation System for Poultry Farms</h1>
      <div className="card">
        <button onClick={sendSignalToESP32}>
          Ping ESP32
        </button>
        <p>
          Mute your device don't say I did not warn you bhie
        </p>
      </div>
      <p className="read-the-docs">
        PLEASE LANG ROLD PAPASARA MI ANI
      </p>
    </>
  )
}

export default Home
