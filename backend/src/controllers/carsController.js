const carsService = require('../services/carsService');

exports.initialiseCars = carsService.initialiseCars;

exports.getCars = (req, res) => {
    const result = carsService.getCars(req.query);
    res.json(result);
};

exports.getFilterOptions = (req, res) => {
    const filterOptions = carsService.getFilterOptions();
    res.json(filterOptions);
};
