import express from 'express';

import { closeAuction, createAuction, getAllAuctions } from '../controllers/Auction.controllers.js';
import { jwtAuthMiddleware } from '../middleware/Auth.middleware.js';
import upload from '../middleware/upload.js';

const router = express.Router();

router.post('/',jwtAuthMiddleware, createAuction);
router.get('/', getAllAuctions);
router.put('/:id/close', jwtAuthMiddleware, closeAuction);

export default router;
