import { Auction } from "../models/Auction.models.js";
import { Bid } from "../models/Bid.models.js";


const createBid = async (req, res) => {
  try {
    const { auctionId, amount } = req.body;
    const bidderId = req.user._id;

    const auction = await Auction.findById(auctionId);
    if (!auction) {
      return res.status(404).json({ message: 'Auction not found' });
    }

    const newBid = new Bid({
      auction: auctionId,
      bidder: bidderId,
      amount,
    });

    await newBid.save();

    auction.bids.push(newBid._id);
    await auction.save();

    res.status(201).json(newBid);
  } catch (error) {
    res.status(500).json({ message: 'Failed to place bid', error });
  }
};

const getBidsForAuction = async (req, res) => {
  try {
    const { auctionId } = req.params;
    const bids = await Bid.find({ auction: auctionId }).populate('bidder', 'name').sort({ amount: -1 });
    res.json(bids);
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve bids', error });
  }
};

export { createBid,getBidsForAuction}