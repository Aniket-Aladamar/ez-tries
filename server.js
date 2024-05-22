const express = require('express');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');
const path = require('path');

const app = express();
const PORT = 3000;

const DATA_URL = 'https://raw.githubusercontent.com/Aniket-Aladamar/ez-tries/main/data.json';

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '.')));

// Function to fetch user data from GitHub
const fetchUserData = async () => {
    try {
        const response = await fetch(DATA_URL);
        if (!response.ok) throw new Error('Network response was not ok');
        return await response.json();
    } catch (error) {
        console.error('Error fetching user data:', error);
        throw error;
    }
};

// Endpoint to handle form submission
app.post('/signup', async (req, res) => {
    const { fullName, email, password, rememberMe } = req.body;

    try {
        const users = await fetchUserData();
        users.push({ fullName, email, password, rememberMe });

        // Here you should normally save the updated users array back to the GitHub repository.
        // Since GitHub raw URLs are read-only, we'll just respond with success for demonstration purposes.
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error handling signup' });
    }
});

// Endpoint to handle login requests
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const users = await fetchUserData();
        const user = users.find(user => user.email === email && user.password === password);

        if (user) {
            res.json({ success: true, message: 'Login successful' });
        } else {
            res.json({ success: false, message: 'Invalid email or password' });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error handling login' });
    }
});

// Endpoint to retrieve all users (for testing purposes)
app.get('/users', async (req, res) => {
    try {
        const users = await fetchUserData();
        res.json(users);
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error fetching users' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
