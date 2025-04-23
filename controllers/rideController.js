import ride from '../models/ridemodel.js';

export async function bookRide(req, res) {
  try {
    const ride = await ride.create({ ...req.body, passenger: req.user.id });
    res.status(201).json(ride);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

export async function getAllRides(req, res) {
  const rides = await ride.find().populate('passenger driver', 'name email');
  res.json(rides);
}

