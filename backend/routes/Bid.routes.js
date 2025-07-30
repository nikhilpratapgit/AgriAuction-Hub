import express from 'express';
import { createBid, getBidsForAuction } from '../controllers/Bid.controllers.js';
import { isAuthenticated } from '../middleware/Auth.middleware.js';


const router = express.Router();

router.post('/', isAuthenticated, createBid);
router.get('/:auctionId',isAuthenticated, getBidsForAuction);

export default router;
