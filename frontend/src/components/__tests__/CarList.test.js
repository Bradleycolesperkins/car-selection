import { render, screen } from '@testing-library/react';
import CarList from '../CarList';

test('renders cars when provided', () => {
    const cars = [
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
    ];
    render(<CarList cars={cars} />);
    expect(screen.getByText('2020 Acura ILX Base')).toBeInTheDocument();
});

test('displays no cars found message when empty', () => {
    render(<CarList cars={[]} />);
    expect(screen.getByText('No cars found.')).toBeInTheDocument();
});