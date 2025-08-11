const carsController = require('../../src/controllers/carsController');
const carsService = require('../../src/services/carsService');

jest.mock('../../src/services/carsService');

describe('Cars Controller', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('getCars', () => {
        test('passes query parameters to service and returns result', async () => {
            const mockResult = { 
                cars: [{ make: 'Acura' }], 
                total: 1, 
                page: 1, 
                limit: 9, 
                totalPages: 1 
            };
            carsService.getCars.mockReturnValue(mockResult);
            
            const req = { query: { make: 'Acura' } };
            const res = { json: jest.fn() };
            
            carsController.getCars(req, res);
            
            expect(carsService.getCars).toHaveBeenCalledWith(req.query);
            expect(res.json).toHaveBeenCalledWith(mockResult);
        });
    });

    describe('getFilterOptions', () => {
        test('returns filter options from service', async () => {
            const mockFilterOptions = { 
                makes: ['Acura', 'Toyota'], 
                models: ['Camry', 'Corolla'],
                years: [2020, 2021],
                bodyTypes: ['Sedan', 'SUV'],
                submodels: ['Base', 'Premium'],
                fuelTypes: ['regular unleaded', 'premium unleaded']
            };
            
            carsService.getFilterOptions.mockReturnValue(mockFilterOptions);
            
            const req = {};
            const res = { json: jest.fn() };
            
            carsController.getFilterOptions(req, res);
            
            expect(carsService.getFilterOptions).toHaveBeenCalled();
            expect(res.json).toHaveBeenCalledWith(mockFilterOptions);
        });
    });
});