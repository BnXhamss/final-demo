import jwt from 'jsonwebtoken';
const { sign, verify, decode } = jwt;

import { hash, compare } from 'bcrypt';
import User from '../models/usermodel.js';
import twilio from 'twilio';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env file

// Initialize Twilio client
const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);

// Register a new user and send SMS verification code
export async function register(req, res) {
  try {
    const { name, email, password, phone, role } = req.body;

    const hashedPassword = await hash(password, 10);
    const smsToken = Math.floor(100000 + Math.random() * 900000).toString();
    const smsTokenExpires = new Date(Date.now() + 5 * 60 * 1000); // Expires in 5 mins

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      phone,
      role,
      smsToken,
      smsTokenExpires,
    });

    await client.messages.create({
      body: `Your verification code is ${smsToken}`,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: phone,
    });

    res.status(201).json({ message: 'Verification code sent to phone.' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

// Verify token sent via SMS
export async function verifyToken(req, res) {
  try {
    const { phone, token } = req.body;
    const foundUser = await User.findOne({ phone });

    if (
      !foundUser ||
      foundUser.smsToken !== token ||
      foundUser.smsTokenExpires < new Date()
    ) {
      return res.status(400).json({ error: 'Invalid or expired token.' });
    }

    foundUser.smsToken = undefined;
    foundUser.smsTokenExpires = undefined;
    await foundUser.save();

    const jwtToken = sign({ id: foundUser._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.json({ token: jwtToken });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Login existing user
export async function login(req, res) {
  try {
    const { email, password } = req.body;
    const foundUser = await User.findOne({ email });

    if (!foundUser || !(await compare(password, foundUser.password))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = sign({ id: foundUser._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}