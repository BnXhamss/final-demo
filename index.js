import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
// import connectDB from './settings/dbSettings.js';
import authRoutes from './routes/authRoutes.js';
import rideRoutes from './routes/rideRoutes.js';
import authMiddleware from './middlewares/authMiddleware.js';
import userRoutes from './routes/userRoutes.js'


dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

// Connect to Database
// connectDB();
await mongoose.connect(process.env.MONGO_URI);

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/rides', authMiddleware, rideRoutes);
app.use('/api/users', userRoutes)

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));