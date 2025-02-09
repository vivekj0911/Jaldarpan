import React, { useEffect } from "react";
import { Pie, Bar } from "react-chartjs-2";
import "leaflet/dist/leaflet.css";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement, // Import ArcElement for pie charts
  Tooltip,
  Legend
} from "chart.js";

// Register the components with ChartJS
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement, // Register BarElement for bar charts
  ArcElement, // Register ArcElement for pie charts
  Tooltip,
  Legend
);

const Alert = () => {
  // Data for pie charts
  const pieDataStations = {
    labels: ["Working Stations", "Anomalous Stations"],
    datasets: [
      {
        data: [150, 50],
        backgroundColor: ["#4CAF50", "#FF5722"], // green and red for active/inactive
      },
    ],
  };

  const pieDataMonitoring = {
    labels: ["Active Monitoring", "Inactive Monitoring"],
    datasets: [
      {
        data: [130, 70],
        backgroundColor: ["#2196F3", "#FFC107"], // blue and yellow for active/inactive
      },
    ],
  };

  // Data for min and max water pressure in the same bar graph
  const barDataPressure = {
    labels: ["Level 1", "Level 2", "Level 3", "Level 4", "Level 5"],
    datasets: [
      {
        label: "Max Water Pressure",
        data: [120, 140, 160, 180, 200],
        backgroundColor: "#007BFF", // Blue for max pressure
        barThickness: 16,
        categoryPercentage: 0.5, // Space between the bars
      },
      {
        label: "Min Water Pressure",
        data: [50, 60, 70, 80, 90],
        backgroundColor: "#4CAF50", // Green for min pressure
        barThickness: 16,
        categoryPercentage: 0.5, // Space between the bars
      },
    ],
  };

  // Generate more locations with random error flags
  const generateLocations = () => {
    const cities = [
      { name: "Mumbai", lat: 19.076, lng: 72.8777 },
      { name: "Delhi", lat: 28.7041, lng: 77.1025 },
      { name: "Bangalore", lat: 12.9716, lng: 77.5946 },
      { name: "Kolkata", lat: 22.5726, lng: 88.3639 },
      { name: "Chennai", lat: 13.0827, lng: 80.2707 },
      { name: "Hyderabad", lat: 17.385044, lng: 78.486671 },
      { name: "Pune", lat: 18.5204, lng: 73.8567 },
      { name: "Ahmedabad", lat: 23.0225, lng: 72.5714 },
      { name: "Jaipur", lat: 26.9124, lng: 75.7873 },
      { name: "Lucknow", lat: 26.8467, lng: 80.9462 },
      { name: "Indore", lat: 22.7196, lng: 75.8577 },
      { name: "Nagpur", lat: 21.1458, lng: 79.0882 },
      { name: "Visakhapatnam", lat: 17.6869, lng: 83.2185 },
      { name: "Surat", lat: 21.1702, lng: 72.8311 },
      { name: "Madurai", lat: 9.9250, lng: 78.1193 },
      { name: "Vadodara", lat: 22.3072, lng: 73.1812 },
      { name: "Bhopal", lat: 23.2599, lng: 77.4126 },
      { name: "Nashik", lat: 19.9975, lng: 73.7898 },
      { name: "Mysore", lat: 12.2958, lng: 76.6394 },
      { name: "Rajkot", lat: 22.3039, lng: 70.8022 },
    ];

    // Add 40 locations (including random error flags)
    const locations = [];
    for (let i = 0; i < 40; i++) {
      const city = cities[i % cities.length]; // Loop through cities if needed
      locations.push({
        ...city,
        error: Math.random() < 0.2, // 20% red markers, 80% green markers
      });
    }
    return locations;
  };

  const locations = generateLocations(); // Get 40 random locations

  useEffect(() => {
    // Initialize Google Map
    const initMap = () => {
      const indiaCenter = { lat: 20.5937, lng: 78.9629 };

      const map = new window.google.maps.Map(document.getElementById("google-map"), {
        zoom: 5, // Zoom level for India
        center: indiaCenter, // Center the map on India
      });

      // Loop through locations and add markers
      locations.forEach((loc) => {
        new window.google.maps.Marker({
          position: { lat: loc.lat, lng: loc.lng },
          map: map,
          title: loc.name,
          icon: loc.error
            ? "http://maps.google.com/mapfiles/ms/icons/red-dot.png"
            : "http://maps.google.com/mapfiles/ms/icons/green-dot.png", // Green for non-error
        });
      });
    };

    // Load Google Maps script
    const script = document.createElement("script");
    script.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyB43XhS3LwqsdvB0J4GeHM7PY77PddzEcQ&callback=initMap";
    script.async = true;
    script.defer = true;
    window.initMap = initMap;
    document.head.appendChild(script);

    return () => {
      // Cleanup Google Maps script when component unmounts
      document.head.removeChild(script);
    };
  }, [locations]);

  return (
    <div className="flex h-screen bg-cyan-100 font-sans">
      {/* Left Side - Google Map (Slightly decreased width, now 60%) */}
      <div className="w-3/5 h-full border-r-4 border-white shadow-lg">
        <div
          id="google-map"
          style={{ height: "100%", width: "100%" }}
        ></div>
      </div>

      {/* Right Side - Charts and Graphs */}
      <div className="w-2/5 h-full p-6 space-y-8 flex flex-col overflow-auto">
        {/* Title Section */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 text-center leading-tight">
             INDIA - Station & Monitoring
          </h1>
        </div>

        {/* Station and Monitoring Stats */}
        <div className="grid grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-xl hover:shadow-2xl transition duration-300 p-4 text-center h-24 flex flex-col justify-between">
            <h2 className="text-lg font-semibold text-gray-700">Total Stations</h2>
            <p className="text-xl font-bold text-blue-600">200</p>
          </div>
          <div className="bg-white rounded-lg shadow-xl hover:shadow-2xl transition duration-300 p-4 text-center h-24 flex flex-col justify-between">
            <h2 className="text-lg font-semibold text-gray-700">Total Monitoring</h2>
            <p className="text-xl font-bold text-green-600">180</p>
          </div>
        </div>

        {/* Pie Charts */}
        <div className="grid grid-cols-2 gap-6 mb-8 flex-grow">
          <div className="bg-white rounded-lg shadow-xl hover:shadow-2xl transition duration-300 p-4 flex items-center justify-center h-48">
            <h3 className="text-lg font-semibold text-center text-gray-800 mb-4">Station Status</h3>
            <Pie data={pieDataStations} />
          </div>
          <div className="bg-white rounded-lg shadow-xl hover:shadow-2xl transition duration-300 p-4 flex items-center justify-center h-48">
            <h3 className="text-lg font-semibold text-center text-gray-800 mb-4">Monitoring Status</h3>
            <Pie data={pieDataMonitoring} />
          </div>
        </div>

        {/* Bar Graph for Min and Max Water Pressure */}
        <div className="bg-white rounded-lg shadow-xl hover:shadow-2xl transition duration-300 p-12 flex items-center justify-center mb-8">
          <h3 className="text-lg font-semibold text-center text-gray-800 mb-4">Water Pressure (Max & Min)</h3>
          <Bar data={barDataPressure} />
        </div>
      </div>
    </div>
  );
};

export default Alert;
