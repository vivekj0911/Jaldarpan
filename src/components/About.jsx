import React from 'react';

const About = () => {
    return (
        <section className="bg-gradient-to-r from-background to-cyan-100 py-20 font-nunito">
            <div className="max-w-6xl mx-auto px-6">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-primary">Why Choose Us</h1>
                </div>
                
                {/* Cards */}
                <div className="flex flex-col md:flex-row justify-between gap-8">
                    {/* Card 1 */}
                    <div className="bg-white bg-opacity-90 rounded-xl p-6 shadow-lg border-2 border-transparent hover:border-secondary hover:shadow-2xl transition-transform transform hover:-translate-y-3 flex-1">
                        <div className="text-secondary text-5xl mb-4 text-center">
                            <i className="bx bx-shield-alt-2"></i>
                        </div>
                        <h3 className="text-xl font-semibold text-primary text-center mb-4">Dedicated Issue Management Portal</h3>
                        <p className="text-text text-center leading-relaxed">
                            Our platform goes beyond standard data collection by offering precision analysis and proactive alerts, ensuring that no issue goes unnoticed. We streamline monitoring and troubleshooting, reducing downtime and improving resource management efficiency.
                        </p>
                    </div>

                    {/* Card 2 */}
                    <div className="bg-white bg-opacity-90 rounded-xl p-6 shadow-lg border-2 border-transparent hover:border-secondary hover:shadow-2xl transition-transform transform hover:-translate-y-3 flex-1">
                        <div className="text-secondary text-5xl mb-4 text-center">
                            <i className="bx bx-user-check"></i>
                        </div>
                        <h3 className="text-xl font-semibold text-primary text-center mb-4">User-Centric Design and Easy Navigation</h3>
                        <p className="text-text text-center leading-relaxed">
                            Designed with simplicity and functionality in mind, our platform allows personnel to access, interpret, and act on data quickly. Whether it's tracking issues or analyzing groundwater trends, our user-friendly interface empowers you to manage tasks effortlessly.
                        </p>
                    </div>

                    {/* Card 3 */}
                    <div className="bg-white bg-opacity-90 rounded-xl p-6 shadow-lg border-2 border-transparent hover:border-secondary hover:shadow-2xl transition-transform transform hover:-translate-y-3 flex-1">
                        <div className="text-secondary text-5xl mb-4 text-center">
                            <i className="bx bx-code-alt"></i>
                        </div>
                        <h3 className="text-xl font-semibold text-primary text-center mb-4">Comprehensive Support and Continuous Improvement</h3>
                        <p className="text-text text-center leading-relaxed">
                            Our platform is backed by dedicated support and a commitment to continuous improvement. We provide ongoing assistance and continuous training of models which help ensure that the system evolves with your needs, enhancing functionality and addressing emerging challenges.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
