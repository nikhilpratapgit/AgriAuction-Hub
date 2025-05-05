import { Auction } from "../models/Auction.models.js";


const createAuction = async (req, res) => {
    try {
      const { crop, quantity, basePrice, description, endTime } = req.body;
    //   const image = req.file ? req.file.filename : null;
      const createdBy = req.user._id;
  
      const auction = new Auction({
        crop,
        quantity,
        basePrice,
        description,
        endTime,
        // image,
        createdBy,
      });
  
      await auction.save();
      res.status(201).json(auction);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to create auction', error });
    }
  };
  
const getAllAuctions = async (req, res) => {
  try {
    const auctions = await Auction.find().populate('createdBy', 'name').sort({ createdAt: -1 });
    res.json(auctions);
  } catch (error) {
    res.status(500).json({ message: 'Failed to get auctions', error });
  }
};
const getAuctionById = async (req, res) => {
  try {
    const { id } = req.params;
    const auction = await Auction.findById(id).populate('bids').populate('createdBy', 'name');

    if (!auction) return res.status(404).json({ message: 'Auction not found' });

    res.json(auction);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch auction', error });
  }
};

const closeAuction = async (req, res) => {
  try {
    const { id } = req.params;
    const auction = await Auction.findById(id);

    if (!auction) return res.status(404).json({ message: 'Auction not found' });

    auction.isClosed = true;
    await auction.save();

    res.json({ message: 'Auction closed successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error closing auction', error });
  }
};

export {createAuction,getAllAuctions,closeAuction}