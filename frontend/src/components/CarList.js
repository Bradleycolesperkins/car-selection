import CarCard from "./CarCard";

function CarList({ cars }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            {cars?.length ? (
                cars.map((car, index) => <CarCard key={`${index}`} car={car} />)
            ) : (
                <p className="text-gray-500">No cars found.</p>
            )}
        </div>
    );
}

export default CarList;