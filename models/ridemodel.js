import { Schema, model } from 'mongoose';

const rideSchema = new Schema({
  passenger: { type: Schema.Types.ObjectId, ref: 'User' },
  driver: { type: Schema.Types.ObjectId, ref: 'User' },
  origin: String,
  destination: String,
  status: { type: String, enum: ['pending', 'ongoing', 'completed'], default: 'pending' },
});

export default model('Ride', rideSchema);