import { useState, useEffect } from 'react';
import './App.css';
import CarList from "./components/CarList";
import CarFilter from "./components/CarFilter";
import Pagination from "./components/Pagination";

function App() {
    const [cars, setCars] = useState([]);
    const [filterOptions, setFilterOptions] = useState({ makes: [], models: [], years: [], bodyTypes: [], submodels: [], fuelTypes: [] });
    const [filters, setFilters] = useState({ make: '', model: '', year: '', bodyType: '', submodel: '', fuelType: '', maxPrice: '', minMpg: '' });
    const [page, setPage] = useState(1);
    const [limit] = useState(9);
    const [totalPages, setTotalPages] = useState(1);

    const handleFilter = (newFilters) => {
        setFilters(newFilters);
    };

    const handlePageChange = (newPage) => {
        setPage(newPage);
    };

    useEffect(() => {
        const query = new URLSearchParams({ ...filters, page, limit }).toString();
        fetch(`http://localhost:3001/api/cars?${query}`)
            .then((res) => res.json())
            .then((data) => {
                setCars(data.cars);
                setTotalPages(data.totalPages);
            })
            .catch((error) => console.error('Error fetching cars:', error));
    }, [filters, page, limit]);

    useEffect(() => {
        fetch('http://localhost:3001/api/cars/filters')
            .then((res) => res.json())
            .then((data) => setFilterOptions(data))
            .catch((error) => console.error('Error fetching filter options:', error));
    }, []);


    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Car Selection</h1>
            <CarFilter filterOptions={filterOptions} onFilter={handleFilter} />
            <CarList cars={cars} />
            <Pagination page={page} totalPages={totalPages} onPageChange={handlePageChange} />
        </div>
    );
}

export default App;
