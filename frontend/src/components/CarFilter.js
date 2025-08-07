import { useState } from 'react';

function CarFilter({ filterOptions = {}, onFilter }) {
    const [filters, setFilters] = useState({
        make: '',
        model: '',
        year: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        const newFilters = { ...filters, [name]: value };
        setFilters(newFilters);
        onFilter(newFilters);
    };

    const { makes = [], models = [], years = []} = filterOptions;

    return (
        <div className="flex flex-wrap gap-4 mb-6">
            <select name="make" value={filters.make} onChange={handleChange} className="border rounded p-2">
                <option value="">Select Make</option>
                {makes.map((make) => (
                    <option key={make} value={make}>{make}</option>
                ))}
            </select>
            <select name="model" value={filters.model} onChange={handleChange} className="border rounded p-2">
                <option value="">Select Model</option>
                {models.map((model) => (
                    <option key={model} value={model}>{model}</option>
                ))}
            </select>
            <select name="year" value={filters.year} onChange={handleChange} className="border rounded p-2">
                <option value="">Select Year</option>
                {years.map((year) => (
                    <option key={year} value={year}>{year}</option>
                ))}
            </select>
        </div>
    );
}

export default CarFilter;