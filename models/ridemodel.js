const mongoose = require('mongoose');

const rideSchema = new mongoose.Schema({
  passenger: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  driver: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  origin: String,
  destination: String,
  status: { type: String, enum: ['pending', 'ongoing', 'completed'], default: 'pending' },
});

module.exports = mongoose.model('Ride', rideSchema);