import { Router } from 'express';
const router = Router();
import { login, register, verifyToken } from '../controllers/authController.js';

router.post('/register', register);
router.post('/login', login);
router.post('/verify', verifyToken);

export default router;
