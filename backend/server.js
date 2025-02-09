const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs').promises;
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// File paths
const alertFilePath = path.join(__dirname, 'alert.json');
const userFilePath = path.join(__dirname, 'users.json');

// Utility functions
async function readFile(filePath) {
  try {
    const data = await fs.readFile(filePath, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    if (err.code === 'ENOENT') {
      return []; // Return empty array if file doesn't exist
    }
    throw err;
  }
}

async function writeFile(filePath, data) {
  await fs.writeFile(filePath, JSON.stringify(data, null, 2));
}

// Alert Endpoint (POST)
app.post('/api/alert', async (req, res) => {
  try {
    const { alert, telemetryUID, district, tahsil, village, latitude, longitude } = req.body;

    if (typeof alert !== 'boolean' || !latitude || !longitude) {
      return res.status(400).json({ message: 'Invalid data. Ensure all fields are provided.' });
    }

    const alertData = {
      alert,
      telemetryUID,
      district,
      tahsil,
      village,
      latitude,
      longitude,
    };

    await writeFile(alertFilePath, alertData);
    res.status(200).json({ message: 'Alert status updated successfully.' });
  } catch (error) {
    console.error('Error updating alert status:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
});

// Alert Endpoint (GET)
app.get('/api/alert', async (req, res) => {
  try {
    const alertData = await readFile(alertFilePath);
    res.status(200).json(alertData);
  } catch (error) {
    console.error('Error fetching alert status:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
});

// Sign-Up Endpoint
app.post('/api/signup', async (req, res) => {
  try {
    const { employee_id, role, location, email, password, phone } = req.body;

    // Validate required fields
    if (!employee_id || !role || !location || !email || !password || !phone) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    // Read existing users
    let users = [];
    try {
      const data = await fs.readFile(userFilePath, 'utf8');
      users = JSON.parse(data);
    } catch (err) {
      if (err.code !== 'ENOENT') throw err;
    }

    // Check if the email is already registered
    if (users.some((user) => user.email === email)) {
      return res.status(400).json({ message: 'Email already exists.' });
    }

    // Add the new user
    const newUser = { employee_id, role, location, email, password, phone };
    users.push(newUser);

    // Save users back to the file
    await writeFile(userFilePath, users);

    res.status(201).json({ message: 'User registered successfully.', user: newUser });
  } catch (error) {
    console.error('Error during sign up:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
});

// Login Endpoint
app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate required fields
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required.' });
    }

    // Read existing users
    let users = [];
    try {
      const data = await fs.readFile(userFilePath, 'utf8');
      users = JSON.parse(data);
    } catch (err) {
      if (err.code !== 'ENOENT') throw err;
    }

    // Check if user exists
    const user = users.find((u) => u.email === email && u.password === password);

    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    res.status(200).json({ message: 'Login successful.', user });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
