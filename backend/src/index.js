const express = require('express')
const carsRoutes = require('./routes/cars');

const app = express()
const port = 3001

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

// Routes
app.use('/api/cars', carsRoutes);