import { render, screen } from '@testing-library/react';
import CarCard from '../CarCard';

test('renders car details correctly', () => {
    const car = {
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
    };
    render(<CarCard car={car} />);
    expect(screen.getByText('2020 Acura ILX Base')).toBeInTheDocument();
    expect(screen.getByText('Trim: Base')).toBeInTheDocument();
    expect(screen.getByText('Body: Sedan')).toBeInTheDocument();
    expect(screen.getByText('MSRP: $25,900')).toBeInTheDocument();
    expect(screen.getByText('Fuel Type: premium unleaded (recommended)')).toBeInTheDocument();
    expect(screen.getByText('Engine: 4 2.4L (201 HP)')).toBeInTheDocument();
    expect(screen.getByText('MPG: 28 (City: 24, Hwy: 34)')).toBeInTheDocument();
});