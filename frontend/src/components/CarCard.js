function CarCard({ car }) {
    return (
        <div className="border rounded-lg p-4 shadow-sm bg-white">
            <h3 className="text-lg font-semibold">{car.make} {car.model}</h3>
        </div>
    );
}

export default CarCard;
