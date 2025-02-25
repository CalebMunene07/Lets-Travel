const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Pool } = require('pg');

// Initialize Express app
const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// PostgreSQL connection
const pool = new Pool({
    user: 'postgres',      // Replace with your PostgreSQL username
    host: 'localhost',     // Replace with your PostgreSQL host
    database: 'Booking',   // Replace with your database name
    password: '@Kalib07',  // Replace with your PostgreSQL password
    port: 5432,            // Default PostgreSQL port
});

// API endpoint to insert data into the reservations table
app.post('/submit', async (req, res) => {
    try {
        // Log the received request body for debugging
        console.log('Received data:', req.body);

        // Correctly extract values from the request body
        const { id_passport, full_name, email, phone, date, seat, payment } = req.body;

        // Check if required fields are missing
        if (!id_passport || !full_name || !email || !phone || !date || !seat || !payment) {
            return res.status(400).json({ error: 'All fields are required.' });
        }

        // SQL query to insert the data into the "reservation" table
        const query = `
            INSERT INTO reservation (id_passport, full_name, email, phone, date, seat, payment)
            VALUES ($1, $2, $3, $4, $5, $6, $7)
        `;
        const values = [id_passport, full_name, email, phone, date, seat, payment];

        // Execute the query using the connection pool
        await pool.query(query, values);

        // Send a success response
        res.status(200).json({ message: 'Reservation submitted successfully!' });
    } catch (error) {
        // Log any errors that occur
        console.error('Error inserting reservation:', error);

        // Send an error response
        res.status(500).json({ error: 'Failed to submit reservation.' });
    }
});

// ✅ Endpoint to fetch stored reservations
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
