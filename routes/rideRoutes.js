import { Router } from 'express';
const router = Router();
import { bookRide, getAllRides } from '../controllers/rideController.js';

router.post('/book', bookRide);
router.get('/', getAllRides);

export default router;
