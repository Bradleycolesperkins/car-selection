import CarCard from "./CarCard";

function CarList({ cars }) {
    return (
        <div>
            {cars?.length ? (
                cars.map((car, index) => <CarCard key={`${index}`} car={car} />)
            ) : (
                <p>No cars found.</p>
            )}
        </div>
    );
}

export default CarList;