/**
 * Car List Component
 * 
 * Displays a responsive grid of car cards based on the current filter selection.
 * Handles empty states when no cars match the current filters.
 * 
 * @param {Object} props - Component props
 * @param {Array} props.cars - Array of car objects to display
 */
import PropTypes from 'prop-types';
import CarCard from "./CarCard";
import { CarType } from '../types/carTypes';

function CarList({ cars = [] }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            {/* Conditional rendering based on whether cars are available */}
            {cars?.length ? (
                // Map through cars array and render a CarCard for each car
                cars.map((car, index) => <CarCard key={`${index}`} car={car} />)
            ) : (
                // Display a message when no cars match the current filters
                <p className="text-gray-500">No cars found.</p>
            )}
        </div>
    );
}

// Add prop type validation
CarList.propTypes = {
    cars: PropTypes.arrayOf(CarType)
};

export default CarList;