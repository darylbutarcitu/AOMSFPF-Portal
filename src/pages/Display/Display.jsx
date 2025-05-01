import React, { useEffect, useState } from 'react';
import './Display.css';
import { db, rtdb } from "../../configs/firebaseConfig.js"; // Import Realtime Database instance
import { ref, query, orderByChild, limitToLast, onValue } from "firebase/database";
import { doc, getDoc } from "firebase/firestore"; // Import Firestore methods

const Display = ({ onRiceHullsStatusChange }) => {
  const [displayContent, setDisplayContent] = useState({});
  const [lastUpdateTime, setLastUpdateTime] = useState(null); // Track the last update time
  const [isESPActive, setIsESPActive] = useState(false); // Track if ESP is active

  useEffect(() => {
    console.log("Setting up Firebase Realtime Database listener...");
    const logsRef = ref(rtdb, "logs"); // Reference to the "logs" collection
    const logsQuery = query(logsRef, orderByChild("timestamp"), limitToLast(1)); 

    const unsubscribe = onValue(logsQuery, (snapshot) => {
      console.log("Firebase Realtime Database snapshot received:", snapshot.val());
      if (snapshot.exists()) {
        const logs = [];
        snapshot.forEach((childSnapshot) => {
          logs.push(childSnapshot.val());
        });
        const latestLog = logs[0];
        const readableTime = latestLog.timestamp
          ? new Date(latestLog.timestamp).toLocaleString() 
          : "Invalid Timestamp";

        const riceHullsLevel = latestLog.riceHullsLevel >= -1 ? latestLog.riceHullsLevel.toFixed(2) : "N/A";
        const isValidData =
          latestLog.ammoniaPPM !== undefined &&
          latestLog.riceHullsLevel >= -1 &&
          latestLog.timestamp !== undefined;

        setDisplayContent((prevContent) => ({
          ...prevContent,
          ammoniaPPM: latestLog.ammoniaPPM.toFixed(2), 
          riceHullsLevel: riceHullsLevel,
          readableTime: readableTime, 
        }));

        setLastUpdateTime(Date.now()); 
        setIsESPActive(isValidData); 

        // Notify Home.jsx about the rice hull status
        if (onRiceHullsStatusChange) {
          const status = getRiceHullsStatus(riceHullsLevel);
          onRiceHullsStatusChange(status);
        }
      } else {
        console.log("No logs found!");
        setIsESPActive(false); 
      }
    });

    return () => {
      console.log("Cleaning up Firebase listener...");
      unsubscribe();
    };
  }, [onRiceHullsStatusChange]);

  useEffect(() => {
    const fetchFirestoreData = async () => {
      console.log("Fetching Firestore data...");
      const docRef = doc(db, "display", "ssd1306"); // Reference to the Firestore document
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log("Firestore document data:", docSnap.data());
        const { line_4, line_5 } = docSnap.data();

        setDisplayContent((prevContent) => ({
          ...prevContent,
          line_4: line_4 || "", // Default to an empty string if not present
          line_5: line_5 || "", // Default to an empty string if not present
        }));
      } else {
        console.log("No such document in Firestore!");
      }
    };

    fetchFirestoreData();
  }, []); // Run only once when the component mounts

  useEffect(() => {
    const interval = setInterval(() => {
      if (lastUpdateTime && Date.now() - lastUpdateTime > 30000) {
        // 30 seconds threshold
        console.log("ESP has stopped sending data.");
        setIsESPActive(false); // Mark ESP as inactive if no updates within 10 seconds
      }
    }, 5000); // Check every 5 seconds

    return () => clearInterval(interval);
  }, [lastUpdateTime]);

  const getAmmoniaStatus = (ppm) => {
    if (ppm < 15) return "LOW";
    if (ppm >= 15 && ppm <= 25) return "HIGH";
    return "CRITICAL";
  };

  const getRiceHullsStatus = (level) => {
    if (level === "N/A") return "UNKNOWN";
    if (level < 11) return "LOW";
    if (level >= 11 && level <= 22) return "MEDIUM";
    return "HIGH";
  };

  return (
    <div className="ssd1306-screen">
      <div className="ssd1306-content">
        {isESPActive ? (
          <>
            {`Ammonia Lvl (PPM): ${displayContent.ammoniaPPM || "undefined"} ${
              displayContent.ammoniaPPM !== undefined
                ? `(${getAmmoniaStatus(displayContent.ammoniaPPM)})`
                : ""
            }`}{" "}
            <br />
            {`Rice Hulls Level: ${displayContent.riceHullsLevel || "undefined"} ${
              displayContent.riceHullsLevel !== undefined
                ? `(${getRiceHullsStatus(displayContent.riceHullsLevel)})`
                : ""
            }`}{" "}
            <br />
            <br />
            {`Timestamp: ${displayContent.readableTime || "undefined"}`} <br />
          </>
        ) : (
          <>ESP has stopped sending data</>
        )}
      </div>
    </div>
  );
};

export default Display;