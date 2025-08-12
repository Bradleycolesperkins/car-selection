import { render, screen, fireEvent } from '@testing-library/react';
import CarFilter from '../CarFilter';
import { DEFAULT_FILTERS } from '../../constants/filterConstants';

test('renders loading state when filterOptions is empty', () => {
    render(<CarFilter filterOptions={{}} onFilter={jest.fn()} />);
    expect(screen.getByText('Loading filters...')).toBeInTheDocument();
});

test('renders filter dropdowns with options', () => {
    const filterOptions = {
        makes: ['Acura', 'Volvo'],
        models: ['ILX', 'XC60'],
        years: [2015, 2020],
        bodyTypes: ['Sedan', 'SUV'],
        submodels: ['Base', 'T6'],
        fuelTypes: ['premium unleaded (recommended)', 'premium unleaded (required)'],
    };
    render(<CarFilter filterOptions={filterOptions} onFilter={jest.fn()} />);
    expect(screen.getByRole('combobox', { name: /select make/i })).toHaveValue('');
    expect(screen.getByText('Acura')).toBeInTheDocument();
    expect(screen.getByText('Volvo')).toBeInTheDocument();
});

test('updates filters and calls onFilter for submodel', () => {
    const onFilter = jest.fn();
    const filterOptions = {
        makes: ['Acura'],
        models: ['ILX'],
        years: [2020],
        bodyTypes: ['Sedan'],
        submodels: ['Base'],
        fuelTypes: ['premium unleaded (recommended)'],
    };
    render(<CarFilter filterOptions={filterOptions} onFilter={onFilter} />);
    fireEvent.change(screen.getByRole('combobox', { name: /select submodel/i }), { target: { value: 'Base' } });
    expect(onFilter).toHaveBeenCalledWith({
        make: '',
        model: '',
        year: '',
        bodyType: '',
        submodel: 'Base',
        fuelType: '',
        maxPrice: '',
        minMpg: '',
    });
});

test('updates filters and calls onFilter for make', () => {
    const onFilter = jest.fn();
    const filterOptions = {
        makes: ['Acura'],
        models: ['ILX'],
        years: [2020],
        bodyTypes: ['Sedan'],
        submodels: ['Base'],
        fuelTypes: ['premium unleaded (recommended)'],
    };
    render(<CarFilter filterOptions={filterOptions} onFilter={onFilter} />);
    fireEvent.change(screen.getByRole('combobox', { name: /select make/i }), { target: { value: 'Acura' } });
    expect(onFilter).toHaveBeenCalledWith({
        make: 'Acura',
        model: '',
        year: '',
        bodyType: '',
        submodel: '',
        fuelType: '',
        maxPrice: '',
        minMpg: '',
    });
});

test('clears all filters when Clear Filters button is clicked', () => {
    const onFilter = jest.fn();
    const filterOptions = {
        makes: ['Acura', 'Volvo'],
        models: ['ILX', 'XC60'],
        years: [2015, 2020],
        bodyTypes: ['Sedan', 'SUV'],
        submodels: ['Base', 'T6'],
        fuelTypes: ['premium unleaded (recommended)', 'premium unleaded (required)'],
    };
    
    // Render the component
    render(<CarFilter filterOptions={filterOptions} onFilter={onFilter} />);
    
    // Set some filter values
    fireEvent.change(screen.getByRole('combobox', { name: /select make/i }), { target: { value: 'Acura' } });
    fireEvent.change(screen.getByRole('combobox', { name: /select model/i }), { target: { value: 'ILX' } });
    fireEvent.change(screen.getByRole('combobox', { name: /select year/i }), { target: { value: '2020' } });
    fireEvent.change(screen.getByPlaceholderText('Max Price'), { target: { value: '30000' } });
    
    // Reset onFilter mock to clear previous calls
    onFilter.mockClear();
    
    // Click the Clear Filters button
    fireEvent.click(screen.getByRole('button', { name: /clear all filters/i }));
    
    // Verify onFilter was called with DEFAULT_FILTERS
    expect(onFilter).toHaveBeenCalledWith(DEFAULT_FILTERS);
    
    // Verify all filter inputs are reset to empty values
    expect(screen.getByRole('combobox', { name: /select make/i })).toHaveValue('');
    expect(screen.getByRole('combobox', { name: /select model/i })).toHaveValue('');
    expect(screen.getByRole('combobox', { name: /select year/i })).toHaveValue('');
    
    // For numeric inputs, check that the value is empty (could be '' or null depending on browser)
    const maxPriceInput = screen.getByPlaceholderText('Max Price');
    expect(maxPriceInput.value).toBeFalsy();
    
    const minMpgInput = screen.getByPlaceholderText('Min MPG');
    expect(minMpgInput.value).toBeFalsy();
});