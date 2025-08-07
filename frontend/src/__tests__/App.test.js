import { render, screen, waitFor } from '@testing-library/react';
import App from '../App';

// Setup fetch mock
global.fetch = jest.fn();

describe('App component', () => {
  beforeEach(() => {
    // Reset mock between tests
    global.fetch.mockReset();
    
    // Mock the filter options API call
    global.fetch.mockImplementationOnce(() => 
      Promise.resolve({
        json: () => Promise.resolve({
          makes: ['Toyota', 'Honda'],
          models: ['Camry', 'Civic'],
          years: ['2020', '2021'],
          bodyTypes: ['Sedan', 'SUV'],
          submodels: ['LE', 'EX'],
          fuelTypes: ['Gasoline', 'Hybrid']
        })
      })
    );
    
    // Mock the cars API call
    global.fetch.mockImplementationOnce(() => 
      Promise.resolve({
        json: () => Promise.resolve({
          cars: [
            { id: 1, make: 'Toyota', model: 'Camry', year: 2020 },
            { id: 2, make: 'Honda', model: 'Civic', year: 2021 }
          ],
          totalPages: 1
        })
      })
    );
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
    
    // Wait for the API calls to resolve
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledTimes(2);
    });
    
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
    
    // Check that cars container is present (either showing cars or "No cars found")
    const carsContainer = screen.getByText('No cars found.');
    expect(carsContainer).toBeInTheDocument();
    
    // Check that pagination is present
    expect(screen.getByText('Previous')).toBeInTheDocument();
    expect(screen.getByText('Next')).toBeInTheDocument();
    expect(screen.getByText(/Page 1 of/)).toBeInTheDocument();
  });
});