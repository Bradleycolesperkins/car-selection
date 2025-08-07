import { render, screen, waitFor } from '@testing-library/react';
import App from '../App';

// Setup fetch mock
global.fetch = jest.fn();

describe('App component', () => {
  beforeEach(() => {
    // Reset mock between tests
    global.fetch.mockReset();
    
    // Mock the API calls based on the URL
    global.fetch.mockImplementation((url) => {
      if (url.includes('/api/cars/filters')) {
        // Mock the filter options API call
        return Promise.resolve({
          json: () => Promise.resolve({
            makes: ['Toyota', 'Honda'],
            models: ['Camry', 'Civic'],
            years: ['2020', '2021'],
            bodyTypes: ['Sedan', 'SUV'],
            submodels: ['LE', 'EX'],
            fuelTypes: ['Gasoline', 'Hybrid']
          })
        });
      } else if (url.includes('/api/cars')) {
        // Mock the cars API call
        return Promise.resolve({
          json: () => Promise.resolve({
            cars: [
              { 
                id: 1, 
                make: 'Toyota', 
                model: 'Camry', 
                year: 2020,
                submodel: 'LE',
                trim: 'Base',
                bodyType: 'Sedan',
                msrp: 25000,
                fuelType: 'Gasoline',
                cylinders: 4,
                engineSize: 2.5,
                horsepower: 203,
                combinedMpg: 32,
                cityMpg: 28,
                highwayMpg: 39
              },
              { 
                id: 2, 
                make: 'Honda', 
                model: 'Civic', 
                year: 2021,
                submodel: 'EX',
                trim: 'Touring',
                bodyType: 'Sedan',
                msrp: 27000,
                fuelType: 'Gasoline',
                cylinders: 4,
                engineSize: 1.5,
                horsepower: 180,
                combinedMpg: 36,
                cityMpg: 32,
                highwayMpg: 42
              }
            ],
            totalPages: 1
          })
        });
      }
      
      // Default fallback
      return Promise.reject(new Error('Not found'));
    });
  });

  test('renders car selection heading', async () => {
    render(<App />);
    const headingElement = screen.getByText(/Car Selection/i);
    expect(headingElement).toBeInTheDocument();
    
    // Wait for the API calls to resolve
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledTimes(2);
    });
  });

  test('renders filters, car list, and pagination', async () => {
    render(<App />);
    
    // Initially, we see the loading state
    expect(screen.getByText(/Car Selection/i)).toBeInTheDocument();
    
    // Wait for the filter options to load and for filter dropdowns to appear
    await waitFor(() => {
      expect(screen.queryByText('Select Make')).toBeInTheDocument();
    });
    
    // Verify that the loading message is gone
    expect(screen.queryByText('Loading filters...')).not.toBeInTheDocument();
    
    // Check that filter dropdowns are present
    expect(screen.getByText('Select Make')).toBeInTheDocument();
    expect(screen.getByText('Select Model')).toBeInTheDocument();
    expect(screen.getByText('Select Year')).toBeInTheDocument();
    expect(screen.getByText('Select Body Type')).toBeInTheDocument();
    expect(screen.getByText('Select Submodel')).toBeInTheDocument();
    expect(screen.getByText('Select Fuel Type')).toBeInTheDocument();
    
    // Check that filter inputs are present
    expect(screen.getByPlaceholderText('Max Price')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Min MPG')).toBeInTheDocument();
    
    // Check that all select elements exist (6 filter dropdowns)
    const selectElements = screen.getAllByRole('combobox');
    expect(selectElements.length).toBe(6);
    
    // Check that car data is displayed
    expect(screen.getByText('2020 Toyota Camry LE')).toBeInTheDocument();
    expect(screen.getByText('2021 Honda Civic EX')).toBeInTheDocument();
    
    // Check that pagination is present
    expect(screen.getByText('Previous')).toBeInTheDocument();
    expect(screen.getByText('Next')).toBeInTheDocument();
    expect(screen.getByText(/Page 1 of/)).toBeInTheDocument();
  });
});