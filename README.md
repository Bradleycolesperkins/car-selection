# Car Selection Application

A full-stack web application for browsing and filtering car information. This application allows users to search for cars based on various criteria such as make, model, year, body type, and more.

## Project Overview

The Car Selection Application consists of:

- **Frontend**: A React application with a responsive UI built using Tailwind CSS
- **Backend**: A Node.js/Express.js API server that loads car data from CSV files

## Technologies Used

### Frontend
- React 19.1.1
- Tailwind CSS 3.3.0
- React Testing Library
- Jest for testing

### Backend
- Node.js
- Express.js 5.1.0
- CSV-Parse 6.1.0 for parsing CSV data
- Jest and Supertest for testing

## Project Structure

```
car-selection/
├── frontend/                # React frontend application
│   ├── public/              # Static files
│   ├── src/                 # Source code
│   │   ├── components/      # React components
│   │   │   └── __tests__/   # Frontend Component tests
│   │   ├── App.js           # Main application component
│   │   └── index.js         # Entry point
│   └── package.json         # Frontend dependencies
│
├── backend/                 # Express.js backend
│   ├── data/                # CSV data files
│   ├── src/                 # Source code
│   │   ├── controllers/     # API controllers
│   │   ├── routes/          # API routes
│   │   ├── utils/           # Utility functions
│   │   └── index.js         # Server entry point
│   ├── tests/               # Backend tests
│   └── package.json         # Backend dependencies
│
└── README.md                # Project documentation
```

## Setup Instructions

### Prerequisites
- Node.js (latest LTS version recommended)
- npm or yarn

### Backend Setup
1. Navigate to the backend directory:
   ```
   cd backend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the server:
   ```
   npm start
   ```
   The server will run on http://localhost:3001

### Frontend Setup
1. Navigate to the frontend directory:
   ```
   cd frontend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm start
   ```
   The application will open in your browser at http://localhost:3000

## Usage

1. The application loads with a list of cars and filter options
2. Use the dropdown filters to narrow down cars by:
    - Make
    - Model
    - Year
    - Body Type
    - Submodel
    - Fuel Type
3. Use the numeric inputs to filter by:
    - Maximum Price
    - Minimum MPG (Miles Per Gallon)
4. Use the pagination controls to navigate through the results

## API Documentation

The backend provides the following API endpoints:

### GET /api/cars
Returns a paginated list of cars, optionally filtered by query parameters.

**Query Parameters:**
- `make`: Filter by car make
- `model`: Filter by car model
- `year`: Filter by model year
- `bodyType`: Filter by body type
- `submodel`: Filter by submodel
- `fuelType`: Filter by fuel type
- `maxPrice`: Filter by maximum price
- `minMpg`: Filter by minimum combined MPG
- `page`: Page number (default: 1)
- `limit`: Number of results per page (default: 9)

**Response:**
```json
{
  "cars": [...],
  "total": 100,
  "page": 1,
  "limit": 10,
  "totalPages": 10
}
```

### GET /api/cars/filters
Returns available filter options based on the data.

**Response:**
```json
{
  "makes": [...],
  "models": [...],
  "years": [...],
  "bodyTypes": [...],
  "submodels": [...],
  "fuelTypes": [...]
}
```

## Testing

### Backend Tests
Run the backend tests with:
```
cd backend
npm test
```

### Frontend Tests
Run the frontend tests with:
```
cd frontend
npm test
```