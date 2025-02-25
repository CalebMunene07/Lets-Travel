const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');  // Import path module
const { Pool } = require('pg');

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files (if needed)
app.use(express.static(path.join(__dirname, 'public'))); // Ensure you have a "public" folder

// PostgreSQL connection
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'Booking',
    password: '@Kalib07',
    port: 5432,
});

// Default route to prevent "Cannot GET /" error
app.get('/', (req, res) => {
    res.send('Welcome to the Reservation API!');
});

// Serve data.html if you want a webpage instead of a text response
app.get('/data', (req, res) => {
    res.sendFile(path.join(__dirname, 'data.html'));
});

// API endpoint to insert data into reservations table
app.post('/submit', async (req, res) => {
    try {
        console.log('Received data:', req.body);
        const { id_passport, full_name, email, phone, date, seat, payment } = req.body;

        if (!id_passport || !full_name || !email || !phone || !date || !seat || !payment) {
            return res.status(400).json({ error: 'All fields are required.' });
        }

        const query = `
            INSERT INTO reservation (id_passport, full_name, email, phone, date, seat, payment)
            VALUES ($1, $2, $3, $4, $5, $6, $7)
        `;
        const values = [id_passport, full_name, email, phone, date, seat, payment];

        await pool.query(query, values);
        res.status(200).json({ message: 'Reservation submitted successfully!' });
    } catch (error) {
        console.error('Error inserting reservation:', error);
        res.status(500).json({ error: 'Failed to submit reservation.' });
    }
});

// Fetch stored reservations
app.get('/reservation', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM reservation');
        res.json(result.rows);
    } catch (error) {
        console.error('Error fetching reservation:', error);
        res.status(500).send('Server error');
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
