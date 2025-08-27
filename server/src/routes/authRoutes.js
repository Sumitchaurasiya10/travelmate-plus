import { Router } from 'express';
import { register, login, toggleShare } from '../controllers/authController.js';
import auth from '../middleware/auth.js';

const router = Router();
router.post('/register', register);
router.post('/login', login);
router.put('/toggle-share', auth, toggleShare);

export default router;
