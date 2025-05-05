import {Router} from 'express';
import { getUser, login, register } from '../controllers/User.controllers.js';
import { jwtAuthMiddleware } from '../middleware/Auth.middleware.js';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.get('/profile',jwtAuthMiddleware, getUser);


export default router;