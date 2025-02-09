import React from 'react';
import '../index.css';

const Services = () => {
    const services = [
        {
            title: 'Tailored Models for Accurate Data Insights',
            description:
                'We create custom models for each location to ensure the data is highly accurate and relevant. By adapting analysis to specific conditions, we provide precise insights for better management.',
            img: './src/assets/logo3.jpg',
            reverse: false,
        },
        {
            title: 'Automated Alerts and Notifications',
            description:
                'The system sends alerts to officers and vendors when critical issues are detected, ensuring continuous monitoring of groundwater resources.',
            img: './src/assets/logo1.jpg',
            reverse: true,
        },
        {
            title: 'Issue Tracking and Resolution System',
            description:
                'A dedicated portal for managing issues ensures transparency and accountability with unique IDs assigned to each problem.',
            img: './src/assets/logo2.png',
            reverse: false,
        },
    ];

    return (
        <section id="services" className="py-16 bg-gray-100">
            {/* Title Section */}
            <div className="text-center mb-12">
                <h1 className="text-4xl font-semibold text-primary">What We Provide</h1>
            </div>

            {/* Service Sections */}
            <div className="max-w-screen-xl mx-auto space-y-16">
                {services.map((service, index) => (
                    <div
                        key={index}
                        className={`flex flex-col md:flex-row ${
                            service.reverse ? 'md:flex-row-reverse' : ''
                        } items-center gap-12 bg-white rounded-lg shadow-lg p-6`}
                    >
                        {/* Image */}
                        <div className="md:w-1/2 w-full">
                            <img
                                src={service.img}
                                alt={service.title}
                                className="w-full h-72 object-contain rounded-lg shadow-md transform hover:scale-105 transition duration-300"
                            />
                        </div>

                        {/* Text */}
                        <div className="md:w-1/2 w-full text-center md:text-left">
                            <h3 className="text-2xl font-semibold text-primary mb-4">
                                {service.title}
                            </h3>
                            <p className="text-text text-lg leading-relaxed">
                                {service.description}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Services;
