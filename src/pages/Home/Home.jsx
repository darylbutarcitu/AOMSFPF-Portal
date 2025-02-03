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
          <img src="/mascot.svg" className="logo" alt="Sisiw Logo" />
        </a>
        <a href="https://www.youtube.com/watch?v=WzKJ1Ks3B8Y" target="_blank">
          <img src="/cituseal.svg" className="logo citu" alt="CIT-U logo" />
        </a>
      </div>
      <h1>Automated Odor Mitigation System for Poultry Farms</h1>
      <div className="card">
        <button onClick={sendSignalToESP32} className="button">
          Ping ESP32
        </button>
        <p>
          <br></br>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </p>
      </div>
      <p className="read-the-docs">
        Test: SLAYYY
      </p>
    </>
  )
}

export default Home
