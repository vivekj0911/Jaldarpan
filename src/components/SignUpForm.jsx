import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signUp } from '../api/auth';

const SignUpForm = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        employee_id: '',
        role: '',
        location: '',
        email: '',
        password: '',
        phone: '',
    });

    const [message, setMessage] = useState(null);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await signUp(formData);
            setMessage({ type: 'success', text: response.message });
            console.log('User registered successfully:', response.user);
            
            // Redirect to LoginForm component after successful signup
            navigate('/login', { 
                state: { 
                    successMessage: 'Account created successfully. Please log in.' 
                } 
            });
        } catch (error) {
            if (error.response) {
                // Handle server error response
                setMessage({ type: 'error', text: error.response.data.message });
                console.error('Error:', error.response.data);
            } else {
                console.error('Error:', error.message);
                setMessage({ type: 'error', text: 'An unexpected error occurred.' });
            }
        }
    };

    return (
        <div className="space-y-4 max-w-md mx-auto">
            <h2 className="text-2xl font-semibold text-center">Sign Up</h2>
            {message && (
                <p
                    style={{
                        color: message.type === 'success' ? 'green' : 'red',
                        textAlign: 'center',
                    }}
                >
                    {message.text}
                </p>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                    <label htmlFor="employee_id" className="block text-sm font-medium text-gray-700">Employee ID</label>
                    <input
                        id="employee_id"
                        name="employee_id"
                        type="text"
                        required
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                        value={formData.employee_id}
                        onChange={handleChange}
                    />
                </div>
                <div className="space-y-2">
                    <label htmlFor="role" className="block text-sm font-medium text-gray-700">Role</label>
                    <select
                        id="role"
                        name="role"
                        required
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                        value={formData.role}
                        onChange={handleChange}
                    >
                        <option value="">Select a role</option>
                        <option value="admin">Admin</option>
                        <option value="technician">Technician</option>
                        <option value="analyst">Analyst</option>
                    </select>
                </div>
                <div className="space-y-2">
                    <label htmlFor="location" className="block text-sm font-medium text-gray-700">Location</label>
                    <input
                        id="location"
                        name="location"
                        type="text"
                        required
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                        value={formData.location}
                        onChange={handleChange}
                    />
                </div>
                <div className="space-y-2">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                        value={formData.email}
                        onChange={handleChange}
                    />
                </div>
                <div className="space-y-2">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        required
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                        value={formData.password}
                        onChange={handleChange}
                    />
                </div>
                <div className="space-y-2">
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number</label>
                    <input
                        id="phone"
                        name="phone"
                        type="tel"
                        required
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                        value={formData.phone}
                        onChange={handleChange}
                    />
                </div>
                <button
                    type="submit"
                    className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-cyan-700 hover:bg-cyan-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                    Sign Up
                </button>
            </form>
        </div>
    );
};

export default SignUpForm;