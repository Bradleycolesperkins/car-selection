const express = require('express');
const { getCars } = require('../controllers/carsController');

const router = express.Router();

router.get('/', getCars);

module.exports = router;