const { loadCSVs } = require('../utils/loadCSVs');

let cars = [];

async function initializeCars() {
    try {
        cars = await loadCSVs();
    } catch (error) {
        console.error('Error initializing cars:', error);
    }
}

initializeCars();

exports.getCars = (req, res) => {
    const { make, model } = req.query;
    let filteredCars = [...cars];

    if (make) {
        filteredCars = filteredCars.filter(car => car.make.toLowerCase() === make.toLowerCase());
    }
    if (model) {
        filteredCars = filteredCars.filter(car => car.model.toLowerCase() === model.toLowerCase());
    }

    res.json({
        cars: filteredCars,
    });
};

exports.getFilterOptions = (req, res) => {
    const makes = [...new Set(cars.map(car => car.make))].sort();
    const models = [...new Set(cars.map(car => car.model))].sort();

    res.json({ makes, models });
};
