/**
 * Car Selection Application - Main Component
 * 
 * This is the main application component that manages the state and data flow
 * for the car selection interface. It handles API calls, filtering, and pagination
 * of car data.
 */

import { useState, useEffect } from 'react';
import './App.css';
import CarList from "./components/CarList";
import CarFilter from "./components/CarFilter";
import Pagination from "./components/Pagination";

function App() {
    // State for storing the list of cars currently displayed
    const [cars, setCars] = useState([]);
    
    // State for storing available filter options retrieved from the API
    const [filterOptions, setFilterOptions] = useState({ 
        makes: [], 
        models: [], 
        years: [], 
        bodyTypes: [], 
        submodels: [], 
        fuelTypes: [] 
    });
    
    // State for tracking currently applied filters
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
    
    // Pagination state
    const [page, setPage] = useState(1);
    const [limit] = useState(9); // Number of cars per page
    const [totalPages, setTotalPages] = useState(1);

    /**
     * Updates the filter state when user changes filter selections
     * 
     * @param {Object} newFilters - The updated filter values
     */
    const handleFilter = (newFilters) => {
        setFilters(newFilters);
    };

    /**
     * Updates the current page when user navigates through results
     * 
     * @param {number} newPage - The page number to navigate to
     */
    const handlePageChange = (newPage) => {
        setPage(newPage);
    };

    /**
     * Effect hook to fetch cars data whenever filters or pagination changes
     * Constructs a query string from all current filters and pagination parameters
     */
    useEffect(() => {
        const query = new URLSearchParams({ ...filters, page, limit }).toString();
        fetch(`${process.env.REACT_APP_API_URL}/api/cars?${query}`)
            .then((res) => res.json())
            .then((data) => {
                setCars(data.cars);
                setTotalPages(data.totalPages);
            })
            .catch((error) => console.error('Error fetching cars:', error));
    }, [filters, page, limit]);

    /**
     * Effect hook to fetch available filter options when component mounts
     * This populates the dropdown menus with available car attributes
     */
    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/api/cars/filters`)
            .then((res) => res.json())
            .then((data) => setFilterOptions(data))
            .catch((error) => console.error('Error fetching filter options:', error));
    }, []);


    /**
     * Renders the main application interface
     * 
     * The layout consists of:
     * 1. A header with the application title
     * 2. Filter controls for selecting car criteria
     * 3. A grid of car cards displaying the filtered results
     * 4. Pagination controls for navigating through results
     */
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Car Selection</h1>
            {/* Filter component with all available filter options */}
            <CarFilter filterOptions={filterOptions} onFilter={handleFilter} />
            {/* Grid of car cards showing the current page of results */}
            <CarList cars={cars} />
            {/* Pagination controls for navigating between pages */}
            <Pagination page={page} totalPages={totalPages} onPageChange={handlePageChange} />
        </div>
    );
}

export default App;
