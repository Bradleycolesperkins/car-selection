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
