import { useState, useEffect } from 'react';
import './App.css';
import CarList from "./components/CarList";

function App() {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/api/cars')
        .then((res) => res.json())
        .then((data) => {
          setCars(data.cars);
        })
        .catch((error) => console.error('Error fetching cars:', error));
  }, []);


  return (
      <div className="container mx-auto p-4">
          <h1 className="text-2xl font-bold mb-4">Car Selection</h1>
          <CarList cars={cars} />
      </div>
  );
}

export default App;
