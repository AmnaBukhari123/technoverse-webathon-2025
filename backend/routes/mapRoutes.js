const express = require('express');
const router = express.Router();
const mapController = require('../controllers/mapController');

// Get all map data with optional filters
router.get('/data', mapController.getMapData);
router.get('/marker/:id', mapController.getMarkerDetails);


module.exports = router;
