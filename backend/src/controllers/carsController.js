const { loadCSVs } = require('../utils/loadCSVs');

let cars = [];

async function initializeCars() {
    try {
        cars = await loadCSVs();
    } catch (error) {
        console.error('Error initializing cars:', error);
    }
}

exports.initializeCars = initializeCars;

initializeCars();

exports.getCars = (req, res) => {
    const { make, model, year, bodyType, submodel, fuelType, maxPrice, minMpg, page = 1, limit = 9 } = req.query;
    let filteredCars = [...cars];

    if (make) {
        filteredCars = filteredCars.filter(car => car.make.toLowerCase() === make.toLowerCase());
    }
    if (model) {
        filteredCars = filteredCars.filter(car => car.model.toLowerCase() === model.toLowerCase());
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
        filteredCars = filteredCars.filter(car => car.msrp <= parseFloat(maxPrice));
    }
    if (minMpg) {
        filteredCars = filteredCars.filter(car => car.combinedMpg >= parseFloat(minMpg));
    }

    // Pagination
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const total = filteredCars.length;
    const startIndex = (pageNum - 1) * limitNum;
    const endIndex = startIndex + limitNum;
    const paginatedCars = filteredCars.slice(startIndex, endIndex);

    res.json({
        cars: paginatedCars,
        total,
        page: pageNum,
        limit: limitNum,
        totalPages: Math.ceil(total / limitNum)
    });
};

exports.getFilterOptions = (req, res) => {
    const makes = [...new Set(cars.map(car => car.make))].sort();
    const models = [...new Set(cars.map(car => car.model))].sort();
    const years = [...new Set(cars.map(car => car.year))].sort();
    const bodyTypes = [...new Set(cars.map(car => car.bodyType))].sort();
    const submodels = [...new Set(cars.map(car => car.submodel))].sort();
    const fuelTypes = [...new Set(cars.map(car => car.fuelType))].sort();

    res.json({ makes, models, years, bodyTypes, submodels, fuelTypes });
};
