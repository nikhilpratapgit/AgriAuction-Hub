import express from "express";
import { isAuthenticated } from "../middleware/Auth.middleware.js";
import { getMessages, sendMessage } from "../controllers/Message.controllers.js";

const router = express.Router();

router.post("/", isAuthenticated, sendMessage);
router.get("/:auctionId", isAuthenticated, getMessages);

export default router;
