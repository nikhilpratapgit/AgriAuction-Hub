import express from 'express';

import { closeAuction, createAuction, deleteAuction, getAllAuctions, getAuctionById, updateAuction } from '../controllers/Auction.controllers.js';
import { isAdmin, isAuthenticated } from '../middleware/Auth.middleware.js';
import upload from '../middleware/Multer.js';

const router = express.Router();
// Auction routes
router.post('/',isAuthenticated,upload.single('image'), createAuction);
router.get('/get',getAllAuctions);
router.put('/:id/close', isAuthenticated, closeAuction);
router.put('/:id', isAuthenticated, updateAuction);
router.delete('/:id', isAuthenticated, deleteAuction);
router.get('/:id', getAuctionById);

export default router;
