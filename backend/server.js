const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Pool } = require('pg');
const path = require('path');  // Add this line

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// PostgreSQL connection (Update credentials in Render)
const pool = new Pool({
    connectionString: process.env.DATABASE_URL, // Use environment variables
    ssl: { rejectUnauthorized: false } // Required for Render PostgreSQL
});

// Serve static frontend files
app.use(express.static(path.join(__dirname, '../')));

// Root route serves index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../index.html'));
});

// Start server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
