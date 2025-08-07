const fs = require('fs').promises;
const path = require('path');
const { parse } = require('csv-parse/sync');

async function loadCSVs() {
    const files = [
        'makes-sample.csv',
        'models-sample.csv',
        'submodels-sample.csv',
        'trims-sample.csv',
        'bodies-sample.csv',
        'engines-sample.csv',
        'mileages-sample.csv',
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

    const cars = data?.trims.map(trim => {
        const make = data?.makes.find(m => m['Make Id'] === trim['Make Id']);
        const model = data.models.find(m => m['Model Id'] === trim['Model Id']);
        const submodel = data?.submodels.find(s => s['Submodel Id'] === trim['Submodel Id']);
        const engine = data?.engines.find(e => e['Trim Id'] === trim['Trim Id']);
        const body = data.bodies.find(b => b['Trim Id'] === trim['Trim Id']);
        const mileage = data.mileages.find(m => m['Trim Id'] === trim['Trim Id']);

        return {
            make: make ? make['Make Name'] : '',
            model: model ? model['Model Name'] : '',
            submodel: submodel ? submodel['Submodel Name'] : '',
            year: trim ? trim['Model Year'] : '',
            trim: trim['Trim Name'],
            trimDescription: trim['Trim Description'],
            msrp: trim['Trim MSRP'],
            invoice: trim['Trim Invoice'],
            bodyType: body ? body['Body Type'] : '',
            doors: body ? body['Body Doors'] : 0,
            seats: body ? body['Body Seats'] : 0,
            length: body ? body['Body Length'] : 0,
            width: body ? body['Body Width'] : 0,
            height: body ? body['Body Height'] : 0,
            wheelBase: body ? body['Body Wheel Base'] : 0,
            curbWeight: body ? body['Body Curb Weight'] : 0,
            maxTowingCapacity: body ? body['Body Max Towing Capacity'] : 0,
            engineType: engine ? engine['Engine Type'] : '',
            fuelType: engine ? engine['Engine Fuel Type'] : '',
            cylinders: engine ? engine['Engine Cylinders'] : '',
            engineSize: engine ? engine['Engine Size'] : 0,
            horsepower: engine ? engine['Engine Horsepower Hp'] : 0,
            combinedMpg: mileage ? mileage['Mileage Combined Mpg'] : 0,
            cityMpg: mileage ? mileage['Mileage Epa City Mpg'] : 0,
            highwayMpg: mileage ? mileage['Mileage Epa Highway Mpg'] : 0
        };
    });

    return cars;
}

module.exports = { loadCSVs };