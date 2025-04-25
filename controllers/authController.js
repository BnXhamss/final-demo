import jwt from 'jsonwebtoken';
const { sign } = jwt;

import { hash, compare } from 'bcrypt';
import { userModel } from '../models/usermodel';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env file

// Register a new user
export async function register(req, res) {
  try {
    const { name, email, password, phone, role } = req.body;

    const hashedPassword = await hash(password, 10);

    const newUser = await userModel.create({
      name,
      email,
      password: hashedPassword,
      phone,
      role,
    });

    return res.status(201).json({ message: 'User registered successfully.' });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
}

// Login user and return token
export async function login(req, res) {
  try {
    const { email, password } = req.body;
    const foundUser = await User.findOne({ email });

    if (!foundUser || !compare(password, foundUser.password)) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = sign({ id: foundUser._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    return res.json({
      message: 'Login successful',
      token,
      user: { id: foundUser._id, name: foundUser.name, role: foundUser.role }
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
