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

// ✅ Serve static files (CSS, JS) from the root directory
app.use(express.static(path.join(__dirname, '../')));

// ✅ Serve index.html from the root folder
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../index.html'));
});

// API routes (unchanged)

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
