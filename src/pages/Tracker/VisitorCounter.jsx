// VisitorTracker.jsx
import { useEffect, useState } from "react";
import { db } from "../../configs/firebaseConfig.js";
import { collection, doc, setDoc, deleteDoc, serverTimestamp, onSnapshot } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";

const VisitorCounter = () => {
    const [userCount, setUserCount] = useState(0);
    let visitorId = localStorage.getItem("visitorId");
  
    if (!visitorId) {
      visitorId = uuidv4();
      localStorage.setItem("visitorId", visitorId);
    }
  
    useEffect(() => {
      const visitorRef = doc(collection(db, "activeVisitors"), visitorId);
  
      const addVisitor = async () => {
        await setDoc(visitorRef, { lastActive: serverTimestamp() }, { merge: true });
      };
      addVisitor();
  
      const handleUnload = async () => {
        await deleteDoc(visitorRef);
      };
      window.addEventListener("beforeunload", handleUnload);
  
      const unsubscribe = onSnapshot(collection(db, "activeVisitors"), (snapshot) => {
        setUserCount(snapshot.size);
      });
  
      return () => {
        handleUnload();
        window.removeEventListener("beforeunload", handleUnload);
        unsubscribe();
      };
    }, [visitorId]);
  
    return userCount;
  };
  
  export default VisitorCounter;