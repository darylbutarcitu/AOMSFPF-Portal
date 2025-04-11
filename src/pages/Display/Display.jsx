import React, { useEffect, useState } from 'react';
import './Display.css';
import { motion } from 'framer-motion';
import { db } from "../../configs/firebaseConfig.js";
import { doc, onSnapshot } from "firebase/firestore";

const Display = () => {
  const [displayContent, setDisplayContent] = useState({}); // Initialize as an object
  
  useEffect(() => {
    const displayRef = doc(db, "display", "ssd1306");

    const unsubscribe = onSnapshot(displayRef, (docSnap) => {
      console.log("Snapshot:", docSnap.data()); // Log the entire document data
      if (docSnap.exists()) {
        setDisplayContent(docSnap.data()); // Set the entire document data
      } else {
        console.log("No such document!");
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    // <motion.div
    //   initial={{ y: '5vh', opacity: 0 }}
    //   animate={{ y: 0, opacity: 1 }} 
    //   transition={{ duration: 1, ease: 'easeInOut' }}
    //   className="display-container"
    // >
      <div className="ssd1306-screen">
        <div className="ssd1306-content">
          {displayContent.line_1 || "Loading..."} <br />
          {displayContent.line_2 || ""} <br />
          {displayContent.line_3 || ""} <br />
          {displayContent.line_4 || ""}
        </div>
      </div>
    // </motion.div>
  );
};

export default Display;
