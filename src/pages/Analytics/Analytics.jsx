import React, { useEffect, useState } from "react";
import { ref, query, orderByChild, limitToLast, onValue } from "firebase/database";
import { rtdb } from "../../configs/firebaseConfig.js"; // Import the Realtime Database instance
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend } from "chart.js"; // Ensure CategoryScale is imported
import VisitorCounter from "../Tracker/VisitorCounter.jsx";
import "./Analytics.css";

// Register all required components, including CategoryScale
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

const Analytics = () => {
  const [ammoniaData, setAmmoniaData] = useState([]);
  const [riceHullsData, setRiceHullsData] = useState([]);
  const [timeLabels, setTimeLabels] = useState([]);

  useEffect(() => {
    const logsRef = ref(rtdb, "logs"); // Reference to the "logs" collection
    const logsQuery = query(logsRef, orderByChild("timestamp"), limitToLast(10)); // Fetch the latest 10 entries ordered by timestamp

    const unsubscribe = onValue(logsQuery, (snapshot) => {
      if (snapshot.exists()) {
        const logs = [];
        snapshot.forEach((childSnapshot) => {
          logs.push(childSnapshot.val());
        });

        // Sort logs by timestamp in ascending order
        logs.sort((a, b) => a.timestamp - b.timestamp);

        // Append new data points dynamically
        setAmmoniaData((prevData) => {
          const newData = logs.map((log) => parseFloat(log.ammoniaPPM).toFixed(2));
          return [...prevData.slice(-9), ...newData]; // Keep only the latest 10 points
        });

        setRiceHullsData((prevData) => {
          const newData = logs.map((log) => parseFloat(log.riceHullsLevel).toFixed(2));
          return [...prevData.slice(-9), ...newData]; // Keep only the latest 10 points
        });

        setTimeLabels((prevLabels) => {
          const newLabels = logs.map((log) => new Date(log.timestamp).toLocaleString());
          return [...prevLabels.slice(-9), ...newLabels]; // Keep only the latest 10 labels
        });
      } else {
        console.log("No logs found in Realtime Database.");
      }
    });

    return () => unsubscribe();
  }, []);

  const getAmmoniaStatus = (ppm) => {
    if (ppm < 15) return "LOW";
    if (ppm >= 15 && ppm <= 25) return "HIGH";
    return "CRITICAL";
  };

  const getRiceHullsStatus = (level) => {
    if (level < 11) return "LOW";
    if (level >= 11 && level <= 22) return "MEDIUM";
    return "HIGH";
  };

  const chartOptions = {
    responsive: true,
    animation: {
      duration: 1000, // Smooth animation for updates
      easing: "easeInOutQuad", // Smooth easing effect
    },
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: "white",
        },
      },
      tooltip: {
        mode: "index",
        intersect: false,
        callbacks: {
          label: function (context) {
            const value = context.raw;
            const datasetLabel = context.dataset.label;
            let status = "";
  
            if (datasetLabel === "Ammonia PPM") {
              status = getAmmoniaStatus(value);
            } else if (datasetLabel === "Rice Hulls Level") {
              status = getRiceHullsStatus(value);
            }
  
            return `${datasetLabel}: ${value} (${status})`;
          },
        },
      },
    },
    scales: {
      x: {
        type: "category", // Ensure the x-axis uses the "category" scale
        ticks: {
          color: "white",
        },
        grid: {
          color: "rgba(255, 255, 255, 0.1)",
        },
      },
      y: {
        ticks: {
          color: "white",
        },
        grid: {
          color: "rgba(255, 255, 255, 0.1)",
        },
      },
    },
  };
  
  const ammoniaChartData = {
    labels: timeLabels,
    datasets: [
      {
        label: "Ammonia PPM",
        data: ammoniaData,
        borderColor: "rgb(248, 229, 84)",
        backgroundColor: "rgba(248, 229, 84, 0.2)",
        tension: 0.4, // Smooth curve effect
        borderWidth: 2, // Make the line more visible
      },
    ],
  };
  
  const riceHullsChartData = {
    labels: timeLabels,
    datasets: [
      {
        label: "Rice Hulls Level",
        data: riceHullsData,
        borderColor: "rgb(84, 229, 248)",
        backgroundColor: "rgba(84, 229, 248, 0.2)",
        tension: 0.4, // Smooth curve effect
        borderWidth: 2, // Make the line more visible
      },
    ],
  };
  
  return (
    <div className="analytics-container">
      <h1 className="analytics-title">Real-Time Analytics</h1>
      <div className="chart-container">
        <div className="chart">
          <h2>Ammonia PPM</h2>
          <Line data={ammoniaChartData} options={chartOptions} />
        </div>
        <div className="chart">
          <h2>Rice Hulls Level</h2>
          <Line data={riceHullsChartData} options={chartOptions} />
        </div>
      </div>
      <div>
        <br />
        <br />
        <br />
        <p className="read-the-docs">
          🟢 Current Visitors: <VisitorCounter />
        </p>
      </div>
    </div>
  );
};

export default Analytics;