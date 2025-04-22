const express = require('express');
const router = express.Router();
const { bookRide, getAllRides } = require('../controllers/rideController');

router.post('/book', bookRide);
router.get('/', getAllRides);

module.exports = router;
