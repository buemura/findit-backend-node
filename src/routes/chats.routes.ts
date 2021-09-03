import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import { ChatsController } from "../controllers/ChatsController";

const chats = Router();

chats
  .get("/api/chats", authMiddleware, ChatsController.showAllChatRooms)
  .get(
    "/api/chatsById/:id",
    authMiddleware,
    ChatsController.showAllChatRoomsById
  )
  .get(
    "/api/chatsByUser/:id",
    authMiddleware,
    ChatsController.showAllChatRoomsByUser
  )
  .get(
    "/api/chat/messages/:id",
    authMiddleware,
    ChatsController.showAllMessages
  )
  .post("/api/chat/create-chat", authMiddleware, ChatsController.createChatRoom)
  .post(
    "/api/chat/send-message/:id",
    authMiddleware,
    ChatsController.sendMessage
  );

export { chats };
