function CarCard({ car }) {
    return (
        <div className="border rounded-lg p-4 shadow-sm bg-white">
            <h3 className="text-lg font-semibold">{car.year} {car.make} {car.model} {car.submodel}</h3>
            <p className="text-gray-600">Trim: {car.trim}</p>
            <p className="text-gray-600">Body: {car.bodyType}</p>
            <p className="text-gray-600">MSRP: ${car.msrp.toLocaleString()}</p>
            <p className="text-gray-600">Fuel Type: {car.fuelType}</p>
            <p className="text-gray-600">Engine: {car.cylinders} {car.engineSize}L ({car.horsepower} HP)</p>
            <p className="text-gray-600">MPG: {car.combinedMpg} (City: {car.cityMpg}, Hwy: {car.highwayMpg})</p>
        </div>
    );
}

export default CarCard;
