import Ride from '../models/ridemodel.js'; // Correct import for the Ride model
import mongoose from 'mongoose';



export const bookRide = async (req, res) => {
    try {
      const { passenger, driver, origin, destination } = req.body;
  
      // Validate if passenger and driver are valid ObjectId
      if (!mongoose.Types.ObjectId.isValid(passenger)) {
        return res.status(400).json({ error: 'Invalid passenger ID format' });
      }
  
      if (!mongoose.Types.ObjectId.isValid(driver)) {
        return res.status(400).json({ error: 'Invalid driver ID format' });
      }
  
      // Convert string IDs to ObjectId
     // Assuming 'someUserId' is a valid ObjectId string
const passengerId = mongoose.Types.ObjectId("someUserId");
const driverId = mongoose.Types.ObjectId("someDriverId");

      const newRide = new Ride({
        passenger: passengerId,
        driver: driverId,
        origin,
        destination,
        status: 'pending', // Default status is 'pending'
      });
  
      await newRide.save();
      res.status(201).json({ message: 'Ride booked successfully', ride: newRide });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  
export const getAllRides = async (req, res) => {
  try {
    const rides = await Ride.find().populate('passenger driver'); // Populating passenger and driver info
    res.json(rides);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

