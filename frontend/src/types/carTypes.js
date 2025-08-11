/**
 * Car Type Definitions
 * 
 * This file contains centralised type definitions for car data
 * used throughout the application.
 */

import PropTypes from 'prop-types';

/**
 * Car PropType definition
 * Defines the shape of a car object for prop validation
 */
export const CarType = PropTypes.shape({
    make: PropTypes.string,
    model: PropTypes.string,
    year: PropTypes.number,
    submodel: PropTypes.string,
    trim: PropTypes.string,
    msrp: PropTypes.number,
    bodyType: PropTypes.string,
    fuelType: PropTypes.string,
    combinedMpg: PropTypes.number,
    cityMpg: PropTypes.number,
    highwayMpg: PropTypes.number,
    cylinders: PropTypes.string,
    engineSize: PropTypes.number,
    horsepower: PropTypes.number,
});

/**
 * Default car object with empty/zero values
 * Used as fallback when no car data is provided
 */
export const defaultCar = {
    make: '',
    model: '',
    year: 0,
    submodel: '',
    trim: '',
    msrp: 0,
    bodyType: '',
    fuelType: '',
    combinedMpg: 0,
    cityMpg: 0,
    highwayMpg: 0,
    cylinders: '',
    engineSize: 0,
    horsepower: 0,
};