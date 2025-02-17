import React from 'react';
import bgimg from '../assets/bg.jpg'

const Description = () => {
    return (
        <section className="bg-background py-16 mx-auto font-nunito">
            <div className="container mx-auto flex flex-col md:flex-row items-center gap-8 px-6">
                {/* Left Section */}
                <div className="md:w-1/2 space-y-6">
                    <div className="text-text text-lg leading-relaxed">
                        <p>
                            The platform is designed to streamline the monitoring and analysis of groundwater levels across the
                            country. With the installation of 14,000 Digital Water Level Recorders (DWLRs) by 2026, the Central
                            Ground Water Board (CGWB) will generate millions of data points annually. Our solution offers a
                            seamless way to collect, analyze, and report on this data, ensuring timely action when anomalies are
                            detected.
                        </p>
                        <br />
                        <p>
                            From tracking water levels in real-time to flagging issues such as no data, abnormal readings, or low
                            battery levels, our platform provides essential insights at your fingertips. Detailed graphs offer
                            daily, monthly, and yearly trends for selected locations, while water quality assessments help guide
                            sustainable usage. Our dedicated issue-tracking system allows authorized personnel to log, manage,
                            and resolve problems efficiently, with each issue linked to a unique ID for accountability.
                        </p>
                    </div>

                    {/* GitHub Button */}
                    <button
                        className="flex items-center gap-2 bg-primary text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-secondary transition duration-300"
                        onClick={() => window.open('https://github.com', '_blank')}
                        aria-label="GitHub repository"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="w-6 h-6"
                        >
                            <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.167 6.839 9.489.5.092.683-.217.683-.482 0-.237-.008-.868-.013-1.704-2.782.604-3.369-1.342-3.369-1.342-.455-1.157-1.11-1.465-1.11-1.465-.908-.62.069-.607.069-.607 1.004.07 1.532 1.032 1.532 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.635-1.338-2.22-.253-4.555-1.112-4.555-4.945 0-1.092.39-1.985 1.029-2.682-.103-.253-.447-1.27.098-2.647 0 0 .841-.27 2.75 1.025a9.564 9.564 0 012.5-.336c.847.004 1.701.114 2.5.336 1.909-1.296 2.75-1.025 2.75-1.025.545 1.377.201 2.394.099 2.647.64.697 1.028 1.59 1.028 2.682 0 3.841-2.337 4.688-4.565 4.937.359.309.678.918.678 1.852 0 1.337-.012 2.419-.012 2.747 0 .268.18.58.688.482C19.135 20.165 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                        </svg>
                        GitHub
                    </button>
                </div>

                {/* Right Section */}
                <div className="md:w-1/2">
                    <img
                        src={bgimg}
                        alt="Groundwater monitoring platform"
                        className="rounded-lg shadow-md"
                    />
                </div>
            </div>
        </section>
    );
};

export default Description;
