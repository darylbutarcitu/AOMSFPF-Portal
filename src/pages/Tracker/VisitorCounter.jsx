import { useEffect, useState } from "react";
import { db } from "../../configs/firebaseConfig.js";
import { collection, doc, setDoc, deleteDoc, serverTimestamp, onSnapshot, query, where } from "firebase/firestore";
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

    // Add the visitor to the database and update their last active timestamp periodically
    const addOrUpdateVisitor = async () => {
      await setDoc(visitorRef, { lastActive: serverTimestamp() }, { merge: true });
    };

    // Call the function immediately and set up a heartbeat interval
    addOrUpdateVisitor();
    const heartbeatInterval = setInterval(addOrUpdateVisitor, 10000); // Update every 10 seconds

    // Remove the visitor from the database when the page is unloaded
    const handleUnload = async () => {
      await deleteDoc(visitorRef);
    };
    window.addEventListener("beforeunload", handleUnload);

    // Listen for changes in the activeVisitors collection
    const activeVisitorsQuery = query(
      collection(db, "activeVisitors"),
      where("lastActive", ">", new Date(Date.now() - 30000)) // Only count visitors active in the last 30 seconds
    );

    const unsubscribe = onSnapshot(activeVisitorsQuery, (snapshot) => {
      setUserCount(snapshot.size);
    });

    return () => {
      clearInterval(heartbeatInterval); // Clear the heartbeat interval
      handleUnload(); // Remove the visitor on cleanup
      window.removeEventListener("beforeunload", handleUnload);
      unsubscribe(); // Unsubscribe from Firestore updates
    };
  }, [visitorId]);

  return userCount;
};

export default VisitorCounter;