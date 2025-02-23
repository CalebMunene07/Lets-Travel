const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
const port = process.env.PORT || 3000; // Use environment variable for port

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// PostgreSQL connection
const pool = new Pool({
    user: process.env.DB_USER || 'postgres',
    host: process.env.DB_HOST || 'localhost',
    database: process.env.DB_NAME || 'Booking',
    password: process.env.DB_PASSWORD || 'yourpassword',
    port: process.env.DB_PORT || 5432,
});

// Root route to prevent "Cannot GET /" error
app.get('/', (req, res) => {
    res.send('Welcome to Let’s Travel API!');
});

// API routes
app.post('/submit', async (req, res) => {
    try {
        const { id_passport, full_name, email, phone, date, seat, payment } = req.body;
        if (!id_passport || !full_name || !email || !phone || !date || !seat || !payment) {
            return res.status(400).json({ error: 'All fields are required.' });
        }

        const query = `INSERT INTO reservation (id_passport, full_name, email, phone, date, seat, payment) 
                       VALUES ($1, $2, $3, $4, $5, $6, $7)`;
        await pool.query(query, [id_passport, full_name, email, phone, date, seat, payment]);

        res.status(200).json({ message: 'Reservation submitted successfully!' });
    } catch (error) {
        console.error('Error inserting reservation:', error);
        res.status(500).json({ error: 'Failed to submit reservation.' });
    }
});

// Fetch reservations
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
