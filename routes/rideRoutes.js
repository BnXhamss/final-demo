import { Router } from 'express';
import { bookRide, getAllRides } from '../controllers/rideController.js';
import { validateRide } from '../validators/ridevalidators.js';
import from, { authenticateToken } from '../middlewares/authMiddleware.js'

const router = Router();
 router.post('/rides', authenticateToken, bookRide)
// Route to book a new ride
router.post('/book',  bookRide);


router.post('/', validateRide);
// Route to get all rides (can be protected with authentication)
router.get('/', getAllRides);



export default router;