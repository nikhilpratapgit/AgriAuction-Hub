import mongoose from 'mongoose';

const bidSchema = new mongoose.Schema({
  auction: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Auction',
    required: true,
  },
  bidder: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  amount: {
    type: Number,
    required: true,
    min: 1,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

export const Bid =  mongoose.model('Bid', bidSchema);
