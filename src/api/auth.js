import axios from 'axios';

// Base API URL (modify if your backend runs on a different host or port)
const API_URL = 'http://localhost:5000/api';

// Signup API call
export const signUp = async (userData) => {
    const response = await axios.post(`${API_URL}/signup`, userData);
    return response.data;
};

// Login API call
export const login = async (credentials) => {
    const response = await axios.post(`${API_URL}/login`, credentials);
    return response.data;
};
