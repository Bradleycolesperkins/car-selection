const carsController = require('../src/controllers/carsController');
const { loadCSVs } = require('../src/utils/loadCSVs');

jest.mock('../src/utils/loadCSVs');

describe('Cars Controller', () => {
    let mockCars;

    beforeAll(async () => {
        mockCars = [
            {
                make: 'Acura',
                model: 'ILX',
                year: 2020,
                submodel: 'Base',
                trim: 'Base',
                msrp: 25900,
                bodyType: 'Sedan',
                fuelType: 'premium unleaded (recommended)',
                combinedMpg: 28,
                cityMpg: 24,
                highwayMpg: 34,
                cylinders: '4',
                engineSize: 2.4,
                horsepower: 201,
            },
            {
                make: 'Volvo',
                model: 'XC60',
                year: 2015,
                submodel: 'T6',
                trim: 'T6',
                msrp: 42650,
                bodyType: 'SUV',
                fuelType: 'premium unleaded (required)',
                combinedMpg: 20,
                cityMpg: 17,
                highwayMpg: 24,
                cylinders: '6',
                engineSize: 3.0,
                horsepower: 300,
            },
            {
                make: 'Acura',
                model: 'MDX',
                year: 2020,
                submodel: 'SH-AWD',
                trim: 'SH-AWD',
                msrp: 46500,
                bodyType: 'SUV',
                fuelType: 'premium unleaded (recommended)',
                combinedMpg: 22,
                cityMpg: 19,
                highwayMpg: 26,
                cylinders: '6',
                engineSize: 3.5,
                horsepower: 290,
            },
        ];
        loadCSVs.mockResolvedValue(mockCars);
        await carsController.initializeCars();
    });

    describe('getCars', () => {
        test('returns all cars when no filters or pagination', async () => {
            const req = { query: {} };
            const res = { json: jest.fn() };
            await carsController.getCars(req, res);
            expect(res.json).toHaveBeenCalledWith({
                cars: mockCars,
                total: 3,
                page: 1,
                limit: 9,
                totalPages: 1,
            });
        });

        test('filters by make and paginates', async () => {
            const req = { query: { make: 'Acura', page: 1, limit: 1 } };
            const res = { json: jest.fn() };
            await carsController.getCars(req, res);
            expect(res.json).toHaveBeenCalledWith({
                cars: [mockCars[0]],
                total: 2,
                page: 1,
                limit: 1,
                totalPages: 2,
            });
        });

        test('filters by multiple criteria', async () => {
            const req = { query: { make: 'Acura', year: '2020', fuelType: 'premium unleaded (recommended)' } };
            const res = { json: jest.fn() };
            await carsController.getCars(req, res);
            expect(res.json).toHaveBeenCalledWith({
                cars: [mockCars[0], mockCars[2]],
                total: 2,
                page: 1,
                limit: 9,
                totalPages: 1,
            });
        });

        test('handles pagination with second page', async () => {
            const req = { query: { page: 2, limit: 1 } };
            const res = { json: jest.fn() };
            await carsController.getCars(req, res);
            expect(res.json).toHaveBeenCalledWith({
                cars: [mockCars[1]],
                total: 3,
                page: 2,
                limit: 1,
                totalPages: 3,
            });
        });
    });

});