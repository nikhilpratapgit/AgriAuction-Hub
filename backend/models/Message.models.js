import mongoose from "mongoose";
// Message schema
const messageSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  auction: { type: mongoose.Schema.Types.ObjectId, ref: "Auction", required: true },
  text: { type: String, required: true },
}, { timestamps: true });

export const Message = mongoose.model("Message", messageSchema);