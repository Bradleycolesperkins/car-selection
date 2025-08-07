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
    res.json({
        cars: cars,
    });
};

exports.getFilterOptions = (req, res) => {
    const makes = [...new Set(cars.map(car => car.make))].sort();
    const models = [...new Set(cars.map(car => car.model))].sort();

    res.json({ makes, models });
};
