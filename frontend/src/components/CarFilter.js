import { useState } from 'react';

function CarFilter({ filterOptions = {}, onFilter }) {
    const [filters, setFilters] = useState({
        make: '',
        model: '',
        year: '',
        bodyType: '',
        submodel: '',
        fuelType: '',
        maxPrice: '',
        minMpg: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        const newFilters = { ...filters, [name]: value };
        setFilters(newFilters);
        onFilter(newFilters);
    };

    const { makes = [], models = [], years = [], bodyTypes = [], submodels = [], fuelTypes = [] } = filterOptions;

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
            <select name="bodyType" value={filters.bodyType} onChange={handleChange} className="border rounded p-2">
                <option value="">Select Body Type</option>
                {bodyTypes.map((type) => (
                    <option key={type} value={type}>{type}</option>
                ))}
            </select>
            <select name="submodel" value={filters.submodel} onChange={handleChange} className="border rounded p-2">
                <option value="">Select Submodel</option>
                {submodels.map((submodel) => (
                    <option key={submodel} value={submodel}>{submodel}</option>
                ))}
            </select>
            <select name="fuelType" value={filters.fuelType} onChange={handleChange} className="border rounded p-2">
                <option value="">Select Fuel Type</option>
                {fuelTypes.map((fuel) => (
                    <option key={fuel} value={fuel}>{fuel}</option>
                ))}
            </select>
            <input
                name="maxPrice"
                type="number"
                value={filters.maxPrice}
                onChange={handleChange}
                placeholder="Max Price"
                className="border rounded p-2"
            />
            <input
                name="minMpg"
                type="number"
                value={filters.minMpg}
                onChange={handleChange}
                placeholder="Min MPG"
                className="border rounded p-2"
            />
        </div>
    );
}

export default CarFilter;