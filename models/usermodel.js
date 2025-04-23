
import { Schema, model } from 'mongoose';

const userSchema = new Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  phone: { type: String, unique: true },
  smsToken: String,
  smsTokenExpires: Date,
  role: { type: String, enum: ['driver', 'passenger'], default: 'passenger' }
});

export default model('User', userSchema);