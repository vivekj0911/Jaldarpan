import React, { useState, useEffect } from 'react';
import '../index.css';
import About from './About';
import Description from './Description';
import bgImage from '../assets/bg.jpg';

const Home = () => {
    const [alert, setAlert] = useState(false); // State to manage alert visibility

    useEffect(() => {
        // Fetch alert status from the server
        const fetchAlertStatus = async () => {
            try {
                const response = await fetch('http://localhost:5001/api/alert');
                const data = await response.json();
                setAlert(data.alert); // Update the state with the fetched alert value
            } catch (error) {
                console.error('Error fetching alert status:', error);
            }
        };

        fetchAlertStatus();

        // Polling to keep the alert status updated
        const intervalId = setInterval(fetchAlertStatus, 5001); // Update every 5 seconds
        return () => clearInterval(intervalId);
    }, []);

    return (
        <>
            {/* Hero Section */}
            <section
                className="relative h-screen bg-cover bg-center"
                id="home"
                style={{ backgroundImage: `url(${bgImage})`}}
            >
                <div className="flex flex-col justify-center items-center h-full z-10 relative text-center px-6">
                    {/* Hero Title */}
                    <div className="mb-6">
                        <h1 className="text-6xl md:text-7xl lg:text-8xl font-extrabold text-primary drop-shadow-lg">
                            Jaldarpan
                        </h1>
                    </div>
                    {/* Hero Subtitle */}
                    <div>
                        <h3 className="text-2xl md:text-3xl lg:text-4xl text-secondary font-medium drop-shadow-sm">
                            Real-Time Insights and Alerts
                        </h3>
                    </div>
                </div>
            </section>
            {/* Additional Sections */}
            <Description />
            <About />

            {/* Alert Popup */}
            {alert && (
                <div
                    className="fixed bottom-8 right-8 bg-red-500 text-white px-6 py-4 rounded-lg shadow-lg animate-bounce transform transition-transform duration-500 hover:scale-105"
                >
                    <p className="text-lg font-bold">Critical Alert: Immediate Attention Required!</p>
                    <p className="mt-2 text-sm">Please take the necessary actions to resolve the issue.</p>
                </div>
            )}
        </>
    );
};

export default Home;
