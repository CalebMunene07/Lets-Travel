const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const { Pool } = require('pg');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// PostgreSQL connection
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false,
    },
});

// Serve static files (CSS, JS) from the root directory
app.use(express.static(path.join(__dirname, '../')));

// Serve index.html from the root folder
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../index.html'));
});

// Serve data.html from the root folder
app.get('/data', (req, res) => {
    res.sendFile(path.join(__dirname, '../data.html'));
});

// API to fetch data from the database
app.get('/api/reservations', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM reservation');
        res.json(result.rows); // Send the data as JSON
    } catch (error) {
        console.error('Error fetching reservations:', error);
        res.status(500).json({ error: 'Failed to fetch reservations.' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});