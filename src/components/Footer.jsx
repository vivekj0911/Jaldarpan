import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-primary text-white py-10">
            <div className="container mx-auto px-6 md:flex md:justify-between md:items-start gap-8">
                {/* About Us Section */}
                <div className="mb-8 md:mb-0">
                    <h4 className="text-lg font-semibold text-white mb-4">About Us</h4>
                    <p className="leading-relaxed">
                        We provide innovative solutions for groundwater monitoring, ensuring sustainable water management for future generations.
                    </p>
                </div>

                {/* Support Section */}
                <div className="mb-8 md:mb-0">
                    <h4 className="text-lg font-semibold text-white mb-4">Support</h4>
                    <ul className="space-y-2">
                        <li>
                            <a href="/faqs" className="hover:text-secondary transition duration-300">
                                FAQs
                            </a>
                        </li>
                        <li>
                            <a href="/docs" className="hover:text-secondary transition duration-300">
                                Documentation
                            </a>
                        </li>
                        <li>
                            <a href="/api" className="hover:text-secondary transition duration-300">
                                API
                            </a>
                        </li>
                    </ul>
                </div>

                {/* Follow Us Section */}
                <div>
                    <h4 className="text-lg font-semibold text-white mb-4">Follow Us</h4>
                    <div className="flex space-x-4">
                        <a
                            href="https://facebook.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xl text-white hover:text-secondary transition duration-300"
                        >
                            <i className="fab fa-facebook"></i>
                        </a>
                        <a
                            href="https://twitter.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xl text-white hover:text-secondary transition duration-300"
                        >
                            <i className="fab fa-twitter"></i>
                        </a>
                        <a
                            href="https://linkedin.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xl text-white hover:text-secondary transition duration-300"
                        >
                            <i className="fab fa-linkedin"></i>
                        </a>
                        <a
                            href="https://github.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xl text-white hover:text-secondary transition duration-300"
                        >
                            <i className="fab fa-github"></i>
                        </a>
                    </div>
                </div>
            </div>

            {/* Footer Bottom */}
            <div className="border-t border-gray-300 mt-5 pt-3 text-center text-sm">
                <p>&copy; 2024 Jaldarpan. All Rights Reserved.</p>
                <p>
                    <a href="/privacy-policy" className="hover:text-secondary transition duration-300">
                        Privacy Policy
                    </a>{' '}
                    |{' '}
                    <a href="/terms" className="hover:text-secondary transition duration-300">
                        Terms of Service
                    </a>
                </p>
            </div>
        </footer>
    );
};

export default Footer;
