/**
 * Cars Controller
 * 
 * This controller handles HTTP requests related to car data.
 * It provides endpoints for retrieving cars with filters and
 * getting available filter options.
 */

const carsService = require('../services/carsService');

// Export the initialisation function directly from the service
exports.initialiseCars = carsService.initialiseCars;

/**
 * Retrieves cars based on query parameters
 * 
 * @param {Object} req - Express request object
 * @param {Object} req.query - Query parameters for filtering
 * @param {Object} res - Express response object
 */
exports.getCars = (req, res) => {
    // Pass all query parameters to the service layer
    const result = carsService.getCars(req.query);
    res.json(result);
};

/**
 * Retrieves all available filter options
 * 
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.getFilterOptions = (req, res) => {
    // Get filter options from the service layer
    const filterOptions = carsService.getFilterOptions();
    res.json(filterOptions);
};
