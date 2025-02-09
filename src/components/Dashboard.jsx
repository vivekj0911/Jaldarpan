import React, { useState, useEffect } from "react";
import {
    Chart as ChartJS,
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Tooltip,
    Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import "../index.css";

// Register necessary Chart.js components
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

const Dashboard = () => {
    const [selectedState, setSelectedState] = useState("Madhya Pradesh");
    const [selectedDistrict, setSelectedDistrict] = useState("Agarmalwa");
    const [selectedUID, setSelectedUID] = useState("CGWKOL0165");

    // Sample data arrays for different locations
    const dataByLocation = {
        "Madhya Pradesh": {
            "Agarmalwa": {
                "CGWKOL0165": {
                    battery: [3.59, 3.59, 3.64, 3.64, 3.64, 3.60],
                    waterLevel: [-5.28, -5.26, -5.27, -5.31, -5.32, -5.29],
                    temperature: [26.36, 26.36, 26.31, 26.33, 26.31, 26.38],
                    pressure: [957.99, 959.32, 960.14, 961.64, 958.99, 959.22],
                },
                "CGWKOL0166": {
                    battery: [3.58, 3.58, 3.62, 3.62, 3.62, 3.59],
                    waterLevel: [-5.30, -5.29, -5.30, -5.34, -5.35, -5.31],
                    temperature: [26.40, 26.40, 26.35, 26.37, 26.35, 26.42],
                    pressure: [958.00, 960.33, 961.15, 962.65, 959.00, 960.23],
                },
                "CGWKOL0167": {
                    battery: [3.60, 3.62, 3.63, 3.64, 3.61, 3.62],
                    waterLevel: [-5.25, -5.24, -5.23, -5.25, -5.27, -5.29],
                    temperature: [26.30, 26.31, 26.33, 26.35, 26.37, 26.39],
                    pressure: [957.00, 958.20, 959.10, 960.00, 961.10, 960.80],
                },
            },
        },
        "Rajasthan": {
            "Jaipur": {
                "RJUID1234": {
                    battery: [3.55, 3.55, 3.60, 3.60, 3.60, 3.56],
                    waterLevel: [-5.25, -5.24, -5.25, -5.29, -5.30, -5.26],
                    temperature: [26.20, 26.20, 26.15, 26.17, 26.15, 26.22],
                    pressure: [955.99, 957.32, 958.14, 959.64, 956.99, 957.22],
                },
                "RJUID1235": {
                    battery: [3.50, 3.51, 3.53, 3.54, 3.52, 3.51],
                    waterLevel: [-5.28, -5.26, -5.27, -5.29, -5.30, -5.31],
                    temperature: [26.10, 26.12, 26.14, 26.16, 26.17, 26.18],
                    pressure: [954.99, 955.32, 956.14, 957.64, 957.00, 956.80],
                },
            },
        },
        "Uttar Pradesh": {
            "Lucknow": {
                "UPUID6789": {
                    battery: [3.62, 3.63, 3.64, 3.65, 3.63, 3.64],
                    waterLevel: [-5.10, -5.12, -5.13, -5.14, -5.15, -5.17],
                    temperature: [25.90, 25.92, 25.93, 25.94, 25.95, 25.97],
                    pressure: [960.00, 961.10, 962.20, 963.30, 961.50, 962.40],
                },
            },
        },
    };


    // Generate chart data dynamically based on selection
    const generateChartData = (dataKey) => {
        const locationData =
            dataByLocation[selectedState]?.[selectedDistrict]?.[selectedUID] || {};
        return {
            labels: ["8-12", "9-12", "10-12", "11-12", "12-12", "13-12"],
            datasets: [
                {
                    label: dataKey,
                    data: locationData[dataKey] || [],
                    borderColor:
                        dataKey === "battery"
                            ? "#007bff"
                            : dataKey === "waterLevel"
                            ? "#28a745"
                            : dataKey === "temperature"
                            ? "#ff6347"
                            : "#ffc107",
                    backgroundColor:
                        dataKey === "battery"
                            ? "rgba(0, 123, 255, 0.2)"
                            : dataKey === "waterLevel"
                            ? "rgba(40, 167, 69, 0.2)"
                            : dataKey === "temperature"
                            ? "rgba(255, 99, 71, 0.2)"
                            : "rgba(255, 193, 7, 0.2)",
                    tension: 0.4,
                },
            ],
        };
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: true,
                position: "top",
            },
            tooltip: {
                enabled: true,
            },
        },
    };

    // Alert state and handler
    const [alertData, setAlertData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const [alertType, setAlertType] = useState("");
    const [duration, setDuration] = useState("");
    const [tableData, setTableData] = useState([]);
    const [isGenerated, setIsGenerated] = useState(false);

    const alertTypes = ["Low Battery", "High Water Level Alert", "Low Water Level Alert", "Rapid Change Alert"];
    const durationOptions = ["Daily", "Weekly", "Monthly"];

    useEffect(() => {
        // Fetch alert details from the backend
        fetch("http://localhost:5000/api/alert")
            .then((response) => response.json())
            .then((data) => {
                setAlertData(data);
                setIsLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching alert data:", error);
                setAlertData(null);
                setIsLoading(false);
            });
    }, []);

    const handleGenerate = () => {
        const mockTableData = [
            {
                srNo: 1,
                type: alertType,
                date: "2024-02-15",
                location: "Pimpri, Maharashtra",
                resolvedBy: "Vivek",
            },
            {
                srNo: 2,
                type: alertType,
                date: "2024-02-10",
                location: "Nashik, Maharashtra",
                resolvedBy: "Gayatri",
            },
        ];

        setTableData(mockTableData);
        setIsGenerated(true);
    };

    return (
        <div className="container mx-auto p-6 bg-background">
            {/* Filter Section */}
            <section className="my-4 mb-10">
                <div className="bg-white p-6 rounded-lg shadow-lg">
                    <h3 className="text-xl font-semibold text-primary font-nunito">Filters</h3>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
                        <div>
                            <label className="block mb-2 text-primary">State:</label>
                            <select
                                className="p-2 w-full border border-gray-300 rounded-md"
                                value={selectedState}
                                onChange={(e) => {
                                    setSelectedState(e.target.value);
                                    setSelectedDistrict(Object.keys(dataByLocation[e.target.value])[0]);
                                    setSelectedUID(Object.keys(dataByLocation[e.target.value]?.[Object.keys(dataByLocation[e.target.value])[0]])[0]);
                                }}
                            >
                                <option value="Madhya Pradesh">Madhya Pradesh</option>
                                <option value="Rajasthan">Rajasthan</option>
                                <option value="Uttar Pradesh">Uttar Pradesh</option>
                            </select>
                        </div>
                        <div>
                            <label className="block mb-2 text-primary">District:</label>
                            <select
                                className="p-2 w-full border border-gray-300 rounded-md"
                                value={selectedDistrict}
                                onChange={(e) => {
                                    setSelectedDistrict(e.target.value);
                                    setSelectedUID(Object.keys(dataByLocation[selectedState][e.target.value])[0]);
                                }}
                            >
                                {Object.keys(dataByLocation[selectedState] || {}).map((district) => (
                                    <option key={district} value={district}>
                                        {district}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block mb-2 text-primary">Telemetry UID:</label>
                            <select
                                className="p-2 w-full border border-gray-300 rounded-md"
                                value={selectedUID}
                                onChange={(e) => setSelectedUID(e.target.value)}
                            >
                                {Object.keys(dataByLocation[selectedState]?.[selectedDistrict] || {}).map((uid) => (
                                    <option key={uid} value={uid}>
                                        {uid}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
            </section>

            {/* Reading Section with 4 Charts */}
            <section className="graphs-section mb-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
                <div className="graph-container bg-white p-6 rounded-lg shadow-lg">
                    <h3 className="text-xl font-semibold text-primary mb-4 font-nunito">Battery</h3>
                    <Line data={generateChartData("battery")} options={options} />
                </div>
                <div className="graph-container bg-white p-6 rounded-lg shadow-lg">
                    <h3 className="text-xl font-semibold text-primary mb-4 font-nunito">Water Level</h3>
                    <Line data={generateChartData("waterLevel")} options={options} />
                </div>
                <div className="graph-container bg-white p-6 rounded-lg shadow-lg">
                    <h3 className="text-xl font-semibold text-primary mb-4 font-nunito">Temperature</h3>
                    <Line data={generateChartData("temperature")} options={options} />
                </div>
                <div className="graph-container bg-white p-6 rounded-lg shadow-lg">
                    <h3 className="text-xl font-semibold text-primary mb-4 font-nunito">Barometric Pressure</h3>
                    <Line data={generateChartData("pressure")} options={options} />
                </div>
            </section>

            {/* Alert Section */}
            <section className="alert-section mb-10">
                {/* Alert Type and Duration Selection */}
                <div className="flex flex-col sm:flex-row space-y-6 sm:space-y-0 sm:space-x-6 mb-8">
                    <div className="flex-1">
                        <label htmlFor="alertType" className="block text-lg font-semibold text-gray-800 mb-2">
                            Alert Type
                        </label>
                        <select
                            id="alertType"
                            value={alertType}
                            onChange={(e) => setAlertType(e.target.value)}
                            className="w-full p-3 border-2 border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary transition duration-300 text-gray-700"
                        >
                            <option value="">Select Alert Type</option>
                            {alertTypes.map((type) => (
                                <option key={type} value={type}>{type}</option>
                            ))}
                        </select>
                    </div>

                    <div className="flex-1">
                        <label htmlFor="duration" className="block text-lg font-semibold text-gray-800 mb-2">
                            Duration
                        </label>
                        <select
                            id="duration"
                            value={duration}
                            onChange={(e) => setDuration(e.target.value)}
                            className="w-full p-3 border-2 border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary transition duration-300 text-gray-700"
                        >
                            <option value="">Select Duration</option>
                            {durationOptions.map((dur) => (
                                <option key={dur} value={dur}>{dur}</option>
                            ))}
                        </select>
                    </div>

                    <div className="flex items-end sm:w-auto">
                        <button
                            onClick={handleGenerate}
                            disabled={!alertType || !duration}
                            className={`px-6 py-3 rounded-lg text-white ${alertType && duration ? "bg-primary hover:bg-secondary" : "bg-gray-400 cursor-not-allowed"} transition duration-300`}
                        >
                            Generate
                        </button>
                    </div>
                </div>

                {/* Table Section */}
                <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-primary text-white">
                            <tr>
                                <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">Sr No.</th>
                                <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">Type</th>
                                <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">Date</th>
                                <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">Location</th>
                                <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">Resolved By</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {isGenerated && tableData.map((row) => (
                                <tr key={row.srNo} className="hover:bg-gray-100 transition">
                                    <td className="px-6 py-4 text-sm font-medium text-gray-800">{row.srNo}</td>
                                    <td className="px-6 py-4 text-sm text-gray-800">{row.type}</td>
                                    <td className="px-6 py-4 text-sm text-gray-800">{row.date}</td>
                                    <td className="px-6 py-4 text-sm text-gray-800">{row.location}</td>
                                    <td className="px-6 py-4 text-sm text-gray-800">{row.resolvedBy}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>
        </div>
    );
};

export default Dashboard;
