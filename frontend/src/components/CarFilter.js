/**
 * Car Filter Component
 * 
 * Provides a set of filter controls for refining car search results.
 * Includes dropdown selectors for categorical filters and numeric inputs
 * for price and fuel efficiency filters.
 * 
 * @param {Object} props - Component props
 * @param {Object} props.filterOptions - Available filter options from the API
 * @param {Function} props.onFilter - Callback function when filters change
 */
import { useState } from 'react';

function CarFilter({ filterOptions = {}, onFilter }) {
    // Local state to track current filter selections
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

    /**
     * Handles changes to any filter control
     * Updates local state and calls the parent component's filter handler
     * 
     * @param {Object} e - Event object from the input control
     */
    const handleChange = (e) => {
        const { name, value } = e.target;
        const newFilters = { ...filters, [name]: value };
        setFilters(newFilters);
        onFilter(newFilters);
    };

    // Destructure filter options with defaults to prevent errors
    const { makes = [], models = [], years = [], bodyTypes = [], submodels = [], fuelTypes = [] } = filterOptions;

    // Show loading state when filter options haven't loaded yet
    if (!makes.length && !models.length && !years.length) {
        return <div className="text-gray-500 mb-6">Loading filters...</div>;
    }

    /**
     * Renders a set of filter controls in a responsive grid layout
     * Each filter is a dropdown menu or numeric input field
     */
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {/* Car manufacturer filter */}
            <select name="make" value={filters.make} onChange={handleChange} className="border rounded p-2" aria-label="Select Make">
                <option value="">Select Make</option>
                {makes.map((make) => (
                    <option key={make} value={make}>{make}</option>
                ))}
            </select>
            
            {/* Car model filter */}
            <select name="model" value={filters.model} onChange={handleChange} className="border rounded p-2" aria-label="Select Model">
                <option value="">Select Model</option>
                {models.map((model) => (
                    <option key={model} value={model}>{model}</option>
                ))}
            </select>
            
            {/* Manufacturing year filter */}
            <select name="year" value={filters.year} onChange={handleChange} className="border rounded p-2" aria-label="Select Year">
                <option value="">Select Year</option>
                {years.map((year) => (
                    <option key={year} value={year}>{year}</option>
                ))}
            </select>
            
            {/* Body type filter (sedan, SUV, etc.) */}
            <select name="bodyType" value={filters.bodyType} onChange={handleChange} className="border rounded p-2" aria-label="Select Body">
                <option value="">Select Body Type</option>
                {bodyTypes.map((type) => (
                    <option key={type} value={type}>{type}</option>
                ))}
            </select>
            
            {/* Submodel filter */}
            <select name="submodel" value={filters.submodel} onChange={handleChange} className="border rounded p-2" aria-label="Select Submodel">
                <option value="">Select Submodel</option>
                {submodels.map((submodel) => (
                    <option key={submodel} value={submodel}>{submodel}</option>
                ))}
            </select>
            
            {/* Fuel type filter */}
            <select name="fuelType" value={filters.fuelType} onChange={handleChange} className="border rounded p-2" aria-label="Select Fuel">
                <option value="">Select Fuel Type</option>
                {fuelTypes.map((fuel) => (
                    <option key={fuel} value={fuel}>{fuel}</option>
                ))}
            </select>
            
            {/* Maximum price numeric filter */}
            <input
                name="maxPrice"
                type="number"
                value={filters.maxPrice}
                onChange={handleChange}
                placeholder="Max Price"
                className="border rounded p-2"
            />
            
            {/* Minimum fuel efficiency (MPG) numeric filter */}
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