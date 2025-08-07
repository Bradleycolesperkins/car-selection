const fs = require('fs').promises;
const path = require('path');
const { parse } = require('csv-parse/sync');

async function loadCSVs() {
    const files = [
        'makes-sample.csv',
        'models-sample.csv',
    ];

    const data = {};
    for (const file of files) {
        const filePath = path.join(__dirname, '../../data', file);
        try {
            const content = await fs.readFile(filePath, 'utf-8');

            data[file.replace('-sample.csv', '')] = parse(content, {
                columns: true,
                skip_empty_lines: true,
                trim: true,
            });
        } catch (error) {
            console.error(`Error loading ${file}:`, error);
            throw error;
        }
    }

    // merge makes amd models to create the cars
    const cars = data?.models.map(model => {
        const make = data?.makes.find(make => make['Make Id'] === model['Make Id']);

        return {
            make: make ? make['Make Name'] : '',
            model: model ? model['Model Name'] : '',
        };
    });

    return cars;
}

module.exports = { loadCSVs };