/**
 * Car Card Component
 * 
 * Displays detailed information about a single car in a card format.
 * This component is used within the CarList to show each car's specifications.
 * 
 * @param {Object} props - Component props
 * @param {Object} props.car - Car data object containing all specifications
 */
function CarCard({ car }) {
    return (
        <div className="border rounded-lg p-4 shadow-sm bg-white">
            {/* Car title with year, make, model and submodel */}
            <h3 className="text-lg font-semibold">{car.year} {car.make} {car.model} {car.submodel}</h3>
            
            {/* Car specifications displayed as separate lines */}
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
