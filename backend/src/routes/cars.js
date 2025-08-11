/**
 * Cars Routes
 * 
 * This module defines the routes for car-related API endpoints.
 * All routes defined here will be mounted under /api/cars.
 */

const express = require('express');
const { getCars, getFilterOptions} = require('../controllers/carsController');

const router = express.Router();

/**
 * GET /api/cars
 * Retrieves a list of cars with optional filtering and pagination
 * Query parameters:
 *   - make: Filter by car manufacturer
 *   - model: Filter by car model
 *   - year: Filter by manufacturing year
 *   - bodyType: Filter by body type
 *   - submodel: Filter by submodel
 *   - fuelType: Filter by fuel type
 *   - maxPrice: Maximum price filter
 *   - minMpg: Minimum MPG filter
 *   - page: Page number (default: 1)
 *   - limit: Results per page (default: 9)
 */
router.get('/', getCars);

/**
 * GET /api/cars/filters
 * Retrieves all available filter options for the frontend
 * Returns unique values for makes, models, years, bodyTypes, etc.
 */
router.get('/filters', getFilterOptions);

module.exports = router;