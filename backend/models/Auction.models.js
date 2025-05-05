import mongoose from 'mongoose';

const auctionSchema = new mongoose.Schema({
  crop: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  basePrice: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  endTime: {
    type: Date,
    required: true,
  },
  image: {
    type: String, // will store image filename or URL
    required: true,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
}, {
  timestamps: true
});

export const Auction = mongoose.model('Auction', auctionSchema);


