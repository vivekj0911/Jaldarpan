import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = './gov_water_req.csv';
    link.download = 'gov_water_req.csv';
    link.click();
    window.location.reload();
  };

  return (
    <header className="bg-background text-text shadow-md font-nunito">
      <div className="bg-cyan-700 py-3">
        <ul className="flex justify-between items-center space-x-6">
          <li className="flex items-center space-x-2">
            <img
              alt="emblem logo"
              className="h-12"
              src="https://indiawris.gov.in/wris/assets/images/emblem-dark.png"
            />
            <a
              href="http://nwic.gov.in/"
              target="_blank"
              className="hover:text-cyan-300 text-white text-s"
              title="राष्ट्रीय जल सुचना-विज्ञान केंद्र"
            >
              <span lang="hi" className="block">राष्ट्रीय जल सुचना-विज्ञान केंद्र</span>
              <span className="block">NATIONAL WATER INFORMATICS CENTRE</span>
            </a>
          </li>
          <li className="flex space-x-6">
            <a
              href="https://india.gov.in/hi/"
              target="_blank"
              className="ministry text-s text-white hover:text-cyan-300"
              title="भारत सरकार"
            >
              <span lang="hi" className="block">भारत सरकार</span>
              <span className="block">GOVERNMENT OF INDIA</span>
            </a>
            <a
              href="http://mowr.gov.in/"
              target="_blank"
              className="ministry text-s text-white hover:text-cyan-300"
              title="जल शक्ति मंत्रालय"
            >
              <span lang="hi" className="block">जल शक्ति मंत्रालय</span>
              <span className="block">MINISTRY OF JAL SHAKTI</span>
            </a>
          </li>
        </ul>
      </div>

      <nav className="container w-full flex items-center justify-between p-2">
        <div className="flex items-center space-x-4">
          <img src={logo} alt="Logo" className="h-10 w-10" />
          <h1 className="text-2xl font-bold text-primary">JalDarpan</h1>
        </div>

        <div
          className={`fixed top-0 right-0 z-20 h-screen w-2/3 bg-background shadow-lg transform ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform md:relative md:h-auto md:w-auto md:shadow-none md:translate-x-0`}
        >
          <div className="flex flex-col items-center justify-center space-y-6 p-6 md:flex-row md:space-y-0 md:space-x-6">
            <Link to="/" className="hover:text-primary" onClick={() => setIsMenuOpen(false)}>Home</Link>
            <Link to="/services" className="hover:text-primary" onClick={() => setIsMenuOpen(false)}>Services</Link>
            <Link to="/dashboard" className="hover:text-primary" onClick={() => setIsMenuOpen(false)}>Dashboard</Link>
            <Link to="/alert" className="hover:text-primary" onClick={() => setIsMenuOpen(false)}>Alert</Link>

            <div className="relative">
              <button
                className="hover:text-primary flex items-center space-x-1"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                <span>Data Download</span>
                <i className="bx bx-chevron-down ml-2"></i>
              </button>
              {isDropdownOpen && (
                <div className="absolute mt-2 w-48 bg-white shadow-lg rounded-md z-10">
                  <button
                    className="block w-full text-left px-4 py-2 text-text hover:bg-gray-200"
                    onClick={handleDownload}
                  >
                    Madhya Pradesh
                  </button>
                </div>
              )}
            </div>

            <div className="flex space-x-4">
              {!isLoggedIn ? (
                <Link to="/login" className="flex items-center space-x-1 text-secondary hover:text-primary">
                  <i className="bx bx-log-in"></i> <span>Login</span>
                </Link>
              ) : (
                <div className="flex items-center space-x-2">
                  <i className="bx bx-user-circle text-2xl text-primary"></i>
                  <button className="text-secondary hover:text-primary" onClick={handleLogout}>Logout</button>
                </div>
              )}
            </div>
          </div>
        </div>

        <button
          className={`z-30 flex flex-col items-center justify-center space-y-1 md:hidden ${isMenuOpen ? 'text-primary' : 'text-text'}`}
          onClick={toggleMenu}
        >
          <span className="block h-1 w-6 bg-current"></span>
          <span className="block h-1 w-6 bg-current"></span>
          <span className="block h-1 w-6 bg-current"></span>
        </button>
      </nav>
    </header>
  );
};

export default Navbar;
