import { useState, useEffect } from 'react';

import './App.css';

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
    <div className="App">
        {
            cars?.map((car, index) => {
                return (
                    <>
                        {car['make']} - {car['model']}
                        <br/>
                    </>
                );
            })
        }
    </div>
  );
}

export default App;
