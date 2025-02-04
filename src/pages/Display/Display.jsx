import React, { useEffect, useState } from 'react';
import './Display.css';
import { motion } from 'framer-motion';
import { db } from "../../configs/firebaseConfig.js";
import { doc, onSnapshot } from "firebase/firestore";

const Display = () => {
  const [line1Content, setLine1Content] = useState('');
  const [line2Content, setLine2Content] = useState('');

  useEffect(() => {
    // Firestore reference to line_1 and line_2
    const line1Ref = doc(db, "display", "line_1");
    const line2Ref = doc(db, "display", "line_2");

    // Set up real-time listeners for line_1 and line_2
    const unsubscribeLine1 = onSnapshot(line1Ref, (docSnap) => {
      console.log("Line 1 Snapshot:", docSnap); // Log the snapshot for line_1
      if (docSnap.exists()) {
        const data = docSnap.data();
        console.log("Fetched Line 1 Data:", data); // Log the fetched data for line_1
        setLine1Content(data?.content || ''); // Set the content from line_1
      } else {
        console.log("No such document for line_1!");
      }
    });

    const unsubscribeLine2 = onSnapshot(line2Ref, (docSnap) => {
      console.log("Line 2 Snapshot:", docSnap); // Log the snapshot for line_2
      if (docSnap.exists()) {
        const data = docSnap.data();
        console.log("Fetched Line 2 Data:", data); // Log the fetched data for line_2
        setLine2Content(data?.content || ''); // Set the content from line_2
      } else {
        console.log("No such document for line_2!");
      }
    });

    // Clean up the listeners when the component is unmounted
    return () => {
      unsubscribeLine1();
      unsubscribeLine2();
    };
  }, []);

  return (
    <motion.div
      initial={{ y: '5vh', opacity: 0 }}
      animate={{ y: 0, opacity: 1 }} 
      transition={{ duration: 1, ease: 'easeInOut' }}
      className="display-container"
    >
      <div className="ssd1306-screen">
        <div className="ssd1306-content">
          {line1Content} <br />
          {line2Content}
        </div>
      </div>
    </motion.div>
  );
};

export default Display;
