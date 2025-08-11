const carsService = require('../../src/services/carsService');
const { loadCSVs } = require('../../src/utils/loadCSVs');

jest.mock('../../src/utils/loadCSVs');

describe('Cars Service', () => {
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
            {
                make: 'Toyota',
                model: null, // Non-string model to test error case
                year: 2021,
                submodel: 'LE',
                trim: 'LE',
                msrp: 24000,
                bodyType: 'Sedan',
                fuelType: 'regular unleaded',
                combinedMpg: 30,
                cityMpg: 28,
                highwayMpg: 36,
                cylinders: '4',
                engineSize: 2.0,
                horsepower: 169,
            },
        ];
        loadCSVs.mockResolvedValue(mockCars);
        await carsService.initialiseCars();
    });

    describe('getCars', () => {
        test('returns all cars when no filters or pagination', async () => {
            const result = carsService.getCars({});
            expect(result).toEqual({
                cars: mockCars,
                total: 4,
                page: 1,
                limit: 9,
                totalPages: 1,
            });
        });

        test('filters by make and paginates', async () => {
            const result = carsService.getCars({ make: 'Acura', page: 1, limit: 1 });
            expect(result).toEqual({
                cars: [mockCars[0]],
                total: 2,
                page: 1,
                limit: 1,
                totalPages: 2,
            });
        });

        test('filters by multiple criteria', async () => {
            const result = carsService.getCars({ make: 'Acura', year: '2020', fuelType: 'premium unleaded (recommended)' });
            expect(result).toEqual({
                cars: [mockCars[0], mockCars[2]],
                total: 2,
                page: 1,
                limit: 9,
                totalPages: 1,
            });
        });

        test('handles pagination with second page', async () => {
            const result = carsService.getCars({ page: 2, limit: 1 });
            expect(result).toEqual({
                cars: [mockCars[1]],
                total: 4,
                page: 2,
                limit: 1,
                totalPages: 4,
            });
        });
    });

    test('filters by make returns only cars of that make', async () => {
        const result = carsService.getCars({ make: 'Volvo' });
        
        // Check that only Volvo cars are returned
        expect(result.cars.length).toBe(1);
        expect(result.cars[0].make).toBe('Volvo');
        
        // Verify that no Acura cars are in the results
        const acuraCars = result.cars.filter(car => car.make === 'Acura');
        expect(acuraCars.length).toBe(0);
    });

    test('filters by model returns only cars of that model', async () => {
        const result = carsService.getCars({ model: 'MDX' });
        
        // Check that only MDX cars are returned
        expect(result.cars.length).toBe(1);
        expect(result.cars[0].model).toBe('MDX');
        
        // Verify that no other models are in the results
        const otherModels = result.cars.filter(car => car.model !== 'MDX');
        expect(otherModels.length).toBe(0);
    });

    test('filters by year returns only cars of that year', async () => {
        const result = carsService.getCars({ year: '2020' });
        
        // Check that only 2020 cars are returned
        expect(result.cars.length).toBe(2);
        result.cars.forEach(car => {
            expect(car.year).toBe(2020);
        });
        
        // Verify that no cars from other years are in the results
        const otherYears = result.cars.filter(car => car.year !== 2020);
        expect(otherYears.length).toBe(0);
    });

    test('filters by bodyType returns only cars of that body type', async () => {
        const result = carsService.getCars({ bodyType: 'SUV' });
        
        // Check that only SUV cars are returned
        expect(result.cars.length).toBe(2);
        result.cars.forEach(car => {
            expect(car.bodyType).toBe('SUV');
        });
        
        // Verify that no cars with other body types are in the results
        const otherBodyTypes = result.cars.filter(car => car.bodyType !== 'SUV');
        expect(otherBodyTypes.length).toBe(0);
    });

    test('filters by submodel returns only cars of that submodel', async () => {
        const result = carsService.getCars({ submodel: 'SH-AWD' });
        
        // Check that only SH-AWD submodel cars are returned
        expect(result.cars.length).toBe(1);
        expect(result.cars[0].submodel).toBe('SH-AWD');
        
        // Verify that no cars with other submodels are in the results
        const otherSubmodels = result.cars.filter(car => car.submodel !== 'SH-AWD');
        expect(otherSubmodels.length).toBe(0);
    });

    test('filters by fuelType returns only cars of that fuel type', async () => {
        const result = carsService.getCars({ fuelType: 'premium unleaded (required)' });
        
        // Check that only cars with required premium unleaded fuel are returned
        expect(result.cars.length).toBe(1);
        expect(result.cars[0].fuelType).toBe('premium unleaded (required)');
        
        // Verify that no cars with other fuel types are in the results
        const otherFuelTypes = result.cars.filter(car => car.fuelType !== 'premium unleaded (required)');
        expect(otherFuelTypes.length).toBe(0);
    });
    
    test('handles non-string model values when filtering by model', async () => {
        const result = carsService.getCars({ model: 'Camry' });
        
        // Verify that cars with null models are not included when filtering by model
        const nullModelCars = result.cars.filter(car => car.model === null);
        expect(nullModelCars.length).toBe(0);
    });

    test('filters by maxPrice returns only cars below the specified price', async () => {
        const result = carsService.getCars({ maxPrice: '30000' });
        
        // Check that only cars below the max price are returned
        expect(result.cars.length).toBe(2);
        result.cars.forEach(car => {
            expect(car.msrp).toBeLessThanOrEqual(30000);
        });
        
        // Verify that no cars above the max price are in the results
        const expensiveCars = result.cars.filter(car => car.msrp > 30000);
        expect(expensiveCars.length).toBe(0);
    });

    test('filters by minMpg returns only cars above the specified MPG', async () => {
        const result = carsService.getCars({ minMpg: '25' });
        
        // Check that only cars with MPG above the minimum are returned
        expect(result.cars.length).toBe(2);
        result.cars.forEach(car => {
            expect(car.combinedMpg).toBeGreaterThanOrEqual(25);
        });
        
        // Verify that no cars below the min MPG are in the results
        const lowMpgCars = result.cars.filter(car => car.combinedMpg < 25);
        expect(lowMpgCars.length).toBe(0);
    });

    describe('getFilterOptions', () => {
        test('returns unique filter options for all categories', () => {
            const filterOptions = carsService.getFilterOptions();
            
            expect(filterOptions).toHaveProperty('makes');
            expect(filterOptions).toHaveProperty('models');
            expect(filterOptions).toHaveProperty('years');
            expect(filterOptions).toHaveProperty('bodyTypes');
            expect(filterOptions).toHaveProperty('submodels');
            expect(filterOptions).toHaveProperty('fuelTypes');
            
            // Check that makes are unique and sorted
            expect(filterOptions.makes).toEqual(['Acura', 'Toyota', 'Volvo']);
            
            // Check that body types are unique and sorted
            expect(filterOptions.bodyTypes).toEqual(['SUV', 'Sedan']);
        });
    });
});