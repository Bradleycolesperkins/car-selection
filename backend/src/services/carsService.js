/**
 * Cars Service
 * 
 * This service handles the loading, filtering, and retrieval of car data.
 * It provides functions for initialising the data from CSV files and
 * applying various filters based on user criteria.
 */

const { loadCSVs } = require('../utils/loadCSVs');

// In-memory storage for car data
let cars = [];

/**
 * Initialises the cars data by loading it from CSV files
 * This function should be called at application startup
 * @returns {Promise<void>} A promise that resolves when data is loaded
 */
async function initialiseCars() {
    try {
        cars = await loadCSVs();
    } catch (error) {
        console.error('Error initialising cars:', error);
    }
}

/**
 * Retrieves cars based on the provided filters
 * 
 * @param {Object} filters - The filter criteria
 * @param {string} [filters.make] - Filter by car manufacturer
 * @param {string} [filters.model] - Filter by car model
 * @param {string|number} [filters.year] - Filter by manufacturing year
 * @param {string} [filters.bodyType] - Filter by body type (e.g., Sedan, SUV)
 * @param {string} [filters.submodel] - Filter by submodel
 * @param {string} [filters.fuelType] - Filter by fuel type
 * @param {number|string} [filters.maxPrice] - Maximum price filter
 * @param {number|string} [filters.minMpg] - Minimum miles per gallon filter
 * @param {number|string} [filters.page=1] - Page number for pagination
 * @param {number|string} [filters.limit=9] - Number of results per page
 * @returns {Object} Paginated results with metadata
 */
function getCars(filters) {
    const { make, model, year, bodyType, submodel, fuelType, maxPrice, minMpg, page = 1, limit = 9 } = filters;
    let filteredCars = [...cars];

    // Apply each filter if provided
    if (make) {
        filteredCars = filteredCars.filter(car => car.make.toLowerCase() === make.toLowerCase());
    }
    if (model) {
        filteredCars = filteredCars.filter(car => 
            typeof car.model === 'string' && car.model.toLowerCase() === model.toLowerCase()
        );
    }
    if (year) {
        filteredCars = filteredCars.filter(car => parseInt(car.year) === parseInt(year));
    }
    if (bodyType) {
        filteredCars = filteredCars.filter(car => car.bodyType.toLowerCase() === bodyType.toLowerCase());
    }
    if (submodel) {
        filteredCars = filteredCars.filter(car => car.submodel.toLowerCase() === submodel.toLowerCase());
    }
    if (fuelType) {
        filteredCars = filteredCars.filter(car => car.fuelType.toLowerCase() === fuelType.toLowerCase());
    }
    if (maxPrice) {
        // Filter cars with price less than or equal to maxPrice
        filteredCars = filteredCars.filter(car => car.msrp <= parseFloat(maxPrice));
    }
    if (minMpg) {
        // Filter cars with MPG greater than or equal to minMpg
        filteredCars = filteredCars.filter(car => car.combinedMpg >= parseFloat(minMpg));
    }

    // Pagination logic
    // Convert string parameters to integers for calculation
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const total = filteredCars.length;
    
    // Calculate the slice indices for the current page
    const startIndex = (pageNum - 1) * limitNum;
    const endIndex = startIndex + limitNum;
    
    // Extract only the cars for the current page
    const paginatedCars = filteredCars.slice(startIndex, endIndex);

    // Return the paginated results along with metadata
    return {
        cars: paginatedCars,      // Array of car objects for the current page
        total,                    // Total number of cars matching all filters
        page: pageNum,            // Current page number
        limit: limitNum,          // Number of results per page
        totalPages: Math.ceil(total / limitNum)  // Total number of pages available
    };
}

/**
 * Retrieves all available filter options from the car data
 * 
 * This function extracts unique values for each filterable property
 * to populate dropdown menus in the user interface.
 * 
 * @returns {Object} Object containing arrays of unique values for each filter category
 */
function getFilterOptions() {
    // Extract unique values for each filter category and sort them alphabetically
    const makes = [...new Set(cars.map(car => car.make))].sort();
    const models = [...new Set(cars.map(car => car.model))].sort();
    const years = [...new Set(cars.map(car => car.year))].sort();
    const bodyTypes = [...new Set(cars.map(car => car.bodyType))].sort();
    const submodels = [...new Set(cars.map(car => car.submodel))].sort();
    const fuelTypes = [...new Set(cars.map(car => car.fuelType))].sort();

    // Return all filter options in a structured object
    return { 
        makes,      // Array of unique car manufacturers
        models,     // Array of unique car models
        years,      // Array of unique manufacturing years
        bodyTypes,  // Array of unique body types (Sedan, SUV, etc.)
        submodels,  // Array of unique submodels
        fuelTypes   // Array of unique fuel types
    };
}

module.exports = {
    initialiseCars,
    getCars,
    getFilterOptions
};