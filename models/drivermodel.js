import { Schema, model } from 'mongoose';

const driverSchema = new Schema({
  fullName: { type: String, required: true },
  email: { type: String, unique: true, sparse: true }, // optional but unique if provided
  phoneNumber: { type: String, required: true, unique: true },
  licenseNumber: { type: String, required: true, unique: true },
  vehicleNumber: { type: String, required: true, unique: true },
  password: { type: String, required: true },
}, {
  timestamps: true // adds createdAt and updatedAt fields
});

export default model('Driver', driverSchema);