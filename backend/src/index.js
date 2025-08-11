require('dotenv').config();
const express = require('express')
const cors = require('cors');
const carsRoutes = require('./routes/cars');

const app = express()
const port = process.env.PORT || 3001

app.use(cors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:3000'
}));

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

// Routes
app.use('/api/cars', carsRoutes);