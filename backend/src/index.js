/**
 * Car Selection Application - Backend Server
 * 
 * This is the main entry point for the Car Selection API server.
 * The server provides endpoints for retrieving and filtering car data.
 */

require('dotenv').config();
const express = require('express')
const cors = require('cors');
const carsRoutes = require('./routes/cars');
const { initialiseCars } = require('./services/carsService');

// Create Express application
const app = express()
const port = process.env.PORT || 3001

// Configure CORS to allow requests from the frontend application
app.use(cors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:3000'
}));

// Initialise cars data only in non-test environment
if (process.env.NODE_ENV !== 'test') {
    initialiseCars()
        .then(() => console.log('Cars data initialised successfully'))
        .catch(err => console.error('Failed to initialise cars data:', err));
}

// Start the server and listen on the specified port
app.listen(port, () => {
    console.log(`Car Selection API server listening on port ${port}`)
})

// Register API routes
// All car-related endpoints will be prefixed with /api/cars
app.use('/api/cars', carsRoutes);