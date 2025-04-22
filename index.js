import express from "express";
import mongoose from "mongoose";
const dotenv = require('dotenv');
const connectDB = require('./settings/dbSettings');

const authRoutes = require('./routes/authRoutes');
const rideRoutes = require('./routes/rideRoutes');
const authMiddleware = require('./middlewares/authMiddleware');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

// Connect to Database
connectDB();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/rides', authMiddleware, rideRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

