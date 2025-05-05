import express from 'express';
import { createBid, getBidsForAuction } from '../controllers/Bid.controllers.js';
import { jwtAuthMiddleware } from '../middleware/Auth.middleware.js';

const router = express.Router();

router.post('/', jwtAuthMiddleware, createBid);
router.get('/:auctionId', getBidsForAuction);

export default router;
