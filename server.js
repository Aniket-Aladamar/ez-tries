const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '.')));

// Endpoint to handle form submission
app.post('/signup', (req, res) => {
    const { fullName, email, password, rememberMe } = req.body;

    // Read the existing data from data.json
    fs.readFile('data.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ success: false, message: 'Error reading data file' });
        }

        const users = JSON.parse(data);
        users.push({ fullName, email, password, rememberMe });

        // Write the updated data back to data.json
        fs.writeFile('data.json', JSON.stringify(users, null, 2), (err) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ success: false, message: 'Error writing data file' });
            }

            res.json({ success: true });
        });
    });
});

// Endpoint to handle login requests
app.post('/login', (req, res) => {
    const { email, password } = req.body;

    // Read the existing data from data.json
    fs.readFile('data.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ success: false, message: 'Error reading data file' });
        }

        const users = JSON.parse(data);
        const user = users.find(user => user.email === email && user.password === password);

        if (user) {
            res.json({ success: true, message: 'Login successful' });
        } else {
            res.json({ success: false, message: 'Invalid email or password' });
        }
    });
});

// Endpoint to retrieve all users (for testing purposes)
app.get('/users', (req, res) => {
    fs.readFile('data.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ success: false, message: 'Error reading data file' });
        }

        res.json(JSON.parse(data));
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
