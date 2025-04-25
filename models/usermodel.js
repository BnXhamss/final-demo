
import { Schema, model } from 'mongoose';

const userSchema = new Schema({
  name: {type: String, unique: true, required: true},
  email: { type: String, unique: true , required: true},
  password: {type: String, required: true},
  phone: { type: String, unique: true , required: true},
  role: { 
    type: String, 
    enum: ['driver', 'passenger'], 
    default: 'passenger'
  }
});

export const userModel = model('User', userSchema);
