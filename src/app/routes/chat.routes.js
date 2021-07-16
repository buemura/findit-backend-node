const { Router } = require("express");
const ChatController = require("../controllers/ChatController");
const authMiddleware = require("../middlewares/authMiddleware");

const chat = Router();

// ROUTES
chat.get("/api/chats", authMiddleware, ChatController.showAllChatRooms);
chat.get("/api/chat/:id", authMiddleware, ChatController.showAllMessages);
chat.post(
  "/api/chat/create-chat",
  authMiddleware,
  ChatController.createChatRoom
);
chat.post(
  "/api/chat/send-message/:id",
  authMiddleware,
  ChatController.sendMessage
);

module.exports = chat;
