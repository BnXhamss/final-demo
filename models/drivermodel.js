import { Schema, model } from 'mongoose';

const driverSchema = new Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    sparse: true, // allows multiple nulls in unique fields
    match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
  },
  phoneNumber: {
    type: String,
    required: true,
    unique: true,
    match: /^[0-9]{10,15}$/,
  },
  licenseNumber: {
    type: String,
    required: true,
    unique: true,
    minlength: 5,
    maxlength: 20,
    match: /^[a-zA-Z0-9]+$/, // alphanumeric only
  },
  vehicleNumber: {
    type: String,
    required: true,
    match: /^[A-Z0-9\-]{5,15}$/,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  role: {
    type: String,
    enum: ['driver'],
    default: 'driver',
  },
}, {
  timestamps: true, // adds createdAt and updatedAt fields
});

export default model('Driver', driverSchema);