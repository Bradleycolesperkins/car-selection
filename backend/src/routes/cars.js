const express = require('express');
const { getCars, getFilterOptions} = require('../controllers/carsController');

const router = express.Router();

router.get('/', getCars);
router.get('/filters', getFilterOptions);

module.exports = router;