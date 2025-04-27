import jwt from 'jsonwebtoken';
const { sign } = jwt;

import { hash, compare } from 'bcrypt';
import { userModel } from '../models/usermodel.js'; // Correct import
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables

// ✅ Correct Register Function
export async function register(req, res) {
  try {
    const { name, email, password, phone, role } = req.body;

    const hashedPassword = await hash(password, 10);

    const newUser = await userModel.create({  // userModel not userM
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

// ✅ Correct Login Function
export async function login(req, res) {
    try {
      const { email, password } = req.body;
  
      console.log('Login Attempt:', email, password);  // Log email and password from the request
  
      // Find user by email
      const foundUser = await userModel.findOne({ email });
  
      console.log('Found User:', foundUser);  // Log the found user
  
      if (!foundUser) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }
  
      // Compare passwords
      const isPasswordMatch = await compare(password, foundUser.password);
  
      console.log('Password Match:', isPasswordMatch);  // Log whether the password matches
  
      if (!isPasswordMatch) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }
  
      // Generate JWT token
      const token = sign({ id: foundUser._id }, process.env.JWT_SECRET, { expiresIn:'1d' });
  
      return res.json({
        message: 'Login successful',
        token,
        user: {
          id: foundUser._id,
          name: foundUser.name,
          role: foundUser.role,
        },
      });
    } catch (err) {
      console.error('Error:', err);  // Log any other errors
      return res.status(500).json({ error: err.message });
    }
  }