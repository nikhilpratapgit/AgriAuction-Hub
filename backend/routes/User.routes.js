import {Router} from 'express';
import { getUserProfile, login, logout, register, resendVerificationEmail, updateUserProfile, verifyEmail } from '../controllers/User.controllers.js';
import { isAuthenticated } from '../middleware/Auth.middleware.js';


const router = Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.get('/profile',isAuthenticated, getUserProfile);
router.put('/profile',isAuthenticated,updateUserProfile);
router.get('/verify-email/:token', verifyEmail);
router.post('/resend-verification', resendVerificationEmail);

export default router;