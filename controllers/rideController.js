const ride = require ('../models/ridemodel.js')

exports.bookRide = async (req, res) => {
  try {
    const ride = await Ride.create({ ...req.body, passenger: req.user.id });
    res.status(201).json(ride);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getAllRides = async (req, res) => {
  const rides = await Ride.find().populate('passenger driver', 'name email');
  res.json(rides);
};

