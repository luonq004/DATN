import express from "express";
import {
  getAllConversations,
  getConversation,
  sendMessageFromAdmin,
  sendMessageFromUser,
} from "../controllers/consersation";

const router = express.Router();

router.get("/", getAllConversations);

router.get("/:userId", getConversation);

// Admin gửi tin nhắn
router.post("/:conversationId/message", sendMessageFromAdmin);

// User gửi tin nhắn
router.post("/:userId/message", sendMessageFromUser);

export default router;
