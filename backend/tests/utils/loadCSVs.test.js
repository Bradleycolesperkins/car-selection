const path = require('path');
const { loadCSVs } = require('../src/utils/loadCSVs');

// Mock fs.promises.readFile
jest.mock('fs', () => ({
    promises: {
        readFile: jest.fn()
    }
}));

const fs = require('fs').promises;

describe('loadCSVs', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('loads and joins CSVs correctly', async () => {
        const mockFiles = {
            'makes-sample.csv': 'Make Id,Make Name\n1,Acura\n2,Volvo',
            'models-sample.csv': 'Model Id,Make Id,Model Name\n1,1,ILX\n2,2,XC60',
            'submodels-sample.csv': 'Submodel Id,Model Id,Submodel Name\n1,1,Base\n2,2,T6',
            'trims-sample.csv': 'Trim Id,Model Id,Submodel Id,Make Id,Model Year,Trim Name,Trim Description,Trim MSRP,Trim Invoice\n1,1,1,1,2020,Base,Base Description,25900,24000\n2,2,2,2,2015,T6,T6 Description,42650,40000',
            'bodies-sample.csv': 'Body Id,Trim Id,Body Type,Body Doors,Body Seats\n1,1,Sedan,4,5\n2,2,SUV,4,5',
            'engines-sample.csv': 'Engine Id,Trim Id,Engine Type,Engine Fuel Type,Engine Cylinders,Engine Size,Engine Horsepower Hp\n1,1,Inline,premium unleaded (recommended),4,2.4,201\n2,2,Inline,premium unleaded (required),6,3.0,300',
            'mileages-sample.csv': 'Mileage Id,Trim Id,Mileage Combined Mpg,Mileage Epa City Mpg,Mileage Epa Highway Mpg\n1,1,28,24,34\n2,2,20,17,24',
        };

        fs.readFile.mockImplementation(async (filePath) => {
            const fileName = path.basename(filePath);
            return mockFiles[fileName] || '';
        });

        const cars = await loadCSVs();

        expect(cars).toEqual([
            {
                make: 'Acura',
                model: 'ILX',
                year: 2020,
                submodel: 'Base',
                trim: 'Base',
                trimDescription: 'Base Description',
                msrp: 25900,
                invoice: 24000,
                bodyType: 'Sedan',
                doors: 4,
                seats: 5,
                length: undefined,
                width: undefined,
                height: undefined,
                wheelBase: undefined,
                curbWeight: undefined,
                maxTowingCapacity: undefined,
                engineType: 'Inline',
                fuelType: 'premium unleaded (recommended)',
                cylinders: 4,
                engineSize: 2.4,
                horsepower: 201,
                combinedMpg: 28,
                cityMpg: 24,
                highwayMpg: 34,
            },
            {
                make: 'Volvo',
                model: 'XC60',
                year: 2015,
                submodel: 'T6',
                trim: 'T6',
                trimDescription: 'T6 Description',
                msrp: 42650,
                invoice: 40000,
                bodyType: 'SUV',
                doors: 4,
                seats: 5,
                length: undefined,
                width: undefined,
                height: undefined,
                wheelBase: undefined,
                curbWeight: undefined,
                maxTowingCapacity: undefined,
                engineType: 'Inline',
                fuelType: 'premium unleaded (required)',
                cylinders: 6,
                engineSize: 3,
                horsepower: 300,
                combinedMpg: 20,
                cityMpg: 17,
                highwayMpg: 24,
            },
        ]);
    });

    test('handles missing CSV file', async () => {
        // Temporarily suppress console.error for this test
        const originalConsoleError = console.error;
        console.error = jest.fn();
        
        fs.readFile.mockRejectedValue(new Error('File not found'));
        await expect(loadCSVs()).rejects.toThrow('File not found');
        
        // Restore console.error
        console.error = originalConsoleError;
    });
});