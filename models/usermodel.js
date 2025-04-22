const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  phone: { type: String, unique: true },
  smsToken: String,
  smsTokenExpires: Date,
  role: { type: String, enum: ['driver', 'passenger'], default: 'passenger' }
});

module.exports = mongoose.model('User', userSchema);