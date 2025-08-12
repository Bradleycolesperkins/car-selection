const fs = require('fs').promises;
const path = require('path');
const { parse } = require('csv-parse/sync');

/**
 * Loads and processes car data from multiple CSV files.
 * 
 * This function reads several CSV files containing different aspects of car data
 * (makes, models, submodels, trims, bodies, engines, mileages), parses them,
 * and combines the data to create comprehensive car objects with all relevant information.
 * 
 * @returns {Promise<Array<Object>>} A promise that resolves to an array of car objects,
 *                                  each containing detailed information from all CSV files.
 * @throws {Error} If any CSV file cannot be read or parsed correctly.
 */
async function loadCSVs() {
    // List of CSV files containing different aspects of car data
    const files = [
        'makes-sample.csv',
        'models-sample.csv',
        'submodels-sample.csv',
        'trims-sample.csv',
        'bodies-sample.csv',
        'engines-sample.csv',
        'mileages-sample.csv',
    ];

    // Object to store parsed data from each CSV file
    const data = {};
    for (const file of files) {
        // Construct the full path to the CSV file
        const filePath = path.join(__dirname, '../../data', file);
        try {
            // Read the file content
            const content = await fs.readFile(filePath, 'utf-8');

            // Parse CSV content and store it in the data object
            // The key is the file name without '-sample.csv'
            data[file.replace('-sample.csv', '')] = parse(content, {
                columns: true,          // Use the first row as column names
                skip_empty_lines: true, // Skip empty lines in the CSV
                trim: true,             // Trim whitespace from values
                cast: true              // Automatically convert values to appropriate types
            });
        } catch (error) {
            console.error(`Error loading ${file}:`, error);
            throw error;
        }
    }

    // Create car objects by combining data from different CSV files
    // Each car is based on a trim and enriched with related data
    const cars = data?.trims.map(trim => {
        // Find related data for this trim from other CSV files
        const make = data?.makes.find(m => m['Make Id'] === trim['Make Id']);
        const model = data.models.find(m => m['Model Id'] === trim['Model Id']);
        const submodel = data?.submodels.find(s => s['Submodel Id'] === trim['Submodel Id']);
        const engine = data?.engines.find(e => e['Trim Id'] === trim['Trim Id']);
        const body = data.bodies.find(b => b['Trim Id'] === trim['Trim Id']);
        const mileage = data.mileages.find(m => m['Trim Id'] === trim['Trim Id']);

        // Construct and return a comprehensive car object with data from all sources
        return {
            // Basic car information
            make: make ? make['Make Name'] : '',
            model: model ? model['Model Name'] : '',
            submodel: submodel ? submodel['Submodel Name'] : '',
            year: trim ? trim['Model Year'] : '',
            trim: trim['Trim Name'],
            trimDescription: trim['Trim Description'],
            msrp: trim['Trim MSRP'],
            invoice: trim['Trim Invoice'],
            
            // Body specifications
            bodyType: body ? body['Body Type'] : '',
            doors: body ? body['Body Doors'] : 0,
            seats: body ? body['Body Seats'] : 0,
            length: body ? body['Body Length'] : 0,
            width: body ? body['Body Width'] : 0,
            height: body ? body['Body Height'] : 0,
            wheelBase: body ? body['Body Wheel Base'] : 0,
            curbWeight: body ? body['Body Curb Weight'] : 0,
            maxTowingCapacity: body ? body['Body Max Towing Capacity'] : 0,
            
            // Engine specifications
            engineType: engine ? engine['Engine Type'] : '',
            fuelType: engine ? engine['Engine Fuel Type'] : '',
            cylinders: engine ? engine['Engine Cylinders'] : '',
            engineSize: engine ? engine['Engine Size'] : 0,
            horsepower: engine ? engine['Engine Horsepower Hp'] : 0,
            
            // Fuel efficiency information
            combinedMpg: mileage ? mileage['Mileage Combined Mpg'] : 0,
            cityMpg: mileage ? mileage['Mileage Epa City Mpg'] : 0,
            highwayMpg: mileage ? mileage['Mileage Epa Highway Mpg'] : 0
        };
    });

    // Return the array of car objects
    return cars;
}

// Export the loadCSVs function for use in other modules
module.exports = { loadCSVs };