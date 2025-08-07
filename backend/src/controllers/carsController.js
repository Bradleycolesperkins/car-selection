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
    const { make, model, submodel, year, engine } = req.query;
    let filteredCars = [...cars];

    if (make) {
        filteredCars = filteredCars.filter(car => car.make.toLowerCase() === make.toLowerCase());
    }
    if (model) {
        filteredCars = filteredCars.filter(car => car.model.toLowerCase() === model.toLowerCase());
    }
    if (submodel) {
        filteredCars = filteredCars.filter(car => car.submodel.toLowerCase() === submodel.toLowerCase());
    }
    if (year) {
        filteredCars = filteredCars.filter(car => car.year.toLowerCase() === year.toLowerCase());
    }
    if (engine) {
        filteredCars = filteredCars.filter(car => car.engine.toLowerCase() === engine.toLowerCase());
    }

    res.json({
        cars: filteredCars,
    });
};

exports.getFilterOptions = (req, res) => {
    const makes = [...new Set(cars.map(car => car.make))].sort();
    const models = [...new Set(cars.map(car => car.model))].sort();
    const submodels = [...new Set(cars.map(car => car.submodel))].sort();
    const years = [...new Set(cars.map(car => car.year))].sort();
    const engines = [...new Set(cars.map(car => car.engine))].sort();

    res.json({ makes, models, submodels, years, engines });
};
