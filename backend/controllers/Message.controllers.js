import { Message } from "../models/Message.models.js";


const sendMessage = async (req, res) => {
  const { text, auctionId } = req.body;
  const message = await Message.create({
    user: req.user._id,
    auction: auctionId,
    text,
  });
  res.status(201).json(message);
};

const getMessages = async (req, res) => {
  const messages = await Message.find({ auction: req.params.auctionId })
    .populate("user", "username")
    .sort({ createdAt: 1 });
  res.json(messages);
};

export {getMessages,sendMessage}