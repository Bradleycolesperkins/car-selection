import { useState, useEffect } from 'react';
import './App.css';
import CarList from "./components/CarList";
import CarFilter from "./components/CarFilter";

function App() {
    const [cars, setCars] = useState([]);
    const [filterOptions, setFilterOptions] = useState({ makes: [], models: [], years: [], bodyTypes: [], submodels: [], fuelTypes: [] });
    const [filters, setFilters] = useState({ make: '', model: '', year: '', bodyType: '', submodel: '', fuelType: '', maxPrice: '', minMpg: '' });

    const handleFilter = (newFilters) => {
        setFilters(newFilters);
    };

    useEffect(() => {
        const query = new URLSearchParams({ ...filters }).toString();
        fetch(`http://localhost:3001/api/cars?${query}`)
            .then((res) => res.json())
            .then((data) => {
              setCars(data.cars);
            })
            .catch((error) => console.error('Error fetching cars:', error));
    }, [filters]);

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
        </div>
    );
}

export default App;
