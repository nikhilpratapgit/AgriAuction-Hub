import { Auction } from "../models/Auction.models.js";

import {v2 as cloudinary} from 'cloudinary'
//create auction
const createAuction = async (req, res) => {
  try {
    const { crop, quantity, basePrice, description, endTime } = req.body;
    const createdBy = req.user._id;

    // Handle image upload (single image)
    let imageUrl = null;

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        resource_type: 'image',
      });
      imageUrl = result.secure_url;
    }

    const auction = new Auction({
      crop,
      quantity,
      basePrice,
      description,
      endTime,
      image: imageUrl,
      createdBy,
    });

    await auction.save();
    res.status(201).json({ success: true, data: auction });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Failed to create auction', error });
  }
};

export default createAuction;

  
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

const updateAuction = async (req, res) => {
  const auction = await Auction.findById(req.params.id);
  if (auction.createdBy.toString() !== req.user._id.toString()) {
    return res.status(403).json({ message: "Forbidden" });
  }
  Object.assign(auction, req.body);
  await auction.save();
  res.json(auction);
};

const deleteAuction = async (req, res) => {
  const auction = await Auction.findById(req.params.id);
  if (auction.createdBy.toString() !== req.user._id.toString()) {
    return res.status(403).json({ message: "Forbidden" });
  }
  await auction.remove();
  res.json({ message: "Auction deleted" });
};
export {createAuction,getAllAuctions,closeAuction,getAuctionById,updateAuction,deleteAuction}