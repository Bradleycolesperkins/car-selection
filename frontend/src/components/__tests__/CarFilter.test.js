import { render, screen, fireEvent } from '@testing-library/react';
import CarFilter from '../CarFilter';

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