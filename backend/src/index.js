const express = require('express')
const cors = require('cors');
const carsRoutes = require('./routes/cars');

const app = express()
const port = 3001

app.use(cors());

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

// Routes
app.use('/api/cars', carsRoutes);