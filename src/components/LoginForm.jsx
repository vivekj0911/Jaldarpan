import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

function LoginForm() {
  const location = useLocation();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  // Check for success message from signup
  useEffect(() => {
    if (location.state && location.state.successMessage) {
      setSuccessMessage(location.state.successMessage);
      // Clear the state to prevent message from reappearing
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await axios.post('http://localhost:5001/api/login', formData);
      
      // If login is successful
      const { token } = response.data;
      
      // Store the token in localStorage
      localStorage.setItem('userToken', token);

      // Redirect to dashboard or home page
      navigate('/');
    } catch (err) {
      // Handle login error
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    }
  };

  return (
    <div className="space-y-4 max-w-md mx-auto">
      <h2 className="text-2xl font-semibold text-center">Login</h2>
      
      {/* Display success message if exists */}
      {successMessage && (
        <p className="text-green-600 text-center mb-4">
          {successMessage}
        </p>
      )}

      {/* Display error message if exists */}
      {error && (
        <p className="text-red-500 text-center mb-4">
          {error}
        </p>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="login-email" className="block text-sm font-medium text-gray-700">Email</label>
          <input
            id="login-email"
            name="email"
            type="email"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="login-password" className="block text-sm font-medium text-gray-700">Password</label>
          <input
            id="login-password"
            name="password"
            type="password"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <button 
          type="submit" 
          className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-cyan-700 hover:bg-cyan-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Log In
        </button>
        
        {/* Optional: Add a link to signup page */}
        <div className="text-center mt-4">
          <p className="text-sm text-gray-600">
            Don't have an account? 
            <span 
              onClick={() => navigate('/signup')} 
              className="ml-1 text-cyan-700 hover:underline cursor-pointer"
            >
              Sign Up
            </span>
          </p>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;